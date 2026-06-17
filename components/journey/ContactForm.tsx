"use client";

import { useState } from "react";
import { useI18n } from "@/components/providers/I18nProvider";
import { Icon } from "@/components/ui/Icon";
import { profile } from "@/content/profile";
import { sfx } from "@/lib/sfx";

const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/api/contact";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const { dict, locale } = useI18n();
  const f = dict.dojo.form;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ name?: boolean; email?: boolean; message?: boolean }>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const company = String(data.get("company") || ""); // honeypot

    const next = {
      name: name.length < 2,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      message: message.length < 10,
    };
    setErrors(next);
    if (next.name || next.email || next.message) return;
    if (company) return; // bot trap

    setStatus("sending");
    sfx("blip");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, locale }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      sfx("unlock");
      form.reset();
    } catch {
      // graceful fallback: open the user's mail client pre-filled
      const subject = encodeURIComponent(`[Portfolio] ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.open(`mailto:${profile.email}?subject=${subject}&body=${body}`, "_blank");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="panel flex flex-col items-center gap-3 p-8 text-center ring-gold">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--color-gold)] text-[var(--color-ink)]">
          <Icon name="check" size={24} />
        </span>
        <p className="text-[var(--color-text)]">{f.success}</p>
      </div>
    );
  }

  const fieldCls = (bad?: boolean) =>
    `w-full rounded-lg border bg-[var(--color-ink)] px-3.5 py-2.5 text-sm text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-text-dim)] focus:border-[var(--color-gold)] ${
      bad ? "border-[var(--color-vermillion)]" : "border-[var(--color-line)]"
    }`;

  return (
    <form onSubmit={onSubmit} noValidate className="panel flex flex-col gap-4 p-5">
      <div
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm text-[var(--color-text-muted)]">{f.name}</span>
        <input name="name" placeholder={f.namePlaceholder} className={fieldCls(errors.name)} />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm text-[var(--color-text-muted)]">{f.email}</span>
        <input
          name="email"
          type="email"
          inputMode="email"
          placeholder={f.emailPlaceholder}
          className={fieldCls(errors.email)}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm text-[var(--color-text-muted)]">{f.message}</span>
        <textarea
          name="message"
          rows={4}
          placeholder={f.messagePlaceholder}
          className={`${fieldCls(errors.message)} resize-y`}
        />
      </label>

      {status === "error" && (
        <p className="text-sm text-[var(--color-vermillion)]">{f.error}</p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn-gold disabled:opacity-60">
        <Icon name="mail" size={16} />
        {status === "sending" ? f.sending : f.send}
      </button>
    </form>
  );
}
