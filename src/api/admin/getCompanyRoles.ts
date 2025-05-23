import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/http";
import { Endpoints } from "../utils/endpoints";

export interface Role {
  id: string;
  name: string;
  // Add other role properties if any
}

const fetchCompanyRoles = async (companyId: string | null): Promise<Role[]> => {
  if (!companyId) {
    return [];
  }
  const response = await axiosInstance.get(Endpoints.GET_ROLES(companyId));
  return response.data?.data || response.data || [];
};

export const useGetCompanyRoles = (companyId: string | null) => {
  return useQuery<Role[], Error>({
    queryKey: ["companyRoles", companyId],
    queryFn: () => fetchCompanyRoles(companyId),
    enabled: !!companyId,
  });
};
