// export default function Page(){
//     return(
//         <div>
//             Testing Settings In The Build
//         </div>
//     )
// }







"use client"

import { useEffect, useState } from "react"

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

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900">

      {/* Pump Display */}
      <div className="bg-black p-6 rounded-xl shadow-2xl border-4 border-neutral-700 w-[320px]">

        <div className="text-center text-white text-sm mb-4 tracking-widest">
          FUEL DISPENSER
        </div>
        {/* TOTAL */}
        <div className="mb-3">
          <div className="text-xs text-neutral-400 mb-1">TOTAL</div>
          <div className="bg-lime-400 text-black font-mono text-3xl text-right px-3 py-2 rounded">
            {data.total.toFixed(2)}
          </div>
        </div>

        {/* LITERS */}
        <div className="mb-3">
          <div className="text-xs text-neutral-400 mb-1">LITERS</div>
          <div className="bg-lime-400 text-black font-mono text-3xl text-right px-3 py-2 rounded">
            {data.liters.toFixed(2)}
          </div>
        </div>

        {/* PRICE */}
        <div>
          <div className="text-xs text-neutral-400 mb-1">PRICE / L</div>
          <div className="bg-lime-400 text-black font-mono text-2xl text-right px-3 py-2 rounded">
            {data.pricePerLiter.toFixed(2)}
          </div>
        </div>

      </div>

    </div>
  )
}