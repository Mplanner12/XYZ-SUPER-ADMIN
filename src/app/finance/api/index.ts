import { privateApi, publicApi } from "@/api/axios";

// Finance API CALL - Mutate Function(post, put, patch and delet)
// ENUMS
export const addEnum = async (data:any) => {
  const res = await privateApi.post(`finance/v1/enum`, data);
  return res.data;
};
export const deleteEnum = async ({data, id}:{data:any; id:string}) => {
  const res = await privateApi.delete(`finance/v1/enum/${id}`, data);
  return res.data;
};
// Billable Time And Cost
export const addBillableTimeAndCost = async (data:any) => {
  const res = await privateApi.post(`finance/v1/billable-time-and-cost`, data);
  return res.data;
};
export const updateBillableTimeAndCost = async ({data, id}:{data:any; id:string}) => {
  const res = await privateApi.patch(`finance/v1/billable-time-and-cost/${id}`, data);
  return res.data;
};
export const deleteBillableTimeAndCost = async ({data, id}:{data:any; id:string}) => {
  const res = await privateApi.delete(`finance/v1/billable-time-and-cost/${id}`, data);
  return res.data;
};
// Audit
export const addAudit = async (data:any) => {
  const res = await privateApi.post(`finance/v1/audit`, data);
  return res.data;
};
export const deleteAudit = async ({data, id}:{data:any; id:string}) => {
  const res = await privateApi.delete(`finance/v1/audit/${id}`, data);
  return res.data;
};
// Bills
export const addBill = async (data:any) => {
  const res = await privateApi.post(`finance/v1/bill`, data);
  return res.data;
};
export const updateBill = async ({data, id}:{data:any; id:string}) => {
  const res = await privateApi.patch(`finance/v1/bill/${id}`, data);
  return res.data;
};
export const deleteBill = async ({data, id}:{data:any; id:string}) => {
  const res = await privateApi.delete(`finance/v1/bill/${id}`, data);
  return res.data;
};
// Estimates
export const addEstimate = async (data:any) => {
  const res = await privateApi.post(`finance/v1/estimate`, data);
  return res.data;
};
export const updateEstimate = async ({data, id}:{data:any; id:string}) => {
  const res = await privateApi.patch(`finance/v1/estimate/${id}`, data);
  return res.data;
};
export const deleteEstimate = async ({data, id}:{data:any; id:string}) => {
  const res = await privateApi.delete(`finance/v1/estimate/${id}`, data);
  return res.data;
};
// Investments
export const addInvestment = async (data:any) => {
  const res = await privateApi.post(`finance/v1/investment`, data);
  return res.data;
};
export const updateInvestment = async ({data, id}:{data:any; id:string}) => {
  const res = await privateApi.patch(`finance/v1/investment/${id}`, data);
  return res.data;
};
export const deleteInvestment = async ({data, id}:{data:any; id:string}) => {
  const res = await privateApi.delete(`finance/v1/investment/${id}`, data);
  return res.data;
};
// Investment Transactions
export const addInvestmentTransaction = async (data:any) => {
  const res = await privateApi.post(`finance/v1/investment_transaction`, data);
  return res.data;
};
export const updateInvestmentTransaction = async ({data, id}:{data:any; id:string}) => {
  const res = await privateApi.patch(`finance/v1/investment_transaction/${id}`, data);
  return res.data;
};
export const deleteInvestmentTransaction = async ({data, id}:{data:any; id:string}) => {
  const res = await privateApi.delete(`finance/v1/investment_transaction/${id}`, data);
  return res.data;
};
// Invoices
export const addInvoice = async (data:any) => {
  const res = await privateApi.post(`/finance/v1/invoice`, data);
  return res.data;
};
export const updateInvoice = async ({data, id}:{data:any; id:string}) => {
  const res = await privateApi.patch(`finance/v1/invoice/${id}`, data);
  return res.data;
};
export const deleteInvoice = async ({data, id}:{data:any; id:string}) => {
  const res = await privateApi.delete(`finance/v1/invoice/${id}`, data);
  return res.data;
};
// Transactions
export const createTransaction = async (data:any) => {
  const res = await privateApi.post(`finance/v1/transaction`, data);
  return res.data;
};
export const updateTransaction = async ({data, id}:{data:any; id:string}) => {
  const res = await privateApi.patch(`finance/v1/transaction/${id}`, data);
  return res.data;
};
export const deleteTransaction = async ({data, id}:{data:any; id:string}) => {
  const res = await privateApi.delete(`finance/v1/transaction/${id}`, data);
  return res.data;
};
// CUSTOMERS


