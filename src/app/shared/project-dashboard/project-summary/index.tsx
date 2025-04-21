'use client'

import React, { useEffect, useState } from 'react';
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
import { isSuperAdmin } from '@/atoms/superAdminDetails';

export interface ProjectSummaryDataType {
  id: number;
  sales_id: number;
  receipt_id: number;
  station_name: string;
  creation_date: string;
  pump_name: string;
  nozzle_name: string;
  product_name: string;
  tank_name: string;
  volume: number;
  amount: number;
  price: number;
  car_plate: string | null;
}

export default function ProjectSummary({ className }: { className?: string }) {
  const [data, setData] = useState<ProjectSummaryDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const [showFilterCard] = useAtom(showFilterCardAtom);
  const [filters] = useAtom(filterAtom);
  const { filtered_pumps, filtered_tanks, filtered_nozzles, filtered_products } = filters;
  const [allfiltersEmpty, setAllFiltersEmpty] = useState(true);

  const [isSuperAdminSiggned] = useAtom(isSuperAdmin);

  const allEmpty =
    filtered_pumps.length === 0 &&
    filtered_tanks.length === 0 &&
    filtered_nozzles.length === 0 &&
    filtered_products.length === 0;

  // ✅ Get access token after component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('access_token');
      setAccessToken(token);
    }
  }, []);

  useEffect(() => {
    setAllFiltersEmpty(allEmpty);
  }, [allEmpty]);

  // 🔍 Fetch unfiltered data (when no filters are applied)
  useEffect(() => {
    if (!accessToken || !allfiltersEmpty) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/sales-reports', {
          method: 'GET',
          headers: {
            Authorization: `${accessToken}`,
          },
        });

        const result = await res.json();
        if (res.ok) {
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
  }, [accessToken, allfiltersEmpty]);

  // 🔍 Fetch filtered data (when filters are applied)
  useEffect(() => {
    if (!accessToken || allfiltersEmpty) return;

    const fetchFilteredData = async () => {
      setLoading(true);
      const queryParams = buildQueryParams();

      try {
        const res = await fetch(`/api/sales-reports/filtered?${queryParams}`, {
          method: 'GET',
          headers: {
            Authorization: `${accessToken}`,
          },
        });

        const result = await res.json();
        if (res.ok) {
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
  }, [accessToken, allfiltersEmpty, filtered_pumps, filtered_tanks, filtered_nozzles, filtered_products]);

  // 🔧 Build query parameters for the filtered data request
  const buildQueryParams = () => {
    const query = new URLSearchParams();

    filtered_pumps.forEach((pump) => query.append('pump_names', pump.label));
    filtered_tanks.forEach((tank) => query.append('tank_names', tank.label));
    filtered_nozzles.forEach((nozzle) => query.append('nozzle_names', nozzle.label));
    filtered_products.forEach((product) => query.append('product_names', product.label));
    query.append('page_number', '1');  // Adjust page number as needed

    return query.toString();
  };

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
    <div className={cn('', className)}>
      {showFilterCard && <FilterCard />}
      <WidgetCard
        title="Reports"
        actionClassName="ps-0 w-full @xl:ps-2 @xl:w-auto"
        headerClassName="flex-wrap gap-4 @xl:flex-nowrap mb-4 px-5 pt-5 lg:px-7 lg:pt-7"
        className={cn('space-y-4 p-0 @container dark:bg-gray-100/50 lg:p-0', className)}
        action={
          <ProjectSummaryToolbar table={table} className="w-fit justify-between" />
        }
      >
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
