import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { axiosInstance } from "../utils/http";
import { Endpoints } from "../utils/endpoints";

export interface CreateRolePayload {
  name: string;
  company_id: string;
}

interface CreateRoleResponse {
  message: string;
  data?: any; // Or a more specific Role type
}

const createRole = async (
  payload: CreateRolePayload
): Promise<CreateRoleResponse> => {
  const response = await axiosInstance.post(Endpoints.CREATE_ROLE, payload);
  return response.data;
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateRoleResponse, Error, CreateRolePayload>({
    mutationFn: createRole,
    onSuccess: (data, variables) => {
      toast.success(data.message || "Role created successfully!");
      queryClient.invalidateQueries({
        queryKey: ["companyRoles", variables.company_id],
      });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create role.");
    },
  });
};
