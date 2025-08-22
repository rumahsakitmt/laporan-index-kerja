import React, { Suspense } from "react";
import ReportFilter from "@/features/report/components/table/report-filter";
import Dynamic from "./dynamic";

export default async function page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  return (
    <main className="space-y-4">
      <ReportFilter isUserOnly={true} />
      <Suspense fallback={<div>Loading...</div>}>
        <Dynamic userId={userId} />
      </Suspense>
    </main>
  );
}
