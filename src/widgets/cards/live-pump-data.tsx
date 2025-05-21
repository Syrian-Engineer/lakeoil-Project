// 'use client';

// import { ActionIcon, Title, Text, Badge } from 'rizzui';
// import cn from '@/utils/class-names';
// import WidgetCard from '@/components/cards/widget-card';
// import {
//   PiBankDuotone,
//   PiFileTextDuotone,
//   PiGiftDuotone,
//   PiPulseDuotone,
//   PiSlidersHorizontalDuotone,
// } from 'react-icons/pi';
// import usePumpLiveData from '@/app/api/live-data/usePumpLiveData';
// import PumpData from '@/components/PumpData';
// import { useEffect, useState } from 'react';
// import { useSafeState } from 'ahooks';
// import Swal from 'sweetalert2';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store';
// import { translate } from '@/translations/translate';
// import { livePumpTranslations } from '@/translations/pumpPage/livePump';


// interface Props {
//   pump: {
//     name: string;
//     code: number;
//     approval: number;
//     virtual_totalizer: number;
//     mechanical_totalizer: number;
//     is_connected:number,
//     is_disconnected:number,
//   };
//   selected?: boolean;
//   className?: string;
// }


// export default function LivePumpCard({ pump, selected, className }: Props) {
//   const [pumpStatus, setPumpStatus] = useState<number|boolean|undefined>(pump.is_connected);
//   const [amountResponse, setAmountResponse] = useState<number|undefined>(0);
//   const [volumeResponse, setVolumeResponse] = useState<number|undefined>(0);
//   const [priceResponse, setPriceResponse] = useState<number|undefined>(0);
//   const [productResponse, setProductResponse] = useState<string|undefined>("");
//   const [statusResponse, setStatusResponse] = useState<number|undefined>(1);
//   const [alarmResponse, setAlarmResponse] = useState<string|undefined>("");
//   const [isFillingInfoReceived, setIsFillingInfoReceived] = useState(false);
//   const code = pump.code;
  

//   const data = usePumpLiveData(code);   // تجريبية 
  
//   useEffect(()=>{
//     if(code === data?.code){
//         if(data.event === 'filling_info'){
//           setAmountResponse(data.amount);
//           setVolumeResponse(data.volume);
//           setPriceResponse(data.price);
//           setProductResponse(data.product);
//           setIsFillingInfoReceived(true);
//         }else if(data.event === 'nozzle_status'){
//           setStatusResponse(data.nozzle_status)
//         }else if(data.event === 'pump_status'){
//           setPumpStatus(data.is_connected)
//         }else if(data.event === 'alarm_status'){
//           setAlarmResponse(data.alarm_message)
//         }
//     }
//   },[data,code])

//   useEffect(() => {

//     if(statusResponse === 1)
//     {
//       setIsFillingInfoReceived(false); 
//     }
//     return () => {
//     };
//   }, [statusResponse]);


//   const [difference,setDifference] = useSafeState(0);

//   useEffect(()=>{

//     const diff = pump.mechanical_totalizer - pump.virtual_totalizer;
//     setDifference(parseFloat(diff.toFixed(2)));

//   },[pump.mechanical_totalizer,pump.virtual_totalizer])


//   const deleteError = () => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "This will delete the last pump error.",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Delete',
//     }).then((res) => {
//       if (res.isConfirmed) {
//         fetch('/api/proxy/deleteAlarmError', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ pump_code: code }),
//         })
//           .then((response) => {
//             if (!response.ok) throw new Error('Response not OK.');
//             return response.json();
//           })
//           .then((data) => {
//             if (data.status_code === 401) {
//               Swal.fire('Session Timed Out', '', 'warning');
//               sessionStorage.clear();
//               window.location.reload();
//             } else if (data.status_code === 200) {
//               Swal.fire('Deleted!', 'Error deleted.', 'success');
//             }
//           })
//           .catch((err) => {
//             console.error('Error:', err);
//             Swal.fire('Error!', 'Connection problem.', 'error');
//           });
//       }
//     });
//   };

//   // for Translation 
//   const lang = useSelector((state:RootState)=>state.language.language);
//   const total = translate(livePumpTranslations,lang,"total");
//   const volume = translate(livePumpTranslations,lang,"volume");
//   const unitPrice = translate(livePumpTranslations,lang,"unitPrice");
//   const approval = translate(livePumpTranslations,lang,"approval");
//   const status = translate(livePumpTranslations,lang,"status");
//   const connected = translate(livePumpTranslations,lang,"connected");
//   const disconnected = translate(livePumpTranslations,lang,"disconnected");
//   const pumpTotalizerData = translate(livePumpTranslations,lang,"pumpTotalizerData");
//   const alarm = translate(livePumpTranslations,lang,"alarm")


