// 'use client';
// import { ProductProp, TankProp } from '@/app/tanks/page';
// import { RootState } from '@/store';
// import { tankHomeTranslations } from '@/translations/TankPage/home';
// import { translate } from '@/translations/translate';
// import { set } from 'lodash';
// import { useEffect, useState } from 'react';
// import {
//   PiFileTextDuotone,
//   PiPulseDuotone,
//   PiSlidersHorizontalDuotone,
// } from 'react-icons/pi';
// import { useSelector } from 'react-redux';
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   Label,
// } from 'recharts';
// import { ActionIcon } from 'rizzui/action-icon';
// import Swal from 'sweetalert2';

// interface Props {
//   tank: TankProp;
// }

// export default function Tank({ tank }: Props) {
//   const [currentVolume,setCurrentVolume] = useState(0);

//   const avgTemp =
//     tank.probes?.length > 0
//       ? (
//           tank.probes
//             .map((probe) =>
//               [probe.temp_1, probe.temp_2, probe.temp_3, probe.temp_4, probe.temp_5]
//                 .reduce((a, b) => a + b, 0)
//             )
//             .reduce((a, b) => a + b, 0) /
//           (tank.probes.length * 5 * 100)
//         ).toFixed(2)
//       : 'N/A';

//   // Calculate total fuel and water levels
//   const totalFuel = tank.probes.reduce((sum, probe) => sum + probe.f_lvl, 0);
//   const totalWater = tank.probes.reduce((sum, probe) => sum + probe.w_lvl, 0);
//   const totalLength = tank.probes.reduce((sum, probe) => sum + probe.length, 0);

//   // Compute percentage
//   const usedPercentage = totalLength > 0
//     ? ((totalFuel - totalWater) / totalLength) * 100
//     : 0;

//   const data = [
//     { name: 'Available storage', value: 100 - usedPercentage },
//     { name: 'Total used storage', value: usedPercentage },
//   ];
//   const COLORS = ['#BFDBFE', '#0070F3'];

//   function showProbeInfo(probes: Props['tank']['probes']) {
//     const probeHtml = probes
//       .map((probe, index) => {
//         const temps = [
//           probe.temp_1,
//           probe.temp_2,
//           probe.temp_3,
//           probe.temp_4,
//           probe.temp_5,
//         ];
//         const avg = (
//           temps.reduce((a, b) => a + b, 0) /
//           temps.length /
//           100
//         ).toFixed(2);
  
//         return `
//           <div class="bg-gray-50 p-4 rounded-xl shadow-sm mb-4 relative">
//             <div class="text-base font-semibold text-gray-800 mb-2 flex items-center justify-between">
//               🔍 Probe: <span class="text-blue-600">${probe.identification_code}</span>
//               <button 
//                 class="edit-probe-btn text-blue-500 hover:text-blue-700 cursor-pointer text-lg"
//                 data-probe-index="${index}"
//                 title="Edit Probe"
//               >
//                 🖉
//               </button>
//             </div>
//             <ul class="text-sm text-gray-700 pl-4 space-y-1">
//               <li>🌡️ <strong>${avgTemperature.text}:</strong> ${avg} °C</li>
//               <li>⛽ <strong>${fuelLevel.text}:</strong> ${(probe.f_lvl / 100).toFixed(2)} ${mm.text}</li>
//               <li>💧 <strong>${waterLevel.text}:</strong> ${(probe.w_lvl / 100).toFixed(2)} ${mm.text}</li>
//               <li>🛠️ <strong>${fuelOffset.text}:</strong> ${probe.fuel_offset} ${mm.text}</li>
//               <li>🛠️ <strong>${waterOffset.text}:</strong> ${probe.water_offset} ${mm.text}</li>
//             </ul>
//           </div>
//         `;
//       })
//       .join('');
  
//     Swal.fire({
//       title:
//         '<div class="font-bold text-xl text-gray-800">🧪 Probe Information</div>',
//       html: `<div class="max-h-96 overflow-y-auto">${probeHtml}</div>`,
//       showCloseButton: true,
//       confirmButtonText: 'Close',
//       width: 640,
//       background: '#ffffff',
//       customClass: {
//         popup: '!rounded-2xl !p-6',
//       },
//       didOpen: () => {
//         // Add event listeners to the edit buttons
//         const editButtons = Swal.getHtmlContainer()?.querySelectorAll('.edit-probe-btn');
//         editButtons?.forEach((btn) => {
//           btn.addEventListener('click', (e) => {
//             e.stopPropagation();
//             const index = Number((e.currentTarget as HTMLElement).dataset.probeIndex);
//             if (typeof index === 'number') {
//               showEditForm(probes[index]);
//             }
//           });
//         });
//       },
//     });
//   }
  
