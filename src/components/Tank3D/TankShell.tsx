"use client";

import { MeshPhysicalMaterial, DoubleSide } from "three";

const outerGlass = new MeshPhysicalMaterial({
  color: "#ffffff",

  transparent: true,
  opacity: 0.025,

  transmission: 1,

  thickness: 0.04,

  roughness: 0,

  metalness: 0,

  clearcoat: 1,
  clearcoatRoughness: 0,

  ior: 1.52,

  reflectivity: 1,

  envMapIntensity: 3,

  depthWrite: false,

  side: DoubleSide,
});

const innerGlass = new MeshPhysicalMaterial({
  color: "#ffffff",

  transparent: true,
  opacity: 0.01,

  transmission: 1,

  thickness: 0.02,

  roughness: 0,

  metalness: 0,

  clearcoat: 1,

  ior: 1.52,

  reflectivity: 1,

  envMapIntensity: 2,

  depthWrite: false,

  side: DoubleSide,
});

const steel = new MeshPhysicalMaterial({
  color: "#8b9197",
  metalness: 1,
  roughness: 0.12,
  clearcoat: 1,
});

const darkSteel = new MeshPhysicalMaterial({
  color: "#555b63",
  metalness: 1,
  roughness: 0.2,
});

const radius = 0.8;
const innerRadius = 0.76;

const length = 5.4;
const innerLength = 5.28;

export default function TankShell() {
  return (
    <group>

      {/* ================= OUTER GLASS ================= */}

      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[radius, radius, length, 128]} />
        <primitive object={outerGlass} />
      </mesh>

      {/* ================= INNER GLASS ================= */}

      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry
          args={[innerRadius, innerRadius, innerLength, 128]}
        />
        <primitive object={innerGlass} />
      </mesh>


{/* ================= LEFT HEMISPHERE ================= */}

        <mesh
        position={[-length / 2, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        >
        <sphereGeometry
            args={[
            radius,
            96,
            96,
            Math.PI / 2,
            Math.PI,
            ]}
        />
        <primitive object={outerGlass} />
        </mesh>

        <mesh
        position={[-innerLength / 2, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        >
        <sphereGeometry
            args={[
            innerRadius,
            96,
            96,
            Math.PI / 2,
            Math.PI,
            ]}
        />
        <primitive object={innerGlass} />
        </mesh>

        {/* ================= RIGHT HEMISPHERE ================= */}

        <mesh
        position={[length / 2, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        >
        <sphereGeometry
            args={[
            radius,
            96,
            96,
            Math.PI / 2,
            Math.PI,
            ]}
        />
        <primitive object={outerGlass} />
        </mesh>

        <mesh
        position={[innerLength / 2, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        >
        <sphereGeometry
            args={[
            innerRadius,
            96,
            96,
            Math.PI / 2,
            Math.PI,
            ]}
        />
        <primitive object={innerGlass} />
        </mesh>

      {/* ================= RINGS ================= */}

      <mesh
        rotation={[0, Math.PI / 2, 0]}
        position={[-2.18, 0, 0]}
      >
        <torusGeometry args={[radius + 0.015, 0.05, 32, 128]} />
        <primitive object={steel} />
      </mesh>

      <mesh
        rotation={[0, Math.PI / 2, 0]}
        position={[2.18, 0, 0]}
      >
        <torusGeometry args={[radius + 0.015, 0.05, 32, 128]} />
        <primitive object={steel} />
      </mesh>

      {/* ================================================= */}
      {/* MANHOLE */}
      {/* ================================================= */}

      <mesh position={[0, radius + 0.05, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.05, 48]} />
        <primitive object={darkSteel} />
      </mesh>

      <mesh position={[0, radius + 0.15, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.18, 48]} />
        <primitive object={steel} />
      </mesh>

      <mesh position={[0, radius + 0.29, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.04, 48]} />
        <primitive object={darkSteel} />
      </mesh>

      {/* ================================================= */}
      {/* PRESSURE GAUGE */}
      {/* ================================================= */}

      <mesh position={[0.42, radius + 0.23, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.04, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      <mesh position={[0.42, radius + 0.11, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.16, 16]} />
        <primitive object={steel} />
      </mesh>

      {/* ================================================= */}
      {/* VENT PIPE */}
      {/* ================================================= */}

      <mesh position={[-0.42, radius + 0.19, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.28, 24]} />
        <primitive object={steel} />
      </mesh>

      <mesh position={[-0.42, radius + 0.37, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.03, 24]} />
        <primitive object={darkSteel} />
      </mesh>

      {/* ================================================= */}
      {/* OUTLET PIPE */}
      {/* ================================================= */}

      <mesh
        position={[length / 2 - 0.18, -0.08, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.05, 0.05, 0.32, 24]} />
        <primitive object={steel} />
      </mesh>

    </group>
  );
}