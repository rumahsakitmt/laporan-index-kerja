"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  className?: string;
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  className = "",
}: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  const generatePageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const showFirst = 2;
      const showLast = 2;

      for (let i = 1; i <= showFirst; i++) {
        pages.push(i);
      }

      if (currentPage > showFirst + 1 && currentPage < totalPages - showLast) {
        pages.push("ellipsis1");
      } else if (currentPage > showFirst + 1) {
        pages.push("ellipsis1");
      }

      if (currentPage > showFirst && currentPage < totalPages - showLast + 1) {
        pages.push(currentPage);
      }

      if (currentPage > showFirst && currentPage < totalPages - showLast) {
        pages.push("ellipsis2");
      } else if (currentPage < totalPages - showLast) {
        pages.push("ellipsis2");
      }

      for (let i = totalPages - showLast + 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {showFirstLast && (
        <Button
          onClick={() => onPageChange(1)}
          disabled={currentPage <= 1}
          variant="ghost"
          size="sm"
          title="First page"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
      )}

      {showPrevNext && (
        <Button
          onClick={() => {
            if (currentPage <= 1) return;
            onPageChange(currentPage - 1);
          }}
          disabled={currentPage <= 1}
          variant="ghost"
          size="sm"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      <div className="flex items-center gap-1">
        {pages.map((page, index) => {
          if (page === "ellipsis1" || page === "ellipsis2") {
            return (
              <span key={`ellipsis-${index}`} className="px-2">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </span>
            );
          }

          return (
            <Button
              key={page}
              onClick={() => onPageChange(page as number)}
              variant={currentPage === page ? "outline" : "ghost"}
              size="sm"
              className="w-8 h-8 p-0"
            >
              {page}
            </Button>
          );
        })}
      </div>

      {showPrevNext && (
        <Button
          onClick={() => {
            onPageChange(currentPage + 1);
          }}
          disabled={totalPages === currentPage}
          variant="ghost"
          size="sm"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}

      {showFirstLast && (
        <Button
          onClick={() => onPageChange(totalPages)}
          disabled={totalPages === currentPage}
          variant="ghost"
          size="sm"
          title="Last page"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
