"use client";
import { HorizontalBarChart } from "@/components/bar-chart";
import React from "react";
import { useGetUserReportCounts } from "../query/get-user-report-counts";
import { useFilterStore } from "../hooks/use-filter-graph";

export default function UserReportChart() {
  const { filter } = useFilterStore();
  const { data: userReports, isLoading } = useGetUserReportCounts({
    startDate: filter.date?.from,
    endDate: filter.date?.to,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-72">
        <div className="text-sm text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!userReports || userReports.length === 0) {
    return (
      <div className="flex items-center justify-center h-72">
        <div className="text-sm text-muted-foreground">No data available</div>
      </div>
    );
  }

  return <HorizontalBarChart data={userReports} />;
}
