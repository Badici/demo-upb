"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { Vector3 } from "three";
import type { Group } from "three";

type Point3 = [number, number, number];

function toVectors(points: Point3[]) {
  return points.map(([x, y, z]) => new Vector3(x, y, z));
}

function boxSegments(
  width: number,
  height: number,
  depth: number,
  centerY: number,
): Point3[] {
  const hw = width / 2;
  const hh = height / 2;
  const hd = depth / 2;
  const y0 = centerY - hh;
  const y1 = centerY + hh;

  return [
    [-hw, y0, -hd], [hw, y0, -hd],
    [hw, y0, -hd], [hw, y0, hd],
    [hw, y0, hd], [-hw, y0, hd],
    [-hw, y0, hd], [-hw, y0, -hd],
    [-hw, y1, -hd], [hw, y1, -hd],
    [hw, y1, -hd], [hw, y1, hd],
    [hw, y1, hd], [-hw, y1, hd],
    [-hw, y1, hd], [-hw, y1, -hd],
    [-hw, y0, -hd], [-hw, y1, -hd],
    [hw, y0, -hd], [hw, y1, -hd],
    [hw, y0, hd], [hw, y1, hd],
    [-hw, y0, hd], [-hw, y1, hd],
  ];
}

function diamond(y: number, radius: number, segments = 4): Point3[] {
  return Array.from({ length: segments + 1 }, (_, i) => {
    const angle = Math.PI / 4 + (i * Math.PI * 2) / segments;
    return [Math.cos(angle) * radius, y, Math.sin(angle) * radius];
  });
}

function circle(y: number, radius: number, segments = 16): Point3[] {
  return Array.from({ length: segments + 1 }, (_, i) => {
    const angle = (i / segments) * Math.PI * 2;
    return [Math.cos(angle) * radius, y, Math.sin(angle) * radius];
  });
}

