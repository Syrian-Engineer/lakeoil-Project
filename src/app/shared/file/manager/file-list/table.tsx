'use client';

import { Box } from 'rizzui';
import { allFilesData } from '@/app/_data/all-files';
import Table from '@/components/table';
import { useTanStackTable } from '@/components/table/custom/use-TanStack-Table';
import TableFooter from '@/components/table/footer';
import TablePagination from '@/components/table/pagination';
import { allFilesColumns } from './columns';
import FileTableFilters from '../file-table-filters';

export type FileListTableDataType = (typeof allFilesData)[number];

export default function FileListTable({ className }: { className?: string }) {
  const { table, setData } = useTanStackTable<FileListTableDataType>({
    tableData: allFilesData,
    columnConfig: allFilesColumns,
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
          table.resetRowSelection();
        },
        handleMultipleDelete: (rows:any) => {
          setData((prev) => prev.filter((r) => !rows.includes(r)));
          table.resetRowSelection();
        },
      },
      enableColumnResizing: false,
    },
  });
  return (
    <Box className={className}>
      <FileTableFilters table={table} />
      <Table table={table} variant="modern" />
      <TableFooter table={table} />
      <TablePagination table={table} className="py-4" />
    </Box>
  );
}
