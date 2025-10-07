'use client';

import { useEffect, useState } from 'react';

type Station = {
  id: number;
  RetailStationName: string;
  EWURALicenseNo: string;
  TotalNoTanks: number;
};

export function useStations() {
  const [stations, setStations] = useState<Station[]>([]);
  const [stationMap, setStationMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStations() {
      try {
        setLoading(true);
        setError(null);

        const accessToken = sessionStorage.getItem('access_token');
        if (!accessToken) {
          setError('Access token not found');
          setLoading(false);
          return;
        }

        const res = await fetch('/api/stations/get-stations', {
          headers: {
            Authorization: `${accessToken}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch stations');
        }

        const json = await res.json();
        const data = json.data || [];

        // Create a Record { [RetailStationName]: EWURALicenseNo }
        const mapped: Record<string, string> = {};
        data.forEach((station: Station) => {
          mapped[station.RetailStationName] = station.EWURALicenseNo;
        });

        setStations(data);
        setStationMap(mapped);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    fetchStations();
  }, []);

  return { stations, stationMap, loading, error };
}
