'use client';

import React from 'react';
import Filters from './filter';
import cn from '@/utils/class-names';
import { defaultColumns } from './column';
import Table from '@/components/table';
import WidgetCard from '@/components/cards/widget-card';
import TablePagination from '@/components/table/pagination';
import {
  postSummaryData,
  PostSummaryDataType,
} from '@/app/_data/social-media-dashboard-data';
import { useTanStackTable } from '@/components/custom/use-TanStack-Table';

export default function PostSummary({ className }: { className?: string }) {
  const { table } = useTanStackTable<PostSummaryDataType>({
    tableData: postSummaryData,
    columnConfig: defaultColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 5,
        },
      },
      enableSorting: false,
      enableColumnResizing: false,
    },
  });

  return (
    <WidgetCard
      title={
        <span>
          <span className="hidden @lg:inline-block">Post</span> Summary
        </span>
      }
      className={cn('space-y-4 p-0 lg:p-0', className)}
      headerClassName="items-center px-5 pt-5 lg:px-7 lg:pt-7 flex-wrap sm:flex-nowrap gap-y-3"
      actionClassName="ml-auto"
      action={<Filters table={table} className="w-full justify-between" />}
    >
      <Table
        table={table}
        variant="modern"
        classNames={{
          cellClassName: 'first:ps-4',
          rowClassName: 'last:border-0',
          headerCellClassName: 'first:ps-4',
        }}
      />
      <TablePagination table={table} className="p-4 pt-0" />
    </WidgetCard>
  );
}
