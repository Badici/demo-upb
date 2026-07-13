import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/format";
import type { NewsListItem } from "@/services/news/types";

type Props = {
  item: NewsListItem;
  priority?: boolean;
};

export function NewsCard({ item, priority = false }: Props) {
  const locale = useLocale();
  const t = useTranslations("News");

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/stiri/${item.slug}`}
        className="relative block aspect-[16/10] overflow-hidden"
      >
        <Image
          src={item.imageUrl}
          alt={item.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
          priority={priority}
        />
        {item.category && (
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-accent backdrop-blur-sm">
            {t(`category.${item.category}`)}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <time
          dateTime={item.publishedAt}
          className="text-xs font-medium uppercase tracking-wider text-muted"
        >
          {formatDate(item.publishedAt, locale)}
        </time>
        <h3 className="mt-2 text-lg font-bold leading-snug tracking-tight">
          <Link
            href={`/stiri/${item.slug}`}
            className="transition group-hover:text-accent"
          >
            {item.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-muted">{item.excerpt}</p>
        <Link
          href={`/stiri/${item.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
        >
          {t("readMore")}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition group-hover:translate-x-1"
            aria-hidden
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
