"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, type RefObject } from "react";
import {
  CanvasTexture,
  LinearFilter,
  SRGBColorSpace,
  type Texture,
  type Group,
  type MeshBasicMaterial,
} from "three";

const LOGO_SRC = "/images/logo_alb.svg";
const COIN_RADIUS = 1.45;
const COIN_THICKNESS = 0.14;
const SPIN_SPEED = 0.35;
const TEXTURE_SIZE = 1024;

function loadLogoTexture(): Promise<Texture> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = TEXTURE_SIZE;
    canvas.height = TEXTURE_SIZE;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Canvas 2D context unavailable"));
      return;
    }

    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = "#132c50";
      ctx.beginPath();
      ctx.arc(TEXTURE_SIZE / 2, TEXTURE_SIZE / 2, TEXTURE_SIZE / 2, 0, Math.PI * 2);
      ctx.fill();

      const inset = TEXTURE_SIZE * 0.06;
      ctx.drawImage(
        img,
        inset,
        inset,
        TEXTURE_SIZE - inset * 2,
        TEXTURE_SIZE - inset * 2,
      );

      const tex = new CanvasTexture(canvas);
      tex.colorSpace = SRGBColorSpace;
      tex.minFilter = LinearFilter;
      tex.magFilter = LinearFilter;
      tex.generateMipmaps = false;
      tex.needsUpdate = true;
      resolve(tex);
    };

    img.onerror = () => reject(new Error("Failed to load logo texture"));
    img.src = LOGO_SRC;
  });
}

function LogoFace({
  z,
  flip = false,
  materialRef,
}: {
  z: number;
  flip?: boolean;
  materialRef: RefObject<MeshBasicMaterial | null>;
}) {
  return (
    <mesh position={[0, 0, z]} rotation={flip ? [0, Math.PI, 0] : [0, 0, 0]}>
      <circleGeometry args={[COIN_RADIUS * 0.88, 64]} />
      <meshBasicMaterial ref={materialRef} toneMapped={false} color="#ffffff" />
    </mesh>
  );
}

function SpinningLogoCoin() {
  const groupRef = useRef<Group>(null);
  const frontMaterialRef = useRef<MeshBasicMaterial>(null);
  const backMaterialRef = useRef<MeshBasicMaterial>(null);

  useEffect(() => {
    let disposed = false;
    let texture: Texture | null = null;

    loadLogoTexture()
      .then((loaded) => {
        if (disposed) {
          loaded.dispose();
          return;
        }

        texture = loaded;

        if (frontMaterialRef.current) {
          frontMaterialRef.current.map = loaded;
          frontMaterialRef.current.needsUpdate = true;
        }

        if (backMaterialRef.current) {
          backMaterialRef.current.map = loaded;
          backMaterialRef.current.needsUpdate = true;
        }
      })
      .catch(() => {});

    return () => {
      disposed = true;
      texture?.dispose();
    };
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * SPIN_SPEED;
    }
  });

  const half = COIN_THICKNESS / 2;

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[COIN_RADIUS, COIN_RADIUS, COIN_THICKNESS, 96]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.75}
          roughness={0.28}
        />
      </mesh>

      <LogoFace materialRef={frontMaterialRef} z={half + 0.004} />
      <LogoFace materialRef={backMaterialRef} z={-half - 0.004} flip />
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 3, 6]} intensity={1} />
      <directionalLight position={[-3, 1, 4]} intensity={0.4} color="#93c5fd" />
      <SpinningLogoCoin />
    </>
  );
}

export function GraduationCapScene() {
  return (
    <div className="h-full w-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 36 }}
        dpr={[1, 2]}
        frameloop="always"
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
