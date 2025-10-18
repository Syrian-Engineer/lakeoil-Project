// import { cookies } from "next/headers";
// import DailyReporstCard from "./DailyReportsCard";
// import { redirect } from "next/navigation";

// interface Props {
//   start_date:string,
//   end_date:string,
//   report_no:number
//   per_page:string,
//   page:string
//   station:string
// }

// export default async function DailyReporstList({start_date,end_date,report_no,per_page,page,station}:Props) {

//   const access_token = (await cookies()).get("access_token")?.value;

//   if(!per_page || !page){
//     redirect("?per_page=1&page=1")
//   }
//   // Encode start_date and end_date for URL safety
//   const encodedStart = encodeURIComponent(start_date);
//   const encodedEnd = encodeURIComponent(end_date);
// // &report_no=${report_no}
//   const response = await fetch(`http://central.oktin.ak4tek.com:3950/daily_report?start_date=${encodedStart}&end_date=${encodedEnd}&per_page=${per_page}&page=${page}&EWURALicenseNo=${station}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `${access_token}`,
//     },
//     next:{revalidate:100}
//   });

//   const result = await response.json();
//   if(!result){
//     throw new Error("There Is No Daily Reports")
//   }
//   console.log(result)
//   const dailyReports = result.reports || []; // likely an array
//   const pages = result?.pagination?.pages || 1;
//   const totalReprots = result?.pagination?.total ||0;

//   return <DailyReporstCard dailyReports={dailyReports} pages={pages} totalReports={totalReprots} />;
// }





"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DailyReporstCard from "@/components/DailyReportsCard";

interface Props {
  start_date: string;
  end_date: string;
  report_no: number;
  per_page: string;
  page: string;
  station: string;
}

export default function DailyReporstList({
  start_date,
  end_date,
  report_no,
  per_page,
  page,
  station,
}: Props) {
  const router = useRouter();
  const [dailyReports, setDailyReports] = useState<any[]>([]);
  const [pages, setPages] = useState<number>(1);
  const [totalReports, setTotalReports] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!per_page || !page) {
      router.replace("?per_page=1&page=1");
      return;
    }

    const fetchReports = async () => {
      try {
        setLoading(true);
        setError(null);

        const access_token = sessionStorage.getItem("access_token");
        if (!access_token) {
          throw new Error("Missing access token");
        }

        const encodedStart = encodeURIComponent(start_date);
        const encodedEnd = encodeURIComponent(end_date);

        // ✅ Fetch from your local API route
        const response = await fetch(
          `/api/daily-reports/get-all-daily-reports?start_date=${encodedStart}&end_date=${encodedEnd}&per_page=${per_page}&page=${page}&station=${station}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: access_token,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const result = await response.json();
        if (!result) {
          throw new Error("There is no daily report data.");
        }

        setDailyReports(result.reports || []);
        setPages(result?.pagination?.pages || 1);
        setTotalReports(result?.pagination?.total || 0);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [start_date, end_date, per_page, page, station, router]);

  if (loading) return <div className="p-4 text-gray-500">Loading daily reports...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <DailyReporstCard
      dailyReports={dailyReports}
      pages={pages}
      totalReports={totalReports}
    />
  );
}
