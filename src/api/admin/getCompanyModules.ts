import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/http";
import { Endpoints } from "../utils/endpoints";

export interface ActionPermissions {
  view: boolean;
  add: boolean;
  edit: boolean;
  delete: boolean;
  print: boolean;
  share: boolean;
}

export interface SubModule {
  id: string; // sub_module_id
  name: string;
  // actions might be predefined or part of this response
}

export interface Module {
  id: string; // module_id
  name: string;
  sub_modules: SubModule[];
}

const fetchCompanyModules = async (
  companyId: string | null
): Promise<Module[]> => {
  if (!companyId) return [];
  const response = await axiosInstance.get(
    Endpoints.GET_COMPANY_MODULES(companyId)
  );
  return response.data?.data || response.data || [];
};

export const useGetCompanyModules = (companyId: string | null) => {
  return useQuery<Module[], Error>({
    queryKey: ["companyModules", companyId],
    queryFn: () => fetchCompanyModules(companyId),
    enabled: !!companyId,
  });
};
