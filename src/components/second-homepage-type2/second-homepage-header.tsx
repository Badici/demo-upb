"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/second-homepage-type2/brand-mark";
import { ShpLocaleSwitcher } from "@/components/second-homepage-type2/shp-locale-switcher";

const EASE = [0.22, 1, 0.36, 1] as const;

const QUICK_LINKS = [
  { href: "#shp-study", label: "Facultăți" },
  { href: "#shp-events", label: "Evenimente" },
  { href: "#shp-news", label: "Știri" },
  { href: "#shp-admissions", label: "Admitere" },
] as const;

export function SecondHomepageHeader() {
  const t = useTranslations("Common");
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled
            ? "border-b border-[var(--shp-line-strong)] bg-[var(--shp-paper)]/92 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-14 w-full max-w-[1120px] items-center justify-between gap-4 px-[var(--space-section-x)] md:h-16">
          <Link
            href="/"
            className="group min-w-0"
          >
            <BrandMark size={40} priority />
          </Link>

          <nav
            className="hidden items-center gap-6 lg:flex"
            aria-label="Navigare rapidă second homepage"
          >
            {QUICK_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="shp-mono text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-muted)] transition hover:text-[var(--shp-ink)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <ShpLocaleSwitcher />
            <button
              type="button"
              aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-10 items-center gap-2 border border-[var(--shp-line-strong)] px-3 transition hover:border-[var(--shp-ink)] hover:bg-[var(--shp-hover)] lg:hidden"
            >
              <span className="relative block h-3.5 w-5" aria-hidden>
                <motion.span
                  className="absolute left-0 h-px w-5 bg-[var(--shp-ink)]"
                  animate={menuOpen ? { rotate: 45, top: 7 } : { rotate: 0, top: 2 }}
                  transition={{ duration: 0.3, ease: EASE }}
                />
                <motion.span
                  className="absolute left-0 top-[7px] h-px w-5 bg-[var(--shp-ink)]"
                  animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute left-0 h-px w-5 bg-[var(--shp-ink)]"
                  animate={menuOpen ? { rotate: -45, top: 7 } : { rotate: 0, top: 12 }}
                  transition={{ duration: 0.3, ease: EASE }}
                />
              </span>
              <span className="shp-mono hidden text-[0.75rem] uppercase tracking-[0.08em] sm:inline">
                {t("menu")}
              </span>
            </button>
          </div>
        </div>

        {!reduceMotion ? (
          <motion.div
            className="h-px origin-left bg-[var(--shp-accent)]"
            style={{ scaleX }}
          />
        ) : (
          <div className="h-px bg-[var(--shp-line)]" aria-hidden />
        )}
      </header>

      <motion.div
        className="fixed inset-0 z-40 bg-[var(--shp-ink)]/40 lg:hidden"
        initial={false}
        animate={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none" }}
        transition={{ duration: 0.3, ease: EASE }}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />

      <motion.nav
        id="shp-mobile-menu"
        className="fixed inset-y-0 right-0 z-50 w-[min(100%,20rem)] border-l border-[var(--shp-line-strong)] bg-[var(--shp-paper)] px-6 py-20 lg:hidden"
        initial={false}
        animate={{ x: menuOpen ? 0 : "100%" }}
        transition={{ duration: 0.4, ease: EASE }}
        aria-label="Meniu mobil second homepage"
        aria-hidden={!menuOpen}
      >
        <p className="shp-mono text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-muted)]">
          Index secțiuni
        </p>
        <ul className="mt-6 flex flex-col gap-4">
          {QUICK_LINKS.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="shp2-text-subsection-title flex items-baseline gap-3"
              >
                <span className="shp-mono text-[0.75rem] text-[var(--shp-accent)]">
                  {String(i).padStart(2, "0")}
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </motion.nav>
    </>
  );
}
