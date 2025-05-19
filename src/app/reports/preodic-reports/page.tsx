'use client';

import { useEffect, useState } from 'react';
import { Select } from 'rizzui';
import type { SelectOption } from 'rizzui';
import { Text } from 'rizzui/typography';
import ReportCard from '@/components/cards/preiodic-report-card';

export default function Page() {
  const [stationOptions, setStationOptions] = useState<SelectOption[]>([]);
  const [selectedStation, setSelectedStation] = useState<SelectOption | null>(null);
  const [shiftTime, setShiftTime] = useState('07:00');
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState<string | null>(null);



   useEffect(() => {
    const admin = localStorage.getItem('isSuperAdmin') === 'true';
    const accessToken = sessionStorage.getItem('access_token');

    setIsAdmin(admin);
    setToken(accessToken);
  }, []);

  useEffect(() => {
    if (isAdmin) {
      setIsSuperAdmin(true);
    }
  }, [isAdmin]);

  useEffect(() => {
    const fetchStations = async () => {
      if (!token) return;
      try {
        const stationsRes = await fetch('/api/filters/stations', {
          headers: {
            Authorization: token,
          },
        });
        const stations = await stationsRes.json();
        const formatStationOptions = (stations: any[] = []) =>
          stations.map((station: any) => ({
            label: station.name,
            value: station.serial_number,
          }));
        setStationOptions(formatStationOptions(stations?.data));
      } catch (error) {
        console.error('Failed to fetch stations:', error);
      }
    };

    if (isSuperAdmin) {
      fetchStations();
    }
  }, [isSuperAdmin, token]);

  const filterConfig = isSuperAdmin
    ? [
        {
          label: 'Stations',
          option: stationOptions,
          value: selectedStation,
          setValue: setSelectedStation,
        },
      ]
    : [];

  const reportConfigs = [
    { title: 'Daily (Current)', endpoint: 'Daily-current' },
    { title: 'Daily (Previous)', endpoint: 'Daily-previous' },
    { title: 'Monthly (Current)', endpoint: 'Monthly-current' },
    { title: 'Monthly (Previous)', endpoint: 'Monthly-previous' },
  ];

  const handleSelectChange = (
    option: SelectOption | null,
    setter: React.Dispatch<React.SetStateAction<SelectOption | null>>
  ) => {
    setter(option);
  };

  return (
    <div className="p-6 w-full mx-auto bg-white shadow-md rounded-md mt-10 space-y-6">
      {/* Shift Time Picker */}
      <div>
        <label htmlFor="shift" className="block mb-2 font-medium text-gray-700">
          Shift
        </label>
        <input
          type="time"
          id="shift-time"
          value={shiftTime}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setShiftTime(e.target.value)}
        />
      </div>

      {/* Station Filter (only for Super Admin) */}
      <div>
        {filterConfig.map((filter) => (
          <div key={filter.label}>
            <Text>{filter.label}</Text>
            <Select
              options={filter.option}
              placeholder="Select Station"
              onChange={(option) => {
                handleSelectChange(option as SelectOption, filter.setValue);
              }}
              value={filter.value}
              displayValue={(selected) =>
                (selected as SelectOption)?.label || 'None selected'
              }
            />
          </div>
          ))}
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="start-date" className="block mb-2 font-medium text-gray-700">
            Custom Starting Date (Since)
          </label>
          <input
            type="datetime-local"
            id="start-date"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="end-date" className="block mb-2 font-medium text-gray-700">
            Custom End Date (To)
          </label>
          <input
            type="datetime-local"
            id="end-date"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportConfigs.map((report) => (
          <ReportCard
            key={report.title}
            title={report.title}
            endpoint={report.endpoint}
            shiftTime={shiftTime}
            token={token}
          />
        ))}
      </div>
    </div>
  );
}
