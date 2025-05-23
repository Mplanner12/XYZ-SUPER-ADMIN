import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { axiosInstance } from "../utils/http";
import { Endpoints } from "../utils/endpoints";

export interface InviteUserPayload {
  name: string;
  email: string;
  role_id: string;
  company_id: string; // Assuming company_id needs to be part of payload or path
}

interface InviteUserResponse {
  message: string;
  data?: any;
}

const inviteUser = async (
  payload: InviteUserPayload
): Promise<InviteUserResponse> => {
  // The endpoint is INVITE_USER. If it needs company_id in path, adjust.
  const response = await axiosInstance.post(Endpoints.INVITE_USER, payload);
  return response.data;
};

export const useInviteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<InviteUserResponse, Error, InviteUserPayload>({
    mutationFn: inviteUser,
    onSuccess: (data, variables) => {
      toast.success(data.message || "User invited successfully!");
      queryClient.invalidateQueries({
        queryKey: ["companyUsers", variables.company_id],
      });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to invite user.");
    },
  });
};
