"use client";

import React from "react";
import { useSheetStore } from "../../hooks/use-toggle-report-sheet";
import { useGetReport } from "../../query/get-report";
import { Building, ChevronRight } from "lucide-react";
import { getProblemIcon, getStatusIcon } from "../../utils";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function ReportList() {
  const { sheet } = useSheetStore();

  if (!sheet.reportIds || sheet.reportIds.length === 0) {
    return (
      <div className="text-center w-full">
        <p className="text-red-500">No reports found.</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="text-center">
        <p className="text-lg font-semibold">
          {sheet.reportIds.length} Report{sheet.reportIds.length > 1 ? "s" : ""}{" "}
          for this date
        </p>
        <p className="text-sm text-muted-foreground">
          Click on a report to view details
        </p>
      </div>

      <div className="space-y-2">
        {sheet.reportIds.map((reportId, index) => (
          <ReportListItem key={reportId} reportId={reportId} />
        ))}
      </div>
    </div>
  );
}

function ReportListItem({ reportId }: { reportId: number }) {
  const { openSheet } = useSheetStore();
  const { data: report, isLoading } = useGetReport(reportId);

  if (isLoading) {
    return (
      <div className="p-3 border rounded-lg animate-pulse">
        <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-muted rounded w-1/2"></div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="p-3 border rounded-lg text-red-500">
        <p>Report not found</p>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      className={cn("w-full justify-between p-4 h-auto")}
      onClick={() => openSheet(reportId)}
    >
      <div className="flex items-center gap-3 text-left">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">
            {getProblemIcon(report.problem)}
          </span>
          <div>
            <p className="font-semibold">{report.user?.name}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building size={14} />
              <span>{report.room?.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {getStatusIcon(report.status)}
        <span className="text-sm">{report.status}</span>
        <ChevronRight size={16} />
      </div>
    </Button>
  );
}
