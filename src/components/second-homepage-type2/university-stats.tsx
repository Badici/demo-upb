"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { STATS_SECTION_SKETCH } from "@/features/second-homepage-type2/section-sketches";
import { SectionMarker } from "@/components/second-homepage-type2/section-marker";
import { SectionSketch } from "@/components/second-homepage-type2/section-sketch";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  facultyCount: number;
  partnerCount: number;
};

function formatStatDisplay(value: number, suffix: string) {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    return `${millions.toLocaleString("ro-RO", {
      maximumFractionDigits: millions >= 10 ? 1 : 2,
    })}M${suffix}`;
  }
  return `${value.toLocaleString("ro-RO")}${suffix}`;
}

function AnimatedStat({
  value,
  label,
  suffix = "",
  delay = 0,
}: {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView || reduceMotion) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const total = 40;
    let raf = 0;
    const tick = () => {
      frame += 1;
      const progress = Math.min(1, frame / total);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(value * eased));
      if (frame < total) raf = requestAnimationFrame(tick);
    };
    const timeout = window.setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [inView, reduceMotion, value, delay]);

  const formatted = formatStatDisplay(display, suffix);
  const length = formatted.replace(/\s/g, "").length;
  const sizeClass =
    length >= 7 ? "shp-stat-num--dense" : length >= 5 ? "shp-stat-num--mid" : "";

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay / 1000, ease: EASE }}
      className="shp-stat-card relative border border-[var(--shp-line)] bg-[var(--shp-paper)] p-4 md:p-5"
      title={`${value.toLocaleString("ro-RO")}${suffix}`}
    >
      <p className={`shp-stat-num ${sizeClass}`} aria-hidden>
        {formatted}
      </p>
      <p className="sr-only">
        {`${value.toLocaleString("ro-RO")}${suffix} ${label}`}
      </p>
      <p className="shp-mono mt-3 text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-graphite)]">
        {label}
      </p>
    </motion.div>
  );
}

export function UniversityStats({ facultyCount, partnerCount }: Props) {
  const tAnn = useTranslations("Anniversary");
  const tRes = useTranslations("AcademicResources");
  const tFac = useTranslations("Faculties");
  const tPartners = useTranslations("Partners");
  const reduceMotion = useReducedMotion();

  return (
    <section id="shp-stats" className="shp-section overflow-hidden" aria-labelledby="shp-stats-title">
      <div className="shp-section-inner relative z-10">
        <SectionMarker index="05" label="Date universitare" coords="UNST" />
        <div className="mt-4 flex items-start justify-between gap-6 md:gap-10">
          <div className="min-w-0 max-w-2xl">
            <h2 id="shp-stats-title" className="shp2-text-section-title">
              Statistici universitate
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="shp2-text-lead mt-3"
            >
              {tAnn("headline")}
            </motion.p>
          </div>
          <SectionSketch asset={STATS_SECTION_SKETCH} width={144} />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <AnimatedStat value={200} label={tAnn("eyebrow")} suffix="+" delay={0} />
          <AnimatedStat value={1340762} label={tRes("items.library.title")} delay={80} />
          <AnimatedStat value={facultyCount} label={tFac("title")} delay={160} />
          <AnimatedStat value={partnerCount} label={tPartners("title")} delay={240} />
        </div>
      </div>
    </section>
  );
}
