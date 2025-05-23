import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/http";
import { Endpoints } from "../utils/endpoints";

// Define the expected User structure from your API
export interface CompanyUser {
  id: string;
  name: string;
  email: string;
  role: string; // Or roleId, adjust as per your API
  role_id?: string; // if role name is separate
  lastLogin?: string; // Optional
  // Add other relevant user fields
}

const fetchCompanyUsers = async (
  companyId: string | null
): Promise<CompanyUser[]> => {
  if (!companyId) {
    return [];
  }
  // Assuming you have an endpoint like GET_USERS_FOR_COMPANY(companyId)
  // If not, adjust Endpoints.GET_USERS or create a new one
  const response = await axiosInstance.get(
    `${Endpoints.GET_COMPANIES}/${companyId}/users`
  ); // Placeholder endpoint
  return response.data?.data || response.data || [];
};

export const useGetCompanyUsers = (companyId: string | null) => {
  return useQuery<CompanyUser[], Error>({
    queryKey: ["companyUsers", companyId],
    queryFn: () => fetchCompanyUsers(companyId),
    enabled: !!companyId,
  });
};
