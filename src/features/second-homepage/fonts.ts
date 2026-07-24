import { IBM_Plex_Mono, Libre_Franklin, Oswald } from "next/font/google";

export const shpDisplay = Oswald({
  subsets: ["latin", "latin-ext"],
  variable: "--shp-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const shpBody = Libre_Franklin({
  subsets: ["latin", "latin-ext"],
  variable: "--shp-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const shpMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--shp-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const shpFontClassName = [
  shpDisplay.variable,
  shpBody.variable,
  shpMono.variable,
].join(" ");
