import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import type { InferResponseType } from "hono";

const $get = client.api.graph.users.$get;
export type UsersResponse = InferResponseType<typeof $get, 200>;

export function useGetUserGraph(role: string) {
	const query = useQuery<UsersResponse, Error>({
		queryKey: ["graph", "users", role],
		queryFn: async () => {
			const res = await $get({
				query: {
					role,
				},
			});
			if (!res.ok) {
				throw new Error("Failed to get  users report");
			}

			return await res.json();
		},
		enabled: !!role,
	});

	return query;
}
