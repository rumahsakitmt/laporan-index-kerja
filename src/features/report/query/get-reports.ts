import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import type { InferResponseType } from "hono";

const $get = client.api.reports.$get;
export type ReportResponse = InferResponseType<typeof $get, 200>;

interface query {
	userId: string;
}

export function useGetReports(queryParam?: query) {
	const query = useQuery<ReportResponse, Error>({
		queryKey: ["reports", { ...queryParam }],
		queryFn: async () => {
			const res = await $get({
				query: {
					userId: queryParam?.userId,
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
