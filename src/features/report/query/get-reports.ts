import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import type { InferResponseType } from "hono";

const $get = client.api.reports.$get;
export type ReportResponse = InferResponseType<typeof $get, 200>;

export function useGetReports() {
	const query = useQuery<ReportResponse, Error>({
		queryKey: ["reports"],
		queryFn: async () => {
			const res = await $get();
			if (!res.ok) {
				throw new Error("Failed to get reports");
			}

			return await res.json();
		},
	});

	return query;
}
