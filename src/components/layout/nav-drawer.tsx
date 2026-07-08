"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NAVIGATION, type NavGroup } from "@/data/navigation";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

function Chevron({ open }: { open: boolean }) {
  return (
    <motion.svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-muted"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </motion.svg>
  );
}

function Collapsible({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LinkList({ links, onNavigate }: { links: NavGroup["links"]; onNavigate: () => void }) {
  return (
    <ul className="flex flex-col">
      {links.map((link, i) => (
        <li key={`${link.label}-${i}`}>
          <a
            href={link.href}
            onClick={onNavigate}
            className="block rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-foreground/5 hover:text-foreground"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function Group({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);

  if (!group.title) {
    return <LinkList links={group.links} onNavigate={onNavigate} />;
  }

  return (
    <div className="rounded-xl bg-foreground/[0.03]">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-foreground/80 transition hover:text-foreground"
      >
        {group.title}
        <Chevron open={open} />
      </button>
      <Collapsible open={open}>
        <div className="px-1 pb-2">
          <LinkList links={group.links} onNavigate={onNavigate} />
        </div>
      </Collapsible>
    </div>
  );
}

export function NavDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Meniu principal">
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={onClose}
          />
          <motion.aside
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-background shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
                Meniu
              </span>
              <button
                type="button"
                aria-label="Închide meniul"
                onClick={onClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground transition hover:bg-foreground/5"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-4">
              <ul className="flex flex-col gap-1">
                {NAVIGATION.map((section) => {
                  const isOpen = expanded === section.id;
                  return (
                    <li key={section.id}>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setExpanded(isOpen ? null : section.id)}
                        className={cn(
                          "flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-left text-base font-semibold transition",
                          isOpen ? "bg-foreground/5 text-foreground" : "text-foreground hover:bg-foreground/5",
                        )}
                      >
                        {section.label}
                        <Chevron open={isOpen} />
                      </button>
                      <Collapsible open={isOpen}>
                        <div className="flex flex-col gap-2 px-2 py-2">
                          {section.groups.map((group, gi) => (
                            <Group key={group.title ?? gi} group={group} onNavigate={onClose} />
                          ))}
                        </div>
                      </Collapsible>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
