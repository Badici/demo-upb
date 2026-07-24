"use client";

import { useEffect, useEffectEvent, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Announcement } from "@/services/announcements/types";
import type { NewsListItem } from "@/services/news/types";
import { SECTION_SKETCHES } from "@/features/second-homepage-type2/section-sketches";
import { SectionMarker } from "@/components/second-homepage-type2/section-marker";
import { SectionSketch } from "@/components/second-homepage-type2/section-sketch";

const EASE = [0.22, 1, 0.36, 1] as const;
const ROTATE_MS = 10_000;

type FeedItem = {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  imageAlt: string;
  date: string | null;
  href: string;
  external?: boolean;
  kind: "news" | "announcement";
};

type Props = {
  items: NewsListItem[];
  announcements?: Announcement[];
};

function buildFeed(
  news: NewsListItem[],
  announcements: Announcement[],
  announcementExcerpt: string,
): FeedItem[] {
  const fromNews: FeedItem[] = news.map((item) => ({
    id: `news-${item.id}`,
    title: item.title,
    excerpt: item.excerpt,
    imageUrl: item.imageUrl,
    imageAlt: item.imageAlt,
    date: item.publishedAt,
    href: item.href,
    kind: "news",
  }));

  const fromAnnouncements: FeedItem[] = announcements.map((item) => ({
    id: `announcement-${item.id}`,
    title: item.title,
    excerpt: announcementExcerpt,
    imageUrl: item.imageUrl,
    imageAlt: item.imageAlt,
    date: null,
    href: item.link?.href ?? "#",
    external: item.link?.isExternal,
    kind: "announcement",
  }));

  return [...fromNews, ...fromAnnouncements];
}

function ItemLink({
  item,
  className,
  children,
}: {
  item: FeedItem;
  className?: string;
  children: React.ReactNode;
}) {
  if (item.kind === "news") {
    return (
      <Link href={item.href} className={className}>
        {children}
      </Link>
    );
  }

  if (!item.href || item.href === "#") {
    return <div className={className}>{children}</div>;
  }

  return (
    <a
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      className={className}
    >
      {children}
    </a>
  );
}

function NewsCard({
  item,
  locale,
  badge,
  readMore,
  compact = false,
}: {
  item: FeedItem;
  locale: string;
  badge: string;
  readMore: string;
  compact?: boolean;
}) {
  return (
    <ItemLink
      item={item}
      className={cn(
        "group shp-hover-lift flex h-full flex-col overflow-hidden border border-[var(--shp-line)] bg-[var(--shp-paper)] transition hover:border-[var(--shp-line-strong)]",
        compact && "border-[var(--shp-line-strong)]",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden border-b border-[var(--shp-line)]",
          compact ? "aspect-[16/10]" : "aspect-[16/11]",
        )}
      >
        <Image
          src={item.imageUrl}
          alt={item.imageAlt}
          fill
          sizes={compact ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 1024px) 100vw, 60vw"}
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className={cn("flex flex-1 flex-col", compact ? "p-4" : "p-4 md:p-5")}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="shp-mono text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-accent)]">
            {badge}
          </span>
          {item.date ? (
            <time
              dateTime={item.date}
              className="shp-mono text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-muted)]"
            >
              {formatDate(item.date, locale)}
            </time>
          ) : null}
        </div>
        <h3
          className={cn(
            "mt-2 font-semibold leading-snug text-[var(--shp-ink)]",
            "shp2-text-card-title",
          )}
        >
          {item.title}
        </h3>
        <p
          className={cn(
            "shp2-text-body-sm mt-2",
            compact ? "line-clamp-3" : "line-clamp-4",
          )}
        >
          {item.excerpt}
        </p>
        <span className="shp-mono mt-auto pt-4 text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-accent)] transition group-hover:translate-x-0.5">
          {readMore} →
        </span>
      </div>
    </ItemLink>
  );
}

