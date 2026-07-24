import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { shp2FontClassName } from "@/features/second-homepage-type2/fonts";
import { SecondHomepageType2 } from "@/components/second-homepage-type2/second-homepage";
import { SecondHomepageHeader } from "@/components/second-homepage-type2/second-homepage-header";
import { SecondHomepageFooter } from "@/components/second-homepage-type2/second-homepage-footer";
import { getActiveAnnouncements } from "@/services/announcements";
import { getLatestNews } from "@/services/news";
import { getEvents } from "@/services/events";
import { getPartners } from "@/services/partners";
import { getFacultiesByCenter } from "@/services/faculties";
import "@/components/second-homepage-type2/second-homepage-type2.css";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "UNST Politehnica București",
  description:
    "Homepage experimentală — blueprint editorial cu facultăți, știri, evenimente și admitere.",
  openGraph: {
    title: "UNST Politehnica București",
    description:
      "Blueprint editorial cu ierarhie tipografică consistentă (RO/EN).",
  },
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [announcements, news, events, partners, faculties] = await Promise.all([
    getActiveAnnouncements(locale),
    getLatestNews(locale, 6),
    getEvents(),
    getPartners(),
    getFacultiesByCenter(),
  ]);

  return (
    <div className={`shp shp-has-rail shp2 ${shp2FontClassName}`}>
      <SecondHomepageHeader />
      <SecondHomepageType2
        announcements={announcements}
        news={news}
        events={events}
        partners={partners}
        faculties={faculties}
      />
      <SecondHomepageFooter />
    </div>
  );
}
