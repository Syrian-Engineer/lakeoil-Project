"use client"

import { AutoRefillRecords, RefillRecords } from "./FillingCardList"

interface Props{
    refillRecords:RefillRecords[],
    autoRefillRecords:AutoRefillRecords[]
}

export default function FillingCard({refillRecords,autoRefillRecords}:Props){
    return(
        <div>
            {refillRecords.map((refillRecord)=>(
                <div key={refillRecord.id}>
                    {refillRecord.product}
                </div>
            ))}
        </div>
    )
}