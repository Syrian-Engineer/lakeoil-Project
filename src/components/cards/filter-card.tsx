'use client';

import React, { useEffect, useState } from 'react';
import { Select, Title, Text, Button, Input } from 'rizzui';
import { useSetAtom } from 'jotai';
import { filterAtom } from '@/atoms/filter';
import { showFilterCardAtom } from '@/atoms/ui-atoms';
import type { SelectOption } from 'rizzui';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { translate } from '@/translations/translate';
import { filterCardTranslations } from '@/translations/reportsPage/filterCardTranslation';

export default function FilterCard() {
  const [pumpOptions, setPumpOptions] = useState<SelectOption[]>([]);
  const [tankOptions, setTankOptions] = useState<SelectOption[]>([]);
  const [nozzleOptions, setNozzleOptions] = useState<SelectOption[]>([]);
  const [productOptions, setProductOptions] = useState<SelectOption[]>([]);
  const [stationOptions, setStationOption] = useState<SelectOption[]>([]);

  const [selectedPump, setSelectedPump] = useState<SelectOption[]>([]);
  const [selectedTank, setSelectedTank] = useState<SelectOption[]>([]);
  const [selectedNozzle, setSelectedNozzle] = useState<SelectOption[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<SelectOption[]>([]);
  const [selectedStation, setSelectedStation] = useState<SelectOption[]>([]);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [cardId, setCardId] = useState('');
  const [tagId, setTagId] = useState('');

  const [loading, setLoading] = useState(true);
  const [touched, setTouched] = useState(false); // ✅ NEW STATE

  const setFilterAtom = useSetAtom(filterAtom);
  const setShowFilterCard = useSetAtom(showFilterCardAtom);

  const isSuperAdmin = localStorage.getItem('isSuperAdmin');

  useEffect(() => {
    const fetchFilters = async () => {
      const token = sessionStorage.getItem('access_token');
      const headers = { Authorization: token ?? '' };

      try {
        const [pumpsRes, tanksRes, nozzlesRes, productsRes] = await Promise.all([
          fetch('/api/filters/pumps', { headers }),
          fetch('/api/filters/tanks', { headers }),
          fetch('/api/filters/nozzles', { headers }),
          fetch('/api/filters/products', { headers }),
        ]);

        const [pumps, tanks, nozzles, products] = await Promise.all([
          pumpsRes.json(), tanksRes.json(), nozzlesRes.json(), productsRes.json()
        ]);

        const formatOptions = (items: any[]): SelectOption[] => {
          const seen = new Set();
          return items
            .map((item) => item?.name)
            .filter((name) => name && !seen.has(name) && seen.add(name))
            .map((name) => ({
              label: name,
              value: name,
            }));
        };

        const formatStationOptions = (stations: any[] = []) =>
          stations.map((station: any) => ({
            label: station.name,
            value: station.serial_number,
          }));

        setPumpOptions(formatOptions(pumps?.data?.page_records || []));
        setTankOptions(formatOptions(tanks?.data?.page_records || []));
        setNozzleOptions(formatOptions(nozzles?.data?.page_records || []));
        setProductOptions(formatOptions(products?.data?.page_records || []));

        if (isSuperAdmin === 'true') {
          const stationsRes = await fetch('/api/filters/stations', { headers });
          const stations = await stationsRes.json();
          setStationOption(formatStationOptions(stations?.data));
        }

      } catch (err) {
        console.error('Error fetching filter data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  const formatDatetimeLocal = (value: string): string => {
    if (!value) return '';
    const [datePart, timePart] = value.split('T');
    const finalTime = timePart?.split(':').length === 2 ? `${timePart}:00` : timePart;
    return `${datePart} ${finalTime}`;
  };

  const handleSelectChange = (
    options: SelectOption[] | null,
    setter: React.Dispatch<React.SetStateAction<SelectOption[]>>
  ) => {
    setTouched(true); // ✅ mark as touched
    setter(options ?? []);
  };

  const handleClearSelect = (
    setter: React.Dispatch<React.SetStateAction<SelectOption[]>>
  ) => {
    setTouched(true); // ✅ mark as touched
    setter([]);
  };

  const handleSaveFilters = () => {
    setFilterAtom({
      filtered_pumps: selectedPump,
      filtered_tanks: selectedTank,
      filtered_nozzles: selectedNozzle,
      filtered_products: selectedProduct,
      filtered_stations: selectedStation,
      start_date: startDate,
      end_date: endDate,
      license_plate: licensePlate,
      card_id: cardId,
      tag_id: tagId,
    });
  };

  // for tranlsation 
  const lang = useSelector((state:RootState)=>state.language.language);
  const selectFilters = translate(filterCardTranslations,lang,"selectFilters");
  const clearFields = translate(filterCardTranslations,lang,"clearFields")
  const saveFilters = translate(filterCardTranslations,lang,"saveFilters")

  const pump = translate(filterCardTranslations,lang,"pump");
  const tank = translate(filterCardTranslations,lang,"tank");
  const nozzle = translate(filterCardTranslations,lang,"nozzle");
  const product = translate(filterCardTranslations,lang,"product");
  const station = translate(filterCardTranslations,lang,"station");



  // filter config
  const filterConfigs = [
    {
      label: `${pump.text}`,
      options: pumpOptions,
      value: selectedPump,
      setValue: setSelectedPump,
    },
    {
      label: `${tank.text}`,
      options: tankOptions,
      value: selectedTank,
      setValue: setSelectedTank,
    },
    {
      label: `${nozzle.text}`,
      options: nozzleOptions,
      value: selectedNozzle,
      setValue: setSelectedNozzle,
    },
    {
      label: `${product.text}`,
      options: productOptions,
      value: selectedProduct,
      setValue: setSelectedProduct,
    },
    ...(isSuperAdmin === 'true'
      ? [
          {
            label: `${station.text}`,
            options: stationOptions,
            value: selectedStation,
            setValue: setSelectedStation,
          },
        ]
      : []),
  ];
  return (
    <div className="rounded-md border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-100/20">
      <div className="flex items-center justify-between mb-4">
        <Title as="h1" className={`text-lg font-semibold ${selectFilters.className}`}>{selectFilters.text}</Title>
        <div className="flex gap-2">
          <Button
            size="sm"
            className={`hover:scale-95 transition duration-300 ${clearFields.className}`}
            variant="outline"
            onClick={() => {
              setTouched(true); // ✅ mark as touched
              setSelectedPump([]);
              setSelectedTank([]);
              setSelectedNozzle([]);
              setSelectedProduct([]);
              setSelectedStation([]);
              setStartDate('');
              setEndDate('');
              setLicensePlate('');
              setCardId('');
              setTagId('');
            }}
          >
            {clearFields.text}
          </Button>

          {touched && (
            <Button
              size="sm"
              className={`bg-primary text-white hover:bg-primary/90 hover:scale-95 transition duration-300 ${saveFilters.className}`}
              onClick={handleSaveFilters}
            >
              {saveFilters.text}
            </Button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-gray-500 border-solid"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {filterConfigs.map((filter) => (
            <div key={filter.label} className="relative">
              <Text className="mb-2 font-medium text-gray-700">{filter.label}</Text>
              <Select
                multiple
                options={filter.options}
                placeholder={`Select ${filter.label.toLowerCase()}(s)`}
                value={filter.value}
                onChange={(options) =>
                  handleSelectChange(options as SelectOption[], filter.setValue)
                }
                displayValue={(selected) =>
                  (selected as SelectOption[])
                    .map((s) => s.label)
                    .join(', ') || 'None selected'
                }
              />
              {filter.value.length > 0 && (
                <button
                  className="absolute top-2/3 right-7 transform -translate-y-1/2 text-gray-500 text-xs hover:text-gray-600"
                  onClick={() => handleClearSelect(filter.setValue)}
                  aria-label="Clear selection"
                >
                  ❌
                </button>
              )}
            </div>
          ))}

          {/* Start DateTime */}
          <div>
            <Text className="mb-2 font-medium text-gray-700">Start Date & Time</Text>
            <Input
              type="datetime-local"
              onChange={(e) => {
                setTouched(true); // ✅ mark as touched
                setStartDate(formatDatetimeLocal(e.target.value));
              }}
            />
          </div>

          {/* End DateTime */}
          <div>
            <Text className="mb-2 font-medium text-gray-700">End Date & Time</Text>
            <Input
              type="datetime-local"
              onChange={(e) => {
                setTouched(true); // ✅ mark as touched
                setEndDate(formatDatetimeLocal(e.target.value));
              }}
            />
          </div>

          {/* License Plate */}
          <div>
            <Text className="mb-2 font-medium text-gray-700">License Plate</Text>
            <Input
              type="text"
              placeholder="Enter License Plate"
              value={licensePlate}
              onChange={(e) => {
                setTouched(true); // ✅ mark as touched
                setLicensePlate(e.target.value);
              }}
            />
          </div>

          {/* Card ID */}
          <div>
            <Text className="mb-2 font-medium text-gray-700">Card ID</Text>
            <Input
              placeholder="Enter Card ID"
              value={cardId}
              onChange={(e) => {
                setTouched(true); // ✅ mark as touched
                setCardId(e.target.value);
              }}
            />
          </div>

          {/* Tag ID */}
          <div>
            <Text className="mb-2 font-medium text-gray-700">Tag ID</Text>
            <Input
              type="text"
              placeholder="Enter Tag ID"
              value={tagId}
              onChange={(e) => {
                setTouched(true); // ✅ mark as touched
                setTagId(e.target.value);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

