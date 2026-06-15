"use client";

import dynamic from "next/dynamic";
import { GlassCard } from "@/components/ui/glass-card";

const GraduationCapScene = dynamic(
  () =>
    import("@/components/3d/graduation-cap").then(
      (mod) => mod.GraduationCapScene,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-32 w-32 animate-pulse rounded-full bg-accent/20" />
      </div>
    ),
  },
);

export function GraduationCapHero() {
  return (
    <GlassCard padding="none" className="relative h-[320px] w-full overflow-hidden md:h-[400px] lg:h-[480px]">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-cyan/10" />
      <GraduationCapScene />
    </GlassCard>
  );
}
