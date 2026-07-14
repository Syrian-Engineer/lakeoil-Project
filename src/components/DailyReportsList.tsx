"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DailyReporstCard from "@/components/DailyReportsCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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
  const [backend,setBackEnd] = useState<string | null>("")


  useEffect(()=>{
    if(typeof window === "undefined")
      return;
      const backend = localStorage.getItem("backend_url");
      setBackEnd(backend)
  },[])
  
  useEffect(() => {
    if (!per_page || !page) {
      router.replace("?per_page=5&page=1");
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
              "x-backend-url": backend || "",
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

  if (loading) return(<div className="flex flex-col items-center justify-center py-12">
        <div className="rounded-full bg-blue-100 p-4 shadow-lg">
          <AiOutlineLoading3Quarters
            className="h-9 w-9 animate-spin text-blue-600"
          />
        </div>
  
        <span className="mt-4 text-sm font-medium tracking-wide text-gray-600">
          Loading data...
        </span>
      </div>
      ) 
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <DailyReporstCard
      dailyReports={dailyReports}
      pages={pages}
      totalReports={totalReports}
    />
  );
}
