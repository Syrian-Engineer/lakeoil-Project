"use client";

import { useFBX } from "@react-three/drei";
import { clone } from "lodash";
import { useEffect, useMemo } from "react";

export default function TankFBX() {
  // Load the original FBX
  const original = useFBX("/models/tank.fbx");

  // Clone it so every TankFBX instance has its own copy
  const model = useMemo(() => clone(original), [original]);

  useEffect(() => {
    model.traverse((child: any) => {
      if (!child.isMesh) return;

      console.log(
        child.name,
        child.material,
        Array.isArray(child.material)
      );

      // Clone materials safely
      if (Array.isArray(child.material)) {
        child.material = child.material.map((mat: any) =>
          mat?.clone ? mat.clone() : mat
        );
      } else if (child.material?.clone) {
        child.material = child.material.clone();
      }

      // Optional settings
      child.castShadow = true;
      child.receiveShadow = true;

      // Example:
      // child.material.color.set("#4CAF50");
    });
  }, [model]);

  return (
    <primitive
      object={model.children[0]}
      scale={0.01}
      rotation={[0, Math.PI / 2, 0]}
    />
  );
}