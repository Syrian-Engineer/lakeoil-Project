// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { Button } from "rizzui";
// import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
// import cn from "@/utils/class-names";
// import { useEffect, useState } from "react";
// import { stationProps } from "@/app/station/page";

// interface DailyReportsPaginationProps {
//   totalPages: number;
//   totalReports: number;
//   stations:stationProps[]
// }

// export default function DailyReportsPagination({
//   totalPages,
//   totalReports,
//   stations
// }: DailyReportsPaginationProps) {

//   const [filteredReportNumber, setFilteredReportNumber] = useState(0);
//   const [stationsList, setStationsList] = useState<
//     { name: string; licenseNo: string }[]
//   >([]);

//   const router = useRouter();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     setStationsList(
//       stations.map((station) => ({
//         name: station.RetailStationName,
//         licenseNo: station.EWURALicenseNo, // keep license too
//       }))
//     );
//   }, [stations]);

//   const currentPerPage = Number(searchParams.get("per_page")) || 1;
//   const currentPage = Number(searchParams.get("page")) || 1;
//   const currentStartDate = searchParams.get("start_date") || "";
//   const currentEndDate = searchParams.get("end_date") || "";

//   const perPageSelections = Array.from({ length: totalReports }, (_, i) => i + 1);

//   const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     let selectedStartDateTime = e.target.value;
//     if (!selectedStartDateTime.match(/:\d{2}$/)) {
//       selectedStartDateTime += ":00";
//     }
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("start_date", selectedStartDateTime);
//     router.push(`?${params.toString()}`);
//   };

//   const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     let selectedEndDateTime = e.target.value;
//     if (!selectedEndDateTime.match(/:\d{2}$/)) {
//       selectedEndDateTime += ":00";
//     }
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("end_date", selectedEndDateTime);
//     router.push(`?${params.toString()}`);
//   };

//   const handleReportNumberChange = () => {
//     const reportNumber = filteredReportNumber;
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("report_no", `${reportNumber}`);
//     router.push(`?${params.toString()}`);
//   };

//   const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const perPage = e.target.value;
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("per_page", perPage);
//     router.push(`?${params.toString()}`);
//   };

//   const goToPage = (page: number) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("page", String(page));
//     router.push(`?${params.toString()}`);
//   };

//   const goToPreviousPage = () => {
//     if (currentPage > 1) goToPage(currentPage - 1);
//   };

//   const goToNextPage = () => {
//     if (currentPage < totalPages) goToPage(currentPage + 1);
//   };

//   const renderPageButton = (page: number) => (
//     <Button
//       key={page}
//       size="sm"
//       variant={page === currentPage ? "solid" : "outline"}
//       onClick={() => goToPage(page)}
//       className="mx-1"
//     >
//       {page}
//     </Button>
//   );

//   const renderEllipsis = (key: string) => (
//     <span key={key} className="mx-1 text-gray-400 select-none">
//       ...
//     </span>
//   );

//   const renderPageNumbers = () => {
//     const pages: React.ReactNode[] = [];
//     if (totalPages <= 1) return pages;

//     pages.push(renderPageButton(1));
//     const start = Math.max(2, currentPage - 1);
//     const end = Math.min(totalPages - 1, currentPage + 1);

//     if (start > 2) pages.push(renderEllipsis("start-ellipsis"));
//     for (let page = start; page <= end; page++) {
//       pages.push(renderPageButton(page));
//     }
//     if (end < totalPages - 1) pages.push(renderEllipsis("end-ellipsis"));
//     pages.push(renderPageButton(totalPages));
//     return pages;
//   };

//   if (totalPages === 0) return null;

 
//   return (
//     <div className="p-4 border rounded-xl shadow-sm bg-white dark:bg-gray-100 space-y-4">
//       {/* Filters Row */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {/* Start Date */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Start Date & Time</label>
//           <input
//             type="datetime-local"
//             value={currentStartDate}
//             onChange={handleStartDateChange}
//             className="w-full border px-3 py-2 rounded-lg shadow-sm focus:ring focus:ring-primary"
//           />
//         </div>

