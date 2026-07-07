"use client";

import { useRef } from "react";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";

export default function FloatingGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const t = clock.getElapsedTime();

    ref.current.position.y = Math.sin(t) * 0.03;

    ref.current.rotation.y =
      -0.38 + Math.sin(t * 0.5) * 0.05;
  });

  return <group ref={ref}>{children}</group>;
}