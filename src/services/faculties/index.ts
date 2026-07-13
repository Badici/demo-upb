import config from "@payload-config";
import { getPayload } from "payload";
import type { Faculty as PayloadFaculty, Media } from "@/payload-types";
import type { FacultiesByCenter, Faculty, UniversityCenter } from "./types";

function mapFaculty(doc: PayloadFaculty): Faculty | null {
  const logo = doc.logo;
  if (!logo || typeof logo === "number") return null;

  const media = logo as Media;
  if (!media.url || !doc.website) return null;

  return {
    id: String(doc.id),
    name: doc.name,
    abbreviation: doc.abbreviation,
    logoUrl: media.url,
    logoAlt: media.alt || doc.name,
    website: doc.website,
    universityCenter: doc.universityCenter as UniversityCenter,
  };
}

export async function getFacultiesByCenter(): Promise<FacultiesByCenter> {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "faculties",
    sort: "order",
    depth: 1,
    limit: 100,
  });

  const faculties = result.docs
    .map(mapFaculty)
    .filter((item): item is Faculty => item !== null);

  return {
    bucharest: faculties.filter((f) => f.universityCenter === "bucharest"),
    pitesti: faculties.filter((f) => f.universityCenter === "pitesti"),
  };
}
