// import { useCallback, useEffect, useState } from "react";

// interface Props {
//   stationSerial: string;
// }

// interface DailyReport {
//   products_list:[{
//     product:string,
//     total_sales:number
//   }]
//   station_info:{
//     RetailStationName:string
//   }
// }

// export function useDailyReports({ stationSerial }: Props) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [Reports, setReports] = useState<DailyReport[] | null>(null);

//   const access_token =
//     typeof window !== "undefined"
//       ? sessionStorage.getItem("access_token")
//       : null;

//   const fetchReports = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     if (!access_token) {
//       setLoading(false);
//       setError("No Access Token Found");
//       return;
//     }

//     const now = new Date();
//     const dateAt10AM = new Date(
//       now.getFullYear(),
//       now.getMonth(),
//       now.getDate(),
//       10,
//       0,
//       0
//     );

//     // Format like "YYYY-MM-DDTHH:mm"
//     const formatted = dateAt10AM.toLocaleString("sv-SE").replace(" ", "T");
//     // const encoded_start_date = encodeURIComponent(formatted);
//     const encoded_start_date = "2025-09-20T20%3A06"

//     const EWURALicenseNo = stationSerial === "all" ? "" : stationSerial;

//     try {
//       const url = `/api/daily-reports/get-daily-reports?EWURALicenseNo=${EWURALicenseNo}&start_date=${encoded_start_date}`;

//       const res = await fetch(url, {
//         headers: {
//           Authorization: `${access_token}`,
//         },
//       });

//       if (!res.ok) {
//         throw new Error(`Failed to fetch reports (${res.status})`);
//       }

//       const result = await res.json();
//       setReports(result.reports);
//     } catch (err: any) {
//       setError(err.message || "Failed to fetch daily reports");
//     } finally {
//       setLoading(false);
//     }
//   }, [access_token, stationSerial]);

//   useEffect(() => {
//     fetchReports();
//   }, [fetchReports]);

//   return { Reports, loading, error, refetch: fetchReports };
// }




import { useCallback, useEffect, useState } from "react";

interface Props {
  stationSerial: string;
}

interface Product {
  id: number;
  report_id: number;
  product: string;
  Price: number;
  total_sales: number;
  total_volume: number;
  sales_count: number;
}

interface SimplifiedReport {
  stationName: string;
  products: Product[];
}

export function useDailyReports({ stationSerial }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reports, setReports] = useState<SimplifiedReport[] | null>(null);

  const access_token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("access_token")
      : null;

  const fetchReports = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!access_token) {
      setLoading(false);
      setError("No Access Token Found");
      return;
    }

    // For now using a static encoded date (you can change to dynamic later)
    const now = new Date();
    const dateAt10AM = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      10,
      0,
      0
    );

        // Format like "YYYY-MM-DDTHH:mm"
    const formatted = dateAt10AM.toLocaleString("sv-SE").replace(" ", "T");
    const encoded_start_date = encodeURIComponent(formatted);

    const EWURALicenseNo = stationSerial === "all" ? "" : stationSerial;

    try {
      const url = `/api/daily-reports/get-daily-reports?EWURALicenseNo=${EWURALicenseNo}&start_date=${encoded_start_date}`;

      const res = await fetch(url, {
        headers: {
          Authorization: `${access_token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch reports (${res.status})`);
      }

      const result = await res.json();
      console.log(result)
      const reports = result.reports

      // Transform only what you need: station name + products list
      const simplified: SimplifiedReport[] = (reports || []).map(
        (report: any) => ({
          stationName: report.station_info?.RetailStationName ?? "Unknown",
          products: report.products_list ?? [],
        })
      );

      setReports(simplified);
    } catch (err: any) {
      setError(err.message || "Failed to fetch daily reports");
    } finally {
      setLoading(false);
    }
  }, [access_token, stationSerial]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return { reports, loading, error, refetch: fetchReports };
}
