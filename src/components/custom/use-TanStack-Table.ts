
// "use client";

// import {
//   DragEndEvent,
//   KeyboardSensor,
//   MouseSensor,
//   TouchSensor,
//   UniqueIdentifier,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import { arraySwap } from "@dnd-kit/sortable";
// import {
//   ColumnDef,
//   ColumnFiltersState,
//   ExpandedState,
//   RowPinningState,
//   SortingState,
//   TableOptions,
//   getCoreRowModel,
//   getExpandedRowModel,
//   getFacetedRowModel,
//   getFacetedUniqueValues,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import React from "react";



// interface ExtendTableOptions<T extends Record<string, unknown>>
//   extends Omit<TableOptions<T>, "data" | "columns" | "getCoreRowModel" | "state"> {}

// export function useTanStackTable<T extends Record<string, any>>({
//   options,
//   tableData,
//   columnConfig,
// }: {
//   tableData: T[];
//   options?: ExtendTableOptions<T>;
//   columnConfig: ColumnDef<T, any>[];
// }) {
//   const [data, setData] = React.useState<T[]>([...tableData]);
//   const [columns] = React.useState(() => [...columnConfig]);

//   const [globalFilter, setGlobalFilter] = React.useState("");
//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const [expanded, setExpanded] = React.useState<ExpandedState>({});
//   const [columnOrder, setColumnOrder] = React.useState<string[]>(() => columns.map((c) => c.id!));
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
//   const [rowPinning, setRowPinning] = React.useState<RowPinningState>({
//     top: [],
//     bottom: [],
//   });


//   // 🧠 Sensors for DnD
//   const sensors = useSensors(
//     useSensor(MouseSensor, {}),
//     useSensor(TouchSensor, {}),
//     useSensor(KeyboardSensor, {})
//   );

//   // 🧩 Drag Columns
//   const handleDragEndColumn = React.useCallback((event: DragEndEvent) => {
//     const { active, over } = event;
//     if (active && over && active.id !== over.id) {
//       setColumnOrder((prevOrder) => {
//         const oldIndex = prevOrder.indexOf(active.id as string);
//         const newIndex = prevOrder.indexOf(over.id as string);
//         return arraySwap(prevOrder, oldIndex, newIndex);
//       });
//     }
//   }, []);

//   // 🧩 Drag Rows
//   const handleDragEndRow = React.useCallback((event: DragEndEvent) => {
//     const { active, over } = event;
//     if (active && over && active.id !== over.id) {
//       setData((prevData) => {
//         const oldIndex = prevData.findIndex((item) => item.id === active.id);
//         const newIndex = prevData.findIndex((item) => item.id === over.id);
//         return arraySwap(prevData, oldIndex, newIndex);
//       });
//     }
//   }, []);

//   const dataIds = React.useMemo<UniqueIdentifier[]>(() => data?.map(({ id }) => id), [data]);

//   // 🧠 Create the table instance
//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       sorting,
//       expanded,
//       rowPinning,
//       columnOrder,
//       globalFilter,
//       columnFilters,
//     },
//     onSortingChange: setSorting,
//     onExpandedChange: setExpanded,
//     onRowPinningChange: setRowPinning,
//     onColumnOrderChange: setColumnOrder,
//     onGlobalFilterChange: setGlobalFilter,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFacetedRowModel: getFacetedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getExpandedRowModel: getExpandedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getFacetedUniqueValues: getFacetedUniqueValues(),
//     getRowCanExpand: () => true,
//     ...options,
//   });

//   return {
//     table,
//     dataIds,
//     tableData: data,
//     setData,
//     sensors,
//     rowPinning,
//     columnOrder,
//     globalFilter,
//     setRowPinning,
//     setColumnOrder,
//     setGlobalFilter,
//     handleDragEndRow,
//     handleDragEndColumn,
//   };
// }



"use client";

import {
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arraySwap } from "@dnd-kit/sortable";
import {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  RowPinningState,
  SortingState,
  TableOptions,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";



interface ExtendTableOptions<T extends Record<string, unknown>>
  extends Omit<TableOptions<T>, "data" | "columns" | "getCoreRowModel" | "state"> {}

export function useTanStackTable<T extends Record<string, any>>({
  options,
  tableData,
  columnConfig,
}: {
  tableData: T[];
  options?: ExtendTableOptions<T>;
  columnConfig: ColumnDef<T, any>[];
}) {
  const [data, setData] = React.useState<T[]>([...tableData]);
  const [columns] = React.useState(() => [...columnConfig]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [columnOrder, setColumnOrder] = React.useState<string[]>(() => columns.map((c) => c.id!));
  const dataIds = React.useMemo<UniqueIdentifier[]>(() => data?.map(({ id }) => id), [data]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [rowPinning, setRowPinning] = React.useState<RowPinningState>({
    top: [],
    bottom: [],
  });

  // Set initial column visibility - hide extra columns by default
  const columnVisibility = React.useMemo(() => {
    const visibility: Record<string, boolean> = {};  // Ensure this is typed properly

    columns.forEach((column) => {
      const meta = column.meta  // Safely access `meta`

      if  (column.id){
        if (meta?.isExtra) {
          visibility[column.id] = false; // Extra columns are hidden by default
        } else {
          visibility[column.id] = true; // Regular columns are visible
        }
      } 
    });

    return visibility;
  }, [columns]);

  const [columnVisibilityState, setColumnVisibilityState] = React.useState(columnVisibility);

  // ===================================================================================================
  // Handle Drag and Drop events for column and row reordering (custom logic)
  const handleDragEndColumn = React.useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arraySwap(columnOrder, oldIndex, newIndex);
      });
    }
  }, []);

  const handleDragEndRow = React.useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((prevData) => {
        const oldIndex = prevData.findIndex((item) => item.id === active.id);
        const newIndex = prevData.findIndex((item) => item.id === over.id);
        return arraySwap(prevData, oldIndex, newIndex);
      });
    }
  }, []);

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  // Table configuration
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      expanded,
      rowPinning,
      columnOrder,
      globalFilter,
      columnFilters,
      columnVisibility: columnVisibilityState, // Add column visibility state
    },
    ...options,
    getRowCanExpand: () => true,
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    onRowPinningChange: setRowPinning,
    onColumnOrderChange: setColumnOrder,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onColumnVisibilityChange: setColumnVisibilityState, // Handle visibility changes
  });

  return {
    table,
    dataIds,
    setData,
    sensors,
    tableData: data,
    rowPinning,
    columnOrder,
    globalFilter,
    setRowPinning,
    setColumnOrder,
    setGlobalFilter,
    handleDragEndRow,
    handleDragEndColumn,
  };
}
