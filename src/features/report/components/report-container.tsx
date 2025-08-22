"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useGetReports } from "../query/get-reports";
import ReportCard from "./report-card";
import { ReportTable } from "./table/report-table";

export default function ReportContainer() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { data, isLoading } = useGetReports();

  if (isMobile) {
    return (
      <ReportCard
        reports={data?.reports}
        isLoading={isLoading}
        totalPage={data?.totalPage}
        currentPage={data?.page}
        isUserOnly={false}
      />
    );
  }

  return <ReportTable />;
}
