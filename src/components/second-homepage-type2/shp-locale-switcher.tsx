"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function ShpLocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="inline-flex overflow-hidden border border-[var(--shp-line-strong)]">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          className={cn(
            "shp-mono px-3 py-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.08em] transition",
            loc === locale
              ? "bg-[var(--shp-ink)] text-[var(--shp-paper)]"
              : "bg-transparent text-[var(--shp-muted)] hover:bg-[var(--shp-hover)] hover:text-[var(--shp-ink)]",
          )}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
