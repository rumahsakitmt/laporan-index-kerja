import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import type { InferResponseType } from "hono";

const $get = client.api.profile.users.$get;
export type UsersResponse = InferResponseType<typeof $get, 200>;

export function useGetUsers() {
	const query = useQuery<UsersResponse, Error>({
		queryKey: ["users"],
		queryFn: async () => {
			const res = await $get();
			if (!res.ok) {
				throw new Error("Failed to get users");
			}

			return await res.json();
		},
	});

	return query;
}
