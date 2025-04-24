import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import type { InferResponseType } from "hono";

const $get = client.api.task.$get;
export type ReportResponse = InferResponseType<typeof $get, 200>;


export function useGetTasks() {
	const query = useQuery<ReportResponse, Error>({
		queryKey: ["tasks"],
		queryFn: async () => {
			const res = await $get();
			if (!res.ok) {
				throw new Error("Failed to get tasks.");
			}

			return await res.json();
		},
	});

	return query;
}