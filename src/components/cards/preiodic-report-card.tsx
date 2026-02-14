'use client';

import { useEffect, useState } from 'react';
import WidgetCard from '@/components/cards/widget-card';
import { Button } from 'rizzui';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { reportCardTranslations } from '@/translations/periodicReportsPage/report-card';
import { translate } from '@/translations/translate';

interface ReportCardProps {
  title: string;
  endpoint: string;
  shiftTime: string;
  token: string | null;
  station_serial?:any
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

export default function ReportCard({ title, endpoint, shiftTime, token,station_serial }: ReportCardProps) {
  const [reportData, setReportData] = useState<any[]>([]);
  const [reportTotals, setReportTotals] = useState<ReportTotals | null>(null);
  const [reportDates, setReportDates] = useState<ReportDates | null>(null);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      if (!token) return;

      setIsLoading(true)

      try {
        const res = await fetch(`/api/sales-reports/periodic-reports/${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify(
            {
               shift_period: shiftTime,
              ...(station_serial ? { station_serial } : {}), // Only include if defined
            }
          ),
        });

        const data = await res.json();
        if (data?.status_code === 200 && Array.isArray(data.data)) {
          setReportData(data.data);
          setReportTotals(data.totals);
          setReportDates(data.dates);
        } else {
          console.error(`Invalid data for ${title}:`, data);
        }
      } catch (error) {
        console.error(`Failed to fetch ${title} report:`, error);
      }finally{
        setIsLoading(false)
      }
    };

    fetchReport();
  }, [endpoint, shiftTime, token, title]);

  const handlePrint = () => {
  if (!reportTotals || !reportDates) return;

  const printData = {
    title,
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
          `/api/sales-reports/periodic-reports/${endpoint}/excel`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
            body: JSON.stringify({
              shift_period: shiftTime,
              ...(station_serial ? { station_serial } : {}),
            }),
          }
        );

        if (!res.ok) throw new Error('Download failed');

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${endpoint}.xlsx`;
        document.body.appendChild(a);
        a.click();

        a.remove();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Excel download failed:', error);
      }
    };


// for Translations
  const lang = useSelector((state:RootState)=>state.language.language)
  const receipts = translate(reportCardTranslations,lang,"receipts");
  const volume = translate(reportCardTranslations,lang,"volume");
  const amount = translate(reportCardTranslations,lang,"amount");
  const type = translate(reportCardTranslations,lang,"type");

  return (
    <WidgetCard title={title}>
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
                <th className="py-2 px-2 font-medium"> {amount.text}</th>
                <th className="py-2 px-2 font-medium">{volume.text}</th>
                <th className="py-2 px-2 font-medium">{receipts.text}</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((item) => (
                <tr key={item.product} className="border-b">
                  <td className="py-2 px-2 font-medium text-gray-700">{item.product}</td>
                  <td className="py-2 px-2">{item.total_amount.toLocaleString()}</td>
                  <td className="py-2 px-2">{item.total_volume.toFixed(3)}</td>
                  <td className="py-2 px-2">{item.total_receipts}</td>
                </tr>
              ))}
            </tbody>
          </table>
  
          <div className="mt-4 text-right flex gap-2">
            <Button className="hover:scale-95 transition-all duration-300" size="sm" onClick={handlePrint}>
              Print
            </Button>
            <Button className="hover:scale-95 transition-all bg-green-600 duration-300" size="sm" onClick={handleSaveExcel}>
              Save
            </Button>
          </div>
        </>
      )}
    </WidgetCard>
  );
}
