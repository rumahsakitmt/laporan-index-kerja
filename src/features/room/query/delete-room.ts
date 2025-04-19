import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferResponseType, InferRequestType } from "hono";
import { toast } from "sonner";

const $delete = client.api.rooms[":roomId"].$delete;
type ResponseType = InferResponseType<typeof $delete>;
type RequestType = InferRequestType<typeof $delete>["param"];

export const useDeleteRoom = (roomId: number) => {
	const queryClient = useQueryClient();
	return useMutation<ResponseType, Error, RequestType>({
		mutationFn: async () => {
			const response = await $delete({
				param: {
					roomId: roomId.toString(),
				},
			});
			if (!response.ok) {
				throw new Error("Failed to deleteroom.");
			}
			toast.success("Successfully delete room.");
			return await response.json();
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: ["rooms", roomId],
			});
			queryClient.invalidateQueries({
				queryKey: ["rooms"],
			});
		},
	});
};
