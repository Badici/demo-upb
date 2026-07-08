"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

export function ThemeToggle() {
  const t = useTranslations("Common");
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={t("toggleTheme")}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-foreground/15 bg-foreground/5 text-foreground transition hover:bg-foreground/10"
    >
      {mounted ? (isDark ? "☀" : "☾") : "☾"}
    </button>
  );
}
