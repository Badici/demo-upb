import type { SecondHomepageData } from "@/features/second-homepage/types";
import { ArchitecturalHero } from "@/components/second-homepage-type2/architectural-hero";
import { ArchitecturalEvents } from "@/components/second-homepage-type2/architectural-events";
import { CampusSplit } from "@/components/second-homepage-type2/campus-split";
import { FinalAdmissionsPlate } from "@/components/second-homepage-type2/final-admissions-plate";
import { NewsPlate } from "@/components/second-homepage-type2/news-plate";
import { PartnersPlate } from "@/components/second-homepage-type2/partners-plate";
import { ProspectivePlate } from "@/components/second-homepage-type2/prospective-plate";
import { ResourcesPlate } from "@/components/second-homepage-type2/resources-plate";
import { SectionNav } from "@/components/second-homepage-type2/section-nav";
import { ServicesPlate } from "@/components/second-homepage-type2/services-plate";
import { StudyIndex } from "@/components/second-homepage-type2/study-index";
import { UniversityStats } from "@/components/second-homepage-type2/university-stats";

type Props = SecondHomepageData;

export function SecondHomepageType2({
  announcements,
  news,
  events,
  partners,
  faculties,
}: Props) {
  const facultyCount =
    faculties.bucharest.length + faculties.pitesti.length;

  return (
    <>
      <SectionNav />
      <ArchitecturalHero />
      <CampusSplit />
      <StudyIndex faculties={faculties} />
      <ArchitecturalEvents events={events} />
      <NewsPlate items={news} announcements={announcements} />
      <UniversityStats
        facultyCount={facultyCount}
        partnerCount={partners.length}
      />
      <ProspectivePlate />
      <ServicesPlate />
      <PartnersPlate partners={partners} />
      <ResourcesPlate />
      <FinalAdmissionsPlate />
    </>
  );
}
