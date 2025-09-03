// "use client"

// import { useRouter, useSearchParams } from "next/navigation";

// interface Props{
//     pages:number|undefined
// }

// export default function DailyReportsPagination({pages}:Props){
//     const perPageSelections = [1,2,3,4,5,6];
//     const router = useRouter();
//     const searchParams = useSearchParams();

//       // Default to per_page=1 and page=1
//     const currentPerPage = Number(searchParams.get("per_page") || 1)
//     const currentPage = Number(searchParams.get("page") || 1)
    

//     const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
//         const perPage = e.target.value
//         router.push(`?per_page=${perPage}`)
//     }


//     return(
//         <div>
            
//             {/* Per Page Selector */}
//             <div>
//                 <label htmlFor="">Reports Per Page</label>
//                 <select 
//                  value={currentPerPage}
//                  className="border px-2 py-1 rounded"
//                  onChange={handlePerPageChange}
//                  >
//                     {perPageSelections.map((n)=>(
//                         <option key={n} value={n}>
//                             {n}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             {/* Page Selector */}
//             <div>

//             </div>

//         </div>
//     )
// }



"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "rizzui";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import cn from "@/utils/class-names";

interface DailyReportsPaginationProps {
  totalPages: number;
}

export default function DailyReportsPagination({ totalPages }: DailyReportsPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const perPageSelections = [1,2,3,4,5,6];


  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
    const perPage = e.target.value
    router.push(`?per_page=${perPage}&page=${currentPage}`)
  }
  const currentPerPage = Number(searchParams.get("per_page")) || 1;
  const currentPage = Number(searchParams.get("page")) || 1;

  const goToPage = (page: number) => {
    router.push(`?per_page=${currentPerPage}&page=${page}`);
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
    if (totalPages > 1) pages.push(renderPageButton(totalPages));

    return pages;
  };

  if (totalPages === 0) return null;

  return (
    <div>
          {/* Per Page Selector */}
          <div>
              <label htmlFor="">Reports Per Page</label>
              <select 
                value={currentPerPage}
                className="border px-2 py-1 rounded"
                onChange={handlePerPageChange}
                >
                  {perPageSelections.map((n)=>(
                    <option key={n} value={n}>
                         {n}
                    </option>
                  ))}
                </select>
             </div>
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

