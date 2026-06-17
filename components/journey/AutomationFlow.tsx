"use client";

import { motion, useReducedMotion } from "motion/react";
import { useI18n } from "@/components/providers/I18nProvider";
import { pick } from "@/lib/i18n";
import type { Step } from "@/content/types";

export function AutomationFlow({ steps, accent }: { steps: Step[]; accent: string }) {
  const { locale } = useI18n();
  const reduce = useReducedMotion();

  return (
    <ol className="relative">
      {steps.map((s, i) => (
        <motion.li
          key={i}
          initial={reduce ? false : { opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex gap-4 pb-5 last:pb-0"
        >
          {i < steps.length - 1 && (
            <span
              aria-hidden
              className="absolute left-[15px] top-9 h-[calc(100%-1.5rem)] w-px bg-[var(--color-gold-deep)]"
            />
          )}
          <span
            className="z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border bg-[var(--color-ink)] font-pixel text-[10px]"
            style={{ borderColor: accent, color: accent }}
          >
            {i + 1}
          </span>
          <div className="pt-0.5">
            <p className="font-medium text-[var(--color-text)]">{pick(s.title, locale)}</p>
            <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
              {pick(s.desc, locale)}
            </p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
