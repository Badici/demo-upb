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
import type { ContentService } from "./types";
import { announcements } from "@/data/mock/announcements";
import { events } from "@/data/mock/events";
import { faculties } from "@/data/mock/faculties";
import { news } from "@/data/mock/news";
import { stats } from "@/data/mock/stats";

export class MockContentService implements ContentService {
  async getAnnouncements(
    filters?: AnnouncementFilters,
  ): Promise<Announcement[]> {
    let result = [...announcements];

    if (filters?.tag) {
      result = result.filter((a) => a.tags.includes(filters.tag!));
    }

    if (filters?.limit) {
      result = result.slice(0, filters.limit);
    }

    return result.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }

  async getNews(slug?: string): Promise<NewsItem[]> {
    if (slug) {
      return news.filter((n) => n.slug === slug);
    }
    return news;
  }

  async getEvents(filters?: EventFilters): Promise<Event[]> {
    let result = [...events];

    if (filters?.category) {
      result = result.filter((e) => e.category === filters.category);
    }

    if (filters?.upcoming) {
      const now = new Date();
      result = result.filter((e) => new Date(e.startDate) >= now);
    }

    if (filters?.limit) {
      result = result.slice(0, filters.limit);
    }

    return result.sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    );
  }

  async getFaculties(): Promise<Faculty[]> {
    return faculties;
  }

  async getPage(slug: string): Promise<Page | null> {
    const pages: Page[] = [
      {
        id: "home",
        slug: "home",
        title: "Acasă",
        content: "",
      },
    ];
    return pages.find((p) => p.slug === slug) ?? null;
  }

  async getStats(): Promise<Stat[]> {
    return stats;
  }
}
