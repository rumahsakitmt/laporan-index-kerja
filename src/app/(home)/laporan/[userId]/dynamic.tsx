"use client";

import ReportCardInfinite from "@/features/report/components/report-card-infinite";

export default function Dynamic({ userId }: { userId: string }) {
  return <ReportCardInfinite userId={userId} isUserOnly={true} />;
}
