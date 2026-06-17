"use client";

import { usePathname, useRouter } from "next/navigation";
import { useI18n } from "@/components/providers/I18nProvider";
import { progress } from "@/lib/progress";
import { sfx } from "@/lib/sfx";
import type { Locale } from "@/lib/i18n";

export function LanguageToggle() {
  const { locale, dict } = useI18n();
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (target: Locale) => {
    if (target === locale) return;
    sfx("blip");
    progress.switchLang();
    try {
      localStorage.setItem("ao_locale", target);
    } catch {
      /* ignore */
    }
    const next = pathname.replace(/^\/(pt|en)/, `/${target}`);
    router.push(next || `/${target}`);
  };

  return (
    <div
      className="flex items-center rounded-full border border-[var(--color-line)] bg-[rgba(212,175,55,0.05)] p-0.5 font-pixel text-[10px]"
      role="group"
      aria-label={dict.hud.language}
    >
      {(["pt", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          aria-pressed={locale === l}
          className={`rounded-full px-2 py-1 uppercase transition-colors ${
            locale === l
              ? "bg-[var(--color-gold)] text-[var(--color-ink)]"
              : "text-[var(--color-text-dim)] hover:text-[var(--color-gold)]"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
