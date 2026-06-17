"use client";

import { useI18n } from "@/components/providers/I18nProvider";
import { Reveal } from "@/components/journey/Reveal";
import { Icon } from "@/components/ui/Icon";
import { pick } from "@/lib/i18n";
import { progress, useProgress } from "@/lib/progress";
import { ui } from "@/lib/ui";
import { sfx } from "@/lib/sfx";
import type { Accent, Project } from "@/content/types";

export const accentVar: Record<Accent, string> = {
  gold: "var(--color-gold)",
  sakura: "var(--color-sakura)",
  jade: "var(--color-jade)",
  vermillion: "var(--color-vermillion)",
};

export function ProjectStation({ project, index }: { project: Project; index: number }) {
  const { dict, locale } = useI18n();
  const visited = useProgress().visited.includes(project.id);
  const live = project.links.find((l) => l.type === "live");
  const accent = accentVar[project.accent];

  const open = () => {
    sfx("open");
    progress.visit(project.id);
    ui.openProject(project.id);
  };

  return (
    <Reveal delay={Math.min(index * 0.06, 0.3)}>
      <button
        type="button"
        onClick={open}
        style={{ ["--accent" as string]: accent }}
        className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_18px_40px_-22px_var(--accent)]"
      >
        {/* top accent bar */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px] opacity-70 transition-opacity group-hover:opacity-100"
          style={{ background: accent }}
        />

        <div className="mb-4 flex items-start justify-between gap-3">
          {/* glyph gate */}
          <span
            className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border font-display text-2xl"
            style={{ borderColor: accent, color: accent }}
          >
            {project.glyph}
          </span>

          <div className="flex items-center gap-1.5">
            {project.confidential && (
              <span className="chip" title={dict.agents.confidentialNote}>
                <Icon name="lock" size={12} /> NDA
              </span>
            )}
            {live && (
              <span className="chip !text-[var(--color-jade)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-jade)]" />
                {dict.builds.liveLabel}
              </span>
            )}
            {visited && (
              <span className="text-[var(--color-gold)]" title="✓">
                <Icon name="check" size={16} />
              </span>
            )}
          </div>
        </div>

        <h3 className="font-display text-lg leading-snug text-[var(--color-text)]">
          {pick(project.name, locale)}
        </h3>
        <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">
          {pick(project.tagline, locale)}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="chip">+{project.stack.length - 3}</span>
          )}
        </div>

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] opacity-80 transition-opacity group-hover:opacity-100">
          {dict.agents.automation}
          <Icon name="arrowRight" size={15} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </button>
    </Reveal>
  );
}
