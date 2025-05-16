import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { axiosInstance } from "../utils/http";
import { Endpoints } from "../utils/endpoints"; // Assuming Endpoints.CREATE_COMPANY will be "admin/company"

export interface CreateCompanyPayload {
  name: string;
  email: string;
  tax_number: string;
  registration_number: string;
  base_currency: string;
  address: string;
  // If your API requires business_id in the payload, add it here
  // business_id?: string;
}

export interface CreateCompanyResponse {
  message: string;
  data: {
    id: string;
    // Include other fields returned by your API upon company creation
    [key: string]: any;
  };
}

const createCompany = async (
  payload: CreateCompanyPayload
): Promise<CreateCompanyResponse> => {
  // If Endpoints.CREATE_COMPANY is not defined, you can use the path directly:
  // const response = await axiosInstance.post("/admin/company", payload);
  const response = await axiosInstance.post(
    Endpoints.CREATE_COMPANY || "admin/company",
    payload
  );
  return response.data;
};

export const useCreateCompany = (
  options?: UseMutationOptions<
    CreateCompanyResponse,
    Error,
    CreateCompanyPayload
  >
) => {
  return useMutation<CreateCompanyResponse, Error, CreateCompanyPayload>({
    mutationFn: createCompany,
    ...options,
  });
};
