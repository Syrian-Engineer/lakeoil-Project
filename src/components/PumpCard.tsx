// "use client";

// import { useEffect, useState, useRef } from "react";

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
//   const [isConnected, setIsConnected] = useState(false);

//   const socketRef = useRef<WebSocket | null>(null);

//   useEffect(() => {
//     if (!isConnected) {
//       socketRef.current?.close();
//       socketRef.current = null;
//       setPumps([]);
//       return;
//     }

//     const socket = new WebSocket(station_url);
//     socketRef.current = socket;

//     socket.onopen = () => {
//       console.log("✅ WebSocket connected");
//     };

//     socket.onmessage = (e) => {
//       try {
//         const data = JSON.parse(e.data);

//         // 🟢 HANDLE NOZZLE STATUS (SOURCE OF TRUTH)
//         if (data.event === "nozzle_status") {
//           const {
//             id,
//             nozzle_status,
//             pumpName,
//             product,
//             price,
//             transactionId,
//           } = data;

//           if (nozzle_status === 0) {
//             // ✅ ADD pump when filling starts
//             setPumps((prev) => {
//               const exists = prev.find((p) => p.id === id);
//               if (exists) return prev;

//               return [
//                 ...prev,
//                 {
//                   id,
//                   pumpName: pumpName || "",
//                   product: product || "",
//                   nozzle_status,
//                   transactionId,
//                   price: price || 0,
//                   volume: 0,
//                   amount: 0,
//                   active: true,
//                 },
//               ].sort((a, b) => a.id - b.id);
//             });
//           } else if (nozzle_status === 1) {
//             // ❌ REMOVE pump when filling stops
//             setPumps((prev) => prev.filter((p) => p.id !== id));
//           }

//           return; // 🚨 stop here (avoid conflict with filling_info)
//         }

//         // 🔵 UPDATE ONLY (no creation here)
//         if (data.event === "filling_info") {
//           const { id, volume, amount, price, product } = data;

//           setPumps((prev) =>
//             prev
//               .map((p) =>
//                 p.id === id
//                   ? {
//                       ...p,
//                       volume: volume ?? p.volume,
//                       amount: amount ?? p.amount,
//                       price: price ?? p.price,
//                       product: product ?? p.product,
//                       active: true,
//                     }
//                   : p
//               )
//               .sort((a, b) => a.id - b.id)
//           );
//         }
//       } catch (err) {
//         console.error("Parse error:", err);
//       }
//     };

//     socket.onerror = (err) => {
//       console.error("WebSocket error:", err);
//     };

//     socket.onclose = () => {
//       console.log("❌ WebSocket disconnected");
//     };

//     return () => {
//       socket.close();
//     };
//   }, [isConnected, station_url]);

//   return (
//     <div className="min-h-screen bg-neutral-100 p-8">
//       {/* 🔘 CONNECT BUTTON */}
//       <div className="mb-6 flex items-center gap-4">
//         <button
//           onClick={() => setIsConnected((prev) => !prev)}
//           className={`px-4 py-2 rounded font-semibold ${
//             isConnected
//               ? "bg-red-600 text-white"
//               : "bg-green-600 text-white"
//           }`}
//         >
//           {isConnected ? "Disconnect" : "Connect"}
//         </button>

//         <span className="text-sm">
//           {isConnected ? (
//             <span className="text-green-600">● Live</span>
//           ) : (
//             <span className="text-gray-400">● Offline</span>
//           )}
//         </span>
//       </div>

//       {/* 🧾 ACTIVE PUMPS */}
//       {isConnected && pumps.length === 0 && (
//         <div className="text-gray-500 text-center mt-10">
//           No active pumps...
//         </div>
//       )}

//       {isConnected && pumps.length > 0 && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {pumps.map((pump) => (
//             <PumpUI key={pump.id} pump={pump} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// function PumpUI({ pump }: { pump: Pump }) {
//   return (
//     <div
//       className={`relative bg-black p-5 rounded-xl shadow-2xl border-4 w-full max-w-[320px] mx-auto transition-all duration-300 hover:scale-[1.02]
//         ${
//           pump.active
//             ? "border-lime-400 shadow-[0_0_25px_#84cc16] animate-pulse"
//             : "border-neutral-700"
//         }`}
//     >
//       {/* 🔥 LIVE DOT */}
//       <div className="absolute top-2 right-2 flex items-center gap-1">
//         <span className="h-2 w-2 bg-green-400 rounded-full animate-ping"></span>
//         <span className="h-2 w-2 bg-green-400 rounded-full"></span>
//       </div>

