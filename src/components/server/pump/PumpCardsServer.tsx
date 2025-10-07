




// import PumpCardsGrid from "@/app/pumps/component/PumpCardsGrid";
// import { headers } from 'next/headers';

// export interface Pump {
//   id: number;
//   name: string;
//   code: number;
//   approval: number;
//   virtual_totalizer: number;
//   mechanical_totalizer: number;
//   is_connected: number;
//   is_disconnected: number;
// }

// export default async function PumpCardsServer() {

//   const cookie = (await headers()).get('cookie');

//   const res = await fetch('http://central.oktin.ak4tek.com:3950/pumps/getall', {
//     headers:{
//         cookie:cookie||""
//     },
//     credentials: 'include', // include this just in case your backend expects it
//     cache: 'no-store',
//   });

//   if (!res.ok) {
//     console.error('❌ Backend fetch failed with status:', res.status);
//     return <div>Failed to load pump data.</div>;
//   }

//   const data = await res.json();
//   const pumps: Pump[] = data?.data?.page_records || [];

//   return <PumpCardsGrid pumps={pumps} />;
// }
"use client";

import { useEffect, useState } from "react";

interface Pump {
  id: number;
  pumpName?: string;
  product?: string;
  price?: number;
  nozzle_status?: number;
  transactionId?: number;
  is_connected?: number;
  // filling info
  amount?: number;
  volume?: number;
  isFilling?: boolean; // track filling state
}

export default function PumpDashboard() {
  const [pumps, setPumps] = useState<Record<number, Pump>>({});

  useEffect(() => {
    const socket = new WebSocket("ws://fursan.oktin.ak4tek.com:8080");

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    socket.onmessage = (msg) => {
      const data = JSON.parse(msg.data);

      setPumps((prev) => {
        const updated = { ...prev };

        // 🟢 Pump status
        if (data.event === "pump_status") {
          if (data.is_connected === 1) {
            updated[data.id] = { ...updated[data.id], id: data.id, is_connected: 1 };
          } else {
            delete updated[data.id]; // remove card only if disconnected
          }
        }

        // 🟠 Nozzle status
        if (data.event === "nozzle_status" && updated[data.id]) {
          updated[data.id] = { ...updated[data.id], ...data };

          // Reset filling state if nozzle back to idle
          if (data.nozzle_status === 0) {
            updated[data.id].isFilling = false;
            updated[data.id].amount = undefined;
            updated[data.id].volume = undefined;
          }
        }

        // 🟢 Filling info
        if (data.event === "filling_info" && updated[data.id]) {
          updated[data.id] = {
            ...updated[data.id],
            ...data,
            isFilling: true, // mark as filling
          };
        }

        return updated;
      });
    };

    socket.onclose = () => {
      console.log("❌ WebSocket closed");
    };

    return () => socket.close();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {Object.values(pumps).map((pump) => {
        // ✅ Border priority: filling > nozzle > default
        let borderColor = "border-gray-200";
        if (pump.isFilling) borderColor = "border-green-500";
        else if (pump.nozzle_status === 1) borderColor = "border-orange-500";

        return (
          <div
            key={pump.id}
            className={`rounded-xl shadow-lg p-4 border-4 ${borderColor}`}
          >
            <h2 className="font-bold text-lg">Pump {pump.id}</h2>
            {pump.pumpName && <p>Name: {pump.pumpName}</p>}
            {pump.product && <p>Product: {pump.product}</p>}
            {pump.price && <p>Price: {pump.price}</p>}
            {pump.transactionId && <p>Txn: {pump.transactionId}</p>}
            <p>Status: {pump.is_connected === 1 ? "🟢 Connected" : "🔴 Disconnected"}</p>

            {/* Filling Info */}
            {pump.isFilling && (
              <div className="mt-2 bg-green-50 p-2 rounded">
                <p>Amount: {pump.amount}</p>
                <p>Volume: {pump.volume}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

