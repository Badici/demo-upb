import type {
  Announcement,
  AnnouncementFilters,
  Event,
  EventFilters,
  Faculty,
  NewsItem,
  Page,
  Stat,
} from "@/types/content";

export interface ContentService {
  getAnnouncements(filters?: AnnouncementFilters): Promise<Announcement[]>;
  getNews(slug?: string): Promise<NewsItem[]>;
  getEvents(filters?: EventFilters): Promise<Event[]>;
  getFaculties(): Promise<Faculty[]>;
  getPage(slug: string): Promise<Page | null>;
  getStats(): Promise<Stat[]>;
}
