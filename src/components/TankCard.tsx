"use client";
import { TankProp, ProductProp } from "@/app/tanks/page";
import { useState, useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { SlPlus } from "react-icons/sl";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Tank from "./Tank";
import { Button } from "rizzui/button";
import { stationProps } from "@/app/station/page";
import { MdLocalGasStation } from "react-icons/md";
import { FaDatabase } from "react-icons/fa";
import TankSummary from "./TankSummary";

interface Props {
  tanks1: TankProp[];
  stations?: stationProps[];
  lastUpdate: Date | null;
  onRefresh: () => void;
}

export default function TankCard({ tanks1, stations,lastUpdate,onRefresh }: Props) {
  const [tanks, setTanks] = useState<TankProp[]>(tanks1);

  useEffect(() => {
    setTanks(tanks1);
  }, [tanks1]);

  const MySwal = withReactContent(Swal);

  // Group tanks by LicenseeTraSerialNo
  const groupedTanks: Record<string, TankProp[]> = {};
  stations?.forEach((station) => {
    groupedTanks[station.LicenseeTraSerialNo] =
      tanks.filter(
        (tank) => tank.LicenseeTraSerialNo === station.LicenseeTraSerialNo
      ) || [];
  });

  const handleAddTank = async () => {
    // Your existing add tank code...
  };

  const handleEditTank = async () => {
    // Your existing edit tank code...
  };

  return (
    <>
      <div className="flex items-center justify-start gap-3 mb-4">
        <Button variant="outline" className="p-2" onClick={handleAddTank}>
          <SlPlus className="h-6 w-6 text-primary" />
        </Button>
        <Button variant="outline" className="p-2" onClick={handleEditTank}>
          <FaPencilAlt className="h-6 w-6 text-primary" />
        </Button>
      </div>

      {/* Summary */}

      <TankSummary 
        stations_length={stations?.length} 
        tanks_length={tanks.length}
        lastUpdate={lastUpdate}
        onRefresh={onRefresh}
         />

      <div className="space-y-4">
        {stations?.map((station) => (
          <div
            key={station.LicenseeTraSerialNo}
            className="bg-white rounded-lg shadow-md p-4 mb-4"
          >
            <h2 className="text-lg font-semibold mb-2">{station.RetailStationName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xlPlus:grid-cols-3 gap-3">
              {groupedTanks[station.LicenseeTraSerialNo]?.map((tank) => (
                <Tank key={tank.id} tanks={tank} LicenseeTraSerialNo={station.LicenseeTraSerialNo} />
              ))}
              {groupedTanks[station.LicenseeTraSerialNo]?.length === 0 && (
                <p className="text-gray-500 col-span-full">No tanks for this station</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
