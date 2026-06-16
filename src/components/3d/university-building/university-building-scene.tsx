"use client";

import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type { MutableRefObject } from "react";
import { useMemo, useRef } from "react";
import type { Group } from "three";
import { Vector3 } from "three";
import type { Announcement, Faculty } from "@/types/content";
import { brassTrim, marbleFloor, wallAccent, wallPlaster, woodDoor } from "@/components/3d/campus/materials";

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function formatDoorLabel(f: Faculty) {
  return `${f.shortName} · ${f.name.replace("Facultatea de ", "")}`;
}

function DoorPoster({
  progressRef,
  faculty,
  position,
  side,
}: {
  progressRef: MutableRefObject<number>;
  faculty: Faculty;
  position: [number, number, number];
  side: "left" | "right";
}) {
  const xOffset = side === "left" ? -0.06 : 0.06;
  const cardRef = useRef<HTMLDivElement>(null);

  useFrame(() => {
    const p = progressRef.current;
    const t = smoothstep(0.58, 0.78, p);
    if (!cardRef.current) return;
    cardRef.current.style.opacity = String(t);
    cardRef.current.style.transform = `translateY(${(1 - t) * 8}px)`;
  });

  return (
    <Html
      position={[position[0] + xOffset, position[1] + 1.1, position[2] - (side === "left" ? 0.02 : -0.02)]}
      transform
      distanceFactor={8}
      style={{ pointerEvents: "none" }}
      center
    >
      <div
        ref={cardRef}
        className="w-[210px] rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
        style={{ opacity: 0, transform: "translateY(8px)" }}
      >
        <div className="flex items-center gap-3">
          <div className="text-3xl leading-none">{faculty.icon}</div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-white/90">{faculty.shortName}</div>
            <div className="truncate text-xs font-medium text-white/70">{formatDoorLabel(faculty)}</div>
          </div>
        </div>
        <div className="mt-3 h-px bg-white/10" />
        <div className="mt-3 text-xs text-white/75">
          {faculty.students.toLocaleString("ro-RO")} studenți · {faculty.programs} programe
        </div>
      </div>
    </Html>
  );
}

function PegBoard({
  progressRef,
  announcements,
}: {
  progressRef: MutableRefObject<number>;
  announcements: Announcement[];
}) {
  const cards = announcements.slice(0, 5);

  return (
    <>
      {/* Board */}
      <mesh position={[3.2, 1.6, -8.4]} rotation={[0, 0, 0]}>
        <boxGeometry args={[1.9, 2.9, 0.08]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.15} roughness={0.8} />
      </mesh>

      {/* Announcement cards */}
      {cards.map((a, idx) => {
        const row = Math.floor(idx / 2);
        const col = idx % 2;
        const x = 2.85 + col * 0.8;
        const y = 2.75 - row * 0.85;
        const z = -8.39;

        return (
          <Html
            key={a.id}
            position={[x, y, z]}
            transform
            distanceFactor={7}
            style={{ pointerEvents: "none" }}
            center
          >
            <AnnouncementCard progressRef={progressRef} announcement={a} initialOffset={10} />
          </Html>
        );
      })}
    </>
  );
}

