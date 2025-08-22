"use client";

import { format } from "date-fns";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { id } from "date-fns/locale";
import { useGetReportsInfinite } from "../query/get-reports-infinite";
import { ScrollToTopContainer } from "@/components/ui/scroll-to-top-container";
import { useSheetStore } from "../hooks/use-toggle-report-sheet";
import { getProblemIcon, getStatusIcon, getUserColor } from "../utils";
import ReportTableAction from "./table/report-table-action";
import { allowedRole } from "@/lib/utils";
import { useAuth } from "@/provider/auth-provider";

interface ReportCardInfiniteProps {
  userId?: string;
  isUserOnly?: boolean;
}

export default function ReportCardInfinite({
  userId,
  isUserOnly = false,
}: ReportCardInfiniteProps) {
  const { ref, inView } = useInView();
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useGetReportsInfinite(userId ? { userId } : undefined);
  const { openSheet } = useSheetStore();
  const session = useAuth();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allReports = data?.pages.flatMap((page) => page.reports) ?? [];
  const totalReports = data?.pages[0]?.total ?? 0;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <div className="space-y-2">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full opacity-60" />
          <Skeleton className="h-28 w-full opacity-30" />
          <Skeleton className="h-28 w-full opacity-10" />
        </div>
      </div>
    );
  }

  if (!allReports || allReports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-sm text-muted-foreground">Tidak ada data</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 pb-8 flex flex-col h-full">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Total Laporan: {totalReports}
          </p>
        </div>
        <div className="space-y-2 flex-1">
          {allReports.map((report, index) => (
            <div
              key={`${report.id}-${index}`}
              className={`p-4 rounded-lg cursor-pointer hover:bg-accent transition-colors ${
                index % 2 === 0 ? "bg-card" : "bg-muted/50"
              }`}
              onClick={() => openSheet(report.id)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="uppercase text-sm text-muted-foreground">
                    {format(new Date(report.date), "dd MMMM yyyy", {
                      locale: id,
                    })}
                  </p>

                  {!isUserOnly && (
                    <p className="uppercase text-sm">
                      <span
                        className={`${getUserColor(
                          report.user?.name || ""
                        )} px-2 py-1 rounded-full text-xs font-semibold`}
                      >
                        {report.user?.name}
                      </span>
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">
                    {report.room?.name}
                  </p>{" "}
                  {allowedRole(session?.session?.user.role ?? "") &&
                    isUserOnly && <ReportTableAction reportId={report.id} />}
                </div>
              </div>
              <div className="flex items-start gap-2 mt-2">
                <div className="text-muted-foreground">
                  {getProblemIcon(report.problem)}
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <p className="text-sm">{report.problem}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getStatusIcon(report.status)}
                    <span className="text-xs text-muted-foreground">
                      {report.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isFetchingNextPage && (
            <div className="space-y-2">
              <Skeleton className="h-20 w-full opacity-60" />
              <Skeleton className="h-20 w-full opacity-30" />
              <Skeleton className="h-20 w-full opacity-10" />
            </div>
          )}

          <div ref={ref} className="h-4" />

          {!hasNextPage && allReports.length > 0 && (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">
                Semua data telah dimuat
              </p>
            </div>
          )}
        </div>
      </div>
      <ScrollToTopContainer variant="mobile" />
    </>
  );
}
