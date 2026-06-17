"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/providers/I18nProvider";
import { ArcadeGame } from "@/components/arcade/ArcadeGame";
import { Icon } from "@/components/ui/Icon";
import { pick } from "@/lib/i18n";
import { projects } from "@/content/projects";
import type { Accent } from "@/content/types";
import { progress } from "@/lib/progress";
import { ui, useUI } from "@/lib/ui";
import { sfx } from "@/lib/sfx";

const accentHex: Record<Accent, string> = {
  gold: "#d4af37",
  sakura: "#d98aa6",
  jade: "#6aa17b",
  vermillion: "#c0392b",
};

export function ArcadeOverlay() {
  const { dict, locale } = useI18n();
  const { project } = useUI();
  // Stable mutable object shared with the Phaser scene; the D-pad writes to it directly.
  const [controls] = useState(() => ({ left: false, right: false, interact: false }));

  const stations = useMemo(
    () =>
      projects.map((p) => ({
        id: p.id,
        glyph: p.glyph,
        label: pick(p.name, locale),
        accent: accentHex[p.accent],
      })),
    [locale],
  );

  const handleEnter = useCallback((id: string) => {
    progress.visit(id);
    sfx("open");
    ui.openProject(id);
  }, []);

  const exit = useCallback(() => {
    sfx("close");
    ui.closeArcade();
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Esc exits the arcade only when no project modal is on top.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !project) exit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, exit]);

  const hold = (key: "left" | "right" | "interact") => ({
    onPointerDown: (e: React.PointerEvent) => {
      e.preventDefault();
      controls[key] = true;
    },
    onPointerUp: () => {
      controls[key] = false;
    },
    onPointerLeave: () => {
      controls[key] = false;
    },
    onPointerCancel: () => {
      controls[key] = false;
    },
  });

  return (
    <div className="fixed inset-0 z-[45] bg-[var(--color-ink)]">
      <ArcadeGame
        stations={stations}
        controls={controls}
        onEnter={handleEnter}
        enterPrompt={dict.arcade.interact + " ↑"}
        paused={!!project}
      />

      {/* top bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4">
        <div className="pointer-events-auto flex items-center gap-2">
          <span className="font-display text-lg text-[var(--color-gold)]">大島</span>
          <span className="font-pixel text-[10px] uppercase tracking-wider text-[var(--color-gold-muted)]">
            {dict.arcade.title}
          </span>
        </div>
        <button
          type="button"
          onClick={exit}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[rgba(11,10,7,0.8)] px-3 py-1.5 text-sm text-[var(--color-gold-muted)] backdrop-blur transition-colors hover:text-[var(--color-gold)]"
        >
          <Icon name="close" size={15} /> {dict.arcade.back}
        </button>
      </div>

      {/* desktop controls legend */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-4 rounded-full border border-[var(--color-line)] bg-[rgba(11,10,7,0.7)] px-4 py-2 font-pixel text-[9px] uppercase tracking-wider text-[var(--color-gold-muted)] backdrop-blur sm:flex">
        <span>← → {dict.arcade.move}</span>
        <span className="text-[var(--color-gold)]">↑ / Enter — {dict.arcade.interact}</span>
        <span>Esc — {dict.arcade.exit}</span>
      </div>

      {/* mobile D-pad */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:hidden">
        <div className="flex gap-3">
          <DpadButton {...hold("left")} aria-label={dict.arcade.move}>
            ←
          </DpadButton>
          <DpadButton {...hold("right")} aria-label={dict.arcade.move}>
            →
          </DpadButton>
        </div>
        <DpadButton {...hold("interact")} aria-label={dict.arcade.interact} primary>
          ↑
        </DpadButton>
      </div>
    </div>
  );
}

function DpadButton({
  children,
  primary,
  ...handlers
}: {
  children: React.ReactNode;
  primary?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...handlers}
      className={`grid h-16 w-16 touch-none select-none place-items-center rounded-full border text-2xl backdrop-blur ${
        primary
          ? "border-[var(--color-gold)] bg-[rgba(212,175,55,0.18)] text-[var(--color-gold-bright)]"
          : "border-[var(--color-line)] bg-[rgba(11,10,7,0.7)] text-[var(--color-gold-muted)]"
      }`}
    >
      {children}
    </button>
  );
}
