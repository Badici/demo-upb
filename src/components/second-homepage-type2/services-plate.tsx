"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { SECTION_SKETCHES } from "@/features/second-homepage-type2/section-sketches";
import { SectionMarker } from "@/components/second-homepage-type2/section-marker";
import { SectionSketch } from "@/components/second-homepage-type2/section-sketch";

const EASE = [0.22, 1, 0.36, 1] as const;

const SERVICE_KEYS = [
  "alumni",
  "shop",
  "polijobs",
  "ccvsar",
  "upbizz",
  "ccoc",
] as const;

export function ServicesPlate() {
  const t = useTranslations("StudentServices");
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState<string | null>(SERVICE_KEYS[0]);

  return (
    <section id="shp-services" className="shp-section overflow-hidden" aria-labelledby="shp-services-title">
      <div className="shp-section-inner relative z-10">
        <SectionMarker index="07" label={t("eyebrow")} coords="SERVICES" />
        <div className="mt-4 flex items-start justify-between gap-6 md:gap-10">
          <h2 id="shp-services-title" className="shp2-text-section-title min-w-0 max-w-2xl">
            {t("title")}
          </h2>
          <SectionSketch asset={SECTION_SKETCHES.services} width={152} />
        </div>

        <div className="mt-8 border-y border-[var(--shp-line-strong)]">
          {SERVICE_KEYS.map((key, index) => {
            const isOpen = open === key;
            return (
              <div key={key} className="border-b border-[var(--shp-line)] last:border-b-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : key)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left transition hover:bg-[var(--shp-hover)]"
                >
                  <span className="flex items-center gap-4">
                    <span className="shp-mono text-[0.75rem] text-[var(--shp-accent)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="shp2-text-card-title">
                      {t(`items.${key}.title`)}
                    </span>
                  </span>
                  <span className="shp-mono text-[0.7rem] text-[var(--shp-muted)]">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="content"
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="shp2-text-body-sm px-4 pb-4 md:px-10">
                        {t(`items.${key}.description`)}
                      </p>
                      <a
                        href="#"
                        className="shp-mono mb-4 inline-block px-4 text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-blue)] transition hover:text-[var(--shp-ink)] md:px-10"
                      >
                        {t("viewMore")} →
                      </a>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
