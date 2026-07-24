"use client";

import { motion, useReducedMotion } from "motion/react";

export function BlueprintGrid() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="shp-grid-bg absolute inset-0 opacity-80" />
      {!reduceMotion ? (
        <>
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 47px, rgba(59,130,246,0.08) 47px, rgba(59,130,246,0.08) 48px)",
            }}
            animate={{ backgroundPositionY: ["0px", "48px"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 47px, rgba(10,31,68,0.04) 47px, rgba(10,31,68,0.04) 48px)",
            }}
            animate={{ backgroundPositionX: ["0px", "48px"] }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          />
        </>
      ) : null}
      <motion.svg
        className="absolute left-6 top-28 h-28 w-28 text-[var(--shp-line)] md:left-12 md:top-32"
        viewBox="0 0 100 100"
        fill="none"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <motion.path
          d="M0 50 H100 M50 0 V100"
          stroke="currentColor"
          strokeWidth="0.5"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle
          cx="50"
          cy="50"
          r="18"
          stroke="currentColor"
          strokeWidth="0.5"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.svg>
      <motion.svg
        className="absolute bottom-24 right-8 hidden h-20 w-32 text-[var(--shp-accent)]/30 md:block"
        viewBox="0 0 120 40"
        fill="none"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.path
          d="M0 20 H80 M80 20 L110 5 M80 20 L110 35"
          stroke="currentColor"
          strokeWidth="0.6"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        />
      </motion.svg>
    </div>
  );
}
