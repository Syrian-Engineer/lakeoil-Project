'use client';

// import CircleProgressBar from '@/components/charts/circle-progressbar';
import { createColumnHelper } from '@tanstack/react-table';
import { ProjectSummaryDataType } from '.';
// import { getStatusBadge } from '@/components/table-utils/get-status-badge';

const columnHelper = createColumnHelper<ProjectSummaryDataType>();

export function getColumns(){
  return[
    columnHelper.display({
      id: 'id',
      size: 10,
      header: '#',
      cell: ({ row }) => row.original.id,
    }),
    columnHelper.display({
      id: 'Sales',
      size: 100,
      header: 'Sales ID',
      cell: ({ row: { original } }) => original.sales_id,
    }),
    columnHelper.display({
      id: 'Receipt',
      size: 100,
      header: 'Receipt ID',
      cell: ({ row: { original } }) => original.receipt_id,
    }),
    columnHelper.display({
      id: 'Station',
      size: 100,
      header: 'Station',
      cell: ({ row: { original } }) => original.station_name,
    }),
    columnHelper.display({
      id: 'Creation',
      size: 50,
      header: 'Creation Date	',
      cell: ({ row: { original } }) => original.creation_date,
    }),
    columnHelper.display({
      id: 'Pump',
      size: 40,
      header: 'Pump',
      cell: ({ row: { original } }) => original.pump_name,
    }),
    columnHelper.display({
      id: 'Nozzle',
      size: 30,
      header: 'Nozzle',
      cell: ({ row: { original } }) => original.nozzle_name || "N/A",
    }),
  
    columnHelper.display({
      id: 'Fuel',
      size: 60,
      header: 'Fuel	',
      cell: ({ row: { original } }) =>original.product_name,
      meta:{isExtra:true}
    }),
    columnHelper.display({
      id: 'Tank',
      size: 60,
      header: 'Tank',
      cell: ({ row: { original } }) => original.tank_name,
      meta: { isExtra: true } as { isExtra: boolean }, // ✅ fix
    }),
    columnHelper.display({
      id: 'Volume',
      size: 60,
      header: 'Volume',
      cell:({row:{original}})=>original.volume,
      meta: { isExtra: true },
    }),
    columnHelper.display({
      id: 'Amount',
      size: 30,
      header: 'Amount',
      cell: ({ row: { original } }) => original.amount,
      meta: { isExtra: true },
    }),
    columnHelper.display({
      id: 'Unit',
      size: 60,
      header: 'Unit Price',
      cell: ({ row: { original } }) => original.price,
      meta: { isExtra: true },
    }),
    columnHelper.display({
      id: 'Car ',
      size: 60,
      header: 'Car Plate',
      cell: ({ row: { original } }) => original.car_plate,
      meta: { isExtra: true },
    }),
  ]
}
