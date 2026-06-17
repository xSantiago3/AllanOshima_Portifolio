"use client";

import { useI18n } from "@/components/providers/I18nProvider";
import { ZoneHeader } from "@/components/journey/ZoneHeader";
import { Reveal } from "@/components/journey/Reveal";
import { ProjectStation } from "@/components/journey/ProjectStation";
import { agentProjects } from "@/content/projects";

export function AgentsZone() {
  const { dict } = useI18n();

  return (
    <section id="agents" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24">
      <ZoneHeader
        glyph="群"
        label={dict.zones.agents.label}
        title={dict.zones.agents.title}
        subtitle={dict.zones.agents.subtitle}
      />

      <Reveal className="mx-auto mb-10 max-w-2xl text-center text-[var(--color-text-muted)]">
        {dict.agents.intro}
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {agentProjects.map((p, i) => (
          <ProjectStation key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
