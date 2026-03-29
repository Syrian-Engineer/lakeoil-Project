// "use client";

// import { useEffect, useState, useRef } from "react";
// import Pump from "./Pump";

// interface Props {
//   station_url: string;
// }

// export interface Pump {
//   id: number;
//   pumpName: string;
//   product: string;
//   nozzle_status: number;
//   transactionId?: number;
//   price: number;
//   volume: number;
//   amount: number;
//   active: boolean;
// }

//   const mockPumps: Pump[] = [
//     {
//       id: 1,
//       pumpName: "Pump 1",
//       product: "Diesel",
//       nozzle_status: 1,
//       transactionId: 1011,
//       price: 2.45,
//       volume: 15.23,
//       amount: 37.34,
//       active: true,
//     },
//     {
//       id: 2,
//       pumpName: "Pump 2",
//       product: "Gasoline 95",
//       nozzle_status: 0,
//       price: 2.33,
//       volume: 0,
//       amount: 0,
//       active: false,
//     },
//     {
//       id: 3,
//       pumpName: "Pump 3",
//       product: "Gasoline 91",
//       nozzle_status: 1,
//       transactionId: 2022,
//       price: 2.18,
//       volume: 8.75,
//       amount: 19.07,
//       active: true,
//     },
//     {
//       id: 4,
//       pumpName: "Pump 4",
//       product: "Diesel Premium",
//       nozzle_status: 0,
//       price: 2.60,
//       volume: 0,
//       amount: 0,
//       active: false,
//     },
//   ];

// export default function PumpCard({ station_url }: Props) {
//   const [pumps, setPumps] = useState<Pump[]>([]);
//   const wsRef = useRef<WebSocket | null>(null);

//   useEffect(() => {
//     console.log("Station Url : " , station_url)
//     const ws = new WebSocket(station_url);
//     wsRef.current = ws;
//     // station_url = "ws://10.8.0.12:8080/"
    
//     ws.onopen = () => {
//       console.log("✅ Connected to:", station_url);
//     };

//     ws.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);

//         // 🟢 Handle nozzle status (0 = start, 1 = stop)
//         if (data.event === "nozzle_status") {
//           const {
//             id,
//             nozzle_status,
//             pumpName,
//             price,
//             product,
//             transactionId,
//           } = data;

//           if (nozzle_status === 0) {
//             // Start filling — add pump if not already in list
//             setPumps((prev) => {
//               const exists = prev.find((p) => p.id === id);
//               if (exists) return prev;
//               return [
//                 ...prev,
//                 {
//                   id,
//                   pumpName,
//                   product,
//                   nozzle_status,
//                   transactionId,
//                   price,
//                   volume: 0,
//                   amount: 0,
//                   active: true,
//                 },
//               ];
//             });
//           } else if (nozzle_status === 1) {
//             // Stop filling — remove pump from UI
//             setPumps((prev) => prev.filter((p) => p.id !== id));
//           }
//         }

//         // 🟢 Handle ongoing filling info
//         else if (data.event === "filling_info") {
//           const { id, volume, amount, price, product } = data;

//           setPumps((prev) =>
//             prev.map((p) =>
//               p.id === id
//                 ? { ...p, volume, amount, price, product, active: true }
//                 : p
//             )
//           );
//         }
//       } catch (err) {
//         console.error("Error parsing message:", err);
//       }
//     };

//     ws.onclose = () => {
//       console.warn("❌ Disconnected from:", station_url);
//     };

//     ws.onerror = (error) => {
//       console.error("WebSocket error:", error);
//     };

//     return () => {
//       ws.close();
//     };
//   }, [station_url]);

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {pumps.map(pump => <Pump key={pump.id} pump={pump} />)}
//     </div>
//   );
// }




// "use client";

// import { useEffect, useState, useRef } from "react";
// import Pump from "./Pump";

// interface Props {
//   station_url: string;
// }

// export interface Pump {
//   id: number;
//   pumpName: string;
//   product: string;
//   nozzle_status: number;
//   transactionId?: number;
//   price: number;
//   volume: number;
//   amount: number;
//   active: boolean;
// }

// export default function PumpCard({ station_url }: Props) {
//   const [pumps, setPumps] = useState<Pump[]>([]);
//   const wsRef = useRef<WebSocket | null>(null);

//   // 🔥 Normalize WebSocket URL properly
//   function normalizeWsUrl(url: string) {
//     if (!url) return null;

//     let formatted = url.trim();

//     // Remove accidental leading slash
//     if (formatted.startsWith("/")) {
//       formatted = formatted.slice(1);
//     }

//     // Add ws:// if missing
//     if (!formatted.startsWith("ws://") && !formatted.startsWith("wss://")) {
//       formatted = `ws://${formatted}`;
//     }

//     // Add default port if not provided
//     if (!formatted.match(/:\d+$/)) {
//       formatted = `${formatted}:8080`;
//     }

//     return formatted;
//   }

//   useEffect(() => {
//     if (!station_url) return;

//     const wsUrl = normalizeWsUrl(station_url);
//     if (!wsUrl) return;

//     console.log("🔌 Connecting to WebSocket:", wsUrl);

//     const ws = new WebSocket(wsUrl);
//     wsRef.current = ws;

//     ws.onopen = () => {
//       console.log("✅ Connected to:", wsUrl);
//     };

//     ws.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);

//         // 🟢 Handle nozzle status (0 = start, 1 = stop)
//         if (data.event === "nozzle_status") {
//           const {
//             id,
//             nozzle_status,
//             pumpName,
//             price,
//             product,
//             transactionId,
//           } = data;

