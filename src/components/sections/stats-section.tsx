import { getTranslations } from "next-intl/server";
import type { Stat } from "@/types/content";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedCounter } from "@/components/animations/animated-counter";
import { FadeInView } from "@/components/animations/fade-in-view";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/stagger-container";

interface StatsSectionProps {
  stats: Stat[];
}

export async function StatsSection({ stats }: StatsSectionProps) {
  const t = await getTranslations("Stats");

  return (
    <section className="relative py-16 md:py-24">
      <div className="absolute inset-0 gradient-hero opacity-10" aria-hidden="true" />
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

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.id}>
              <GlassCard className="text-center">
                <p className="text-4xl font-black text-accent md:text-5xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm font-medium text-muted">
                  {stat.label}
                </p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
