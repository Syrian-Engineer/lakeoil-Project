'use client';

import { motion } from 'framer-motion';
import { PiGasPumpBold } from 'react-icons/pi';

interface SpinnerProps {
  size?: number; // diameter in px
  text?: string; // optional label
}

export default function PeriodicReportsSpinner({ size = 80,text, textColor = 'text-gray-400' }: SpinnerProps & { textColor?: string }) {
  const borderSize = size * 0.075; // 7.5% of size

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Outer rotating ring */}
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="rounded-full border-gray-800 border-t-gray-400 border-b-gray-700"
          style={{
            width: size,
            height: size,
            borderWidth: borderSize,
          }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        />

        {/* Inner ring */}
        <motion.div
          className="absolute rounded-full border border-gray-700"
          style={{
            width: size,
            height: size,
          }}
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
        />

        {/* Center icon */}
        <div className="absolute text-gray-300">
          <PiGasPumpBold size={size * 0.35} />
        </div>
      </motion.div>

      {text && <p className={`mt-4 text-sm ${textColor}`}>{text}</p>}
    </div>
  );
}
