"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="inline-flex overflow-hidden rounded-lg border border-foreground/15">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          className={cn(
            "px-3 py-1.5 text-sm font-medium uppercase transition",
            loc === locale
              ? "bg-foreground text-background"
              : "bg-foreground/5 text-foreground hover:bg-foreground/10",
          )}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
