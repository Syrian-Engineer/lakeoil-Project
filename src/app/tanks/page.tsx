'use client'

import Tank from "@/components/Tank"
import { useEffect, useState } from "react";

const tanks = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Page() {
  return (
    <div className="grid grid-cols-1 custom:grid-cols-2 gap-3">
      {tanks.map((tank) => (
        <div key={tank} className="w-full">
          <Tank />
        </div>
      ))}
    </div>
  );
}
