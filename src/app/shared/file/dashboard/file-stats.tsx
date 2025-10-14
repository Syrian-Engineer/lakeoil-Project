'use client';

import { Button, Text } from 'rizzui';
import cn from '@/utils/class-names';
import { useScrollableSlider } from '@/hooks/use-scrollable-slider';
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';
import MetricCard from '@/components/cards/metric-card';
import CircleProgressBar from '@/components/charts/circle-progressbar';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FuelSpinner from '@/components/FuelSpinner';
import { getStationNameByLicense } from '@/hooks/getStationNameByLicense';

type FileStatsType = {
  className?: string;
  stationSerial:string
};

interface TankData {
  id: number;
  tank_id: string;
  probe_id: string;
  tank_name: string;
  product_name: string;
  fuel_volume: number;
  fuel_volume_15: number;
  tank_capacity: number;
  average_temp: number;
  water_volume: number;
  updated_at: string;
  date: string;
  EWURALicenseNo: string;
  LicenseeTraSerialNo: string;
}

// ================== Tank Grid =====================
function FileStatGrid({
  className,
  tanks,
}: {
  className?: string;
  tanks: TankData[];
}) {
  return (
    <>
      {tanks.map((tank) => {
        const percentage =
          tank.tank_capacity > 0
            ? ((tank.fuel_volume / tank.tank_capacity) * 100).toFixed(1)
            : 0;

        return (
          <MetricCard
            key={tank.id}
            title={`${getStationNameByLicense(tank.EWURALicenseNo)}`}
            metric={`${tank.tank_name}`}
            metricClassName="3xl:text-[22px]"
            className={cn('w-full max-w-full justify-between', className)}
            chart={
              <CircleProgressBar
                percentage={Number(percentage)}
                size={80}
                stroke="#D7E3FE"
                strokeWidth={7}
                progressColor="#3872FA"
                useParentResponsive={true}
                label={
                  <Text
                    as="span"
                    className="font-lexend text-base font-medium text-gray-700"
                  >
                    {percentage}%
                  </Text>
                }
                strokeClassName="dark:stroke-gray-300"
              />
            }
          >
            <Text className="mt-3 flex items-center leading-none text-gray-500">
              {/* Updated at:{' '}
              {new Date(tank.updated_at).toLocaleString(undefined, {
                dateStyle: 'medium',
                timeStyle: 'short',
              })} */}
            </Text>
          </MetricCard>
        );
      })}
    </>
  );
}

// ================== Main Component =====================
export default function FileStats({ className,stationSerial }: FileStatsType) {
  const {
    sliderEl,
    sliderPrevBtn,
    sliderNextBtn,
    scrollToTheRight,
    scrollToTheLeft,
  } = useScrollableSlider();

  const router = useRouter();
  const [tanks, setTanks] = useState<TankData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const access_token =
    typeof window !== 'undefined'
      ? sessionStorage.getItem('access_token')
      : null;

  // Redirect if no token
  useEffect(() => {
    if (!access_token) {
      router.push('/signin');
    }
  }, [access_token, router]);

  // Fetch tanks
  const fetchTanks = useCallback(async () => {
    if (!access_token) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/tanks/get-tanks', {
        headers: {
          Authorization: access_token,
        },
      });

      if (!res.ok) throw new Error('Failed to fetch tanks');

      const data = await res.json();
      
      let fetchedTanks: TankData[] = data.tanks || [];

      // Filter tanks based on stationSerial unless "all"
      if (stationSerial && stationSerial !== "all") {
        fetchedTanks = fetchedTanks.filter(
          (tank) => tank.EWURALicenseNo === stationSerial
        );
      }

      setTanks(fetchedTanks);

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [access_token,stationSerial]);

  useEffect(() => {
    fetchTanks();
  }, [fetchTanks]);

  // Loading and error states
  if (loading)
    return( 
      <div className='w-full h-full flex justify-center items-center'> 
        <FuelSpinner word='Fueling Tanks' />
      </div>
      )
  if (error)
    return (
      <Text className="text-red-500">
        Failed to load tanks: {error}
      </Text>
    );

  return (
    <div
      className={cn(
        'relative flex w-auto items-center overflow-hidden',
        className
      )}
    >
      {/* Left Button */}
      <Button
        title="Prev"
        variant="text"
        ref={sliderPrevBtn}
        onClick={scrollToTheLeft}
        className="!absolute -left-1 top-0 z-10 !h-full w-20 !justify-start rounded-none bg-gradient-to-r from-gray-0 via-gray-0/70 to-transparent px-0 ps-1 text-gray-500 hover:text-gray-900 dark:from-gray-50 dark:via-gray-50/70 3xl:hidden"
      >
        <PiCaretLeftBold className="h-5 w-5" />
      </Button>

      {/* Scrollable Tanks */}
      <div className="w-full overflow-hidden">
        <div
          ref={sliderEl}
          className="custom-scrollbar grid grid-flow-col gap-5 overflow-x-auto scroll-smooth 2xl:gap-6 3xl:gap-8 [&::-webkit-scrollbar]:h-0"
        >
          <FileStatGrid className="min-w-[292px]" tanks={tanks} />
        </div>
      </div>

      {/* Right Button */}
      <Button
        title="Next"
        variant="text"
        ref={sliderNextBtn}
        onClick={scrollToTheRight}
        className="!absolute right-0 top-0 z-10 !h-full w-20 !justify-end rounded-none bg-gradient-to-l from-gray-0 via-gray-0/70 to-transparent px-0 text-gray-500 hover:text-gray-900 dark:from-gray-50 dark:via-gray-50/70 3xl:hidden"
      >
        <PiCaretRightBold className="h-5 w-5" />
      </Button>
    </div>
  );
}
