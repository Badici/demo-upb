import type { MediaAsset } from "@/types/media";

export const assets: MediaAsset[] = [
  {
    id: "hero-bg",
    url: "/images/hero-pattern.svg",
    alt: "Model geometric abstract POLITEHNICA",
    width: 1920,
    height: 1080,
    mimeType: "image/svg+xml",
    tags: ["hero", "background"],
  },
  {
    id: "campus",
    url: "/images/campus.svg",
    alt: "Vedere stilizată campus POLITEHNICA București",
    width: 800,
    height: 600,
    mimeType: "image/svg+xml",
    tags: ["campus"],
  },
];
