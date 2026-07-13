import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { NewsCard } from "@/components/sections/news-card";
import { getLatestNews } from "@/services/news";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "News" });
  return {
    title: t("allNewsTitle"),
    description: t("allNewsSubtitle"),
    openGraph: {
      title: t("allNewsTitle"),
      description: t("allNewsSubtitle"),
    },
  };
}

export default async function NewsListPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("News");
  const news = await getLatestNews(locale, 60);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pt-28 pb-20 md:px-10 md:pt-32 md:pb-28">
      <header className="mb-10 border-b border-border pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {t("eyebrow")}
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
          {t("allNewsTitle")}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          {t("allNewsSubtitle")}
        </p>
      </header>

      {news.length === 0 ? (
        <p className="text-muted">{t("empty")}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {news.map((item, i) => (
            <NewsCard key={item.id} item={item} priority={i < 3} />
          ))}
        </div>
      )}
    </div>
  );
}
