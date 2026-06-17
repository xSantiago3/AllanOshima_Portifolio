"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useI18n } from "@/components/providers/I18nProvider";
import { Icon } from "@/components/ui/Icon";
import { progress } from "@/lib/progress";
import { ui } from "@/lib/ui";
import { sfx } from "@/lib/sfx";

export function Hero() {
  const { dict } = useI18n();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) progress.start();
    };
    window.addEventListener("scroll", onScroll, { passive: true, once: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 text-center"
    >
      {/* giant faint glyph */}
      <span
        aria-hidden
        className="pointer-events-none absolute select-none font-display text-[42vw] leading-none text-[rgba(212,175,55,0.05)] sm:text-[34vw]"
      >
        道
      </span>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        <p className="font-pixel text-[11px] uppercase tracking-[0.35em] text-[var(--color-gold)]">
          {dict.hero.kicker}
        </p>

        <h1 className="mt-5 font-display text-6xl leading-[0.95] tracking-tight text-gold-gradient glow-gold sm:text-8xl">
          {dict.hero.name}
        </h1>

        <p className="mt-4 max-w-xl text-balance text-lg text-[var(--color-text-muted)]">
          {dict.hero.role}
        </p>

        <p className="mt-5 max-w-2xl text-pretty text-[var(--color-text)] opacity-90">
          {dict.hero.tagline}
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <a href="#origin" onClick={() => { sfx("blip"); progress.start(); }} className="btn-gold">
            <Icon name="arrowDown" size={16} />
            {dict.hero.ctaStart}
          </a>
          <button
            type="button"
            onClick={() => { sfx("open"); ui.openArcade(); }}
            className="btn-ghost"
          >
            <Icon name="play" size={15} />
            {dict.hero.ctaPlay}
          </button>
        </div>
        <p className="mt-2 font-pixel text-[9px] uppercase tracking-wider text-[var(--color-text-dim)]">
          {dict.hero.ctaPlayHint}
        </p>
      </motion.div>

      {/* scroll hint */}
      <motion.a
        href="#origin"
        aria-label={dict.hero.scrollHint}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-1 text-[var(--color-gold-muted)]"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        <span className="font-pixel text-[8px] uppercase tracking-[0.3em]">
          {dict.hero.scrollHint}
        </span>
        <Icon name="arrowDown" size={18} />
      </motion.a>
    </section>
  );
}
