"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";
import type { SketchAssetMeta } from "@/features/second-homepage/sketch-assets";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  asset: SketchAssetMeta;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  parallax?: boolean;
  parallaxOffset?: number;
  reveal?: boolean;
  caption?: string;
  rotation?: number;
  scale?: number;
  float?: boolean;
  bleed?: boolean;
  mask?: boolean;
};

export function SketchAsset({
  asset,
  className,
  imageClassName,
  priority = false,
  sizes = "(max-width: 768px) 90vw, 50vw",
  parallax = false,
  parallaxOffset = 48,
  reveal = true,
  caption,
  rotation = 0,
  scale = 1,
  float = false,
  bleed = false,
  mask = false,
}: Props) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [parallaxOffset * 0.5, -parallaxOffset * 0.5],
  );

  return (
    <figure
      ref={ref}
      className={cn(
        "shp-sketch-wrap",
        bleed && "shp-sketch-bleed",
        mask && "shp-sketch-mask",
        className,
      )}
    >
      <motion.div
        initial={
          reveal && !reduceMotion
            ? { opacity: 0, y: 36, clipPath: "inset(8% 8% 100% 8%)" }
            : false
        }
        whileInView={
          reveal && !reduceMotion
            ? { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }
            : undefined
        }
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE }}
        style={parallax && !reduceMotion ? { y: parallaxY } : undefined}
        className={cn(
          "relative h-full min-h-[8rem] w-full",
          parallax && !reduceMotion && "will-change-transform",
        )}
      >
        <motion.div
          className="relative h-full w-full"
          style={{ rotate: rotation, scale }}
          animate={
            float && !reduceMotion ? { y: [0, -10, 0] } : undefined
          }
          transition={
            float && !reduceMotion
              ? { duration: 7, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
        >
          <Image
            src={asset.src}
            alt={asset.alt}
            fill
            sizes={sizes}
            priority={priority}
            className={cn("object-contain", imageClassName)}
          />
        </motion.div>
      </motion.div>
      {caption ? (
        <figcaption className="shp-mono mt-3 text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-muted)]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
