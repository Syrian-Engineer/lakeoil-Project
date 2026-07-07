import * as THREE from "three";

export const SteelMaterial = new THREE.MeshPhysicalMaterial({
  color: "#cfd5db",
  metalness: 1,
  roughness: 0.18,
  clearcoat: 1,
  clearcoatRoughness: 0,
  reflectivity: 1,
});

export const DarkSteelMaterial = new THREE.MeshPhysicalMaterial({
  color: "#6c757d",
  metalness: 1,
  roughness: 0.3,
  clearcoat: 1,
});

export const GlassMaterial = new THREE.MeshPhysicalMaterial({
  color: "#f8fcff",
  transparent: true,
  opacity: 0.22,
  transmission: 1,
  thickness: 0.12,
  roughness: 0,
  clearcoat: 1,
  ior: 1.5,
});