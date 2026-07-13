import config from "@payload-config";
import { getPayload } from "payload";
import type { Announcement as PayloadAnnouncement, Media } from "@/payload-types";
import type { Announcement as AnnouncementView } from "./types";

function resolveLink(
  link: PayloadAnnouncement["link"],
  locale: string,
): AnnouncementView["link"] | null {
  if (!link) return null;

  if (link.type === "external" && link.externalUrl) {
    return { href: link.externalUrl, isExternal: true };
  }

  if (link.type === "internal" && link.internalPath) {
    const path = link.internalPath.startsWith("/")
      ? link.internalPath
      : `/${link.internalPath}`;

    const hasLocale = /^\/(ro|en)(\/|$)/.test(path);
    return {
      href: hasLocale ? path : `/${locale}${path}`,
      isExternal: false,
    };
  }

  return null;
}

function mapAnnouncement(doc: PayloadAnnouncement, locale: string): AnnouncementView | null {
  const banner = doc.banner;
  if (!banner || typeof banner === "number") return null;

  const media = banner as Media;
  if (!media.url) return null;

  const link = resolveLink(doc.link, locale);

  return {
    id: String(doc.id),
    title: doc.title,
    imageUrl: media.url,
    imageAlt: media.alt || doc.title,
    imageWidth: media.width ?? undefined,
    imageHeight: media.height ?? undefined,
    link,
  };
}

export async function getActiveAnnouncements(
  locale: string,
): Promise<AnnouncementView[]> {
  const payload = await getPayload({ config });
  const now = new Date().toISOString();

  const result = await payload.find({
    collection: "announcements",
    where: {
      and: [
        { startDate: { less_than_equal: now } },
        { endDate: { greater_than_equal: now } },
      ],
    },
    sort: "-startDate",
    depth: 1,
    limit: 20,
  });

  return result.docs
    .map((doc) => mapAnnouncement(doc, locale))
    .filter((item): item is AnnouncementView => item !== null);
}
