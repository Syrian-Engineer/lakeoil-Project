// "use client";
// import React, { useEffect, useState } from "react";

// interface Pump {
//   id: number;
//   pump: string;
//   electronic_totalizer:number,
//   last_electronic_totalizer:number,
//   virtual_totalizer:number
//   product: string;
//   Price: number;
//   total_sales: number;
//   total_volume: number;
//   sales_count: number;
// }

// interface Tank {
//   id: number;
//   TankID: string;
//   TankProdName: string;
//   ATGDeliveryVolume:number;
//   MeasuredEndVolume:number, 
//   SaleVolume: number;
//   SaleNumber: number;
//   StartVolume:number
//   CalculatedEndVolume: number;
//   VolumeDifference: number;
// }

// export interface Product {
//   id: number;
//   product: string;
//   Price: number;
//   total_sales: number;
//   total_volume: number;
//   sales_count: number;
// }

// export interface Amount{
//   id:number,
//   report_id:number,
//   amount:string,
//   total_sales:number,
//   total_volume:number,
//   sales_count:number
// }

// interface Report {
//   id: number;
//   date: string;
//   printedate: string;
//   dailyreport_printed: boolean;
//   trader_docno: number;
//   ewura_license_no: string;
//   created_at: string;
//   updated_at: string;
//   ewura_summery: string;
//   ewura_ret: string;
//   pumps_list: Pump[];
//   tanks_list: Tank[];
//   products_list: Product[];
//   amount_list:Amount[]
// }

// interface ReportResponse {
//   status: string;
//   report: Report;
// }

// export default function ReportDetails({ id }: { id: number }) {
//   const [report, setReport] = useState<Report | null>(null);

//   useEffect(() => {
//     const fetchReport = async () => {
//       const token = sessionStorage.getItem("access_token");
//       const res = await fetch("/api/daily-reports/get-details", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `${token}`,
//         },
//         body: JSON.stringify({ id }),
//       });

//       if (res.ok) {
//         const data: ReportResponse = await res.json();
//         setReport(data.report);
//       }
//     };
//     fetchReport();
//   }, [id]);

//   if (!report) return <p>Loading...</p>;

//   return (
//     <div className="space-y-8 p-4">
//       {/* HEADER */}
//       <div className="p-4 border rounded-xl bg-white shadow">
//         <h2 className="text-xl font-bold text-primary mb-2">
//           Report #{report.id}
//         </h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
//           <p><strong>Date:</strong> {report.date}</p>
//           <p><strong>Print Date:</strong> {report.printedate}</p>
//           <p><strong>Trader Doc No:</strong> {report.trader_docno}</p>
//           <p><strong>License No:</strong> {report.ewura_license_no}</p>
//           <p><strong>Printed:</strong> {report.dailyreport_printed ? "✅ Yes" : "❌ No"}</p>
//           <p><strong>Updated:</strong> {report.updated_at}</p>
//         </div>
//       </div>

