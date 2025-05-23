import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/http";
import { Endpoints } from "../utils/endpoints";

export interface CompanyDetails {
  id: string;
  name: string;
  description?: string;
  address?: string;
  logo_url?: string;
}

const fetchCompanies = async (
  businessId: string | null
): Promise<CompanyDetails[]> => {
  if (!businessId) {
    return [];
  }

  const response = await axiosInstance.get(Endpoints.GET_COMPANIES, {
    params: { businessId: businessId },
  });
  return response.data?.data || response.data || [];
};

export const useGetCompanies = (
  businessId: string | null,
  options?: { enabled?: boolean }
) => {
  return useQuery<CompanyDetails[], Error>({
    queryKey: ["companies", businessId],
    queryFn: () => fetchCompanies(businessId),
    enabled: !!businessId && (options?.enabled ?? true),
    // staleTime: 5 * 60 * 1000,
  });
};
