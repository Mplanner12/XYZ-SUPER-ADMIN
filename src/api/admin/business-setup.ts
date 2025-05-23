import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/http";
import { Endpoints } from "../utils/endpoints";

interface CreateBusinessPayload {
  company_name: string;
  business_description: string;
  website: string;
  email_address: string;
  phone_number: string;
  alternative_phone: string;
  fax_number: string;
  address: string;
  country: string;
  language: string;
  facebook_handle: string;
  instagram_handle: string;
}

interface CreateBusinessResponse {
  message: string;
}

export const useCreateBusiness = () => {
  return useMutation<CreateBusinessResponse, Error, CreateBusinessPayload>({
    mutationFn: async (data: CreateBusinessPayload) => {
      const response = await axiosInstance.post(
        Endpoints.CREATE_BUSINESS, // Corrected endpoint name
        data
      );
      if (response.status === 201 || response.status === 200) {
        return response.data;
      } else {
        throw new Error(
          response.data?.message || "Failed to register business"
        );
      }
    },
  });
};
