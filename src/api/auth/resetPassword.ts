import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/http";
import { Endpoints } from "../utils/endpoints";

interface ResetPasswordPayload {
  email: string;
  token: string;
  new_password: string;
}

interface ResetPasswordResponse {
  message: string;
}

export const useResetPassword = () => {
  return useMutation<ResetPasswordResponse, Error, ResetPasswordPayload>({
    mutationFn: async (data: ResetPasswordPayload) => {
      const response = await axiosInstance.post(Endpoints.RESET_PASSWORD, data);
      return response.data;
    },
  });
};
