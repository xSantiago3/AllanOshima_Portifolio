import type { SVGProps } from "react";

// Minimal stroke icon set (currentColor). Keep paths lean for bundle size.
const paths: Record<string, React.ReactNode> = {
  radar: (
    <>
      <path d="M12 12 19 5" />
      <path d="M12 3a9 9 0 1 0 9 9" />
      <path d="M12 7a5 5 0 1 0 5 5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  chat: (
    <>
      <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
      <path d="M8 10h8M8 13h5" />
    </>
  ),
  cart: (
    <>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M2 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.6L22 7H6" />
    </>
  ),
  doc: (
    <>
      <path d="M14 3v5h5" />
      <path d="M19 8v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7z" />
      <path d="M9 13h6M9 17h6" />
    </>
  ),
  heart: <path d="M12 21s-7-4.5-9.5-9A5.2 5.2 0 0 1 12 6a5.2 5.2 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />,
  camera: (
    <>
      <path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L19 6h0a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  bot: (
    <>
      <rect x="4" y="8" width="16" height="11" rx="2" />
      <path d="M12 8V4M9 13h.01M15 13h.01M9 16h6" />
      <path d="M2 12v3M22 12v3" />
    </>
  ),
  store: (
    <>
      <path d="M3 9 4.5 4h15L21 9" />
      <path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
      <path d="M5 11v9h14v-9M9 20v-5h6v5" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  github: (
    <path d="M9 19c-4.5 1.5-4.5-2.2-6-2.8m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.7 11.7 0 0 0-6 0C6.3 3.1 5.3 3.4 5.3 3.4a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.8c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  ),
  external: (
    <>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  whatsapp: (
    <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5zM9 8.5c-.3 0-.6.1-.8.4-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.7 2.8 4.3 3.8 2.1.8 2.6.7 3 .6.6-.1 1.6-.7 1.8-1.3.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.4-.3-.2-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.6.9-.8 1-.1.2-.3.2-.5.1-.3-.2-1.2-.5-2.2-1.4-.8-.7-1.3-1.6-1.5-1.9-.1-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5 .1-.2 0-.4 0-.5 0-.2-.6-1.5-.8-2-.2-.4-.4-.4-.6-.4z" />
  ),
  close: <path d="M18 6 6 18M6 6l12 12" />,
  arrowRight: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  arrowDown: (
    <>
      <path d="M12 5v14" />
      <path d="m6 13 6 6 6-6" />
    </>
  ),
  chevronRight: <path d="m9 6 6 6-6 6" />,
  soundOn: (
    <>
      <path d="M11 5 6 9H3v6h3l5 4z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 6a8 8 0 0 1 0 12" />
    </>
  ),
  soundOff: (
    <>
      <path d="M11 5 6 9H3v6h3l5 4z" />
      <path d="M22 9l-6 6M16 9l6 6" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z" />
      <path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3" />
    </>
  ),
  play: <path d="M6 4v16l14-8z" />,
  map: (
    <>
      <path d="m9 4 6 2 6-2v14l-6 2-6-2-6 2V6z" />
      <path d="M9 4v14M15 6v14" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3C9.5 5.5 9.5 18.5 12 21" />
    </>
  ),
  footprints: (
    <>
      <path d="M4 16c0-2 .5-3 .5-5 0-1.5 1-2.5 2-2.5s1.5 1 1.5 2.5c0 2 .5 3 .5 5 0 1.5-1 2-2.2 2S4 17.5 4 16z" />
      <path d="M15 12c0-2 .5-3 .5-5C15.5 5.5 16.5 5 17.5 5s1.5 1 1.5 2.5c0 2 .5 3 .5 5 0 1.5-1 2-2.2 2S15 13.5 15 12z" />
    </>
  ),
  hammer: (
    <>
      <path d="m14 7 5 5M9.5 7.5 4 13a2 2 0 0 0 0 3l1 1a2 2 0 0 0 3 0l5.5-5.5" />
      <path d="M13 6 17 2l5 5-4 4-5-5z" />
    </>
  ),
  torii: (
    <>
      <path d="M3 6c3 1.5 15 1.5 18 0M4 8c2.5 1 13.5 1 16 0" />
      <path d="M6 8v12M18 8v12M5 12h14" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z" />
      <path d="M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  download: (
    <>
      <path d="M12 3v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M5 21h14" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
};

export function Icon({
  name,
  size = 20,
  ...props
}: { name: string; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] ?? null}
    </svg>
  );
}
