// "use client";

// import { useState, useTransition } from "react";
// import DailyReportsPagination from "./DailyReportsPagination";
// import { Button } from "rizzui/button";
// import { useRouter } from "next/navigation";
// import { deleteDailyReport } from "@/app/actions/deleteDailyReportAction";

// interface DailyReport {
//   id: number;
//   date: string;
//   printedate: string;
//   dailyreport_printed: boolean;
//   reportno: number;
//   trader_docno: number;
//   ewura_license_no: string;
//   created_at: string;
//   updated_at: string;
// }

// interface Props {
//   dailyReports: DailyReport[];
//   pages: number;
//   totalReports: number;
// }

// export default function DailyReporstCard({ dailyReports, pages, totalReports }: Props) {
//   const [showFilters, setShowFilters] = useState(false);
//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();

//   // Local state for optimistic updates
//   const [reports, setReports] = useState<DailyReport[]>(dailyReports);

//   const handleCreateDailyReport = () => {
//     router.push("/daily-reports/create-new-daily-report");
//   };

//   const handleDeleteReport = (id: number) => {
//     startTransition(async () => {
//       const res = await deleteDailyReport(id);
//       if (res.success) {
//         // Optimistically remove the report from local state
//         setReports((prev) => prev.filter((report) => report.id !== id));

//         // Revalidate with server to keep in sync
//         router.refresh();

//         alert(res.message);
//       } else {
//         alert(`Error ${res.message}`);
//       }
//     });
//   };

//   return (
//     <div>
//       {showFilters && <DailyReportsPagination totalPages={pages} totalReports={totalReports} />}

//       <Button onClick={() => setShowFilters((prev) => !prev)}>
//         {showFilters ? "Hide Filters" : "Show Filters"}
//       </Button>

//       {dailyReports.map((report) => (
//         <div key={report.id} className="border p-4 mb-2 rounded">
//           <div>
//             <p>License: {report.ewura_license_no}</p>
//             <p>Created At: {report.created_at}</p>
//             <p>Date: {report.date}</p>
//             <p>Trader Doc No: {report.trader_docno}</p>
//           </div>

//           <div>
//             <Button
//               className="bg-gray-500 hover:scale-95 transition-all duration-300"
//               disabled={isPending}
//               onClick={() => handleDeleteReport(report.id)}
//             >
//               {isPending ? "Showing..." : "Show More Details"}
//             </Button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }




"use client";

import { useEffect, useState, useTransition } from "react";
import DailyReportsPagination from "./DailyReportsPagination";
import { Button } from "rizzui/button";
import { useRouter } from "next/navigation";
import { deleteDailyReport } from "@/app/actions/deleteDailyReportAction";

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
  dailyReports: DailyReport[];
  pages: number;
  totalReports: number;
}

export default function DailyReporstCard({ dailyReports, pages, totalReports }: Props) {
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Local state for optimistic updates
  const [reports, setReports] = useState<DailyReport[]>(dailyReports);

  // To Save The Incoming Daily Reports In Reports
  useEffect(()=>{
    setReports(dailyReports)
  },[dailyReports])


  const handleCreateDailyReport = () => {
    router.push("/daily-reports/create-new-daily-report");
  };

  const handleDeleteReport = (id: number) => {
    startTransition(async () => {
      const res = await deleteDailyReport(id);
      if (res.success) {
        setReports((prev) => prev.filter((report) => report.id !== id));
        router.refresh();
        alert(res.message);
      } else {
        alert(`Error ${res.message}`);
      }
    });
  };



  return (
    <div>
      <div className="mb-4">
        {showFilters && <DailyReportsPagination totalPages={pages} totalReports={totalReports} />}
      </div>

      <div className="flex gap-3 mb-4">
        <Button onClick={() => setShowFilters((prev) => !prev)}>
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>

        <Button className="bg-primary text-white" onClick={handleCreateDailyReport}>
          Create New Daily Report
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        {reports.map((report) => (
          <div
            key={report.id}
            className="border rounded-2xl p-4 shadow-md hover:shadow-lg transition  dark:bg-gray-100" 
          >
            <h1 className="text-lg font-semibold text-primary mb-2">
              Report #{report.id}
            </h1>

            <div className="text-lg text-gray-700 dark:text-gray-600 font-lexend space-y-1">
              <p>
                <span className="font-medium">License:</span>{" "}
                {report.ewura_license_no}
              </p>
              <p>
                <span className="font-medium">Trader Doc No:</span>{" "}
                {report.trader_docno}
              </p>
              <p>
                <span className="font-medium">Date:</span> {report.date}
              </p>
              <p>
                <span className="font-medium">Print Date:</span>{" "}
                {report.printedate}
              </p>
              <p>
                <span className="font-medium">Printed:</span>{" "}
                {report.dailyreport_printed ? "✅ Yes" : "❌ No"}
              </p>
              <p>
                <span className="font-medium">Created At:</span>{" "}
                {report.created_at}
              </p>
              <p>
                <span className="font-medium">Updated At:</span>{" "}
                {report.updated_at}
              </p>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button
                className="bg-red-500 hover:bg-red-600 text-white"
                disabled={isPending}
                onClick={() => handleDeleteReport(report.id)}
              >
                {isPending ? "Deleting..." : "Delete"}
              </Button>
              <Button
                className="bg-gray-500 hover:bg-gray-600 text-white"
                disabled={isPending}
              >
                {isPending?"Showing The Deatails":"Show more Details"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
