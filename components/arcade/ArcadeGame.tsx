"use client";

import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { WorldScene, type StationData } from "./WorldScene";

type Controls = { left: boolean; right: boolean; interact: boolean };

export function ArcadeGame({
  stations,
  controls,
  onEnter,
  enterPrompt,
  paused,
}: {
  stations: StationData[];
  controls: Controls;
  onEnter: (id: string) => void;
  enterPrompt: string;
  paused: boolean;
}) {
  const parentRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!parentRef.current) return;

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: parentRef.current,
      backgroundColor: "#0b0a07",
      scale: { mode: Phaser.Scale.RESIZE, autoCenter: Phaser.Scale.CENTER_BOTH },
      banner: false,
      audio: { noAudio: true },
    });

    game.scene.add("world", WorldScene, true, {
      stations,
      controls,
      onEnter,
      enterPrompt,
    });

    gameRef.current = game;
    return () => {
      game.destroy(true);
      gameRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const game = gameRef.current;
    if (!game) return;
    if (paused) game.scene.pause("world");
    else game.scene.resume("world");
  }, [paused]);

  return <div ref={parentRef} className="absolute inset-0" />;
}