//   function showEditForm(probe: Props['tank']['probes'][number]) {
//     Swal.fire({
//       title: `<div class="font-bold text-xl text-gray-800">✏️ Edit Probe: ${probe.identification_code}</div>`,
//       html: `
//         <input type="text" id="reference" placeholder="Reference" class="swal2-input" value="${probe.identification_code}" />
//         <input type="text" id="physicalId" placeholder="Physical ID" class="swal2-input" value="${probe.physical_id || ''}" />
//         <input type="number" id="fuelOffset" placeholder="Fuel Offset (mm)" class="swal2-input" value="${probe.fuel_offset}" />
//         <input type="number" id="waterOffset" placeholder="Water Offset (mm)" class="swal2-input" value="${probe.water_offset}" />
//       `,
//       showCancelButton: true,
//       confirmButtonText: 'Edit',
//       preConfirm: async () => {
//         const reference = (document.getElementById('reference') as HTMLInputElement).value;
//         const physicalId = (document.getElementById('physicalId') as HTMLInputElement).value;
//         const fuelOffset = (document.getElementById('fuelOffset') as HTMLInputElement).value;
//         const waterOffset = (document.getElementById('waterOffset') as HTMLInputElement).value;
  
//         if (!reference || !physicalId || fuelOffset === '' || waterOffset === '') {
//           Swal.showValidationMessage('Please fill all fields');
//           return false;
//         }
  
//         try {
//           const res = await fetch('/api/tanks/edit-probe', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             credentials: 'include',
//             body: JSON.stringify({
//               com_port: probe.com_port,
//               fuel_offset: Number(fuelOffset),
//               id: probe.id,
//               identification_code: reference,
//               physical_id: Number(physicalId),
//               tank_id: probe.tank_id,
//               water_offset: Number(waterOffset),
//             }),
//           });
  
//           if (!res.ok) {
//             const errorText = await res.text();
//             Swal.showValidationMessage(`Failed: ${errorText}`);
//             return false;
//           }
//           console.log(probe.com_port,Number(fuelOffset),probe.id,reference,physicalId,probe.tank_id,Number(waterOffset))
//           return true;
//         } catch (err) {
//           Swal.showValidationMessage(`Error: ${(err as Error).message}`);
//           return false;
//         }
//       },
//     }).then((result) => {
//       if (result.isConfirmed) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Updated!',
//           text: 'Probe information updated successfully.',
//         });
//       }
//     });
//   }
  

//   function showFillingForm() {
//     Swal.fire({
//       title:
//         '<div class="font-bold text-xl text-red-600 mb-4">⚠️ Use this form only after filling is complete</div>',
//       html: `
//         <div class="flex flex-col gap-3 text-left">
//           <input type="text" id="supplier" placeholder="Supplier Name" class="swal2-input" />
//           <input type="text" id="driver" placeholder="Driver Name" class="swal2-input" />
//           <input type="text" id="plate" placeholder="Tanker License Plate" class="swal2-input" />
//           <input type="date" id="issueDate" class="swal2-input" />
//           <input type="number" id="fuelAmount" placeholder="Fuel Amount" class="swal2-input" />
//           <input type="number" id="price" placeholder="Liter Price" class="swal2-input" />
//         </div>
//       `,
//       showCancelButton: true,
//       confirmButtonText: 'Process',
//       focusConfirm: false,
//       preConfirm: () => {
//         const supplier = (document.getElementById('supplier') as HTMLInputElement)?.value;
//         const driver = (document.getElementById('driver') as HTMLInputElement)?.value;
//         const plate = (document.getElementById('plate') as HTMLInputElement)?.value;
//         const issueDate = (document.getElementById('issueDate') as HTMLInputElement)?.value;
//         const fuelAmount = (document.getElementById('fuelAmount') as HTMLInputElement)?.value;
//         const price = (document.getElementById('price') as HTMLInputElement)?.value;

//         if (!supplier || !driver || !plate || !issueDate || !fuelAmount || !price) {
//           Swal.showValidationMessage('Please fill in all fields');
//           return false;
//         }

//         return { supplier, driver, plate, issueDate, fuelAmount, price };
//       },
//     }).then((result) => {
//       if (result.isConfirmed) {
//         console.log('Filling Info:', result.value);
//         Swal.fire({
//           icon: 'success',
//           title: 'Processed!',
//           text: 'Filling info submitted successfully.',
//         });
//       }
//     });
//   }


//   // for fetching current volume 
//   useEffect(() => {
//     if (typeof window === 'undefined') return;
  
//     const fetchMMToVolume = async () => {
//       const fuel_level_mm = totalFuel/100; // in mm
//       const water_level_mm = totalWater/100; // in mm
//       const tank_name = tank.name;
  