export function NewsPlate({ items, announcements = [] }: Props) {
  const locale = useLocale();
  const t = useTranslations("News");
  const reduceMotion = useReducedMotion();
  const feed = buildFeed(items, announcements, t("announcementExcerpt"));
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const total = feed.length;
  const featured = feed[active] ?? null;
  const rest = feed.filter((_, index) => index !== active).slice(0, 6);

  const goTo = useEffectEvent((next: number, dir: number) => {
    if (total === 0) return;
    setDirection(dir);
    setActive(((next % total) + total) % total);
  });

  useEffect(() => {
    if (total <= 1 || paused || reduceMotion) return;

    const timer = window.setInterval(() => {
      goTo(active + 1, 1);
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [active, total, paused, reduceMotion]);

  if (total === 0) return null;

  const badgeFor = (kind: FeedItem["kind"]) =>
    kind === "announcement" ? t("announcementBadge") : t("newsBadge");

  return (
    <section
      id="shp-news"
      className="shp-section shp-section-alt overflow-hidden"
      aria-labelledby="shp-news-title"
    >
      <div className="shp-section-inner relative z-10">
        <SectionMarker index="04" label={t("eyebrow")} coords="FEED" />
        <div className="mt-4 flex items-start justify-between gap-6 md:gap-10">
          <div className="min-w-0 max-w-2xl">
            <div className="flex flex-wrap items-start gap-3">
              <h2 id="shp-news-title" className="shp2-text-section-title">
                {t("title")}
              </h2>
              <Link href="#shp-news" className="shp-btn-ghost shp-hover-lift shrink-0 self-center">
                {t("viewAll")}
              </Link>
            </div>
            <p className="shp2-text-lead mt-3">{t("description")}</p>
          </div>
          <SectionSketch asset={SECTION_SKETCHES.news} width={140} />
        </div>

        <div
          className="mt-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setPaused(false);
            }
          }}
        >
          <div className="relative overflow-hidden border border-[var(--shp-line-strong)] bg-[var(--shp-paper)]">
            <AnimatePresence mode="wait" custom={direction}>
              {featured ? (
                <motion.div
                  key={featured.id}
                  custom={direction}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, x: direction > 0 ? 36 : -36 }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  exit={
                    reduceMotion
                      ? undefined
                      : { opacity: 0, x: direction > 0 ? -36 : 36 }
                  }
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <ItemLink
                    item={featured}
                    className="group grid grid-cols-1 lg:grid-cols-12"
                  >
                    <div className="relative aspect-[16/11] overflow-hidden border-b border-[var(--shp-line)] lg:col-span-7 lg:aspect-auto lg:min-h-[22rem] lg:border-b-0 lg:border-r">
                      <Image
                        src={featured.imageUrl}
                        alt={featured.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-cover transition duration-700 group-hover:scale-[1.03]"
                        priority
                      />
                    </div>
                    <div className="flex flex-col justify-center p-5 md:p-6 lg:col-span-5 lg:p-7">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="shp-mono text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-accent)]">
                          {badgeFor(featured.kind)}
                        </span>
                        {featured.date ? (
                          <time
                            dateTime={featured.date}
                            className="shp-mono text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-muted)]"
                          >
                            {formatDate(featured.date, locale)}
                          </time>
                        ) : null}
                      </div>
                      <h3 className="shp2-text-card-title mt-4">
                        {featured.title}
                      </h3>
                      <p className="shp2-text-body-sm mt-3">
                        {featured.excerpt}
                      </p>
                      <span className="shp-mono mt-6 inline-flex text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-accent)] transition group-hover:translate-x-1">
                        {t("readMore")} →
                      </span>
                    </div>
                  </ItemLink>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {total > 1 ? (
              <div className="flex items-center justify-between gap-4 border-t border-[var(--shp-line)] px-4 py-3 md:px-6">
                <p className="shp-mono text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-muted)]">
                  {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  <span className="mx-2 text-[var(--shp-line-strong)]">·</span>
                  {reduceMotion ? t("manualHint") : t("autoHint")}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={t("prevFeatured")}
                    onClick={() => goTo(active - 1, -1)}
                    className="inline-flex h-10 w-10 items-center justify-center border border-[var(--shp-line-strong)] text-[var(--shp-ink)] transition hover:border-[var(--shp-ink)] hover:bg-[var(--shp-hover)]"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    aria-label={t("nextFeatured")}
                    onClick={() => goTo(active + 1, 1)}
                    className="inline-flex h-10 w-10 items-center justify-center border border-[var(--shp-line-strong)] text-[var(--shp-ink)] transition hover:border-[var(--shp-ink)] hover:bg-[var(--shp-hover)]"
                  >
                    →
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          {total > 1 ? (
            <div
              className="mt-3 flex justify-center gap-1.5"
              role="tablist"
              aria-label={t("featuredTabs")}
            >
              {feed.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  aria-label={item.title}
                  onClick={() => goTo(index, index > active ? 1 : -1)}
                  className={cn(
                    "h-1.5 w-6 transition",
                    index === active
                      ? "bg-[var(--shp-accent)]"
                      : "bg-[var(--shp-line-strong)] hover:bg-[var(--shp-muted)]",
                  )}
                />
              ))}
            </div>
          ) : null}
        </div>

        {rest.length > 0 ? (
          <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {rest.map((item, index) => (
              <motion.li
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.05, ease: EASE }}
              >
                <NewsCard
                  item={item}
                  locale={locale}
                  badge={badgeFor(item.kind)}
                  readMore={t("readMore")}
                  compact
                />
              </motion.li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
