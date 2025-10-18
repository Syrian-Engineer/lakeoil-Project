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
//         x={12}
//         y={0}
//         dy={16}
//         textAnchor="end"
//         className="fill-gray-500 text-sm"
//       >
//         {`${payload.value.toLocaleString()}`} SAR
//       </text>
//     </g>
//   );
// }

// // 💙 Improved distinct blue shades
// const bluePalette = [
//   '#0A2E75', // deep navy blue
//   '#1D4ED8', // royal blue
//   '#2563EB', // electric blue
//   '#3B82F6', // sky blue
//   '#60A5FA', // baby blue
//   '#93C5FD', // ice blue
// ];

// // Map of known products (consistent)
// const productColors: Record<string, string> = {
//   '91': "#22c55e",
//   '95': "#ef4444",
//   'Diesel': "#facc15",
//   'JetA1': bluePalette[2],
// };

// // Fallback color generator with blue palette support
// const getColorForProduct = (product: string, index: number) => {
//   if (productColors[product]) return productColors[product];
//   if (bluePalette[index % bluePalette.length]) return bluePalette[index % bluePalette.length];
//   // fallback hash color (blue tint bias)
//   let hash = 0;
//   for (let i = 0; i < product.length; i++) {
//     hash = product.charCodeAt(i) + ((hash << 5) - hash);
//   }
//   const hue = (Math.abs(hash) % 40) + 200; // keep hue in blue range (200–240)
//   return `hsl(${hue}, 85%, 55%)`;
// };

// interface Props {
//   className?: string;
//   stationSerial: string;
// }

// export default function StorageReport({ className, stationSerial }: Props) {
//   const isMobile = useMedia('(max-width: 768px)', false);
//   const isDesktop = useMedia('(max-width: 1440px)', false);
//   const is2xl = useMedia('(max-width: 1780px)', false);
//   const [selectedTime] = useState('Current Day');

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
//       entry[p.product] = p.total_sales;
//     });
//     return entry;
//   });

//   return (
//     <WidgetCard
//       title="Total Sales"
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
//           {products.map((product, index) => (
//             <Badge
//               key={product}
//               renderAsDot
//               className="me-0.5 ms-4"
//               style={{
//                 backgroundColor: getColorForProduct(product, index),
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

//               {products.map((product, index) => (
//                 <Bar
//                   key={product}
//                   dataKey={product}
//                   fill={getColorForProduct(product, index)}
//                   stackId="a"
//                   className="hover:cursor-pointer"
//                 />
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

// ✅ Custom Y-Axis tick
function CustomYAxisTick({ x, y, payload }: any) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={12}
        y={0}
        dy={16}
        textAnchor="end"
        className="fill-gray-500 text-sm"
      >
        {`${payload.value.toLocaleString()}`} SAR
      </text>
    </g>
  );
}

// ✅ Distinct blue shades for fallback colors
const bluePalette = [
  '#0A2E75', // deep navy blue
  '#1D4ED8', // royal blue
  '#2563EB', // electric blue
  '#3B82F6', // sky blue
  '#60A5FA', // baby blue
  '#93C5FD', // ice blue
];

// ✅ Explicit color mapping
const productColors: Record<string, string> = {
  '91': '#4ADE80',     // green
  '95': '#F87171',     // red
  'diesel': '#FACC15', // yellow
  'jeta1': bluePalette[2], // blue
};

// ✅ Smarter color detection (handles variations like “Gasoline 91”, “Diesesl”, etc.)
const getColorForProduct = (product: string, index: number): string => {
  const lower = product.toLowerCase();

  if (lower.includes('91')) return productColors['91'];
  if (lower.includes('95')) return productColors['95'];
  if (lower.includes('diesel') || lower.includes('diesesl') || lower.includes("dsl"))
    return productColors['diesel'];
  if (lower.includes('jeta1') || lower.includes('jet a1'))
    return productColors['jeta1'];

  // fallback: blue shades for unknown
  return bluePalette[index % bluePalette.length];
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
      <WidgetCard className="flex items-center justify-center h-96">
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
    const entry: Record<string, number | string> = { station: r.stationName };
    r.products.forEach((p) => {
      entry[p.product] = p.total_sales;
    });
    return entry;
  });

  return (
    <WidgetCard
      title="Total Sales"
      titleClassName="font-normal text-gray-700 sm:text-base font-inter"
      description={
        <div className="flex items-center justify-start text-lg">
          <Title as="h2" className="me-2 font-semibold">
            Daily Report
          </Title>
          <Text className="flex items-center leading-none text-gray-500">
            <Text
              as="span"
              className={cn('me-2 inline-flex items-center font-medium text-green')}
            >
              {/* <TrendingUpIcon className="me-1 h-4 w-4" />
              32.40% */}
            </Text>
            10:00 AM
          </Text>
        </div>
      }
      descriptionClassName="text-gray-500 mt-1.5"
      // action={
      //   <div className="hidden @2xl:block">
      //     {products.map((product, index) => (
      //       <Badge
      //         key={product}
      //         renderAsDot
      //         className="me-0.5 ms-4"
      //         style={{
      //           backgroundColor: getColorForProduct(product, index),
      //         }}
      //       >
      //         {product}
      //       </Badge>
      //     ))}
      //   </div>
      // }
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
              <YAxis axisLine={false} tickLine={false} tick={<CustomYAxisTick />} />
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
