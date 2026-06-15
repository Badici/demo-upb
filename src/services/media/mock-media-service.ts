import type { MediaAsset, MediaOptimizeOptions } from "@/types/media";
import type { MediaService } from "./types";
import { assets } from "@/data/mock/media";

export class MockMediaService implements MediaService {
  async getAsset(id: string): Promise<MediaAsset | null> {
    return assets.find((a) => a.id === id) ?? null;
  }

  async getAssetsByTag(tag: string): Promise<MediaAsset[]> {
    return assets.filter((a) => a.tags.includes(tag));
  }

  getOptimizedUrl(asset: MediaAsset, options?: MediaOptimizeOptions): string {
    const params = new URLSearchParams();
    if (options?.width) params.set("w", String(options.width));
    if (options?.height) params.set("h", String(options.height));
    if (options?.quality) params.set("q", String(options.quality));
    const query = params.toString();
    return query ? `${asset.url}?${query}` : asset.url;
  }
}
