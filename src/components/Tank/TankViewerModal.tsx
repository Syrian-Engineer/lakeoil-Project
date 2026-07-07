"use client";

import { TankProp } from "@/app/tanks/page";
import Tank3D from "../Tank3D/Tank3D";

interface Props {
  tank: TankProp | null;
  onClose: () => void;
}

export default function TankViewerModal({
  tank,
  onClose,
}: Props) {
  if (!tank) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">

      {/* Background */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-[95vw] max-w-7xl h-[90vh] rounded-2xl bg-white shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-4">

          <div>
            <h2 className="text-2xl font-bold">
              {tank.tank_name}
            </h2>

            <p className="text-gray-500">
              {tank.product_name}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            ✕
          </button>

        </div>

        {/* 3D */}

        <div className="h-[70%]">

          <Tank3D
            fuelVolume={tank.fuel_volume ?? 0}
            capacity={tank.tank_capacity ?? 1}
            product={tank.product_name}
          />

        </div>

        {/* Footer */}

        <div className="grid grid-cols-4 gap-6 border-t p-6">

          <div>
            <div className="text-gray-500">
              Fuel
            </div>

            <div className="text-xl font-bold">
              {tank.fuel_volume} L
            </div>
          </div>

          <div>
            <div className="text-gray-500">
              Capacity
            </div>

            <div className="text-xl font-bold">
              {tank.tank_capacity} L
            </div>
          </div>

          <div>
            <div className="text-gray-500">
              Temperature
            </div>

            <div className="text-xl font-bold">
              {tank.average_temp}°
            </div>
          </div>

          <div>
            <div className="text-gray-500">
              Updated
            </div>

            <div className="text-xl font-bold">
              {tank.updated_at}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}