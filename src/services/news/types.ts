import type { News } from "@/payload-types";

export type NewsContent = News["content"];

export type NewsCategory = NonNullable<News["category"]>;

export type NewsListItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  category?: NewsCategory;
  publishedAt: string;
  href: string;
};

export type NewsDetail = NewsListItem & {
  content: NewsContent;
};
