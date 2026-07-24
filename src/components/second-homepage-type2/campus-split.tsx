"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { SectionMarker } from "@/components/second-homepage-type2/section-marker";

const EASE = [0.22, 1, 0.36, 1] as const;

const CAMPUS_OUTLINES = {
  bucharest: {
    src: "/bucuresti-outline.png",
    alt: "Contur București — Centrul Universitar București",
    width: 1395,
    height: 1127,
    caption: "Campus București",
  },
  pitesti: {
    src: "/pitesti-outline.png",
    alt: "Contur Pitești — Centrul Universitar Pitești",
    width: 1317,
    height: 1194,
    caption: "Campus Pitești",
  },
} as const;

function CampusOutline({
  center,
}: {
  center: keyof typeof CAMPUS_OUTLINES;
}) {
  const outline = CAMPUS_OUTLINES[center];

  return (
    <figure className="shp-sequence-shell">
      <div className="shp-outline-frame group relative">
        <Image
          src={outline.src}
          alt={outline.alt}
          fill
          sizes="(max-width: 1024px) 90vw, 42vw"
          className="shp-outline-img"
        />
      </div>
      <figcaption className="shp-mono mt-2 text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-muted)]">
        {outline.caption}
      </figcaption>
    </figure>
  );
}

export function CampusSplit() {
  const t = useTranslations("Home");
  const tFac = useTranslations("Faculties");
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="shp-campus"
      className="shp-section shp-section-alt overflow-hidden"
      aria-labelledby="shp-campus-title"
    >
      <div className="shp-section-inner relative z-10">
        <SectionMarker index="01" label="Centre universitare" coords="BU · PT" />
        <h2 id="shp-campus-title" className="shp2-text-section-title mt-4">
          {tFac("centers.bucharest")} / {tFac("centers.pitesti")}
        </h2>
        <p className="shp2-text-lead mt-4">
          {t("subtitle")}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          <motion.article
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="group border border-[var(--shp-line-strong)] bg-[var(--shp-paper)] p-4 md:p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="shp-mono text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-accent)]">
                {tFac("centers.bucharest")}
              </p>
              <p className="shp-mono text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-muted)]">
                București
              </p>
            </div>
            <div className="mt-5">
              <CampusOutline center="bucharest" />
            </div>
            <a href="#" className="shp-btn-primary shp-hover-lift mt-5">
              {t("ctaBucharest")}
            </a>
          </motion.article>

          <motion.article
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="group border border-[var(--shp-line-strong)] bg-[var(--shp-paper)] p-4 md:p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="shp-mono text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-accent)]">
                {tFac("centers.pitesti")}
              </p>
              <p className="shp-mono text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-muted)]">
                Pitești
              </p>
            </div>
            <div className="mt-5">
              <CampusOutline center="pitesti" />
            </div>
            <a href="#" className="shp-btn-ghost shp-hover-lift mt-5">
              {t("ctaPitesti")}
            </a>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