//   const statData = [
//     {
//       title: `${total}`,
//       metric: amountResponse ?? '—',
//       icon: <PiBankDuotone className="h-6 w-6" />,
//       bgColor: 'bg-blue-600',
//       textColor: 'text-blue-600',
//     },
//     {
//       title: `${volume}`,
//       metric: `${volumeResponse ?? '—'} L`,
//       icon: <PiPulseDuotone className="h-6 w-6" />,
//       bgColor: 'bg-green-600',
//       textColor: 'text-green-600',
//     },
//     {
//       title: `${unitPrice}`,
//       metric: `${priceResponse?? '—'}`,
//       icon: <PiGiftDuotone className="h-6 w-6" />,
//       bgColor: 'bg-yellow-600',
//       textColor: 'text-yellow-600',
//     },
//     {
//       title: `${approval}`,
//       metric: pump.approval === 1 ? 'Conditional' : 'Auto Authorize',
//       icon: <PiFileTextDuotone className="h-6 w-6" />,
//       bgColor: 'bg-purple-600',
//       textColor: 'text-purple-600',
//     },
//   ];

//   return (
//     <WidgetCard
//       key={pump.name}
//       title={`${pump.name} (${pump.code})`}
//       description={`${status}: ${pump.is_connected ? `${connected}` : `${disconnected}`}`}
//       rounded="lg"
//       action={
//         <ActionIcon variant="outline" rounded="full">
//           <PiSlidersHorizontalDuotone className="h-auto w-5" />
//         </ActionIcon>
//       }
//       descriptionClassName={cn(
//         'font-semibold mt-1',
//         pump.is_connected ? 'text-green-600' : 'text-red-600'
//       )}
//       className={cn(
//         className,
//         'max-w-full transition-all duration-300',
//         selected && 'ring-2 ring-blue-500 scale-[1.02] shadow-lg'
//       )}
//     >
//       <div className="mt-3 grid w-full grid-cols-1 justify-around gap-4 @sm:py-1.5 @7xl:gap-6">
//         {/* Stats Block */}
//         <div className="mt-2 grid w-full grid-cols-1 justify-around gap-2 @sm:py-1 @7xl:gap-4">
//           <div className="grid grid-cols-2 gap-5">
//             {statData.map((stat) => (
//               <div key={stat.title} className="flex items-center">
//                 <div
//                   className={cn(
//                     'me-2 flex h-7 w-7 items-center justify-center rounded-md bg-opacity-10 p-[4px]',
//                     stat.bgColor,
//                     stat.textColor
//                   )}
//                 >
//                   {stat.icon}
//                 </div>
//                 <div className=''>
//                   <Text className="mb-0.5 text-gray-600 font-medium text-sm">{stat.title}</Text>
//                   <Title as="h6" className="font-semibold text-[8px]">{stat.metric}</Title>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Pump Totalizer Section */}
//         <div className="h-[13rem] w-full @sm:pt-2">
//           <p className="text-base font-semibold"> {pumpTotalizerData} </p>
//           <PumpData
//               ElectronicTotalizer={Number(pump.mechanical_totalizer || 0).toFixed(2)}
//               VirtualTotalizer={Number(pump.virtual_totalizer || 0).toFixed(2)}
//               Difference={Number(difference || 0).toFixed(2)}
//            />
//         </div>

//         {/* Alarm Message */}
//         {alarmResponse? (
//           <Badge color="danger" className="mt-2 hover:cursor-pointer" onClick={deleteError}>
//             {alarm}: {alarmResponse}
//           </Badge>
//         ):(
//           <Badge color="danger" className="mt-2 hover:cursor-pointer" onClick={deleteError}>
//             {alarm}:
//           </Badge>
//         )}
//       </div>
//     </WidgetCard>
//   );
// }


'use client';

