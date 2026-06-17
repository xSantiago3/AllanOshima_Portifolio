"use client";

import { useI18n } from "@/components/providers/I18nProvider";
import { ZoneHeader } from "@/components/journey/ZoneHeader";
import { Reveal } from "@/components/journey/Reveal";
import { Icon } from "@/components/ui/Icon";
import { pick } from "@/lib/i18n";
import { profile } from "@/content/profile";

export function Origin() {
  const { dict, locale } = useI18n();

  return (
    <section id="origin" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-24">
      <ZoneHeader
        glyph="始"
        label={dict.zones.origin.label}
        title={dict.zones.origin.title}
        subtitle={dict.zones.origin.subtitle}
      />

      <div className="grid gap-8 md:grid-cols-2">
        {/* about */}
        <Reveal className="panel grain relative overflow-hidden p-6">
          <h3 className="mb-3 font-display text-xl text-[var(--color-gold)]">
            {dict.origin.aboutTitle}
          </h3>
          <p className="leading-relaxed text-[var(--color-text)] opacity-90">
            {dict.origin.about}
          </p>

          <div className="mt-6 grid gap-3">
            <div className="rounded-lg border border-[var(--color-line)] p-3">
              <p className="font-pixel text-[9px] uppercase tracking-wider text-[var(--color-gold)]">
                {dict.origin.educationTitle}
              </p>
              <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">{dict.origin.education}</p>
            </div>
            <div className="rounded-lg border border-[var(--color-line)] p-3">
              <p className="font-pixel text-[9px] uppercase tracking-wider text-[var(--color-gold)]">
                {dict.origin.languagesTitle}
              </p>
              <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">{dict.origin.langPt}</p>
              <p className="text-sm text-[var(--color-text-muted)]">{dict.origin.langEn}</p>
            </div>
          </div>
        </Reveal>

        {/* timeline */}
        <Reveal delay={0.1}>
          <h3 className="mb-4 font-display text-xl text-[var(--color-gold)]">
            {dict.origin.timelineTitle}
          </h3>
          <ol className="relative ml-3 border-l border-[var(--color-gold-deep)]">
            {profile.career.map((job) => (
              <li key={job.company} className="mb-7 ml-6">
                <span className="absolute -left-[9px] grid h-4 w-4 place-items-center rounded-full bg-[var(--color-gold)] ring-4 ring-[var(--color-ink)]">
                  {job.current && (
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-ink)]" />
                  )}
                </span>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <p className="font-medium text-[var(--color-text)]">{job.company}</p>
                  <span className="font-pixel text-[9px] text-[var(--color-text-dim)]">
                    {job.period}
                    {job.current ? dict.origin.present : ""}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-gold-muted)]">{pick(job.role, locale)}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {pick(job.summary, locale)}
                </p>
              </li>
            ))}
          </ol>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 text-sm text-[var(--color-gold)] hover:text-[var(--color-gold-bright)]"
          >
            <Icon name="github" size={16} /> github.com/xSantiago3
            <Icon name="external" size={13} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