//       {/* PRODUCTS SUMMARY */}
//       <div className="p-4 border rounded-xl bg-white shadow">
//         <h3 className="text-lg font-semibold mb-3">Products List</h3>
//         <table className="w-full text-sm border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2 border">Product</th>
//               <th className="p-2 border">Price</th>
//               <th className="p-2 border">Total Sales</th>
//               <th className="p-2 border">Total Volume</th>
//               <th className="p-2 border">Transactions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {report.products_list.map((p) => (
//               <tr key={p.id} className="text-center">
//                 <td className="p-2 border">{p.product}</td>
//                 <td className="p-2 border">{p.Price.toFixed(2)}</td>
//                 <td className="p-2 border">{p.total_sales.toFixed(2)}</td>
//                 <td className="p-2 border">{p.total_volume.toFixed(2)}</td>
//                 <td className="p-2 border">{p.sales_count}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* PUMPS LIST */}
//       <div className="p-4 border rounded-xl bg-white shadow">
//         <h3 className="text-lg font-semibold mb-3">Pumps</h3>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm border">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-2 border">Pump</th>
//                 <th className="p-2 border">Product</th>
//                 <th className="p-2 border">Price</th>
//                 <th className="p-2 border">Sales ($)</th>
//                 <th className="p-2 border">Volume</th>
//                 <th className="p-2 border">Transactions</th>
//                 <th className="p-2 border">electronic_totalizer</th>
//                 <th className="p-2 border">last_electronic_totalizer</th>
//                 <th className="p-2 border">virtual_totalizer</th>
//               </tr>
//             </thead>
//             <tbody>
//               {report.pumps_list.map((pump) => (
//                 <tr key={pump.id} className="text-center">
//                   <td className="p-2 border">{pump.pump}</td>
//                   <td className="p-2 border">{pump.product}</td>
//                   <td className="p-2 border">{pump.Price.toFixed(2)}</td>
//                   <td className="p-2 border">{pump.total_sales.toFixed(2)}</td>
//                   <td className="p-2 border">{pump.total_volume.toFixed(2)}</td>
//                   <td className="p-2 border">{pump.sales_count}</td>
//                   <td className="p-2 border">{pump.electronic_totalizer}</td>
//                   <td className="p-2 border">{pump.last_electronic_totalizer}</td>
//                   <td className="p-2 border">{pump.virtual_totalizer}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* TANKS LIST */}
//       <div className="p-4 border rounded-xl bg-white shadow">
//         <h3 className="text-lg font-semibold mb-3">Tanks</h3>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm border">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-2 border">Tank</th>
//                 <th className="p-2 border">Product</th>
//                 <th className="p-2 border">Sale Volume</th>
//                 <th className="p-2 border">Transactions</th>
//                 <th className="p-2 border">Calculated End Volume</th>
//                 <th className="p-2 border">Difference</th>
//                 <th className="p-2 border">StartVolume</th>
//                 <th className="p-2 border">ATGDeliveryVolume</th>
//                 <th className="p-2 border">MeasuredEndVolume</th>
//               </tr>
//             </thead>
//             <tbody>
//               {report.tanks_list.map((tank) => (
//                 <tr key={tank.id} className="text-center">
//                   <td className="p-2 border">{tank.TankID}</td>
//                   <td className="p-2 border">{tank.TankProdName}</td>
//                   <td className="p-2 border">{tank.SaleVolume.toFixed(2)}</td>
//                   <td className="p-2 border">{tank.SaleNumber}</td>
//                   <td className="p-2 border">{tank.CalculatedEndVolume.toFixed(2)}</td>
//                   <td className="p-2 border">{tank.VolumeDifference.toFixed(2)}</td>
//                   <td className="p-2 border">{tank.StartVolume}</td>
//                   <td className="p-2 border">{tank.ATGDeliveryVolume}</td>
//                   <td className="p-2 border">{tank.MeasuredEndVolume}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       {/* Amounts SUMMARY */}
//       <div className="p-4 border rounded-xl bg-white shadow">
//         <h3 className="text-lg font-semibold mb-3">Amounts</h3>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm border">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-2 border">id</th>
//                 <th className="p-2 border">report_id</th>
//                 <th className="p-2 border">amount</th>
//                 <th className="p-2 border">total_sales</th>
//                 <th className="p-2 border">total_volume</th>
//                 <th className="p-2 border">sales_count</th>
//               </tr>
//             </thead>
//             <tbody>
//               {report.amount_list.map((amount) => (
//                 <tr key={amount.id} className="text-center">
//                   <td className="p-2 border">{amount.id}</td>
//                   <td className="p-2 border">{amount.report_id}</td>
//                   <td className="p-2 border">{amount.amount}</td>
//                   <td className="p-2 border">{amount.total_sales}</td>
//                   <td className="p-2 border">{amount.total_volume.toFixed(2)}</td>
//                   <td className="p-2 border">{amount.sales_count.toFixed(2)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       {/* EWURA Summary (XML) */}
//       <div className="p-4 border rounded-xl bg-white shadow">
//         <details>
//           <summary className="cursor-pointer text-blue-600 font-medium">
//             View EWURA Summary (XML)
//           </summary>
//           <pre className="text-xs bg-gray-50 p-2 mt-2 rounded overflow-x-auto">
//             {report.ewura_summery}
//           </pre>
//         </details>
//       </div>
//     </div>
//   );
// }











// "use client";

// import React, { useEffect, useState } from "react";

// /* ================= TYPES ================= */

