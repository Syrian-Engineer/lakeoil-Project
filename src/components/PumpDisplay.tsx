// with google fonts 
// "use client";

// import { Pump } from "./PumpCard";
// import { Orbitron } from "next/font/google";

// const orbitron = Orbitron({
//   subsets: ["latin"],
//   weight: ["500", "700"],
// });

// export default function PumpDisplay({ pump }: { pump: Pump }) {
//   return (
//     <div className="bg-[#0a0f1c] rounded-xl p-5 w-full max-w-[300px] border border-gray-700 shadow-xl">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-3">
//         <h2 className="text-gray-300 text-sm font-semibold">
//           {pump.pumpName}
//         </h2>

//         <span className="text-[10px] px-2 py-1 rounded-full border border-green-400 text-green-400">
//           NOZZLE_STATUS
//         </span>
//       </div>

//       {/* PRODUCT */}
//       <div className="mb-3">
//         <span className="text-xs px-2 py-1 rounded-full bg-blue-900 text-blue-300">
//           {pump.product}
//         </span>
//       </div>

//       {/* DISPLAY */}
//       <div className="bg-black rounded-lg p-4 space-y-4 border border-gray-800">

//         {/* AMOUNT */}
//         <div>
//           <p className="text-xs text-gray-500">AMOUNT</p>
//           <p className={`${orbitron.className} text-4xl text-green-400 tracking-[0.12em] text-right leading-none drop-shadow-[0_0_8px_rgba(34,197,94,0.9)]`}>
//             {pump.amount.toFixed(2)}
//           </p>
//         </div>

//         {/* VOLUME */}
//         <div>
//           <p className="text-xs text-gray-500">VOLUME</p>
//           <p className={`${orbitron.className} text-3xl text-cyan-400 tracking-[0.12em] text-right leading-none drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]`}>
//             {pump.volume.toFixed(2)}
//           </p>
//         </div>

//         {/* PRICE */}
//         <div>
//           <p className="text-xs text-gray-500">UNIT PRICE</p>
//           <p className={`${orbitron.className} text-2xl text-yellow-400 tracking-[0.12em] text-right leading-none drop-shadow-[0_0_8px_rgba(250,204,21,0.9)]`}>
//             {pump.price.toFixed(3)}
//           </p>
//         </div>
//       </div>

//       {/* STATUS */}
//       <div className="mt-4 text-center">
//         <span className="text-xs px-3 py-1 rounded bg-green-600 text-white animate-pulse">
//           FILLING
//         </span>
//       </div>
//     </div>
//   );
// }


"use client";

import { Pump } from "./PumpCard";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "700"],
});

export default function PumpDisplay({ pump }: { pump: Pump }) {
  return (
    <div className="bg-[#0b0f1a] rounded-lg p-4 w-full max-w-[320px] border border-gray-700 shadow-lg">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-gray-400 text-xs tracking-wider">
          {pump.pumpName}
        </span>
        <span className="text-green-400 text-xs">LIVE</span>
      </div>

      {/* SCREEN */}
      <div className="bg-black border border-gray-800 rounded-md overflow-hidden">

        {/* AMOUNT */}
        <div className="flex justify-between items-center px-3 py-2 border-b border-gray-800">
          <span className="text-gray-500 text-xs">AMOUNT</span>
          <span
            className={`${orbitron.className} text-green-400 text-3xl tabular-nums tracking-tight`}
          >
            {pump.amount.toFixed(2)}
          </span>
        </div>

        {/* VOLUME */}
        <div className="flex justify-between items-center px-3 py-2 border-b border-gray-800">
          <span className="text-gray-500 text-xs">VOLUME</span>
          <span
            className={`${orbitron.className} text-cyan-400 text-2xl tabular-nums tracking-tight`}
          >
            {pump.volume.toFixed(2)}
          </span>
        </div>

        {/* PRICE */}
        <div className="flex justify-between items-center px-3 py-2">
          <span className="text-gray-500 text-xs">UNIT PRICE</span>
          <span
            className={`${orbitron.className} text-yellow-400 text-xl tabular-nums tracking-tight`}
          >
            {pump.price.toFixed(3)}
          </span>
        </div>
      </div>

      {/* PRODUCT */}
      <div className="mt-3 text-center">
        <span className="text-xs text-gray-400">{pump.product}</span>
      </div>

      {/* STATUS */}
      <div className="mt-2 text-center">
        <span className="text-[10px] px-2 py-1 bg-green-600 text-white rounded">
          FILLING
        </span>
      </div>
    </div>
  );
}