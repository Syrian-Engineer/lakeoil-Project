"use client";

import { GlassMaterial } from "./materials";

export default function Glass() {
  return (
    <mesh
      position={[2.16, 0, 0]}
      rotation={[0, Math.PI / 2, 0]}
    >
      <circleGeometry args={[0.78, 64]} />
      <primitive object={GlassMaterial} />
    </mesh>
  );
}