"use client";

import { useI18n } from "@/components/providers/I18nProvider";
import { ZoneHeader } from "@/components/journey/ZoneHeader";
import { Reveal } from "@/components/journey/Reveal";
import { ProjectStation } from "@/components/journey/ProjectStation";
import { buildProjects } from "@/content/projects";

export function BuildsZone() {
  const { dict } = useI18n();

  return (
    <section id="builds" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24">
      <ZoneHeader
        glyph="山"
        label={dict.zones.builds.label}
        title={dict.zones.builds.title}
        subtitle={dict.zones.builds.subtitle}
      />

      <Reveal className="mx-auto mb-10 max-w-2xl text-center text-[var(--color-text-muted)]">
        {dict.builds.intro}
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2">
        {buildProjects.map((p, i) => (
          <ProjectStation key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
