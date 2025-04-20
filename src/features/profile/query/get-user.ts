import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import type { InferResponseType } from "hono";

const $get = client.api.profile.users[":userId"].$get;
export type UsersResponse = InferResponseType<typeof $get, 200>;

export function useGetUser(userId: string) {
	const query = useQuery<UsersResponse, Error>({
		queryKey: ["users"],
		queryFn: async () => {
			const res = await $get({
				param: {
					userId,
				},
			});
			if (!res.ok) {
				throw new Error("Failed to get a user");
			}

			return await res.json();
		},
		enabled: !!userId,
	});

	return query;
}
