'use client';

import { useEffect, useState } from 'react';

interface ReportData {
  title: string;
  reportData: any[];
  reportTotals: any;
  reportDates: any;
}

export default function PrintReportPage() {
  const [data, setData] = useState<ReportData | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('print-report-data');
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  if (!data) return <div>Loading...</div>;

  const { title, reportData, reportTotals, reportDates } = data;

  return (
    <div className="p-10 bg-white min-h-screen text-black print:p-4">
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold">LAKE OIL</h1>
        <p>{title}</p>
      </div>

      <div className="flex justify-between font-semibold mb-4">
        <div>START: {reportDates.start}</div>
        <div>END: {reportDates.end}</div>
      </div>

      <div className="mb-6 space-y-1">
        <div><strong>Total Litre:</strong> {reportTotals.total_volume}</div>
        <div><strong>Total Amount:</strong> {reportTotals.total_amount}</div>
        <div><strong>Discount:</strong> {reportTotals.total_discount}</div>
        <div><strong>Net Amount:</strong> {reportTotals.net_amount}</div>
      </div>

      <table className="w-full border border-black border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Product</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Volume</th>
            <th className="border p-2">Receipts</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((item, index) => (
            <tr key={index}>
              <td className="border p-2">{item.product}</td>
              <td className="border p-2">{item.total_amount}</td>
              <td className="border p-2">{item.total_volume}</td>
              <td className="border p-2">{item.total_receipts}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8 text-right print:hidden">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Print / Save as PDF
        </button>
      </div>
    </div>
  );
}
