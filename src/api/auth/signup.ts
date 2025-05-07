import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../utils/http';
import { Endpoints } from '../utils/endpoints';

interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export const useSignUp = () => {
  return useMutation({
    mutationFn: async (data: SignUpPayload) => {
      console.log('[SIGNUP REQUEST PAYLOAD]:', data);

      const response = await axiosInstance.post(Endpoints.REGISTER, data);

      console.log('[SIGNUP RESPONSE]:', response.data);

      return response.data;
    },
  });
};
