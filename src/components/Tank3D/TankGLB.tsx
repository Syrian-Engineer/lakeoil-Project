// "use client";

// import { useLoader } from "@react-three/fiber";
// import { OBJLoader } from "three-stdlib";
// import { useEffect } from "react";
// import * as THREE from "three";

// interface Props {
//   onTankReady?: (group: THREE.Group) => void;
// }

// export default function TankGLB({ onTankReady }: Props) {
//   const model = useLoader(OBJLoader, "/models/tank.obj");

//   useEffect(() => {
//     model.traverse((child) => {
//       if (!(child instanceof THREE.Mesh)) return;

//       child.castShadow = true;
//       child.receiveShadow = true;

//       // Clone materials so each tank has its own copy
//       if (Array.isArray(child.material)) {
//         child.material = child.material.map((mat) => {
//           const material = mat.clone();

//           material.transparent = true;
//           material.opacity = 0.45;

//           if ("roughness" in material) {
//             (material as THREE.MeshStandardMaterial).roughness = 0.2;
//           }

//           if ("metalness" in material) {
//             (material as THREE.MeshStandardMaterial).metalness = 0.5;
//           }

//           return material;
//         });
//       } else {
//         const material = child.material.clone();

//         material.transparent = true;
//         material.opacity = 0.60;

//         if ("roughness" in material) {
//           (material as THREE.MeshStandardMaterial).roughness = 0.2;
//         }

//         if ("metalness" in material) {
//           (material as THREE.MeshStandardMaterial).metalness = 0.5;
//         }

//         child.material = material;
//       }

//       // Send the tank group to the fuel component
//       if (child.name === "Cylinder.006") {
//         onTankReady?.(child.parent as THREE.Group);
//       }
//     });
//   }, [model, onTankReady]);

//   return (
//     <primitive
//       object={model}
//       scale={1}
//       rotation={[0, Math.PI / 2, 0]}
//     />
//   );
// }


"use client";

import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three-stdlib";
import { useEffect } from "react";
import * as THREE from "three";

export interface TankBodyData {
  group: THREE.Group;
  center: THREE.Vector3;
  size: THREE.Vector3;
}

interface Props {
  onTankReady?: (mesh: THREE.Mesh) => void;
}

export default function TankGLB({
  onTankReady,
}: Props) {
  const model = useLoader(
    OBJLoader,
    "/models/tank.obj"
  );

  useEffect(() => {
    model.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      child.castShadow = true;
      child.receiveShadow = true;

      if (Array.isArray(child.material)) {
        child.material = child.material.map((mat) => {
          const material = mat.clone();

          material.transparent = true;
          material.opacity = 0.60;

          if ("roughness" in material) {
            (material as THREE.MeshStandardMaterial).roughness = 0.2;
          }

          if ("metalness" in material) {
            (material as THREE.MeshStandardMaterial).metalness = 0.5;
          }

          return material;
        });
      } else {
        const material = child.material.clone();

        material.transparent = true;
        material.opacity = 0.60;

        if ("roughness" in material) {
          (material as THREE.MeshStandardMaterial).roughness = 0.2;
        }

        if ("metalness" in material) {
          (material as THREE.MeshStandardMaterial).metalness = 0.5;
        }

        child.material = material;
      }

      if (child.name === "Cylinder.006") {
        const box = new THREE.Box3().setFromObject(child);

        const center = new THREE.Vector3();
        const size = new THREE.Vector3();

        box.getCenter(center);
        box.getSize(size);

        onTankReady?.(child);
      }
    });
  }, [model, onTankReady]);

  return (
    <primitive
      object={model}
      scale={1}
      rotation={[0, Math.PI / 2, 0]}
    />
  );
}