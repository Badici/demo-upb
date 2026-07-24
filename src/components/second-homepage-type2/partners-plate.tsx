"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { SECTION_SKETCHES } from "@/features/second-homepage-type2/section-sketches";
import type { Partner } from "@/services/partners/types";
import { SectionMarker } from "@/components/second-homepage-type2/section-marker";
import { SectionSketch } from "@/components/second-homepage-type2/section-sketch";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  partners: Partner[];
};

export function PartnersPlate({ partners }: Props) {
  const t = useTranslations("Partners");
  const reduceMotion = useReducedMotion();

  if (partners.length === 0) return null;

  return (
    <section
      id="shp-partners"
      className="shp-section shp-section-alt overflow-hidden"
      aria-labelledby="shp-partners-title"
    >
      <div className="shp-section-inner relative z-10">
        <SectionMarker index="08" label={t("eyebrow")} coords="NETWORK" />
        <div className="mt-4 flex items-start justify-between gap-6 md:gap-10">
          <h2 id="shp-partners-title" className="shp2-text-section-title min-w-0 max-w-2xl">
            {t("title")}
          </h2>
          <SectionSketch asset={SECTION_SKETCHES.partners} width={64} />
        </div>
      </div>

      <div className="relative z-10 mt-8 overflow-hidden border-y border-[var(--shp-line)] py-7 md:py-8">
        <motion.div
          className="flex w-max gap-8 px-6 md:gap-10"
          animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: Math.max(28, partners.length * 5), repeat: Infinity, ease: "linear" }
          }
        >
          {[...partners, ...partners].map((partner, index) => (
            <a
              key={`${partner.id}-${index}`}
              href={partner.link || "#"}
              target={partner.link ? "_blank" : undefined}
              rel={partner.link ? "noopener noreferrer" : undefined}
              className="group flex w-40 shrink-0 flex-col items-center gap-3 md:w-48"
              aria-hidden={index >= partners.length}
              tabIndex={index >= partners.length ? -1 : undefined}
            >
              <div className="relative flex h-24 w-full items-center justify-center border border-[var(--shp-line)] bg-[var(--shp-paper)] p-4 transition duration-400 group-hover:-translate-y-1 group-hover:border-[var(--shp-accent)]/50 group-hover:shadow-[0_12px_32px_rgba(10,31,68,0.08)]">
                <Image
                  src={partner.logoUrl}
                  alt={partner.logoAlt}
                  width={120}
                  height={48}
                  className="max-h-12 w-auto object-contain grayscale transition duration-400 group-hover:grayscale-0"
                />
              </div>
              <span className="shp-mono text-center text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-muted)]">
                {partner.name}
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
