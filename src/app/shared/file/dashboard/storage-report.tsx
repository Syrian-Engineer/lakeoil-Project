// 'use client';

// import WidgetCard from '@/components/cards/widget-card';
// import { CustomTooltip } from '@/components/charts/custom-tooltip';
// import TrendingUpIcon from '@/components/icons/trending-up';
// import PeriodicReportsSpinner from '@/components/PeriodicReportsSpinner';
// import { useMedia } from '@/hooks/use-media';
// import { useDailyReports } from '@/hooks/useDailyReports';
// import { usePeriodicReports } from '@/hooks/usePeriodicReports';
// import cn from '@/utils/class-names';
// import { useState } from 'react';
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from 'recharts';
// import { Badge, Text, Title } from 'rizzui';

// function CustomYAxisTick({ x, y, payload }: any) {
//   return (
//     <g transform={`translate(${x},${y})`}>
//       <text x={4} y={0} dy={16} textAnchor="end" className="fill-gray-500 text-sm">
//         {`${payload.value.toLocaleString()}`}L
//       </text>
//     </g>
//   );
// }

// interface Props {
//   className?: string;
//   stationSerial: string;
// }

// export default function StorageReport({ className, stationSerial }: Props) {
//   const isMobile = useMedia('(max-width: 768px)', false);
//   const isDesktop = useMedia('(max-width: 1440px)', false);
//   const is2xl = useMedia('(max-width: 1780px)', false);
//   const [selectedTime,setSelectedTime] = useState("Cuurent Month");

//   const { dailyCurrent, dailyPrevious, monthlyCurrent, monthlyPrevious,loading } =
//     usePeriodicReports(stationSerial);

//   const {reports} = useDailyReports({stationSerial})

//     // Station Serial 
//     if(stationSerial === "all"){
//       return(
//         <WidgetCard title="Select Station">

//         </WidgetCard>
//       )
//     }
//     // 🔹 Spinner while loading
//     if (loading) {
//       return (
//         <WidgetCard
//           title=""
//           className="flex items-center justify-center h-96"
//         >
//           <PeriodicReportsSpinner size={90} text="Loading Reports..." />
//         </WidgetCard>
//       );
//     }


//   // Compute totals for each report
//   const computeTotalAmount = (arr: any[]) =>
//     arr.reduce((acc, item) => acc + (item.total_amount || 0), 0);

//   const mapReportToData = (reportArray: any[], label: string) => {
//     const dataEntry: Record<string, number | string> = {
//       month: label,
//       total_amount: computeTotalAmount(reportArray),
//     };
//     reportArray.forEach((item: any) => {
//       dataEntry[item.product] = item.total_amount;
//     });
//     return dataEntry;
//   };

//   const chartData = [
//     mapReportToData(dailyCurrent, 'Daily Current'),
//     mapReportToData(dailyPrevious, 'Daily Previous'),
//     mapReportToData(monthlyCurrent, 'Monthly Current'),
//     mapReportToData(monthlyPrevious, 'Monthly Previous'),
//   ];

//   // Get all unique product names
//   const products = Array.from(
//     new Set([
//       ...dailyCurrent,
//       ...dailyPrevious,
//       ...monthlyCurrent,
//       ...monthlyPrevious,
//     ].map((item: any) => item.product))
//   );

//   const colors = ['#282ECA', '#4052F6', '#96C0FF', '#DEEAFC'];

