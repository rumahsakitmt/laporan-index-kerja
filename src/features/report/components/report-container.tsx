"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import ReportCardInfinite from "./report-card-infinite";
import { ReportTableInfinite } from "./table/report-table-infinite";

export default function ReportContainer() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return <ReportCardInfinite isUserOnly={false} />;
  }

  return <ReportTableInfinite />;
}
