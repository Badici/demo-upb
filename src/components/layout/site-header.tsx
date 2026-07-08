"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { NavDrawer } from "@/components/layout/nav-drawer";

const EASE = [0.22, 1, 0.36, 1] as const;

function HamburgerIcon({ open }: { open: boolean }) {
  const common = "absolute left-0 h-[2px] w-6 rounded-full bg-current";
  return (
    <span className="relative block h-4 w-6" aria-hidden>
      <motion.span
        className={common}
        style={{ top: 1 }}
        animate={open ? { rotate: 45, top: 7 } : { rotate: 0, top: 1 }}
        transition={{ duration: 0.3, ease: EASE }}
      />
      <motion.span
        className={common}
        style={{ top: 7 }}
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2, ease: EASE }}
      />
      <motion.span
        className={common}
        style={{ top: 13 }}
        animate={open ? { rotate: -45, top: 7 } : { rotate: 0, top: 13 }}
        transition={{ duration: 0.3, ease: EASE }}
      />
    </span>
  );
}

export function SiteHeader() {
  const t = useTranslations("Common");
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:px-10">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="UNST Politehnica București"
              width={60}
              height={60}
              className="h-15 w-15 dark:hidden"
              priority
            />
            <Image
              src="/images/logo_alb.svg"
              alt="UNST Politehnica București"
              width={40}
              height={40}
              className="hidden h-10 w-10 dark:block"
              priority
            />
            <span className="hidden text-sm font-semibold tracking-tight sm:block">
              UNST Politehnica București
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <LocaleSwitcher />
            <ThemeToggle />
            <button
              type="button"
              aria-label={open ? t("closeMenu") : t("openMenu")}
              aria-expanded={open}
              aria-controls="main-menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-foreground/5 px-3 py-2 text-foreground transition hover:bg-foreground/10"
            >
              <HamburgerIcon open={open} />
              <span className="hidden text-sm font-medium sm:block">
                {t("menu")}
              </span>
            </button>
          </div>
        </div>
      </header>

      <div id="main-menu">
        <NavDrawer open={open} onClose={() => setOpen(false)} />
      </div>
    </>
  );
}
