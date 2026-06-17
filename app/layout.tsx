import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://allan-oshima.web.app"),
  title: {
    default: "Allan Oshima — AI/ML Engineer · Agents & AIOps",
    template: "%s · Allan Oshima",
  },
  description:
    "Gamified portfolio of Allan Oshima — AI/ML specialist. AI agents, intelligent automation, GenAI and AIOps.",
  authors: [{ name: "Allan Oshima" }],
  creator: "Allan Oshima",
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#0b0a07",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt" suppressHydrationWarning className={`${fontVariables} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
