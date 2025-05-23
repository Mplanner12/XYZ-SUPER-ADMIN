import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { axiosInstance } from "../utils/http";
import { Endpoints } from "../utils/endpoints";

interface DeleteCompanyParams {
  companyId: string;
  businessId: string | null;
}

const deleteCompany = async (
  companyId: string
): Promise<{ message: string }> => {
  const response = await axiosInstance.delete(
    Endpoints.DELETE_COMPANY(companyId)
  );
  return response.data;
};

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: DeleteCompanyParams) =>
      deleteCompany(params.companyId),
    onSuccess: (data, variables) => {
      toast.success(data.message || "Company deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["companies", variables.businessId],
      });
    },
    onError: (error: any) => {
      toast.error(
        error?.message || "Failed to delete company. Please try again."
      );
    },
  });
};
