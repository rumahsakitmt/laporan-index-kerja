import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferResponseType, InferRequestType } from "hono";
import { toast } from "sonner";

const $put = client.api.rooms.$put;
type ResponseType = InferResponseType<typeof $put>;
type RequestType = InferRequestType<typeof $put>["json"];

export const useEditRoom = () => {
	const queryClient = useQueryClient();
	return useMutation<ResponseType, Error, RequestType>({
		mutationFn: async (data) => {
			const response = await $put({
				json: data,
			});
			if (!response.ok) {
				throw new Error("Failed to edit room.");
			}
			toast.success("Successfully editing a room.");
			return await response.json();
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: ["rooms"],
			});
		},
	});
};
