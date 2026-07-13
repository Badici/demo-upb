"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const EASE = [0.22, 1, 0.36, 1] as const;

type ServiceKey =
  | "alumni"
  | "shop"
  | "polijobs"
  | "ccvsar"
  | "upbizz"
  | "ccoc";

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

const ICONS: Record<ServiceKey, ReactNode> = {
  alumni: (
    <svg {...ICON_PROPS} aria-hidden>
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" />
      <path d="M22 10v5" />
    </svg>
  ),
  shop: (
    <svg {...ICON_PROPS} aria-hidden>
      <path d="M6 2 3 6v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  polijobs: (
    <svg {...ICON_PROPS} aria-hidden>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M2 13h20" />
    </svg>
  ),
  ccvsar: (
    <svg {...ICON_PROPS} aria-hidden>
      <path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 1 0-7.1 7.1L12 21.5l8.8-8.8a5 5 0 0 0 0-7.1Z" />
    </svg>
  ),
  upbizz: (
    <svg {...ICON_PROPS} aria-hidden>
      <path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2a2.1 2.1 0 0 0-3-3Z" />
      <path d="M12 15 9 12a11 11 0 0 1 8-8c2 0 3 1 3 3a11 11 0 0 1-8 8Z" />
      <path d="M15 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    </svg>
  ),
  ccoc: (
    <svg {...ICON_PROPS} aria-hidden>
      <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
      <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  ),
};

const ICON_STYLE: Record<ServiceKey, string> = {
  alumni: "bg-sky-500/10 text-sky-500 group-hover:bg-sky-500 group-hover:text-white",
  shop: "bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white",
  polijobs: "bg-violet-500/10 text-violet-500 group-hover:bg-violet-500 group-hover:text-white",
  ccvsar: "bg-rose-500/10 text-rose-500 group-hover:bg-rose-500 group-hover:text-white",
  upbizz: "bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white",
  ccoc: "bg-cyan-500/10 text-cyan-500 group-hover:bg-cyan-500 group-hover:text-white",
};

function ServiceCard({
  serviceKey,
  title,
  description,
  viewMore,
  index,
}: {
  serviceKey: ServiceKey;
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
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: EASE }}
      className="h-full"
    >
      <a
        href="#"
        className="group flex h-full flex-col rounded-2xl border border-border bg-background p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
      >
        <span
          className={`inline-flex h-12 w-12 items-center justify-center rounded-xl transition duration-300 ${ICON_STYLE[serviceKey]}`}
        >
          {ICONS[serviceKey]}
        </span>
        <h3 className="mt-5 text-lg font-bold tracking-tight">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
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

export function StudentServicesSection() {
  const t = useTranslations("StudentServices");

  const services: ServiceKey[] = [
    "alumni",
    "shop",
    "polijobs",
    "ccvsar",
    "upbizz",
    "ccoc",
  ];

  return (
    <section
      aria-labelledby="student-services-heading"
      className="border-b border-border bg-background"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <header className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {t("eyebrow")}
          </p>
          <h2
            id="student-services-heading"
            className="mt-2 text-3xl font-bold tracking-tight md:text-4xl"
          >
            {t("title")}
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {services.map((serviceKey, index) => (
            <ServiceCard
              key={serviceKey}
              serviceKey={serviceKey}
              title={t(`items.${serviceKey}.title`)}
              description={t(`items.${serviceKey}.description`)}
              viewMore={t("viewMore")}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
