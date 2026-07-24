import { IBM_Plex_Mono, Libre_Franklin, Oswald } from "next/font/google";

/**
 * Type2 fonts — keep the architectural blueprint pairing.
 * Display + body are the primary pair; mono is an intentional
 * branded exception for coordinates / plate labels.
 */
export const shp2Display = Oswald({
  subsets: ["latin", "latin-ext"],
  variable: "--shp-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const shp2Body = Libre_Franklin({
  subsets: ["latin", "latin-ext"],
  variable: "--shp-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const shp2Mono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--shp-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const shp2FontClassName = [
  shp2Display.variable,
  shp2Body.variable,
  shp2Mono.variable,
].join(" ");
