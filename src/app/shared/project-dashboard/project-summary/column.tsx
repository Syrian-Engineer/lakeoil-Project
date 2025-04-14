'use client';

// import CircleProgressBar from '@/components/charts/circle-progressbar';
import { createColumnHelper } from '@tanstack/react-table';
import { ProjectSummaryDataType } from '.';
// import { getStatusBadge } from '@/components/table-utils/get-status-badge';

const columnHelper = createColumnHelper<ProjectSummaryDataType>();

export const allColumns = [
  columnHelper.display({
    id: 'id',
    size: 10,
    header: '#',
    // cell: ({ row: { original } }) => original.project,
    cell:"1"
  }),
  columnHelper.display({
    id: 'Starting',
    size: 100,
    header: 'Starting Date	',
    // cell: ({ row: { original } }) => original.manager,
    cell:"2025-04-09 14:52:11	"
  }),
  columnHelper.display({
    id: 'Creation',
    size: 100,
    header: 'Creation Date',
    // cell: ({ row: { original } }) => original.dueData,
    cell:"2025-02-24 13:55:00	"
  }),
  columnHelper.display({
    id: 'Pump',
    size: 100,
    header: 'Pump',
    // cell: ({ row: { original } }) => original.assignedTo,
    cell:"P3 board T"
  }),
  columnHelper.display({
    id: 'Amount',
    size: 50,
    header: 'Amount	',
    // cell: ({ row: { original } }) => getStatusBadge(original.status),
    cell:"26307"
  }),
  columnHelper.display({
    id: 'Price',
    size: 40,
    header: 'Unit Price		',
    // cell: ({ row: { original } }) => getStatusBadge(original.status),
    cell:"3264"
  }),
  columnHelper.display({
    id: 'Print ',
    size: 30,
    header: 'Print',
    // cell: ({ row: { original } }) => getStatusBadge(original.status),
    cell:"Print"
  }),

  columnHelper.display({
    id: 'Fuel',
    size: 60,
    header: 'Fuel	',
    // cell: ({ row: { original } }) => getStatusBadge(original.status),
    cell:"Unleaded",
    meta:{isExtra:true}
  }),
  columnHelper.display({
    id: 'Electronic',
    size: 100,
    header: 'Electronic Total	',
    // cell: ({ row: { original } }) => getStatusBadge(original.status),
    cell:"51614.06",
    meta: { isExtra: true } as { isExtra: boolean }, // ✅ fix
  }),
  columnHelper.display({
    id: 'Virtual',
    size: 100,
    header: 'Virtual Total	',
    // cell: ({ row: { original } }) => (
    //   <div className="ps-4 text-[10px]">
    //     <CircleProgressBar
    //       size={40}
    //       strokeWidth={4}
    //       stroke="#f0f0f0"
    //       percentage={original.progress}
    //       label={`${original.progress}%`}
    //       progressColor={getProgressColor(original.status)}
    //     />
    //   </div>
    // ),
    cell:"127.55",
    meta: { isExtra: true },
  }),
  columnHelper.display({
    id: 'Volume',
    size: 30,
    header: 'Volume	',
    // cell: ({ row: { original } }) => getStatusBadge(original.status),
    cell:"8.06",
    meta: { isExtra: true },
  }),
  columnHelper.display({
    id: 'Authorization',
    size: 60,
    header: 'Authorization',
    // cell: ({ row: { original } }) => getStatusBadge(original.status),
    cell:"Auto",
    meta: { isExtra: true },
  }),
  columnHelper.display({
    id: 'Car ',
    size: 60,
    header: 'Car Plate',
    // cell: ({ row: { original } }) => getStatusBadge(original.status),
    cell:"Auto",
    meta: { isExtra: true },
  }),
];

