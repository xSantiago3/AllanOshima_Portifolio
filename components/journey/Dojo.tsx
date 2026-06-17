"use client";

import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import { useI18n } from "@/components/providers/I18nProvider";
import { ZoneHeader } from "@/components/journey/ZoneHeader";
import { Reveal } from "@/components/journey/Reveal";
import { SkillTree } from "@/components/journey/SkillTree";
import { ContactForm } from "@/components/journey/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { profile } from "@/content/profile";
import { progress } from "@/lib/progress";
import { sfx } from "@/lib/sfx";

export function Dojo() {
  const { dict } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  useEffect(() => {
    if (inView) progress.reachDojo();
  }, [inView]);

  return (
    <section id="dojo" ref={ref} className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24">
      <ZoneHeader
        glyph="社"
        label={dict.zones.dojo.label}
        title={dict.zones.dojo.title}
        subtitle={dict.zones.dojo.subtitle}
      />

      <Reveal className="mx-auto mb-12 max-w-2xl text-center text-[var(--color-text-muted)]">
        {dict.dojo.subtitle}
      </Reveal>

      {/* skills */}
      <Reveal className="mb-6">
        <h3 className="mb-5 text-center font-display text-xl text-[var(--color-gold)]">
          {dict.dojo.skillsTitle}
        </h3>
      </Reveal>
      <SkillTree />

      {/* certs + cv  /  contact */}
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Reveal className="flex flex-col gap-6">
          <div className="panel p-5">
            <h3 className="mb-4 font-display text-lg text-[var(--color-gold)]">
              {dict.dojo.certsTitle}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {profile.certifications.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-sm text-[var(--color-text-muted)]">
                  <span className="mt-0.5 text-[var(--color-gold)]">
                    <Icon name="sparkles" size={15} />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="panel p-5">
            <h3 className="mb-4 font-display text-lg text-[var(--color-gold)]">
              {dict.dojo.cvTitle}
            </h3>
            <div className="flex flex-wrap gap-3">
              <a
                href="/cv/Allan_Oshima_CV_PT.pdf"
                download
                onClick={() => sfx("blip")}
                className="btn-ghost"
              >
                <Icon name="download" size={15} /> {dict.dojo.downloadCvPt}
              </a>
              <a
                href="/cv/Allan_Oshima_CV_EN.pdf"
                download
                onClick={() => sfx("blip")}
                className="btn-ghost"
              >
                <Icon name="download" size={15} /> {dict.dojo.downloadCvEn}
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mb-4 text-center lg:text-left">
            <h3 className="font-display text-xl text-[var(--color-gold)]">
              {dict.dojo.contactTitle}
            </h3>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              {dict.dojo.contactSubtitle}
            </p>
          </div>

          <ContactForm />

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 text-sm text-[var(--color-gold)] hover:text-[var(--color-gold-bright)]"
            >
              <Icon name="mail" size={16} /> {dict.dojo.emailMe}
            </a>
            <span className="text-[var(--color-text-dim)]">·</span>
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-gold)] hover:text-[var(--color-gold-bright)]"
            >
              <Icon name="whatsapp" size={16} /> WhatsApp
            </a>
            <span className="text-[var(--color-text-dim)]">·</span>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-gold)] hover:text-[var(--color-gold-bright)]"
            >
              <Icon name="github" size={16} /> GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
