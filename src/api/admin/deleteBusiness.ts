import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../utils/http";
import { Endpoints } from "../utils/endpoints";

interface DeleteBusinessResponse {
  message: string;
}

export const useDeleteBusiness = (businessId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation<DeleteBusinessResponse, Error>({
    mutationFn: async () => {
      const response = await axiosInstance.delete(
        Endpoints.DELETE_BUSINESS(businessId)
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch the main business query to get fresh data
      queryClient.invalidateQueries({ queryKey: ["business"] });
    },
  });
};
