"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const EASE = [0.22, 1, 0.36, 1] as const;

type ResourceKey = "press" | "library" | "events" | "bulletin";

const ICON_PROPS = {
  width: 26,
  height: 26,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ICONS: Record<ResourceKey, ReactNode> = {
  press: (
    <svg {...ICON_PROPS} aria-hidden>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
      <path d="M8 7h8M8 11h6" />
    </svg>
  ),
  library: (
    <svg {...ICON_PROPS} aria-hidden>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
      <path d="M8 7h8M8 11h8M8 15h5" />
    </svg>
  ),
  events: (
    <svg {...ICON_PROPS} aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
    </svg>
  ),
  bulletin: (
    <svg {...ICON_PROPS} aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  ),
};

const ICON_STYLE: Record<ResourceKey, string> = {
  press: "bg-indigo-500/10 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white",
  library: "bg-sky-500/10 text-sky-500 group-hover:bg-sky-500 group-hover:text-white",
  events: "bg-violet-500/10 text-violet-500 group-hover:bg-violet-500 group-hover:text-white",
  bulletin: "bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white",
};

function ResourceCard({
  resourceKey,
  title,
  description,
  viewMore,
  index,
}: {
  resourceKey: ResourceKey;
  title: string;
  description: string;
  viewMore: string;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
      className="h-full"
    >
      <a
        href="#"
        className="group flex h-full flex-col rounded-2xl border border-border bg-background p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
      >
        <span
          className={`inline-flex h-12 w-12 items-center justify-center rounded-xl transition duration-300 ${ICON_STYLE[resourceKey]}`}
        >
          {ICONS[resourceKey]}
        </span>
        <h3 className="mt-5 text-lg font-bold tracking-tight">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {description}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-accent transition group-hover:gap-2.5">
          {viewMore}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </a>
    </motion.article>
  );
}

export function AcademicResourcesSection() {
  const t = useTranslations("AcademicResources");

  const resources: ResourceKey[] = ["press", "library", "events", "bulletin"];

  return (
    <section
      aria-labelledby="academic-resources-heading"
      className="border-b border-border bg-foreground/[0.02]"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <header className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {t("eyebrow")}
          </p>
          <h2
            id="academic-resources-heading"
            className="mt-2 text-3xl font-bold tracking-tight md:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="mt-3 max-w-2xl text-muted">{t("description")}</p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {resources.map((resourceKey, index) => (
            <ResourceCard
              key={resourceKey}
              resourceKey={resourceKey}
              title={t(`items.${resourceKey}.title`)}
              description={t(`items.${resourceKey}.description`)}
              viewMore={t("viewMore")}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