import { ActionIcon, Title, Text, Badge } from 'rizzui';
import cn from '@/utils/class-names';
import WidgetCard from '@/components/cards/widget-card';
import {
  PiBankDuotone,
  PiFileTextDuotone,
  PiGiftDuotone,
  PiPulseDuotone,
  PiSlidersHorizontalDuotone,
} from 'react-icons/pi';
import usePumpLiveData from '@/app/api/live-data/usePumpLiveData';
import PumpData from '@/components/PumpData';
import { useEffect, useState } from 'react';
import { useSafeState } from 'ahooks';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { translate } from '@/translations/translate';
import { livePumpTranslations } from '@/translations/pumpPage/livePump';
import { Button } from 'rizzui'; // Import the Button component from Rizzui

interface Props {
  pump: {
    name: string;
    code: number;
    approval: number;
    virtual_totalizer: number;
    mechanical_totalizer: number;
    is_connected: number;
    is_disconnected: number;
  };
  selected?: boolean;
  className?: string;
}

export default function LivePumpCard({ pump, selected, className }: Props) {
  const [pumpStatus, setPumpStatus] = useState<number | boolean | undefined>(pump.is_connected);
  const [amountResponse, setAmountResponse] = useState<number | undefined>(0);
  const [volumeResponse, setVolumeResponse] = useState<number | undefined>(0);
  const [priceResponse, setPriceResponse] = useState<number | undefined>(0);
  const [productResponse, setProductResponse] = useState<string | undefined>('');
  const [statusResponse, setStatusResponse] = useState<number | undefined>(1);
  const [alarmResponse, setAlarmResponse] = useState<string | undefined>('');
  const [isFillingInfoReceived, setIsFillingInfoReceived] = useState(false);
  const [highlightOrange, setHighlightOrange] = useState(false);
  const [highlightGreen, setHighlightGreen] = useState(false);
  const [showTotalizer, setShowTotalizer] = useState(false);

  const code = pump.code;
  const data = usePumpLiveData(code);

  useEffect(() => {
    if (code === data?.code) {
      if (data.event === 'filling_info') {
        setAmountResponse(data.amount);
        setVolumeResponse(data.volume);
        setPriceResponse(data.price);
        setProductResponse(data.product);
        setIsFillingInfoReceived(true);
        setHighlightGreen(true);
      } else if (data.event === 'nozzle_status') {
        setStatusResponse(data.nozzle_status);
        if (data.nozzle_status === 1) {
          setHighlightOrange(true);
        } else {
          setHighlightOrange(false);
        }
        setHighlightGreen(false); // reset green on nozzle change
      } else if (data.event === 'pump_status') {
        setPumpStatus(data.is_connected);
      } else if (data.event === 'alarm_status') {
        setAlarmResponse(data.alarm_message);
      }
    }
  }, [data, code]);

  useEffect(() => {
    if (statusResponse === 1) {
      setIsFillingInfoReceived(false);
    }
  }, [statusResponse]);

  useEffect(() => {
    if (highlightGreen) {
      const timeout = setTimeout(() => setHighlightGreen(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [highlightGreen]);

  const [difference, setDifference] = useSafeState(0);

  useEffect(() => {
    const diff = pump.mechanical_totalizer - pump.virtual_totalizer;
    setDifference(parseFloat(diff.toFixed(2)));
  }, [pump.mechanical_totalizer, pump.virtual_totalizer]);

  const deleteError = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will delete the last pump error.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((res) => {
      if (res.isConfirmed) {
        fetch('/api/proxy/deleteAlarmError', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pump_code: code }),
        })
          .then((response) => {
            if (!response.ok) throw new Error('Response not OK.');
            return response.json();
          })
          .then((data) => {
            if (data.status_code === 401) {
              Swal.fire('Session Timed Out', '', 'warning');
              sessionStorage.clear();
              window.location.reload();
            } else if (data.status_code === 200) {
              Swal.fire('Deleted!', 'Error deleted.', 'success');
            }
          })
          .catch((err) => {
            console.error('Error:', err);
            Swal.fire('Error!', 'Connection problem.', 'error');
          });
      }
    });
  };

  // Translations
  const lang = useSelector((state: RootState) => state.language.language);
  const total = translate(livePumpTranslations, lang, 'total');
  const volume = translate(livePumpTranslations, lang, 'volume');
  const unitPrice = translate(livePumpTranslations, lang, 'unitPrice');
  const approval = translate(livePumpTranslations, lang, 'approval');
  const status = translate(livePumpTranslations, lang, 'status');
  const connected = translate(livePumpTranslations, lang, 'connected');
  const disconnected = translate(livePumpTranslations, lang, 'disconnected');
  const pumpTotalizerData = translate(livePumpTranslations, lang, 'pumpTotalizerData');
  const alarm = translate(livePumpTranslations, lang, 'alarm');

  const statData = [
    {
      title: `${total.text}`,
      metric: amountResponse ?? '—',
      icon: <PiBankDuotone className="h-6 w-6" />,
      bgColor: 'bg-blue-600',
      textColor: 'text-blue-600',
    },
    {
      title: `${volume.text}`,
      metric: `${volumeResponse ?? '—'} L`,
      icon: <PiPulseDuotone className="h-6 w-6" />,
      bgColor: 'bg-green-600',
      textColor: 'text-green-600',
    },
    {
      title: `${unitPrice.text}`,
      metric: priceResponse ?? '—',
      icon: <PiGiftDuotone className="h-6 w-6" />,
      bgColor: 'bg-yellow-600',
      textColor: 'text-yellow-600',
    },
    {
      title: `${approval.text}`,
      metric: pump.approval === 1 ? 'Conditional' : 'Auto Authorize',
      icon: <PiFileTextDuotone className="h-6 w-6" />,
      bgColor: 'bg-purple-600',
      textColor: 'text-purple-600',
    },
  ];

  return (
    <WidgetCard
      key={pump.name}
      title={`${pump.name} (${pump.code})`}
      description={`${status.text}: ${pump.is_connected ? connected.text : disconnected.text}`}
      rounded="lg"
      action={
        <ActionIcon variant="outline" rounded="full">
          <PiSlidersHorizontalDuotone className="h-auto w-5" />
        </ActionIcon>
      }
      descriptionClassName={cn(
        'font-semibold mt-1 ',
        pump.is_connected ? 'text-green-600' : 'text-red-600'
      )}
      className={cn(
        className,
        `max-w-full transition-all duration-300 ${status.className}`,
        selected && 'ring-2 ring-blue-500 scale-[1.02] shadow-lg',
        highlightOrange && 'ring-2 ring-orange-500 shadow-lg',
        highlightGreen && 'ring-2 ring-green-500 shadow-lg'
      )}
    >
      <div className="mt-3 grid w-full grid-cols-1 justify-around gap-4 @sm:py-1.5 @7xl:gap-6">
        {/* Stats Block */}
        <div className="mt-2 grid w-full grid-cols-1 justify-around gap-2 @sm:py-1 @7xl:gap-4">
          <div className="grid grid-cols-2 gap-5">
            {statData.map((stat) => (
              <div key={stat.title} className={`flex items-center ${total.className}`}>
                <div
                  className={cn(
                    'me-2 flex h-7 w-7 items-center justify-center rounded-md bg-opacity-10 p-[4px]',
                    stat.bgColor,
                    stat.textColor
                  )}
                >
                  {stat.icon}
                </div>
                <div className="">
                  <Text className="mb-0.5 text-gray-600 font-medium text-sm">{stat.title}</Text>
                  <Title as="h6" className="font-semibold text-[8px]">{stat.metric}</Title>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pump Totalizer Section */}
        <div className="h-[13rem] w-full @sm:pt-2">
          <div className="flex justify-between items-center mb-2">
                <p className={`text-base font-semibold ${pumpTotalizerData.className}`}>{pumpTotalizerData.text}</p>
                <ActionIcon
                  variant="outline"
                  size="sm"
                  rounded="full"
                  onClick={() => setShowTotalizer((prev) => !prev)}
                  className="text-primary border-primary hover:bg-primary/10"
                >
                  {showTotalizer ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </ActionIcon>
              </div>

              {showTotalizer && (
                <PumpData
                  ElectronicTotalizer={Number(pump.mechanical_totalizer || 0).toFixed(2)}
                  VirtualTotalizer={Number(pump.virtual_totalizer || 0).toFixed(2)}
                  Difference={Number(difference || 0).toFixed(2)}
                />
              )}
        </div>

        {/* Alarm Message */}
        {alarmResponse ? (
          <Badge color="danger" className={`mt-2 hover:cursor-pointer ${alarm.className}`} onClick={deleteError}>
            {alarm.text}: {alarmResponse}
          </Badge>
        ) : (
          <Badge color="danger" className={`mt-2 hover:cursor-pointer ${alarm.className}`} onClick={deleteError}>
            {alarm.text}:
          </Badge>
        )}
      </div>
    </WidgetCard>
  );
}

