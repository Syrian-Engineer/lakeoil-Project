// 'use client';

// import { motion } from 'framer-motion';
// import { PiGasPumpBold } from 'react-icons/pi'

// export default function StationSpinner() {
//   return (
//     <div className="flex flex-col items-center justify-center h-40 gap-3 text-gray-400">
//       {/* Animated outer ring */}
//       <motion.div
//         className="relative w-16 h-16"
//         animate={{ rotate: 360 }}
//         transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
//       >
//         <div className="absolute inset-0 rounded-full border-4 border-gray-800" />
//         <div className="absolute inset-0 rounded-full border-t-4 border-gray-400" />
//       </motion.div>

//       {/* Center icon (static) */}
//       <div className="absolute flex items-center justify-center">
//         <PiGasPumpBold className="w-5 h-5 text-gray-500" />
//       </div>

//       <motion.p
//         className="text-sm text-gray-500 mt-2"
//         initial={{ opacity: 0.4 }}
//         animate={{ opacity: [0.4, 1, 0.4] }}
//         transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
//       >
//         Loading stations...
//       </motion.p>
//     </div>
//   );
// }


"use client";

import { Building2 } from "lucide-react"; // station/building icon
interface Props {
  word: string;
}

export default function StationSpinner({ word }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-48 w-48 relative">
      {/* Spinner Container */}
      <div className="relative flex items-center justify-center">
        {/* Outer segmented ring */}
        <div className="w-16 h-16 rounded-full border-[6px] border-gray-800 border-t-gray-400 border-b-gray-700 animate-spin-slow" />

        {/* Optional subtle inner ring for depth */}
        <div className="absolute w-16 h-16 rounded-full border border-gray-700" />

        {/* Center building/station icon */}
        <div className="absolute text-gray-300">
          <Building2 size={16} />
        </div>
      </div>

      {/* Loading text */}
      <p className="mt-5 text-sm font-medium text-gray-400 tracking-wide">
        {word}...
      </p>
    </div>
  );
}