// interface Pump {
//   id: number;
//   pump: string;
//   electronic_totalizer: number;
//   last_electronic_totalizer: number;
//   virtual_totalizer: number;
//   product: string;
//   Price: number;
//   total_sales: number;
//   total_volume: number;
//   sales_count: number;
// }

// interface Tank {
//   id: number;
//   TankID: string;
//   TankProdName: string;
//   ATGDeliveryVolume: number;
//   MeasuredEndVolume: number;
//   SaleVolume: number;
//   SaleNumber: number;
//   StartVolume: number;
//   CalculatedEndVolume: number;
//   VolumeDifference: number;
// }

// export interface Product {
//   id: number;
//   product: string;
//   Price: number;
//   total_sales: number;
//   total_volume: number;
//   sales_count: number;
// }

// export interface Amount {
//   id: number;
//   report_id: number;
//   amount: string;
//   total_sales: number;
//   total_volume: number;
//   sales_count: number;
// }

// interface Report {
//   id: number;
//   date: string;
//   printedate: string;
//   trader_docno: number;
//   ewura_license_no: string;
//   dailyreport_printed: boolean;
//   updated_at: string;
//   ewura_summery: string;
//   products_list: Product[];
//   pumps_list: Pump[];
//   tanks_list: Tank[];
//   amount_list: Amount[];
// }

// interface ReportResponse {
//   status: string;
//   report: Report;
// }

// /* ================= COMPONENT ================= */

// export default function ReportDetails({ id }: { id: number }) {
//   const [report, setReport] = useState<Report | null>(null);
//   const [downloading, setDownloading] = useState(false);

//   /* ================= FETCH DETAILS ================= */

//   useEffect(() => {
//     const fetchReport = async () => {
//       const token = sessionStorage.getItem("access_token");

//       const res = await fetch("/api/daily-reports/get-details", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `${token}`,
//         },
//         body: JSON.stringify({ id }),
//       });

//       if (res.ok) {
//         const data: ReportResponse = await res.json();
//         setReport(data.report);
//       }
//     };

//     fetchReport();
//   }, [id]);

//   /* ================= DOWNLOAD EXCEL ================= */

//   const downloadExcel = async () => {
//     if (!report) return;

//     try {
//       setDownloading(true);

//       const token = sessionStorage.getItem("access_token");
//       const url = `http://central.oktin.ak4tek.com:3950/daily_report/${report.id}/download/excel`;

//       const res = await fetch(url, {
//         method: "GET",
//         headers: {
//           Authorization: `${token}`,
//         },
//       });

//       if (!res.ok) throw new Error("Download failed");

//       const blob = await res.blob();
//       const downloadUrl = window.URL.createObjectURL(blob);

//       const a = document.createElement("a");
//       a.href = downloadUrl;
//       a.download = `daily_report_${report.date}.xlsx`;
//       document.body.appendChild(a);
//       a.click();

//       a.remove();
//       window.URL.revokeObjectURL(downloadUrl);
//     } catch (err) {
//       alert("Failed to download Excel file");
//     } finally {
//       setDownloading(false);
//     }
//   };

//   /* ================= UI ================= */

//   if (!report) return <p>Loading...</p>;

//   return (
//     <div className="space-y-8 p-4">

//       {/* EXPORT BUTTON */}
//       <div className="flex justify-end">
//         <button
//           onClick={downloadExcel}
//           disabled={downloading}
//           className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded"
//         >
//           {downloading ? "Downloading..." : "Export Excel"}
//         </button>
//       </div>

//       {/* HEADER */}
//       <div className="p-4 border rounded bg-white shadow">
//         <h2 className="text-xl font-bold">Report #{report.id}</h2>
//         <p>Date: {report.date}</p>
//         <p>Print Date: {report.printedate}</p>
//         <p>License: {report.ewura_license_no}</p>
//       </div>

//       {/* PRODUCTS */}
//       <Section title="Products">
//         <Table
//           headers={["Product", "Price", "Sales", "Volume", "Transactions"]}
//           rows={report.products_list.map(p => [
//             p.product,
//             p.Price,
//             p.total_sales,
//             p.total_volume,
//             p.sales_count,
//           ])}
//         />
//       </Section>

