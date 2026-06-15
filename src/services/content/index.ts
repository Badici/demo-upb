import type { ContentService } from "./types";
import { MockContentService } from "./mock-content-service";

export function getContentService(): ContentService {
  // Future: switch on env.contentProvider for Strapi, Sanity, etc.
  return new MockContentService();
}
