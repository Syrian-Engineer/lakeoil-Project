"use client";
import React, { useEffect, useState } from "react";

interface Pump {
  id: number;
  pump: string;
  product: string;
  Price: number;
  total_sales: number;
  total_volume: number;
  sales_count: number;
}

interface Tank {
  id: number;
  TankID: string;
  TankProdName: string;
  SaleVolume: number;
  SaleNumber: number;
  CalculatedEndVolume: number;
  VolumeDifference: number;
}

interface Product {
  id: number;
  product: string;
  Price: number;
  total_sales: number;
  total_volume: number;
  sales_count: number;
}

interface Amount{
  id:number,
  report_id:number,
  amount:string,
  total_sales:number,
  total_volume:number,
  sales_count:number
}

interface Report {
  id: number;
  date: string;
  printedate: string;
  dailyreport_printed: boolean;
  trader_docno: number;
  ewura_license_no: string;
  created_at: string;
  updated_at: string;
  ewura_summery: string;
  ewura_ret: string;
  pumps_list: Pump[];
  tanks_list: Tank[];
  products_list: Product[];
  amount_list:Amount[]
}

interface ReportResponse {
  status: string;
  report: Report;
}

export default function ReportDetails({ id }: { id: number }) {
  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      const token = sessionStorage.getItem("access_token");
      const res = await fetch("/api/daily-reports/get-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        const data: ReportResponse = await res.json();
        setReport(data.report);
      }
    };
    fetchReport();
  }, [id]);

  if (!report) return <p>Loading...</p>;

  return (
    <div className="space-y-8 p-4">
      {/* HEADER */}
      <div className="p-4 border rounded-xl bg-white shadow">
        <h2 className="text-xl font-bold text-primary mb-2">
          Report #{report.id}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
          <p><strong>Date:</strong> {report.date}</p>
          <p><strong>Print Date:</strong> {report.printedate}</p>
          <p><strong>Trader Doc No:</strong> {report.trader_docno}</p>
          <p><strong>License No:</strong> {report.ewura_license_no}</p>
          <p><strong>Printed:</strong> {report.dailyreport_printed ? "✅ Yes" : "❌ No"}</p>
          <p><strong>Updated:</strong> {report.updated_at}</p>
        </div>
      </div>

      {/* PRODUCTS SUMMARY */}
      <div className="p-4 border rounded-xl bg-white shadow">
        <h3 className="text-lg font-semibold mb-3">Products List</h3>
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Total Sales</th>
              <th className="p-2 border">Total Volume</th>
              <th className="p-2 border">Transactions</th>
            </tr>
          </thead>
          <tbody>
            {report.products_list.map((p) => (
              <tr key={p.id} className="text-center">
                <td className="p-2 border">{p.product}</td>
                <td className="p-2 border">{p.Price.toFixed(2)}</td>
                <td className="p-2 border">{p.total_sales.toFixed(2)}</td>
                <td className="p-2 border">{p.total_volume.toFixed(2)}</td>
                <td className="p-2 border">{p.sales_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PUMPS LIST */}
      <div className="p-4 border rounded-xl bg-white shadow">
        <h3 className="text-lg font-semibold mb-3">Pumps</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Pump</th>
                <th className="p-2 border">Product</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Sales ($)</th>
                <th className="p-2 border">Volume</th>
                <th className="p-2 border">Transactions</th>
              </tr>
            </thead>
            <tbody>
              {report.pumps_list.map((pump) => (
                <tr key={pump.id} className="text-center">
                  <td className="p-2 border">{pump.pump}</td>
                  <td className="p-2 border">{pump.product}</td>
                  <td className="p-2 border">{pump.Price.toFixed(2)}</td>
                  <td className="p-2 border">{pump.total_sales.toFixed(2)}</td>
                  <td className="p-2 border">{pump.total_volume.toFixed(2)}</td>
                  <td className="p-2 border">{pump.sales_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TANKS LIST */}
      <div className="p-4 border rounded-xl bg-white shadow">
        <h3 className="text-lg font-semibold mb-3">Tanks</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Tank</th>
                <th className="p-2 border">Product</th>
                <th className="p-2 border">Sale Volume</th>
                <th className="p-2 border">Transactions</th>
                <th className="p-2 border">Calculated End Volume</th>
                <th className="p-2 border">Difference</th>
              </tr>
            </thead>
            <tbody>
              {report.tanks_list.map((tank) => (
                <tr key={tank.id} className="text-center">
                  <td className="p-2 border">{tank.TankID}</td>
                  <td className="p-2 border">{tank.TankProdName}</td>
                  <td className="p-2 border">{tank.SaleVolume.toFixed(2)}</td>
                  <td className="p-2 border">{tank.SaleNumber}</td>
                  <td className="p-2 border">{tank.CalculatedEndVolume.toFixed(2)}</td>
                  <td className="p-2 border">{tank.VolumeDifference.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Amounts SUMMARY */}
      <div className="p-4 border rounded-xl bg-white shadow">
        <h3 className="text-lg font-semibold mb-3">Amounts</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">id</th>
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
                  <td className="p-2 border">{amount.id}</td>
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
      {/* EWURA Summary (XML) */}
      <div className="p-4 border rounded-xl bg-white shadow">
        <details>
          <summary className="cursor-pointer text-blue-600 font-medium">
            View EWURA Summary (XML)
          </summary>
          <pre className="text-xs bg-gray-50 p-2 mt-2 rounded overflow-x-auto">
            {report.ewura_summery}
          </pre>
        </details>
      </div>
    </div>
  );
}