//       {/* PUMPS */}
//       <Section title="Pumps">
//         <Table
//           headers={[
//             "Pump",
//             "Product",
//             "Price",
//             "Sales",
//             "Volume",
//             "Transactions",
//             "Start",
//             "End",
//             "Difference",
//           ]}
//           rows={report.pumps_list.map(p => [
//             p.pump,
//             p.product,
//             p.Price,
//             p.total_sales,
//             p.total_volume,
//             p.sales_count,
//             p.last_electronic_totalizer,
//             p.electronic_totalizer,
//             p.virtual_totalizer,
//           ])}
//         />
//       </Section>

//       {/* TANKS */}
//       <Section title="Tanks">
//         <Table
//           headers={[
//             "Tank",
//             "Product",
//             "Sale Volume",
//             "Transactions",
//             "Start Volume",
//             "Calculated End",
//             "Measured End",
//             "Difference",
//           ]}
//           rows={report.tanks_list.map(t => [
//             t.TankID,
//             t.TankProdName,
//             t.SaleVolume,
//             t.SaleNumber,
//             t.StartVolume,
//             t.CalculatedEndVolume,
//             t.MeasuredEndVolume,
//             t.VolumeDifference,
//           ])}
//         />
//       </Section>

//       {/* AMOUNTS */}
//       <Section title="Amounts">
//         <Table
//           headers={[
//             "ID",
//             "Report ID",
//             "Amount",
//             "Total Sales",
//             "Total Volume",
//             "Sales Count",
//           ]}
//           rows={report.amount_list.map(a => [
//             a.id,
//             a.report_id,
//             a.amount,
//             a.total_sales,
//             a.total_volume,
//             a.sales_count,
//           ])}
//         />
//       </Section>
//     </div>
//   );
// }

// /* ================= UI HELPERS ================= */

// function Section({ title, children }: { title: string; children: React.ReactNode }) {
//   return (
//     <div className="p-4 border rounded bg-white shadow">
//       <h3 className="font-semibold mb-3">{title}</h3>
//       {children}
//     </div>
//   );
// }

// function Table({ headers, rows }: { headers: string[]; rows: any[][] }) {
//   return (
//     <table className="w-full text-sm border">
//       <thead className="bg-gray-100">
//         <tr>
//           {headers.map(h => (
//             <th key={h} className="border p-2">{h}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {rows.map((r, i) => (
//           <tr key={i} className="text-center">
//             {r.map((c, j) => (
//               <td key={j} className="border p-2">{c}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }



"use client";

import React, { useEffect, useState } from "react";

/* ================= TYPES ================= */

interface Pump {
  id: number;
  pump: string;
  electronic_totalizer: number;
  last_electronic_totalizer: number;
  virtual_totalizer: number;
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
  ATGDeliveryVolume: number | null;
  MeasuredEndVolume: number | null;
  SaleVolume: number;
  SaleNumber: number;
  StartVolume: number;
  CalculatedEndVolume: number;
  VolumeDifference: number;
}

export interface Product {
  id: number;
  product: string;
  Price: number;
  total_sales: number;
  total_volume: number;
  sales_count: number;
}

export interface Amount {
  id: number;
  report_id: number;
  amount: string;
  total_sales: number;
  total_volume: number;
  sales_count: number;
}

interface ShiftProduct {
  product: string;
  volume: number;
  amount: number;
  sales_count: number;
}

interface Shift {
  shift_number: number;
  shift_name: string;
  start_time: string;
  end_time: string;
  total_volume: number;
  total_amount: number;
  total_transactions: number;
  products: ShiftProduct[];
}

interface Report {
  id: number;
  date: string;
  printedate: string;
  trader_docno: number;
  ewura_license_no: string;
  dailyreport_printed: boolean;
  updated_at: string;
  ewura_summery: string;
  products_list: Product[];
  pumps_list: Pump[];
  tanks_list: Tank[];
  amount_list: Amount[];
  shift_list: Shift[];
}

interface ReportResponse {
  status: string;
  report: Report;
}

/* ================= COMPONENT ================= */

