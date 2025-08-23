import { getUserChartColor } from "@/features/report/utils";
import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import type { InferResponseType } from "hono";

const $get = client.api.graph["user-reports"].$get;
export type UserReportCountsResponse = InferResponseType<typeof $get, 200>;

export function useGetUserReportCounts({
  startDate,
  endDate,
}: {
  startDate: Date | undefined;
  endDate: Date | undefined;
}) {
  const query = useQuery<
    UserReportCountsResponse,
    Error,
    { id: string; key: string; value: number; color: string }[]
  >({
    queryKey: ["graph", "user-reports", { startDate, endDate }],
    queryFn: async () => {
      const res = await $get({
        query: {
          startDate: startDate?.toISOString(),
          endDate: endDate?.toISOString(),
        },
      });
      if (!res.ok) {
        throw new Error("Failed to get user report counts");
      }

      return await res.json();
    },
    enabled: !!startDate && !!endDate,
    select: (data) => {
      return data.map((item) => ({
        id: item.userId,
        key: item.userName,
        value: item.reportCount,
        color: getUserChartColor(item.userName),
      }));
    },
  });

  return query;
}
