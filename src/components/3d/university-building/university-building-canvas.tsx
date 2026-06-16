"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import type { MutableRefObject } from "react";
import type { Announcement, Faculty } from "@/types/content";
import { UniversityBuildingScene } from "@/components/3d/university-building/university-building-scene";

export function UniversityBuildingCanvas({
  progressRef,
  doors,
  announcements,
}: {
  progressRef: MutableRefObject<number>;
  doors: Faculty[];
  announcements: Announcement[];
}) {
  return (
    <Canvas
      camera={{ position: [0, 3.1, 10], fov: 38 }}
      dpr={[1, 2]}
      frameloop="always"
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      onCreated={({ scene }) => {
        scene.fog = null;
      }}
    >
      <Suspense fallback={null}>
        <UniversityBuildingScene
          progressRef={progressRef}
          doors={doors}
          announcements={announcements}
        />
      </Suspense>
    </Canvas>
  );
}

