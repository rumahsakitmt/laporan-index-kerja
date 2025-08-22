import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import type { InferResponseType } from "hono";
import { useQueryReportStore } from "../hooks/use-report-query";

const $get = client.api.reports.$get;
export type ReportResponse = InferResponseType<typeof $get, 200>;

interface query {
  userId: string;
}

export function useGetReports(queryParam?: query) {
  const { state } = useQueryReportStore();
  const query = useQuery<ReportResponse, Error>({
    queryKey: ["reports", { ...queryParam }, { ...state }],
    queryFn: async () => {
      const res = await $get({
        query: {
          userId: queryParam?.userId || state.userId,
          date: state.date?.toString(),
          dateFrom: state.dateFrom?.toString(),
          dateTo: state.dateTo?.toString(),
          q: state.q,
          roomId: state.roomId,
          status: state.status,
          page: state.page.toString(),
          limit: state.limit.toString(),
        },
      });
      if (!res.ok) {
        throw new Error("Failed to get reports");
      }

      return await res.json();
    },
  });

  return query;
}
