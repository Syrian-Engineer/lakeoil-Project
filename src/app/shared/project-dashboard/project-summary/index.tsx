'use client';

import React, { use, useEffect, useState } from 'react';
import cn from '@/utils/class-names';
import { getColumns } from './column';
import ProjectSummaryToolbar from './toolbar';
import Table from '@/components/table';
import WidgetCard from '@/components/cards/widget-card';
import TablePagination from '@/components/table/pagination';
import { useTanStackTable } from '@/components/custom/use-TanStack-Table';
import { useAtom } from 'jotai';
import { showFilterCardAtom } from '@/atoms/ui-atoms';
import { filterAtom } from '@/atoms/filter';
import FilterCard from '@/components/cards/filter-card';

export interface ProjectSummaryDataType  {
  id:number,
  sales_id:number,
  receipt_id:number,
  station_name:string,
  creation_date:string,
  pump_name:string,
  nozzle_name:string,
  product_name:string,
  tank_name:string,
  volume:number,
  amount:number,
  price:number,
  car_plate:string | null,
}

export default function ProjectSummary({ className }: { className?: string }) {
  const [data, setData] = useState<ProjectSummaryDataType[]>([]);
  const [loading, setLoading] = useState(true);

  const [showFilterCard] = useAtom(showFilterCardAtom)  // use jotai here 

  const [filters] = useAtom(filterAtom)
  const { filtered_pumps, filtered_tanks, filtered_nozzles, filtered_products } = filters;
  const [allfiltersEmpty,setAllFiltersEmpty] = useState(true)
  
  const allEmpty =
      filtered_pumps.length === 0 &&
      filtered_tanks.length === 0 &&
      filtered_nozzles.length === 0 &&
      filtered_products.length === 0;

  useEffect(() => {
      setAllFiltersEmpty(allEmpty);
  }, [allEmpty]);

  //for fetching data Without query Parameteres
  useEffect(() => {

    if (!allfiltersEmpty) return; // 🛑 If any filter is active, skip this
  
    const fetchData = async () => {
      const accessToken = sessionStorage.getItem('access_token');
  
      try {
        const res = await fetch('/api/sales-reports', {
          method: 'GET',
          headers: {
            Authorization: `${accessToken}`,
          },
        });
  
        if (res.ok) {
          const result = await res.json();
          setData(result.data.page_records || []);
        } else {
          console.error('Failed to fetch sales reports');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [allfiltersEmpty]);

  //for fetching Data With Query Parameteres
  useEffect(() => {
    if (allfiltersEmpty) return;
  
    const fetchFilteredData = async () => {
      setLoading(true);
      const accessToken = sessionStorage.getItem('access_token');
      const queryParams = buildQueryParams();
  
      try {
        const res = await fetch(`/api/sales-reports/filtered?${queryParams}`, {
          method: 'GET',
          headers: {
            Authorization: `${accessToken}`,
          },
        });
  
        if (res.ok) {
          const result = await res.json();
          setData(result.data.page_records || []);
        } else {
          console.error('Failed to fetch filtered sales reports');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchFilteredData();
  }, [allfiltersEmpty, filtered_pumps, filtered_tanks, filtered_nozzles, filtered_products]);


  const buildQueryParams = () => {
    const query = new URLSearchParams();
  
    filtered_pumps.forEach((pump) => query.append('pump_names', pump.label));
    filtered_tanks.forEach((tank) => query.append('tank_names', tank.label));
    filtered_nozzles.forEach((nozzle) => query.append('nozzle_names', nozzle.label));
    filtered_products.forEach((product) => query.append('product_names', product.label));
  
    query.append('page_number', '1'); // Example static param
  
    return query.toString();
  };

  // ✅ These hooks are called no matter what
  const allColumns = getColumns();
  const { table } = useTanStackTable<ProjectSummaryDataType>({
    tableData: data,
    columnConfig: allColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 20,
        },
      },
      enableColumnResizing: false,
    },
  });

  return (
      <div className={cn("",className)}>
        {showFilterCard && (
          <div>
            <FilterCard />
          </div>
        )}
        <WidgetCard
          title="Reports"
          actionClassName="ps-0 w-full @xl:ps-2 @xl:w-auto"
          headerClassName="flex-wrap gap-4 @xl:flex-nowrap mb-4 px-5 pt-5 lg:px-7 lg:pt-7"
          className={cn(
            'space-y-4 p-0 @container dark:bg-gray-100/50 lg:p-0',
            className
          )}
          action={
            <ProjectSummaryToolbar
              table={table}
              className="w-fit justify-between"
            />
          }
        >
          {/* Show loading UI */}
          {loading ? (
            <div className="p-6">Loading reports...</div>
          ) : data.length === 0 ? (
            <div className="p-6">No sales reports found.</div>
          ) : (
            <>
              <Table
                table={table}
                variant="modern"
                classNames={{
                  headerCellClassName: 'first:ps-6',
                  cellClassName: 'first:ps-6',
                }}
              />
              <TablePagination table={table} className="p-4 pt-0" />
            </>
          )}
        </WidgetCard>
      </div>
  );
}
