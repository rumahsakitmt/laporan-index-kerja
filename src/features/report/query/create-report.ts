import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferResponseType, InferRequestType } from "hono";
import { toast } from "sonner";

const $post = client.api.reports.$post;
type ResponseType = InferResponseType<typeof $post>;
type RequestType = InferRequestType<typeof $post>["json"];

export const useCreateReport = () => {
	const queryClient = useQueryClient();
	return useMutation<ResponseType, Error, RequestType>({
		mutationFn: async (data) => {
			const response = await $post({ json: data });
			if (!response.ok) {
				throw new Error("Failed to create report.");
			}
			toast.success("Successfully creating a new report.");
			return await response.json();
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: ["reports"],
			});
		},
	});
};
