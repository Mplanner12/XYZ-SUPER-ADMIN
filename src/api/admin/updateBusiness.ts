import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../utils/http";
import { Endpoints } from "../utils/endpoints";
import { BusinessDetails } from "./getBusiness"; // Assuming this is the full business details type

// Payload for updating business. All fields are optional as user might update only some.
// However, the form will likely submit all, so validation should ensure required ones are present.
export interface UpdateBusinessPayload {
  company_name?: string;
  business_description?: string;
  website?: string;
  email_address?: string;
  phone_number?: string;
  alternative_phone?: string;
  fax_number?: string;
  address?: string;
  country?: string;
  language?: string;
  facebook_handle?: string;
  instagram_handle?: string;
}

interface UpdateBusinessResponse {
  message: string;
  data: BusinessDetails; // Assuming backend returns the updated business details
}

export const useUpdateBusiness = (businessId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation<UpdateBusinessResponse, Error, UpdateBusinessPayload>({
    mutationFn: async (data: UpdateBusinessPayload) => {
      const response = await axiosInstance.put(
        Endpoints.UPDATE_BUSINESS(businessId),
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate and refetch the main business query to get fresh data
      queryClient.invalidateQueries({ queryKey: ["business"] });
      // Optionally, you can update the cache directly with data.data if needed
      // queryClient.setQueryData(['business'], data.data);
    },
  });
};
