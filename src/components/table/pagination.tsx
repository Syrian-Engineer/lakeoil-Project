import React from 'react';
import cn from '@/utils/class-names';
import { Button } from 'rizzui';
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';

interface TablePaginationProps {
  className?: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function TablePagination({
  className,
  currentPage,
  totalPages,
  onPageChange,
}: TablePaginationProps) {
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageButton = (page: number) => (
    <Button
      key={page}
      size="sm"
      variant={page === currentPage ? 'solid' : 'outline'}
      onClick={() => onPageChange(page)}
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

    if (start > 2) pages.push(renderEllipsis('start-ellipsis'));

    for (let page = start; page <= end; page++) {
      pages.push(renderPageButton(page));
    }

    if (end < totalPages - 1) pages.push(renderEllipsis('end-ellipsis'));

    // Always show last page
    if (totalPages > 1) pages.push(renderPageButton(totalPages));

    return pages;
  };

  if (totalPages === 0) return null;

  return (
    <div className={cn('flex items-center justify-end gap-3', className)}>
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
  );
}
