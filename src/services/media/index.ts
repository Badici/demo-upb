import type { MediaService } from "./types";
import { MockMediaService } from "./mock-media-service";

export function getMediaService(): MediaService {
  return new MockMediaService();
}
