import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { axiosInstance } from "../utils/http";
import { Endpoints } from "../utils/endpoints";
import { ActionPermissions } from "./getCompanyModules"; // Assuming ActionPermissions is defined here

export interface PermissionSetting {
  module_id: string;
  sub_module_id: string;
  actions: ActionPermissions;
}

export interface UpdateRolePermissionsPayload {
  role_id: string;
  permissions: PermissionSetting[];
}

interface UpdateRolePermissionsResponse {
  message: string;
  data?: any;
}

const updateRolePermissions = async (
  payload: UpdateRolePermissionsPayload
): Promise<UpdateRolePermissionsResponse> => {
  // The endpoint is UPDATE_ROLE_PERMISSIONS, which might be a generic /company/update-role
  // The payload itself contains role_id.
  // If the endpoint needs role_id in path, adjust Endpoints.UPDATE_ROLE_PERMISSIONS to be a function.
  const response = await axiosInstance.put(
    Endpoints.UPDATE_ROLE_PERMISSIONS, // Or Endpoints.UPDATE_ROLE_PERMISSIONS(payload.role_id)
    payload
  );
  return response.data;
};

export const useUpdateRolePermissions = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateRolePermissionsResponse,
    Error,
    UpdateRolePermissionsPayload
  >({
    mutationFn: updateRolePermissions,
    onSuccess: (data, variables) => {
      toast.success(data.message || "Permissions updated successfully!");
      // Optionally invalidate role details or permissions queries
      // queryClient.invalidateQueries({ queryKey: ["roleDetails", variables.role_id] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update permissions.");
    },
  });
};
