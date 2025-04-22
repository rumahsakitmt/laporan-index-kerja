import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import type { InferResponseType } from "hono";

const $get = client.api.graph.range.$get;
export type UsersResponse = InferResponseType<typeof $get, 200>;

export function useGetGraphRange({
	userId,
	startDate,
	endDate,
}: {
	userId: string;
	startDate: Date | undefined;
	endDate: Date | undefined;
}) {
	const query = useQuery<UsersResponse, Error>({
		queryKey: ["graph", "range", { userId, startDate, endDate }],
		queryFn: async () => {
			const res = await $get({
				query: {
					userId,
					startDate: (startDate ?? new Date()).toDateString(),
					endDate: (endDate ?? new Date()).toDateString(),
				},
			});
			if (!res.ok) {
				throw new Error("Failed to get a report");
			}

			return await res.json();
		},
		enabled: !!userId,
	});

	return query;
}
