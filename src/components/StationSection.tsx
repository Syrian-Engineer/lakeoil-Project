"use client";

import { useInView } from "react-intersection-observer";

import PumpCard from "./PumpCard";

import { TankProp } from "@/app/tanks/page";
import { stationProps } from "@/app/station/page";
import Tank from "./Tank/Tank";

interface Props {
  station: stationProps;
  tanks: TankProp[];
  noTanksText: string;

  // NEW
  onOpenTank: (tank: TankProp) => void;
}

export default function StationSection({
  station,
  tanks,
  noTanksText,
  onOpenTank,
}: Props) {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "300px 0px",
    triggerOnce: false,
  });

  return (
    <div
      ref={ref}
      className="bg-white rounded-lg shadow-md p-4 mb-4"
    >
      <h2 className="text-lg font-semibold mb-2">
        {station.RetailStationName}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xlPlus:grid-cols-3 gap-3 items-start auto-rows-min">
        {tanks.map((tank) => (
          <Tank
            key={tank.id}
            tanks={tank}
            LicenseeTraSerialNo={station.LicenseeTraSerialNo}
            active={inView}

            // NEW
            onOpenTank={onOpenTank}
          />
        ))}

        {tanks.length === 0 && (
          <p className="text-gray-500 col-span-full">
            {noTanksText}
          </p>
        )}
      </div>

      <PumpCard station_url={station.station_url_or_IP} />
    </div>
  );
}