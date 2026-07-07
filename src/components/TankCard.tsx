"use client";

import { TankProp } from "@/app/tanks/page";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { translate } from "@/translations/translate";
import { tankHomeTranslations } from "@/translations/TankPage/home";
import { FaPencilAlt } from "react-icons/fa";
import { SlPlus } from "react-icons/sl";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Button } from "rizzui/button";
import { stationProps } from "@/app/station/page";
import TankSummary from "./TankSummary";
import StationSection from "./StationSection";

// NEW
import TankViewerModal from "./Tank/TankViewerModal";

interface Props {
  tanks1: TankProp[];
  stations?: stationProps[];
  lastUpdate: Date |null;
  onRefresh: () => void;
}

export default function TankCard({
  tanks1,
  stations,
  lastUpdate,
  onRefresh,
}: Props) {
  const [tanks, setTanks] = useState<TankProp[]>(tanks1);

  // NEW
  const [selectedTank, setSelectedTank] =
    useState<TankProp | null>(null);

  useEffect(() => {
    setTanks(tanks1);
  }, [tanks1]);

  const lang = useSelector(
    (state: RootState) => state.language.language
  );

  const noTanksForStationText = translate(
    tankHomeTranslations,
    lang,
    "noTanksForStation"
  ).text;

  const MySwal = withReactContent(Swal);

  const groupedTanks: Record<string, TankProp[]> = {};

  stations?.forEach((station) => {
    groupedTanks[station.LicenseeTraSerialNo] =
      tanks.filter(
        (tank) =>
          tank.LicenseeTraSerialNo ===
          station.LicenseeTraSerialNo
      ) || [];
  });

  const handleAddTank = async () => {};

  const handleEditTank = async () => {};

  return (
    <>
      <div className="flex items-center justify-start gap-3 mb-4">
        <Button
          variant="outline"
          className="p-2"
          onClick={handleAddTank}
        >
          <SlPlus className="h-6 w-6 text-primary" />
        </Button>

        <Button
          variant="outline"
          className="p-2"
          onClick={handleEditTank}
        >
          <FaPencilAlt className="h-6 w-6 text-primary" />
        </Button>
      </div>

      <TankSummary
        stations_length={stations?.length}
        tanks_length={tanks.length}
        lastUpdate={lastUpdate}
        onRefresh={onRefresh}
      />

      <div className="space-y-4">
        {stations?.map((station) => (
          <StationSection
            key={station.LicenseeTraSerialNo}
            station={station}
            tanks={
              groupedTanks[station.LicenseeTraSerialNo] || []
            }
            noTanksText={noTanksForStationText}

            // NEW
            onOpenTank={setSelectedTank}
          />
        ))}
      </div>

      {/* ONE 3D Viewer for the whole application */}
      <TankViewerModal
        tank={selectedTank}
        onClose={() => setSelectedTank(null)}
      />
    </>
  );
}