//       try {
//         const res = await fetch("/api/tanks/mm-to-volume", {
//           method: "POST",
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           credentials: "include",
//           body: JSON.stringify({ fuel_level_mm, tank_name, water_level_mm }),
//         });
  
//         if (!res.ok) {
//           console.error('Failed to fetch volume:', await res.text());
//           return;
//         }
  
//         const data = await res.json();
//         setCurrentVolume(data.data.fuel_volume || 0); // update with your expected return key
//       } catch (error) {
//         console.error("Error fetching volume:", error);
//       }
//     };
  
//     fetchMMToVolume();
//   }, [tank]);


// // for Tranlsations
// const lang = useSelector((state:RootState)=>state.language.language);

// const tankName = translate(tankHomeTranslations,lang,"tankName");
// const logging = translate(tankHomeTranslations,lang,"logging");
// const probe = translate(tankHomeTranslations,lang,"probe");
// const fillingInfo = translate(tankHomeTranslations,lang,"fillingInfo");
// const fuelType = translate(tankHomeTranslations,lang,"fuelType");
// const fuelCapacity = translate(tankHomeTranslations,lang,"fuelCapacity");
// const fuelLevel = translate(tankHomeTranslations,lang,"fuelLevel");
// const currentVolumee = translate(tankHomeTranslations,lang,"currentVolume");
// const temperature = translate(tankHomeTranslations,lang,"temperature");
// const probeInfo = translate(tankHomeTranslations,lang,"probeInformation")
// const avgTemperature = translate(tankHomeTranslations,lang,"avgTemperature");
// const waterLevel = translate(tankHomeTranslations,lang,"waterLevel");
// const fuelOffset = translate(tankHomeTranslations,lang,"fuelOffset");
// const waterOffset = translate(tankHomeTranslations,lang,"waterOffset");
// const mm = translate(tankHomeTranslations,lang,"mm");
// const liters = translate(tankHomeTranslations,lang,"liters");


// // for logging-toggle
// const [loggingToggle, setLoggingToggle] = useState("Disabled");
// const [enable, setEnable] = useState(false);

// // Update 'enable' whenever loggingToggle changes
// useEffect(() => {
//   setEnable(loggingToggle === "Disabled");
// }, [loggingToggle]);

// const handleLoggingClick = async (enable: boolean, tankId: number) => {
//   try {
//     const res = await fetch("/api/tanks/toggle_logging", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       credentials: "include",
//       body: JSON.stringify({
//         enabled: enable,
//         tankId: tankId,
//       }),
//     });

//     const data = await res.json();

//     if (data?.success) {
//       setLoggingToggle(enable ? "Enabled" : "Disabled");
//     } else {
//       console.error("Toggling failed:", data);
//     }
//   } catch (error) {
//     console.error("Error in toggling:", error);
//   }
// };


//   return (
//     <div className="w-full h-full p-5 flex flex-col border-2 border-gray-200 rounded-xl">
//       {/* Header */}
//       <div className="flex justify-between">
//         <div>
//           <h1 className={`text-lg font-extrabold ${tankName.className}`}>{tankName.text}: {tank.name}</h1>
//           <p 
//            onClick={() => handleLoggingClick(loggingToggle === "Disabled", tank.id)}
//            className={`text-lg mt-1 cursor-pointer ${logging.className} ${
//             loggingToggle === "Enabled" ? "text-green-600" : "text-red-600"
//            }`}
//           >{logging.text}: {loggingToggle}</p>
//         </div>
//         <ActionIcon variant="outline" rounded="full">
//           <PiSlidersHorizontalDuotone className="h-auto w-6" />
//         </ActionIcon>
//       </div>

//       {/* Pie Chart */}
//       <div className="flex w-full justify-between">
//         <div className="flex-1 h-[250px] flex justify-center items-center">
//           <ResponsiveContainer width={180}>
//             <PieChart>
//               <Pie
//                 data={data}
//                 cornerRadius={40}
//                 innerRadius={70}
//                 outerRadius={90}
//                 paddingAngle={10}
//                 fill="#BFDBFE"
//                 stroke="rgba(0,0,0,0)"
//                 dataKey="value"
//               >
//                 <Label
//                   width={30}
//                   position="center"
//                   content={
//                     <CustomLabel
//                       value1={usedPercentage.toFixed(2)}
//                       value2="Used %"
//                     />
//                   }
//                 />
//                 {data.map((_, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={COLORS[index % COLORS.length]}
//                   />
//                 ))}
//               </Pie>
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-col items-center justify-center gap-20">
//           <div
//             className="border-2 border-green-600 rounded-full px-4 p-1 cursor-pointer"
//             onClick={() => showProbeInfo(tank.probes)}
//           >
//             <p className={`font-bold text-sm ${probe.className}`}>{probe.text}</p>
//           </div>
//           <div
//             className="border-2 border-green-600 rounded-full px-4 p-1 cursor-pointer"
//             onClick={showFillingForm}
//           >
//             <p className={`font-bold text-sm ${fillingInfo.className}`}>{fillingInfo.text}</p>
//           </div>
//         </div>
//       </div>

