'use client';

import { Input } from 'rizzui';
import cn from '@/utils/class-names';
import Table from '@/components/table';
import { recentCustomersColumns } from './columns';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import WidgetCard from '@/components/cards/widget-card';
import { recentCustomers } from '@/app/_data/recent-customers-data'; 
import TablePagination from '@/components/table/pagination';
import { useTanStackTable } from '@/components/table/custom/use-TanStack-Table';

export type RecentCustomersDataType = (typeof recentCustomers)[number];

export default function RecentCustomers({ className }: { className?: string }) {
  const { table } = useTanStackTable<RecentCustomersDataType>({
    tableData: recentCustomers,
    columnConfig: recentCustomersColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 7,
        },
      },
      enableColumnResizing: false,
    },
  });
  return (
    <WidgetCard
      title="Recent Customers"
      className={cn('p-0 lg:p-0', className)}
      headerClassName="mb-4 px-5 pt-5 lg:px-7 lg:pt-7"
      action={
        <Input
          type="search"
          placeholder="Search by customer name..."
          value={table.getState().globalFilter ?? ''}
          onClear={() => table.setGlobalFilter('')}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          inputClassName="h-9"
          clearable={true}
          prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
        />
      }
    >
      <Table table={table} variant="modern" />
      <TablePagination table={table} className="p-4" />
    </WidgetCard>
  );
}
