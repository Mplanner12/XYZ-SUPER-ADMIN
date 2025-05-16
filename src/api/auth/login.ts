import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../utils/http';
import { Endpoints } from '../utils/endpoints';

interface LoginUpPayload {
  email: string;
  password: string;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginUpPayload) => {
      const response = await axiosInstance.post(Endpoints.LOGIN, data);
      return response.data;
    },
  });
};
