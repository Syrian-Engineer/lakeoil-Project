'use client';

import { useEffect, useState } from 'react';

type PumpLiveData = {
  code: number;
  event: string;
  amount?: number;
  volume?: number;
  price?: number;
  product?: string;
  nozzle_status?: number;
  is_connected?: boolean;
  alarm_message?: string;
  // electronic_totalizer?: number; // ✅ Add this
  // virtual_totalizer?: number; 
  // difference?:number;
};

export default function usePumpLiveData(pumpCode: number) {
  const [data, setData] = useState<PumpLiveData | null>(null);

  useEffect(() => {
    const socket = new WebSocket(`ws://78.189.54.28:8080`);

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.code === pumpCode) {
        setData(message);
      }
    };

    return () => {
      socket.close();
    };
  }, [pumpCode]);

  return data;
}
