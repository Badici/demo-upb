"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import type { FacultiesByCenter, Faculty } from "@/services/faculties/types";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  faculties: FacultiesByCenter;
};

function FacultyCard({ faculty, index }: { faculty: Faculty; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay: (index % 8) * 0.04, ease: EASE }}
      className="h-full"
    >
      <a
        href={faculty.website}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full items-center gap-4 rounded-2xl border border-border bg-background p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md"
      >
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-foreground/[0.04]">
          <Image
            src={faculty.logoUrl}
            alt={faculty.logoAlt}
            fill
            sizes="56px"
            className="object-contain p-1.5"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold leading-snug tracking-tight">
            {faculty.name}
          </p>
          <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-muted">
            {faculty.abbreviation}
          </p>
        </div>
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-foreground/[0.04] text-muted transition group-hover:bg-accent/10 group-hover:text-accent"
          aria-hidden
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </span>
      </a>
    </motion.li>
  );
}

function CenterGroup({
  centerKey,
  title,
  faculties,
}: {
  centerKey: "bucharest" | "pitesti";
  title: string;
  faculties: Faculty[];
}) {
  if (faculties.length === 0) return null;

  return (
    <div>
      <h3
        id={`faculties-${centerKey}-heading`}
        className="mb-6 flex items-center gap-3 text-xl font-bold tracking-tight md:text-2xl"
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" />
          </svg>
        </span>
        {title}
      </h3>
      <ul
        aria-labelledby={`faculties-${centerKey}-heading`}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
      >
        {faculties.map((faculty, index) => (
          <FacultyCard key={faculty.id} faculty={faculty} index={index} />
        ))}
      </ul>
    </div>
  );
}

export function FacultiesSection({ faculties }: Props) {
  const t = useTranslations("Faculties");

  const total =
    faculties.bucharest.length + faculties.pitesti.length;
  if (total === 0) return null;

  return (
    <section
      aria-labelledby="faculties-heading"
      className="border-b border-border bg-background"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <header className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {t("eyebrow")}
          </p>
          <h2
            id="faculties-heading"
            className="mt-2 text-3xl font-bold tracking-tight md:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="mt-3 max-w-2xl text-muted">{t("description")}</p>
        </header>

        <div className="flex flex-col gap-14">
          <CenterGroup
            centerKey="bucharest"
            title={t("centers.bucharest")}
            faculties={faculties.bucharest}
          />
          <CenterGroup
            centerKey="pitesti"
            title={t("centers.pitesti")}
            faculties={faculties.pitesti}
          />
        </div>
      </div>
    </section>
  );
}
