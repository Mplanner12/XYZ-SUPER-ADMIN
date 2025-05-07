import { privateApi } from "@/api/axios"

export const deleteSalesOutletStore = async (_id: string) => {
  const response = await privateApi.delete(`/order/v1/sales-outlet/${_id}`)
  return response.data;
}