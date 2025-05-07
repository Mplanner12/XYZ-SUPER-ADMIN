import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/http";
import { Endpoints } from "../utils/endpoints";

interface ForgetPasswordPayload {
  email: string;
}

interface ForgetPasswordResponse {
  message: string;
}

export const useForgetPassword = () => {
  return useMutation<ForgetPasswordResponse, Error, ForgetPasswordPayload>({
    mutationFn: async (data: ForgetPasswordPayload) => {
      const response = await axiosInstance.post(
        Endpoints.FORGET_PASSWORD,
        data
      );
      return response.data;
    },
  });
};