//         {/* End Date */}
//         <div>
//           <label className="block text-sm font-medium mb-1">End Date & Time</label>
//           <input
//             type="datetime-local"
//             value={currentEndDate}
//             onChange={handleEndDateChange}
//             className="w-full border px-3 py-2 rounded-lg shadow-sm focus:ring focus:ring-primary"
//           />
//         </div>

//         {/* Report Number */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Report Number</label>
//           <div className="flex gap-2">
//             <input
//               type="number"
//               value={filteredReportNumber}
//               onChange={(e) => setFilteredReportNumber(Number(e.target.value))}
//               className="flex-1 border px-3 py-2 rounded-lg shadow-sm focus:ring focus:ring-primary"
//             />
//             <Button onClick={handleReportNumberChange}>Apply</Button>
//           </div>
//         </div>
//       </div>

      
//       {/* Station Filter */}
//       <div>
//         <label className="block text-sm font-medium mb-1">Station</label>
//         <select
//           className="w-full border px-3 py-2 rounded-lg shadow-sm focus:ring focus:ring-primary"
//           onChange={(e) => {
//             const selectedLicenseNo = e.target.value; // send licenseNo not name
//             const params = new URLSearchParams(searchParams.toString());
//             params.set("station", selectedLicenseNo);
//             router.push(`?${params.toString()}`);
//           }}
//           defaultValue={searchParams.get("station") || ""}
//         >
//           <option value="">All Stations</option>
//           {stationsList.map((station, i) => (
//             <option key={i} value={station.licenseNo}>
//               {station.name}
//             </option>
//           ))}
//         </select>
//       </div>

//     { /* Per Page */}
//       <div>
//         <label className="block text-sm font-medium mb-1">Reports Per Page</label>
//         <select
//           value={currentPerPage}
//           className="w-32 border px-3 py-2 rounded-lg shadow-sm focus:ring focus:ring-primary"
//           onChange={handlePerPageChange}
//         >
//           {perPageSelections.map((n) => (
//             <option key={n} value={n}>
//               {n}
//             </option>
//           ))}
//         </select>
//       </div>

      
//       {/* Pagination Buttons */}
//       <div className={cn("flex items-center justify-center gap-2 pt-2")}>
//         <Button
//           size="sm"
//           variant="outline"
//           onClick={goToPreviousPage}
//           disabled={currentPage === 1}
//         >
//           <PiCaretLeftBold className="h-4 w-4" />
//         </Button>
//         {renderPageNumbers()}
//         <Button
//           size="sm"
//           variant="outline"
//           onClick={goToNextPage}
//           disabled={currentPage === totalPages}
//         >
//           <PiCaretRightBold className="h-4 w-4" />
//         </Button>
//       </div>
//     </div>
//   );
// }











"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "rizzui";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import cn from "@/utils/class-names";
import { useEffect, useState } from "react";
import { stationProps } from "@/app/station/page";

interface DailyReportsPaginationProps {
  totalPages: number;
  totalReports: number;
  stations: stationProps[];
}

