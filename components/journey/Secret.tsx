"use client";

import { useEffect, useState } from "react";
import { Sakura } from "@/components/ui/Sakura";
import { progress } from "@/lib/progress";
import { sfx } from "@/lib/sfx";

const CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function Secret() {
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (k === CODE[idx]) {
        idx += 1;
        if (idx === CODE.length) {
          idx = 0;
          progress.unlockSecret();
          sfx("unlock");
          setBurst(true);
          window.setTimeout(() => setBurst(false), 6000);
        }
      } else {
        idx = k === CODE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!burst) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      <Sakura density={150} />
    </div>
  );
}
