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
//   dailyReports: DailyReport[]; // array instead of single object
//   pages:number,
//   totalReports:number
// }

// export default function DailyReporstCard({ dailyReports,pages,totalReports }: Props) {

//   const [reports,setReports] = useState(dailyReports);
//   const [showFilters,setShowFilters] = useState(false)
//   const router = useRouter();
//   const [isPending,startTransition] = useTransition();

//   const handleCreateDailyReport = ()=>{
//     router.push("/daily-reports/create-new-daily-report")
//   }

//   const handleDeleteReport = (id:number)=>{
//       startTransition(async()=>{
//         const res = await deleteDailyReport(id)
//         if(res.success){
//           alert(res.message)
//           setReports((prev)=>prev.filter((r)=>r.id !== id))
//         }else{
//           alert(`Error ${res.message}`)
//         }
//       })  
//   }
//   return (
//     <div>
//         {showFilters && <DailyReportsPagination totalPages={pages} totalReports={totalReports} />}
//         <Button
//          onClick={()=>setShowFilters((prev)=>!prev)}
//          >
//           {showFilters?"Hide Filters":"Show Filters"}
//         </Button>

//         <Button
//           onClick={handleCreateDailyReport}
//         >
//           Create A New Daily Report
//         </Button>

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
//              className="bg-red-500"
//              disabled={isPending}
//              onClick={()=>handleDeleteReport(report.id)}
//              >
//               {isPending?"Deleting":"Delete"}
//             </Button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }




"use client";

import { useState, useTransition } from "react";
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

  const handleCreateDailyReport = () => {
    router.push("/daily-reports/create-new-daily-report");
  };

  const handleDeleteReport = (id: number) => {
    startTransition(async () => {
      const res = await deleteDailyReport(id);
      if (res.success) {
        // Optimistically remove the report from local state
        setReports((prev) => prev.filter((report) => report.id !== id));

        // Revalidate with server to keep in sync
        router.refresh();

        alert(res.message);
      } else {
        alert(`Error ${res.message}`);
      }
    });
  };

  return (
    <div>
      {showFilters && <DailyReportsPagination totalPages={pages} totalReports={totalReports} />}

      <Button onClick={() => setShowFilters((prev) => !prev)}>
        {showFilters ? "Hide Filters" : "Show Filters"}
      </Button>

      {dailyReports.map((report) => (
        <div key={report.id} className="border p-4 mb-2 rounded">
          <div>
            <p>License: {report.ewura_license_no}</p>
            <p>Created At: {report.created_at}</p>
            <p>Date: {report.date}</p>
            <p>Trader Doc No: {report.trader_docno}</p>
          </div>

          <div>
            <Button
              className="bg-red-500"
              disabled={isPending}
              onClick={() => handleDeleteReport(report.id)}
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
