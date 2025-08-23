"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetGraphRange } from "../query/get-report-range";
import { useFilterStore } from "../hooks/use-filter-graph";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { getUserChartColor } from "@/features/report/utils";

const chartConfig = {
  views: {
    label: "Index Kerja",
  },
  count: {
    label: "Count",
    color: "var(--color-primary)",
  },
} satisfies ChartConfig;

export function BarCharComponent() {
  const { filter } = useFilterStore();

  const { data: reports, isLoading } = useGetGraphRange({
    userId: filter.userId,
    startDate: filter.date?.from,
    endDate: filter.date?.to,
  });

  const total = React.useMemo(
    () => reports?.reduce((acc, report) => acc + report.count, 0),
    [reports]
  );

  if (isLoading) {
    return <Skeleton className="w-full h-[250px]" />;
  }

  if (!reports || reports.length === 0) {
    return (
      <div className="w-full text-sm text-center flex flex-col gap-2 py-8">
        <p className="font-bold">Ups, tidak ada yang bisa ditampilkan.</p>
        <p className="text-muted-foreground">
          Silahkan pilih petugas terlebih dahulu.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-2">
      <p className="text-sm uppercase tracking-widest">Laporan Index Kerja</p>
      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-[250px] w-full"
      >
        <BarChart accessibilityLayer data={reports}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = new Date(value);
              return format(date, "dd MMM", { locale: id });
            }}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                className="w-[150px]"
                nameKey="views"
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });
                }}
              />
            }
          />
          <Bar
            dataKey="count"
            fill={getUserChartColor(filter.userId ?? "")}
            radius={10}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
