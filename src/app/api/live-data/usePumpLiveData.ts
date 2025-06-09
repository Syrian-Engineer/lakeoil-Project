'use client';

import { useEffect, useState } from 'react';

export type PumpLiveData = {
  id: number;
  event: string;
  amount?: number;
  volume?: number;
  price?: number;
  product?: string;
  nozzle_status?: number;
  is_connected?: boolean;
  alarm_message?: string;
};

export default function usePumpLiveData(pumpCode?: number) {
  const [data, setData] = useState<PumpLiveData | null>(null);

  useEffect(() => {
    const socket = new WebSocket(`ws://10.8.0.39:8080`);

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.id === pumpCode) {
        setData(message);
      }
    };

    return () => {
      socket.close();
    };
  }, [pumpCode]);

  return data;
}
