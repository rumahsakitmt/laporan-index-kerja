"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import ReportCardInfinite from "./report-card-infinite";
import { ReportTableInfinite } from "./table/report-table-infinite";
import { useEffect, useState } from "react";

export default function ReportContainer() {
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isMobile) {
    return <ReportCardInfinite isUserOnly={false} />;
  }

  return <ReportTableInfinite />;
}
