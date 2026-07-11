"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface Props {
  fill: number;
  radius?: number;
  minY?: number;
  maxY?: number;
}

export default function TankSurface({
  fill,
  radius = 1.15,
  minY = -0.72,
  maxY = 0.72,
}: Props) {
  const mesh = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.CircleGeometry(radius, 128);

    geo.rotateX(-Math.PI / 2);

    return geo;
  }, [radius]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;

    const t = clock.elapsedTime;

    mesh.current.position.y = THREE.MathUtils.lerp(
      minY,
      maxY,
      fill
    );

    mesh.current.rotation.x =
      Math.sin(t * 0.7) * 0.015;

    mesh.current.rotation.z =
      Math.cos(t * 0.5) * 0.015;

      
  });

  return (
    <mesh ref={mesh} geometry={geometry}>
      <meshPhysicalMaterial
        color="#3bbcff"
        transparent
        opacity={0.92}
        transmission={0.95}
        roughness={0}
        metalness={0}
        clearcoat={1}
        reflectivity={1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}