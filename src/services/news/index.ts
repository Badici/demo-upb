import { DEMO_NEWS, localizeNewsHref } from "@/data/homepage";
import type { NewsListItem } from "./types";

export async function getLatestNews(
  locale: string,
  limit = 6,
): Promise<NewsListItem[]> {
  return DEMO_NEWS.slice(0, limit).map((item) =>
    localizeNewsHref(item, locale),
  );
}

export async function getNewsBySlug(
  slug: string,
  locale: string,
): Promise<NewsListItem | null> {
  const item = DEMO_NEWS.find((news) => news.slug === slug);
  return item ? localizeNewsHref(item, locale) : null;
}

export async function getRelatedNews(
  current: NewsListItem,
  locale: string,
  limit = 4,
): Promise<NewsListItem[]> {
  return DEMO_NEWS.filter((item) => item.id !== current.id)
    .filter((item) =>
      current.category ? item.category === current.category : true,
    )
    .slice(0, limit)
    .map((item) => localizeNewsHref(item, locale));
}

export async function getAllNewsSlugs(): Promise<string[]> {
  return DEMO_NEWS.map((item) => item.slug);
}
