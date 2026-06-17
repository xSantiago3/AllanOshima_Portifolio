"use client";

import { AnimatePresence, motion } from "motion/react";
import { useI18n } from "@/components/providers/I18nProvider";
import { Icon } from "@/components/ui/Icon";
import { useProgress } from "@/lib/progress";
import { ui, useUI } from "@/lib/ui";
import {
  ACHIEVEMENT_IDS,
  achievementMeta,
  isUnlocked,
  type AchievementId,
} from "@/lib/achievements";

export function AchievementsPanel() {
  const { dict } = useI18n();
  const { achievements: open } = useUI();
  const state = useProgress();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40"
            onClick={ui.closeAchievements}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="panel fixed right-3 top-16 z-50 w-[min(92vw,340px)] p-4"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            role="dialog"
            aria-label={dict.achievements.title}
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-base text-[var(--color-gold)]">
                {dict.achievements.title}
              </h2>
              <button
                onClick={ui.closeAchievements}
                className="text-[var(--color-text-dim)] hover:text-[var(--color-gold)]"
                aria-label={dict.common.close}
              >
                <Icon name="close" size={16} />
              </button>
            </div>

            <ul className="flex flex-col gap-2">
              {ACHIEVEMENT_IDS.map((id) => {
                const a = dict.achievements[id] as { name: string; desc: string };
                const got = isUnlocked(id as AchievementId, state);
                return (
                  <li
                    key={id}
                    className={`flex items-center gap-3 rounded-lg border p-2.5 transition-colors ${
                      got
                        ? "border-[var(--color-gold-deep)] bg-[rgba(212,175,55,0.06)]"
                        : "border-[var(--color-line)] opacity-55"
                    }`}
                  >
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-md font-display text-base ${
                        got
                          ? "bg-[var(--color-gold)] text-[var(--color-ink)]"
                          : "bg-[var(--color-ink-3)] text-[var(--color-text-dim)]"
                      }`}
                    >
                      {got ? achievementMeta[id].glyph : "?"}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm text-[var(--color-text)]">{a.name}</p>
                      <p className="truncate text-xs text-[var(--color-text-dim)]">{a.desc}</p>
                    </div>
                    {got && (
                      <span className="ml-auto text-[var(--color-gold)]">
                        <Icon name="check" size={16} />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