//   const handleBarClick = (newTime:string)=>{
//     setSelectedTime(newTime)
//   }
//   return (
//     <WidgetCard
//       title={'Total Liters '}
//       titleClassName="font-normal text-gray-700 sm:text-base font-inter"
//       description={
//         <div className="flex items-center justify-start text-lg">
//           <Title as="h2" className="me-2 font-semibold">
//             {computeTotalAmount(monthlyCurrent).toLocaleString()} Liters
//           </Title>
//           <Text className="flex items-center leading-none text-gray-500">
//             <Text
//               as="span"
//               className={cn(
//                 'me-2 inline-flex items-center font-medium text-green'
//               )}
//             >
//               <TrendingUpIcon className="me-1 h-4 w-4" />
//               32.40%
//             </Text>
//             {selectedTime}
//           </Text>
//         </div>
//       }
//       descriptionClassName="text-gray-500 mt-1.5"
//       action={
//         <div className="hidden @2xl:block">
//           {products.map((product, index) => (
//             <Badge
//               key={product}
//               renderAsDot
//               className={`me-0.5 ms-4 bg-[${colors[index] || '#DEEAFC'}]`}
//             >
//               {product}
//             </Badge>
//           ))}
//           <Badge renderAsDot className="me-0.5 ms-4 bg-[#DEEAFC] dark:bg-[#7c88b2]">
//             Total
//           </Badge>
//         </div>
//       }
//       className={className}
//     >
//       <div className="custom-scrollbar overflow-x-auto">
//         <div className="h-96 w-full pt-9">
//           <ResponsiveContainer width="100%" height="100%" minWidth={700}>
//             <BarChart
//               data={chartData}
//               barSize={isMobile ? 16 : isDesktop ? 28 : is2xl ? 32 : 46}
//               margin={{ left: 16 }}
//               className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
//             >
//               <CartesianGrid strokeDasharray="8 10" strokeOpacity={2.735} />
//               <XAxis dataKey="month" axisLine={false} tickLine={false} />
//               <YAxis axisLine={false} tickLine={false} tick={<CustomYAxisTick />} />
//               <Tooltip content={<CustomTooltip />} />
//               {products.map((product, index) => (   
//                   <Bar
//                     key={product}
//                     dataKey={product}
//                     fill={colors[index] || '#DEEAFC'}
//                     stackId="a"
//                     className='hover:cursor-pointer'
                    
//                   />
//               ))}
//               <Bar dataKey="total_amounte" fill="#DEEAFC" stackId="a" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </WidgetCard>
//   );
// }



// 'use client';

// import WidgetCard from '@/components/cards/widget-card';
// import { CustomTooltip } from '@/components/charts/custom-tooltip';
// import TrendingUpIcon from '@/components/icons/trending-up';
// import PeriodicReportsSpinner from '@/components/PeriodicReportsSpinner';
// import { useMedia } from '@/hooks/use-media';
// import { useDailyReports } from '@/hooks/useDailyReports';
// import cn from '@/utils/class-names';
// import { useState } from 'react';
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from 'recharts';
// import { Badge, Text, Title } from 'rizzui';

// function CustomYAxisTick({ x, y, payload }: any) {
//   return (
//     <g transform={`translate(${x},${y})`}>
//       <text
//         x={4}
//         y={0}
//         dy={16}
//         textAnchor="end"
//         className="fill-gray-500 text-sm"
//       >
//         {`${payload.value.toLocaleString()}`} $
//       </text>
//     </g>
//   );
// }

// // ✅ Stable color map (known product colors)
// const productColors: Record<string, string> = {
//   '91': '#1E3A8A',    // Deep blue
//   '95': '#2563EB',    // Bright royal blue
//   'Diesel': '#60A5FA', // Primary blue
//   'JetA1': '#60A5FA', // Soft sky blue
// };

// // ✅ Fallback color generator for unknown products
// const generateColor = (name: string) => {
//   let hash = 0;
//   for (let i = 0; i < name.length; i++) {
//     hash = name.charCodeAt(i) + ((hash << 5) - hash);
//   }
//   const color = Math.floor(Math.abs(Math.sin(hash) * 16777215) % 16777215).toString(16);
//   return `#${color.padStart(6, '0')}`;
// };

// interface Props {
//   className?: string;
//   stationSerial: string;
// }

// export default function StorageReport({ className, stationSerial }: Props) {
//   const isMobile = useMedia('(max-width: 768px)', false);
//   const isDesktop = useMedia('(max-width: 1440px)', false);
//   const is2xl = useMedia('(max-width: 1780px)', false);
//   const [selectedTime, setSelectedTime] = useState('Current Day');

//   const { reports, loading, error } = useDailyReports({ stationSerial });

//   // 🔹 Loading
//   if (loading) {
//     return (
//       <WidgetCard
//         title=""
//         className="flex items-center justify-center h-96"
//       >
//         <PeriodicReportsSpinner size={90} text="Loading Reports..." />
//       </WidgetCard>
//     );
//   }

