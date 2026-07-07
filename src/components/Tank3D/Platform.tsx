"use client";

export default function Platform() {
  return (
    <group position={[0, -1.42, 0]}>
      {/* Concrete Base */}
      <mesh receiveShadow>
        <boxGeometry args={[8.8, 0.16, 2.4]} />
        <meshStandardMaterial color="#c7ccd2" />
      </mesh>

      {/* Dark Top Strip */}
      <mesh position={[0, 0.085, 0]}>
        <boxGeometry args={[8.7, 0.02, 2.3]} />
        <meshStandardMaterial color="#9ca3af" />
      </mesh>

      {/* Left Edge */}
      <mesh position={[-4.25, -0.08, 0]}>
        <boxGeometry args={[0.08, 0.12, 2.4]} />
        <meshStandardMaterial color="#8b949e" />
      </mesh>

      {/* Right Edge */}
      <mesh position={[4.25, -0.08, 0]}>
        <boxGeometry args={[0.08, 0.12, 2.4]} />
        <meshStandardMaterial color="#8b949e" />
      </mesh>
    </group>
  );
}