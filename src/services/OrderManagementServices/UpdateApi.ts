import { privateApi } from "@/api/axios"
import { SalesOutLetPostype } from "@/components/interface/postInterface"
import { DefaultInventory } from "@/components/interface/updateInterface"


export const updateSalesOutlets = async (formData: SalesOutLetPostype, id:string) => {
  const response = await privateApi.patch(`/order/v1/sales-outlet/${id}`, formData)
  return response.data
}

export const updateCustomerDefault_Dnventory = async (id:string) => {
  const response = await privateApi.patch(`/order/v1/customer/${id}`)
  return response.data
}
