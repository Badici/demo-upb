"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import type { FacultiesByCenter, Faculty } from "@/services/faculties/types";
import { resolveFacultyLogo } from "@/features/second-homepage-type2/faculty-logos";
import { SectionMarker } from "@/components/second-homepage-type2/section-marker";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  faculties: FacultiesByCenter;
};

type CenterKey = keyof FacultiesByCenter;

function FacultyRow({
  faculty,
  index,
  delay = 0,
}: {
  faculty: Faculty;
  index: number;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const num = String(index + 1).padStart(2, "0");
  const logoSrc = resolveFacultyLogo(faculty.abbreviation, faculty.logoUrl);

  return (
    <motion.a
      href={faculty.website}
      target="_blank"
      rel="noopener noreferrer"
      initial={reduceMotion ? false : { opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-12px" }}
      transition={{ duration: 0.4, delay, ease: EASE }}
      className="group grid grid-cols-[2.5rem_3rem_minmax(0,1fr)_auto] items-center gap-3 border-b border-[var(--shp-line)] py-3.5 transition hover:bg-[var(--shp-hover)] md:grid-cols-[3rem_3.5rem_minmax(0,1fr)_auto] md:gap-4 md:py-4"
    >
      <span className="shp-mono text-[0.75rem] text-[var(--shp-accent)]">
        {num}
      </span>

      <span className="relative h-12 w-12 shrink-0 overflow-hidden md:h-14 md:w-14">
        <Image
          src={logoSrc}
          alt=""
          fill
          sizes="56px"
          className="object-contain p-0.5 transition duration-400 group-hover:scale-[1.04]"
        />
      </span>

      <span className="min-w-0">
        <span className="shp2-text-card-title block text-[var(--shp-ink)] transition group-hover:text-[var(--shp-accent)]">
          {faculty.name}
        </span>
        <span className="shp-mono mt-1 block text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-muted)]">
          {faculty.abbreviation}
        </span>
      </span>

      <span
        className="shp-mono text-[0.75rem] text-[var(--shp-muted)] transition group-hover:translate-x-0.5 group-hover:text-[var(--shp-ink)]"
        aria-hidden
      >
        ↗
      </span>
    </motion.a>
  );
}

function CenterDirectory({
  centerKey,
  faculties,
  chapterIndex,
}: {
  centerKey: CenterKey;
  faculties: Faculty[];
  chapterIndex: number;
}) {
  const t = useTranslations("Faculties");
  const reduceMotion = useReducedMotion();
  const code = centerKey === "bucharest" ? "BU" : "PT";

  if (faculties.length === 0) return null;

  return (
    <article className="mt-10 first:mt-8">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: EASE }}
        className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--shp-line-strong)] pb-3"
      >
        <div>
          <p className="shp-mono text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-accent)]">
            {code} · {String(chapterIndex).padStart(2, "0")}
          </p>
          <h3 className="shp2-text-subsection-title mt-1.5">
            {t(`centers.${centerKey}`)}
          </h3>
        </div>
        <p className="shp-mono text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-muted)]">
          {String(faculties.length).padStart(2, "0")} facultăți
        </p>
      </motion.div>

      <div className="border-t border-[var(--shp-line)]">
        {faculties.map((faculty, i) => (
          <FacultyRow
            key={faculty.id}
            faculty={faculty}
            index={i}
            delay={(i % 10) * 0.03}
          />
        ))}
      </div>
    </article>
  );
}

export function StudyIndex({ faculties }: Props) {
  const t = useTranslations("Faculties");
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="shp-study"
      className="shp-section overflow-hidden"
      aria-labelledby="shp-study-title"
    >
      <div className="shp-section-inner relative z-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <SectionMarker index="02" label={t("eyebrow")} coords="BU · PT" />
          <h2 id="shp-study-title" className="shp2-text-section-title mt-4">
            {t("title")}
          </h2>
          <p className="shp2-text-lead mt-4">{t("description")}</p>
        </motion.div>

        <CenterDirectory
          centerKey="bucharest"
          faculties={faculties.bucharest}
          chapterIndex={1}
        />
        <CenterDirectory
          centerKey="pitesti"
          faculties={faculties.pitesti}
          chapterIndex={2}
        />
      </div>
    </section>
  );
}
