"use client";

import { useEffect } from "react";

// Static-export root: detect the visitor's language and forward to /pt or /en.
export default function RootRedirect() {
  useEffect(() => {
    let target = "pt";
    try {
      const stored = localStorage.getItem("ao_locale");
      if (stored === "pt" || stored === "en") {
        target = stored;
      } else if (typeof navigator !== "undefined") {
        target = navigator.language?.toLowerCase().startsWith("en") ? "en" : "pt";
      }
    } catch {
      /* ignore */
    }
    window.location.replace(`/${target}/`);
  }, []);

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        background: "#0b0a07",
        color: "#d4af37",
        fontFamily: "var(--font-mincho), serif",
        gap: "1rem",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <div aria-hidden style={{ fontSize: "2.5rem", letterSpacing: "0.3em" }}>
        大島
      </div>
      <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>Loading… / Carregando…</p>
      <noscript>
        <p>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/pt/" style={{ color: "#e6c65a" }}>
            Português
          </a>
          {" · "}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/en/" style={{ color: "#e6c65a" }}>
            English
          </a>
        </p>
      </noscript>
    </main>
  );
}
