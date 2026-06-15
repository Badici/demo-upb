"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Announcement } from "@/types/content";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { FadeInView } from "@/components/animations/fade-in-view";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/stagger-container";
import { cn } from "@/lib/utils";

interface AnnouncementsSectionProps {
  announcements: Announcement[];
}

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === "ro" ? "ro-RO" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function AnnouncementsSection({
  announcements,
}: AnnouncementsSectionProps) {
  const t = useTranslations("Announcements");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(
    new Set(announcements.flatMap((a) => a.tags)),
  ).slice(0, 6);

  const filtered = activeTag
    ? announcements.filter((a) => a.tags.includes(activeTag))
    : announcements;

  return (
    <section id="anunturi" className="py-16 md:py-24">
      <Container>
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

        <FadeInView delay={0.1}>
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                activeTag === null
                  ? "bg-accent text-white shadow-lg shadow-accent/25"
                  : "glass text-foreground/70 hover:text-foreground",
              )}
            >
              {t("all")}
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                  activeTag === tag
                    ? "bg-accent text-white shadow-lg shadow-accent/25"
                    : "glass text-foreground/70 hover:text-foreground",
                )}
              >
                {t(`tags.${tag}` as `tags.${string}`)}
              </button>
            ))}
          </div>
        </FadeInView>

        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((announcement) => (
            <StaggerItem key={announcement.id}>
              <GlassCard
                hover
                className={cn(
                  "group h-full",
                  announcement.featured && "ring-1 ring-accent/30",
                )}
              >
                <div className="mb-4 flex flex-wrap gap-2">
                  {announcement.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="accent">
                      {t(`tags.${tag}` as `tags.${string}`)}
                    </Badge>
                  ))}
                </div>
                <time className="text-xs text-muted">
                  {formatDate(announcement.date, "ro")}
                </time>
                <h3 className="mt-2 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-accent">
                  {announcement.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {announcement.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {t("readMore")}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
