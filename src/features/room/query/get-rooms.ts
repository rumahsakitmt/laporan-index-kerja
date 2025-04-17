import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import type { InferResponseType } from "hono";

const $get = client.api.rooms.$get;
export type FinanceResponse = InferResponseType<typeof $get, 200>;

export function useGetRooms() {
	const query = useQuery<FinanceResponse, Error>({
		queryKey: ["rooms"],
		queryFn: async () => {
			const res = await $get();
			if (!res.ok) {
				throw new Error("Failed to get finances");
			}

			return await res.json();
		},
	});

	return query;
}
