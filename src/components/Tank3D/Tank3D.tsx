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
// import { EffectComposer, Bloom } from "@react-three/postprocessing";

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
      <ambientLight intensity={0.8} />

      <hemisphereLight
          // skyColor="#ffffff"
          // groundColor="#888888"
          intensity={1.2}
      />

      <directionalLight
          position={[6,8,4]}
          intensity={2.5}
          castShadow
      />

      <pointLight
          position={[-4,2,4]}
          intensity={2}
      />

      <pointLight
          position={[4,2,-4]}
          intensity={1.5}
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


 
