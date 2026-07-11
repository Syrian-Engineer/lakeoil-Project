"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Center,
} from "@react-three/drei";

import TankGLB from "./TankGLB";
import { useEffect, useState } from "react";
import TankFuel from "./Fuel";
import * as THREE from "three";
import TankSurface from "./TankSurface";


interface Props {
  fuelVolume: number;
  capacity: number;
  product: string;
}

export default function Tank3D({
  fuelVolume,
  capacity,
  product,
}: Props) {

const [tankGroup, setTankGroup] = useState<THREE.Group | null>(null);

  
  return (
    <Canvas
      style={{
        width: "100%",
        height: "100%",
        background: "#eceff3",
      }}
      camera={{
        position: [0, 1.5, 4],
        fov: 45,
        near: 0.01,
        far: 100,
      }}
      gl={{
        localClippingEnabled: true,
      }}
    >
        <ambientLight intensity={0.4} />

        <directionalLight
            position={[8,8,6]}
            intensity={2.5}
            castShadow
        />

        <directionalLight
            position={[-5,2,-5]}
            intensity={0.7}
        />

        <hemisphereLight
            intensity={0.8}
            groundColor="#444"
        />

    <Center>
      <group>

        <TankFuel
            tankGroup={tankGroup}
            fill={fuelVolume / capacity}
        />
      <TankSurface
        fill={fuelVolume / capacity}
    />
        <TankGLB
            onTankReady={setTankGroup}
        />

      </group>
    </Center>

      <OrbitControls
          enablePan
          enableZoom
          enableRotate
      />
    </Canvas>
  );
}


 
