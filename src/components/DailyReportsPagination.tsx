"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "rizzui";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import cn from "@/utils/class-names";
import { useState } from "react";

interface DailyReportsPaginationProps {
  totalPages: number;
  totalReports: number;
}

export default function DailyReportsPagination({
  totalPages,
  totalReports,
}: DailyReportsPaginationProps) {
  const[filteredReportNumber,setFilteredReportNumber] = useState(0)
  const router = useRouter();
  const searchParams = useSearchParams();

  // Current values from URL
  const currentPerPage = Number(searchParams.get("per_page")) || 1;
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentStartDate = searchParams.get("start_date") || "";
  const currentEndDate = searchParams.get("end_date") || "";

  // Per-page options [1, 2, ..., totalReports]
  const perPageSelections = Array.from({ length: totalReports }, (_, i) => i + 1);

  // --- Handle start date & time change ---
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let selectedStartDateTime = e.target.value; // e.g., "2025-09-03T10:00"

    // Add seconds if missing
    if (!selectedStartDateTime.match(/:\d{2}$/)) {
      selectedStartDateTime += ":00"; // now "2025-09-03T10:00:00"
    }

    // URL encode so ":" becomes "%3A"
    const encodedDate = encodeURIComponent(selectedStartDateTime);

    const params = new URLSearchParams(searchParams.toString());
    params.set("start_date", encodedDate);
    router.push(`?${params.toString()}`);
  };


  // --- Handle end date & time change ---
  const handleEndDateChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    let selectedEndDateTime = e.target.value
    const params = new URLSearchParams(searchParams.toString())
    params.set("end_date",selectedEndDateTime)
    router.push(`${params.toString()}`)
  }
  // --- Handle Report Number Change ---
  const handleReportNumberChange = ()=>{
    let reportNumber = filteredReportNumber
    const params = new URLSearchParams(searchParams.toString())
    params.set("report_no",`${reportNumber}`)
    router.push(`${params.toString()}`)
  }
  // --- Handle per-page change ---
  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const perPage = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set("per_page", perPage);
    router.push(`?${params.toString()}`);
  };

  // --- Pagination helpers ---
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

    // Always show first page
    pages.push(renderPageButton(1));

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    if (start > 2) pages.push(renderEllipsis("start-ellipsis"));

    for (let page = start; page <= end; page++) {
      pages.push(renderPageButton(page));
    }

    if (end < totalPages - 1) pages.push(renderEllipsis("end-ellipsis"));

    // Always show last page
    pages.push(renderPageButton(totalPages));

    return pages;
  };

  if (totalPages === 0) return null;

  return (
    <div>
      {/* Start Date & Time Selector */}
      <div className="mb-4">
        <label className="mr-2">Start Date & Time:</label>
        <input
          type="datetime-local"
          value={currentStartDate}
          onChange={handleStartDateChange}
          className="border px-2 py-1 rounded"
        />
      </div>

      {/* End Date & Time Selector */}
      <div className="mb-4">
        <label className="mr-2">End Date & Time:</label>
        <input
          type="datetime-local"
          value={currentEndDate}
          onChange={handleEndDateChange}
          className="border px-2 py-1 rounded"
        />
      </div>
      {/* Report Number Filter */}
      <div>
        <input 
          type="text"
          value={filteredReportNumber}
          onChange={(e)=>setFilteredReportNumber(Number(e.target.value))}
        />
        <button
          onClick={handleReportNumberChange}
          >
          save Filters
        </button>
      </div>
      {/* Per Page Selector */}
      <div className="mb-4">
        <label className="mr-2">Reports Per Page:</label>
        <select
          value={currentPerPage}
          className="border px-2 py-1 rounded"
          onChange={handlePerPageChange}
        >
          {perPageSelections.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination Buttons */}
      <div className={cn("flex items-center justify-end gap-3")}>
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
