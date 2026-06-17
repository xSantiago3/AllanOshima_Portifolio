import { onRequest } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2";
import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { createHash } from "node:crypto";

initializeApp();
setGlobalOptions({ region: "southamerica-east1", maxInstances: 5 });

const db = getFirestore();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_PER_MIN = 5;
const WINDOW_MS = 60_000;

// Strip control characters (code < 32 or DEL) and collapse whitespace — defense-in-depth
// for any value that flows into an e-mail subject/body. No control-char literals in source.
function clean(value: string): string {
  let out = "";
  for (const ch of value) {
    const code = ch.charCodeAt(0);
    out += code < 32 || code === 127 ? " " : ch;
  }
  return out.replace(/\s+/g, " ").trim();
}

// Hash the IP so no raw client IP is ever persisted (LGPD/GDPR minimization).
function ipKey(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

// Cheap first-line guard (per warm instance) — catches repeat floods without a Firestore round-trip.
const localHits = new Map<string, number[]>();
function localRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (localHits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  localHits.set(key, recent);
  return recent.length > MAX_PER_MIN;
}

// Durable shared limit across all instances — Firestore transaction on an IP+minute bucket.
async function durableRateLimited(key: string): Promise<boolean> {
  const minute = Math.floor(Date.now() / WINDOW_MS);
  const ref = db.collection("ratelimits").doc(`${key}_${minute}`);
  try {
    return await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const count = (snap.exists ? (snap.data()?.count as number) : 0) ?? 0;
      if (count >= MAX_PER_MIN) return true;
      tx.set(
        ref,
        { count: count + 1, expireAt: new Date((minute + 2) * WINDOW_MS) },
        { merge: true },
      );
      return false;
    });
  } catch (err) {
    console.error("ratelimit tx error", err);
    return false; // fail-open on infra error; the in-memory guard still applies
  }
}

export const contact = onRequest(
  {
    cors: [
      "https://allan-oshima-portfolio.web.app",
      "https://allan-oshima-portfolio.firebaseapp.com",
    ],
    maxInstances: 5,
  },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).json({ error: "method_not_allowed" });
      return;
    }
    if (!req.is("application/json")) {
      res.status(415).json({ error: "unsupported_media_type" });
      return;
    }
    if (Number(req.headers["content-length"] ?? 0) > 16_384) {
      res.status(413).json({ error: "payload_too_large" });
      return;
    }

    const xff = req.headers["x-forwarded-for"];
    const rawIp = (
      (Array.isArray(xff) ? xff[0] : xff?.toString().split(",")[0]) ||
      req.ip ||
      "unknown"
    ).trim();
    const key = ipKey(rawIp);

    if (localRateLimited(key) || (await durableRateLimited(key))) {
      res.status(429).json({ error: "rate_limited" });
      return;
    }

    const body = (req.body ?? {}) as Record<string, unknown>;

    // honeypot — silently accept bots
    if (body.company) {
      res.status(200).json({ ok: true });
      return;
    }

    const name = typeof body.name === "string" ? clean(body.name) : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const locale = body.locale === "en" ? "en" : "pt";

    if (
      name.length < 2 ||
      name.length > 200 ||
      !EMAIL_RE.test(email) ||
      email.length > 200 ||
      message.length < 10 ||
      message.length > 5000
    ) {
      res.status(400).json({ error: "invalid_input" });
      return;
    }

    // optional reCAPTCHA v3 — fail-closed when configured
    const secret = process.env.RECAPTCHA_SECRET;
    if (secret && typeof body.token === "string") {
      try {
        const verify = await fetch("https://www.google.com/recaptcha/api/siteverify", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(body.token)}`,
        });
        const result = (await verify.json()) as { success?: boolean; score?: number };
        if (!result.success || (typeof result.score === "number" && result.score < 0.5)) {
          res.status(403).json({ error: "captcha_failed" });
          return;
        }
      } catch (err) {
        console.error("recaptcha error", err);
        res.status(403).json({ error: "captcha_failed" });
        return;
      }
    }

    const lead = {
      name,
      email,
      message,
      locale,
      userAgent: clean(String(req.headers["user-agent"] ?? "")).slice(0, 400),
      createdAt: FieldValue.serverTimestamp(),
    };

    // Firestore is the primary delivery sink → critical path (5xx makes the client fall back to mailto)
    try {
      await db.collection("leads").add(lead);
    } catch (err) {
      console.error("firestore error", err);
      res.status(502).json({ error: "store_failed" });
      return;
    }

    // optional e-mail notification via Resend — best-effort, only when a key is configured
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const notify = process.env.LEAD_NOTIFY_EMAIL || "santiago-allan@hotmail.com";
      const from = process.env.RESEND_FROM || "Portfolio <onboarding@resend.dev>";
      try {
        const r = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from,
            to: [notify],
            reply_to: email,
            subject: `[Portfolio] ${name}`,
            text: `${message}\n\n— ${name} <${email}>\nlocale: ${locale}`,
          }),
        });
        if (!r.ok) console.error("resend non-ok", r.status);
      } catch (err) {
        console.error("resend error", err);
      }
    }

    res.status(200).json({ ok: true });
  },
);
