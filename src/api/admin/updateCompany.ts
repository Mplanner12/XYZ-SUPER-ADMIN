import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { axiosInstance } from "../utils/http";
import { Endpoints } from "../utils/endpoints";

export interface UpdateCompanyPayload {
  company_name: string;
  business_description?: string;
  website?: string;
  email_address: string;
  address: string;
  country: string;
  phone_number: string;
  alternative_phone?: string;
  fax_number?: string;
  language: string;
  facebook_handle?: string;
  instagram_handle?: string;
}

interface UpdateCompanyParams {
  companyId: string;
  payload: UpdateCompanyPayload;
  businessId: string | null;
}

const updateCompany = async ({
  companyId,
  payload,
}: Omit<UpdateCompanyParams, "businessId">): Promise<{
  message: string;
  data?: any;
}> => {
  const response = await axiosInstance.put(
    Endpoints.UPDATE_COMPANY(companyId),
    payload
  );
  return response.data;
};

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateCompanyParams) =>
      updateCompany({ companyId: params.companyId, payload: params.payload }),
    onSuccess: (data, variables) => {
      toast.success(data.message || "Company updated successfully!");

      queryClient.invalidateQueries({
        queryKey: ["companies", variables.businessId],
      });
      queryClient.invalidateQueries({
        queryKey: ["company", variables.companyId],
      });
    },
    onError: (error: any) => {
      toast.error(
        error.message || "Failed to update company. Please try again."
      );
    },
  });
};
