"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { type MotionValue, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  getCachedFrame,
  HERO_SEQUENCE_FRAMES,
  loadSequenceFrame,
  preloadSequenceRange,
  progressToFrame,
} from "@/features/second-homepage/hero-sequence";

type Props = {
  /** External 0–1 progress (hero sticky scrub). If omitted, tracks closest section. */
  progress?: MotionValue<number>;
  /** Phase shift 0–1 so multiple scrubbers in one section don't match */
  scrubOffset?: number;
  /** Fallback frame when reduced motion is preferred */
  stillFrame?: number;
  className?: string;
  frameClassName?: string;
  caption?: string;
  ariaLabel?: string;
  showChrome?: boolean;
  priority?: boolean;
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function drawCover(canvas: HTMLCanvasElement, image: HTMLImageElement) {
  const context = canvas.getContext("2d");
  if (!context) return;

  const bounds = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const targetWidth = Math.max(1, Math.round(bounds.width * dpr));
  const targetHeight = Math.max(1, Math.round(bounds.height * dpr));

  if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
    canvas.width = targetWidth;
    canvas.height = targetHeight;
  }

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.fillStyle = "#f7f7f7";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const scale = Math.max(canvas.width / image.width, canvas.height / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const dx = (canvas.width - drawWidth) / 2;
  const dy = (canvas.height - drawHeight) / 2;

  context.drawImage(image, dx, dy, drawWidth, drawHeight);
}

/** 0 when section enters from below, 1 when it leaves above. */
function sectionScrollProgress(section: HTMLElement) {
  const rect = section.getBoundingClientRect();
  const viewH = window.innerHeight || 1;
  const total = rect.height + viewH;
  if (total <= 0) return 0;
  return clamp01((viewH - rect.top) / total);
}

export function SequenceMedia({
  progress: externalProgress,
  scrubOffset = 0,
  stillFrame = 42,
  className,
  frameClassName,
  caption,
  ariaLabel = "Secvență video UPB controlată de derulare",
  showChrome = true,
  priority = false,
}: Props) {
  const reduceMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shellRef = useRef<HTMLElement>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const renderedFrameRef = useRef(-1);
  const targetProgressRef = useRef(0);
  const renderedProgressRef = useRef(0);
  const [ready, setReady] = useState(false);

  const frameShift = Math.round(scrubOffset * (HERO_SEQUENCE_FRAMES - 1));
  const freezeFrame = Math.min(
    HERO_SEQUENCE_FRAMES - 1,
    Math.max(0, stillFrame),
  );

  function paint(index: number) {
    const canvas = canvasRef.current;
    const image = getCachedFrame(index);
    if (!canvas || !image) return;
    drawCover(canvas, image);
    renderedFrameRef.current = index;
  }

  function frameFromProgress(progress: number) {
    const base = progressToFrame(clamp01(progress));
    return (base + frameShift) % HERO_SEQUENCE_FRAMES;
  }

  useLayoutEffect(() => {
    if (externalProgress) return;
    sectionRef.current =
      shellRef.current?.closest("section") ?? shellRef.current;
  }, [externalProgress]);

  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      preloadSequenceRange(0, 15);
      const startFrame = reduceMotion ? freezeFrame : frameFromProgress(0);
      const first = await loadSequenceFrame(startFrame);
      if (cancelled || !first) return;
      setReady(true);
      paint(startFrame);

      if (!reduceMotion) {
        if ("requestIdleCallback" in globalThis) {
          globalThis.requestIdleCallback(() => preloadSequenceRange());
        } else {
          globalThis.setTimeout(() => preloadSequenceRange(), 60);
        }
      }
    };

    void bootstrap();
    return () => {
      cancelled = true;
    };
  }, [freezeFrame, reduceMotion, frameShift]);

  useEffect(() => {
    if (!externalProgress) return;

    const apply = (latest: number) => {
      targetProgressRef.current = clamp01(latest);
    };

    apply(externalProgress.get());
    return externalProgress.on("change", apply);
  }, [externalProgress]);

  useEffect(() => {
    if (externalProgress || reduceMotion || !ready) return;

    const section = sectionRef.current;
    if (!section) return;

    const syncFromSection = () => {
      targetProgressRef.current = sectionScrollProgress(section);
    };

    const startTicker = () => {
      if (rafRef.current !== null) return;

      const tick = () => {
        const target = targetProgressRef.current;
        const current = renderedProgressRef.current;
        const delta = target - current;
        const settled = Math.abs(delta) < 0.0004;
        const next = settled ? target : current + delta * 0.25;
        renderedProgressRef.current = next;

        const frameIndex = frameFromProgress(next);

        for (let offset = -4; offset <= 4; offset += 1) {
          const neighbor =
            (frameIndex + offset + HERO_SEQUENCE_FRAMES) % HERO_SEQUENCE_FRAMES;
          void loadSequenceFrame(neighbor);
        }

        if (getCachedFrame(frameIndex)) {
          if (renderedFrameRef.current !== frameIndex) paint(frameIndex);
        } else {
          let fallback = frameIndex;
          for (let step = 0; step < 12; step += 1) {
            fallback =
              (fallback - 1 + HERO_SEQUENCE_FRAMES) % HERO_SEQUENCE_FRAMES;
            if (getCachedFrame(fallback)) {
              if (renderedFrameRef.current !== fallback) paint(fallback);
              break;
            }
          }
        }

        const rect = section.getBoundingClientRect();
        const viewH = window.innerHeight;
        const nearby =
          priority ||
          (rect.bottom > -viewH * 0.2 && rect.top < viewH * 1.2);

        if (!nearby && settled) {
          rafRef.current = null;
          return;
        }

        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    const onScrollOrResize = () => {
      syncFromSection();
      startTicker();
    };

    syncFromSection();
    startTicker();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [externalProgress, reduceMotion, ready, priority, frameShift]);

  // Hero external scrub ticker
  useEffect(() => {
    if (!externalProgress || reduceMotion || !ready) return;

    const tick = () => {
      const target = targetProgressRef.current;
      const current = renderedProgressRef.current;
      const delta = target - current;
      const next =
        Math.abs(delta) < 0.0004 ? target : current + delta * 0.18;
      renderedProgressRef.current = next;

      const frameIndex = frameFromProgress(next);

      for (let offset = -4; offset <= 4; offset += 1) {
        const neighbor =
          (frameIndex + offset + HERO_SEQUENCE_FRAMES) % HERO_SEQUENCE_FRAMES;
        void loadSequenceFrame(neighbor);
      }

      if (getCachedFrame(frameIndex)) {
        if (renderedFrameRef.current !== frameIndex) paint(frameIndex);
      } else {
        let fallback = frameIndex;
        while (fallback >= 0 && !getCachedFrame(fallback)) fallback -= 1;
        if (fallback >= 0 && renderedFrameRef.current !== fallback) {
          paint(fallback);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [externalProgress, reduceMotion, ready, frameShift]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !ready) return;

    const redraw = () => {
      const frame =
        renderedFrameRef.current >= 0 ? renderedFrameRef.current : freezeFrame;
      paint(frame);
    };

    const observer = new ResizeObserver(redraw);
    observer.observe(canvas);
    redraw();
    return () => observer.disconnect();
  }, [ready, freezeFrame]);

  useEffect(() => {
    if (!ready || !reduceMotion) return;
    void loadSequenceFrame(freezeFrame).then((image) => {
      if (image) paint(freezeFrame);
    });
  }, [ready, reduceMotion, freezeFrame]);

  return (
    <figure ref={shellRef} className={cn("shp-sequence-shell", className)}>
      <div className={cn("shp-sequence-frame", frameClassName)}>
        <canvas
          ref={canvasRef}
          className="shp-sequence-canvas"
          aria-label={ariaLabel}
          role="img"
        />
        {showChrome ? (
          <>
            <div className="shp-hero-video-overlay" aria-hidden />
            <div className="shp-hero-video-noise" aria-hidden />
          </>
        ) : null}
        {!ready ? (
          <div
            className="absolute inset-0 animate-pulse bg-[var(--shp-paper-deep)]"
            aria-hidden
          />
        ) : null}
      </div>
      {caption ? (
        <figcaption className="shp-mono mt-3 flex items-center justify-between gap-4 text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-muted)]">
          <span>{caption}</span>
          <span className="h-px flex-1 bg-[var(--shp-line)]" aria-hidden />
        </figcaption>
      ) : null}
    </figure>
  );
}
