// "use client";

// import { useEffect, useState } from "react";
// import TankCard from "./TankCard";
// import { redirect } from "next/navigation";

// interface Props {
//   page?: string;
// }

// export default function TankCardListClient({ page }: Props) {
//   const [tanks, setTanks] = useState<any[]>([]);
//   const [stations, setStations] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

//   const access_token = sessionStorage.getItem("access_token")

//   useEffect(()=>{
//     if(!access_token){
//       redirect("/signin")
//     }
//   },[])

//   useEffect(() => {
//     async function fetchData() {
//       setLoading(true);
//       setError(null);

//       try {
//         const res = await fetch("/api/tanks/get-tanks",{
//           headers:{
//             Authorization:`${access_token}`
//           }
//         }); // client calls server API

//         if (!res.ok) throw new Error("Failed to fetch tanks");

//         const data = await res.json();
//         setTanks(data.tanks || []);
//         setStations(data.stations || []);
//         setLastUpdate(new Date());
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, [page,setLastUpdate]); // refetch when page changes

//   if (loading) return (    <div className="flex justify-center items-center p-10">
//       <div className="h-10 w-10 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
//     </div>
//     );
//   if (error) return <p>Error: {error}</p>;

//   return <TankCard tanks1={tanks} stations={stations} Refetch={setLastUpdate} />;
// }





"use client";

import { useEffect, useState, useCallback } from "react";
import TankCard from "./TankCard";
import { redirect } from "next/navigation";

interface Props {
  page?: string;
}

export default function TankCardListClient({ page }: Props) {
  const [tanks, setTanks] = useState<any[]>([]);
  const [stations, setStations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const access_token = typeof window !== "undefined" 
    ? sessionStorage.getItem("access_token") 
    : null;

  useEffect(() => {
    if (!access_token) {
      redirect("/signin");
    }
  }, [access_token]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/tanks/get-tanks", {
        headers: {
          Authorization: `${access_token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch tanks");

      const data = await res.json();
      setTanks(data.tanks || []);
      setStations(data.stations || []);
      setLastUpdate(new Date()); // ✅ set last fetch time
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [access_token]);

  useEffect(() => {
    fetchData();
  }, [fetchData, page]);

  if (loading)
    return (
      <div className="flex justify-center items-center p-10">
        <div className="h-10 w-10 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error) return <p>Error: {error}</p>;

  return (
    <TankCard
      tanks1={tanks}
      stations={stations}
      lastUpdate={lastUpdate}
      onRefresh={fetchData}
    />
  );
}

