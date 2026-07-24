"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { SectionMarker } from "@/components/second-homepage-type2/section-marker";
import {
  SketchEvents,
  SketchPrep,
  SketchSimulation,
  SketchTheatre,
} from "@/components/second-homepage-type2/prospective-sketches";

const EASE = [0.22, 1, 0.36, 1] as const;

type CardKey = "events" | "prep" | "simulation" | "theatre";

const CARD_SKETCH = {
  events: SketchEvents,
  prep: SketchPrep,
  simulation: SketchSimulation,
  theatre: SketchTheatre,
} as const;

export function ProspectivePlate() {
  const t = useTranslations("ProspectiveStudents");
  const reduceMotion = useReducedMotion();
  const cards: CardKey[] = ["events", "prep", "simulation", "theatre"];

  return (
    <section
      id="shp-prospective"
      className="shp-section shp-section-alt overflow-hidden"
      aria-labelledby="shp-prospective-title"
    >
      <div className="shp-section-inner relative z-10">
        <SectionMarker index="06" label="Admitere" coords="FUTURE" />
        <h2 id="shp-prospective-title" className="shp2-text-section-title mt-4">
          {t("title")}
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((key, index) => {
            const Sketch = CARD_SKETCH[key];
            return (
              <motion.article
                key={key}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
                className="h-full"
              >
                <a
                  href="#"
                  className="group shp-hover-lift flex h-full flex-col border border-[var(--shp-line)] bg-[var(--shp-paper)]"
                >
                  <div className="relative aspect-[5/4] overflow-hidden border-b border-[var(--shp-line)] bg-[var(--shp-paper-deep)]/40 px-4 py-3">
                    <Sketch className="h-full w-full" />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="shp-mono text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-muted)]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="shp2-text-card-title mt-2">
                      {t(`cards.${key}.title`)}
                    </h3>
                    <span className="shp-mono mt-auto inline-block pt-4 text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-accent)] transition group-hover:translate-x-1">
                      {t("viewMore")} →
                    </span>
                  </div>
                </a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
