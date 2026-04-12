"use client";

import { useEffect, useState, useRef } from "react";
import PumpDisplay from "./PumpDisplay";
import gsap from "gsap";

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

  // 🔥 GSAP refs
  const liveDotRef = useRef<HTMLSpanElement>(null);
  const liveTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isConnected) {
      socketRef.current?.close();
      socketRef.current = null;
      setPumps([]);

      // stop animations when disconnected
      gsap.killTweensOf([liveDotRef.current]);

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
            setPumps((prev) => prev.filter((p) => p.id !== id));
          }

          return;
        }

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

    // 🔥 ONLY pulsing dot animation (no vibration)
    gsap.to(liveDotRef.current, {
      scale: 1.6,
      opacity: 0.3,
      duration: 0.7,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    return () => {
      socket.close();
      gsap.killTweensOf([liveDotRef.current]);
    };
  }, [isConnected, station_url]);

  return (
    <div className="bg-[#131b30] p-8 rounded-md">
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

        {/* 🔥 LIVE INDICATOR */}
        <span className="text-sm">
          {isConnected ? (
            <div className="flex items-center gap-2 text-green-400">
              <span
                ref={liveDotRef}
                className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#22c55e]"
              />
              <span ref={liveTextRef} className="font-semibold">
                Live
              </span>
            </div>
          ) : (
            <span className="text-gray-400">🔴 Offline</span>
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