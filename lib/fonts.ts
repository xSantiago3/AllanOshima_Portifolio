import { Shippori_Mincho, Zen_Kaku_Gothic_New, Press_Start_2P } from "next/font/google";

// Display serif with a Japanese-mincho feel (titles, glyphs)
export const mincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-mincho",
  display: "swap",
});

// Clean humanist sans for body copy
export const zen = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-zen",
  display: "swap",
});

// Arcade pixel font for the HUD / labels
export const pixel = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
  display: "swap",
});

export const fontVariables = `${zen.variable} ${mincho.variable} ${pixel.variable}`;
