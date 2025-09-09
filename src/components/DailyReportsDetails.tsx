// app/daily-reports/ReportDetails.tsx
import React from "react";

interface ReportResponse {
  status: string;
  report: {
    id: number;
    date: string;
    printedate: string;
    dailyreport_printed: boolean;
    reportno: number;
    trader_docno: number;
    ewura_license_no: string;
    created_at: string;
    updated_at: string;
    ewura_summery: string;
    ewura_ret: string;
    pumps_list: any[];
    tanks_list: any[];
    amount_list: any[];
    products_list: any[];
  };
}

async function fetchReportDetails(id: number): Promise<ReportResponse> {
  const res = await fetch(
    `http://central.oktin.ak4tek.com:3950/daily_report/${id}`,
    {
      cache: "no-store", // always fresh
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch report details for ID ${id}`);
  }

  return res.json();
}

export default async function ReportDetails({ id }: { id: number }) {
  const data = await fetchReportDetails(id);
  const report = data.report;

  return (
    <div className="mt-4 p-4 border rounded-xl bg-gray-50 dark:bg-gray-100">
      <h2 className="text-lg font-semibold mb-2 text-primary">
        Report Details (#{report.id})
      </h2>

      <div className="space-y-1 text-gray-700">
        <p>
          <strong>Date:</strong> {report.date}
        </p>
        <p>
          <strong>Print Date:</strong> {report.printedate}
        </p>
        <p>
          <strong>License No:</strong> {report.ewura_license_no}
        </p>
        <p>
          <strong>Trader Doc No:</strong> {report.trader_docno}
        </p>
        <p>
          <strong>Printed:</strong>{" "}
          {report.dailyreport_printed ? "✅ Yes" : "❌ No"}
        </p>
        <p>
          <strong>Created At:</strong> {report.created_at}
        </p>
        <p>
          <strong>Updated At:</strong> {report.updated_at}
        </p>
        <p>
          <strong>EWURA Ret:</strong> {report.ewura_ret}
        </p>
      </div>

      {/* optional: show raw XML */}
      <details className="mt-3">
        <summary className="cursor-pointer text-blue-600">
          View EWURA Summary (XML)
        </summary>
        <pre className="text-xs bg-gray-200 p-2 mt-2 rounded overflow-x-auto">
          {report.ewura_summery}
        </pre>
      </details>
    </div>
  );
}
