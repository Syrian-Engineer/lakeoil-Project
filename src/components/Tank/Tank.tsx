"use client";

import { TankProp } from "@/app/tanks/page";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { translate } from "@/translations/translate";
import { tankHomeTranslations } from "@/translations/TankPage/home";
import { Badge } from "rizzui/badge";
import { CiCircleChevDown } from "react-icons/ci";
import { FaFillDrip } from "react-icons/fa";
import { FaCube } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import TankDetails from "./TankDetails";
import LiquidFillGauge from "react-liquid-gauge";
import { interpolateRgb } from "d3-interpolate";
import { color } from "d3-color";

interface Props {
  tanks: TankProp;
  LicenseeTraSerialNo: string;
  active: boolean;

  onOpenTank: (tank: TankProp) => void;
}

export default function Tank({
  tanks,
  LicenseeTraSerialNo,
  onOpenTank,
}: Props) {
  const [showDetails, setShowDetails] = useState(false);

  const router = useRouter();

  const lang = useSelector(
    (state: RootState) => state.language.language
  );

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
  } = tanks;

    // Safe values to prevent NaN
  const safeFuelVolume = fuel_volume ?? 0;
  const safeCapacity = tank_capacity ?? 1; // avoid division by zero
  const fillRatio = Math.min(safeFuelVolume / safeCapacity, 1);
  const percentage = fillRatio * 100;

  let startColor = "#dc143c"; // crimson
  let endColor = "#6495ed"; // cornflowerblue
  const radius = 60;

  const interpolate = interpolateRgb(startColor, endColor);
  const fillColor = interpolate(fillRatio);

  const gradientStops = [
    { key: "0%", stopOpacity: 1, offset: "0%" },
    { key: "50%", stopColor: fillColor, stopOpacity: 0.75, offset: "50%" },
    { key: "100%", stopOpacity: 0.5, offset: "100%" },
  ];

  // const safeFuelVolume = fuel_volume ?? 0;
  // const safeCapacity = tank_capacity ?? 1;

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleFillingClick = () => {
    router.push(`/tanks/filling?serial=${LicenseeTraSerialNo}`);
  };

  return (
    <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">

        <Badge className="rounded-md bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
          {tank_name}
        </Badge>

        <div className="flex items-center gap-2">

          {/* Open 3D */}
          <button
            onClick={() => onOpenTank(tanks)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-white shadow-md transition hover:bg-blue-600"
            title="Open 3D Tank"
          >
            <FaCube />
          </button>

          {/* Filling */}
          <button
            onClick={handleFillingClick}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-400 text-white shadow-md transition hover:bg-gray-600"
          >
            <FaFillDrip />
          </button>

          {/* Details */}
          <button
            onClick={toggleDetails}
            title={showDetails ? hideDetailsText : showDetailsText}
            className="rounded-full text-4xl transition"
          >
            <CiCircleChevDown
              className={`transition-transform duration-300 ${
                showDetails ? "rotate-180" : ""
              }`}
            />
          </button>

        </div>
      </div>

      {/* Preview */}
      <div className="h-[280px] w-full rounded-xl bg-gradient-to-b from-slate-100 to-slate-200 flex items-center justify-center">

        <div className="text-center">

          <div className="text-7xl">
          <LiquidFillGauge
              style={{ margin: "0 auto" }}
              width={radius * 2}
              height={radius * 2}
              value={percentage}
              percent="%"
              textSize={1}
              textOffsetX={0}
              textOffsetY={0}
              textRenderer={(props: any) => {
                const value = Math.round(props.value);
                const radius = Math.min(props.height / 2, props.width / 2);
                const textPixels = (props.textSize * radius) / 2;
                const valueStyle = { fontSize: textPixels };
                const percentStyle = { fontSize: textPixels * 0.6 };

                return (
                  <tspan>
                    <tspan className="value" style={valueStyle}>
                      {value}
                    </tspan>
                    <tspan style={percentStyle}>{props.percent}</tspan>
                  </tspan>
                );
              }}
              riseAnimation
              waveAnimation
              waveFrequency={2}
              waveAmplitude={1}
              gradient
              gradientStops={gradientStops}
              circleStyle={{ fill: fillColor }}
              waveStyle={{ fill: fillColor }}
              textStyle={{
                fill: color("#444")?.toString() ?? "#444",
                fontFamily: "Arial",
              }}
              waveTextStyle={{
                fill: color("#fff")?.toString() ?? "#fff",
                fontFamily: "Arial",
              }}
            />
          </div>

          <button
            onClick={() => onOpenTank(tanks)}
            className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Open 3D Viewer
          </button>

        </div>

      </div>

      {/* Summary */}
      <div className="mt-4 text-center">

        <Badge className="rounded-md bg-green-100 px-3 py-1 text-sm text-green-700">
          {product_name}
        </Badge>

        <div className="mt-2 text-sm text-gray-600">
          {safeFuelVolume} / {safeCapacity} L
        </div>

        <div className="mt-1 font-semibold text-gray-600">
          {updatedAtText}: {updated_at}
        </div>

      </div>

      {/* Details */}

      {showDetails && (
        <TankDetails
          capacity={safeCapacity}
          fuelVolume={safeFuelVolume}
          fuel_volume_15={fuel_volume_15}
          water_volume={water_volume}
          average_temp={average_temp}
          probe_id={probe_id}
        />
      )}
    </div>
  );
}