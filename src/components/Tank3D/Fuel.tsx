"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  tankGroup: THREE.Group | null;
  fill: number; // 0 -> 1
}

export default function TankFuel({
  tankGroup,
  fill,
}: Props) {
  // One clipping plane reused forever
  const clipPlane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
    []
  );

  // Smooth animation value
  const currentFill = useRef(fill);

  // Clone the tank only once
  const fuel = useMemo(() => {
    if (!tankGroup) return null;

    const clone = tankGroup.clone(true);

    clone.traverse((child: any) => {
      if (!child.isMesh) return;

      // Hide everything except the tank shell
      if (child.name !== "Cylinder.006") {
        child.visible = false;
        return;
      }

    child.material = new THREE.MeshPhysicalMaterial({
      color: "#0a86c7",
      transparent: true,
      opacity: 0.82,

      transmission: 0.98,

      roughness: 0.02,
      metalness: 0,

      clearcoat: 1,
      clearcoatRoughness: 0,

      ior: 1.33,

      thickness: 2,

      reflectivity: 1,

      envMapIntensity: 1.5,

      side: THREE.DoubleSide,

      clippingPlanes: [clipPlane],

      clipShadows: true,
    });
    });

    return clone;
  }, [tankGroup, clipPlane]);

  // Animate the fuel level smoothly
  useFrame(() => {
    if (!fuel) return;

    currentFill.current = THREE.MathUtils.lerp(
      currentFill.current,
      fill,
      0.05
    );

    fuel.traverse((child: any) => {
      if (!child.isMesh) return;
      if (child.name !== "Cylinder.006") return;

      child.geometry.computeBoundingBox();

      const box = child.geometry.boundingBox!;

      const level = THREE.MathUtils.lerp(
        box.min.y,
        box.max.y,
        currentFill.current
      );
      
      clipPlane.constant = level;
    });
  });

  if (!fuel) return null;

  return <primitive object={fuel} />;
}