"use client";

import { useMemo } from "react";
import * as THREE from "three";

interface Props {
  tankGroup: THREE.Group | null;
  fill: number; // 0 -> 1
}

export default function TankFuel({
  tankGroup,
  fill,
}: Props) {
  const fuel = useMemo(() => {
    if (!tankGroup) return null;

    const clone = tankGroup.clone(true);

    clone.traverse((child: any) => {
      if (!child.isMesh) return;

      // Hide everything except the tank body
      if (child.name !== "Cylinder.006") {
        child.visible = false;
        return;
      }

      child.geometry.computeBoundingBox();

      const box = child.geometry.boundingBox!;

      const minY = box.min.y;
      const maxY = box.max.y;

      const level = THREE.MathUtils.lerp(minY, maxY, fill);

      const clipPlane = new THREE.Plane(
        new THREE.Vector3(0, -1, 0),
        level
      );

      child.material = new THREE.MeshPhysicalMaterial({
        color: "#25bdf5",
        transparent: true,
        opacity: 0.75,
        transmission: 0.7,
        roughness: 0.08,
        metalness: 0,
        side: THREE.DoubleSide,
        clippingPlanes: [clipPlane],
        clipShadows: true,
      });
    });

    return clone;
  }, [tankGroup, fill]);

  if (!fuel) return null;

  return <primitive object={fuel} />;
}