import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { RichText } from "@/components/sections/rich-text";
import { formatDate } from "@/lib/format";
import {
  getAllNewsSlugs,
  getNewsBySlug,
  getRelatedNews,
} from "@/services/news";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = await getNewsBySlug(slug, locale);
  if (!item) return {};

  return {
    title: item.title,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      type: "article",
      publishedTime: item.publishedAt,
      images: [{ url: item.imageUrl, alt: item.imageAlt }],
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const item = await getNewsBySlug(slug, locale);
  if (!item) notFound();

  const [t, related] = await Promise.all([
    getTranslations("News"),
    getRelatedNews(item, locale, 4),
  ]);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pt-28 pb-20 md:px-10 md:pt-32 md:pb-28">
      <Link
        href="/stiri"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition hover:text-accent"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M19 12H5M11 18l-6-6 6-6" />
        </svg>
        {t("backToNews")}
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
        <article className="lg:col-span-2">
          <header>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              {item.category && (
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                  {t(`category.${item.category}`)}
                </span>
              )}
              <time
                dateTime={item.publishedAt}
                className="text-muted"
              >
                {t("publishedOn")} {formatDate(item.publishedAt, locale)}
              </time>
            </div>
            <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight md:text-5xl">
              {item.title}
            </h1>
            <p className="mt-4 text-lg text-muted">{item.excerpt}</p>
          </header>

          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
            <Image
              src={item.imageUrl}
              alt={item.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>

          <div className="mt-8">
            <RichText data={item.content} />
          </div>
        </article>

        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <h2 className="border-b border-border pb-3 text-lg font-bold tracking-tight">
              {t("relatedTitle")}
            </h2>
            <ul className="mt-4 flex flex-col gap-5">
              {related.map((rel) => (
                <li key={rel.id}>
                  <Link
                    href={`/stiri/${rel.slug}`}
                    className="group flex gap-4"
                  >
                    <span className="relative block h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-border">
                      <Image
                        src={rel.imageUrl}
                        alt={rel.imageAlt}
                        fill
                        sizes="112px"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </span>
                    <span className="flex flex-col">
                      <time
                        dateTime={rel.publishedAt}
                        className="text-xs font-medium uppercase tracking-wider text-muted"
                      >
                        {formatDate(rel.publishedAt, locale, {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                      <span className="mt-1 line-clamp-3 text-sm font-semibold leading-snug transition group-hover:text-accent">
                        {rel.title}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
