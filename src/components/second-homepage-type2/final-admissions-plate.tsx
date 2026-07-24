"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SECTION_SKETCHES } from "@/features/second-homepage-type2/section-sketches";
import { SectionSketch } from "@/components/second-homepage-type2/section-sketch";

const EASE = [0.22, 1, 0.36, 1] as const;

export function FinalAdmissionsPlate() {
  const tHome = useTranslations("Home");
  const tAnn = useTranslations("Anniversary");
  const tPros = useTranslations("ProspectiveStudents");
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="shp-admissions"
      className="relative overflow-hidden border-t border-[var(--shp-line-strong)] bg-[var(--shp-paper-deep)]/40"
      aria-labelledby="shp-admissions-title"
    >
      <div className="shp-section-inner relative z-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <p className="shp-mono text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-accent)]">
            {tAnn("eyebrow")}
          </p>
          <div className="mt-3 flex items-start justify-between gap-6 md:gap-10">
            <div className="min-w-0 max-w-2xl">
              <h2 id="shp-admissions-title" className="shp2-text-section-title">
                {tAnn("headline")}
              </h2>
              <p className="shp2-text-lead mt-3">
                {tPros("cards.prep.title")} · {tPros("cards.simulation.title")}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="#shp-admissions" className="shp-btn-primary shp-hover-lift">
                  {tAnn("cta")}
                </Link>
                <a href="#" className="shp-btn-ghost shp-hover-lift">
                  {tHome("ctaBucharest")}
                </a>
                <a href="#" className="shp-btn-ghost shp-hover-lift">
                  {tPros("cards.events.title")}
                </a>
              </div>
            </div>
            <SectionSketch asset={SECTION_SKETCHES.admissions} width={160} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