function AnnouncementCard({
  progressRef,
  announcement,
  initialOffset,
}: {
  progressRef: MutableRefObject<number>;
  announcement: Announcement;
  initialOffset: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useFrame(() => {
    const t = smoothstep(0.78, 0.95, progressRef.current);
    if (!cardRef.current) return;
    cardRef.current.style.opacity = String(t);
    cardRef.current.style.transform = `translateY(${(1 - t) * initialOffset}px)`;
  });

  return (
    <div
      ref={cardRef}
      className="w-[190px] rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur-sm"
      style={{
        boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
        opacity: 0,
        transform: `translateY(${initialOffset}px)`,
      }}
    >
      <div className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
        Anunț · {announcement.date}
      </div>
      <div className="mt-1 line-clamp-2 text-sm font-semibold text-white/90">
        {announcement.title}
      </div>
      <div className="mt-2 text-xs text-white/70 line-clamp-2">
        {announcement.excerpt}
      </div>
    </div>
  );
}

export function UniversityBuildingScene({
  progressRef,
  doors,
  announcements,
}: {
  progressRef: MutableRefObject<number>;
  doors: Faculty[];
  announcements: Announcement[];
}) {
  const facadeTarget = useMemo(() => new Vector3(0, 1.65, 2.0), []);
  const insideTarget = useMemo(() => new Vector3(0, 1.25, -5.0), []);
  const plazaTarget = useMemo(() => new Vector3(0, 1.4, 1.1), []);
  const camPos = useMemo(() => new Vector3(), []);

  const cameraWorkRef = useRef<Group>(null);

  useFrame((state) => {
    const p = progressRef.current;
    const approachT = smoothstep(0.02, 0.34, p);
    const enterT = smoothstep(0.26, 0.68, p);
    const doorT = smoothstep(0.60, 0.9, p);

    // Long cinematic move: campus plaza -> main entrance -> hallway.
    const outsideZ = 18 - 9 * approachT;
    const insideZ = 9 - 18 * enterT;
    const z = enterT < 0.01 ? outsideZ : insideZ;
    const y = 4.2 - 1.3 * approachT - 1.5 * enterT;
    const x = Math.sin(state.clock.elapsedTime * 0.2) * 0.02 * (1 - enterT);

    camPos.set(x, y, z);
    state.camera.position.lerp(camPos, 0.12);
    const targetFov = 44 - 8 * approachT - 9 * enterT;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cam: any = state.camera;
    if (cam && typeof cam.updateProjectionMatrix === "function") {
      cam.fov = targetFov;
      cam.updateProjectionMatrix();
    }
    state.camera.lookAt(enterT < 0.1 ? plazaTarget : enterT < 0.52 ? facadeTarget : insideTarget);

    // Subtle room parallax.
    if (cameraWorkRef.current) {
      cameraWorkRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.015 * (0.7 * (1 - enterT) + 0.3 * doorT);
    }
  });

  const doorPositions = useMemo(() => {
    // hallway coordinates (z from -2..-8)
    const zVals = [-2.6, -4.2, -6.0, -7.7];
    const left = zVals.map((z, i) => ({ z, x: -3.35, side: "left" as const, idx: i }));
    const right = zVals.map((z, i) => ({ z, x: 3.35, side: "right" as const, idx: i }));
    // Use 4 doors total: left/right alternating for a cleaner view.
    return [left[0], right[1], left[2], right[3]].map((d) => ({
      x: d.x,
      y: 0,
      z: d.z,
      side: d.side,
    }));
  }, []);

  return (
    <group ref={cameraWorkRef}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[6, 8, 9]} intensity={1.2} color="#f8fafc" />
      <directionalLight position={[-6, 4, -2]} intensity={0.45} color="#93c5fd" />
      <pointLight position={[0, 3.4, -3]} intensity={1.1} color="#fef3c7" distance={28} />
      <pointLight position={[0, 3.2, -8]} intensity={0.85} color="#dbeafe" distance={18} />

      {/* Campus ground / plaza */}
      <mesh position={[0, -0.02, 5]}>
        <boxGeometry args={[34, 0.08, 34]} />
        <meshStandardMaterial color="#bfc6d1" roughness={0.95} metalness={0.02} />
      </mesh>
      <mesh position={[0, 0.02, 3.5]}>
        <boxGeometry args={[16, 0.02, 10]} />
        <meshStandardMaterial color="#d7dde7" roughness={0.88} metalness={0.03} />
      </mesh>

      {/* Exterior facade */}
      <mesh position={[0, 2.45, 2.1]} material={wallPlaster}>
        <boxGeometry args={[13.8, 5.1, 0.65]} />
      </mesh>
      <mesh position={[0, 4.9, 2.05]}>
        <boxGeometry args={[14.4, 0.28, 0.9]} />
        <meshStandardMaterial color="#e7e5e0" roughness={0.65} metalness={0.03} />
      </mesh>
      {/* Side wings */}
      <mesh position={[-7.8, 2.0, 1.85]}>
        <boxGeometry args={[3.2, 4.2, 2.6]} />
        <meshStandardMaterial color="#d8d5cf" roughness={0.85} metalness={0.02} />
      </mesh>
      <mesh position={[7.8, 2.0, 1.85]}>
        <boxGeometry args={[3.2, 4.2, 2.6]} />
        <meshStandardMaterial color="#d8d5cf" roughness={0.85} metalness={0.02} />
      </mesh>

      {/* Columns */}
      {[-5, -2.5, 0, 2.5, 5].map((x) => (
        <mesh key={x} position={[x, 2.1, 2.28]} material={wallAccent}>
          <boxGeometry args={[0.45, 4.1, 0.42]} />
        </mesh>
      ))}

      {/* Windows */}
      {[-5.5, -3.7, -1.9, 0, 1.9, 3.7, 5.5].map((x) => (
        <mesh key={`w-${x}`} position={[x, 2.8, 2.46]}>
          <boxGeometry args={[1.2, 1.4, 0.06]} />
          <meshPhysicalMaterial color="#9ed3ff" roughness={0.04} metalness={0.1} transmission={0.62} transparent opacity={0.8} />
        </mesh>
      ))}

      {/* Main entrance + stairs */}
      <mesh position={[0, 1.45, 2.45]}>
        <boxGeometry args={[3.2, 2.8, 0.08]} />
        <meshPhysicalMaterial color="#bde2ff" roughness={0.06} metalness={0.12} transmission={0.72} transparent opacity={0.84} />
      </mesh>
      <mesh position={[0, 0.58, 2.9]}>
        <boxGeometry args={[5.4, 0.22, 2.8]} />
        <meshStandardMaterial color="#d7dadf" roughness={0.75} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.36, 3.35]}>
        <boxGeometry args={[6.6, 0.22, 3.2]} />
        <meshStandardMaterial color="#ced4dc" roughness={0.78} metalness={0.04} />
      </mesh>
      <mesh position={[0, 0.14, 3.95]}>
        <boxGeometry args={[8, 0.22, 3.8]} />
        <meshStandardMaterial color="#c5ccd6" roughness={0.8} metalness={0.03} />
      </mesh>

      {/* Floor */}
      <mesh position={[0, 0.02, -4.5]} material={marbleFloor}>
        <boxGeometry args={[9.6, 0.06, 14.8]} />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 1.9, -4.5]} material={wallPlaster}>
        <boxGeometry args={[0.18, 4.2, 14.8]} />
      </mesh>

      <mesh position={[-4.86, 1.9, -4.5]} material={wallAccent}>
        <boxGeometry args={[0.22, 4.2, 14.8]} />
      </mesh>

      <mesh position={[4.86, 1.9, -4.5]} material={wallAccent}>
        <boxGeometry args={[0.22, 4.2, 14.8]} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 3.95, -4.5]}>
        <boxGeometry args={[9.6, 0.06, 14.8]} />
        <meshStandardMaterial color="#f5f4f1" roughness={0.9} metalness={0.02} />
      </mesh>

      {/* Hallway light strips */}
      {[-1.6, -4.2, -6.7, -9.0].map((z) => (
        <mesh key={`strip-${z}`} position={[0, 3.82, z]}>
          <boxGeometry args={[3.8, 0.04, 0.22]} />
          <meshStandardMaterial color="#e2f1ff" emissive="#dbeafe" emissiveIntensity={0.6} roughness={0.8} metalness={0} />
        </mesh>
      ))}

      {/* Doors (wood + brass trim) */}
      {doorPositions.slice(0, 4).map((d, idx) => {
        const faculty = doors[idx % doors.length];
        const frameW = 1.18;
        const frameH = 2.55;
        const depth = 0.12;

        return (
          <group key={idx} position={[d.x, 1.25, d.z]}>
            {/* Frame */}
            <mesh material={brassTrim}>
              <boxGeometry args={[frameW, frameH, depth]} />
            </mesh>
            {/* Door */}
            <mesh position={[0, 0, 0.03]} material={woodDoor}>
              <boxGeometry args={[1.02, 2.35, 0.06]} />
            </mesh>
            {/* Poster */}
            <DoorPoster
              progressRef={progressRef}
              faculty={faculty}
              position={[d.x, 0, d.z]}
              side={d.side}
            />
          </group>
        );
      })}

      {/* Pegboard */}
      <PegBoard progressRef={progressRef} announcements={announcements} />

      {/* Lighting accents */}
      <mesh position={[0, 3.6, -4.5]}>
        <planeGeometry args={[9.4, 0.06]} />
        <meshStandardMaterial color="#93c5fd" emissive="#93c5fd" emissiveIntensity={0.18} roughness={1} metalness={0} />
      </mesh>
    </group>
  );
}

