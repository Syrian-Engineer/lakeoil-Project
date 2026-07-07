"use client";

import TankGLB from "@/components/Tank3D/TankGLB";
import { Canvas } from "@react-three/fiber";

export default function TestPage() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={3} />

        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="red" />
          <TankGLB />
        </mesh>
      </Canvas>
    </div>
  );
}