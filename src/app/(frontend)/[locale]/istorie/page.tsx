import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "History" });
  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
    },
  };
}

export default async function HistoryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("History");

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pt-28 pb-20 md:px-10 md:pt-32 md:pb-28">
      <header className="max-w-3xl">
        <h1 className="text-4xl font-black tracking-tight md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-muted">{t("subtitle")}</p>
      </header>
      <p className="mt-12 rounded-2xl border border-border bg-foreground/[0.03] px-6 py-10 text-center text-muted">
        {t("comingSoon")}
      </p>
    </div>
  );
}
