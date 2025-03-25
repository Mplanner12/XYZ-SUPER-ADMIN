

import { useQuery } from "@tanstack/react-query";
import { getAllBillableTimeAndCost, getAudits, getBill, getBillableTimeAndCost, 
  getBills, getCurrencies, getCustomerCreditLimitInformation, getCustomers, getEnum, getEnums, getEnumTypes, getEstimate, getEstimates, 
  getInvestment, getInvestments, getInvestmentTransaction, getInvestmentTransactions, 
  getInvoice, getInvoices, getTaxes, getTransaction, getTransactons, 
  getUsers} from "../../api";


// ENUMS - list of statues
export const useEnums = () => {
  return useQuery({
    queryKey: ["enums"],
    queryFn: getEnums,
  });
};
export const useEnum = ({type}:{type:string}) => {
  return useQuery({
    queryKey: ["enum", type],
    queryFn: () => getEnum({type}),
  });
};
export const useEnumTypes = () => {
  return useQuery({
    queryKey: ["enumTypes"],
    queryFn: getEnumTypes,
  });
};
// Billable Time And Cost
export const useAllBillableTimeAndCost = () => {
  return useQuery({
    queryKey: ["allBillableTimeAndCost"],
    queryFn: getAllBillableTimeAndCost,
  });
};
export const useBillableTimeAndCost = ({id}:{id:string}) => {
  return useQuery({
    queryKey: ["billableTimeAndCost", id],
    queryFn: ()=>getBillableTimeAndCost({id}),
  });
};
// AUDIT
export const useAudits = ({from_date, to_date, page, size}:{page?:number; from_date?:string; to_date?:string; size?:string;}) => {
  return useQuery({
    queryKey: ["audit", from_date, to_date, page, size],
    queryFn: () => getAudits({from_date, to_date, page, size}),
  });
};
// BILLS
export const useBills = () => {
  return useQuery({
    queryKey: ["bills"],
    queryFn: getBills,
  });
};
export const useBill = ({id}:{id:string}) => {
  return useQuery({
    queryKey: ["bill", id],
    queryFn: () => getBill({id}),
  });
};
// ESTIMATES
export const useEstimates = () => {
  return useQuery({
    queryKey: ["estimates"],
    queryFn: getEstimates,
  });
};
export const useEstimate = ({id}:{id:string}) => {
  return useQuery({
    queryKey: ["estimate", id],
    queryFn: () => getEstimate({id}),
  });
};
// Investments
export const useInvestments = () => {
  return useQuery({
    queryKey: ["Investments"],
    queryFn: getInvestments,
  });
};
export const useInvestment = ({id}:{id:string}) => {
  return useQuery({
    queryKey: ["Investment", id],
    queryFn: () => getInvestment({id}),
  });
};
// Investment Transaction
export const useInvestmentTransactions = () => {
  return useQuery({
    queryKey: ["investmentTransactions"],
    queryFn: getInvestmentTransactions,
  });
};
export const useInvestmentTransaction = ({id}:{id:string}) => {
  return useQuery({
    queryKey: ["investmentTransaction", id],
    queryFn: () => getInvestmentTransaction({id}),
  });
};
// Invoices
export const useInvoices = ({id, overdue_invoices}:{id?:string; overdue_invoices?:boolean }) => {
  return useQuery({
    queryKey: ["invoices", id, overdue_invoices],
    queryFn: () => getInvoices({id, overdue_invoices}),
  });
};
export const useInvoice = ({id}:{id:string}) => {
  return useQuery({
    queryKey: ["invoice", id],
    queryFn: () => getInvoice({id}),
  });
};
// Transactions
export const useTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactons,
  });
};
export const useTransaction = ({id}:{id:string}) => {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: () => getTransaction({id}),
  });
};
// CUSTOMERS
export const useCustomers = ({customer_id, from_date, to_date, page, size}:{customer_id?:string; page?:number; from_date?:string; to_date?:string; size?:string;}) => {
  return useQuery({
    queryKey: ["customers", customer_id, from_date, to_date, page, size],
    queryFn: () => getCustomers({customer_id, from_date, to_date, page, size}),
  });
};
// CREDIT CONTROL
export const useCustomerCreditLimitInformation = ({email}:{email:string}) => {
  return useQuery({
    queryKey: ["customerCreditLimitInformation", email],
    queryFn: () => getCustomerCreditLimitInformation({email}),
  });
};
// TAXES
export const useTaxes = () => {
  return useQuery({
    queryKey: ["taxes"],
    queryFn: getTaxes,
  });
};
// LOCATIONS
export const useCurrencies = () => {
  return useQuery({
    queryKey: ["currencies"],
    queryFn: getCurrencies,
  });
};
// USERS
export const useUsers = ({business_id}:{business_id: string | null}) => {
  return useQuery({
    queryKey: ["users", business_id],
    queryFn: () => getUsers({business_id}),
  });
};