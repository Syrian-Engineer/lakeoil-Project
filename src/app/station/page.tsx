'use client'

import StationCard from "@/widgets/cards/station-card"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SlPlus } from "react-icons/sl";
import { Button } from "rizzui/button";

export interface stationProps {
  Distributor_Id: number,
  RetailStationName: string,
  EWURALicenseNo: string,
  EWURA_URL: string,
  OperatorTin: number,
  Operator_XTin: string,
  OperatorVrn: string,
  OperatorUIN: string,
  OperatorName: string,
  LicenseeTraSerialNo: string,
  RegionName: string,
  DistrictName: string,
  WardName: string,
  Zone: string,
  ContactPersonEmailAddress: string,
  ContactPersonPhone: number,
  default_printer_IP: string,
  station_url_or_IP: string,
  VFD_provider: string,
  VFD_provider_URL: string,
  VFD_provider_userName: string,
  VFD_provider_userPass: string,
  VFD_provider_TAPIkey: string,
  Tax_office: string,
  automation_server_url: string,
  automation_server_username: string,
  automation_server_pass: string,
  TotalNoTanks: number,
  x_active_business: string,
  mobile_group1: [string],
  mobile_group2: [string],
  id: number,
  created_date: string
}

export default function Page() {
  const [stations, setStations] = useState<stationProps[]>([]);
  const [loading, setIsLoading] = useState(false);
  const [stationLoadingMap, setStationLoadingMap] = useState<{ [key: number]: boolean }>({});
  const router = useRouter();
  const [refetchStations,setRefetchStations] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return;

    const fetchStations = async () => {
      try {
        const accessToken = sessionStorage.getItem("access_token");
        setIsLoading(true);

        if (!accessToken) {
          console.warn("No token found in sessionStorage");
          return;
        }

        const response = await fetch("/api/stations/get-stations", {
          headers: {
            Authorization: `${accessToken}`,
          },
        });

        if (!response.ok) {
          return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
            status: response.status,
          });
        }

        const data = await response.json();
        setStations(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStations();
  }, [refetchStations]);

  // Simulate per-card loading
  useEffect(() => {
    if (stations.length > 0) {
      const loadingState: { [key: number]: boolean } = {};
      stations.forEach((s) => (loadingState[s.id] = true));
      setStationLoadingMap(loadingState);

      stations.forEach((station) => {
        setTimeout(() => {
          setStationLoadingMap((prev) => ({ ...prev, [station.id]: false }));
        }, 500 + Math.random() * 1000); // Simulate staggered load
      });
    }
  }, [stations]);

  const handleAddStation = () => {
    router.push("/station/new-station");
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-start gap-3 mb-4">
        <Button
          variant="outline"
          className="p-2 text-2xl"
          title="Add Station"
          aria-label="Add Tank"
          onClick={handleAddStation}
        >
          <SlPlus />
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        stations.map((station) =>
          stationLoadingMap[station.id] ? (
            <div
              key={station.id}
              className="w-full h-40 flex justify-center items-center border border-gray-300 rounded-xl shadow-md"
            >
              <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <StationCard 
             key={station.id} 
             station={station} 
             setRefetchStation={setRefetchStations}
             />
          )
        )
      )}
    </div>
  );
}

