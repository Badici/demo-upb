"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BlueprintGrid } from "@/components/second-homepage-type2/blueprint-grid";
import { SequenceMedia } from "@/components/second-homepage-type2/sequence-media";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ArchitecturalHero() {
  const t = useTranslations("Home");
  const tNews = useTranslations("News");
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      id="shp-hero"
      aria-labelledby="shp-hero-title"
      className="relative min-h-[220svh] border-b border-[var(--shp-line)] md:min-h-[240svh] xl:min-h-[260svh]"
    >
      <div className="shp-hero-sticky sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <BlueprintGrid />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_46%,var(--shp-accent-soft),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.35),rgba(252,253,254,0.92))]" />

        <div className="shp-hero-panel relative z-10 mx-auto grid w-full flex-1 grid-cols-1 content-center items-center md:grid-cols-[1.05fr_0.85fr]">
          <div className="shp-hero-copy relative z-10">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="shp-hero-badge"
            >
              {t("badge")}
            </motion.p>

            <motion.h1
              id="shp-hero-title"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.06, ease: EASE }}
              className="shp-hero-title mt-4"
            >
              {t.rich("title", {
                hl: (chunks) => (
                  <span className="text-[var(--shp-accent)]">{chunks}</span>
                ),
              })}
            </motion.h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease: EASE }}
              className="shp-hero-tagline mt-4"
            >
              {t("tagline")}
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18, ease: EASE }}
              className="shp-hero-actions mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2"
            >
              <a href="#" className="shp-btn-primary shp-hover-lift w-full text-center">
                {t("ctaBucharest")}
              </a>
              <a href="#" className="shp-btn-ghost shp-hover-lift w-full text-center">
                {t("ctaPitesti")}
              </a>
              <Link
                href="#shp-news"
                className="shp-btn-ghost shp-hover-lift w-full text-center sm:col-span-2"
              >
                {tNews("viewAll")}
              </Link>
            </motion.div>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="shp-hero-meta mt-6"
            >
              {t("scrollHint")} ↓
            </motion.p>
          </div>

          <div className="shp-hero-media relative z-10 min-w-0 self-center">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.14, ease: EASE }}
              className="shp-hero-video-shell"
            >
              <SequenceMedia
                progress={scrollYProgress}
                priority
                showChrome={false}
                caption={t("heroMediaCaption")}
                ariaLabel={t("heroMediaLabel")}
                frameClassName="shp-hero-video-frame"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