function GraduationCapOutline() {
  const groupRef = useRef<Group>(null);
  const tasselRef = useRef<Group>(null);

  const paths = useMemo(() => {
    const boardY = 0.55;
    const boardR = 1.05;
    const corner: Point3 = [
      Math.cos(Math.PI / 4) * boardR,
      boardY,
      Math.sin(Math.PI / 4) * boardR,
    ];

    const skull = boxSegments(1.05, 0.32, 1.05, 0.02);
    const boardTop = diamond(boardY + 0.04, boardR);
    const boardBottom = diamond(boardY - 0.02, boardR * 0.92);
    const button = circle(boardY + 0.07, 0.08, 14);
    const stem: Point3[] = [[0, 0.18, 0], [0, boardY - 0.05, 0]];

    const tasselCord: Point3[] = [
      corner,
      [corner[0], 0.12, corner[2]],
      [corner[0] + 0.06, -0.22, corner[2] + 0.06],
    ];

    const tasselHead = circle(-0.28, 0.1, 10).map(
      ([x, , z]) =>
        [x + corner[0] + 0.06, -0.28, z + corner[2] + 0.06] as Point3,
    );

    const tasselStrands: Point3[] = Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const cx = corner[0] + 0.06;
      const cz = corner[2] + 0.06;
      const start: Point3 = [
        cx + Math.cos(angle) * 0.06,
        -0.28,
        cz + Math.sin(angle) * 0.06,
      ];
      const end: Point3 = [
        cx + Math.cos(angle) * 0.09,
        -0.52,
        cz + Math.sin(angle) * 0.09,
      ];
      return [start, end];
    }).flat();

    const diploma: Point3[] = [
      [-0.55, -0.75, 0.12],
      [0.55, -0.75, 0.12],
      [0.55, -1.35, 0.12],
      [-0.55, -1.35, 0.12],
      [-0.55, -0.75, 0.12],
    ];

    const diplomaSeal = circle(0, 0.1, 10).map(
      ([x, , z]) => [x + 0.38, -1.05, z + 0.12] as Point3,
    );

    const ribbonLeft: Point3[] = [
      [0, -0.72, 0.14],
      [-0.22, -0.62, 0.16],
      [-0.38, -0.78, 0.16],
      [-0.2, -0.88, 0.14],
      [0, -0.72, 0.14],
    ];

    const ribbonRight: Point3[] = [
      [0, -0.72, 0.14],
      [0.22, -0.62, 0.16],
      [0.38, -0.78, 0.16],
      [0.2, -0.88, 0.14],
      [0, -0.72, 0.14],
    ];

    const scrollRoll: Point3[] = [
      [-0.62, -0.75, 0.14],
      [-0.68, -0.75, 0.2],
      [-0.68, -1.35, 0.2],
      [-0.62, -1.35, 0.14],
    ];

  const diplomaLines: Point3[] = [
      [-0.35, -0.95, 0.13],
      [0.35, -0.95, 0.13],
      [-0.35, -1.1, 0.13],
      [0.35, -1.1, 0.13],
    ];

    return {
      skull,
      boardTop,
      boardBottom,
      button,
      stem,
      tasselCord,
      tasselHead,
      tasselStrands,
      diploma,
      diplomaSeal,
      ribbonLeft,
      ribbonRight,
      scrollRoll,
      diplomaLines,
    };
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        0.45 + Math.sin(clock.elapsedTime * 0.4) * 0.3;
      groupRef.current.rotation.x = -0.1;
    }
    if (tasselRef.current) {
      tasselRef.current.rotation.z = Math.sin(clock.elapsedTime * 1.6) * 0.22;
    }
  });

  const primary = "#bae6fd";
  const depth = "#38bdf8";
  const accent = "#fbbf24";
  const ribbon = "#f87171";

  return (
    <group ref={groupRef} scale={1.05} position={[0, 0.35, 0]}>
      <Line points={toVectors(paths.skull)} color={primary} lineWidth={2.5} segments />
      <Line points={toVectors(paths.boardTop)} color={primary} lineWidth={3} />
      <Line points={toVectors(paths.boardBottom)} color={depth} lineWidth={1.6} transparent opacity={0.6} />
      <Line points={toVectors(paths.button)} color={depth} lineWidth={2} transparent opacity={0.85} />
      <Line points={toVectors(paths.stem)} color={depth} lineWidth={1.4} transparent opacity={0.5} />

      <group ref={tasselRef}>
        <Line points={toVectors(paths.tasselCord)} color={accent} lineWidth={2.2} />
        <Line points={toVectors(paths.tasselHead)} color={accent} lineWidth={2} />
        <Line
          points={toVectors(paths.tasselStrands)}
          color={accent}
          lineWidth={1.3}
          transparent
          opacity={0.85}
          segments
        />
      </group>

      <Line points={toVectors(paths.diploma)} color={primary} lineWidth={2.2} />
      <Line points={toVectors(paths.scrollRoll)} color={depth} lineWidth={1.5} transparent opacity={0.55} />
      <Line points={toVectors(paths.diplomaLines)} color={depth} lineWidth={1} transparent opacity={0.4} segments />
      <Line points={toVectors(paths.diplomaSeal)} color={accent} lineWidth={1.6} transparent opacity={0.7} />

      <Line points={toVectors(paths.ribbonLeft)} color={ribbon} lineWidth={1.8} />
      <Line points={toVectors(paths.ribbonRight)} color={ribbon} lineWidth={1.8} />
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 4]} intensity={0.6} />
      <pointLight position={[-3, 2, -2]} intensity={0.45} color="#3b82f6" />
      <pointLight position={[3, 0, 3]} intensity={0.35} color="#06b6d4" />
      <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.45}>
        <GraduationCapOutline />
      </Float>
    </>
  );
}

export function GraduationCapScene() {
  return (
    <div className="h-full w-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.1, 4.8], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
