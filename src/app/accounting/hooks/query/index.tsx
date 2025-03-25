import { useQuery } from "@tanstack/react-query";
import { getChartOfAccountById, getChartOfAccount, getAccountingListItemById, getAccountingList, getAccountingListById, getSubAccountType, getAccountType, getParentAccountTypes, getChartOfAccountByFilter, getDefaultChartOfAccount, getGeneralJournal, getGeneralJournalById, getApprovedGeneralJournal } from "../../api";



// Accounting Query Function ***********************************************************************************
export const useGetChartOfAccountById = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["chartOfAccountById", id],
    queryFn: () => getChartOfAccountById({ id: id }),
  });
};

export const useAccountListById = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["accountListById", id],
    queryFn: () => getChartOfAccountById({ id: id }),
  });
};

export const useGetChartOfAccount = () => {
  return useQuery({
    queryKey: ["chartOfAccount"],
    queryFn: () => getChartOfAccount(),
  });
};

export const useGetDefaultChartOfAccount = () => {
  return useQuery({
    queryKey: ["chartOfAccount"],
    queryFn: getDefaultChartOfAccount,
  });
};

export const useGetAccountingList = () => {
  return useQuery({
    queryKey: ["accountingList"],
    queryFn: () => getAccountingList(),
  });
};

export const useGetAccountingListById = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["accountingList", id],
    queryFn: () => getAccountingListById({ id: id }),
  });
};

export const useGetAccountingListItemById = ({ id }: { id: string | undefined }) => {
  return useQuery({
    queryKey: ["accountingItemList", id],
    queryFn: () => getAccountingListItemById({ id: id }),
    enabled: !!id, 
  });
};

export const useGetParentAccountType = () => {
  return useQuery({
    queryKey: ["parentAccountType"],
    queryFn: () => getParentAccountTypes(),
  });
};

export const useGetAccountType = () => {
  return useQuery({
    queryKey: ["accountType"],
    queryFn: () => getAccountType(),
  });
};

export const useGetSubAccountType = () => {
  return useQuery({
    queryKey: ["subAccount"],
    queryFn: () => getSubAccountType(),
  });
};

export const useChartOfAccountByFilter = ({ account }: { account: string }) => {
  return useQuery({
    queryKey: ["accountingList", account],
    queryFn: () => getChartOfAccountByFilter({ account: account }),
  });
};

export const useGetGeneralJournal = () => {
  return useQuery({
    queryKey: ["journal"],
    queryFn: () => getGeneralJournal(),
  });
};

export const useGetApprovedGeneralJournal = () => {
  return useQuery({
    queryKey: ["journal"],
    queryFn: () => getApprovedGeneralJournal(),
  });
};

export const useGetGeneralJournalById = ({ id }: { id: string | undefined }) => {
  return useQuery({
    queryKey: ["accountingItemList", id],
    queryFn: () => getGeneralJournalById({ id: id }),
    enabled: !!id, 
  });
};