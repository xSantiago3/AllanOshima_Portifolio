import type { Localized } from "@/lib/i18n";

export type ProjectKind = "agent" | "build";
export type Accent = "gold" | "sakura" | "jade" | "vermillion";

export interface Step {
  title: Localized;
  desc: Localized;
}

export interface ProjectLink {
  type: "live" | "code";
  label: string;
  url: string;
}

export interface Project {
  id: string;
  kind: ProjectKind;
  /** kanji/kana emblem shown on the station gate */
  glyph: string;
  /** icon key resolved by components/ui/Icon.tsx */
  icon: string;
  name: Localized;
  tagline: Localized;
  problem: Localized;
  approach: Localized;
  /** agents: pipeline steps · builds: feature highlights */
  steps: Step[];
  impact: Localized;
  stack: string[];
  links: ProjectLink[];
  confidential: boolean;
  accent: Accent;
}

export interface CareerItem {
  company: string;
  role: Localized;
  period: string;
  current?: boolean;
  summary: Localized;
}

export type SkillLevel = "expert" | "specialist" | "advanced" | "intermediate";

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SkillGroup {
  key: "groupGenai" | "groupAiops" | "groupEng" | "groupCraft";
  glyph: string;
  accent: Accent;
  skills: Skill[];
}

export interface Profile {
  name: string;
  glyph: string;
  title: Localized;
  location: Localized;
  email: string;
  github: string;
  whatsapp: string;
  career: CareerItem[];
  certifications: string[];
}
