"use client";

import React from "react";
import { useSheetStore } from "../../hooks/use-toggle-report-sheet";
import { format } from "date-fns";
import { useGetReport } from "../../query/get-report";
import { Building } from "lucide-react";
import ReportDetailSkeleton from "../skeleton/report-detail-skeleton";
import { id } from "date-fns/locale";
import { getProblemIcon, getStatusIcon, getUserColor } from "../../utils";
import { cn } from "@/lib/utils";

export default function ReportDetail() {
  const { sheet } = useSheetStore();

  const { data: report, isLoading } = useGetReport(sheet.reportId);

  if (isLoading) {
    return <ReportDetailSkeleton />;
  }

  if (!report) {
    return (
      <div className="text-center w-full">
        <p className="text-red-500">Something went Wrong.</p>
      </div>
    );
  }

  return (
    <>
      <article className="p-4 space-y-4">
        <p className="text-muted-foreground tracking-widest text-center uppercase">
          {format(new Date(report.date ?? new Date()), "dd MMMM yyyy", {
            locale: id,
          })}
        </p>
        <div className="space-y-2">
          <div className="p-4 space-y-2">
            <div
              className={cn(
                "p-2 py-4 rounded-md",
                getUserColor(report.user?.name || "")
              )}
            >
              <p
                className={cn(
                  "text-xl font-bold uppercase",
                  getUserColor(report.user?.name || ""),
                  "bg-transparent dark:bg-transparent"
                )}
              >
                {report.user?.name}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex text-muted-foreground text-sm items-center gap-2">
                  <Building size={16} />
                  <p>{report.room?.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(report.status)}
                  <p className="text-sm md:text-base">{report.status}</p>
                </div>
              </div>
            </div>
            <div className="border-b w-full border-dashed my-4" />
            <div className="p-2 bg-card rounded-md">
              <p className="text-muted-foreground tracking-widest">MASALAH</p>
              <p className="text-sm md:text-base">{report.problem}</p>
            </div>
            <div className="bg-accent p-2 rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <p className="text-muted-foreground tracking-widest">
                  URAIAN TUGAS
                </p>
                <p className="text-muted-foreground tracking-widest">
                  JENIS TUGAS
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    {getProblemIcon(report.problem)}
                  </span>
                  <p className="text-sm md:text-base">
                    {report.task ? report.task.name : "-"}
                  </p>
                </div>
                <p className="text-sm md:text-base uppercase">
                  {report.task
                    ? report.task.type === "main"
                      ? "UTAMA"
                      : "TAMBAHAN"
                    : "-"}
                </p>
              </div>
            </div>
            <div className="p-2 bg-card rounded-md">
              <p className="text-muted-foreground tracking-widest">KEBUTUHAN</p>
              <p className="text-sm md:text-base">{report.needs || "-"}</p>
            </div>
            <div className="p-2 bg-accent rounded-md">
              <p className="text-muted-foreground tracking-widest">
                KETERANGAN
              </p>
              <p className="text-sm md:text-base">{report.notes || "-"}</p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
