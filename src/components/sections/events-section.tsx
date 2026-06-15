import { getTranslations } from "next-intl/server";
import type { Event } from "@/types/content";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { FadeInView } from "@/components/animations/fade-in-view";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/stagger-container";
import { siteConfig } from "@/config/site";

interface EventsSectionProps {
  events: Event[];
}

function formatEventDate(start: string, end?: string) {
  const opts: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const startDate = new Date(start).toLocaleDateString("ro-RO", opts);
  if (!end) return startDate;
  const endDate = new Date(end).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "short",
  });
  return `${startDate} — ${endDate}`;
}

export async function EventsSection({ events }: EventsSectionProps) {
  const t = await getTranslations("Events");

  return (
    <section id="evenimente" className="py-16 md:py-24">
      <Container>
        <FadeInView>
          <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-black text-foreground md:text-5xl">
                {t("title")}
              </h2>
              <p className="mt-4 max-w-xl text-lg text-muted">
                {t("subtitle")}
              </p>
            </div>
            <a
              href={siteConfig.links.events}
              target="_blank"
              rel="noopener noreferrer"
              className="glass glass-hover rounded-xl px-6 py-3 text-sm font-semibold text-foreground transition-all hover:scale-[1.03]"
            >
              {t("viewAll")} →
            </a>
          </div>
        </FadeInView>

        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <StaggerItem key={event.id}>
              <GlassCard hover className="group h-full">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <Badge variant="accent">
                    {t(`categories.${event.category}` as `categories.${string}`)}
                  </Badge>
                  <time className="text-right text-xs text-muted">
                    {formatEventDate(event.startDate, event.endDate)}
                  </time>
                </div>
                <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-accent">
                  {event.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {event.description}
                </p>
                <p className="mt-4 flex items-center gap-2 text-xs text-muted">
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.location}
                </p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
