import { DEMO_EVENTS } from "@/data/homepage";
import type { EventBanner } from "./types";

export async function getEvents(limit = 30): Promise<EventBanner[]> {
  return DEMO_EVENTS.slice(0, limit);
}
