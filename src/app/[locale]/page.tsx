import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/hero-section";
import { AnnouncementsSection } from "@/components/sections/announcements-section";
import { FacultiesSection } from "@/components/sections/faculties-section";
import { EventsSection } from "@/components/sections/events-section";
import { StatsSection } from "@/components/sections/stats-section";
import { getContentService } from "@/services/content";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: siteConfig.url,
      siteName: siteConfig.shortName,
      locale: locale === "ro" ? "ro_RO" : "en_US",
      type: "website",
    },
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}`]),
      ),
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const contentService = getContentService();
  const [announcements, faculties, events, stats] = await Promise.all([
    contentService.getAnnouncements(),
    contentService.getFaculties(),
    contentService.getEvents({ limit: 6 }),
    contentService.getStats(),
  ]);

  return (
    <main id="main-content">
      <HeroSection />
      <AnnouncementsSection announcements={announcements} />
      <FacultiesSection faculties={faculties} />
      <EventsSection events={events} />
      <StatsSection stats={stats} />
    </main>
  );
}
