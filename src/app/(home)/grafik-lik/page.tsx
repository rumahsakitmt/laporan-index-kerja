import React from "react";

import { BarCharComponent } from "@/features/graph/component/bar-chart";
import UserReportChart from "@/features/graph/component/user-report-chart";
import { DatePickerWithRange } from "@/features/graph/component/date-picker-range";
import ReportSheet from "@/features/report/components/sheet/report-sheet";

export default function GrafikLikComponent() {
  return (
    <main className="w-full space-y-8">
      <DatePickerWithRange />
      <div>
        <p className="text-sm uppercase tracking-widest">
          Grafik lik bulan ini
        </p>
        <UserReportChart />
      </div>
      <BarCharComponent />
      <ReportSheet />
    </main>
  );
}
