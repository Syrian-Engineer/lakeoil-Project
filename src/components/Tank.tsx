// "use client";

// import { TankProp } from "@/app/tanks/page";
// import { useState } from "react";
// import { Badge } from "rizzui/badge";
// import LiquidFillGauge from "react-liquid-gauge";
// import { interpolateRgb } from "d3-interpolate";
// import { color } from "d3-color";

// interface Props {
//   tanks: TankProp;
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

//   return (
//     <div id="LiquidGauge" className="compact">
//       <div className="gauge-header">
//         <Badge className="name-badge" id="NameBadge">
//           {tank_name}
//         </Badge>
//         <div
//           className="toggle-details cursor-pointer flex items-center justify-center 
//                     w-8 h-8 rounded-full bg-gray-100 text-gray-600 shadow-sm 
//                     hover:bg-gray-200 hover:text-gray-800 active:scale-95 
//                     transition duration-200"
//           onClick={toggleDetails}
//           title={showDetails ? "Hide details" : "Show details"}
//         >
//           <i className={`fas fa-chevron-${showDetails ? "up" : "down"} text-sm`}></i>
//         </div>
//       </div>

//       <div className="gauge-content">
//         <div className="gauge-container">
//           <LiquidFillGauge
//             style={{ margin: "0 auto" }}
//             width={radius * 2}
//             height={radius * 2}
//             value={percentage}
//             percent="%"
//             textSize={1}
//             textOffsetX={0}
//             textOffsetY={0}
//             textRenderer={(props: any) => {
//               const value = Math.round(props.value);
//               const radius = Math.min(props.height / 2, props.width / 2);
//               const textPixels = (props.textSize * radius) / 2;
//               const valueStyle = { fontSize: textPixels };
//               const percentStyle = { fontSize: textPixels * 0.6 };

//               return (
//                 <tspan>
//                   <tspan className="value" style={valueStyle}>
//                     {value}
//                   </tspan>
//                   <tspan style={percentStyle}>{props.percent}</tspan>
//                 </tspan>
//               );
//             }}
//             riseAnimation
//             waveAnimation
//             waveFrequency={2}
//             waveAmplitude={1}
//             gradient
//             gradientStops={gradientStops}
//             circleStyle={{ fill: fillColor }}
//             waveStyle={{ fill: fillColor }}
//             textStyle={{
//               fill: color("#444")?.toString() ?? "#444",
//               fontFamily: "Arial",
//             }}
//             waveTextStyle={{
//               fill: color("#fff")?.toString() ?? "#fff",
//               fontFamily: "Arial",
//             }}
//           />
//           <div className="gauge-summary">
//             <Badge className="product-badge" id="ProductBadge">
//               {product_name}
//             </Badge>
//             <div className="volume-info">
//               <span>
//                 {safeFuelVolume} / {safeCapacity} L
//               </span>
//             </div>
//           </div>
//         </div>

//         {showDetails && (
//           <div className="details-section">
//             <div className="details-grid">
//               <Badge className="details-badge">
//                 Capacity: {safeCapacity.toLocaleString()} L
//               </Badge>
//               <Badge className="details-badge">
//                 Current: {safeFuelVolume.toLocaleString()} L
//               </Badge>
//               <Badge className="details-badge">
//                 @15°C: {fuel_volume_15?.toLocaleString() ?? 0} L
//               </Badge>
//               <Badge className="details-badge">
//                 Water: {water_volume?.toLocaleString() ?? 0} L
//               </Badge>
//               <Badge className="details-badge">
//                 Temp: {average_temp ?? 0}°C
//               </Badge>
//               <Badge className="details-badge">Probe ID: {probe_id}</Badge>
//             </div>
//           </div>
//         )}
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

interface Props {
  tanks: TankProp;
}

export default function Tank({ tanks }: Props) {
  const [showDetails, setShowDetails] = useState(false);
  const {
    fuel_volume,
    tank_name,
    tank_capacity,
    average_temp,
    fuel_volume_15,
    water_volume,
    product_name,
    probe_id,
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
    {
      key: "0%",
      stopOpacity: 1,
      offset: "0%",
    },
    {
      key: "50%",
      stopColor: fillColor,
      stopOpacity: 0.75,
      offset: "50%",
    },
    {
      key: "100%",
      stopOpacity: 0.5,
      offset: "100%",
    },
  ];

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
<div id="LiquidGauge" className="compact">
  <div className="gauge-header flex items-center justify-between">
    <Badge className="name-badge font-semibold text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded">
      {tank_name}
    </Badge>

    {/* Show/Hide Button */}
    <button
      onClick={toggleDetails}
      className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium 
                 rounded-md border border-gray-200 bg-white shadow-sm 
                 text-gray-600 hover:bg-gray-50 hover:text-gray-800 
                 active:scale-95 transition duration-200"
    >
      <span>{showDetails ? "Hide Details" : "Show Details"}</span>
      <i
        className={`fas fa-chevron-${showDetails ? "up" : "down"} text-[10px]`}
      ></i>
    </button>
  </div>

  <div className="gauge-content">
    <div className="gauge-container">
      {/* Gauge stays the same */}
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

      {/* Summary */}
      <div className="gauge-summary mt-2 text-center">
        <Badge className="product-badge px-2 py-0.5 bg-gray-200 text-gray-700 rounded">
          {product_name}
        </Badge>
        <div className="volume-info text-xs text-gray-600 mt-1">
          {safeFuelVolume} / {safeCapacity} L
        </div>
      </div>
    </div>

    {/* Details Section */}
    {showDetails && (
      <div
        className="details-section mt-4 rounded-lg border border-gray-200 
                   bg-gray-50 shadow-sm p-3 animate-fadeIn"
      >
        <h4 className="text-sm font-semibold text-gray-700 mb-2">
          Tank Details
        </h4>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div className="p-2 rounded bg-white shadow-sm">
            Capacity: {safeCapacity.toLocaleString()} L
          </div>
          <div className="p-2 rounded bg-white shadow-sm">
            Current: {safeFuelVolume.toLocaleString()} L
          </div>
          <div className="p-2 rounded bg-white shadow-sm">
            @15°C: {fuel_volume_15?.toLocaleString() ?? 0} L
          </div>
          <div className="p-2 rounded bg-white shadow-sm">
            Water: {water_volume?.toLocaleString() ?? 0} L
          </div>
          <div className="p-2 rounded bg-white shadow-sm">
            Temp: {average_temp ?? 0}°C
          </div>
          <div className="p-2 rounded bg-white shadow-sm">
            Probe ID: {probe_id}
          </div>
        </div>
      </div>
    )}
  </div>
</div>

  );
}
