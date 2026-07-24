export type NewsCategory =
  | "general"
  | "admitere"
  | "cercetare"
  | "evenimente"
  | "parteneriate"
  | "studenti";

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
