"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function ThemeToggle({
  className,
  onHero = false,
}: {
  className?: string;
  onHero?: boolean;
}) {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("Theme");
  const mounted = useIsMounted();

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className={cn("w-9 px-0", className)}
        aria-label={t("toggle")}
        disabled
      />
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "w-9 px-0",
        onHero && "text-white hover:bg-white/10 hover:text-white",
        className,
      )}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={t("toggle")}
    >
      {theme === "dark" ? (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </Button>
  );
}

export function LocaleSwitcher({
  className,
  onHero = false,
}: {
  className?: string;
  onHero?: boolean;
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Locale");

  const switchLocale = (newLocale: "ro" | "en") => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-xl p-1",
        onHero ? "bg-white/10" : "glass",
        className,
      )}
    >
      {(["ro", "en"] as const).map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={cn(
            "rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-300",
            locale === loc
              ? "bg-accent text-white shadow-sm"
              : onHero
                ? "text-white/60 hover:text-white"
                : "text-foreground/60 hover:text-foreground",
          )}
          aria-current={locale === loc ? "true" : undefined}
        >
          {t(loc)}
        </button>
      ))}
    </div>
  );
}
