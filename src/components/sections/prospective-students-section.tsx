"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const EASE = [0.22, 1, 0.36, 1] as const;

type CardKey = "events" | "prep" | "simulation" | "theatre";

const CARD_IMAGES: Record<CardKey, string> = {
  events: "/evenimente.jpg",
  prep: "/pregatire-admitere.jpg",
  simulation: "/simulare-admitere.jpg",
  theatre: "/spectacole-teatru.jpg",
};

const CARD_RING: Record<CardKey, string> = {
  events: "group-hover:ring-sky-400/40",
  prep: "group-hover:ring-emerald-400/40",
  simulation: "group-hover:ring-violet-400/40",
  theatre: "group-hover:ring-amber-400/40",
};

function AudienceCard({
  cardKey,
  title,
  viewMore,
  index,
}: {
  cardKey: CardKey;
  title: string;
  viewMore: string;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
      className="h-full"
    >
      <a
        href="#"
        className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm ring-1 ring-transparent transition duration-300 hover:-translate-y-1.5 hover:shadow-xl ${CARD_RING[cardKey]}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={CARD_IMAGES[cardKey]}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"
            aria-hidden
          />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-base font-bold leading-snug tracking-tight">
            {title}
          </h3>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-accent transition group-hover:gap-2.5">
            {viewMore}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </a>
    </motion.article>
  );
}

export function ProspectiveStudentsSection() {
  const t = useTranslations("ProspectiveStudents");

  const cards: CardKey[] = ["events", "prep", "simulation", "theatre"];

  return (
    <section
      aria-labelledby="prospective-students-heading"
      className="border-b border-border bg-foreground/[0.02]"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <header className="mb-10">
          <h2
            id="prospective-students-heading"
            className="text-3xl font-bold uppercase tracking-tight md:text-4xl"
          >
            {t("title")}
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {cards.map((cardKey, index) => (
            <AudienceCard
              key={cardKey}
              cardKey={cardKey}
              title={t(`cards.${cardKey}.title`)}
              viewMore={t("viewMore")}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
