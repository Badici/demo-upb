"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import type { Announcement } from "@/services/announcements/types";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_MS = 6000;

type Props = {
  announcements: Announcement[];
};

function SlideLink({
  announcement,
  children,
}: {
  announcement: Announcement;
  children: React.ReactNode;
}) {
  const link = announcement.link;

  if (!link) {
    return <div className="block h-full w-full">{children}</div>;
  }

  if (link.isExternal) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full w-full"
        aria-label={announcement.title}
      >
        {children}
      </a>
    );
  }

  return (
    <a href={link.href} className="block h-full w-full" aria-label={announcement.title}>
      {children}
    </a>
  );
}

export function AnnouncementsCarousel({ announcements }: Props) {
  const t = useTranslations("Home");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = announcements.length;
  const current = announcements[index];

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (count <= 1 || paused) return;
    const timer = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [count, paused, next, index]);

  if (count === 0 || !current) return null;

  return (
    <section
      aria-label={t("announcementsLabel")}
      className="border-b border-border bg-background"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-10 md:px-10 md:py-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t("announcementsEyebrow")}
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
              {t("announcementsTitle")}
            </h2>
          </div>

          {count > 1 && (
            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={prev}
                aria-label={t("announcementsPrev")}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-foreground/5 text-foreground transition hover:bg-foreground/10"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={next}
                aria-label={t("announcementsNext")}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-foreground/5 text-foreground transition hover:bg-foreground/10"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-border bg-foreground/[0.03] shadow-sm">
          <div className="relative aspect-[21/7] w-full sm:aspect-[21/6]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="absolute inset-0"
              >
                <SlideLink announcement={current}>
                  <Image
                    src={current.imageUrl}
                    alt={current.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 1152px"
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                    <p className="max-w-2xl text-sm font-semibold text-white drop-shadow md:text-base">
                      {current.title}
                    </p>
                  </div>
                </SlideLink>
              </motion.div>
            </AnimatePresence>
          </div>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label={t("announcementsPrev")}
                className="absolute top-1/2 left-3 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/50 sm:hidden"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={next}
                aria-label={t("announcementsNext")}
                className="absolute top-1/2 right-3 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/50 sm:hidden"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>

              <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-2 md:bottom-4">
                {announcements.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={t("announcementsGoTo", { title: item.title })}
                    aria-current={i === index}
                    onClick={() => goTo(i)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      i === index
                        ? "w-8 bg-white"
                        : "w-2 bg-white/50 hover:bg-white/75",
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
