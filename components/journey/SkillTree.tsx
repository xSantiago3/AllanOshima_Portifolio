"use client";

import { motion, useReducedMotion } from "motion/react";
import { useI18n } from "@/components/providers/I18nProvider";
import { Reveal } from "@/components/journey/Reveal";
import { accentVar } from "@/components/journey/ProjectStation";
import { skillGroups, levelValue } from "@/content/profile";

export function SkillTree() {
  const { dict } = useI18n();
  const reduce = useReducedMotion();

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {skillGroups.map((group, gi) => {
        const accent = accentVar[group.accent];
        return (
          <Reveal key={group.key} delay={gi * 0.06} className="panel p-5">
            <div className="mb-4 flex items-center gap-3">
              <span
                className="grid h-10 w-10 place-items-center rounded-lg border font-display text-xl"
                style={{ borderColor: accent, color: accent }}
              >
                {group.glyph}
              </span>
              <h3 className="font-display text-base text-[var(--color-text)]">
                {dict.skills[group.key]}
              </h3>
            </div>

            <ul className="flex flex-col gap-3">
              {group.skills.map((skill) => {
                const value = levelValue[skill.level];
                return (
                  <li key={skill.name}>
                    <div className="mb-1 flex items-baseline justify-between">
                      <span className="text-sm text-[var(--color-text)]">{skill.name}</span>
                      <span className="font-pixel text-[8px] uppercase tracking-wider text-[var(--color-text-dim)]">
                        {dict.skills.levels[skill.level]}
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-ink-3)]">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: accent }}
                        initial={reduce ? false : { width: 0 }}
                        whileInView={{ width: `${value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        );
      })}
    </div>
  );
}
