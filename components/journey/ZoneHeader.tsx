"use client";

import { Reveal } from "@/components/journey/Reveal";

export function ZoneHeader({
  glyph,
  label,
  title,
  subtitle,
}: {
  glyph: string;
  label: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Reveal className="mb-12 text-center">
      <div className="mb-3 flex items-center justify-center gap-3">
        <span className="h-px w-10 bg-[var(--color-gold-deep)]" />
        <span className="font-pixel text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
          {label}
        </span>
        <span className="h-px w-10 bg-[var(--color-gold-deep)]" />
      </div>
      <div className="relative inline-flex flex-col items-center">
        <span className="pointer-events-none absolute -top-10 select-none font-display text-6xl text-[rgba(212,175,55,0.08)]">
          {glyph}
        </span>
        <h2 className="font-display text-3xl text-[var(--color-text)] sm:text-4xl">{title}</h2>
      </div>
      <p className="mx-auto mt-3 max-w-xl text-balance text-[var(--color-text-muted)]">
        {subtitle}
      </p>
      <div className="kintsugi mx-auto mt-6 w-40" />
    </Reveal>
  );
}
