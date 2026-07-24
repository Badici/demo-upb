import type { SketchAssetMeta } from "@/features/second-homepage/sketch-assets";

/**
 * Cropped sketch assets for section-title companions.
 * Source PNGs often have transparent padding; these are content-cropped
 * so the drawing top-aligns with titles without empty canvas gaps.
 */
export const SECTION_SKETCHES = {
  events: {
    src: "/sketch-assets/section/events-section.png",
    alt: "Schiță arhitecturală — evenimente",
    category: "interior",
    width: 1536,
    height: 752,
  },
  stats: {
    src: "/sketch-assets/section/aula-3d.png",
    alt: "Schiță arhitecturală — aulă universitară",
    category: "interior",
    width: 1500,
    height: 950,
  },
  news: {
    src: "/sketch-assets/section/macheta-avion-1.png",
    alt: "Schiță arhitecturală — machetă avion",
    category: "model",
    width: 1272,
    height: 753,
  },
  services: {
    src: "/sketch-assets/section/hol-perspectiva.png",
    alt: "Schiță arhitecturală — hol în perspectivă",
    category: "interior",
    width: 1447,
    height: 987,
  },
  partners: {
    src: "/sketch-assets/section/coloana-infinitului.png",
    alt: "Schiță arhitecturală — Coloana Infinitului",
    category: "sculpture",
    width: 780,
    height: 1346,
  },
  resources: {
    src: "/sketch-assets/section/bibilioteca-fata.png",
    alt: "Schiță arhitecturală — Biblioteca Centrală, fațadă",
    category: "exterior",
    width: 1450,
    height: 770,
  },
  admissions: {
    src: "/sketch-assets/section/cupola-rectorat.png",
    alt: "Schiță arhitecturală — cupola Rectoratului",
    category: "exterior",
    width: 1488,
    height: 1196,
  },
} as const satisfies Record<
  string,
  SketchAssetMeta & { width: number; height: number }
>;

export const EVENTS_SECTION_SKETCH = SECTION_SKETCHES.events;
export const STATS_SECTION_SKETCH = SECTION_SKETCHES.stats;
