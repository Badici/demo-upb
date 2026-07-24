"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import type { SketchAssetMeta } from "@/features/second-homepage/sketch-assets";

type Props = {
  asset: SketchAssetMeta & { width?: number; height?: number };
  className?: string;
  /** Display width in px (intrinsic height follows asset aspect). */
  width?: number;
  float?: boolean;
  priority?: boolean;
};

/**
 * Compact sketch beside section titles.
 * Prefer content-cropped assets so ink aligns with the title top edge.
 */
export function SectionSketch({
  asset,
  className,
  width = 140,
  float = true,
  priority = false,
}: Props) {
  const reduceMotion = useReducedMotion();
  const intrinsicW = asset.width ?? 1500;
  const intrinsicH = asset.height ?? 1500;
  const fillWidth = Boolean(className?.match(/(?:^|\s)!?w-full(?:\s|$)/));

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 4 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative shrink-0 self-start leading-none", className)}
      style={fillWidth ? undefined : { width }}
    >
      <motion.div
        className="leading-none"
        animate={
          float && !reduceMotion ? { y: [0, -2, 0] } : undefined
        }
        transition={
          float && !reduceMotion
            ? { duration: 6.5, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
      >
        <Image
          src={asset.src}
          alt={asset.alt}
          width={intrinsicW}
          height={intrinsicH}
          priority={priority}
          sizes={fillWidth ? "(max-width: 768px) 58vw, 28rem" : `${width}px`}
          className="block h-auto w-full object-contain object-top"
        />
      </motion.div>
    </motion.div>
  );
}
