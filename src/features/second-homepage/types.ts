import type { Announcement } from "@/services/announcements/types";
import type { EventBanner } from "@/services/events/types";
import type { FacultiesByCenter } from "@/services/faculties/types";
import type { NewsListItem } from "@/services/news/types";
import type { Partner } from "@/services/partners/types";

export type SecondHomepageData = {
  announcements: Announcement[];
  news: NewsListItem[];
  events: EventBanner[];
  partners: Partner[];
  faculties: FacultiesByCenter;
};
