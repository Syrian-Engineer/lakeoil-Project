'use client';

import { useState, useEffect, useCallback } from 'react';

interface ReportItem {
  product: string;
  total_amount: number;
  total_volume: number;
  total_receipts: number;
}

interface ReportResponse {
  data: ReportItem[];
  totals: {
    total_amount: number;
    total_volume: number;
    net_amount: number;
    total_discount: number;
  };
  message: string;
  dates: {
    start: string;
    end: string;
  };
}

interface UsePeriodicReportsReturn {
  dailyCurrent: ReportItem[];
  dailyPrevious: ReportItem[];
  monthlyCurrent: ReportItem[];
  monthlyPrevious: ReportItem[];
  loading: boolean;
  error: string | null;
}

export function usePeriodicReports(stationSerial: string) {
  const [dailyCurrent, setDailyCurrent] = useState<ReportItem[]>([]);
  const [dailyPrevious, setDailyPrevious] = useState<ReportItem[]>([]);
  const [monthlyCurrent, setMonthlyCurrent] = useState<ReportItem[]>([]);
  const [monthlyPrevious, setMonthlyPrevious] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const access_token =
    typeof window !== 'undefined'
      ? sessionStorage.getItem('access_token')
      : null;

  const fetchReports = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!access_token) {
        setError('No access token found');
        setLoading(false);
        return;
    }


    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const current_time = `${pad(now.getHours())}:${pad(now.getMinutes())}`; // e.g., "07:00"



    try {
      const urls = [
        '/api/sales-reports/periodic-reports/Daily-current',
        '/api/sales-reports/periodic-reports/Daily-previous',
        '/api/sales-reports/periodic-reports/Monthly-current',
        '/api/sales-reports/periodic-reports/Monthly-previous',
      ];

      const fetches = urls.map((url) =>
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${access_token}`,
          },
          body: JSON.stringify({
            shift_period: current_time,
            station_serial: stationSerial,
          }),
        }).then(async (res) => {
          if (!res.ok) throw new Error(`Failed to fetch ${url}`);
          const data = await res.json();
          return data.data || [];
        })
      );

      const [dailyCurr, dailyPrev, monthlyCurr, monthlyPrev] =
        await Promise.all(fetches);

      setDailyCurrent(dailyCurr);
      setDailyPrevious(dailyPrev);
      setMonthlyCurrent(monthlyCurr);
      setMonthlyPrevious(monthlyPrev);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [access_token, stationSerial]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return {
    dailyCurrent,
    dailyPrevious,
    monthlyCurrent,
    monthlyPrevious,
    loading,
    error,
  } as UsePeriodicReportsReturn;
}
