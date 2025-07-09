'use client'

import { RootState } from '@/store';
import { pumpTotalizerTranslations } from '@/translations/pumpPage/pumptotalizerTranslations';
import { translate } from '@/translations/translate';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Text } from 'rizzui';

interface Props {
    ElectronicTotalizer: number;
    VirtualTotalizer: number;
    Difference: number;
}


export default function PumpData({ ElectronicTotalizer, VirtualTotalizer, Difference }: Props) {
    const [language,setLanguage] = useState("");

    // for translations 
        const lang = useSelector((state:RootState)=>state.language.language);
        const mechnicalTotalizer = translate(pumpTotalizerTranslations,lang,"mechnicalTotalizer");
        const virtualTotalizer = translate(pumpTotalizerTranslations,lang,"virtualTotalizer");
        const difference = translate(pumpTotalizerTranslations,lang,"difference");


        useEffect(()=>{
            if(lang ==="en"){
                setLanguage("Engilsh")
            }else{
                setLanguage("Arabic")
            }
        },[lang])

        
    return (
        <div>
            <ul className='flex flex-col gap-5 mt-3 p-4'>
                <li className="relative pl-6">
                <span className={`absolute top-1/2 transform -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-green-500 ${lang === 'ar' ? '-right-4' : 'left-0'}`}/>
                    <div className="flex items-center justify-between">
                        <Text className={`text-gray-600 font-semibold text-lg ${mechnicalTotalizer.className}`}>{mechnicalTotalizer.text}</Text>
                        <div className='rounded-full border-2 border-green-500 px-3 p-1 flex justify-center items-center hover:scale-95 transition-all duration-300'>
                            <Text 
                             className='font-semibold text-md '
                             >{ElectronicTotalizer.toFixed(2)}
                            </Text>
                        </div>
                    </div>
                </li>
                <li className="relative pl-6">
                <span className={`absolute top-1/2 transform -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-blue-500 ${lang === 'ar' ? '-right-4' : 'left-0'}`}/>
                    <div className="flex items-center justify-between">
                        <Text className={`text-gray-600 font-semibold text-lg ${virtualTotalizer.className}`}>{virtualTotalizer.text}</Text>
                        <div className='rounded-full border-2 border-blue-800 px-3 p-1 flex justify-center items-center hover:scale-95 transition-all duration-300'>
                            <Text 
                             className='font-semibold text-md '
                             >{VirtualTotalizer.toFixed(2)}
                            </Text>
                        </div>
                    </div>
                </li>
                <li className="relative pl-6">
                <span className={`absolute top-1/2 transform -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cyan-500 ${lang === 'ar' ? '-right-4' : 'left-0'}`}/>
                    <div className="flex items-center justify-between">
                        <Text className={`text-gray-600 font-semibold text-lg ${difference.className}`}>{difference.text}</Text>
                        <div className='rounded-full border-2 border-cyan-500 px-3 p-1 flex justify-center items-center hover:scale-95 transition-all duration-300'>
                            <Text 
                             className='font-semibold text-md '
                             >{Difference.toFixed(2)}
                            </Text>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}
