import { privateApi } from "@/api/axios"
import { ChargeEntry } from "@/app/order-management/management/component/managementTabs/CreationTab/component/order-creation-settings/component/AddCustomChargesModal/AddCustomChargesModal"
import { TaxEntry } from "@/app/order-management/management/component/managementTabs/CreationTab/component/order-creation-settings/component/AddCustomTaskModal/AddCustomTaskModal"
import { DiscountEntry } from "@/app/order-management/management/component/managementTabs/CreationTab/component/order-creation-settings/component/AddProductDiscountModal/AddProductDiscountModal"
import { AddNewCustomerPostType, CreateOrderPostType, SalesOutLetPostype } from "@/components/interface/postInterface"

export const addSalesOutlets = async (formData: SalesOutLetPostype) => {
  const response = await privateApi.post(`/order/v1/sales-outlet`, formData)
  return response.data
}


export const addNewCustomer = async (formData: AddNewCustomerPostType) => {
  const response = await privateApi.post(`/order/v1/customer`, formData)
  return response.data
}

export const addNewOrderCreation = async (formData: CreateOrderPostType) => {
  const response = await privateApi.post(`/order/v1/order`, formData)
  return response.data
}

export const addProductDiscount = async (formData: DiscountEntry) => {
  const response = await privateApi.post(`/order/v1/product-discount`, formData)
  return response.data
}

export const addCustomTax = async (formData:TaxEntry[]) => {
  const response = await privateApi.post(`/order/v1/custom-tax`, formData)
  return response.data
}


export const addCustomeCharges = async (formData:ChargeEntry[]) => {
  const response = await privateApi.post(`/order/v1/custom-charge`, formData)
  return response.data
}




export const settingsApi = async (value:FormData) => {
  const response = await privateApi.post(`/order/v1/settings`, value)
  return response.data
}