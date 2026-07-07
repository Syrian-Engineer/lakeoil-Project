"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { translate } from "@/translations/translate";
import { tankHomeTranslations } from "@/translations/TankPage/home";
import { TankProp } from "@/app/tanks/page";
import TankDetails from "./Tank/TankDetails";
import { FaFillDrip } from "react-icons/fa";
import { CiCircleChevDown } from "react-icons/ci";
import * as THREE from "three";

interface Props {
  tanks: TankProp;
  LicenseeTraSerialNo: string;
}

// ─── product colour palette ───────────────────────────────────────────────────
const PRODUCT_PALETTE: Record<
  string,
  { fuelColor: number; fuelEmit: number; waterColor: number; badge: string }
> = {
  DIESEL: {
    fuelColor: 0xd4a010,
    fuelEmit: 0x3a2800,
    waterColor: 0x1a0c04,
    badge: "#ffcc00",
  },
  "95 OCTANE": {
    fuelColor: 0x38a020,
    fuelEmit: 0x082000,
    waterColor: 0x081408,
    badge: "#00dd88",
  },
  "91 OCTANE": {
    fuelColor: 0xd06020,
    fuelEmit: 0x301000,
    waterColor: 0x200c04,
    badge: "#ff6644",
  },
  "98 OCTANE": {
    fuelColor: 0x9080c8,
    fuelEmit: 0x180830,
    waterColor: 0x100618,
    badge: "#aa88ff",
  },
};

const DEFAULT_PALETTE = {
  fuelColor: 0xc8920a,
  fuelEmit: 0x3a2800,
  waterColor: 0x1a0c04,
  badge: "#ffcc00",
};

