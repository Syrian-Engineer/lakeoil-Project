'use client';

import { useEffect, useState } from 'react';
import { Select } from 'rizzui';
import type { SelectOption } from 'rizzui';
import { Text } from 'rizzui/typography';
import ReportCard from '@/components/cards/preiodic-report-card';
import { translate } from '@/translations/translate';
import { periodicReprotsHomeTranslations } from '@/translations/periodicReportsPage/home';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import CustomReport from '@/components/CustomReport';

export default function Page() {
  const [mounted, setMounted] = useState(false);

  const [stationOptions, setStationOptions] = useState<SelectOption[]>([]);
  const [selectedStation, setSelectedStation] = useState<SelectOption | null>(null);
  const [shiftTime, setShiftTime] = useState('00:00');
  const [token, setToken] = useState<string | null>(null);
  const [backendUrl, setBackendUrl] = useState<string | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showCustomReport, setShowCustomReport] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);

    const lang = useSelector((state: RootState) => state.language.language);

  /* ---------- SAFE STORAGE HELPERS ---------- */

  const getLocalStorage = (key: string) => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  };

  const getSessionStorage = (key: string) => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(key);
    }
    return null;
  };

  /* ---------- READ TOKEN / ADMIN INFO ---------- */

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setMounted(true);

    const accessToken = getSessionStorage('access_token');
    const backend = getLocalStorage('backend_url') || '';

    setToken(accessToken);
    setBackendUrl(backend);
  }, []);

  /* ---------- FETCH STATIONS ---------- */

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const accessToken = sessionStorage.getItem('access_token');
    const backendUrl = localStorage.getItem('backend_url') || '';

    const fetchStations = async () => {
      if (!accessToken || !backendUrl) return;

      try {
        const res = await fetch('/api/stations/get-stations', {
          headers: {
            Authorization: accessToken,
            'x-backend-url': backendUrl,
          },
        });

        const data = await res.json();

      const formatted = (data?.data || []).map((station: any) => ({
        label: station.RetailStationName,
        value: station.LicenseeTraSerialNo,
      }));

      setStationOptions(formatted);

      if (formatted.length > 0) {
        setSelectedStation(formatted[0]);
        setRefreshKey((prev) => prev + 1);
      }

      } catch (err) {
        console.error('Failed to fetch stations:', err);
      }
    };

    fetchStations();
  }, [token, backendUrl]);

  if (!mounted) return null;

  const handleStationChange = (option: SelectOption | null) => {
    setSelectedStation(option);
    setRefreshKey((prev) => prev + 1);
  };


  const shift = translate(periodicReprotsHomeTranslations, lang, 'shift');
  const customStartingDateSince = translate(periodicReprotsHomeTranslations, lang, 'customStartingDateSince');
  const customEndDateTo = translate(periodicReprotsHomeTranslations, lang, 'customEndDateTo');
  const dailyCurrent = translate(periodicReprotsHomeTranslations, lang, 'dailyCurrent');
  const dailyPrevious = translate(periodicReprotsHomeTranslations, lang, 'dailyPrevious');
  const monthlyCurrent = translate(periodicReprotsHomeTranslations, lang, 'monthlyCurrent');
  const monthlyPrevious = translate(periodicReprotsHomeTranslations, lang, 'monthlyPrevious');

  const reportConfigs = [
    { title: dailyCurrent.text, endpoint: 'daily-current' },
    { title: dailyPrevious.text, endpoint: 'daily-previous' },
    { title: monthlyCurrent.text, endpoint: 'monthly-current' },
    { title: monthlyPrevious.text, endpoint: 'monthly-previous' },
  ];

  return (
    <div className="p-6 w-full mx-auto bg-white shadow-md rounded-md mt-10 space-y-6">

      <div>
        <label htmlFor="shift-time" className="block mb-2 font-medium text-gray-700">
          {shift.text}
        </label>
        <input
          type="time"
          id="shift-time"
          value={shiftTime}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setShiftTime(e.target.value)}
        />
      </div>


        <div>
          <Text>Stations</Text>
          <Select
            options={stationOptions}
            placeholder="Select Station"
            value={selectedStation}
            onChange={(option: any) => handleStationChange(option as SelectOption)}
            displayValue={(selected) =>
              (selected as SelectOption)?.label || 'None selected'
            }
          />
        </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            {customStartingDateSince.text}
          </label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            {customEndDateTo.text}
          </label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          disabled={!selectedStation || !startDate || !endDate}
          onClick={() => setShowCustomReport(true)}
          className={`px-4 py-2 rounded text-white ${
            !selectedStation || !startDate || !endDate
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Generate Custom Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportConfigs.map((report) => (
          <ReportCard
            key={`${report.endpoint}-${refreshKey}`}
            title={report.title}
            endpoint={report.endpoint}
            shiftTime={shiftTime}
            token={token}
            station_serial={selectedStation?.value}
          />
        ))}
      </div>

      {showCustomReport && (
        <CustomReport
          startDate={startDate}
          endDate={endDate}
          station_serial={selectedStation?.value}
          token={token}
        />
      )}
    </div>
  );
}