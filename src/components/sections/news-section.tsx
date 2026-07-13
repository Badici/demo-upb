import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { NewsCard } from "@/components/sections/news-card";
import type { NewsListItem } from "@/services/news/types";

type Props = {
  items: NewsListItem[];
};

export async function NewsSection({ items }: Props) {
  const t = await getTranslations("News");

  if (items.length === 0) return null;

  return (
    <section
      aria-labelledby="news-heading"
      className="border-b border-border bg-background"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t("eyebrow")}
            </p>
            <h2
              id="news-heading"
              className="mt-1 text-3xl font-bold tracking-tight md:text-4xl"
            >
              {t("title")}
            </h2>
            <p className="mt-3 max-w-xl text-muted">{t("description")}</p>
          </div>
          <Link
            href="/stiri"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-border px-5 py-3 text-sm font-semibold transition hover:bg-foreground/5"
          >
            {t("viewAll")}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {items.slice(0, 6).map((item, i) => (
            <NewsCard key={item.id} item={item} priority={i < 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
