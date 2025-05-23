import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/http";
import { Endpoints } from "../utils/endpoints";

// Interface based on the provided API response
export interface SubModuleDetail {
  id: string;
  module_id: string;
  name: string;
  CreatedAt: string;
  UpdatedAt: string;
  // Add price or other relevant fields if they come from API for payment
}

export interface ModuleDetail {
  id: string;
  name: string;
  sub_modules: SubModuleDetail[];
  CreatedAt: string;
  UpdatedAt: string;
  // Add price or other relevant fields if they come from API for payment
}

const fetchAllModules = async (): Promise<ModuleDetail[]> => {
  const response = await axiosInstance.get(Endpoints.GET_ALL_MODULES);
  return response.data?.data || response.data || [];
};

export const useGetAllModules = () => {
  return useQuery<ModuleDetail[], Error>({
    queryKey: ["allModules"],
    queryFn: fetchAllModules,
  });
};
