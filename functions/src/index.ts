import { onRequest } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp();
setGlobalOptions({ region: "us-central1", maxInstances: 5 });

// --- best-effort in-memory rate limiting (per warm instance) ---
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const contact = onRequest({ cors: true, maxInstances: 5 }, async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const ip = (
    req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
    req.ip ||
    "unknown"
  ).trim();

  if (isRateLimited(ip)) {
    res.status(429).json({ error: "rate_limited" });
    return;
  }

  const body = (req.body ?? {}) as Record<string, unknown>;

  // honeypot — silently accept bots
  if (body.company) {
    res.status(200).json({ ok: true });
    return;
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
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

  // optional reCAPTCHA v3 verification
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
    }
  }

  const lead = {
    name,
    email,
    message,
    locale,
    ip,
    userAgent: req.headers["user-agent"] ?? "",
    createdAt: new Date().toISOString(),
  };

  try {
    await getFirestore().collection("leads").add(lead);
  } catch (err) {
    console.error("firestore error", err);
  }

  const resendKey = process.env.RESEND_API_KEY;
  const notify = process.env.LEAD_NOTIFY_EMAIL || "santiago-allan@hotmail.com";
  const from = process.env.RESEND_FROM || "Portfolio <onboarding@resend.dev>";
  if (resendKey) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: [notify],
          reply_to: email,
          subject: `[Portfolio] ${name}`,
          text: `${message}\n\n— ${name} <${email}>\nlocale: ${locale}\nip: ${ip}`,
        }),
      });
    } catch (err) {
      console.error("resend error", err);
    }
  }

  res.status(200).json({ ok: true });
});
