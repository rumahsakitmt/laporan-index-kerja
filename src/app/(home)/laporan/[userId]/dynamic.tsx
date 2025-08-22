"use client";

import ReportCard from "@/features/report/components/report-card";
import { useGetReports } from "@/features/report/query/get-reports";

export default function Dynamic({ userId }: { userId: string }) {
  const { data, isLoading } = useGetReports({ userId });

  return (
    <ReportCard
      reports={data?.reports}
      isLoading={isLoading}
      totalPage={data?.totalPage}
      currentPage={data?.page}
      total={data?.total}
      isUserOnly={true}
    />
  );
}
