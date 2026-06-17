"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useI18n } from "@/components/providers/I18nProvider";
import { AutomationFlow } from "@/components/journey/AutomationFlow";
import { accentVar } from "@/components/journey/ProjectStation";
import { Icon } from "@/components/ui/Icon";
import { pick } from "@/lib/i18n";
import { ui, useUI } from "@/lib/ui";
import { sfx } from "@/lib/sfx";
import { getProject } from "@/content/projects";

export function ProjectModal() {
  const { dict, locale } = useI18n();
  const { project: id } = useUI();
  const project = id ? getProject(id) : undefined;
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = () => {
    sfx("close");
    ui.closeProject();
  };

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project]);

  const accent = project ? accentVar[project.accent] : "var(--color-gold)";
  const isAgent = project?.kind === "agent";

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-[rgba(5,4,2,0.78)] backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={pick(project.name, locale)}
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="panel relative z-10 max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-b-none rounded-t-2xl sm:rounded-2xl"
          >
            <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: accent }} />

            {/* header */}
            <div className="sticky top-0 z-10 flex items-start gap-4 border-b border-[var(--color-line)] bg-[var(--color-ink-2)]/95 p-5 backdrop-blur">
              <span
                className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border font-display text-3xl"
                style={{ borderColor: accent, color: accent }}
              >
                {project.glyph}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-2xl leading-tight text-[var(--color-text)]">
                  {pick(project.name, locale)}
                </h2>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  {pick(project.tagline, locale)}
                </p>
              </div>
              <button
                ref={closeRef}
                onClick={close}
                aria-label={dict.common.close}
                className="rounded-full border border-[var(--color-line)] p-2 text-[var(--color-text-dim)] transition-colors hover:text-[var(--color-gold)]"
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            {/* body */}
            <div className="space-y-7 p-5 sm:p-6">
              <Block label={dict.agents.problem}>{pick(project.problem, locale)}</Block>
              <Block label={dict.agents.approach}>{pick(project.approach, locale)}</Block>

              <div>
                <SectionLabel>
                  {isAgent ? dict.agents.automation : dict.builds.highlightsLabel}
                </SectionLabel>
                <AutomationFlow steps={project.steps} accent={accent} />
              </div>

              <div
                className="rounded-xl border p-4"
                style={{ borderColor: accent, background: "rgba(212,175,55,0.04)" }}
              >
                <SectionLabel>{dict.agents.impact}</SectionLabel>
                <p className="text-sm leading-relaxed text-[var(--color-text)]">
                  {pick(project.impact, locale)}
                </p>
              </div>

              <div>
                <SectionLabel>{dict.agents.stackLabel}</SectionLabel>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {project.confidential && (
                <p className="flex items-center gap-2 text-xs text-[var(--color-text-dim)]">
                  <Icon name="lock" size={13} /> {dict.agents.confidentialNote}
                </p>
              )}

              {project.links.length > 0 && (
                <div className="flex flex-wrap gap-3 pt-1">
                  {project.links.map((l) => (
                    <a
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sfx("blip")}
                      className={l.type === "live" ? "btn-gold" : "btn-ghost"}
                    >
                      <Icon name={l.type === "live" ? "external" : "github"} size={15} />
                      {l.type === "live" ? dict.builds.viewLive : dict.builds.viewCode}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 font-pixel text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold)]">
      {children}
    </p>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <SectionLabel>{label}</SectionLabel>
      <p className="leading-relaxed text-[var(--color-text)] opacity-90">{children}</p>
    </div>
  );
}
