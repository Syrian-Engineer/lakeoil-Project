'use client';

import { snippetsAndTemplates } from '@/app/_data/snippets-and-templates';
import Table from '@/components/table';
import { useTanStackTable } from '@/components/custom/use-TanStack-Table';
import TableFooter from '@/components/table/footer';
import { snippetsAndTemplatesColumns } from './columns';
import Filters from './filters';
import { exportToCSV } from '@/utils/export-to-csv';

export type SnippetsAndTemplatesDataType =
  (typeof snippetsAndTemplates)[number];

export default function SnippetsTable() {
  const { table, setData } = useTanStackTable<SnippetsAndTemplatesDataType>({
    tableData: snippetsAndTemplates,
    columnConfig: snippetsAndTemplatesColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 7,
        },
      },
      meta: {
        handleDeleteRow: (row:any) => {
          setData((prev) => prev.filter((r) => r.id !== row.id));
        },
        handleMultipleDelete: (rows:any) => {
          setData((prev) => prev.filter((r) => !rows.includes(r)));
        },
      },
      enableColumnResizing: false,
    },
  });

  const selectedData = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  function handleExportData() {
    exportToCSV(
      selectedData,
      'ID,Name,CreatedBy,CreatedAt,UpdatedAt',
      `snippets_data_${selectedData.length}`
    );
  }

  return (
    <>
      <Filters table={table} />
      <Table
        table={table}
        variant="modern"
        classNames={{
          container: 'border border-muted rounded-md',
          rowClassName: 'last:border-0',
        }}
      />
      <TableFooter table={table} onExport={handleExportData} />
    </>
  );
}
