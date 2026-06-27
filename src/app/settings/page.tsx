// export default function Page(){
//     return(
//         <div>
//             Testing Settings In The Build
//         </div>
//     )
// }







"use client"

import Tank3D from "@/components/Tank3D"
import { useEffect, useState } from "react"
import { TankProp } from "../tanks/page"

type PumpData = {
  total: number
  liters: number
  pricePerLiter: number
}

export default function Page() {

  const [data, setData] = useState<PumpData>({
    total: 0,
    liters: 0,
    pricePerLiter: 1.65
  })

  // MOCK DATA (replace with websocket later)
  useEffect(() => {

    const interval = setInterval(() => {
      setData(prev => {
        const liters = +(prev.liters + 0.03).toFixed(2)
        const total = +(liters * prev.pricePerLiter).toFixed(2)

        return {
          ...prev,
          liters,
          total
        }
      })
    }, 200)

    return () => clearInterval(interval)

  }, [])
const tanks: TankProp[] = [
  {
    id: 1,
    product_id: 101,
    LicenseeTraSerialNo: "ABC123-1",
    tank_name: "Tank A1",
    tank_capacity: 20000,
    min_level: 1000,
    average_temp: 24.5,
    fuel_volume: 12500,
    fuel_volume_15: 12100,
    water_volume: 150,
    product_name: "Diesel",
    updated_at: "2026-06-23T08:15:00Z",
    probe_id: "P001",
    probes: [],
  },
  {
    id: 2,
    product_id: 102,
    LicenseeTraSerialNo: "ABC123-2",
    tank_name: "Tank A2",
    tank_capacity: 15000,
    min_level: 800,
    average_temp: 23.8,
    fuel_volume: 8900,
    fuel_volume_15: 8650,
    water_volume: 80,
    product_name: "Gasoline 95",
    updated_at: "2026-06-23T08:15:00Z",
    probe_id: "P002",
    probes: [],
  },
  {
    id: 3,
    product_id: 103,
    LicenseeTraSerialNo: "ABC123-3",
    tank_name: "Tank B1",
    tank_capacity: 25000,
    min_level: 1200,
    average_temp: 25.2,
    fuel_volume: 17500,
    fuel_volume_15: 17020,
    water_volume: 220,
    product_name: "Diesel",
    updated_at: "2026-06-23T08:15:00Z",
    probe_id: "P003",
    probes: [],
  },
  {
    id: 4,
    product_id: 104,
    LicenseeTraSerialNo: "ABC123-4",
    tank_name: "Tank B2",
    tank_capacity: 12000,
    min_level: 600,
    average_temp: 26.1,
    fuel_volume: 4200,
    fuel_volume_15: 4100,
    water_volume: 50,
    product_name: "Kerosene",
    updated_at: "2026-06-23T08:15:00Z",
    probe_id: "P004",
    probes: [],
  },
  {
    id: 8,
    product_id: 108,
    LicenseeTraSerialNo: "ABC123-8",
    tank_name: "Tank D2",
    tank_capacity: 22000,
    min_level: 1000,
    average_temp: 25.7,
    fuel_volume: 14500,
    fuel_volume_15: 14050,
    water_volume: 180,
    product_name: "Diesel",
    updated_at: "2026-06-23T08:15:00Z",
    probe_id: "P008",
    probes: [],
  },
];
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900">
    {tanks.map((tank) => (
      <div key={tank.id} className="w-1/3 p-4">
        <Tank3D
          tanks={tank}
          LicenseeTraSerialNo={tank.LicenseeTraSerialNo}
        />
      </div>
    ))}
    </div>
  )
}