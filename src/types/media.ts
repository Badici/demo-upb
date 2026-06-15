export interface MediaAsset {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  mimeType: string;
  tags: string[];
}

export interface MediaOptimizeOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: "webp" | "avif" | "auto";
}