//       {/* HEADER */}
//       <div className="text-center text-white text-sm mb-4 tracking-widest">
//         {pump.pumpName.toUpperCase()}
//       </div>

//       {/* STATUS */}
//       <div className="text-center mb-3">
//         <span className="text-xs px-2 py-1 rounded bg-green-600 text-white animate-pulse">
//           FILLING
//         </span>
//       </div>

//       {/* TOTAL */}
//       <div className="mb-3">
//         <div className="text-xs text-neutral-400 mb-1">TOTAL</div>
//         <div className="bg-lime-400 text-black font-mono text-3xl text-right px-3 py-2 rounded animate-pulse shadow-[0_0_15px_#84cc16]">
//           {pump.amount.toFixed(2)}
//         </div>
//       </div>

//       {/* LITERS */}
//       <div className="mb-3">
//         <div className="text-xs text-neutral-400 mb-1">LITERS</div>
//         <div className="bg-lime-400 text-black font-mono text-3xl text-right px-3 py-2 rounded animate-pulse shadow-[0_0_15px_#84cc16]">
//           {pump.volume.toFixed(2)}
//         </div>
//       </div>

//       {/* PRICE */}
//       <div className="mb-3">
//         <div className="text-xs text-neutral-400 mb-1">PRICE / L</div>
//         <div className="bg-lime-400 text-black font-mono text-2xl text-right px-3 py-2 rounded shadow-[0_0_10px_#84cc16]">
//           {pump.price.toFixed(2)}
//         </div>
//       </div>

//       {/* PRODUCT */}
//       <div className="text-center mt-3 text-sm text-neutral-300">
//         {pump.product}
//       </div>
//     </div>
//   );
// }










"use client";

import { useEffect, useState, useRef } from "react";
import PumpDisplay from "./PumpDisplay";

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
  const [isConnected, setIsConnected] = useState(false);

  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!isConnected) {
      socketRef.current?.close();
      socketRef.current = null;
      setPumps([]);
      return;
    }

    const socket = new WebSocket(station_url);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    socket.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);

        // 🟢 HANDLE NOZZLE STATUS (SOURCE OF TRUTH)
        if (data.event === "nozzle_status") {
          const {
            id,
            nozzle_status,
            pumpName,
            product,
            price,
            transactionId,
          } = data;

          if (nozzle_status === 0) {
            // ✅ ADD pump when filling starts
            setPumps((prev) => {
              const exists = prev.find((p) => p.id === id);
              if (exists) return prev;

              return [
                ...prev,
                {
                  id,
                  pumpName: pumpName || "",
                  product: product || "",
                  nozzle_status,
                  transactionId,
                  price: price || 0,
                  volume: 0,
                  amount: 0,
                  active: true,
                },
              ].sort((a, b) => a.id - b.id);
            });
          } else if (nozzle_status === 1) {
            // ❌ REMOVE pump when filling stops
            setPumps((prev) => prev.filter((p) => p.id !== id));
          }

          return; // 🚨 stop here (avoid conflict with filling_info)
        }

        // 🔵 UPDATE ONLY (no creation here)
        if (data.event === "filling_info") {
          const { id, volume, amount, price, product } = data;

          setPumps((prev) =>
            prev
              .map((p) =>
                p.id === id
                  ? {
                      ...p,
                      volume: volume ?? p.volume,
                      amount: amount ?? p.amount,
                      price: price ?? p.price,
                      product: product ?? p.product,
                      active: true,
                    }
                  : p
              )
              .sort((a, b) => a.id - b.id)
          );
        }
      } catch (err) {
        console.error("Parse error:", err);
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    socket.onclose = () => {
      console.log("❌ WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, [isConnected, station_url]);

  return (
    <div className="min-h-screen bg-neutral-100 p-8">
      {/* 🔘 CONNECT BUTTON */}
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => setIsConnected((prev) => !prev)}
          className={`px-4 py-2 rounded font-semibold ${
            isConnected
              ? "bg-red-600 text-white"
              : "bg-green-600 text-white"
          }`}
        >
          {isConnected ? "Disconnect" : "Connect"}
        </button>

        <span className="text-sm">
          {isConnected ? (
            <span className="text-green-600">● Live</span>
          ) : (
            <span className="text-gray-400">● Offline</span>
          )}
        </span>
      </div>

      {/* 🧾 ACTIVE PUMPS */}
      {isConnected && pumps.length === 0 && (
        <div className="text-gray-500 text-center mt-10">
          No active pumps...
        </div>
      )}

      {isConnected && pumps.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pumps.map((pump) => (
            <PumpDisplay key={pump.id} pump={pump} />
          ))}
        </div>
      )}
    </div>
  );
}