import * as THREE from "three";

export const palette = {
  navy: "#0a1a33",
  navyLight: "#132c50",
  gold: "#eed202",
  marble: "#e8e4df",
  marbleDark: "#cfc9c2",
  wood: "#5c3d2e",
  woodDark: "#3d2819",
  brass: "#c9a227",
  white: "#f8fafc",
  concrete: "#9ca3af",
  glass: "#93c5fd",
};

export const marbleFloor = new THREE.MeshStandardMaterial({
  color: palette.marble,
  roughness: 0.35,
  metalness: 0.05,
});

export const wallPlaster = new THREE.MeshStandardMaterial({
  color: "#f1f0ec",
  roughness: 0.92,
  metalness: 0,
});

export const wallAccent = new THREE.MeshStandardMaterial({
  color: palette.navyLight,
  roughness: 0.75,
  metalness: 0.08,
});

export const woodDoor = new THREE.MeshStandardMaterial({
  color: palette.wood,
  roughness: 0.65,
  metalness: 0.05,
});

export const brassTrim = new THREE.MeshStandardMaterial({
  color: palette.brass,
  roughness: 0.28,
  metalness: 0.85,
});

export const concreteFacade = new THREE.MeshStandardMaterial({
  color: "#d4d0cb",
  roughness: 0.88,
  metalness: 0.02,
});

export const windowGlass = new THREE.MeshPhysicalMaterial({
  color: palette.glass,
  roughness: 0.05,
  metalness: 0.1,
  transmission: 0.55,
  thickness: 0.2,
  transparent: true,
  opacity: 0.75,
});
