'use client';

import { ticketsData } from '@/app/_data/tickets-data';
import { useTanStackTable } from '@/components/custom/use-TanStack-Table';
import Table from '@/components/table';
import TablePagination from '@/components/table/pagination';
import { ticketsColumns } from './columns';
import Filters from './filters';

export type TicketsDataType = (typeof ticketsData)[number];

export default function TicketsTable() {
  const { table, setData } = useTanStackTable<TicketsDataType>({
    tableData: ticketsData,
    columnConfig: ticketsColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
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
    <>
      <Filters table={table} />
      <Table
        table={table}
        variant="modern"
        classNames={{
          rowClassName: 'last:border-0',
        }}
      />
      {/* <TablePagination table={table} className="p-4" /> */}
    </>
  );
}
