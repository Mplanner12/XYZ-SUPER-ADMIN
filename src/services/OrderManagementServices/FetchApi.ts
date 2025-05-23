import { privateApi } from "@/api/axios";

export const fetchSalesOutlet = async () => {
  const response = await privateApi.get("/order/v1/sales-outlet");
  return response.data;
};

export const fetchCustomerName = async () => {
  const response = await privateApi.get("order/v1/customer");
  return response.data;
};

export const fetchAuditLogs = async (
  from_Date?: string | null,
  from_time?: string | null,
  to_date?: string | null,
  to_time?: string | null,
  pageNumber?: number,
  pageSize?: number
) => {
  const params = new URLSearchParams();
  if (from_Date) params.append('from_date', from_Date);
  if (from_time) params.append('from_time', from_time);
  if (to_date) params.append('to_date', to_date);
  if (to_time) params.append('to_time', to_time);
  if (pageNumber !== undefined) params.append('page', String(pageNumber));
  if (pageSize !== undefined) params.append('size', String(pageSize));
  const response = await privateApi.get(`/order/v1/audit?${params.toString()}`);
  return response.data;
};

export const fetchCustomTax = async (pageNumber?:number, pageSize?:number) => {
  const response = await privateApi.get(`/order/v1/custom-tax?page=${pageNumber}&size=${pageSize}`);
  return response.data;
};

export const fetchCustomCharges = async (pageNumber?:number, pageSize?:number) => {
  const response = await privateApi.get(`/order/v1/custom-charge?page=${pageNumber}&size=${pageSize}`);
  return response.data;
};

export const fetchProductDiscount = async (pageNumber?:number, pageSize?:number) => {
  const response = await privateApi.get(`/order/v1/product-discount?page=${pageNumber}&size=${pageSize}`);
  return response.data;
};





// settings Api 
// export const fetchSettingsApi = async () => {
//   const response = await privateApi.get(`/order/v1/settings`);
//   return response.data;
// };
