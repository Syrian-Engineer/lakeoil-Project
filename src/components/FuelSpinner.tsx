
"use client";

import { PiGasPumpBold } from "react-icons/pi";
interface Props{
    word:string
}
export default function FuelSpinner({word}:Props) {
  return (
    <div className="flex flex-col items-center justify-center h-48 w-48 relative">
      {/* Spinner Container */}
      <div className="relative flex items-center justify-center">
        {/* Outer segmented ring */}
        <div className="w-28 h-28 rounded-full border-[6px] border-gray-800 border-t-gray-400 border-b-gray-700 animate-spin-slow" />

        {/* Optional subtle inner ring for depth */}
        <div className="absolute w-28 h-28 rounded-full border border-gray-700" />

        {/* Center gas pump icon */}
        <div className="absolute text-gray-300">
          <PiGasPumpBold size={32} />
        </div>
      </div>

      {/* Loading text */}
      <p className="mt-5 text-sm font-medium text-gray-400 tracking-wide">
        {word}...
      </p>
    </div>
  );
}

