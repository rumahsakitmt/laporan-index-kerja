import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferResponseType, InferRequestType } from "hono";
import { toast } from "sonner";

const $delete = client.api.reports[":reportId"].$delete;
type ResponseType = InferResponseType<typeof $delete>;
type RequestType = InferRequestType<typeof $delete>["param"];

export const useDeleteReport = (reportId: number) => {
	const queryClient = useQueryClient();
	return useMutation<ResponseType, Error, RequestType>({
		mutationFn: async () => {
			const response = await $delete({
				param: {
					reportId: reportId.toString(),
				},
			});
			if (!response.ok) {
				const res = await response.json();
				throw new Error(res.message);
			}
			toast.success("Successfully deleting a report.");
			return await response.json();
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: ["reports"],
			});
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
};
