// 'use client';

// import React, { useEffect, useState } from 'react';
// import cn from '@/utils/class-names';
// import { getColumns } from './column';
// import ProjectSummaryToolbar from './toolbar';
// import Table from '@/components/table';
// import WidgetCard from '@/components/cards/widget-card';
// import TablePagination from '@/components/table/pagination';
// import { useTanStackTable } from '@/components/custom/use-TanStack-Table';
// import { useAtom } from 'jotai';
// import { showFilterCardAtom } from '@/atoms/ui-atoms';
// import { filterAtom } from '@/atoms/filter';
// import FilterCard from '@/components/cards/filter-card';
// import { isSuperAdmin } from '@/atoms/superAdminDetails';

// export interface ProjectSummaryDataType {
//   id: number;
//   sales_id: number;
//   receipt_id: number;
//   station_name: string;
//   creation_date: string;
//   pump_name: string;
//   nozzle_name: string;
//   product_name: string;
//   tank_name: string;
//   volume: number;
//   amount: number;
//   price: number;
//   car_plate: string | null;
// }

// export default function ProjectSummary({ className }: { className?: string }) {
//   const [data, setData] = useState<ProjectSummaryDataType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [accessToken, setAccessToken] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);

//   const [showFilterCard] = useAtom(showFilterCardAtom);
//   const [filters] = useAtom(filterAtom);
//   const { filtered_pumps, filtered_tanks, filtered_nozzles, filtered_products,start_date,end_date,license_plate,card_id,tag_id } = filters;

//   const allEmpty =
//     filtered_pumps.length === 0 &&
//     filtered_tanks.length === 0 &&
//     filtered_nozzles.length === 0 &&
//     filtered_products.length === 0&&
//     currentPage === 1&&
//     start_date===''&&
//     end_date==='';
//     ;

//   const [allfiltersEmpty, setAllFiltersEmpty] = useState(true);
//   // const [isSuperAdminSiggned] = useAtom(isSuperAdmin);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const token = sessionStorage.getItem('access_token');
//       setAccessToken(token);
//     }
//   }, []);

//   useEffect(() => {
//     setAllFiltersEmpty(allEmpty);
//   }, [allEmpty]);

//   // Fetch data
//   useEffect(() => {
//     if (!accessToken) return;

//     const fetchData = async () => {
//       setLoading(true);
//       const queryParams = buildQueryParams();
//       const url = allfiltersEmpty
//         ? `/api/sales-reports?page_number=${currentPage}`
//         : `/api/sales-reports/filtered?${queryParams}`;

//       try {
//         const res = await fetch(url, {
//           method: 'GET',
//           headers: {
//             Authorization: `${accessToken}`,
//           },
//         });

//         const result = await res.json();
//         if (res.ok) {
//           setData(result.data.page_records || []);
//           setTotalPages(result.data.num_pages || 0);
//           console.log(currentPage)
//         } else {
//           console.error('Failed to fetch sales reports');
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [
//     accessToken,
//     allfiltersEmpty,
//     filtered_pumps,
//     filtered_tanks,
//     filtered_nozzles,
//     filtered_products,
//     currentPage,
//   ]);

//   const buildQueryParams = () => {
//     const query = new URLSearchParams();
//     filtered_pumps.forEach((pump) => query.append('pump_names', pump.label));
//     filtered_tanks.forEach((tank) => query.append('tank_names', tank.label));
//     filtered_nozzles.forEach((nozzle) => query.append('nozzle_names', nozzle.label));
//     filtered_products.forEach((product) => query.append('product_names', product.label));

//     query.append('page_number', currentPage.toString());

    
//     return query.toString();
//   };

//   const allColumns = getColumns();
//   const { table } = useTanStackTable<ProjectSummaryDataType>({
//     tableData: data,
//     columnConfig: allColumns,
//     options: {
//       initialState: {
//         pagination: {
//           pageIndex: currentPage - 1,
//           pageSize: 20,
//         },
//       },
//       enableColumnResizing: false,
//       manualPagination: true,
//       pageCount: totalPages,
//     },
//   });

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className={cn('', className)}>
//       {showFilterCard && <FilterCard />}
//       <WidgetCard
//         title="Reports"
//         actionClassName="ps-0 w-full @xl:ps-2 @xl:w-auto"
//         headerClassName="flex-wrap gap-4 @xl:flex-nowrap mb-4 px-5 pt-5 lg:px-7 lg:pt-7"
//         className={cn('space-y-4 p-0 @container dark:bg-gray-100/50 lg:p-0', className)}
//         action={<ProjectSummaryToolbar table={table} className="w-fit justify-between" />}
//       >
//         {loading ? (
//           <div className="p-6">Loading reports...</div>
//         ) : data.length === 0 ? (
//           <div className="p-6">No sales reports found.</div>
//         ) : (
//           <>
//             <Table
//               table={table}
//               variant="modern"
//               classNames={{
//                 headerCellClassName: 'first:ps-6',
//                 cellClassName: 'first:ps-6',
//               }}
//             />
//             <TablePagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={handlePageChange}
//               className="p-4 pt-0"
//             />
//           </>
//         )}
//       </WidgetCard>
//     </div>
//   );
// }




'use client';

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

// ✅ Format for API: YYYY-MM-DD HH:mm:ss
const formatDateTime = (dateStr: string): string => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate()
  ).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes()
  ).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
};

