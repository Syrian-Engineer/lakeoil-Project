'use client';

import React, { useEffect, useState } from 'react';
import { Select, Title, Text, Button } from 'rizzui';
import { useSetAtom } from 'jotai';
import { filterAtom } from '@/atoms/filter';
import type { SelectOption } from 'rizzui';
import { showFilterCardAtom } from '@/atoms/ui-atoms';

export default function FilterCard() {
  const [pumpOptions, setPumpOptions] = useState<SelectOption[]>([]);
  const [tankOptions, setTankOptions] = useState<SelectOption[]>([]);
  const [nozzleOptions, setNozzleOptions] = useState<SelectOption[]>([]);
  const [productOptions, setProductOptions] = useState<SelectOption[]>([]);

  const [selectedPump, setSelectedPump] = useState<SelectOption[]>([]);
  const [selectedTank, setSelectedTank] = useState<SelectOption[]>([]);
  const [selectedNozzle, setSelectedNozzle] = useState<SelectOption[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<SelectOption[]>([]);

  const [loading, setLoading] = useState(true);

  const setFilterAtom = useSetAtom(filterAtom);
  const setShowFilterCard = useSetAtom(showFilterCardAtom);

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
    
        if (!pumpsRes.ok || !tanksRes.ok || !nozzlesRes.ok || !productsRes.ok) {
          const errDetails = await Promise.all([
            pumpsRes.json(), tanksRes.json(), nozzlesRes.json(), productsRes.json()
          ]);
          console.error("One or more filter fetches failed:", errDetails);
          return;
        }
    
        const [pumps, tanks, nozzles, products] = await Promise.all([
          pumpsRes.json(), tanksRes.json(), nozzlesRes.json(), productsRes.json()
        ]);
    
        const formatOptions = (items: any[] = []) =>
          items.map((item: any) => ({
            label: item.name,
            value: item.name,
          }));
    
        setPumpOptions(formatOptions(pumps?.data?.page_records));
        setTankOptions(formatOptions(tanks?.data?.page_records));
        setNozzleOptions(formatOptions(nozzles?.data?.page_records));
        setProductOptions(formatOptions(products?.data?.page_records));
      } catch (err) {
        console.error('Error fetching filter data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  const handleSelectChange = (
    options: SelectOption[] | null,
    setter: React.Dispatch<React.SetStateAction<SelectOption[]>>
  ) => {
    setter(options ?? []);
  };

  const handleClearSelect = (
    setter: React.Dispatch<React.SetStateAction<SelectOption[]>>
  ) => {
    setter([]);
  };

  const handleSaveFilters = () => {
    setFilterAtom({
      filtered_pumps: selectedPump,
      filtered_tanks: selectedTank,
      filtered_nozzles: selectedNozzle,
      filtered_products: selectedProduct,
    });
    // setShowFilterCard((prev) => !prev);
  };

  const filterConfigs = [
    {
      label: 'Pump',
      options: pumpOptions,
      value: selectedPump,
      setValue: setSelectedPump,
    },
    {
      label: 'Tank',
      options: tankOptions,
      value: selectedTank,
      setValue: setSelectedTank,
    },
    {
      label: 'Nozzle',
      options: nozzleOptions,
      value: selectedNozzle,
      setValue: setSelectedNozzle,
    },
    {
      label: 'Product',
      options: productOptions,
      value: selectedProduct,
      setValue: setSelectedProduct,
    },
  ];

  return (
    <div className="rounded-md border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-100/20">
      <div className="flex items-center justify-between mb-4">
        <Title as="h1" className="text-lg font-semibold">
          Select Filters
        </Title>
        <div className="flex gap-2">
          <Button
            size="sm"
            className="hover:scale-95 transition duration-300"
            variant="outline"
            onClick={() => {
              setSelectedPump([]);
              setSelectedTank([]);
              setSelectedNozzle([]);
              setSelectedProduct([]);
            }}
          >
            Clear Fields
          </Button>
          {(selectedPump.length > 0 ||
            selectedTank.length > 0 ||
            selectedNozzle.length > 0 ||
            selectedProduct.length > 0) && (
            <Button
              size="sm"
              className="bg-primary text-white hover:bg-primary/90 hover:scale-95 transition duration-300"
              onClick={handleSaveFilters}
            >
              Save Filters
            </Button>
          )}
        </div>
      </div>

      {loading ? (
        <Text>Loading filters...</Text>
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
        </div>
      )}
    </div>
  );
}
