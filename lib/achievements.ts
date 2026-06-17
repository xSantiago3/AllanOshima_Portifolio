import { agentProjects, buildProjects } from "@/content/projects";
import type { ProgressState } from "@/lib/progress";

export const ACHIEVEMENT_IDS = [
  "firstStep",
  "agentMaster",
  "builder",
  "polyglot",
  "reachedDojo",
  "secret",
] as const;

export type AchievementId = (typeof ACHIEVEMENT_IDS)[number];

const agentIds = agentProjects.map((p) => p.id);
const buildIds = buildProjects.map((p) => p.id);

export function isUnlocked(id: AchievementId, s: ProgressState): boolean {
  switch (id) {
    case "firstStep":
      return s.started;
    case "agentMaster":
      return agentIds.every((a) => s.visited.includes(a));
    case "builder":
      return buildIds.filter((b) => s.visited.includes(b)).length >= 2;
    case "polyglot":
      return s.langSwitched;
    case "reachedDojo":
      return s.dojo;
    case "secret":
      return s.secret;
  }
}

export function unlockedAchievements(s: ProgressState): AchievementId[] {
  return ACHIEVEMENT_IDS.filter((id) => isUnlocked(id, s));
}

/** Glyph + icon used to render each badge. */
export const achievementMeta: Record<AchievementId, { glyph: string; icon: string }> = {
  firstStep: { glyph: "一", icon: "footprints" },
  agentMaster: { glyph: "群", icon: "radar" },
  builder: { glyph: "匠", icon: "hammer" },
  polyglot: { glyph: "語", icon: "globe" },
  reachedDojo: { glyph: "悟", icon: "torii" },
  secret: { glyph: "桜", icon: "sparkles" },
};
