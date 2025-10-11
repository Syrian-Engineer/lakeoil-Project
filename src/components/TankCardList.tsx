"use client";

import { useEffect, useState, useCallback } from "react";
import TankCard from "./TankCard";
import { redirect } from "next/navigation";
import PeriodicReportsSpinner from "./PeriodicReportsSpinner";

interface Props {
  page?: string;
}

export default function TankCardListClient({ page }: Props) {
  const [tanks, setTanks] = useState<any[]>([]);
  const [stations, setStations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const access_token = typeof window !== "undefined" 
    ? sessionStorage.getItem("access_token") 
    : null;

  useEffect(() => {
    if (!access_token) {
      redirect("/signin");
    }
  }, [access_token]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/tanks/get-tanks", {
        headers: {
          Authorization: `${access_token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch tanks");

      const data = await res.json();
      setTanks(data.tanks || []);
      setStations(data.stations || []);
      setLastUpdate(new Date()); // ✅ set last fetch time
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [access_token]);

  useEffect(() => {
    fetchData();
  }, [fetchData, page]);

  if (loading)
    return (
      <div className="flex justify-center items-center p-10">
        <PeriodicReportsSpinner text="Fueling Tanks ..." />
      </div>
    );

  if (error) return <p>Error: {error}</p>;

  return (
    <TankCard
      tanks1={tanks}
      stations={stations}
      lastUpdate={lastUpdate}
      onRefresh={fetchData}
    />
  );
}

