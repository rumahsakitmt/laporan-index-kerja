import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferResponseType, InferRequestType } from "hono";
import { toast } from "sonner";

const $put = client.api.profile.users.role[":userId"].$put;
type ResponseType = InferResponseType<typeof $put>;
type RequestType = InferRequestType<typeof $put>["json"];

export const useEditUserRole = (userId: string) => {
	const queryClient = useQueryClient();
	return useMutation<ResponseType, Error, RequestType>({
		mutationFn: async (data) => {
			const response = await $put({
				json: data,
				param: {
					userId,
				},
			});
			if (!response.ok) {
				throw new Error("Failed to edit user role.");
			}
			toast.success("Successfully editing user role.");
			return await response.json();
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: ["users"],
			});
		},
	});
};
