import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AnnouncementsCarousel } from "@/components/sections/announcements-carousel";
import { NewsSection } from "@/components/sections/news-section";
import { ProspectiveStudentsSection } from "@/components/sections/prospective-students-section";
import { StudentServicesSection } from "@/components/sections/student-services-section";
import { PartnersMarquee } from "@/components/sections/partners-marquee";
import { AcademicResourcesSection } from "@/components/sections/academic-resources-section";
import { FacultiesSection } from "@/components/sections/faculties-section";
import { EventsMarquee } from "@/components/sections/events-marquee";
import { AnniversaryHero } from "@/components/sections/anniversary-hero";
import { getActiveAnnouncements } from "@/services/announcements";
import { getLatestNews } from "@/services/news";
import { getEvents } from "@/services/events";
import { getPartners } from "@/services/partners";
import { getFacultiesByCenter } from "@/services/faculties";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const [announcements, news, events, partners, faculties] = await Promise.all([
    getActiveAnnouncements(locale),
    getLatestNews(locale, 6),
    getEvents(),
    getPartners(),
    getFacultiesByCenter(),
  ]);

  return (
    <>
      <section className="relative flex min-h-dvh items-center overflow-hidden">
        <Image
          src="/poza-rectorat-hd.jpeg"
          alt="Clădirea Rectoratului UNST Politehnica București"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/40"
          aria-hidden
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-28 pb-20 md:px-10">
          <div className="flex max-w-3xl flex-col items-start gap-6 text-white">
            <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
              {t("badge")}
            </span>
            <h1 className="text-4xl font-black leading-[1.05] tracking-tight drop-shadow-sm md:text-6xl">
              {t.rich("title", {
                hl: (chunks) => (
                  <span className="relative inline-block whitespace-nowrap text-accent">
                    {chunks}
                    <svg
                      className="absolute -bottom-2 left-0 w-full text-accent md:-bottom-3"
                      viewBox="0 0 300 24"
                      fill="none"
                      preserveAspectRatio="none"
                      aria-hidden
                    >
                      <path
                        d="M4 15 C 60 4, 110 4, 150 12 S 250 22, 296 8"
                        stroke="currentColor"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                ),
              })}
            </h1>
            <p className="max-w-2xl text-lg text-white/85">{t("subtitle")}</p>
            <div className="mt-2 flex flex-wrap gap-3">
              <a
                href="#"
                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#0a1f44] shadow-lg transition hover:opacity-90"
              >
                {t("ctaBucharest")}
              </a>
              <a
                href="#"
                className="rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                {t("ctaPitesti")}
              </a>
            </div>
          </div>
        </div>
      </section>

      <AnnouncementsCarousel announcements={announcements} />
      <AnniversaryHero />
      <EventsMarquee events={events} />
      <NewsSection items={news} />
      <ProspectiveStudentsSection />
      <StudentServicesSection />
      <FacultiesSection faculties={faculties} />
      <PartnersMarquee partners={partners} />
      <AcademicResourcesSection />
    </>
  );
}
