"use client";

import { useEffect, useRef } from "react";

type Petal = {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rot: number;
  rotSpeed: number;
  sway: number;
  swaySpeed: number;
  hue: number;
};

const COLORS = ["#d98aa6", "#e6b3c6", "#d4af37", "#e6c65a"];

export function Sakura({ density = 28 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let petals: Petal[] = [];

    const make = (): Petal => ({
      x: Math.random() * w,
      y: Math.random() * -h,
      size: 6 + Math.random() * 8,
      speedY: 0.4 + Math.random() * 0.9,
      speedX: -0.3 + Math.random() * 0.6,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: -0.02 + Math.random() * 0.04,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.01 + Math.random() * 0.02,
      hue: Math.floor(Math.random() * COLORS.length),
    });

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((density * w) / 1280);
      petals = Array.from({ length: Math.max(10, count) }, make);
    };

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = COLORS[p.hue];
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.5, p.size * 0.32, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of petals) {
        p.sway += p.swaySpeed;
        p.x += p.speedX + Math.sin(p.sway) * 0.5;
        p.y += p.speedY;
        p.rot += p.rotSpeed;
        if (p.y > h + 20) {
          p.y = -10;
          p.x = Math.random() * w;
        }
        if (p.x > w + 20) p.x = -10;
        if (p.x < -20) p.x = w + 10;
        drawPetal(p);
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
