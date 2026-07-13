import config from "@payload-config";
import { getPayload } from "payload";
import type { News as PayloadNews, Media } from "@/payload-types";
import type { NewsDetail, NewsListItem } from "./types";

function mapListItem(doc: PayloadNews, locale: string): NewsListItem | null {
  const cover = doc.coverImage;
  if (!cover || typeof cover === "number") return null;

  const media = cover as Media;
  if (!media.url || !doc.slug) return null;

  return {
    id: String(doc.id),
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    imageUrl: media.url,
    imageAlt: media.alt || doc.title,
    imageWidth: media.width ?? undefined,
    imageHeight: media.height ?? undefined,
    category: doc.category ?? undefined,
    publishedAt: doc.publishedAt,
    href: `/${locale}/stiri/${doc.slug}`,
  };
}

export async function getLatestNews(
  locale: string,
  limit = 6,
): Promise<NewsListItem[]> {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "news",
    sort: "-publishedAt",
    depth: 1,
    limit,
  });

  return result.docs
    .map((doc) => mapListItem(doc, locale))
    .filter((item): item is NewsListItem => item !== null);
}

export async function getNewsBySlug(
  slug: string,
  locale: string,
): Promise<NewsDetail | null> {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "news",
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  });

  const doc = result.docs[0];
  if (!doc) return null;

  const base = mapListItem(doc, locale);
  if (!base) return null;

  return { ...base, content: doc.content };
}

export async function getRelatedNews(
  current: NewsDetail,
  locale: string,
  limit = 4,
): Promise<NewsListItem[]> {
  const payload = await getPayload({ config });

  const buildQuery = (sameCategory: boolean) => ({
    collection: "news" as const,
    depth: 1,
    limit: limit + 1,
    sort: "-publishedAt",
    where: {
      and: [
        { id: { not_equals: Number(current.id) } },
        ...(sameCategory && current.category
          ? [{ category: { equals: current.category } }]
          : []),
      ],
    },
  });

  let result = await payload.find(buildQuery(true));

  if (result.docs.length === 0) {
    result = await payload.find(buildQuery(false));
  }

  return result.docs
    .map((doc) => mapListItem(doc, locale))
    .filter((item): item is NewsListItem => item !== null)
    .slice(0, limit);
}

export async function getAllNewsSlugs(): Promise<string[]> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "news",
    limit: 500,
    depth: 0,
  });
  return result.docs
    .map((doc) => doc.slug)
    .filter((slug): slug is string => Boolean(slug));
}
