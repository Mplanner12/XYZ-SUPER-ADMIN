import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/http";
import { Endpoints } from "../utils/endpoints";

export interface SubCompanyListItem {
  id: string;
  name: string; // Or company_name, adjust to your API response
  // logo_url?: string; // Optional: if you have logos for sub-companies
}

const fetchSubCompaniesForBusiness = async (
  businessId: string | null
): Promise<SubCompanyListItem[]> => {
  if (!businessId) {
    return []; // Or throw an error if a businessId is strictly required
  }
  const response = await axiosInstance.get(
    Endpoints.GET_SUB_COMPANIES_FOR_BUSINESS(businessId)
  );
  // Adjust if your API nests the array differently, e.g., response.data.data
  return response.data.data || response.data || [];
};

export const useGetSubCompanies = (
  businessId: string | null,
  options?: { enabled?: boolean }
) => {
  return useQuery<SubCompanyListItem[], Error>({
    queryKey: ["subCompaniesList", businessId], // Query key includes the parent businessId
    queryFn: () => fetchSubCompaniesForBusiness(businessId),
    enabled: !!businessId && (options?.enabled ?? true), // Only enable if businessId is present
    staleTime: 10 * 60 * 1000,
  });
};
