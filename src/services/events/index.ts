import config from "@payload-config";
import { getPayload } from "payload";
import type { Event as PayloadEvent, Media } from "@/payload-types";
import type { EventBanner } from "./types";

function mapEvent(doc: PayloadEvent): EventBanner | null {
  const banner = doc.banner;
  if (!banner || typeof banner === "number") return null;

  const media = banner as Media;
  if (!media.url || !doc.link) return null;

  return {
    id: String(doc.id),
    title: doc.title,
    imageUrl: media.url,
    imageAlt: media.alt || doc.title,
    imageWidth: media.width ?? undefined,
    imageHeight: media.height ?? undefined,
    link: doc.link,
    eventDate: doc.eventDate,
  };
}

export async function getEvents(limit = 30): Promise<EventBanner[]> {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "events",
    sort: "eventDate",
    depth: 1,
    limit,
  });

  return result.docs
    .map(mapEvent)
    .filter((item): item is EventBanner => item !== null);
}
