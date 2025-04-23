'use client';

import { ActionIcon, Title, Text } from 'rizzui';
import cn from '@/utils/class-names';
import WidgetCard from '@/components/cards/widget-card';
import { PiSlidersHorizontalDuotone } from 'react-icons/pi';
import { widgetData } from '@/app/_data/card-widgets-data';
import PumpData from '@/components/PumpData';

export default function BarChartList({ className }: { className?: string }) {
  return (
    <>
      {widgetData.map((item) => (
        <WidgetCard
          key={item.name}
          title={item.name}
          description={'Status:Discounted'}
          rounded="lg"
          action={
            <ActionIcon variant="outline" rounded="full">
              <PiSlidersHorizontalDuotone className="h-auto w-5" />
            </ActionIcon>
          }
          descriptionClassName="text-red-600 font-semibold mt-1"
          className={cn(className, 'max-w-full')}
        >
          <div className="mt-3 grid w-full grid-cols-1 justify-around gap-4 @sm:py-1.5 @7xl:gap-6">
          <div className="mt-2 grid w-full grid-cols-1 justify-around gap-2 @sm:py-1 @7xl:gap-4">
            <div className="grid grid-cols-2 gap-5">
              {item.stat.map((stat) => (
                <div key={stat.title} className="flex items-center">
                  <div
                    className={cn(
                      'me-2 flex h-7 w-7 items-center justify-center rounded-md bg-opacity-10 p-[4px]', // smaller icon
                      stat.bgColor,
                      stat.textColor
                    )}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <Text className="mb-0.5 text-gray-600 font-medium text-sm"> {/* smaller text */}
                      {stat.title}
                    </Text>
                    <Title as="h6" className="font-semibold text-xs"> {/* smaller text */}
                      {stat.metric}
                    </Title>
                  </div>
                </div>
              ))}
            </div>
          </div>


            <div className="h-[13rem] w-full @sm:pt-2">
              <p className="text-base font-semibold">Pump Totalizer Data</p>
              <PumpData
                ElectronicTotalizer="33%"
                VirtualTotalizer="42%"
                Difference="25%"
              />
              {/* Chart code can be added back here if needed */}
            </div>
          </div>
        </WidgetCard>
      ))}
    </>
  );
}
