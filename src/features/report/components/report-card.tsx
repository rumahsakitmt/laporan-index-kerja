"use client";

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
import { id } from "date-fns/locale";

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

interface ReportCardProps {
  reports?: Array<{
    id: number;
    date: string;
    problem: string;
    status: string;
    room?: {
      id: number;
      name: string;
    } | null;
    user?: {
      id: string;
      name: string;
    } | null;
    task?: {
      id: number;
      name: string;
      desc: string | null;
      type: string;
    } | null;
    time: string;
    needs: string | null;
    notes: string | null;
  }>;
  isLoading?: boolean;
  totalPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  showPagination?: boolean;
  isUserOnly?: boolean;
}

export default function ReportCard({
  reports = [],
  isLoading = false,
  totalPage = 1,
  currentPage = 1,
  onPageChange,
  showPagination = true,
  isUserOnly = false,
}: ReportCardProps) {
  const { setState } = useQueryReportStore();

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

  if (!reports || reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-sm text-muted-foreground">Tidak ada data</p>
      </div>
    );
  }

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    } else {
      setState({ page });
    }
  };

  return (
    <div className="space-y-4 pb-8 flex flex-col h-full">
      <div className="space-y-2 flex-1">
        {reports.map((report, index) => (
          <div
            key={report.id}
            className={`p-4 rounded-lg ${
              index % 2 === 0 ? "bg-card" : "bg-muted/50"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="uppercase text-sm text-muted-foreground">
                  {format(new Date(report.date), "dd MMMM yyyy", {
                    locale: id,
                  })}
                </p>

                {!isUserOnly && (
                  <p className="uppercase text-sm">{report.user?.name}</p>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {report.room?.name}
              </p>
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
      </div>

      {showPagination && totalPage > 1 && (
        <div className="pt-4 border-t">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPage}
            onPageChange={handlePageChange}
            className="pt-2"
            showFirstLast={false}
          />
        </div>
      )}
    </div>
  );
}
