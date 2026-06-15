import type { MediaAsset, MediaOptimizeOptions } from "@/types/media";

export interface MediaService {
  getAsset(id: string): Promise<MediaAsset | null>;
  getAssetsByTag(tag: string): Promise<MediaAsset[]>;
  getOptimizedUrl(asset: MediaAsset, options?: MediaOptimizeOptions): string;
}
