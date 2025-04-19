import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import type { InferResponseType } from "hono";

const $get = client.api.rooms[":roomId"].$get;
export type FinanceResponse = InferResponseType<typeof $get, 200>;

export function useGetRoom(roomId: number) {
	const query = useQuery<FinanceResponse, Error>({
		queryKey: ["rooms", roomId],
		queryFn: async () => {
			const res = await $get({
				param: {
					roomId: roomId.toString(),
				},
			});
			if (!res.ok) {
				throw new Error("Failed to get room");
			}

			return await res.json();
		},
		enabled: !!roomId,
	});

	return query;
}
