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




"use client";

import { useEffect, useState, useRef } from "react";
import Pump from "./Pump";

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
  const wsRef = useRef<WebSocket | null>(null);

  // 🔥 Normalize WebSocket URL properly
  function normalizeWsUrl(url: string) {
    if (!url) return null;

    let formatted = url.trim();

    // Remove accidental leading slash
    if (formatted.startsWith("/")) {
      formatted = formatted.slice(1);
    }

    // Add ws:// if missing
    if (!formatted.startsWith("ws://") && !formatted.startsWith("wss://")) {
      formatted = `ws://${formatted}`;
    }

    // Add default port if not provided
    if (!formatted.match(/:\d+$/)) {
      formatted = `${formatted}:8080`;
    }

    return formatted;
  }

  useEffect(() => {
    if (!station_url) return;

    const wsUrl = normalizeWsUrl(station_url);
    if (!wsUrl) return;

    console.log("🔌 Connecting to WebSocket:", wsUrl);

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("✅ Connected to:", wsUrl);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        // 🟢 Handle nozzle status (0 = start, 1 = stop)
        if (data.event === "nozzle_status") {
          const {
            id,
            nozzle_status,
            pumpName,
            price,
            product,
            transactionId,
          } = data;

          if (nozzle_status === 0) {
            // Start filling — add pump if not already in list
            setPumps((prev) => {
              const exists = prev.find((p) => p.id === id);
              if (exists) return prev;

              return [
                ...prev,
                {
                  id,
                  pumpName,
                  product,
                  nozzle_status,
                  transactionId,
                  price,
                  volume: 0,
                  amount: 0,
                  active: true,
                },
              ];
            });
          } else if (nozzle_status === 1) {
            // Stop filling — remove pump from UI
            setPumps((prev) => prev.filter((p) => p.id !== id));
          }
        }

        // 🟢 Handle ongoing filling info
        else if (data.event === "filling_info") {
          const { id, volume, amount, price, product } = data;

          setPumps((prev) =>
            prev.map((p) =>
              p.id === id
                ? { ...p, volume, amount, price, product, active: true }
                : p
            )
          );
        }
      } catch (err) {
        console.error("Error parsing message:", err);
      }
    };

    ws.onclose = () => {
      console.warn("❌ Disconnected from:", wsUrl);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, [station_url]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {pumps.map((pump) => (
        <Pump key={pump.id} pump={pump} />
      ))}
    </div>
  );
}