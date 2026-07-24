"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const STROKE = "var(--shp-ink)";
const ACCENT = "var(--shp-accent)";

type SketchProps = {
  className?: string;
};

function SketchFrame({
  className,
  children,
  delay = 0,
}: {
  className?: string;
  children: ReactNode;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 160 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-full w-full", className)}
      aria-hidden
      initial={reduceMotion ? false : { opacity: 0.35 }}
      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
            }
      }
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.svg>
  );
}

function DrawnPath({
  d,
  delay = 0,
  accent = false,
}: {
  d: string;
  delay?: number;
  accent?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.path
      d={d}
      stroke={accent ? ACCENT : STROKE}
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={reduceMotion ? false : { pathLength: 0, opacity: 0.4 }}
      whileInView={
        reduceMotion ? undefined : { pathLength: 1, opacity: 1 }
      }
      viewport={{ once: true }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

/** Calendar + gathering — evenimente. */
export function SketchEvents({ className }: SketchProps) {
  return (
    <SketchFrame className={className} delay={0}>
      <DrawnPath d="M28 38h104v62H28z" delay={0.05} />
      <DrawnPath d="M28 52h104" delay={0.12} />
      <DrawnPath d="M48 30v16M80 30v16M112 30v16" delay={0.18} />
      <DrawnPath d="M44 66h16M68 66h16M92 66h16M116 66h8" delay={0.28} accent />
      <DrawnPath d="M44 82h16M68 82h16M92 82h16" delay={0.36} />
      <motion.g
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <DrawnPath d="M54 104c4-8 12-8 16 0M78 104c4-8 12-8 16 0M102 104c4-8 12-8 16 0" delay={0.45} />
      </motion.g>
    </SketchFrame>
  );
}

/** Books / desk — pregătire. */
export function SketchPrep({ className }: SketchProps) {
  return (
    <SketchFrame className={className} delay={0.05}>
      <DrawnPath d="M36 88h88" delay={0.08} />
      <DrawnPath d="M44 88V48l36-10 36 10v40" delay={0.16} />
      <DrawnPath d="M80 38v50" delay={0.24} accent />
      <DrawnPath d="M52 62h18M52 72h18M90 62h18M90 72h18" delay={0.32} />
      <motion.g
        animate={{ rotate: [0, 2, 0, -2, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "112px 78px" }}
      >
        <DrawnPath d="M108 78l18-6v20l-18 6z" delay={0.4} />
        <DrawnPath d="M112 82l10-3M112 88l10-3" delay={0.48} accent />
      </motion.g>
    </SketchFrame>
  );
}

/** Exam sheet — simulare. */
export function SketchSimulation({ className }: SketchProps) {
  return (
    <SketchFrame className={className} delay={0.1}>
      <DrawnPath d="M48 24h64v84H48z" delay={0.08} />
      <DrawnPath d="M58 40h44M58 52h44M58 64h28" delay={0.2} />
      <DrawnPath d="M58 80h12M78 80h12M98 80h12" delay={0.3} />
      <motion.g
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "64px 96px" }}
      >
        <DrawnPath d="M58 96l6 6 14-16" delay={0.42} accent />
      </motion.g>
      <DrawnPath d="M88 100h20" delay={0.5} />
    </SketchFrame>
  );
}

/** Stage / curtains — teatru. */
export function SketchTheatre({ className }: SketchProps) {
  return (
    <SketchFrame className={className} delay={0.12}>
      <DrawnPath d="M24 28h112v8H24z" delay={0.06} />
      <DrawnPath d="M32 36c8 28 8 52 0 72M128 36c-8 28-8 52 0 72" delay={0.14} accent />
      <DrawnPath d="M48 48h64v44H48z" delay={0.24} />
      <motion.g
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <DrawnPath d="M64 78h32M72 78v14M88 78v14" delay={0.36} />
        <DrawnPath d="M68 68h24" delay={0.44} />
      </motion.g>
      <DrawnPath d="M40 108h80" delay={0.52} />
    </SketchFrame>
  );
}
