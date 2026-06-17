"use client";

import { motion, useScroll } from "motion/react";
import { useI18n } from "@/components/providers/I18nProvider";
import { LanguageToggle } from "@/components/journey/LanguageToggle";
import { Icon } from "@/components/ui/Icon";
import { useProgress, progress } from "@/lib/progress";
import { unlockedAchievements, ACHIEVEMENT_IDS } from "@/lib/achievements";
import { ui } from "@/lib/ui";
import { sfx } from "@/lib/sfx";

export function Hud() {
  const { dict } = useI18n();
  const { scrollYProgress } = useScroll();
  const state = useProgress();
  const unlocked = unlockedAchievements(state).length;

  const navItems = [
    { id: "origin", label: dict.nav.origin },
    { id: "agents", label: dict.nav.agents },
    { id: "builds", label: dict.nav.builds },
    { id: "dojo", label: dict.nav.dojo },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <a
        href="#origin"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-[var(--color-gold)] focus:px-3 focus:py-1 focus:text-[var(--color-ink)]"
      >
        {dict.nav.skip}
      </a>

      <div className="border-b border-[var(--color-line)] bg-[rgba(11,10,7,0.72)] backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
          {/* identity */}
          <a href="#top" className="group flex items-center gap-2 whitespace-nowrap">
            <span className="font-display text-lg text-[var(--color-gold)] transition-transform group-hover:scale-110">
              大島
            </span>
            <span className="hidden font-pixel text-[10px] tracking-wider text-[var(--color-text-muted)] sm:inline">
              ALLAN OSHIMA
            </span>
          </a>

          {/* zone nav */}
          <nav className="ml-2 hidden items-center gap-1 md:flex" aria-label="Zonas">
            {navItems.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => sfx("blip")}
                className="rounded-full px-3 py-1.5 text-sm text-[var(--color-text-muted)] transition-colors hover:bg-[rgba(212,175,55,0.08)] hover:text-[var(--color-gold)]"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            {/* achievements */}
            <button
              type="button"
              onClick={() => {
                sfx("blip");
                ui.toggleAchievements();
              }}
              className="flex items-center gap-1.5 rounded-full border border-[var(--color-line)] bg-[rgba(212,175,55,0.05)] px-2.5 py-1.5 text-[var(--color-gold-muted)] transition-colors hover:text-[var(--color-gold)]"
              aria-label={dict.hud.achievements}
              title={dict.hud.achievements}
            >
              <Icon name="trophy" size={16} />
              <span className="font-pixel text-[10px]">
                {unlocked}/{ACHIEVEMENT_IDS.length}
              </span>
            </button>

            {/* sound */}
            <button
              type="button"
              onClick={() => {
                progress.toggleMuted();
                sfx("blip");
              }}
              className="rounded-full border border-[var(--color-line)] bg-[rgba(212,175,55,0.05)] p-2 text-[var(--color-gold-muted)] transition-colors hover:text-[var(--color-gold)]"
              aria-label={dict.hud.sound}
              aria-pressed={!state.muted}
              title={dict.hud.sound}
            >
              <Icon name={state.muted ? "soundOff" : "soundOn"} size={16} />
            </button>

            <LanguageToggle />

            {/* arcade */}
            <button
              type="button"
              onClick={() => {
                sfx("open");
                ui.openArcade();
              }}
              className="btn-gold !px-3 !py-1.5 text-sm"
            >
              <Icon name="play" size={14} />
              <span className="hidden sm:inline">{dict.hud.play}</span>
            </button>
          </div>
        </div>

        {/* journey progress bar */}
        <div className="h-[3px] w-full bg-[var(--color-ink-3)]">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-[var(--color-gold-deep)] via-[var(--color-gold)] to-[var(--color-gold-bright)]"
            style={{ scaleX: scrollYProgress }}
          />
        </div>
      </div>
    </header>
  );
}
