import React, { Suspense } from "react";
import ReportFilter from "@/features/report/components/table/report-filter";
import Dynamic from "./dynamic";

export default function page({ params }: { params: { userId: string } }) {
  const { userId } = params;
  return (
    <main className="space-y-4">
      <ReportFilter isUserOnly={true} />
      <Suspense fallback={<div>Loading...</div>}>
        <Dynamic userId={userId} />
      </Suspense>
    </main>
  );
}
