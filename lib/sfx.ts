import { getProgress } from "@/lib/progress";

type SfxKind = "blip" | "open" | "close" | "unlock" | "step";

let actx: AudioContext | null = null;

// Tiny synthesized UI sounds. Silent whenever the user keeps sound muted (default).
export function sfx(kind: SfxKind) {
  try {
    if (typeof window === "undefined") return;
    if (getProgress().muted) return;

    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    actx ??= new Ctor();

    const t = actx.currentTime;
    const o = actx.createOscillator();
    const g = actx.createGain();

    const base =
      kind === "unlock" ? 660 : kind === "open" ? 440 : kind === "close" ? 280 : kind === "step" ? 200 : 360;
    o.type = kind === "unlock" ? "sine" : "triangle";
    o.frequency.setValueAtTime(base, t);
    if (kind === "unlock") o.frequency.exponentialRampToValueAtTime(base * 2, t + 0.14);
    if (kind === "open") o.frequency.exponentialRampToValueAtTime(base * 1.5, t + 0.08);

    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.05, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);

    o.connect(g).connect(actx.destination);
    o.start(t);
    o.stop(t + 0.22);
  } catch {
    /* audio not available */
  }
}
