"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetGraphRange } from "../query/get-report-range";
import { useFilterStore } from "../hooks/use-filter-graph";
import { Skeleton } from "@/components/ui/skeleton";

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
        <p className="text-muted-foreground">
          Ups, tidak ada yang bisa ditampilkan.
        </p>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Laporan Index Kerja</p>
        <div className="flex font-bold">{total} L.I.K</div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={reports}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
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
            <Bar dataKey="count" fill={"var(--color-count)"} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
