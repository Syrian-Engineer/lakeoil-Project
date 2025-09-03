"use client";

import DailyReportsPagination from "./DailyReportsPagination";

interface DailyReport {
  id: number;
  date: string;
  printedate: string;
  dailyreport_printed: boolean;
  reportno: number;
  trader_docno: number;
  ewura_license_no: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  dailyReports: DailyReport[]; // array instead of single object
  pages:number,
}

export default function DailyReporstCard({ dailyReports,pages }: Props) {
    const mockReports: DailyReport[] = [
  {
    id: 1,
    date: "2025-08-30",
    printedate: "2025-08-31",
    dailyreport_printed: true,
    reportno: 101,
    trader_docno: 5001,
    ewura_license_no: "EWA-12345",
    created_at: "2025-08-30T10:15:00Z",
    updated_at: "2025-08-31T08:00:00Z",
  },
  {
    id: 2,
    date: "2025-08-29",
    printedate: "2025-08-30",
    dailyreport_printed: false,
    reportno: 102,
    trader_docno: 5002,
    ewura_license_no: "EWA-67890",
    created_at: "2025-08-29T09:30:00Z",
    updated_at: "2025-08-29T18:45:00Z",
  },
  {
    id: 3,
    date: "2025-08-28",
    printedate: "2025-08-28",
    dailyreport_printed: true,
    reportno: 103,
    trader_docno: 5003,
    ewura_license_no: "EWA-54321",
    created_at: "2025-08-28T08:00:00Z",
    updated_at: "2025-08-28T16:20:00Z",
  },
];

  return (
    <div>
        <DailyReportsPagination totalPages={pages} />
      {dailyReports.map((report) => (
        <div key={report.id} className="border p-4 mb-2 rounded">
          <p>License: {report.ewura_license_no}</p>
          <p>Created At: {report.created_at}</p>
          <p>Date: {report.date}</p>
          <p>Trader Doc No: {report.trader_docno}</p>
        </div>
      ))}
    </div>
  );
}
