// "use client";

// import { useEffect, useState, useTransition } from "react";
// import DailyReportsPagination from "./DailyReportsPagination";
// import { Button } from "rizzui/button";
// import { useRouter } from "next/navigation";
// import { deleteDailyReport } from "@/app/actions/deleteDailyReportAction";
// import ReportDetails from "./DailyReportsDetails";

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
//   const [isPending, startTransition] = useTransition();
//   const [openId, setOpenId] = useState<number | null>(null);
//   const router = useRouter();

//   // Local state for optimistic updates
//   const [reports, setReports] = useState<DailyReport[]>(dailyReports);

//   // To Save The Incoming Daily Reports In Reports
//   useEffect(()=>{
//     setReports(dailyReports)
//   },[dailyReports])


//   return (
//     <div>
//       <div className="mb-4">
//         {showFilters && <DailyReportsPagination totalPages={pages} totalReports={totalReports} />}
//       </div>

//       <div className="flex gap-3 mb-4">
//         <Button onClick={() => setShowFilters((prev) => !prev)}>
//           {showFilters ? "Hide Filters" : "Show Filters"}
//         </Button>

//       </div>

//       <div className="flex flex-col gap-6">
//         {reports.map((report) => (
//           <div
//             key={report.id}
//             className="border rounded-2xl p-4 shadow-md hover:shadow-lg transition  dark:bg-gray-100" 
//           >
//             <h1 className="text-lg font-semibold text-primary mb-2">
//               Report #{report.id}
//             </h1>

//             <div className="text-lg text-gray-700 dark:text-gray-600 font-lexend space-y-1">
//               <p>
//                 <span className="font-medium">License:</span>{" "}
//                 {report.ewura_license_no}
//               </p>
//               <p>
//                 <span className="font-medium">Trader Doc No:</span>{" "}
//                 {report.trader_docno}
//               </p>
//               <p>
//                 <span className="font-medium">Date:</span> {report.date}
//               </p>
//               <p>
//                 <span className="font-medium">Print Date:</span>{" "}
//                 {report.printedate}
//               </p>
//               <p>
//                 <span className="font-medium">Printed:</span>{" "}
//                 {report.dailyreport_printed ? "✅ Yes" : "❌ No"}
//               </p>
//               <p>
//                 <span className="font-medium">Created At:</span>{" "}
//                 {report.created_at}
//               </p>
//               <p>
//                 <span className="font-medium">Updated At:</span>{" "}
//                 {report.updated_at}
//               </p>
//             </div>

//             <div className="flex justify-end gap-2 mt-4">
//               <Button
//                 className="bg-gray-500 hover:bg-gray-600 text-white"
//                 disabled={isPending}
//                 onClick={()=>setOpenId(openId === report.id ?null :report.id)}
//               >
//                 {isPending?"Showing The Deatails":"Show more Details"}
//                 {openId === report.id && <ReportDetails id={report.id} />}
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



"use client";

import { Suspense, useEffect, useState, useTransition } from "react";
import DailyReportsPagination from "./DailyReportsPagination";
import { Button } from "rizzui/button";
import { useRouter } from "next/navigation";
import ReportDetails from "./DailyReportsDetails"; // server component

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

export default function DailyReporstCard({
  dailyReports,
  pages,
  totalReports,
}: Props) {
  const [showFilters, setShowFilters] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [openId, setOpenId] = useState<number | null>(null);
  const [loadedReports, setLoadedReports] = useState<number[]>([]);
  const router = useRouter();

  // Local state for optimistic updates
  const [reports, setReports] = useState<DailyReport[]>(dailyReports);

  // Update local state when props change
  useEffect(() => {
    setReports(dailyReports);
  }, [dailyReports]);


    const handleToggleDetails = (id: number) => {
    setOpenId(openId === id ? null : id);
    if (!loadedReports.includes(id)) {
      setLoadedReports([...loadedReports, id]);
    }
  };

  return (
    <div>
      <div className="mb-4">
        {showFilters && (
          <DailyReportsPagination
            totalPages={pages}
            totalReports={totalReports}
          />
        )}
      </div>

      <div className="flex gap-3 mb-4">
        <Button onClick={() => setShowFilters((prev) => !prev)}>
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        {reports.map((report) => (
          <div
            key={report.id}
            className="border rounded-2xl p-4 shadow-md hover:shadow-lg transition dark:bg-gray-100"
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
                className="bg-gray-500 hover:bg-gray-600 text-white"
                onClick={()=>handleToggleDetails(report.id)}
              >
                {openId === report.id ? "Hide Details" : "Show Details"}

              </Button>
            </div>

            {/* ✅ render ReportDetails OUTSIDE the Button */}
            {openId === report.id && loadedReports.includes(report.id) && (
              <Suspense fallback={<p>Loading details...</p>}>
                <ReportDetails id={report.id} />
              </Suspense>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

