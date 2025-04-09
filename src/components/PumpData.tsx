import { Text } from 'rizzui';

interface Props {
    ElectronicTotalizer: string;
    VirtualTotalizer: string;
    Difference: string;
}

export default function PumpData({ ElectronicTotalizer, VirtualTotalizer, Difference }: Props) {
    return (
        <div>
            <ul className='flex flex-col gap-5 mt-3'>
                <li className="relative pl-6">
                    <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-green-500"></span>
                    <div className="flex items-center justify-between">
                        <Text className='text-gray-400 font-semibold'>Electronic Totalizer</Text>
                        <div className='rounded-full border-2 border-green-500 px-3 p-1 flex justify-center items-center'>
                            <Text className='font-semibold'>{ElectronicTotalizer}</Text>
                        </div>
                    </div>
                </li>
                <li className="relative pl-6">
                    <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-blue-800"></span>
                    <div className="flex items-center justify-between">
                        <Text className='text-gray-400 font-semibold'>Virtual Totalizer</Text>
                        <div className='rounded-full border-2 border-blue-800 px-3 p-1 flex justify-center items-center'>
                            <Text className='font-semibold'>{VirtualTotalizer}</Text>
                        </div>
                    </div>
                </li>
                <li className="relative pl-6">
                    <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
                    <div className="flex items-center justify-between">
                        <Text className='text-gray-400 font-semibold'>Difference</Text>
                        <div className='rounded-full border-2 border-cyan-500 px-3 p-1 flex justify-center items-center'>
                            <Text className='font-semibold'>{Difference}</Text>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}