//   // 🔹 Error
//   if (error) {
//     return (
//       <WidgetCard title="Error">
//         <Text className="text-red-500">{error}</Text>
//       </WidgetCard>
//     );
//   }

//   // 🔹 No Data
//   if (!reports || reports.length === 0) {
//     return (
//       <WidgetCard title="No Data">
//         <Text>No daily reports available for this station.</Text>
//       </WidgetCard>
//     );
//   }

//   // 🔹 Flatten product data
//   const allProducts = reports.flatMap((r) => r.products);
//   const products = Array.from(new Set(allProducts.map((p) => p.product)));

//   // 🔹 Prepare chart data using total_sales directly
//   const chartData = reports.map((r) => {
//     const entry: Record<string, number | string> = {
//       station: r.stationName,
//     };
//     r.products.forEach((p) => {
//       entry[p.product] = p.total_sales; // use total_sales
//     });
//     return entry;
//   });

//   return (
//     <WidgetCard
//       title="Total Sales (TZS)"
//       titleClassName="font-normal text-gray-700 sm:text-base font-inter"
//       description={
//         <div className="flex items-center justify-start text-lg">
//           <Title as="h2" className="me-2 font-semibold">
//             Daily Report
//           </Title>
//           <Text className="flex items-center leading-none text-gray-500">
//             <Text
//               as="span"
//               className={cn(
//                 'me-2 inline-flex items-center font-medium text-green'
//               )}
//             >
//               <TrendingUpIcon className="me-1 h-4 w-4" />
//               32.40%
//             </Text>
//             {selectedTime}
//           </Text>
//         </div>
//       }
//       descriptionClassName="text-gray-500 mt-1.5"
//       action={
//         <div className="hidden @2xl:block">
//           {products.map((product) => (
//             <Badge
//               key={product}
//               renderAsDot
//               className={`me-0.5 ms-4`}
//               style={{
//                 backgroundColor:
//                   productColors[product] || generateColor(product),
//               }}
//             >
//               {product}
//             </Badge>
//           ))}
//         </div>
//       }
//       className={className}
//     >
//       <div className="custom-scrollbar overflow-x-auto">
//         <div className="h-96 w-full pt-9">
//           <ResponsiveContainer width="100%" height="100%" minWidth={700}>
//             <BarChart
//               data={chartData}
//               barSize={isMobile ? 16 : isDesktop ? 28 : is2xl ? 32 : 46}
//               margin={{ left: 16 }}
//               className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
//             >
//               <CartesianGrid strokeDasharray="8 10" strokeOpacity={2.735} />
//               <XAxis dataKey="station" axisLine={false} tickLine={false} />
//               <YAxis
//                 axisLine={false}
//                 tickLine={false}
//                 tick={<CustomYAxisTick />}
//               />
//               <Tooltip content={<CustomTooltip />} />

//               {products.map((product) => (
//                 <Bar
//                   key={product}
//                   dataKey={product}
//                   fill={productColors[product] || generateColor(product)}
//                   stackId="a"
//                   className="hover:cursor-pointer"
//                 >
//                 </Bar>
//               ))}
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </WidgetCard>
//   );
// }




'use client';

import WidgetCard from '@/components/cards/widget-card';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import TrendingUpIcon from '@/components/icons/trending-up';
import PeriodicReportsSpinner from '@/components/PeriodicReportsSpinner';
import { useMedia } from '@/hooks/use-media';
import { useDailyReports } from '@/hooks/useDailyReports';
import cn from '@/utils/class-names';
import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Badge, Text, Title } from 'rizzui';

function CustomYAxisTick({ x, y, payload }: any) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={4}
        y={0}
        dy={16}
        textAnchor="end"
        className="fill-gray-500 text-sm"
      >
        {`${payload.value.toLocaleString()}`} $
      </text>
    </g>
  );
}

// 💙 Improved distinct blue shades
const bluePalette = [
  '#0A2E75', // deep navy blue
  '#1D4ED8', // royal blue
  '#2563EB', // electric blue
  '#3B82F6', // sky blue
  '#60A5FA', // baby blue
  '#93C5FD', // ice blue
];