//           if (nozzle_status === 0) {
//             // Start filling — add pump if not already in list
//             setPumps((prev) => {
//               const exists = prev.find((p) => p.id === id);
//               if (exists) return prev;

//               return [
//                 ...prev,
//                 {
//                   id,
//                   pumpName,
//                   product,
//                   nozzle_status,
//                   transactionId,
//                   price,
//                   volume: 0,
//                   amount: 0,
//                   active: true,
//                 },
//               ];
//             });
//           } else if (nozzle_status === 1) {
//             // Stop filling — remove pump from UI
//             setPumps((prev) => prev.filter((p) => p.id !== id));
//           }
//         }

//         // 🟢 Handle ongoing filling info
//         else if (data.event === "filling_info") {
//           const { id, volume, amount, price, product } = data;

//           setPumps((prev) =>
//             prev.map((p) =>
//               p.id === id
//                 ? { ...p, volume, amount, price, product, active: true }
//                 : p
//             )
//           );
//         }
//       } catch (err) {
//         console.error("Error parsing message:", err);
//       }
//     };

//     ws.onclose = () => {
//       console.warn("❌ Disconnected from:", wsUrl);
//     };

//     ws.onerror = (error) => {
//       console.error("WebSocket error:", error);
//     };

//     return () => {
//       ws.close();
//     };
//   }, [station_url]);

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {pumps.map((pump) => (
//         <Pump key={pump.id} pump={pump} />
//       ))}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";

interface Props {
  station_url: string;
}

export interface Pump {
  id: number;
  pumpName: string;
  product: string;
  nozzle_status: number;
  transactionId?: number;
  price: number;
  volume: number;
  amount: number;
  active: boolean;
}

export default function PumpCard({ station_url }: Props) {
  const [pumps, setPumps] = useState<Pump[]>([]);

  const USE_MOCK = true;

  // ✅ MOCK DATA INIT
  useEffect(() => {
    if (!USE_MOCK) return;

    const mockPumps: Pump[] = [
      {
        id: 1,
        pumpName: "Pump 1",
        product: "Diesel",
        nozzle_status: 0,
        price: 1.65,
        volume: 0,
        amount: 0,
        active: true,
      },
      {
        id: 2,
        pumpName: "Pump 2",
        product: "Petrol",
        nozzle_status: 0,
        price: 1.72,
        volume: 0,
        amount: 0,
        active: true,
      },
      {
        id: 3,
        pumpName: "Pump 3",
        product: "Premium",
        nozzle_status: 0,
        price: 1.85,
        volume: 0,
        amount: 0,
        active: true,
      },
    ];

    setPumps(mockPumps);
  }, []);

  // ✅ SIMULATE FILLING
  useEffect(() => {
    if (!USE_MOCK) return;

    const interval = setInterval(() => {
      setPumps((prev) =>
        prev.map((pump) => {
          if (!pump.active) return pump;

          const volume = +(pump.volume + 0.03).toFixed(2);
          const amount = +(volume * pump.price).toFixed(2);

          return {
            ...pump,
            volume,
            amount,
          };
        })
      );
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // ✅ RANDOM START/STOP
  useEffect(() => {
    if (!USE_MOCK) return;

    const toggle = setInterval(() => {
      setPumps((prev) =>
        prev.map((p) => ({
          ...p,
          active: Math.random() > 0.3,
        }))
      );
    }, 5000);

    return () => clearInterval(toggle);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-100 p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {pumps.map((pump) => (
          <PumpUI key={pump.id} pump={pump} />
        ))}
      </div>
    </div>
  );
}

function PumpUI({ pump }: { pump: Pump }) {
  return (
    <div className="bg-black p-5 rounded-xl shadow-2xl border-4 border-neutral-700 w-full max-w-[320px] mx-auto transition hover:scale-[1.02]">

      {/* HEADER */}
      <div className="text-center text-white text-sm mb-4 tracking-widest">
        {pump.pumpName.toUpperCase()}
      </div>

      {/* STATUS */}
      <div className="text-center mb-3">
        <span
          className={`text-xs px-2 py-1 rounded ${
            pump.active
              ? "bg-green-600 text-white"
              : "bg-neutral-600 text-neutral-300"
          }`}
        >
          {pump.active ? "FILLING" : "IDLE"}
        </span>
      </div>

      {/* TOTAL */}
      <div className="mb-3">
        <div className="text-xs text-neutral-400 mb-1">TOTAL</div>
        <div
          className={`bg-lime-400 text-black font-mono text-3xl text-right px-3 py-2 rounded shadow-[0_0_10px_#84cc16] ${
            pump.active ? "animate-pulse" : ""
          }`}
        >
          {pump.amount.toFixed(2)}
        </div>
      </div>

      {/* LITERS */}
      <div className="mb-3">
        <div className="text-xs text-neutral-400 mb-1">LITERS</div>
        <div
          className={`bg-lime-400 text-black font-mono text-3xl text-right px-3 py-2 rounded shadow-[0_0_10px_#84cc16] ${
            pump.active ? "animate-pulse" : ""
          }`}
        >
          {pump.volume.toFixed(2)}
        </div>
      </div>

      {/* PRICE */}
      <div className="mb-3">
        <div className="text-xs text-neutral-400 mb-1">PRICE / L</div>
        <div className="bg-lime-400 text-black font-mono text-2xl text-right px-3 py-2 rounded shadow-[0_0_10px_#84cc16]">
          {pump.price.toFixed(2)}
        </div>
      </div>

      {/* PRODUCT */}
      <div className="text-center mt-3 text-sm text-neutral-300">
        {pump.product}
      </div>
    </div>
  );
}