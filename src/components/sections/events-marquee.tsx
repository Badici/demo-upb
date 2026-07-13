"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { formatDate } from "@/lib/format";
import type { EventBanner } from "@/services/events/types";

type Props = {
  events: EventBanner[];
};

const CARD_HEIGHT = 200;
const DEFAULT_RATIO = 16 / 9;
const SECONDS_PER_ITEM = 7;

function EventCard({
  event,
  locale,
  hidden,
}: {
  event: EventBanner;
  locale: string;
  hidden?: boolean;
}) {
  const ratio =
    event.imageWidth && event.imageHeight
      ? event.imageWidth / event.imageHeight
      : DEFAULT_RATIO;
  const width = Math.round(CARD_HEIGHT * ratio);

  return (
    <a
      href={event.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
      className="group/card relative mr-5 block shrink-0 overflow-hidden rounded-2xl border border-border bg-foreground/[0.03] shadow-sm transition hover:shadow-lg"
      style={{ height: CARD_HEIGHT, width }}
    >
      <Image
        src={event.imageUrl}
        alt={event.imageAlt}
        width={width}
        height={CARD_HEIGHT}
        className="h-full w-full object-cover transition duration-500 group-hover/card:scale-105"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
        <span className="line-clamp-1 text-sm font-semibold text-white drop-shadow">
          {event.title}
        </span>
        <time
          dateTime={event.eventDate}
          className="shrink-0 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-[#0a1f44]"
        >
          {formatDate(event.eventDate, locale, {
            day: "numeric",
            month: "short",
          })}
        </time>
      </div>
    </a>
  );
}

export function EventsMarquee({ events }: Props) {
  const locale = useLocale();
  const t = useTranslations("Events");

  if (events.length === 0) return null;

  const duration = Math.max(20, events.length * SECONDS_PER_ITEM);

  return (
    <section
      aria-labelledby="events-heading"
      className="border-b border-border bg-background"
    >
      <div className="mx-auto w-full max-w-6xl px-6 pt-16 md:px-10 md:pt-24">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {t("eyebrow")}
          </p>
          <h2
            id="events-heading"
            className="mt-1 text-3xl font-bold tracking-tight md:text-4xl"
          >
            {t("title")}
          </h2>
        </div>
      </div>

      <div className="marquee-viewport group relative overflow-hidden pb-16 md:pb-24">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent md:w-28"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent md:w-28"
          aria-hidden
        />

        <div
          className="marquee-track"
          style={{ animationDuration: `${duration}s` }}
        >
          {events.map((event) => (
            <EventCard key={event.id} event={event} locale={locale} />
          ))}
          {events.map((event) => (
            <EventCard
              key={`dup-${event.id}`}
              event={event}
              locale={locale}
              hidden
            />
          ))}
        </div>
      </div>
    </section>
  );
}