export default function ProjectSummary({ className }: { className?: string }) {
  const [data, setData] = useState<ProjectSummaryDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [showFilterCard] = useAtom(showFilterCardAtom);
  const [filters] = useAtom(filterAtom);

  const {
    filtered_pumps,
    filtered_tanks,
    filtered_nozzles,
    filtered_products,
    start_date,
    end_date,
    license_plate,
    card_id,
    tag_id,
  } = filters;

  const allEmpty =
    filtered_pumps.length === 0 &&
    filtered_tanks.length === 0 &&
    filtered_nozzles.length === 0 &&
    filtered_products.length === 0 && 
    currentPage === 1 &&
    start_date === '' &&
    end_date === '' &&
    license_plate === '' &&
    card_id === '' &&
    tag_id === '';

  const [allfiltersEmpty, setAllFiltersEmpty] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('access_token');
      setAccessToken(token);
    }
  }, []);

  useEffect(() => {
    setAllFiltersEmpty(allEmpty);
  }, [allEmpty]);

  useEffect(() => {
    if (!accessToken) return;

    const fetchData = async () => {
      setLoading(true);
      const queryParams = buildQueryParams();
      console.log(queryParams);
      const url = allfiltersEmpty
        ? `/api/sales-reports?page_number=${currentPage}`
        : `/api/sales-reports/filtered?${queryParams}`;

      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `${accessToken}`,
          },
        });

        const result = await res.json();
        if (res.ok) {
          setData(result.data.page_records || []);
          setTotalPages(result.data.num_pages || 0);
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
  }, [
    accessToken,
    allfiltersEmpty,
    filtered_pumps,
    filtered_tanks,
    filtered_nozzles,
    filtered_products,
    start_date,
    end_date,
    license_plate,
    card_id,
    tag_id,
    currentPage,
  ]);

  const buildQueryParams = () => {
    const query = new URLSearchParams();

    filtered_pumps.forEach((pump) => query.append('pump_names', pump.label));
    filtered_tanks.forEach((tank) => query.append('tank_names', tank.label));
    filtered_nozzles.forEach((nozzle) => query.append('nozzle_names', nozzle.label));
    filtered_products.forEach((product) => query.append('product_names', product.label));

    if (start_date) query.append('since_date', formatDateTime(start_date));
    if (end_date) query.append('to_date', formatDateTime(end_date));
    if (license_plate) query.append('license_plate', license_plate);
    if (card_id) query.append('card_id', card_id);
    if (tag_id) query.append('tag_id', tag_id);

    query.append('page_number', currentPage.toString());

    return query.toString();
  };

  const allColumns = getColumns();
  const { table } = useTanStackTable<ProjectSummaryDataType>({
    tableData: data,
    columnConfig: allColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: currentPage - 1,
          pageSize: 20,
        },
      },
      enableColumnResizing: false,
      manualPagination: true,
      pageCount: totalPages,
    },
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={cn('', className)}>
      {showFilterCard && <FilterCard />}
      <WidgetCard
        title="Reports"
        actionClassName="ps-0 w-full @xl:ps-2 @xl:w-auto"
        headerClassName="flex-wrap gap-4 @xl:flex-nowrap mb-4 px-5 pt-5 lg:px-7 lg:pt-7"
        className={cn('space-y-4 p-0 @container dark:bg-gray-100/50 lg:p-0', className)}
        action={<ProjectSummaryToolbar table={table} className="w-fit justify-between" />}
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
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="p-4 pt-0"
            />
          </>
        )}
      </WidgetCard>
    </div>
  );
}
