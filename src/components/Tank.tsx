// "use client";

// import { TankProp } from "@/app/tanks/page";
// import { useState } from "react";
// import { Badge } from "rizzui/badge";
// import LiquidFillGauge from "react-liquid-gauge";
// import { interpolateRgb } from "d3-interpolate";
// import { color } from "d3-color";
// import TankDetails from "./TankDetails";
// import { CiCircleChevDown } from "react-icons/ci";
// import { FaFillDrip } from "react-icons/fa";

// interface Props {
//   tanks: TankProp;
//   LicenseeTraSerialNo:string
// }

// export default function Tank({ tanks }: Props) {
//   const [showDetails, setShowDetails] = useState(false);
//   const {
//     fuel_volume,
//     tank_name,
//     tank_capacity,
//     average_temp,
//     fuel_volume_15,
//     water_volume,
//     product_name,
//     probe_id,
//   } = tanks;

//   // Safe values to prevent NaN
//   const safeFuelVolume = fuel_volume ?? 0;
//   const safeCapacity = tank_capacity ?? 1; // avoid division by zero
//   const fillRatio = Math.min(safeFuelVolume / safeCapacity, 1);
//   const percentage = fillRatio * 100;

//   let startColor = "#dc143c"; // crimson
//   let endColor = "#6495ed"; // cornflowerblue
//   const radius = 60;

//   const interpolate = interpolateRgb(startColor, endColor);
//   const fillColor = interpolate(fillRatio);

//   const gradientStops = [
//     {
//       key: "0%",
//       stopOpacity: 1,
//       offset: "0%",
//     },
//     {
//       key: "50%",
//       stopColor: fillColor,
//       stopOpacity: 0.75,
//       offset: "50%",
//     },
//     {
//       key: "100%",
//       stopOpacity: 0.5,
//       offset: "100%",
//     },
//   ];

//   const toggleDetails = () => {
//     setShowDetails(!showDetails);
//   };

//   const handleFillingClick = ()=>{
    
//   }

//   return (
//     <div className="mb-6 rounded-2xl shadow-lg bg-white border border-gray-200 p-4">
//       <div id="LiquidGauge" className="">
//         {/* Header with Tank Name + Toggle */}
//         <div className="flex items-center justify-between mb-3">
//           <Badge className=" px-3 py-1 text-sm font-semibold bg-gray-200 text-gray-600 rounded-md">
//             {tank_name}
//           </Badge>

//           <button
//             className="rounded-full shadow-sm hover:scale-95 transition duration-300 text-4xl"
//             onClick={handleFillingClick}
//            >
//             <FaFillDrip />
//           </button>

//           <button
//               onClick={toggleDetails}
//               title={showDetails ? "Hide details" : "Show details"}
//               className="rounded-full shadow-sm hover:scale-95 transition duration-300 text-4xl"
//             >
//               <CiCircleChevDown
//                 className={`transform transition-transform duration-300 ${
//                   showDetails ? "rotate-180" : "rotate-0"
//                 }`}
//               />
//           </button>
//         </div>

//         {/* Gauge Section */}
//         <div>
//           <div className=" flex flex-col items-center">
//             <LiquidFillGauge
//               style={{ margin: "0 auto" }}
//               width={radius * 2}
//               height={radius * 2}
//               value={percentage}
//               percent="%"
//               textSize={1}
//               textOffsetX={0}
//               textOffsetY={0}
//               textRenderer={(props: any) => {
//                 const value = Math.round(props.value);
//                 const radius = Math.min(props.height / 2, props.width / 2);
//                 const textPixels = (props.textSize * radius) / 2;
//                 const valueStyle = { fontSize: textPixels };
//                 const percentStyle = { fontSize: textPixels * 0.6 };

//                 return (
//                   <tspan>
//                     <tspan className="value" style={valueStyle}>
//                       {value}
//                     </tspan>
//                     <tspan style={percentStyle}>{props.percent}</tspan>
//                   </tspan>
//                 );
//               }}
//               riseAnimation
//               waveAnimation
//               waveFrequency={2}
//               waveAmplitude={1}
//               gradient
//               gradientStops={gradientStops}
//               circleStyle={{ fill: fillColor }}
//               waveStyle={{ fill: fillColor }}
//               textStyle={{
//                 fill: color("#444")?.toString() ?? "#444",
//                 fontFamily: "Arial",
//               }}
//               waveTextStyle={{
//                 fill: color("#fff")?.toString() ?? "#fff",
//                 fontFamily: "Arial",
//               }}
//             />

//             {/* Gauge Summary */}
//             <div className="gauge-summary mt-3 text-center">
//               <Badge className="product-badge px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md">
//                 {product_name}
//               </Badge>
//               <div className="mt-1 text-sm text-gray-600">
//                 {safeFuelVolume} / {safeCapacity} L
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Details Section */}
//         {showDetails && <TankDetails capacity={safeCapacity} fuelVolume={safeFuelVolume} fuel_volume_15={fuel_volume_15} water_volume={water_volume} average_temp={average_temp} probe_id={probe_id} />}
//       </div>
//     </div>
//   );
// }




"use client";

import { TankProp } from "@/app/tanks/page";
import { useState } from "react";
import { Badge } from "rizzui/badge";
import LiquidFillGauge from "react-liquid-gauge";
import { interpolateRgb } from "d3-interpolate";
import { color } from "d3-color";
import TankDetails from "./TankDetails";
import { CiCircleChevDown } from "react-icons/ci";
import { FaFillDrip } from "react-icons/fa";
import { useRouter } from "next/navigation"; // ✅ import router

interface Props {
  tanks: TankProp;
  LicenseeTraSerialNo: string;
}

export default function Tank({ tanks, LicenseeTraSerialNo }: Props) {
  const [showDetails, setShowDetails] = useState(false);
  const router = useRouter(); // ✅ initialize router

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

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleFillingClick = () => {
    // ✅ Navigate to /tanks/filling with query param
    router.push(`/tanks/filling?serial=${LicenseeTraSerialNo}`);
  };

  return (
    <div className="mb-6 rounded-2xl shadow-lg bg-white  border border-gray-200 p-4">
      <div id="LiquidGauge" className="">
        {/* Header with Tank Name + Toggle */}
        <div className="flex items-center justify-between mb-3">
          <Badge className=" px-3 py-1 text-sm font-semibold bg-gray-200 text-gray-600 rounded-md">
            {tank_name}
          </Badge>

          <button
            onClick={handleFillingClick}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-400 text-white shadow-md hover:bg-gray-600 hover:scale-95 transition duration-300"
          >
            <FaFillDrip className="text-xl" />
          </button>

          <button
            onClick={toggleDetails}
            title={showDetails ? "Hide details" : "Show details"}
            className="rounded-full shadow-sm hover:scale-95 transition duration-300 text-4xl"
          >
            <CiCircleChevDown
              className={`transform transition-transform duration-300 ${
                showDetails ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>

        {/* Gauge Section */}
        <div>
          <div className=" flex flex-col items-center">
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

            {/* Gauge Summary */}
            <div className="gauge-summary mt-3 text-center">
              <Badge className="product-badge px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md">
                {product_name}
              </Badge>
              <div className="mt-1 text-sm text-gray-600">
                {safeFuelVolume} / {safeCapacity} L
              </div>
              <div className="mt-1  text-gray-600 font-semibold">
                Updated at: {updated_at}
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
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
    </div>
  );
}

