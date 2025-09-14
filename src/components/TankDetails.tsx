import { Badge } from "rizzui/badge";

interface Props{
    capacity:number,
    fuelVolume:number,
    fuel_volume_15:number,
    water_volume:number,
    average_temp:number,
    probe_id:string
}


export default function TankDetails ({capacity,fuelVolume,fuel_volume_15,water_volume,average_temp,probe_id}:Props){
    return(
<div className="mt-4 rounded-lg bg-gray-50 border border-gray-200 p-3 shadow-inner text-gray-500">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Tank Details
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-slate-800">
              <Badge className=" bg-white shadow-sm border px-2 py-1">
                Capacity: {capacity} L
              </Badge>
              <Badge className=" bg-white shadow-sm border px-2 py-1">
                Current: {fuelVolume} L
              </Badge>
              <Badge className=" bg-white shadow-sm border px-2 py-1">
                @15°C: {fuel_volume_15} L
              </Badge>
              <Badge className=" bg-white shadow-sm border px-2 py-1">
                Water: {water_volume} L
              </Badge>
              <Badge className=" bg-white shadow-sm border px-2 py-1">
                Temp: {average_temp}°C
              </Badge>
              <Badge className=" bg-white shadow-sm border px-2 py-1">
                Probe ID: {probe_id}
              </Badge>
            </div>
          </div>
    )
}