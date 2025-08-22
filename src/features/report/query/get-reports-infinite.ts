import { client } from "@/lib/rpc";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { InferResponseType } from "hono";
import { useQueryReportStore } from "../hooks/use-report-query";

const $get = client.api.reports.$get;
export type ReportResponse = InferResponseType<typeof $get, 200>;

interface query {
  userId?: string;
}

export function useGetReportsInfinite(queryParam?: query) {
  const { state } = useQueryReportStore();

  const query = useInfiniteQuery<ReportResponse, Error>({
    queryKey: ["reports-infinite", { ...queryParam }, { ...state }],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await $get({
        query: {
          userId: queryParam?.userId,
          date: state.date?.toString(),
          dateFrom: state.dateFrom?.toString(),
          dateTo: state.dateTo?.toString(),
          q: state.q,
          roomId: state.roomId,
          status: state.status,
          page: pageParam as unknown as string,
          limit: state.limit.toString(),
        },
      });
      if (!res.ok) {
        throw new Error("Failed to get reports");
      }

      return await res.json();
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page >= lastPage.totalPage) {
        return undefined;
      }
      return lastPage.page + 1;
    },
    initialPageParam: 1,
  });

  return query;
}
