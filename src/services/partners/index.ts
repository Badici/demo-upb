import config from "@payload-config";
import { getPayload } from "payload";
import type { Partner as PayloadPartner, Media } from "@/payload-types";
import type { Partner } from "./types";

function mapPartner(doc: PayloadPartner): Partner | null {
  const logo = doc.logo;
  if (!logo || typeof logo === "number") return null;

  const media = logo as Media;
  if (!media.url) return null;

  return {
    id: String(doc.id),
    name: doc.name,
    logoUrl: media.url,
    logoAlt: media.alt || doc.name,
    logoWidth: media.width ?? undefined,
    logoHeight: media.height ?? undefined,
    link: doc.link || undefined,
  };
}

export async function getPartners(limit = 50): Promise<Partner[]> {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "partners",
    sort: "order",
    depth: 1,
    limit,
  });

  return result.docs
    .map(mapPartner)
    .filter((item): item is Partner => item !== null);
}
