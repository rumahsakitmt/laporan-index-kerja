import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferResponseType, InferRequestType } from "hono";
import { toast } from "sonner";

const $put = client.api.reports[":reportId"].$put;
type ResponseType = InferResponseType<typeof $put>;
type RequestType = InferRequestType<typeof $put>["json"];

export const useEditReport = (reportId: number | undefined) => {
	const queryClient = useQueryClient();
	return useMutation<ResponseType, Error, RequestType>({
		mutationFn: async (data) => {
			const response = await $put({
				param: {
					reportId: reportId ? reportId.toString() : "",
				},
				json: data,
			});
			if (!response.ok) {
				throw new Error("Failed to edit report.");
			}
			toast.success("Successfully edit a new report.");
			return await response.json();
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: ["reports"],
			});
			queryClient.invalidateQueries({
				queryKey: ["reports", reportId],
			});
		},
	});
};
