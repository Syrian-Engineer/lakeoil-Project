





// 'use client';

// import LivePumpCard from '@/widgets/cards/live-pump-data';
// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { updatePumpLiveData } from '@/store/slices/pumpSlice';
// import { Pump } from '@/components/server/pump/PumpCardsServer';
// import { setPumps } from '@/store/slices/pumpDataSlice';
// import { useSearchParams } from 'next/navigation';


// export default function PumpCardsGrid({pumps}: {pumps: Pump[];}) {
//   const dispatch = useDispatch();
//   const searchParams = useSearchParams();
//   const selectedPumpName = searchParams.get("name");

//   useEffect(() => {
//     const socket = new WebSocket('ws://10.8.0.39:8080');

//     socket.onmessage = (event) => {
//       try {
//         const message = JSON.parse(event.data);
//         dispatch(updatePumpLiveData(message));
//       } catch (err) {
//         console.error('Error parsing message:', err);
//       }
//     };

//     return () => socket.close();
//   }, [dispatch]);

//   // To Save Pumps In Store So i can reach it in the search Widget
//   useEffect(()=>{
//     dispatch(setPumps(pumps))
//   },[dispatch,pumps])


// //  to scroll smoothly to the chosen pump 
//   useEffect(() => {
//     if (selectedPumpName) {
//       const el = document.getElementById(`pump-${selectedPumpName}`);
//       if (el) {
//         el.scrollIntoView({ behavior: 'smooth', block: 'center' });
//         // el.classList.add('ring-4', 'shadow-blue-400', 'transition', 'duration-500','rounded-lg','shadow-lg');
//         // setTimeout(() => {
//         //   el.classList.remove('ring-4', 'ring-blue-400','rounded-lg','shadow-lg');
//         // }, 4000); // highlight fades after 5s
//       }
//     }
//   }, [selectedPumpName]);

//   return (
//     <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xlPlus:grid-cols-4 3xl:gap-8">
//       {pumps.map((pump) => (
//         <div key={pump.id} id={`pump-${pump.name}`}>
//           <LivePumpCard
//             key={pump.id}
//             pump={pump}
//             selected={selectedPumpName === pump.name}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }
