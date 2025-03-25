import { privateApi, publicApi } from "@/api/axios";


// INVENTORY Management API CALL - Mutate Function(post, put, patch and delet)
export const chartOfAccount = async (data:any) => {
  const res = await privateApi.post(`inventory_management/chart_of_account`, data);
  return res.data;
};




// INVENTORY Management API CALL - Queries *******************************************************************************
// Inventory Adjustments
export const getAdjustments = async () => {
  const res = await privateApi.get(`/inventory/adjustments`);
  return res.data.data;
};

export const getInventories = async () => {
  const response = await privateApi.get(`/inventory/products`);
  return response.data;
};





