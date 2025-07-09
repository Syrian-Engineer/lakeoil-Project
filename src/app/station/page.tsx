'use client'

import StationCard from "@/widgets/cards/station-card"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SlPlus } from "react-icons/sl";
import { Button } from "rizzui/button";
import { FaFilter } from "react-icons/fa";
import StationFilterCard from "@/widgets/cards/filter-station-card";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { translate } from "@/translations/translate";
import { stationHomePageTranslations } from "@/translations/stationPage/homePage";



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

const mockStation: stationProps[] = 
[
  {
  Distributor_Id: 101,
  RetailStationName: "SunFuel Station - Dar",
  EWURALicenseNo: "EWURA-456789",
  EWURA_URL: "https://ewura.go.tz/licenses/456789",
  OperatorTin: 123456789,
  Operator_XTin: "XTIN-00123",
  OperatorVrn: "T123 ABC",
  OperatorUIN: "UIN-456789",
  OperatorName: "SunFuel Distributors Ltd.",
  LicenseeTraSerialNo: "TRA-SERIAL-999999",
  RegionName: "Dar es Salaam",
  DistrictName: "Ilala",
  WardName: "Kariakoo",
  Zone: "East",
  ContactPersonEmailAddress: "manager@sunfuel.co.tz",
  ContactPersonPhone: 255712345678,
  default_printer_IP: "192.168.1.100",
  station_url_or_IP: "http://192.168.1.101",
  VFD_provider: "Tanzania VFD Services",
  VFD_provider_URL: "https://vfd.tz/api",
  VFD_provider_userName: "vfd_sunfuel",
  VFD_provider_userPass: "sun123pass!",
  VFD_provider_TAPIkey: "TAPI-KEY-123456789",
  Tax_office: "Ilala Revenue Office",
  automation_server_url: "http://192.168.1.200/api",
  automation_server_username: "auto_sunfuel",
  automation_server_pass: "autoPass2024!",
  TotalNoTanks: 4,
  x_active_business: "fuel_station",
  mobile_group1: ["+255712000111"],
  mobile_group2: ["+255714000333"],
  id: 1,
  created_date: "2024-01-15T08:30:00Z"
},
  {
  Distributor_Id: 101,
  RetailStationName: "SunFuel Station - Dar",
  EWURALicenseNo: "EWURA-456789",
  EWURA_URL: "https://ewura.go.tz/licenses/456789",
  OperatorTin: 123456789,
  Operator_XTin: "XTIN-00123",
  OperatorVrn: "T123 ABC",
  OperatorUIN: "UIN-456789",
  OperatorName: "SunFuel Distributors Ltd.",
  LicenseeTraSerialNo: "TRA-SERIAL-999999",
  RegionName: "Dar es Salaam",
  DistrictName: "Ilala",
  WardName: "Kariakoo",
  Zone: "East",
  ContactPersonEmailAddress: "manager@sunfuel.co.tz",
  ContactPersonPhone: 255712345678,
  default_printer_IP: "192.168.1.100",
  station_url_or_IP: "http://192.168.1.101",
  VFD_provider: "Tanzania VFD Services",
  VFD_provider_URL: "https://vfd.tz/api",
  VFD_provider_userName: "vfd_sunfuel",
  VFD_provider_userPass: "sun123pass!",
  VFD_provider_TAPIkey: "TAPI-KEY-123456789",
  Tax_office: "Ilala Revenue Office",
  automation_server_url: "http://192.168.1.200/api",
  automation_server_username: "auto_sunfuel",
  automation_server_pass: "autoPass2024!",
  TotalNoTanks: 4,
  x_active_business: "fuel_station",
  mobile_group1: ["+255712000111"],
  mobile_group2: ["+255714000333"],
  id: 2,
  created_date: "2024-01-15T08:30:00Z"
}
]
;

export default function Page() {
  const [stations, setStations] = useState<stationProps[]>([]);
  const [filteredStation, setFilteredStation] = useState<stationProps | null>(null);
  const [loading, setIsLoading] = useState(false);
  const [stationLoadingMap, setStationLoadingMap] = useState<{ [key: number]: boolean }>({});
  const router = useRouter();
  const [refetchStations,setRefetchStations] = useState(false)
  const [showFilterCard,setShowFilterCard] = useState(false);

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

  const handleShowFilterCard = ()=>{
    setShowFilterCard(true);
  }


  // for translation
  const lang = useSelector((state:RootState)=>state.language.language);
  const addStation = translate(stationHomePageTranslations,lang,"addStation");
  const filterStation = translate(stationHomePageTranslations,lang,"filterStation");

  return (
    <div className="w-full p-4 space-y-4">
      {showFilterCard && (
        <div className="w-full">
         <StationFilterCard 
          setRefetchStations={setRefetchStations}
          setShowFilterCard={setShowFilterCard}
          setFilteredStation={setFilteredStation}
        />
        </div>

      )}
      <div className="flex items-center justify-start gap-3 mb-4">
        <Button
          variant="outline"
          className="p-2 text-2xl"
          title={`${addStation.text}`}
          onClick={handleAddStation}
        >
          <SlPlus />
        </Button>

        {/* For Filters */}
         <Button
          variant="outline"
          className="p-2 text-2xl"
          title={`${filterStation.text}`}
          onClick={handleShowFilterCard}
        >
          <FaFilter />
        </Button>
      </div>

      {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredStation ? (
            <StationCard
              key={filteredStation.id}
              station={filteredStation}
              setRefetchStation={setRefetchStations}
            />
          ) : (
            stations.map((station) =>
              stationLoadingMap[station.id] ? (
                <div
                  key={station.id}
                  className="w-full h-40 flex justify-center items-center border border-gray-300 rounded-xl shadow-lg"
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

