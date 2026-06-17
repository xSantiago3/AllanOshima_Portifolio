"use client";

import dynamic from "next/dynamic";
import { JourneyBackground } from "@/components/journey/JourneyBackground";
import { Sakura } from "@/components/ui/Sakura";
import { Hud } from "@/components/journey/Hud";
import { Hero } from "@/components/journey/Hero";
import { Origin } from "@/components/journey/Origin";
import { AgentsZone } from "@/components/journey/AgentsZone";
import { BuildsZone } from "@/components/journey/BuildsZone";
import { Dojo } from "@/components/journey/Dojo";
import { Footer } from "@/components/journey/Footer";
import { AchievementsPanel } from "@/components/journey/AchievementsPanel";
import { AchievementToast } from "@/components/journey/AchievementToast";
import { ProjectModal } from "@/components/journey/ProjectModal";
import { Secret } from "@/components/journey/Secret";
import { useUI } from "@/lib/ui";

// Phaser only loads when the visitor opens the arcade — keeps the journey light.
const ArcadeOverlay = dynamic(
  () => import("@/components/arcade/ArcadeOverlay").then((m) => m.ArcadeOverlay),
  { ssr: false },
);

export function Journey() {
  const { arcade } = useUI();

  return (
    <>
      <JourneyBackground />
      <Sakura density={22} />
      <Hud />

      <main className="relative">
        <Hero />
        <Origin />
        <AgentsZone />
        <BuildsZone />
        <Dojo />
        <Footer />
      </main>

      <AchievementsPanel />
      <AchievementToast />
      <ProjectModal />
      <Secret />

      {arcade && <ArcadeOverlay />}
    </>
  );
}
