"use client";

import { useMemo } from "react";

interface Props {
  level: number;
  product: string;
}

const RADIUS = 0.8;
const LENGTH = 5.4;

export default function Fuel({
  level,
  product,
}: Props) {
  const fill = Math.max(0, Math.min(level, 1));

  const color = useMemo(() => {
    const p = product.toLowerCase();

    if (p.includes("diesel")) return "#f4d64e";
    if (p.includes("95")) return "#3b82f6";
    if (p.includes("98")) return "#22c55e";

    return "#60a5fa";
  }, [product]);

  // Height of liquid inside the cylinder
  const liquidHeight = RADIUS * 2 * fill;

  if (liquidHeight <= 0.002) return null;

  return (
    <group position={[0, -RADIUS + liquidHeight / 2, 0]}>
      {/* Main liquid */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry
          args={[
            RADIUS * 0.93,
            RADIUS * 0.93,
            LENGTH - 0.12,
            96,
          ]}
        />

        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.78}
          roughness={0}
          metalness={0}
          transmission={0.25}
          clearcoat={1}
        />
      </mesh>

      {/* Flat liquid surface */}
      <mesh
        position={[0, liquidHeight / 2, 0]}
      >
        <boxGeometry
          args={[
            LENGTH - 0.15,
            0.02,
            RADIUS * 1.84,
          ]}
        />

        <meshStandardMaterial
          color="white"
          transparent
          opacity={0.22}
        />
      </mesh>
    </group>
  );
}