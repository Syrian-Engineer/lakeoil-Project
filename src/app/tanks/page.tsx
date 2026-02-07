import TankCardList from "@/components/TankCardList";
import { Suspense } from "react";

export interface TankProp {
  tank_capacity: number;
  LicenseeTraSerialNo:string;
  id: number;
  min_level: number;
  tank_name: string;
  product_id: number;
  average_temp:number;
  fuel_volume:number;
  fuel_volume_15:number
  water_volume:number
  product_name:string;
  updated_at:string;
  probe_id:string
  probes: Probe[];
}

export interface Probe {
  id: number;
  identification_code: string;
  ave_temp: number;
  com_port: string;
  f_lvl: number;
  fuel_offset: number;
  length: number;
  physical_id: number;
  tank_id: number;
  temp_1: number;
  temp_2: number;
  temp_3: number;
  temp_4: number;
  temp_5: number;
  w_lvl: number;
  water_offset: number;
}

export interface ProductProp{
  coefficient:number,
  description:string,
  id:number,
  liter_price:number,
  name:string
}

export default function page (){
  return(
    <Suspense fallback={<LoadingSpinner />}>
       <TankCardList />
    </Suspense>
  )
}



function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-10">
      <div className="h-10 w-10 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}