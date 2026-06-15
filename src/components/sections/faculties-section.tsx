import { getTranslations } from "next-intl/server";
import type { Faculty } from "@/types/content";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { FadeInView } from "@/components/animations/fade-in-view";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/stagger-container";

interface FacultiesSectionProps {
  faculties: Faculty[];
}

export async function FacultiesSection({ faculties }: FacultiesSectionProps) {
  const t = await getTranslations("Faculties");

  return (
    <section id="facultati" className="relative py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" aria-hidden="true" />
      <Container className="relative">
        <FadeInView>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black text-foreground md:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
              {t("subtitle")}
            </p>
          </div>
        </FadeInView>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {faculties.map((faculty) => (
            <StaggerItem key={faculty.id}>
              <GlassCard hover className="group h-full">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-3xl" aria-hidden="true">
                    {faculty.icon}
                  </span>
                  <span className="rounded-lg bg-accent/10 px-2 py-1 text-xs font-bold text-accent">
                    {faculty.shortName}
                  </span>
                </div>
                <h3 className="text-base font-bold leading-snug text-foreground transition-colors group-hover:text-accent">
                  {faculty.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">
                  {faculty.description}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted">
                  <span>
                    {faculty.students.toLocaleString("ro-RO")} {t("students")}
                  </span>
                  <span>
                    {faculty.programs} {t("programs")}
                  </span>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent opacity-0 transition-all duration-300 group-hover:opacity-100">
                  {t("explore")}
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
