import { privateApi, publicApi } from "@/api/axios";


// ACCOUNTING API CALL - Mutate Function(post, put, patch and delet)
export const addChartOfAccount = async (data:any) => {
  const res = await privateApi.post(`accounting/chart-of-accounts/v2`, data);
  return res.data;
};

export const updateChartOfAccount = async ({ id, data }: { id: string; data: any }): Promise<any> => {
  const res = await privateApi.patch(`accounting/chart-of-accounts/v2/${id}`, data);
  return res.data;
};

export const deleteChartOfAccount= async (id: string) => {
  const response = await privateApi.delete(`/accounting/chart-of-accounts/v2/${id}`)
  return response.data;
}

export const createtList = async (data:any) => {
  const res = await privateApi.post(`/accounting/lists`, data);
  return res.data;
};

export const deleteAccountingList= async (id: string) => {
  const response = await privateApi.delete(`/accounting/lists/${id}`)
  return response.data;
}

export const updateAccountingList= async ( id: any, data: any) => {
  const response = await privateApi.patch(`/accounting/lists/${id}`, data)
  return response.data;
}

export const createtListItem = async (data:any) => {
  const res = await privateApi.post(`/accounting/lists/add-item`, data);
  return res.data;
};

export const createGeneralJournal = async (data:any) => {
  const res = await privateApi.post(`/accounting/journals`, data);
  return res.data;
};

export const deleteGeneralJournal= async (id: string) => {
  const response = await privateApi.delete(`/accounting/journals/${id}`)
  return response.data;
}

export const reverseGeneralJournal= async (id: string| undefined) => {
  const response = await privateApi.post(`/accounting/journals/${id}/reverse`)
  return response.data;
}

export const approveGeneralJournal= async (id: string| undefined) => {
  const response = await privateApi.post(`/accounting/journals/${id}/post`)
  return response.data;
}


// ACCOUNTING API CALL - Queries *******************************************************************************
export const getChartOfAccountById = async ({id}:{id:string}) => {
  const res = await privateApi.get(`accounting/chart-of-accounts/v2/${id}`);
  return res.data;
};

export const getChartOfAccount = async () => {
  const res = await privateApi.get(`accounting/chart-of-accounts/v2`);
  return res.data;
};

export const getDefaultChartOfAccount = async () => {
  const res = await privateApi.get(`accounting/chart-of-accounts/v2?isDefault=true`);
  return res.data;
};

export const getAccountingList = async () => {
  const res = await privateApi.get(`/accounting/lists`);
  return res.data;
};

export const getAccountingListById = async ({id}:{id:string}) => {
  const res = await privateApi.get(`accounting/lists/${id}`);
  return res.data;
};

export const getAccountingListItemById = async ({id}:{id:string | undefined}) => {
  const res = await privateApi.get(`accounting/lists/get-items/${id}`);
  return res.data;
};

export const getParentAccountTypes = async () => {
  const res = await privateApi.get(`accounting/parent-account-types`);
  return res.data;
};

export const getAccountType = async () => {
  const res = await privateApi.get(`accounting/account-types`);
  return res.data;
};

export const getSubAccountType = async () => {
  const res = await privateApi.get(`accounting/sub-accounts`);
  return res.data;
};

export const getChartOfAccountByFilter = async ({account}:{account:string}) => {
  const res = await privateApi.get(`accounting/chart-of-accounts/v2?type=${account}`);
  return res.data;
};

export const getGeneralJournal = async () => {
  const res = await privateApi.get(`accounting/journals?status=Draft`);
  return res.data;
};

export const getApprovedGeneralJournal = async () => {
  const res = await privateApi.get(`accounting/journals?status=Posted`);
  return res.data;
};

export const getGeneralJournalById = async ({id}:{id:string | undefined}) => {
  const res = await privateApi.get(`accounting/journals/${id}`);
  return res.data;
};
