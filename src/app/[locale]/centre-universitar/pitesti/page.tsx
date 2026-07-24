import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { universityCenters } from "@/data/mock/university-centers";
import { UniversityCenterFacultiesSection } from "@/components/sections/university-center-faculties-section";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const center = universityCenters.pitesti;
  const title = `${center.name} | ${siteConfig.shortName}`;

  return {
    title,
    description: center.heroSubtitle,
    openGraph: {
      title,
      description: center.heroSubtitle,
      url: `${siteConfig.url}/${locale}/centre-universitar/pitesti`,
      siteName: siteConfig.shortName,
      locale: locale === "ro" ? "ro_RO" : "en_US",
      type: "website",
    },
    alternates: {
      canonical: `/${locale}/centre-universitar/pitesti`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/centre-universitar/pitesti`]),
      ),
    },
  };
}

export default async function PitestiCenterPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const center = universityCenters.pitesti;

  return (
    <UniversityCenterFacultiesSection
      centerName={center.name}
      heroTitle={center.heroTitle}
      heroSubtitle={center.heroSubtitle}
      faculties={center.faculties}
    />
  );
}

