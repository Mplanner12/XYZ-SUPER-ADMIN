import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosInstance } from "../utils/http";
import { Endpoints } from "../utils/endpoints";

export interface BusinessDetails {
  id: string;
  company_name: string;
  business_description?: string;
  website?: string;
  email_address: string;
  phone_number: string;
  alternative_phone?: string;
  fax_number?: string;
  address: string;
  country: string;
  language: string;
  facebook_handle?: string;
  instagram_handle?: string;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
}

const fetchBusiness = async (): Promise<BusinessDetails> => {
  const response = await axiosInstance.get(Endpoints.GET_BUSINESS);
  return response.data.data || response.data;
};

export const useGetBusiness = (
  options?: UseQueryOptions<BusinessDetails, Error, BusinessDetails>
) => {
  return useQuery<BusinessDetails, Error, BusinessDetails>({
    queryKey: ["business"],
    queryFn: fetchBusiness,
    retry: (failureCount: number, error: unknown) => {
      if (
        error instanceof AxiosError &&
        error.response?.data &&
        typeof error.response.data.error === "string" &&
        error.response.data.error === "Business details not found"
      ) {
        return false;
      }
      return failureCount < 3;
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};
