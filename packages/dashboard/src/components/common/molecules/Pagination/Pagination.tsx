import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { usePaginationRange } from "@core/hooks/usePaginationRange";
import { cn } from "@core/utils";

import { PaginationButton } from "@ui/atoms/Pagination/Button/PaginationButton";
import { PaginationInput } from "@ui/atoms/Pagination/Input/PaginationInput";

import { IPaginationProps } from "./Pagination.props";

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: IPaginationProps) => {
  const pages = usePaginationRange(currentPage, totalPages);

  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <div className="flex gap-2">
        <PaginationButton
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft className="h-4 w-4" />
        </PaginationButton>

        <PaginationButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </PaginationButton>
      </div>

      <div className="hidden md:flex gap-2">
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-4 py-2">
              ...
            </span>
          ) : (
            <PaginationButton
              key={p}
              onClick={() => onPageChange(p as number)}
              active={currentPage === p}
            >
              {p}
            </PaginationButton>
          )
        )}
      </div>

      <PaginationInput
        current={currentPage}
        total={totalPages}
        onSubmit={onPageChange}
      />

      <div className="flex gap-2">
        <PaginationButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </PaginationButton>

        <PaginationButton
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight className="h-4 w-4" />
        </PaginationButton>
      </div>
    </div>
  );
};
