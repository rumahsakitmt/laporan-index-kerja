"use client";
import React from "react";
import { useQueryReportStore } from "../../hooks/use-report-query";
import { useGetReports } from "../../query/get-reports";
import { PaginationControls } from "@/components/ui/pagination-controls";

export default function ReportPagination() {
  const { state, setState } = useQueryReportStore();
  const { data } = useGetReports();

  if (!data || data.totalPage <= 1) return null;

  return (
    <PaginationControls
      currentPage={state.page}
      totalPages={data.totalPage}
      onPageChange={(page) => setState({ page })}
      showFirstLast={false}
    />
  );
}
