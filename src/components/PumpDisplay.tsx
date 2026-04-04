"use client";

import { Pump } from "./PumpCard";

export default function PumpDisplay({ pump }: { pump: Pump }) {
  return (
    <div className="bg-black rounded-2xl p-6 w-full max-w-[320px] mx-auto shadow-2xl border border-gray-800">

      {/* 🔹 PUMP NAME */}
      <div className="text-center text-gray-300 text-sm tracking-widest mb-4">
        {pump.pumpName.toUpperCase()}
      </div>

      {/* 🔹 SCREEN */}
      <div className="bg-[#dff6ff] rounded-lg p-4 shadow-inner">

        {/* TOTAL */}
        <div className="mb-4">
          <div className="text-xs text-gray-600">TOTAL</div>
          <div className="text-4xl font-mono text-right tracking-widest text-black">
            {pump.amount.toFixed(2)}
          </div>
        </div>

        {/* LITERS */}
        <div className="mb-4">
          <div className="text-xs text-gray-600">LITERS</div>
          <div className="text-3xl font-mono text-right tracking-widest text-black">
            {pump.volume.toFixed(2)}
          </div>
        </div>

        {/* PRICE */}
        <div>
          <div className="text-xs text-gray-600">PRICE / L</div>
          <div className="text-2xl font-mono text-right tracking-widest text-black">
            {pump.price.toFixed(3)}
          </div>
        </div>
      </div>

      {/* 🔹 PRODUCT */}
      <div className="text-center text-gray-400 mt-4 text-sm">
        {pump.product}
      </div>

      {/* 🔹 STATUS */}
      <div className="mt-3 text-center">
        <span className="text-xs px-3 py-1 rounded bg-green-600 text-white animate-pulse">
          FILLING
        </span>
      </div>
    </div>
  );
}