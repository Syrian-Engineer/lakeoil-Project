"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Center,
} from "@react-three/drei";

import TankGLB from "./TankGLB";
import { useEffect } from "react";

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

  useEffect(() => {
    console.log("Canvas Mounted");

    return () => {
      console.log("Canvas Unmounted");
    };
  }, []);
  
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
    >
      <ambientLight intensity={2} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={2}
      />

      <Center>
        <TankGLB
            // fuelVolume={fuelVolume}
            // capacity={capacity}
            // product={product}
          />      
      </Center>

      <OrbitControls
          enablePan
          enableZoom
          enableRotate
      />
    </Canvas>
  );
}


 