// ─── main component ───────────────────────────────────────────────────────────
export default function Tank({ tanks, LicenseeTraSerialNo }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);
  const [showDetails, setShowDetails] = useState(false);
  const router = useRouter();
  const lang = useSelector((state: RootState) => state.language.language);

  const showDetailsText = translate(
    tankHomeTranslations,
    lang,
    "showDetails"
  ).text;
  const hideDetailsText = translate(
    tankHomeTranslations,
    lang,
    "hideDetails"
  ).text;
  const updatedAtText = translate(
    tankHomeTranslations,
    lang,
    "updatedAt"
  ).text;

  const {
    fuel_volume,
    tank_name,
    tank_capacity,
    average_temp,
    fuel_volume_15,
    water_volume,
    product_name,
    probe_id,
    updated_at,
    min_level,
    probes,
  } = tanks;

  const safeFuel = fuel_volume ?? 0;
  const safeCap = tank_capacity ?? 1;
  const safeWater = water_volume ?? 0;
  const safeMin = min_level ?? 0;
  const pct = Math.round((safeFuel / safeCap) * 100);
  const isLow = safeFuel < safeMin;
  const isHighWater = safeWater > 500;

  const palette =
    PRODUCT_PALETTE[product_name?.toUpperCase() ?? ""] ?? DEFAULT_PALETTE;

  // ── Three.js scene ────────────────────────────────────────────────────────
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const W = container.clientWidth || 340;
    const H = Math.round(W * 0.58);

    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0d0d1e, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0d0d1e);
    scene.fog = new THREE.FogExp2(0x0d0d1e, 0.04);

    // camera
    const camera = new THREE.PerspectiveCamera(44, W / H, 0.01, 100);
    camera.position.set(0, 1.0, 8.5);
    camera.lookAt(0, -0.2, 0);

    // ── lights ──────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.65));

    const sun = new THREE.DirectionalLight(0xfff5dd, 2.8);
    sun.position.set(5, 10, 8);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    scene.add(sun);

    // scene.add(
    //   Object.assign(new THREE.DirectionalLight(0x88aaff, 1.0), {
    //     position: new THREE.Vector3(-5, 3, 5),
    //   })
    // );

    // interior warm light (makes fuel glow inside tank)
    const intLight = new THREE.PointLight(0xffcc44, 4.0, 5.5);
    intLight.position.set(0, -0.2, 0);
    scene.add(intLight);

    // window light (shines through cut opening)
    const winLight = new THREE.PointLight(0xffdd88, 3.5, 4.0);
    winLight.position.set(0, 0.2, 1.0);
    scene.add(winLight);

    // ── ground / soil ────────────────────────────────────────────────────────
    const gnd = new THREE.Mesh(
      new THREE.PlaneGeometry(24, 16),
      new THREE.MeshLambertMaterial({ color: 0x3a2810 })
    );
    gnd.rotation.x = -Math.PI / 2;
    gnd.position.y = -1.8;
    gnd.receiveShadow = true;
    scene.add(gnd);

    const topSoil = new THREE.Mesh(
      new THREE.PlaneGeometry(24, 7),
      new THREE.MeshLambertMaterial({ color: 0x5a3a18 })
    );
    topSoil.rotation.x = -Math.PI / 2;
    topSoil.position.set(0, 0.42, -3.5);
    scene.add(topSoil);

    // ── tank geometry ────────────────────────────────────────────────────────
    const L = 4.8; // tank length
    const R = 1.0; // outer radius
    const IR = R - 0.09; // inner radius (liner)
    const SEG = 64;

    const fuelR = Math.min(safeFuel / safeCap, 0.995);
    const waterR = Math.min(safeWater / safeCap, 0.13);
    const totR = Math.min(fuelR + waterR, 0.99);
    const minR = safeMin / safeCap;

    // y position for a given fill ratio inside the cylinder
    function lvlY(r: number) {
      return r * IR * 2 - IR;
    }
    const fuelTopY = lvlY(totR);
    const waterTopY = lvlY(waterR);
    const minLvlY = lvlY(minR);

    // ── OUTER SHELL ──────────────────────────────────────────────────────────
    const shellMat = new THREE.MeshStandardMaterial({
      color: 0x8b4a2a,
      roughness: 0.78,
      metalness: 0.32,
    });

    const shellBody = new THREE.Mesh(
      new THREE.CylinderGeometry(R, R, L, SEG, 1, false),
      shellMat
    );
    shellBody.rotation.z = Math.PI / 2;
    shellBody.castShadow = true;
    shellBody.receiveShadow = true;
    scene.add(shellBody);

    // end caps
    const capMat = new THREE.MeshStandardMaterial({
      color: 0x6a3010,
      roughness: 0.85,
      metalness: 0.28,
    });
    [-1, 1].forEach((s) => {
      const cap = new THREE.Mesh(
        new THREE.SphereGeometry(R, SEG, 32),
        capMat
      );
      cap.scale.set(0.2, 1, 1);
      cap.position.x = s * (L / 2);
      cap.castShadow = true;
      scene.add(cap);
    });

    // weld seam rings
    const seamMat = new THREE.MeshStandardMaterial({
      color: 0x4a2010,
      roughness: 0.9,
      metalness: 0.25,
    });
    [-1.6, -0.8, 0, 0.8, 1.6].forEach((xp) => {
      const rib = new THREE.Mesh(
        new THREE.TorusGeometry(R + 0.014, 0.022, 8, SEG),
        seamMat
      );
      rib.rotation.y = Math.PI / 2;
      rib.position.x = xp;
      scene.add(rib);
    });

    // alarm/warn coloured seam rings
    if (isLow || isHighWater) {
      const glowCol = isLow ? 0xff2222 : 0xff9900;
      const glowMat = new THREE.MeshStandardMaterial({
        color: glowCol,
        emissive: glowCol,
        emissiveIntensity: 0.8,
        roughness: 0.5,
        metalness: 0.3,
      });
      const glowRing = new THREE.Mesh(
        new THREE.TorusGeometry(R + 0.02, 0.03, 8, SEG),
        glowMat
      );
      glowRing.rotation.y = Math.PI / 2;
      glowRing.position.x = 0;
      scene.add(glowRing);

      // alarm point light
      const alarmLight = new THREE.PointLight(glowCol, 2.5, 3.5);
      alarmLight.position.set(0, R, 0);
      scene.add(alarmLight);
    }

    // ── INNER LINER (back-side so you see it from inside) ────────────────────
    const linerMat = new THREE.MeshStandardMaterial({
      color: 0xddd5c0,
      roughness: 0.92,
      metalness: 0.0,
      side: THREE.BackSide,
    });
    const liner = new THREE.Mesh(
      new THREE.CylinderGeometry(IR, IR, L + 0.02, SEG, 1, false),
      linerMat
    );
    liner.rotation.z = Math.PI / 2;
    scene.add(liner);

    // ── WATER body ───────────────────────────────────────────────────────────
    if (waterR > 0.003) {
      const wFillH = waterTopY - -IR;
      const waterMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(IR - 0.01, IR - 0.01, wFillH, SEG, 1, false),
        new THREE.MeshStandardMaterial({
          color: palette.waterColor,
          roughness: 0.98,
          metalness: 0.0,
        })
      );
      waterMesh.rotation.z = Math.PI / 2;
      waterMesh.position.y = -IR + wFillH / 2;
      scene.add(waterMesh);
    }

    // ── FUEL body ────────────────────────────────────────────────────────────
    if (totR > 0.01) {
      const fBase = waterR > 0.003 ? waterTopY : -IR;
      const fFillH = Math.max(0.02, fuelTopY - fBase);

      const fuelMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(
          IR - 0.01,
          IR - 0.01,
          fFillH,
          SEG,
          1,
          false
        ),
        new THREE.MeshStandardMaterial({
          color: palette.fuelColor,
          roughness: 0.12,
          metalness: 0.04,
          emissive: palette.fuelEmit,
          emissiveIntensity: 0.6,
        })
      );
      fuelMesh.rotation.z = Math.PI / 2;
      fuelMesh.position.y = fBase + fFillH / 2;
      scene.add(fuelMesh);

      // fuel surface disc — reflective
      const surfRad = Math.sqrt(
        Math.max(0, (IR - 0.01) ** 2 - fuelTopY ** 2)
      ) * 0.97;
      if (surfRad > 0.05) {
        const surf = new THREE.Mesh(
          new THREE.CircleGeometry(surfRad, SEG),
          new THREE.MeshStandardMaterial({
            color: palette.fuelColor,
            emissive: palette.fuelEmit,
            emissiveIntensity: 0.9,
            roughness: 0.04,
            metalness: 0.06,
            transparent: true,
            opacity: 0.96,
          })
        );
        surf.rotation.x = -Math.PI / 2;
        surf.position.y = fuelTopY + 0.004;
        scene.add(surf);

        // specular glare on surface
        const glare = new THREE.Mesh(
          new THREE.CircleGeometry(surfRad * 0.45, SEG),
          new THREE.MeshBasicMaterial({
            color: 0xffffd0,
            transparent: true,
            opacity: 0.25,
          })
        );
        glare.rotation.x = -Math.PI / 2;
        glare.position.set(-L * 0.1, fuelTopY + 0.006, -surfRad * 0.2);
        scene.add(glare);
      }
    }

    // ── CUT FACE RINGS (both ends — steel rim of the opening) ────────────────
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xb0a080,
      roughness: 0.3,
      metalness: 0.82,
    });
    [-1, 1].forEach((s) => {
      const rim = new THREE.Mesh(
        new THREE.RingGeometry(IR, R + 0.01, SEG),
        rimMat
      );
      rim.rotation.y = Math.PI / 2;
      rim.position.x = s * (L / 2 + 0.005);
      scene.add(rim);
    });

    // ── WINDOW CUT in TOP of tank ────────────────────────────────────────────
    // The window is a rectangular opening cut into the top of the cylinder
    // We show it by placing a rectangular "hole frame" + glass + interior visible
    const winW = L * 0.55; // window width along tank axis
    const winH = R * 1.1; // window height (dips into tank)
    const winZ = R + 0.01; // z position (top of cylinder)

    // Window steel frame
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0xb0a080,
      roughness: 0.28,
      metalness: 0.85,
    });
    const frameT = 0.055;

    // Four frame bars
    const frameConfigs = [
      // [width, height, depth, px, py, pz]
      [winW + frameT * 2, frameT, frameT, 0, winZ + frameT / 2, 0],          // top
      [winW + frameT * 2, frameT, frameT, 0, winZ - winH - frameT / 2, 0],   // bottom
      [frameT, winH + frameT * 2, frameT, -winW / 2 - frameT / 2, winZ - winH / 2, 0], // left
      [frameT, winH + frameT * 2, frameT, winW / 2 + frameT / 2, winZ - winH / 2, 0],  // right
    ];
    frameConfigs.forEach(([w, h, d, px, py, pz]) => {
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(w as number, h as number, d as number),
        frameMat
      );
      bar.position.set(px as number, py as number, pz as number);
      scene.add(bar);
    });

    // ── WINDOW INTERIOR REVEAL ───────────────────────────────────────────────
    // The cut reveals the inner wall thickness — add 4 thin planes for the
    // cut edges (top, bottom, left, right of the window opening)
    const cutMat = new THREE.MeshStandardMaterial({
      color: 0x7a4a28,
      roughness: 0.75,
      metalness: 0.3,
      side: THREE.DoubleSide,
    });
    const cutThick = R - IR; // wall thickness

    // Top cut edge (horizontal plane at top of window, showing wall thickness)
    const topCut = new THREE.Mesh(
      new THREE.PlaneGeometry(winW, cutThick),
      cutMat
    );
    topCut.position.set(0, winZ, cutThick / 2);
    topCut.rotation.x = -Math.PI / 2;
    scene.add(topCut);

    // Bottom cut edge
    const botCut = new THREE.Mesh(
      new THREE.PlaneGeometry(winW, cutThick),
      cutMat
    );
    botCut.position.set(0, winZ - winH, cutThick / 2);
    botCut.rotation.x = -Math.PI / 2;
    scene.add(botCut);

    // Left cut edge (vertical plane)
    const lCut = new THREE.Mesh(
      new THREE.PlaneGeometry(cutThick, winH),
      cutMat
    );
    lCut.position.set(-winW / 2, winZ - winH / 2, cutThick / 2);
    lCut.rotation.y = Math.PI / 2;
    scene.add(lCut);

    // Right cut edge
    const rCut = new THREE.Mesh(
      new THREE.PlaneGeometry(cutThick, winH),
      cutMat
    );
    rCut.position.set(winW / 2, winZ - winH / 2, cutThick / 2);
    rCut.rotation.y = Math.PI / 2;
    scene.add(rCut);

    // ── WINDOW GLASS PANEL ───────────────────────────────────────────────────
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xaaccff,
      transparent: true,
      opacity: 0.07,
      roughness: 0.0,
      metalness: 0.0,
      reflectivity: 0.5,
      side: THREE.DoubleSide,
    });
    const glass = new THREE.Mesh(
      new THREE.PlaneGeometry(winW, winH),
      glassMat
    );
    glass.position.set(0, winZ - winH / 2, IR + 0.005);
    scene.add(glass);

    // Glass reflection streak
    const streakMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.07,
      side: THREE.DoubleSide,
    });
    const streak = new THREE.Mesh(
      new THREE.PlaneGeometry(winW * 0.35, winH * 0.7),
      streakMat
    );
    streak.position.set(-winW * 0.18, winZ - winH * 0.4, IR + 0.008);
    streak.rotation.z = 0.15;
    scene.add(streak);

    // ── MIN LEVEL indicator ring ──────────────────────────────────────────────
    if (minR > 0.01 && minR < 0.98) {
      const minSurfR = Math.sqrt(
        Math.max(0, (IR - 0.01) ** 2 - minLvlY ** 2)
      );
      const minRing = new THREE.Mesh(
        new THREE.RingGeometry(minSurfR - 0.03, minSurfR + 0.03, SEG),
        new THREE.MeshBasicMaterial({
          color: 0xff2222,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.9,
        })
      );
      minRing.rotation.x = -Math.PI / 2;
      minRing.position.y = minLvlY + 0.005;
      scene.add(minRing);

      // MIN line visible through window
      const pts = [
        new THREE.Vector3(-winW / 2, minLvlY, IR - 0.04),
        new THREE.Vector3(winW / 2, minLvlY, IR - 0.04),
      ];
      const minLine = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: 0xff3333 })
      );
      scene.add(minLine);
    }

    // water surface line visible through window
    if (waterR > 0.003) {
      const wpts = [
        new THREE.Vector3(-winW / 2, waterTopY + 0.01, IR - 0.04),
        new THREE.Vector3(winW / 2, waterTopY + 0.01, IR - 0.04),
      ];
      scene.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(wpts),
          new THREE.LineBasicMaterial({ color: 0x6a4010 })
        )
      );
    }

    // ── SINGLE ATG PROBE (vertical, hanging from top) ─────────────────────────
    const probeX = 0.3;
    const probeMat = new THREE.MeshStandardMaterial({
      color: 0xc0b090,
      roughness: 0.35,
      metalness: 0.75,
    });

    const rod = new THREE.Mesh(
      new THREE.CylinderGeometry(0.022, 0.022, IR * 1.92, 12),
      probeMat
    );
    rod.position.set(probeX, 0, 0);
    scene.add(rod);

    // collar rings
    const collarMat = new THREE.MeshStandardMaterial({
      color: 0x686050,
      roughness: 0.5,
      metalness: 0.65,
    });
    [-0.58, 0.0, 0.58].forEach((cy2) => {
      const collar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.055, 0.055, 0.062, 12),
        collarMat
      );
      collar.position.set(probeX, cy2, 0);
      scene.add(collar);
    });

    // sensor bulb at bottom — glowing teal
    const bulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.072, 16, 16),
      new THREE.MeshStandardMaterial({
        color: 0x22ddaa,
        emissive: 0x00cc88,
        emissiveIntensity: 2.2,
        roughness: 0.15,
        metalness: 0.1,
      })
    );
    bulb.position.set(probeX, -IR + 0.1, 0);
    scene.add(bulb);

    // probe conduit above tank
    const conduit = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 1.1, 12),
      new THREE.MeshStandardMaterial({
        color: 0x7a8888,
        roughness: 0.5,
        metalness: 0.6,
      })
    );
    conduit.position.set(probeX, R + 0.44, 0);
    scene.add(conduit);
    const condCap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.072, 0.072, 0.06, 12),
      new THREE.MeshStandardMaterial({
        color: 0x607070,
        roughness: 0.4,
        metalness: 0.7,
      })
    );
    condCap.position.set(probeX, R + 1.0, 0);
    scene.add(condCap);

    // ── PIPES (fill + vent) ───────────────────────────────────────────────────
    const pipeMat = new THREE.MeshStandardMaterial({
      color: 0x8a9898,
      roughness: 0.5,
      metalness: 0.6,
    });
    const pcapMat = new THREE.MeshStandardMaterial({
      color: 0x607070,
      roughness: 0.4,
      metalness: 0.7,
    });

    [
      { xp: 1.5, label: "fill" },
      { xp: -1.7, label: "vent" },
    ].forEach(({ xp }) => {
      const pipe = new THREE.Mesh(
        new THREE.CylinderGeometry(0.046, 0.046, 1.2, 12),
        pipeMat
      );
      pipe.position.set(xp, R + 0.44, 0);
      scene.add(pipe);

      const cap = new THREE.Mesh(
        new THREE.CylinderGeometry(0.078, 0.078, 0.06, 12),
        pcapMat
      );
      cap.position.set(xp, R + 1.06, 0);
      scene.add(cap);
    });

    // ── RENDER LOOP ───────────────────────────────────────────────────────────
    let tick = 0;
    function animate() {
      frameRef.current = requestAnimationFrame(animate);
      tick += 0.005;

      // gentle arc so the window cut is always visible
      camera.position.x = Math.sin(tick * 0.4) * 1.2;
      camera.position.y = 1.0 + Math.sin(tick * 0.28) * 0.22;
      camera.position.z = 8.2 + Math.sin(tick * 0.35) * 0.4;
      camera.lookAt(0, -0.15, 0);

      // pulse interior lights slightly
      intLight.intensity = 3.8 + Math.sin(tick * 2.2) * 0.4;
      winLight.intensity = 3.2 + Math.sin(tick * 1.9) * 0.3;

      renderer.render(scene, camera);
    }
    animate();

    // ── CLEANUP ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [safeFuel, safeCap, safeWater, safeMin, palette]);

  // ── STATUS helpers ─────────────────────────────────────────────────────────
  const statusColor = isLow
    ? "border-red-500"
    : isHighWater
    ? "border-amber-500"
    : "border-gray-700";

  const pctColor = isLow
    ? "text-red-400"
    : pct < 40
    ? "text-amber-400"
    : "text-green-400";

  return (
    <div
      className={`rounded-xl border ${statusColor} bg-[#0d0d1e] shadow-lg overflow-hidden`}
    >
      {/* ── header ── */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#1a1a35] border-b border-gray-800">
        <div>
          <span className="text-xs font-bold tracking-widest text-blue-300 uppercase">
            {tank_name}
          </span>
          <span
            className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded"
            style={{
              background: `${palette.badge}20`,
              color: palette.badge,
              border: `1px solid ${palette.badge}40`,
            }}
          >
            {product_name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isLow && (
            <span className="text-[10px] font-bold text-red-400 animate-pulse">
              ⚠ LOW
            </span>
          )}
          {isHighWater && (
            <span className="text-[10px] font-bold text-amber-400">
              ◆ WATER
            </span>
          )}

          <button
            onClick={() =>
              router.push(`/tanks/filling?serial=${LicenseeTraSerialNo}`)
            }
            className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-700 text-white hover:bg-gray-500 transition"
            title="Schedule fill"
          >
            <FaFillDrip className="text-sm" />
          </button>

          <button
            onClick={() => setShowDetails((s) => !s)}
            title={showDetails ? hideDetailsText : showDetailsText}
            className="text-gray-400 hover:text-white transition text-2xl"
          >
            <CiCircleChevDown
              className={`transform transition-transform duration-300 ${
                showDetails ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* ── THREE.JS canvas ── */}
      <div ref={mountRef} className="w-full" />

      {/* ── readout strip ── */}
      <div className="grid grid-cols-4 gap-0 border-t border-gray-800 bg-[#0a0a18]">
        {[
          { label: "LEVEL", value: `${pct}%`, color: pctColor },
          {
            label: "VOLUME",
            value: `${(safeFuel / 1000).toFixed(1)}KL`,
            color: "text-blue-300",
          },
          {
            label: "ULLAGE",
            value: `${((safeCap - safeFuel) / 1000).toFixed(1)}KL`,
            color: "text-cyan-300",
          },
          {
            label: "WATER",
            value: `${safeWater}L`,
            color: isHighWater ? "text-red-400" : "text-gray-400",
          },
        ].map((r) => (
          <div
            key={r.label}
            className="flex flex-col items-center justify-center py-2 border-r border-gray-800 last:border-r-0"
          >
            <span className="text-[9px] tracking-widest text-gray-600 uppercase">
              {r.label}
            </span>
            <span className={`text-sm font-bold font-mono ${r.color}`}>
              {r.value}
            </span>
          </div>
        ))}
      </div>

      {/* ── updated at ── */}
      <div className="px-3 py-1.5 bg-[#0a0a18] border-t border-gray-800">
        <span className="text-[10px] text-gray-600 font-mono">
          {updatedAtText}: {updated_at}
        </span>
      </div>

      {/* ── details section ── */}
      {showDetails && (
        <div className="border-t border-gray-800">
          <TankDetails
            capacity={safeCap}
            fuelVolume={safeFuel}
            fuel_volume_15={fuel_volume_15}
            water_volume={safeWater}
            average_temp={average_temp}
            probe_id={probe_id}
          />

          {/* probe temperatures */}
          {probes && probes.length > 0 && (
            <div className="px-3 pb-3">
              <p className="text-[9px] tracking-widest text-gray-600 uppercase mb-2">
                ATG Probe Temperatures (°C)
              </p>
              <div className="grid grid-cols-5 gap-1">
                {probes[0] &&
                  [
                    probes[0].temp_1,
                    probes[0].temp_2,
                    probes[0].temp_3,
                    probes[0].temp_4,
                    probes[0].temp_5,
                  ].map((t, i) => (
                    <div
                      key={i}
                      className="bg-[#0d0d1e] border border-gray-800 rounded px-1 py-1 text-center"
                    >
                      <div className="text-[9px] text-gray-600">Pt-{i + 1}</div>
                      <div className="text-xs font-bold text-green-400 font-mono">
                        {t?.toFixed(1) ?? "—"}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
