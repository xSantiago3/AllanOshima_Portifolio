"use client";

import { useI18n } from "@/components/providers/I18nProvider";

export function Footer() {
  const { dict } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--color-line)] px-4 py-12 text-center">
      <div className="kintsugi mx-auto mb-6 w-48" />
      <p className="font-display text-2xl text-[var(--color-gold)]">大島</p>
      <p className="mt-3 font-pixel text-[9px] uppercase tracking-wider text-[var(--color-text-muted)]">
        © {year} · {dict.footer.rights}
      </p>
      <p className="mx-auto mt-2 max-w-md text-xs text-[var(--color-text-dim)]">
        {dict.footer.builtWith}
      </p>
    </footer>
  );
}
