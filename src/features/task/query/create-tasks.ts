import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferResponseType, InferRequestType } from "hono";

const $post = client.api.task.$post;
type ResponseType = InferResponseType<typeof $post>;
type RequestType = InferRequestType<typeof $post>["json"];

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await $post({ json: data });
      if (!response.ok) {
        throw new Error("Failed to create task.");
      }
      return await response.json();
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
};
