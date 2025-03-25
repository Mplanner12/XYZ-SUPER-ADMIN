import { useAppDispatch } from "@/redux/Store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { addChartOfAccount, createGeneralJournal, createtList, createtListItem, updateAccountingList, updateChartOfAccount } from "../../api";




// Accounting - Mutate Function   ***************************************************************************
export const useChartOfAccount = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: addChartOfAccount,
    onSuccess: (data) => {
      // toast.success(data.message);
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};

export const useUpdateChartOfAccount = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: updateChartOfAccount,
    onSuccess: (data) => {
      toast.success(data.message);
      router.push('/accounting/accounting-list/')
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};

export const useCreateAccountingList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: createtList,
    onSuccess: (data) => {
      toast.success("List created successfully");
      router.push('/accounting/other-list')
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};

export const useUpdateAccountingList = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string; [key: string]: any }) => updateAccountingList(id, data),
    onSuccess: (data) => {
      toast.success(data.message);
      router.push('/accounting/other-list')
    },
    onError: (error: any) => {
      let resMessage = error.response?.data?.message || "Error occurred";
      toast.error(resMessage);
    },
  });
};

export const useCreateAccountingListItem = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: createtListItem,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};

export const useCreateGeneralJournal = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: createGeneralJournal,
    onSuccess: (data) => {
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};