"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { translate } from "@/translations/translate";
import { tankHomeTranslations } from "@/translations/TankPage/home";
import { Badge } from "rizzui/badge";

interface Props{
    capacity:number,
    fuelVolume:number,
    fuel_volume_15:number,
    water_volume:number,
    average_temp:number,
    probe_id:string
}


export default function TankDetails ({capacity,fuelVolume,fuel_volume_15,water_volume,average_temp,probe_id}:Props){
    const lang = useSelector((state: RootState) => state.language.language);
    const tankDetailsText = translate(tankHomeTranslations, lang, "tankDetails").text;
    const capacityText = translate(tankHomeTranslations, lang, "capacity").text;
    const currentText = translate(tankHomeTranslations, lang, "current").text;
    const at15Text = translate(tankHomeTranslations, lang, "at15").text;
    const waterText = translate(tankHomeTranslations, lang, "water").text;
    const tempText = translate(tankHomeTranslations, lang, "temp").text;
    const probeIdText = translate(tankHomeTranslations, lang, "probeId").text;

    return(
<div className="mt-4 rounded-lg bg-gray-50 border border-gray-200 p-3 shadow-inner text-gray-500">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              {tankDetailsText}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Badge className=" bg-gray-400 shadow-sm border px-2 py-1">
                {capacityText}: {capacity} L
              </Badge>
              <Badge className=" bg-gray-400 shadow-sm border px-2 py-1">
                {currentText}: {fuelVolume} L
              </Badge>
              <Badge className=" bg-gray-400 shadow-sm border px-2 py-1">
                {at15Text}: {fuel_volume_15} L
              </Badge>
              <Badge className=" bg-gray-400 shadow-sm border px-2 py-1">
                {waterText}: {water_volume} L
              </Badge>
              <Badge className=" bg-gray-400 shadow-sm border px-2 py-1">
                {tempText}: {average_temp}°C
              </Badge>
              <Badge className=" bg-gray-400 shadow-sm border px-2 py-1">
                {probeIdText}: {probe_id}
              </Badge>
            </div>
          </div>
    )
}