'use client';

import { useEffect, useState } from 'react';
import WidgetCard from '@/components/cards/widget-card';
import { Button } from 'rizzui';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { reportCardTranslations } from '@/translations/periodicReportsPage/report-card';
import { translate } from '@/translations/translate';

interface Props {
  startDate: any;
  endDate: any;
  station_serial?: any;
  token: string | null;
}

interface ReportTotals {
  total_amount: number;
  total_volume: number;
  total_discount: number;
  net_amount: number;
}

interface ReportDates {
  start: string;
  end: string;
}

export default function CustomReport({
  startDate,
  endDate,
  station_serial,
  token,
}: Props) {
  const [reportData, setReportData] = useState<any[]>([]);
  const [reportTotals, setReportTotals] = useState<ReportTotals | null>(null);
  const [reportDates, setReportDates] = useState<ReportDates | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const backend = localStorage.getItem('backend_url');

  const formatDateTime = (date: string) => {
    if (!date) return null;

    const formatted = date.replace("T", " ");
    return `${formatted}:00`;
    };

  useEffect(() => {
    const fetchReport = async () => {
    if (!token || !startDate || !endDate) return;

      setIsLoading(true);

      try {
        const res = await fetch(`/api/sales-reports/periodic-reports/custom`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
            'x-backend-url': backend || '',
          },
          body: JSON.stringify({
            start_date: formatDateTime(startDate),  
            end_date: formatDateTime(endDate),
            ...(station_serial ? { station_serial } : {}),
          }),
        });

        const data = await res.json();

        if (data?.status_code === 200 && Array.isArray(data.data)) {
          setReportData(data.data);
          setReportTotals(data.totals);
          setReportDates(data.dates);
        } else {
          console.error('Invalid custom report data:', data);
        }
      } catch (error) {
        console.error('Custom report fetch failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReport();
  }, [startDate, endDate, station_serial, token]);

  const handlePrint = () => {
    if (!reportTotals || !reportDates) return;

    const printData = {
      title: 'Custom Report',
      reportData,
      reportTotals,
      reportDates,
    };

    sessionStorage.setItem('print-report-data', JSON.stringify(printData));

    window.open('/print-report', '_blank');
  };

  const handleSaveExcel = async () => {
    if (!token) return;

    try {
      const res = await fetch(
        `/api/sales-reports/periodic-reports/custom/excel`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
            'x-backend-url': backend || '',
          },
          body: JSON.stringify({
            since_date: formatDateTime(startDate),
            to_date: formatDateTime(endDate),
            ...(station_serial ? { station_serial } : {}),
          }),
        }
      );

      if (!res.ok) throw new Error('Download failed');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `custom-report.xlsx`;
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Excel download failed:', error);
    }
  };

  // translations
  const lang = useSelector((state: RootState) => state.language.language);
  const receipts = translate(reportCardTranslations, lang, 'receipts');
  const volume = translate(reportCardTranslations, lang, 'volume');
  const amount = translate(reportCardTranslations, lang, 'amount');
  const type = translate(reportCardTranslations, lang, 'type');

  return (
    <WidgetCard title="Custom Report">
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-gray-500 border-solid"></div>
        </div>
      ) : (
        <>
          <table className="w-full mt-4 text-sm text-left border-t border-gray-200">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2 px-2 font-medium">{type.text}</th>
                <th className="py-2 px-2 font-medium">{amount.text}</th>
                <th className="py-2 px-2 font-medium">{volume.text}</th>
                <th className="py-2 px-2 font-medium">{receipts.text}</th>
              </tr>
            </thead>

            <tbody>
              {reportData.map((item) => (
                <tr key={item.product} className="border-b">
                  <td className="py-2 px-2 font-medium text-gray-700">
                    {item.product}
                  </td>
                  <td className="py-2 px-2">
                    {item.total_amount.toLocaleString()}
                  </td>
                  <td className="py-2 px-2">
                    {item.total_volume.toFixed(3)}
                  </td>
                  <td className="py-2 px-2">{item.total_receipts}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 text-right flex gap-2">
            <Button
              className="hover:scale-95 transition-all duration-300"
              size="sm"
              onClick={handlePrint}
            >
              Print
            </Button>

            <Button
              className="hover:scale-95 transition-all bg-green-600 duration-300 hover:bg-green-800"
              size="sm"
              onClick={handleSaveExcel}
            >
              Save
            </Button>
          </div>
        </>
      )}
    </WidgetCard>
  );
}