export default function ReportDetails({ id }: { id: number }) {
  const [report, setReport] = useState<Report | null>(null);
  const [downloading, setDownloading] = useState(false);

  /* ================= FETCH DETAILS ================= */

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

  /* ================= DOWNLOAD EXCEL ================= */

  const downloadExcel = async () => {
    if (!report) return;

    try {
      setDownloading(true);
      const token = sessionStorage.getItem("access_token");

      const res = await fetch(
        `http://central.oktin.ak4tek.com:3950/daily_report/${report.id}/download/excel`,
        {
          method: "GET",
          headers: { Authorization: `${token}` },
        }
      );

      if (!res.ok) throw new Error();

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `daily_report_${report.date}.xlsx`;
      a.click();

      window.URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  if (!report) return <p>Loading...</p>;

  return (
    <div className="space-y-8 p-4">

      {/* EXPORT */}
      <div className="flex justify-end">
        <button
          onClick={downloadExcel}
          disabled={downloading}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded"
        >
          {downloading ? "Downloading..." : "Export Excel"}
        </button>
      </div>

      {/* HEADER */}
      <Section title={`Report #${report.id}`}>
        <p>Date: {report.date}</p>
        <p>Print Date: {report.printedate}</p>
        <p>License: {report.ewura_license_no}</p>
      </Section>

      {/* PRODUCTS */}
      <Section title="Products">
        <Table
          headers={["Product", "Price", "Sales", "Volume", "Transactions"]}
          rows={report.products_list.map(p => [
            p.product,
            p.Price,
            p.total_sales,
            p.total_volume,
            p.sales_count,
          ])}
        />
      </Section>

      {/* SHIFTS */}
      <Section title="Shifts">
        {report.shift_list.map(shift => (
          <div key={shift.shift_number} className="mb-6 border rounded p-4">
            <h4 className="font-semibold mb-2">{shift.shift_name}</h4>
            <p className="text-sm">
              {shift.start_time} → {shift.end_time}
            </p>

            <div className="grid grid-cols-3 gap-4 my-3 text-sm">
              <div>Total Volume: {shift.total_volume}</div>
              <div>Total Amount: {shift.total_amount}</div>
              <div>Transactions: {shift.total_transactions}</div>
            </div>

            <Table
              headers={["Product", "Volume", "Amount", "Transactions"]}
              rows={shift.products.map(p => [
                p.product,
                p.volume,
                p.amount,
                p.sales_count,
              ])}
            />
          </div>
        ))}
      </Section>

      {/* PUMPS */}
      <Section title="Pumps">
        <Table
          headers={[
            "Pump",
            "Product",
            "Price",
            "Sales",
            "Volume",
            "Transactions",
            "Start",
            "End",
            "Difference",
          ]}
          rows={report.pumps_list.map(p => [
            p.pump,
            p.product,
            p.Price,
            p.total_sales,
            p.total_volume,
            p.sales_count,
            p.last_electronic_totalizer,
            p.electronic_totalizer,
            p.virtual_totalizer,
          ])}
        />
      </Section>

      {/* TANKS */}
      <Section title="Tanks">
        <Table
          headers={[
            "Tank",
            "Product",
            "Sale Volume",
            "Transactions",
            "Start Volume",
            "Calculated End",
            "Measured End",
            "Difference",
          ]}
          rows={report.tanks_list.map(t => [
            t.TankID,
            t.TankProdName,
            t.SaleVolume,
            t.SaleNumber,
            t.StartVolume,
            t.CalculatedEndVolume,
            t.MeasuredEndVolume,
            t.VolumeDifference,
          ])}
        />
      </Section>

      {/* AMOUNTS */}
      <Section title="Amounts">
        <Table
          headers={[
            "ID",
            "Report ID",
            "Amount",
            "Total Sales",
            "Total Volume",
            "Sales Count",
          ]}
          rows={report.amount_list.map(a => [
            a.id,
            a.report_id,
            a.amount,
            a.total_sales,
            a.total_volume,
            a.sales_count,
          ])}
        />
      </Section>
    </div>
  );
}

/* ================= UI HELPERS ================= */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-4 border rounded bg-white shadow">
      <h3 className="font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: any[][] }) {
  return (
    <table className="w-full text-sm border">
      <thead className="bg-gray-100">
        <tr>
          {headers.map(h => (
            <th key={h} className="border p-2">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="text-center">
            {r.map((c, j) => (
              <td key={j} className="border p-2">{c}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
