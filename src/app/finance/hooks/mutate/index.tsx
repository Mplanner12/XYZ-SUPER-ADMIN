import { InvalidateQueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/Store";
import { setUser } from "@/redux/Slices/AuthSlice/authSlice";
import { login } from "@/api";
import { addAudit, addBill, addBillableTimeAndCost, addEnum, addEstimate, addInvestment, addInvestmentTransaction, addInvoice,
   createCreditControl, createTransaction, decodeToken, deleteAudit, deleteBill, deleteBillableTimeAndCost, deleteEnum, deleteEstimate, 
   deleteInvestment, deleteInvestmentTransaction, deleteInvoice, deleteTransaction, updateBill, updateBillableTimeAndCost, updateEstimate, 
   updateInvestment, updateInvestmentTransaction, updateInvoice, updateTransaction } from "../../api";


// Finance
// Mutate Function *******************************************************************************************
// ENUM
export const useAddEnum = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: addEnum,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('/accounting/overview')
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};
export const useDeleteEnum = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: deleteEnum,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('/accounting/overview')
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};

// Billable Time And Cost
export const useAddBillableTimeAndCost = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: addBillableTimeAndCost,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('/accounting/overview')
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};
export const useUpdateBillableTimeAndCost = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: updateBillableTimeAndCost,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('/accounting/overview')
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};
export const useDeleteBillableTimeAndCost = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: deleteBillableTimeAndCost,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('/accounting/overview')
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};
// Audit
export const useAddAudit = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addAudit,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('/accounting/overview')
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};
export const useDeleteAudit = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: deleteAudit,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('/accounting/overview')
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};
// Bills
export const useAddBill= () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addBill,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('/accounting/overview')
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};
export const useUpdateBill = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: updateBill,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('/accounting/overview')
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};
export const useDeleteBill = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: deleteBill,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('/accounting/overview')
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};
// ESTIMATES
export const useAddEstimate = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addEstimate,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('/accounting/overview')
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};
export const useUpdateEstimate = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: updateEstimate,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('/accounting/overview')
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};
export const useDeleteEstimate = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: deleteEstimate,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('/accounting/overview')
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};
// Ivestment
export const useAddInvestment = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addInvestment,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('/accounting/overview')
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};
export const useUpdateIvestment = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: updateInvestment,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('/accounting/overview')
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};
export const useDeleteIvestment = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: deleteInvestment,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('/accounting/overview')
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};
// Investment Transactions
export const useAddIvestmentTransaction = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addInvestmentTransaction,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('/accounting/overview')
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};
export const useUpdateIvestmentTransaction = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: updateInvestmentTransaction,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('/accounting/overview')
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};
export const useDeleteIvestmentTransaction = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: deleteInvestmentTransaction,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('/accounting/overview')
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};
// Invoices
export const useAddInvoice = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addInvoice,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('/accounting/overview')
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};
export const useUpdateInvoice = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: updateInvoice,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('/accounting/overview')
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};
export const useDeleteInvoice = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: deleteInvoice,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('/accounting/overview')
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};
// Transactions
export const useCreateTransaction = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: createTransaction,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('/accounting/overview')
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};
export const useUpdateTransaction = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: updateTransaction,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('/accounting/overview')
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};
export const useDeleteTransaction = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('/accounting/overview')
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};
// CREDIT CONTROL
export const useCreateCreditControl = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: createCreditControl,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('/accounting/overview')
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};
// Decode Token
export const useDecodeToken = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: decodeToken,
    onSuccess: (data) => {
      localStorage.setItem('user_id', data.user_id.toString());
      localStorage.setItem('business_id', data.business_id.toString());
      toast.success(data.message);
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message
      toast.error(resMessage);
    },
  });
};