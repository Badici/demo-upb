"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { SECTION_SKETCHES } from "@/features/second-homepage-type2/section-sketches";
import { SectionMarker } from "@/components/second-homepage-type2/section-marker";
import { SectionSketch } from "@/components/second-homepage-type2/section-sketch";

const EASE = [0.22, 1, 0.36, 1] as const;

const ITEM_KEYS = ["press", "library", "events", "bulletin"] as const;

export function ResourcesPlate() {
  const t = useTranslations("AcademicResources");
  const reduceMotion = useReducedMotion();

  return (
    <section id="shp-resources" className="shp-section overflow-hidden" aria-labelledby="shp-resources-title">
      <div className="shp-section-inner">
        <SectionMarker index="09" label={t("eyebrow")} coords="ARCHIVE" />
        <div className="mt-4 flex items-start justify-between gap-6 md:gap-10">
          <div className="min-w-0 max-w-2xl">
            <h2 id="shp-resources-title" className="shp2-text-section-title">
              {t("title")}
            </h2>
            <p className="shp2-text-lead mt-3">{t("description")}</p>
          </div>
          <SectionSketch asset={SECTION_SKETCHES.resources} width={152} />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ITEM_KEYS.map((key, index) => (
            <motion.article
              key={key}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: EASE }}
              className="shp-hover-lift border border-[var(--shp-line)] bg-[var(--shp-paper)] p-5 transition hover:border-[var(--shp-line-strong)]"
            >
              <p className="shp-mono text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-accent)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="shp2-text-card-title mt-2">{t(`items.${key}.title`)}</h3>
              <p className="shp2-text-body-sm mt-2">
                {t(`items.${key}.description`)}
              </p>
              <a
                href="#"
                className="shp-mono mt-4 inline-block text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-blue)] transition hover:text-[var(--shp-ink)]"
              >
                {t("viewMore")} →
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
