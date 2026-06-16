"use client";

import { useEffect, useRef } from "react";
import { clamp01 } from "@/lib/easing";

/**
 * Returns a ref you can read from inside r3f `useFrame`.
 * Progress is 0..1 while the element scrolls from "off-screen bottom" to "off-screen top".
 */
export function useElementScrollProgress<T extends HTMLElement>() {
  const elRef = useRef<T | null>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const el = elRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // When rect.top === vh => 0
      // When rect.top === -rect.height => 1
      const denom = vh + rect.height;
      const raw = denom > 0 ? (vh - rect.top) / denom : 0;
      progressRef.current = clamp01(raw);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { elRef, progressRef };
}