// CREDIT CONTROL
export const createCreditControl = async (data:any) => {
  const res = await privateApi.post(`finance/v1/credit-control`, data);
  return res.data;
};
// DECODE TOKEN /account_setup/decode-token
export const decodeToken = async (data:any) => {
  const res = await privateApi.post(`/account_setup/decode-token`, data);
  return res.data;
};







// Finance API CALL - Queries *********************************************************************************
// Global Enum - endpoint to get all statues in the system /finance/v1/enum-types
export const getEnums = async () => {
  const res = await privateApi.get(`/finance/v1/enum`);
  return res.data;
};
export const getEnum = async ({type}:{type:string}) => {
  const res = await privateApi.get(`/finance/v1/enum/${type}`);
  return res.data;
};
export const getEnumTypes = async () => {
  const res = await privateApi.get(`/finance/v1/enum-types`);
  return res.data;
};
// Billable Time And Cost
export const getAllBillableTimeAndCost= async () => {
  const res = await privateApi.get(`/finance/v1/billable-time-and-cost`);
  return res.data;
};
export const getBillableTimeAndCost= async ({id}:{id:string}) => {
  const res = await privateApi.get(`/finance/v1/billable-time-and-cost/${id}`);
  return res.data;
};
// AUDIT
export const getAudits = async ({from_date, to_date, page, size,}:{page?:number; from_date?:string; to_date?:string; size?:string;}) => {
  const res = await privateApi.get(`/finance/v1/audit`, {
    params: {
      from_date,
      to_date,
      page,
      size,
    }
  });
  return res.data;
};
// Bills
export const getBills = async () => {
  const res = await privateApi.get(`/finance/v1/bill`);
  return res.data.data;
};
export const getBill = async ({id}:{id:string}) => {
  const res = await privateApi.get(`/finance/v1/bill/${id}`);
  return res.data;
};
// Estimates
export const getEstimates = async () => {
  const res = await privateApi.get(`/finance/v1/estimate`);
  return res.data;
};
export const getEstimate = async ({id}:{id:string}) => {
  const res = await privateApi.get(`/finance/v1/estimate/${id}`);
  return res.data;
};
// Investments
export const getInvestments = async () => {
  const res = await privateApi.get(`/finance/v1/investment`);
  return res.data;
};
export const getInvestment = async ({id}:{id:string}) => {
  const res = await privateApi.get(`/finance/v1/investment/${id}`);
  return res.data;
};
// Investment Transactions
export const getInvestmentTransactions = async () => {
  const res = await privateApi.get(`/finance/v1/investment_transaction`);
  return res.data;
};
export const getInvestmentTransaction = async ({id}:{id:string}) => {
  const res = await privateApi.get(`/finance/v1/investment_transaction/${id}`);
  return res.data;
};
// Invoices
export const getInvoices = async ({id, overdue_invoices}:{id?:string; overdue_invoices?:boolean }) => {
  const res = await privateApi.get(`/finance/v1/invoice`, {
    params: {
      id, 
      overdue_invoices,
    }
  });
  return res.data;
};
export const getInvoice= async ({id}:{id:string}) => {
  const res = await privateApi.get(`/finance/v1/invoice/${id}`);
  return res.data;
};
// TRANSACTIONS
export const getTransactons = async () => {
  const res = await privateApi.get(`/finance/v1/transaction`);
  return res.data;
};
export const getTransaction = async ({id}:{id:string}) => {
  const res = await privateApi.get(`/finance/v1/transaction/${id}`);
  return res.data;
};
// CUSTOMERS
export const getCustomers = async ({customer_id, from_date, to_date, page, size,}:{customer_id?:string; page?:number; from_date?:string; to_date?:string; size?:string;}) => {
  const res = await privateApi.get(`/finance/v1/customer`, {
    params: {
      customer_id,
      from_date,
      to_date,
      page,
      size,
    }
  });
  return res.data;
};
// CREDIT CONTROL 
export const getCustomerCreditLimitInformation = async ({email}:{email:string}) => {
  const res = await privateApi.get(`/finance/v1/customer/${email}/credit-limit`);
  return res.data;
};
// TAXES
export const getTaxes = async () => {
  const res = await privateApi.get(`/finance/v1/tax`);
  return res.data;
};
// Currency
export const getCurrencies = async () => {
  const res = await privateApi.get(`/account_setup/currencies`);
  return res.data;
};
// Users
export const getUsers = async ({business_id}:{business_id: string | null}) => {
  const res = await privateApi.get(`/account_setup/list-users/`, {
    params: {
      business_id,
    }
  });
  return res.data;
};