export default function DailyReportsPagination({
  totalPages,
  totalReports,
  stations,
}: DailyReportsPaginationProps) {
  const [filteredReportNumber, setFilteredReportNumber] = useState(0);
  const [stationsList, setStationsList] = useState<
    { name: string; licenseNo: string }[]
  >([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ Local state for date filters (instead of instant router push)
  const [startDate, setStartDate] = useState(
    searchParams.get("start_date") || ""
  );
  const [endDate, setEndDate] = useState(
    searchParams.get("end_date") || ""
  );

  useEffect(() => {
    setStationsList(
      stations.map((station) => ({
        name: station.RetailStationName,
        licenseNo: station.EWURALicenseNo,
      }))
    );
  }, [stations]);

  const currentPerPage = Number(searchParams.get("per_page")) || 1;
  const currentPage = Number(searchParams.get("page")) || 1;

  const perPageSelections = Array.from(
    { length: totalReports },
    (_, i) => i + 1
  );

  // ✅ Only update state on change
  const handleStartDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEndDate(e.target.value);
  };

  // ✅ Apply button handler
  const handleDateFilterApply = () => {
    const params = new URLSearchParams(searchParams.toString());

    let formattedStart = startDate;
    let formattedEnd = endDate;

    if (formattedStart && !formattedStart.match(/:\d{2}$/)) {
      formattedStart += ":00";
    }

    if (formattedEnd && !formattedEnd.match(/:\d{2}$/)) {
      formattedEnd += ":00";
    }

    if (formattedStart) params.set("start_date", formattedStart);
    else params.delete("start_date");

    if (formattedEnd) params.set("end_date", formattedEnd);
    else params.delete("end_date");

    // Optional: reset page to 1 when filtering
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  const handleReportNumberChange = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("report_no", `${filteredReportNumber}`);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const handlePerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const perPage = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set("per_page", perPage);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) goToPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1);
  };

  const renderPageButton = (page: number) => (
    <Button
      key={page}
      size="sm"
      variant={page === currentPage ? "solid" : "outline"}
      onClick={() => goToPage(page)}
      className="mx-1"
    >
      {page}
    </Button>
  );

  const renderEllipsis = (key: string) => (
    <span key={key} className="mx-1 text-gray-400 select-none">
      ...
    </span>
  );

  const renderPageNumbers = () => {
    const pages: React.ReactNode[] = [];
    if (totalPages <= 1) return pages;

    pages.push(renderPageButton(1));

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    if (start > 2) pages.push(renderEllipsis("start-ellipsis"));

    for (let page = start; page <= end; page++) {
      pages.push(renderPageButton(page));
    }

    if (end < totalPages - 1)
      pages.push(renderEllipsis("end-ellipsis"));

    pages.push(renderPageButton(totalPages));

    return pages;
  };

  if (totalPages === 0) return null;

  return (
    <div className="p-4 border rounded-xl shadow-sm bg-white dark:bg-gray-100 space-y-4">
      {/* Filters Row */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Start Date & Time
          </label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={handleStartDateChange}
            className="w-full border px-3 py-2 rounded-lg shadow-sm"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium mb-1">
            End Date & Time
          </label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={handleEndDateChange}
            className="w-full border px-3 py-2 rounded-lg shadow-sm"
          />
        </div>

        {/* Apply Button */}
        <div className="flex items-end">
          <Button
            onClick={handleDateFilterApply}
            className="w-full"
          >
            Apply Date Filter
          </Button>
        </div>
      </div>

      {/* Report Number */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Report Number
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={filteredReportNumber}
            onChange={(e) =>
              setFilteredReportNumber(Number(e.target.value))
            }
            className="flex-1 border px-3 py-2 rounded-lg shadow-sm"
          />
          <Button onClick={handleReportNumberChange}>
            Apply
          </Button>
        </div>
      </div>

      {/* Station Filter */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Station
        </label>
        <select
          className="w-full border px-3 py-2 rounded-lg shadow-sm"
          onChange={(e) => {
            const params = new URLSearchParams(
              searchParams.toString()
            );
            params.set("station", e.target.value);
            params.set("page", "1");
            router.push(`?${params.toString()}`);
          }}
          defaultValue={searchParams.get("station") || ""}
        >
          <option value="">All Stations</option>
          {stationsList.map((station, i) => (
            <option key={i} value={station.licenseNo}>
              {station.name}
            </option>
          ))}
        </select>
      </div>

      {/* Per Page */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Reports Per Page
        </label>
        <select
          value={currentPerPage}
          className="w-32 border px-3 py-2 rounded-lg shadow-sm"
          onChange={handlePerPageChange}
        >
          {perPageSelections.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination */}
      <div className={cn("flex items-center justify-center gap-2 pt-2")}>
        <Button
          size="sm"
          variant="outline"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          <PiCaretLeftBold className="h-4 w-4" />
        </Button>

        {renderPageNumbers()}

        <Button
          size="sm"
          variant="outline"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          <PiCaretRightBold className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
