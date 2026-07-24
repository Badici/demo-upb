"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { SectionMarker } from "@/components/second-homepage-type2/section-marker";

const EASE = [0.22, 1, 0.36, 1] as const;

type CardKey = "events" | "prep" | "simulation" | "theatre";

const CARD_IMAGES: Record<
  CardKey,
  { src: string; alt: string }
> = {
  events: {
    src: "/beneficii/evenimente.png",
    alt: "Evenimente pentru viitori studenți",
  },
  prep: {
    src: "/beneficii/pregatire-admitere.png",
    alt: "Pregătire admitere",
  },
  simulation: {
    src: "/beneficii/simulare-admitere.png",
    alt: "Simulare admitere",
  },
  theatre: {
    src: "/beneficii/spectacole-teatru.png",
    alt: "Spectacole de teatru",
  },
};

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
            const image = CARD_IMAGES[key];
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
                  <div className="relative flex aspect-[5/4] items-center justify-center overflow-hidden border-b border-[var(--shp-line)] bg-[var(--shp-paper-deep)]/40 p-5 md:p-6">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={480}
                      height={384}
                      sizes="(max-width: 640px) 70vw, (max-width: 1280px) 35vw, 18vw"
                      className="h-auto max-h-full w-auto max-w-[78%] object-contain transition duration-500 group-hover:scale-[1.03]"
                    />
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
