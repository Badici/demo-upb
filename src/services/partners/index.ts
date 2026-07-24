import { DEMO_PARTNERS } from "@/data/homepage";
import type { Partner } from "./types";

export async function getPartners(limit = 50): Promise<Partner[]> {
  return DEMO_PARTNERS.slice(0, limit);
}
