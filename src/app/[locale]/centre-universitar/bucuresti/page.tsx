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
  const center = universityCenters.bucuresti;
  const title = `${center.name} | ${siteConfig.shortName}`;

  return {
    title,
    description: center.heroSubtitle,
    openGraph: {
      title,
      description: center.heroSubtitle,
      url: `${siteConfig.url}/${locale}/centre-universitar/bucuresti`,
      siteName: siteConfig.shortName,
      locale: locale === "ro" ? "ro_RO" : "en_US",
      type: "website",
    },
    alternates: {
      canonical: `/${locale}/centre-universitar/bucuresti`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/centre-universitar/bucuresti`]),
      ),
    },
  };
}

export default async function BucharestCenterPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const center = universityCenters.bucuresti;

  return (
    <UniversityCenterFacultiesSection
      centerName={center.name}
      heroTitle={center.heroTitle}
      heroSubtitle={center.heroSubtitle}
      faculties={center.faculties}
    />
  );
}

