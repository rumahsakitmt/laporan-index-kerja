"use client";

import React from "react";

import { TableCell, TableRow } from "@/components/ui/table";
import { useGetReports } from "../../query/get-reports";
import { format } from "date-fns";
import { allowedRole, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, CircleX, Loader, TriangleAlert } from "lucide-react";

import ReportTableAction from "./report-table-action";
import { useAuth } from "@/provider/auth-provider";
import { useSheetStore } from "../../hooks/use-toggle-report-sheet";
import ReportTableSkeleton from "../../skeleton/report-table-skeleton";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ReportRowDataProps {
  userId?: string;
  isShowAction?: boolean;
}

export default function ReportRowData({
  userId,
  isShowAction = true,
}: ReportRowDataProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { openSheet } = useSheetStore();
  const session = useAuth();
  const { data, isLoading } = useGetReports(userId ? { userId } : undefined);

  const typeColors = {
    main: " text-emerald-600 border-emerald-200",
    additional: "text-blue-600 border-blue-200",
  };

  if (isLoading) {
    return <ReportTableSkeleton />;
  }
  if (!data) {
    return (
      <TableRow>
        <TableCell colSpan={6}>
          <div className="flex items-center justify-center text-red-500 gap-2 py-4">
            <TriangleAlert className="w-4 h-4" /> Something went wrong.
          </div>
        </TableCell>
      </TableRow>
    );
  }

  const reports = data.reports;

  return reports.length > 0 ? (
    <>
      {reports.map((report) => (
        <TableRow key={report.id}>
          <TableCell>
            <Button
              onClick={() => openSheet(report.id)}
              variant="link"
              size="sm"
              className="pl-0"
            >
              {format(new Date(report.date ?? new Date()), "dd/MM/yyyy")}
            </Button>
          </TableCell>
          <TableCell>{report.room?.name}</TableCell>
          <TableCell className="text-center">
            {isMobile ? (
              <div>
                {report.status === "selesai" ? (
                  <CircleCheck className="text-teal-500" />
                ) : report.status === "ditunda" ? (
                  <Loader className="text-yellow-500" />
                ) : (
                  <CircleX className="text-red-500" />
                )}
              </div>
            ) : (
              <Badge
                className="w-full text-xs flex items md:py-[2px]"
                variant={
                  report.status === "selesai"
                    ? "outline-success"
                    : report.status === "ditunda"
                    ? "outline-wait"
                    : "outline-danger"
                }
              >
                {report.status === "selesai" ? (
                  <CircleCheck className="w-6 h-6" />
                ) : report.status === "ditunda" ? (
                  <Loader />
                ) : (
                  <CircleX />
                )}
                {report.status}
              </Badge>
            )}
          </TableCell>
          <TableCell className="text-center">
            {report.user?.name.split(" ")[0]}
          </TableCell>
          <TableCell>
            {report.task ? (
              <div>
                <div className="flex items-center gap-2">
                  <p>{report.task.name}</p>
                  <Badge
                    className={cn(
                      typeColors[report.task.type as keyof typeof typeColors],
                      "rounded-full text-xs"
                    )}
                    variant="outline"
                  >
                    {report.task.type === "main" ? "Utama" : "Tambahan"}
                  </Badge>
                </div>
                <p className="text-xs hidden md:block text-muted-foreground md:w-48 text-wrap">
                  {report.task.desc}
                </p>
              </div>
            ) : (
              <div>-</div>
            )}
          </TableCell>
          <TableCell className="hidden md:table-cell md:w-48">
            <p>{report.problem}</p>
          </TableCell>
          {allowedRole(session?.session?.user.role ?? "") && isShowAction && (
            <TableCell className="text-center">
              <ReportTableAction reportId={report.id} />
            </TableCell>
          )}
        </TableRow>
      ))}
    </>
  ) : (
    <TableRow>
      <TableCell colSpan={6}>
        <div className="w-full text-center flex items-center gap-2 justify-center py-4">
          Tidak ada data
          <span className="text-muted-foreground">¯\_(ツ)_/¯</span>
        </div>
      </TableCell>
    </TableRow>
  );
}
