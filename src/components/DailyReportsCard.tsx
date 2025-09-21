"use client";

import { Suspense, useEffect, useState } from "react";
import DailyReportsPagination from "./DailyReportsPagination";
import { Button } from "rizzui/button";
import { useRouter } from "next/navigation";
import ReportDetails, { Amount, Product } from "./DailyReportsDetails";
import { stationProps } from "@/app/station/page";

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
  products_list:Product[],
  amount_list:Amount[]
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
  const [openDetails, setOpenDetails] = useState<number | null>(null); // 🔑 track by report ID
  const [reports, setReports] = useState<DailyReport[]>(dailyReports);
  const [stations,setStations] = useState<stationProps[]>([])
  const [access_token,setAccesss_token] = useState<string | null>("")
  const router = useRouter();

  useEffect(()=>{
    if(typeof window === "undefined"){
      return
    }
    const token = sessionStorage.getItem("access_token")
    setAccesss_token(token)
  })
 useEffect(()=>{
  if(!access_token)return
    async function fetchStations(){
     try{
       const response = await fetch("/api/stations/get-stations",{
        headers:{
          Authorization:`${access_token}`
        }
      })
      if(!response.ok){
        throw new Error("Error Failed To Fetch Stations")
      }
      const result = await response.json();
      setStations(result.data || [])
      
      }catch(error){
          console.error(error)
    }
  }
    fetchStations()
  },[access_token])

  useEffect(() => {
    setReports(dailyReports);
  }, [dailyReports]);

  const handleToggleDetails = (id: number) => {
    setOpenDetails((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <div className="mb-4">
        {showFilters && (
          <DailyReportsPagination
            totalPages={pages}
            totalReports={totalReports}
            stations={stations}
          />
        )}
      </div>

      <div className="flex gap-3 mb-4">
        <Button onClick={() => setShowFilters((prev) => !prev)}>
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        {reports.map((report) => {
          const isOpen = openDetails === report.id;

          return (
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

                {/* PRODUCTS SUMMARY */}
                  <div className="p-4 border rounded-xl bg-white shadow">
                    <h3 className="text-lg font-semibold mb-3">Products List</h3>
                    <table className="w-full text-sm border">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-2 border">Product</th>
                          <th className="p-2 border">Price</th>
                          <th className="p-2 border">total_sales</th>
                          <th className="p-2 border">total_volume</th>
                          <th className="p-2 border">Transactions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {report.products_list.map((product) => (
                          <tr key={product.id} className="text-center">
                            <td className="p-2 border">{product.product}</td>
                            <td className="p-2 border">{product.Price.toFixed(2)}</td>
                            <td className="p-2 border">{product.total_sales.toFixed(2)}</td>
                            <td className="p-2 border">{product.total_volume.toFixed(2)}</td>
                            <td className="p-2 border">{product.sales_count}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Amounts SUMMARY */}
                <div className="p-4 border rounded-xl bg-white shadow">
                  <h3 className="text-lg font-semibold mb-3">Amounts</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-2 border">report_id</th>
                          <th className="p-2 border">amount</th>
                          <th className="p-2 border">total_sales</th>
                          <th className="p-2 border">total_volume</th>
                          <th className="p-2 border">sales_count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {report.amount_list.map((amount) => (
                          <tr key={amount.id} className="text-center">
                            <td className="p-2 border">{amount.report_id}</td>
                            <td className="p-2 border">{amount.amount}</td>
                            <td className="p-2 border">{amount.total_sales}</td>
                            <td className="p-2 border">{amount.total_volume.toFixed(2)}</td>
                            <td className="p-2 border">{amount.sales_count.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
            </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  className="bg-gray-500 hover:bg-gray-600 text-white"
                  onClick={() => handleToggleDetails(report.id)}
                >
                  {isOpen ? "Hide Details" : "Show Details"}
                </Button>
              </div>

              {isOpen && (
                <Suspense fallback={<p>Loading details...</p>}>
                  <ReportDetails id={report.id} />
                </Suspense>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
