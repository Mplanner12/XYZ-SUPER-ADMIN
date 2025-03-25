import { InvalidateQueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/Store";
import { setUser } from "@/redux/Slices/AuthSlice/authSlice";
import { chartOfAccount } from "../../api";




// INVENTORY Management - Mutate Function   ***************************************************************************
export const useChartOfAccount = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: chartOfAccount,
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.token);
      dispatch(
        setUser({
          userToken: data.data.token,
        })
      );
      localStorage.setItem("token", data.data.token)    
      toast.success(data.message);
      router.push('/accounting/overview')
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};