// Map of known products (consistent)
const productColors: Record<string, string> = {
  '91': bluePalette[1],
  '95': bluePalette[3],
  'Diesel': bluePalette[0],
  'JetA1': bluePalette[2],
};

// Fallback color generator with blue palette support
const getColorForProduct = (product: string, index: number) => {
  if (productColors[product]) return productColors[product];
  if (bluePalette[index % bluePalette.length]) return bluePalette[index % bluePalette.length];
  // fallback hash color (blue tint bias)
  let hash = 0;
  for (let i = 0; i < product.length; i++) {
    hash = product.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = (Math.abs(hash) % 40) + 200; // keep hue in blue range (200–240)
  return `hsl(${hue}, 85%, 55%)`;
};

interface Props {
  className?: string;
  stationSerial: string;
}

export default function StorageReport({ className, stationSerial }: Props) {
  const isMobile = useMedia('(max-width: 768px)', false);
  const isDesktop = useMedia('(max-width: 1440px)', false);
  const is2xl = useMedia('(max-width: 1780px)', false);
  const [selectedTime] = useState('Current Day');

  const { reports, loading, error } = useDailyReports({ stationSerial });

  // 🔹 Loading
  if (loading) {
    return (
      <WidgetCard
        title=""
        className="flex items-center justify-center h-96"
      >
        <PeriodicReportsSpinner size={90} text="Loading Reports..." />
      </WidgetCard>
    );
  }

  // 🔹 Error
  if (error) {
    return (
      <WidgetCard title="Error">
        <Text className="text-red-500">{error}</Text>
      </WidgetCard>
    );
  }

  // 🔹 No Data
  if (!reports || reports.length === 0) {
    return (
      <WidgetCard title="No Data">
        <Text>No daily reports available for this station.</Text>
      </WidgetCard>
    );
  }

  // 🔹 Flatten product data
  const allProducts = reports.flatMap((r) => r.products);
  const products = Array.from(new Set(allProducts.map((p) => p.product)));

  // 🔹 Prepare chart data using total_sales directly
  const chartData = reports.map((r) => {
    const entry: Record<string, number | string> = {
      station: r.stationName,
    };
    r.products.forEach((p) => {
      entry[p.product] = p.total_sales;
    });
    return entry;
  });

  return (
    <WidgetCard
      title="Total Sales (TZS)"
      titleClassName="font-normal text-gray-700 sm:text-base font-inter"
      description={
        <div className="flex items-center justify-start text-lg">
          <Title as="h2" className="me-2 font-semibold">
            Daily Report
          </Title>
          <Text className="flex items-center leading-none text-gray-500">
            <Text
              as="span"
              className={cn(
                'me-2 inline-flex items-center font-medium text-green'
              )}
            >
              <TrendingUpIcon className="me-1 h-4 w-4" />
              32.40%
            </Text>
            {selectedTime}
          </Text>
        </div>
      }
      descriptionClassName="text-gray-500 mt-1.5"
      action={
        <div className="hidden @2xl:block">
          {products.map((product, index) => (
            <Badge
              key={product}
              renderAsDot
              className="me-0.5 ms-4"
              style={{
                backgroundColor: getColorForProduct(product, index),
              }}
            >
              {product}
            </Badge>
          ))}
        </div>
      }
      className={className}
    >
      <div className="custom-scrollbar overflow-x-auto">
        <div className="h-96 w-full pt-9">
          <ResponsiveContainer width="100%" height="100%" minWidth={700}>
            <BarChart
              data={chartData}
              barSize={isMobile ? 16 : isDesktop ? 28 : is2xl ? 32 : 46}
              margin={{ left: 16 }}
              className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
            >
              <CartesianGrid strokeDasharray="8 10" strokeOpacity={2.735} />
              <XAxis dataKey="station" axisLine={false} tickLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={<CustomYAxisTick />}
              />
              <Tooltip content={<CustomTooltip />} />

              {products.map((product, index) => (
                <Bar
                  key={product}
                  dataKey={product}
                  fill={getColorForProduct(product, index)}
                  stackId="a"
                  className="hover:cursor-pointer"
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </WidgetCard>
  );
}
