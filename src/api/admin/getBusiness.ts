import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/http";
import { Endpoints } from "../utils/endpoints";

export interface BusinessDetails {
  id: string;
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
  CreatedAt: string;
  UpdatedAt: string;
  user_id?: string;
}

const fetchBusiness = async (): Promise<BusinessDetails> => {
  const response = await axiosInstance.get(Endpoints.GET_BUSINESS);

  return response.data.data || response.data;
};

export const useGetBusiness = (options?: { enabled?: boolean }) => {
  return useQuery<BusinessDetails, Error>({
    queryKey: ["business"],
    queryFn: fetchBusiness,
    enabled: options?.enabled ?? true,
    staleTime: 5 * 60 * 1000,
  });
};
