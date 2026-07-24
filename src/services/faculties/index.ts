import { DEMO_FACULTIES } from "@/data/homepage";
import type { FacultiesByCenter } from "./types";

export async function getFacultiesByCenter(): Promise<FacultiesByCenter> {
  return DEMO_FACULTIES;
}
