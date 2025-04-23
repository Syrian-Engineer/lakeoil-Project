'use client';

import { PiFileTextDuotone, PiPulseDuotone, PiSlidersHorizontalDuotone } from 'react-icons/pi';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import { ActionIcon } from 'rizzui/action-icon';

const data = [
  { name: 'Available storage', value: 22 },
  { name: 'Total used storage', value: 78 },
];
const COLORS = ['#BFDBFE', '#0070F3'];

export default function Tank({ className }: { className?: string }) {
        return (
            <div className='w-full h-full p-5 flex flex-col border-2 border-gray-200 rounded-xl'>
            {/* First Part */}
            <div className='flex justify-between'>
              <div>
                <h1 className='text-lg font-extrabold'>Tank Name: Diesel Tank</h1>
                <p className='text-lg text-red-600 mt-1'>Logging: Disabled</p>
              </div>
              <div>
                <ActionIcon variant="outline" rounded="full">
                  <PiSlidersHorizontalDuotone className="h-auto w-6" />
                </ActionIcon>
              </div>
            </div>
          
            {/* Second Part */}
            <div className='flex w-full justify-between'>
              {/* Pie chart and buttons */}
              <div className="flex-1 h-[250px]  flex justify-center items-center">
                <ResponsiveContainer width={180}>
                  <PieChart className="[&_.recharts-layer:focus]:outline-none [&_.recharts-sector:focus]:outline-none dark:[&_.recharts-text.recharts-label]:first-of-type:fill-black">
                    <Pie
                      data={data}
                      cornerRadius={40}
                      innerRadius={70}
                      outerRadius={90}
                      paddingAngle={10}
                      fill="#BFDBFE"
                      stroke="rgba(0,0,0,0)"
                      dataKey="value"
                    >
                      <Label
                        width={30}
                        position="center"
                        content={
                          <CustomLabel value1={data[1].value} value2={'Used of 100'} />
                        }
                      ></Label>
                      {data.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Probe and Filling Order Info buttons */}
              <div className='flex flex-col items-center justify-center gap-20'>
                <div className='border-2 border-green-600 rounded-full px-4 p-1'>
                  <p className='font-bold text-sm'>Probe</p>
                </div>
                <div className='border-2 border-green-600 rounded-full px-4 p-1'>
                  <p className='font-bold xxs:text-sm custom:text-sm '>Filling Order Info</p>
                </div>
              </div>
            </div>
          
            {/* Third Part */}
             <div className='flex justify-between mt-5'>
                <div className='flex flex-col gap-12'>
                    <div className='flex gap-3'>
                        <div className='flex items-center justify-center w-10 h-12 p-1 bg-red-100 rounded-md'>
                            <p className='text-red-500 text-3xl'><PiFileTextDuotone /></p>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='font-semibold '>Fuel Type</p>
                            <p className='font-extrabold text-sm lg:text-lg text-slate-950 '>Diesel</p>
                        </div>
                    </div>
                    <div className='flex gap-3'>
                        <div className='flex items-center justify-center w-10 h-12 p-1 bg-red-100 rounded-md'>
                            <p className='text-red-500 text-3xl'><PiFileTextDuotone /></p>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='font-semibold '>Fuel Capacity</p>
                            <p className='font-extrabold text-sm lg:text-lg text-slate-950 '>25000 Liters</p>
                        </div>
                    </div>
                    <div className='flex gap-3'>
                        <div className='flex items-center justify-center w-10 h-12 p-1 bg-red-100 rounded-md'>
                            <p className='text-red-500 text-3xl'><PiFileTextDuotone /></p>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='font-semibold '>Fuel Level</p>
                            <p className='font-extrabold text-sm lg:text-lg text-slate-950 '>1008.45 mm</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-12 '>
                    <div className='flex gap-3'>
                        <div className='flex items-center justify-center w-10 h-12 p-1 bg-purple-100 rounded-md'>
                            <p className='text-purple-500 text-3xl'><PiPulseDuotone /></p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold '>Current Volume</p>
                            <p className='font-extrabold text-sm lg:text-lg text-slate-950 '>N/A Liters</p>
                        </div>
                    </div>
                    <div className='flex gap-3'>
                        <div className='flex items-center justify-center w-10 h-12 p-1 bg-purple-100 rounded-md'>
                            <p className='text-purple-500 text-3xl'><PiPulseDuotone /></p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold '>Fuel Level</p>
                            <p className='font-extrabold text-sm lg:text-lg text-slate-950 '>1000.54 mm</p>
                        </div>
                    </div>
                    <div className='flex gap-3'>
                        <div className='flex items-center justify-center w-10 h-12 p-1 bg-purple-100 rounded-md'>
                            <p className='text-purple-500 text-3xl'><PiPulseDuotone /></p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold '>Temperature</p>
                            <p className='font-extrabold text-sm lg:text-lg text-slate-950 '>0 C</p>
                        </div>
                    </div>
                </div>      
             </div>
          </div>
        );
      }

function CustomLabel(props: any) {
  const { cx, cy } = props.viewBox;
  return (
    <>
      <text
        x={cx}
        y={cy - 5}
        fill="#111111"
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
      >
        <tspan alignmentBaseline="middle" fontSize="36px">
          {props.value1} GB
        </tspan>
      </text>
      <text
        x={cx}
        y={cy + 20}
        fill="#666666"
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
      >
        <tspan fontSize="14px">{props.value2}</tspan>
      </text>
    </>
  );
}
