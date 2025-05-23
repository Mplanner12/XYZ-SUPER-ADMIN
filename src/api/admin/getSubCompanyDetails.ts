import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/http";
import { Endpoints } from "../utils/endpoints";

// This interface should match the detailed structure of a sub-company
export interface SubCompanyDetails {
  id: string;
  name: string; // Or company_name
  description?: string;
  // Add other relevant fields for a sub-company/workspace
  // e.g., address, contact_email, specific_settings, etc.
  createdAt: string;
  updatedAt: string;
}

const fetchSubCompanyDetails = async (
  subCompanyId: string | null
): Promise<SubCompanyDetails> => {
  if (!subCompanyId) {
    throw new Error("Sub-company ID is required to fetch details.");
  }
  const response = await axiosInstance.get(
    Endpoints.GET_COMPANY_DETAILS(subCompanyId)
  );
  return response.data.data || response.data;
};

export const useGetSubCompanyDetails = (
  subCompanyId: string | null,
  options?: { enabled?: boolean }
) => {
  return useQuery<SubCompanyDetails, Error>({
    queryKey: ["subCompanyDetails", subCompanyId],
    queryFn: () => fetchSubCompanyDetails(subCompanyId),
    enabled: !!subCompanyId && (options?.enabled ?? true),
    staleTime: 5 * 60 * 1000,
  });
};
