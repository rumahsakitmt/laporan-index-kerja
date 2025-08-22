"use client";

import { useGetReports } from "../query/get-reports";
import { format } from "date-fns";
import {
  Wrench,
  Database,
  Network,
  Server,
  Globe,
  HardDrive,
  Bug,
  Code,
  Activity,
  Heart,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  HelpCircle,
} from "lucide-react";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { useQueryReportStore } from "../hooks/use-report-query";
import { Skeleton } from "@/components/ui/skeleton";

const getProblemIcon = (problem: string) => {
  const lowerProblem = problem.toLowerCase();

  if (
    lowerProblem.includes("maintenance") ||
    lowerProblem.includes("perangkat") ||
    lowerProblem.includes("komputer") ||
    lowerProblem.includes("laptop") ||
    lowerProblem.includes("printer")
  ) {
    return <Wrench className="h-4 w-4" />;
  }
  if (
    lowerProblem.includes("database") ||
    lowerProblem.includes("backup") ||
    lowerProblem.includes("data") ||
    lowerProblem.includes("simrs")
  ) {
    return <Database className="h-4 w-4" />;
  }
  if (
    lowerProblem.includes("jaringan") ||
    lowerProblem.includes("network") ||
    lowerProblem.includes("internet")
  ) {
    return <Network className="h-4 w-4" />;
  }
  if (lowerProblem.includes("server")) {
    return <Server className="h-4 w-4" />;
  }
  if (
    lowerProblem.includes("online") ||
    lowerProblem.includes("service") ||
    lowerProblem.includes("antrian")
  ) {
    return <Globe className="h-4 w-4" />;
  }
  if (lowerProblem.includes("backup") || lowerProblem.includes("storage")) {
    return <HardDrive className="h-4 w-4" />;
  }
  if (
    lowerProblem.includes("troubleshot") ||
    lowerProblem.includes("bug") ||
    lowerProblem.includes("error")
  ) {
    return <Bug className="h-4 w-4" />;
  }
  if (
    lowerProblem.includes("pengembangan") ||
    lowerProblem.includes("development") ||
    lowerProblem.includes("aplikasi")
  ) {
    return <Code className="h-4 w-4" />;
  }
  if (lowerProblem.includes("monitoring") || lowerProblem.includes("monitor")) {
    return <Activity className="h-4 w-4" />;
  }
  if (
    lowerProblem.includes("satu sehat") ||
    lowerProblem.includes("satusehat")
  ) {
    return <Heart className="h-4 w-4" />;
  }
  if (lowerProblem.includes("antrian") || lowerProblem.includes("queue")) {
    return <Clock className="h-4 w-4" />;
  }
  if (lowerProblem.includes("bpjs") || lowerProblem.includes("icare")) {
    return <Activity className="h-4 w-4" />;
  }

  return <HelpCircle className="h-4 w-4" />;
};

const getStatusIcon = (status: string) => {
  const lowerStatus = status.toLowerCase();

  if (
    lowerStatus.includes("selesai") ||
    lowerStatus.includes("done") ||
    lowerStatus.includes("completed")
  ) {
    return <CheckCircle className="h-4 w-4 text-primary" />;
  }
  if (
    lowerStatus.includes("pending") ||
    lowerStatus.includes("menunggu") ||
    lowerStatus.includes("waiting")
  ) {
    return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
  }
  if (
    lowerStatus.includes("dibatalkan") ||
    lowerStatus.includes("cancelled") ||
    lowerStatus.includes("failed")
  ) {
    return <XCircle className="h-4 w-4 text-red-500" />;
  }

  return <HelpCircle className="h-4 w-4 text-gray-500" />;
};

export default function ReportCard({ userId }: { userId: string }) {
  const { data, isLoading } = useGetReports({ userId: userId ?? "" });
  const { state, setState } = useQueryReportStore();

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full opacity-60" />
        <Skeleton className="h-28 w-full opacity-30" />
        <Skeleton className="h-28 w-full opacity-10" />
      </div>
    );
  }

  if (!data || data.reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-sm text-muted-foreground">Tidak ada data</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-8 flex flex-col h-full">
      <div className="space-y-2 flex-1">
        {data.reports.map((report, index) => (
          <div
            key={report.id}
            className={`p-4 rounded-lg ${
              index % 2 === 0 ? "bg-card" : "bg-muted/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold uppercase">
                {format(new Date(report.date), "dd MMMM yyyy")}
              </p>
              <p className="text-sm text-muted-foreground">
                {report.room?.name}
              </p>
            </div>
            <div className="flex items-start gap-2 mt-2">
              <div className="text-muted-foreground">
                {getProblemIcon(report.problem)}
              </div>
              <div className="flex-1">
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
      </div>

      {data.totalPage > 1 && (
        <div className="pt-4 border-t">
          <PaginationControls
            currentPage={state.page}
            totalPages={data.totalPage}
            onPageChange={(page) => setState({ page })}
            className="pt-2"
            showFirstLast={false}
          />
        </div>
      )}
    </div>
  );
}
