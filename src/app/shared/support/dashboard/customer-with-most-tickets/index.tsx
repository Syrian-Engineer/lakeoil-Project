'use client';

import { customersWithMostTicketColumns } from './columns';
import { customerWithTickets } from '@/app/_data/customer-with-most-tickets';
import WidgetCard from '@/components/cards/widget-card';
import { useTanStackTable } from '@/components/table/custom/use-TanStack-Table';
import Table from '@/components/table';
import cn from '@/utils/class-names';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { Input } from 'rizzui';

export type CustomersWithMostTicketDataType =
  (typeof customerWithTickets)[number];

export default function CustomerWithMostTickets({
  className,
}: {
  className?: string;
}) {
  const { table, setData } = useTanStackTable<CustomersWithMostTicketDataType>({
    tableData: customerWithTickets,
    columnConfig: customersWithMostTicketColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 5,
        },
      },
      meta: {
        handleDeleteRow: (row:any) => {
          setData((prev) => prev.filter((r) => r.id !== row.id));
        },
      },
      enableColumnResizing: false,
    },
  });
  return (
    <WidgetCard
      title="Customer With Most Tickets"
      className={cn('p-0 lg:p-0', className)}
      headerClassName="mb-6 px-5 pt-5 lg:px-7 lg:pt-7 items-center"
      action={
        <Input
          type="search"
          clearable={true}
          inputClassName="h-[36px]"
          placeholder="Search tickets..."
          onClear={() => table.setGlobalFilter('')}
          value={table.getState().globalFilter ?? ''}
          prefix={<PiMagnifyingGlassBold className="size-4" />}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          className="w-full max-w-64"
        />
      }
    >
      <Table
        table={table}
        variant="modern"
        classNames={{
          rowClassName: 'last:border-b-0',
        }}
      />
    </WidgetCard>
  );
}
