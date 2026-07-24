export type SketchAssetMeta = {
  src: string;
  alt: string;
  category:
    | "exterior"
    | "interior"
    | "detail"
    | "pattern"
    | "sculpture"
    | "model";
};

export const SKETCH_ASSETS = {
  rectoratFull: {
    src: "/sketch-assets/rectorat-full.png",
    alt: "Schiță arhitecturală — fațada Rectoratului Politehnica București",
    category: "exterior",
  },
  rectoratLateral: {
    src: "/sketch-assets/rectorat-lateral.png",
    alt: "Schiță arhitecturală — vedere laterală Rectorat",
    category: "exterior",
  },
  rectoratBicolor: {
    src: "/sketch-assets/rectorat-bicolor.png",
    alt: "Schiță arhitecturală bicoloră — Rectorat",
    category: "exterior",
  },
  cupola: {
    src: "/sketch-assets/cupola-rectorat.png",
    alt: "Schiță arhitecturală — cupola Rectoratului",
    category: "exterior",
  },
  scari: {
    src: "/sketch-assets/scari-rectorat-2.png",
    alt: "Schiță arhitecturală — scări Rectorat",
    category: "interior",
  },
  holPerspectiva: {
    src: "/sketch-assets/hol-perspectiva.png",
    alt: "Schiță arhitecturală — hol în perspectivă",
    category: "interior",
  },
  holRectorat: {
    src: "/sketch-assets/hol-rectorat-2.png",
    alt: "Schiță arhitecturală — hol Rectorat",
    category: "interior",
  },
  scariCupola: {
    src: "/sketch-assets/scaril-hol-rectorat-perspectiva.png",
    alt: "Schiță arhitecturală — scări și cupolă",
    category: "interior",
  },
  lateralScariCupola: {
    src: "/sketch-assets/lateral-scari-cupola.png",
    alt: "Schiță arhitecturală — scări și cupolă, vedere laterală",
    category: "interior",
  },
  bibliotecaFata: {
    src: "/sketch-assets/bibilioteca-fata.png",
    alt: "Schiță arhitecturală — Biblioteca Centrală, fațadă",
    category: "exterior",
  },
  bibliotecaLateral: {
    src: "/sketch-assets/biblioteca-lateral.png",
    alt: "Schiță arhitecturală — Biblioteca Centrală, lateral",
    category: "exterior",
  },
  aula3d: {
    src: "/sketch-assets/aula-3d.png",
    alt: "Schiță arhitecturală — aulă universitară",
    category: "interior",
  },
  detaliuTavan: {
    src: "/sketch-assets/detaliu-tavan.png",
    alt: "Schiță arhitecturală — detaliu tavan",
    category: "detail",
  },
  detaliuTavanFull: {
    src: "/sketch-assets/detaliu-tavan-2-full.png",
    alt: "Schiță arhitecturală — detaliu tavan, vedere completă",
    category: "detail",
  },
  detaliuTavan3d: {
    src: "/sketch-assets/detaliu-tavavn-3-3d.png",
    alt: "Schiță arhitecturală — detaliu tavan 3D",
    category: "detail",
  },
  patternCaramida: {
    src: "/sketch-assets/pattern-caramida.png",
    alt: "Pattern arhitectural — cărămidă",
    category: "pattern",
  },
  patternCupola: {
    src: "/sketch-assets/patern-cupola-rectorat.png",
    alt: "Pattern arhitectural — cupolă Rectorat",
    category: "pattern",
  },
  patternPodea: {
    src: "/sketch-assets/pattern-podea-hol-cupola.png",
    alt: "Pattern arhitectural — podea hol cupolă",
    category: "pattern",
  },
  podeaHol: {
    src: "/sketch-assets/podea-hol-cupola.png",
    alt: "Schiță arhitecturală — podea hol cupolă",
    category: "detail",
  },
  coloana: {
    src: "/sketch-assets/coloana-infinitului.png",
    alt: "Schiță sculpturală — Coloana Infinitului",
    category: "sculpture",
  },
  avionHol1: {
    src: "/sketch-assets/avion-hol-1.png",
    alt: "Schiță — machetă avion suspendată în hol",
    category: "model",
  },
  avionHol2: {
    src: "/sketch-assets/avion-hol-2.png",
    alt: "Schiță — machetă avion, vedere alternativă",
    category: "model",
  },
  machetaAvion1: {
    src: "/sketch-assets/macheta-avion-1.png",
    alt: "Schiță — machetă avion 1",
    category: "model",
  },
  machetaAvion2: {
    src: "/sketch-assets/macheta-avion-2.png",
    alt: "Schiță — machetă avion 2",
    category: "model",
  },
} as const satisfies Record<string, SketchAssetMeta>;

export type SketchAssetKey = keyof typeof SKETCH_ASSETS;
