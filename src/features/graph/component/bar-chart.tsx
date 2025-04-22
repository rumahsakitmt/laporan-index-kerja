"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useGetGraphRange } from "../query/get-report-range"
import { useFilterStore } from "../hooks/use-filter-graph"


const chartConfig = {
  views: {
    label: "Index Kerja",
  },
  count: {
    label: "Count",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function BarCharComponent() {
  const { filter } = useFilterStore()

  const { data: reports, isLoading } = useGetGraphRange({
    userId: filter.userId,
    startDate: filter.date?.from,
    endDate: filter.date?.to,
  })

  const total = React.useMemo(
    () => reports?.reduce(
      (acc, report) => acc + report.count, 0),
    [reports]
  )


  return (
    <Card className="w-full">
      <CardHeader className="flex items-center justify-between">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Laporan Index Kerja</CardTitle>
          <CardDescription>
            Laporan ini menunjukkan jumlah index kerja yang dihasilkan oleh petugas.
          </CardDescription>
        </div>
        <div className="flex  font-bold">
          {total} L.I.K
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          {
            reports && reports.length > 0 ? (

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
                    const date = new Date(value)
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
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
                        })
                      }}
                    />
                  }
                />
                <Bar dataKey="count" fill={"var(--color-count)"} />
              </BarChart>

            ) :
              (<div className="w-full text-xl text-center">Silahkan Pilih Petugas atau Tanggal.</div>)
          }
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
