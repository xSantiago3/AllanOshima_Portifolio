"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useI18n } from "@/components/providers/I18nProvider";
import { Icon } from "@/components/ui/Icon";
import { useProgress } from "@/lib/progress";
import { unlockedAchievements, achievementMeta, type AchievementId } from "@/lib/achievements";
import { sfx } from "@/lib/sfx";

export function AchievementToast() {
  const { dict } = useI18n();
  const state = useProgress();
  const known = useRef<Set<AchievementId> | null>(null);
  const [queue, setQueue] = useState<AchievementId[]>([]);

  useEffect(() => {
    const current = new Set(unlockedAchievements(state));
    if (known.current === null) {
      // first paint after hydration: don't replay already-earned achievements
      known.current = current;
      return;
    }
    const fresh: AchievementId[] = [];
    current.forEach((id) => {
      if (!known.current!.has(id)) fresh.push(id);
    });
    if (fresh.length) {
      known.current = current;
      sfx("unlock");
      setQueue((q) => [...q, ...fresh]);
    }
  }, [state]);

  useEffect(() => {
    if (!queue.length) return;
    const t = setTimeout(() => setQueue((q) => q.slice(1)), 3200);
    return () => clearTimeout(t);
  }, [queue]);

  const current = queue[0];

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <AnimatePresence mode="wait">
        {current && (
          <motion.div
            key={current}
            className="panel pointer-events-auto flex items-center gap-3 px-4 py-3 ring-gold"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            role="status"
          >
            <span className="grid h-11 w-11 place-items-center rounded-md bg-[var(--color-gold)] font-display text-xl text-[var(--color-ink)]">
              {achievementMeta[current].glyph}
            </span>
            <div>
              <p className="font-pixel text-[9px] uppercase tracking-wider text-[var(--color-gold)]">
                {dict.achievements.unlocked}
              </p>
              <p className="text-sm text-[var(--color-text)]">
                {(dict.achievements[current] as { name: string }).name}
              </p>
            </div>
            <Icon name="sparkles" size={18} className="text-[var(--color-gold-bright)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
