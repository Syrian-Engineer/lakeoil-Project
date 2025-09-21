// "use client"

// import { redirect } from "next/navigation";
// import { useEffect, useState } from "react";
// import FillingCard from "./FillingCard";

// export interface RefillRecords{

//     id:number
//     tank_id:number
//     supplier_name:string
//     driver_name:string
//     station_serial:string
//     tanker_license_plate:string
//     issue_date:string
//     fuel_amount:number
//     liter_price:number
//     start_fuel_level_mm:number
//     fuel_volume:number
//     product:string
//     dip_start:number
//     dip_end:number
// }

// export interface AutoRefillRecords{
//     id:number,
//     tank_id:number,
//     station_serial:string,
//     issue_date:string,
//     fuel_volume:number,
//     start_fuel_mm:number,
//     end_fuel_mm:number,
//     start_water_mm:number,
//     end_water_mm:number,
//     product:string,
//     temp:string
// }


// export default  function FillingCardList (){
//     const [refillRecords,setRefillRecords] = useState<RefillRecords[]>([])
//     const [autoRefillRecords,setAutoRefillRecords] = useState<AutoRefillRecords[]>([])
//     const [loading,setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const[access_token,setAccesss_token] = useState<string | null>("")

//     useEffect(()=>{
//         if(typeof window === "undefined"){
//             return
//         }
//         const token = sessionStorage.getItem("access_token")
//         setAccesss_token(token)
//     },[])    

//     useEffect(()=>{
//         if(!access_token) return
//         async function fetchFillingRecords() {
//             setIsLoading(true)
//             setError(null)
//             try{
//                 const response = await fetch("/api/filling-records",{
//                 method:"GET",
//                 headers:{
//                     Authorization:`${access_token}`
//                 }       
//             })

//             if(!response.ok){
//                 throw new Error("Failed To Fetch Filling Records")
//             }
            
//             const result = await response.json();
//             setRefillRecords(result.refillRecords || [])
//             setAutoRefillRecords(result.autoRefillRecords)

//             }catch(error:any){
//                 setError(error.message)
//             }finally{
//                 setIsLoading(false)
//             }
//         }
//         fetchFillingRecords()
//     },[access_token])

//      if (loading) {
//         return (    
//             <div className="flex justify-center items-center p-10">
//                 <div className="h-10 w-10 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
//             </div>
//         );
//     }

//     if (error) return <p>Error: {error}</p>;
//     return(
//         <div>
//             <FillingCard refillRecords={refillRecords} autoRefillRecords={autoRefillRecords} />
//         </div>
//     )
// }




"use client";

import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FillingCard from "./FillingCard";

export interface RefillRecords {
  id:number;
  tank_id:number;
  supplier_name:string;
  driver_name:string;
  station_serial:string;
  tanker_license_plate:string;
  issue_date:string;
  fuel_amount:number;
  liter_price:number;
  start_fuel_level_mm:number;
  fuel_volume:number;
  product:string;
  dip_start:number;
  dip_end:number;
}

export interface AutoRefillRecords {
  id:number;
  tank_id:number;
  station_serial:string;
  issue_date:string;
  fuel_volume:number;
  start_fuel_mm:number;
  end_fuel_mm:number;
  start_water_mm:number;
  end_water_mm:number;
  product:string;
  temp:string;
}

export default function FillingCardList (){
  const [refillRecords,setRefillRecords] = useState<RefillRecords[]>([]);
  const [autoRefillRecords,setAutoRefillRecords] = useState<AutoRefillRecords[]>([]);
  const [loading,setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [access_token,setAccesss_token] = useState<string | null>("");

  const searchParams = useSearchParams();
  const serial = searchParams.get("serial"); // ✅ read station serial

  useEffect(()=>{
    if(typeof window === "undefined") return;
    const token = sessionStorage.getItem("access_token");
    setAccesss_token(token);
  },[]);    

  useEffect(()=>{
    if(!access_token) return;
    async function fetchFillingRecords() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/filling-records",{
          method:"GET",
          headers:{ Authorization:`${access_token}` }       
        });

        if(!response.ok){
          throw new Error("Failed To Fetch Filling Records");
        }
        
        const result = await response.json();

        // ✅ Filter based on station_serial
        const filteredManual = result.refillRecords?.filter(
          (r: RefillRecords) => !serial || r.station_serial === serial
        ) || [];

        const filteredAuto = result.autoRefillRecords?.filter(
          (r: AutoRefillRecords) => !serial || r.station_serial === serial
        ) || [];

        setRefillRecords(filteredManual);
        setAutoRefillRecords(filteredAuto);

      } catch(error:any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFillingRecords();
  },[access_token, serial]);

  if (loading) {
    return (    
      <div className="flex justify-center items-center p-10">
        <div className="h-10 w-10 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;

  return(
    <div>
      <FillingCard refillRecords={refillRecords} autoRefillRecords={autoRefillRecords} />
    </div>
  );
}
