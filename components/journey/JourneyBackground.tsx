"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

// Decorative parallax scene: sumi sky, gold moon, layered mountains, torii.
export function JourneyBackground() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const moonY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const farY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const nearY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {/* sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 70% 18%, #1a150c 0%, #100d09 45%, #0b0a07 100%)",
        }}
      />

      {/* moon */}
      <motion.div style={reduce ? undefined : { y: moonY }} className="absolute right-[12%] top-[8%]">
        <div
          className="rounded-full"
          style={{
            width: "clamp(120px, 16vw, 260px)",
            height: "clamp(120px, 16vw, 260px)",
            background: "radial-gradient(circle at 38% 35%, #e6c65a, #b8922e 70%, #8a6a1e)",
            boxShadow: "0 0 90px -10px rgba(212,175,55,0.35)",
            opacity: 0.92,
          }}
        />
      </motion.div>

      {/* far mountains */}
      <motion.div
        style={reduce ? undefined : { y: farY }}
        className="absolute bottom-0 left-0 w-full"
      >
        <svg viewBox="0 0 1440 420" className="h-auto w-full" preserveAspectRatio="none">
          <path
            d="M0 420 L240 180 L360 260 L520 120 L700 300 L860 160 L1040 280 L1200 150 L1440 320 L1440 420 Z"
            fill="#13100b"
          />
          <path d="M520 120 L470 175 L500 168 L520 150 L540 168 L572 175 Z" fill="#1d1810" />
        </svg>
      </motion.div>

      {/* near hills + a torii silhouette */}
      <motion.div
        style={reduce ? undefined : { y: nearY }}
        className="absolute bottom-0 left-0 w-full"
      >
        <svg viewBox="0 0 1440 280" className="h-auto w-full" preserveAspectRatio="none">
          <path d="M0 280 L0 200 Q360 120 720 190 T1440 180 L1440 280 Z" fill="#0d0b07" />
          <g fill="#181208" opacity="0.85">
            <rect x="1120" y="120" width="10" height="120" />
            <rect x="1200" y="120" width="10" height="120" />
            <rect x="1100" y="104" width="130" height="11" rx="2" />
            <rect x="1112" y="130" width="106" height="8" rx="1" />
            <rect x="1096" y="100" width="138" height="5" rx="2" />
          </g>
        </svg>
      </motion.div>

      {/* bottom vignette for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 55%, rgba(11,10,7,0.6) 88%, #0b0a07 100%)",
        }}
      />
    </div>
  );
}
