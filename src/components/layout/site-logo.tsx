"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function SiteLogo({
  onHero = false,
  className,
  size = 40,
}: {
  onHero?: boolean;
  className?: string;
  size?: number;
}) {
  const { resolvedTheme } = useTheme();
  const mounted = useIsMounted();
  const useWhite = onHero || !mounted || resolvedTheme === "dark";

  return (
    <Image
      src={useWhite ? "/images/logo_alb.svg" : "/logo.svg"}
      alt="POLITEHNICA București"
      width={size}
      height={size}
      className={cn("shrink-0 object-contain", className)}
      priority
    />
  );
}
