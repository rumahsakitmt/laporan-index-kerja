import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import type { InferResponseType } from "hono";

const $get = client.api.reports[":reportId"].$get;
export type ReportResponse = InferResponseType<typeof $get, 200>;

export function useGetReport(reportId: number) {
	const query = useQuery<ReportResponse, Error>({
		queryKey: ["report", reportId],
		queryFn: async () => {
			const res = await $get({
				param: {
					reportId: reportId.toString(),
				},
			});
			if (!res.ok) {
				throw new Error("Failed to get report");
			}

			return await res.json();
		},
	});

	return query;
}
