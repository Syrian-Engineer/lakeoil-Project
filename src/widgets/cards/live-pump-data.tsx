'use client';

import { Tooltip,ActionIcon, Title, Text, Badge } from 'rizzui';
import cn from '@/utils/class-names';
import WidgetCard from '@/components/cards/widget-card';
import {
  PiBankDuotone,
  PiFileTextDuotone,
  PiGiftDuotone,
  PiPulseDuotone,
  PiSlidersHorizontalDuotone,
} from 'react-icons/pi';
import { TbClipboardData } from "react-icons/tb";
import usePumpLiveData, { PumpLiveData } from '@/app/api/live-data/usePumpLiveData';
import PumpData from '@/components/PumpData';
import { useEffect, useState } from 'react';
import { useSafeState } from 'ahooks';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { translate } from '@/translations/translate';
import { livePumpTranslations } from '@/translations/pumpPage/livePump';
import { Button } from 'rizzui'; // Import the Button component from Rizzui
import ReactDOMServer from 'react-dom/server';
import PumpDataModal from '@/components/modals/PumpDataModal';


interface Props {
  pump: {
    id:number;
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
  const [difference, setDifference] = useSafeState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const pump_id = pump.id;

  
  const data = useSelector((state:RootState)=>state.pump[pump_id])
  
  useEffect(() => {
      if(!data){
        return;
      }
      if (data.event === 'filling_info') {
        setHighlightGreen(true);
        setAmountResponse(data.amount);
        setVolumeResponse(data.volume);
        setPriceResponse(data.price);
        setProductResponse(data.product);
        setIsFillingInfoReceived(true);
      } else if (data.event === 'nozzle_status') {
        setStatusResponse(data.nozzle_status);
        if (data.nozzle_status === 1) {
          setHighlightOrange(true);
          setAmountResponse(data.amount);
          setVolumeResponse(data.volume);
          setPriceResponse(data.price);
          setProductResponse(data.product);
        } else {
          setHighlightOrange(false);
        }
        // setHighlightGreen(false); // reset green on nozzle change
      } else if (data.event === 'pump_status') {
        setPumpStatus(data.is_connected);
      } else if (data.event === 'alarm_status') {
        setAlarmResponse(data.alarm_message);
      }
    // }
  }, [data, pump_id]);

  useEffect(() => {
    if (statusResponse === 1) {
      setIsFillingInfoReceived(false);
    }
  }, [statusResponse]);


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
          body: JSON.stringify({ pump_code: pump_id }),
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
      description={`${status.text}: ${pumpStatus === 1? connected.text : disconnected.text}`}
      rounded="lg"
      action={
        <div className='flex items-center justify-center gap-2'>
          <Tooltip content="Nozzles" placement='top'>
            <ActionIcon variant="outline" rounded="full">
              <PiSlidersHorizontalDuotone className="h-auto w-5" />
            </ActionIcon>
          </Tooltip>

          <Tooltip content="Pump Totalizer Data" placement='top'>
            <ActionIcon variant="outline" rounded="full" onClick={()=>setIsModalOpen(true)}>
              <TbClipboardData className="h-auto w-5" />
            </ActionIcon>
          </Tooltip>
        </div>
      }
      descriptionClassName={cn(
        'font-semibold mt-1 ',
        pumpStatus === 1 ? 'text-green-600' : 'text-red-600'
      )}
      className={cn(
        className,
        `max-w-full hover:scale-95 transition-all duration-300 ${status.className}`,
        selected && 'ring-2 ring-blue-500 scale-[1.02] shadow-lg',
        highlightOrange && 'ring-2 ring-orange-500 shadow-md shadow-orange-500',
        highlightGreen && 'ring-2 ring-green-500 shadow-2xl shadow-green-500'
      )}
    >
      <div className={`mt-3 grid w-full grid-cols-1 justify-around gap-4 @sm:py-1.5 @7xl:gap-6`}>
        {/* Stats Block */}
        <div className="mt-2 grid w-full grid-cols-1 justify-around gap-2 @sm:py-1 @7xl:gap-4">
          <div className="grid grid-cols-2 gap-4">
            {statData.map((stat) => (
              <div key={stat.title} className={`flex items-center  ${total.className}`}>
                <div
                  className={cn(
                    'me-2 mb-9 flex h-12 w-7 items-center justify-center rounded-md bg-opacity-10 p-[4px]',
                    stat.bgColor,
                    stat.textColor
                  )}
                >
                  {stat.icon}
                </div>
                <div className=" w-fit h-fit mb-9">
                  <Text className="mb-0.5 text-gray-600 font-bold text-base">{stat.title}</Text>
                  <Title  className="font-normal text-sm text-nowrap">{stat.metric}</Title>
                </div>
              </div>
            ))}
          </div>
        </div>
          <div>
              <PumpDataModal 
                isOpen={isModalOpen}
                onClose={()=>setIsModalOpen(false)}
                pump={pump}
                difference={difference}
                title={pumpTotalizerData.text}
              />
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

