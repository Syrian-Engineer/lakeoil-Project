"use client";

import { MeshPhysicalMaterial } from "three";

const steel = new MeshPhysicalMaterial({
  color: "#8e959d",
  metalness: 1,
  roughness: 0.18,
  clearcoat: 1,
});

const base = new MeshPhysicalMaterial({
  color: "#50565c",
  metalness: 0.9,
  roughness: 0.35,
});

const radius = 0.8;

function Saddle({ x }: { x: number }) {
  return (
    <group position={[x, -0.82, 0]}>

      {/* Vertical Plate */}
      <mesh position={[0, -0.22, 0]}>
        <boxGeometry args={[0.16, 0.48, 1.05]} />
        <primitive object={steel} />
      </mesh>

      {/* Curved Saddle */}
      <mesh position={[0, 0.22, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry
          args={[
            radius,
            0.08,
            24,
            80,
            Math.PI,
          ]}
        />
        <primitive object={steel} />
      </mesh>

      {/* Base Foot */}
      <mesh position={[0, -0.50, 0]}>
        <boxGeometry args={[0.55, 0.08, 1.15]} />
        <primitive object={base} />
      </mesh>
    </group>
  );
}

export default function TankStand() {
  return (
    <group>

      <Saddle x={-1.35} />

      <Saddle x={1.35} />

      {/* Bottom Beam */}
      <mesh position={[0, -1.33, 0]}>
        <boxGeometry args={[3.3, 0.12, 0.22]} />
        <primitive object={base} />
      </mesh>

    </group>
  );
}