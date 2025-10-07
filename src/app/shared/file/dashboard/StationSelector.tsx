'use client';

import StationSpinner from "@/components/StationSpinner";
import { useStations } from "@/hooks/useStations";
import { useRouter, useSearchParams } from "next/navigation";

export default function StationSelector() {
  const { stationMap, loading, error } = useStations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedStation = searchParams.get("station");

  if (loading) return <StationSpinner word="Loading Stations Names" />;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const serial = e.target.value;

    // Update the URL with the selected station serial number
    const params = new URLSearchParams(searchParams.toString());
    if (serial) {
      params.set("station", serial);
    } else {
      params.delete("station");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <select
      className="bg-gray-900 text-gray-200 border border-gray-700 rounded-lg px-3 py-2 text-sm"
      onChange={handleChange}
      value={selectedStation || ""}
    >
      <option value="">All Stations</option>
      {Object.entries(stationMap).map(([name, serial]) => (
        <option key={serial} value={serial}>
          {name}
        </option>
      ))}
    </select>
  );
}

