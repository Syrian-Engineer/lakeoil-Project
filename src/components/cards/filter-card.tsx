'use client';

import React, { useEffect, useState } from 'react';
import { Select, Title, Text } from 'rizzui';

export default function FilterCard() {
  const [pumpOptions, setPumpOptions] = useState([]);
  const [tankOptions, setTankOptions] = useState([]);
  const [nozzleOptions, setNozzleOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilters = async () => {
      const token = sessionStorage.getItem('access_token');

      try {
        const res = await fetch('/api/filter-options', {
          headers: {
            Authorization: token ?? '',
          },
        });

        const { pumps, tanks, nozzles, products } = await res.json();

        // Transform each array of objects to [{ label, value }] format
        setPumpOptions(
          pumps?.data?.page_records.map((item: any) => ({
            label: item.name,
            value: item.name.toLowerCase().replace(/\s+/g, '_'),
          })) || []
        );

        setTankOptions(
          tanks?.data?.page_records.map((item: any) => ({
            label: item.name,
            value: item.name.toLowerCase().replace(/\s+/g, '_'),
          })) || []
        );

        setNozzleOptions(
          nozzles?.data?.page_records.map((item: any) => ({
            label: item.name,
            value: item.name.toLowerCase().replace(/\s+/g, '_'),
          })) || []
        );

        setProductOptions(
          products?.data?.page_records.map((item: any) => ({
            label: item.name,
            value: item.name.toLowerCase().replace(/\s+/g, '_'),
          })) || []
        );
      } catch (err) {
        console.error('Failed to load filter data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  return (
    <div className="rounded-md border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-100/20">
      <Title as="h1" className="text-lg font-semibold mb-4">
        Select Filters
      </Title>

      {loading ? (
        <Text>Loading filters...</Text>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Text className="mb-2 font-medium text-gray-700">Pump</Text>
            <Select options={pumpOptions} placeholder="Select a pump" />
          </div>

          <div>
            <Text className="mb-2 font-medium text-gray-700">Tank</Text>
            <Select options={tankOptions} placeholder="Select a tank" />
          </div>

          <div>
            <Text className="mb-2 font-medium text-gray-700">Nozzle</Text>
            <Select options={nozzleOptions} placeholder="Select a nozzle" />
          </div>

          <div>
            <Text className="mb-2 font-medium text-gray-700">Product</Text>
            <Select options={productOptions} placeholder="Select a product" />
          </div>
        </div>
      )}
    </div>
  );
}