//       {/* Tank Info */}
//       <div className="flex justify-between mt-5">
//         <div className="flex flex-col gap-12">
//           <InfoBlock icon={<PiFileTextDuotone />} title={fuelType.text} value={tank.product_name} className={fuelType.className} />
//           <InfoBlock icon={<PiFileTextDuotone />} title={fuelCapacity.text} value={`${tank.capacity} ${liters.text}`} className={fuelCapacity.className}/>
//           <InfoBlock icon={<PiFileTextDuotone />} title={fuelLevel.text} value={`${(totalFuel / 100).toFixed(2)} ${mm.text}`} className={fuelLevel.className} />
//         </div>
//         <div className="flex flex-col gap-12">
//           <InfoBlock  icon={<PiPulseDuotone />} title={currentVolumee.text} value={currentVolume} className={currentVolumee.className} />
//           <InfoBlock icon={<PiPulseDuotone />} title={fuelLevel.text} value={`${(totalFuel / 100).toFixed(2)} ${mm.text}`} className={fuelLevel.className} />
//           <InfoBlock icon={<PiPulseDuotone />} title={temperature.text} value={`${avgTemp} °C`} className={temperature.className}/>
//         </div>
//       </div>
//     </div>
//   );
// }

// function InfoBlock({ icon, title, value,className }: { icon: React.ReactNode; title: string; value: string|number,className:string }) {
//   return (
//     <div className="flex gap-3">
//       <div className="flex items-center justify-center w-10 h-12 p-1 bg-red-100 rounded-md text-red-500 text-3xl">
//         {icon}
//       </div>
//       <div className="flex flex-col gap-1">
//         <p className={`font-semibold ${className}`}>{title}</p>
//         <p className="font-extrabold text-sm lg:text-lg text-slate-950">{value}</p>
//       </div>
//     </div>
//   );
// }

// function CustomLabel(props: any) {
//   const { cx, cy } = props.viewBox;
//   return (
//     <>
//       <text
//         x={cx}
//         y={cy - 5}
//         fill="#111111"
//         className="recharts-text recharts-label"
//         textAnchor="middle"
//         dominantBaseline="central"
//       >
//         <tspan alignmentBaseline="middle" fontSize="36px">
//           {props.value1}%
//         </tspan>
//       </text>
//       <text
//         x={cx}
//         y={cy + 20}
//         fill="#666666"
//         className="recharts-text recharts-label"
//         textAnchor="middle"
//         dominantBaseline="central"
//       >
//         <tspan fontSize="14px">{props.value2}</tspan>
//       </text>
//     </>
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
      <div className="gauge-header">
        <Badge className="name-badge" id="NameBadge">
          {tank_name}
        </Badge>
        <div
          className="toggle-details cursor-pointer flex items-center justify-center 
                    w-8 h-8 rounded-full bg-gray-100 text-gray-600 shadow-sm 
                    hover:bg-gray-200 hover:text-gray-800 active:scale-95 
                    transition duration-200"
          onClick={toggleDetails}
          title={showDetails ? "Hide details" : "Show details"}
        >
          <i className={`fas fa-chevron-${showDetails ? "up" : "down"} text-sm`}></i>
        </div>
      </div>

      <div className="gauge-content">
        <div className="gauge-container">
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
          <div className="gauge-summary">
            <Badge className="product-badge" id="ProductBadge">
              {product_name}
            </Badge>
            <div className="volume-info">
              <span>
                {safeFuelVolume} / {safeCapacity} L
              </span>
            </div>
          </div>
        </div>

        {showDetails && (
          <div className="details-section">
            <div className="details-grid">
              <Badge className="details-badge">
                Capacity: {safeCapacity.toLocaleString()} L
              </Badge>
              <Badge className="details-badge">
                Current: {safeFuelVolume.toLocaleString()} L
              </Badge>
              <Badge className="details-badge">
                @15°C: {fuel_volume_15?.toLocaleString() ?? 0} L
              </Badge>
              <Badge className="details-badge">
                Water: {water_volume?.toLocaleString() ?? 0} L
              </Badge>
              <Badge className="details-badge">
                Temp: {average_temp ?? 0}°C
              </Badge>
              <Badge className="details-badge">Probe ID: {probe_id}</Badge>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
