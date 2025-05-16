import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../utils/http';
import { Endpoints } from '../utils/endpoints';

interface GooglePayload {
  credential: string;
}

export const useGoogleSignUp = () => {
  return useMutation({
    mutationFn: async (data: GooglePayload) => {
      const response = await axiosInstance.post(Endpoints.GOOGLE_CALLBACK, data);
      return response.data;
    },
  });
};
