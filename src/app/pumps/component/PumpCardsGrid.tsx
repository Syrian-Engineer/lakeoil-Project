// 'use client';

// import LivePumpCard from '@/widgets/cards/live-pump-data';
// import { useEffect, useState } from 'react';

// interface Pump {
//   id: number;
//   name: string;
//   code: number;
//   approval: number;
//   virtual_totalizer: number;
//   mechanical_totalizer: number;
//   is_connected:number,
//   is_disconnected:number,
// }

// export default function PumpCardsGrid({ selectedPumpName }: { selectedPumpName: string | null }) {
//   const [pumps, setPumps] = useState<Pump[]>([]);


//   useEffect(() => {
//     if (typeof window === 'undefined'){
//       return ;
//     }
//     const fetchPumps = async () => {
//       try {
//         const res = await fetch('/api/proxy/pumps'); // ✅ Server-proxied route
//         const data = await res.json();

//         if (data.status_code === 200) {
//           const pumpList: Pump[] = data.data.page_records;
//           setPumps(pumpList);

//           console.log('✅ Pump list:', pumpList);
//         } else {
//           console.error('❌ Backend error:', data.message);
//         }
//       } catch (error) {
//         console.error('❌ Network or fetch error:', error);
//       }
//     };

//     fetchPumps();
//   }, []);

//     return (
//     <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xlPlus:grid-cols-4 3xl:gap-8">
//       {pumps.map((pump) => (
//         <LivePumpCard
//           key={pump.id}
//           pump={{
//             name: pump.name,
//             code: pump.code,
//             approval: pump.approval,
//             mechanical_totalizer:pump.mechanical_totalizer,
//             virtual_totalizer:pump.virtual_totalizer,
//             is_connected:pump.is_connected,
//             is_disconnected:pump.is_disconnected
//           }}
//           selected={selectedPumpName === pump.name}
//         />
//       ))}
//     </div>
//   );
// }



'use client';

import LivePumpCard from '@/widgets/cards/live-pump-data';
import { useEffect, useState } from 'react';

interface Pump {
  id: number;
  name: string;
  code: number;
  approval: number;
  virtual_totalizer: number;
  mechanical_totalizer: number;
  is_connected: number;
  is_disconnected: number;
}

export default function PumpCardsGrid({ selectedPumpName }: { selectedPumpName: string | null }) {
  const [pumps, setPumps] = useState<Pump[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const fetchPumps = async () => {
      try {
        const res = await fetch('/api/proxy/pumps');
        const data = await res.json();

        if (data.status_code === 200) {
          const pumpList: Pump[] = data.data.page_records;
          setPumps(pumpList);
          console.log('✅ Pump list:', pumpList);
        } else {
          console.error('❌ Backend error:', data.message);
        }
      } catch (error) {
        console.error('❌ Network or fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPumps();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xlPlus:grid-cols-4 3xl:gap-8">
      {pumps.map((pump) => (
        <LivePumpCard
          key={pump.id}
          pump={{
            name: pump.name,
            code: pump.code,
            approval: pump.approval,
            mechanical_totalizer: pump.mechanical_totalizer,
            virtual_totalizer: pump.virtual_totalizer,
            is_connected: pump.is_connected, // 0/1اذا في اتصال بين 
            is_disconnected: pump.is_disconnected, // حالة انا بحددها 
          }}
          selected={selectedPumpName === pump.name}
        />
      ))}
    </div>
  );
}
