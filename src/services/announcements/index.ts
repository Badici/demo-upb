import {
  DEMO_ANNOUNCEMENTS,
  localizeAnnouncementLink,
} from "@/data/homepage";
import type { Announcement } from "./types";

export async function getActiveAnnouncements(
  locale: string,
): Promise<Announcement[]> {
  return DEMO_ANNOUNCEMENTS.map((item) =>
    localizeAnnouncementLink(item, locale),
  );
}
