"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { EventBanner } from "@/services/events/types";
import { EVENTS_SECTION_SKETCH } from "@/features/second-homepage-type2/section-sketches";
import { SectionMarker } from "@/components/second-homepage-type2/section-marker";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  events: EventBanner[];
};

function EventCard({
  event,
  index,
  duplicate = false,
  ctaLabel,
}: {
  event: EventBanner;
  index: number;
  duplicate?: boolean;
  ctaLabel: string;
}) {
  const locale = useLocale();
  const day = formatDate(event.eventDate, locale, { day: "numeric" });
  const month = formatDate(event.eventDate, locale, { month: "short" });

  return (
    <a
      href={event.link}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={duplicate ? -1 : undefined}
      aria-hidden={duplicate || undefined}
      className="group shp-event-card relative flex w-[min(86vw,26rem)] shrink-0 flex-col overflow-hidden border border-[var(--shp-line-strong)] bg-[var(--shp-paper)] transition duration-400 hover:-translate-y-1 hover:border-[var(--shp-accent)]/45 hover:shadow-[0_20px_48px_rgba(10,31,68,0.1)] md:w-[28rem]"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--shp-line)]">
        <Image
          src={event.imageUrl}
          alt={duplicate ? "" : event.imageAlt}
          fill
          sizes="(max-width: 768px) 86vw, 448px"
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(10,31,68,0.55)_100%)]"
          aria-hidden
        />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="shp-mono border border-white/35 bg-[var(--shp-ink)]/70 px-2.5 py-1 text-[0.75rem] uppercase tracking-[0.08em] text-white backdrop-blur-sm">
            Event {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <time
            dateTime={event.eventDate}
            className="flex items-baseline gap-1.5 text-white"
          >
            <span className="shp-display text-[clamp(1.75rem,4vw,2.35rem)] font-semibold leading-none">
              {day}
            </span>
            <span className="shp-mono text-[0.75rem] uppercase tracking-[0.08em] text-white/85">
              {month}
            </span>
          </time>
          <span className="shp-mono text-[0.75rem] uppercase tracking-[0.08em] text-white/80 transition group-hover:translate-x-0.5">
            ↗
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
        <p className="shp-mono text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-muted)]">
          Eveniment {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="shp2-text-card-title">{event.title}</h3>
        <div className="mt-auto h-px w-full bg-[var(--shp-line)]" aria-hidden />
        <p className="shp-mono text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-accent)] transition group-hover:tracking-[0.08em]">
          {ctaLabel} →
        </p>
      </div>
    </a>
  );
}

export function ArchitecturalEvents({ events }: Props) {
  const t = useTranslations("Events");
  const reduceMotion = useReducedMotion();

  if (events.length === 0) return null;

  const loop = [...events, ...events];
  const durationSec = Math.max(32, events.length * 9);

  return (
    <section
      id="shp-events"
      className="shp-section shp-section-alt overflow-hidden"
      aria-labelledby="shp-events-title"
    >
      <div className="shp-section-inner relative z-10 pb-5 md:pb-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
          className="flex items-center justify-between gap-6 md:gap-10"
        >
          <div className="min-w-0 max-w-2xl">
            <SectionMarker index="03" label={t("eyebrow")} coords="TIMELINE" />
            <h2 id="shp-events-title" className="shp2-text-section-title mt-4">
              {t("title")}
            </h2>
            <p className="shp-mono mt-3 text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-muted)]">
              {reduceMotion ? t("scrollHintStatic") : t("scrollHint")}
            </p>
          </div>

          <div className="relative w-[min(55vw,19rem)] shrink-0 sm:w-[22rem] md:w-[24rem] lg:w-[26rem]">
            <Image
              src={EVENTS_SECTION_SKETCH.src}
              alt={EVENTS_SECTION_SKETCH.alt}
              width={EVENTS_SECTION_SKETCH.width}
              height={EVENTS_SECTION_SKETCH.height}
              sizes="(max-width: 640px) 19rem, (max-width: 1024px) 24rem, 26rem"
              className="block h-auto w-full object-contain"
            />
          </div>
        </motion.div>
      </div>

      <div
        className={cn(
          "shp-events-marquee relative z-10 border-y border-[var(--shp-line-strong)] py-6 md:py-7",
          reduceMotion && "shp-events-marquee--static",
        )}
      >
        <div
          className={cn(
            "shp-events-marquee-track flex w-max gap-5 px-6 md:gap-6 md:px-10",
            !reduceMotion && "shp-events-marquee-track--animated",
          )}
          style={
            !reduceMotion
              ? ({ "--shp-marquee-duration": `${durationSec}s` } as CSSProperties)
              : undefined
          }
        >
          {(reduceMotion ? events : loop).map((event, index) => {
            const sourceIndex = index % events.length;
            const duplicate = !reduceMotion && index >= events.length;
            return (
              <EventCard
                key={`${event.id}-${index}`}
                event={event}
                index={sourceIndex}
                duplicate={duplicate}
                ctaLabel={t("viewEvent")}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
