export interface SalesOutLetPostype {
  outlet_name: string,
  street_address: string,
  region: string,
  state: string,
  country: string,
  postal_code: string,
  preferred_currency: string,
  preferred_language: string
  // taxApplied:string
}


export interface AddNewCustomerPostType {
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  state: string,
  street_address: string,
  country: string,
  postal_code: string,
}


export interface CreateOrderPostType {
  order_type: number,
  products: [
    {
      id: string,
      product: string,
      description: string,
      productCategory: string,
      uoM: string,
      stockQuantity: string,
      unitPrice: string,
      totalPrice: string,
    },
  ],
  customer: string,
  phone: string,
  street_address: string,
  state: string,
  country: string,
  postal_code: string,
  allocate_order: string,
  delivery_date: string,
  // delivery_status: string,
  delivery_vendor: number,
  end_date?: string,
  // order_approval_status: string,
  payment_method_for_repeat_order?: string,
  // payment_status: string,
  repeat_order?: boolean,
  repeat_order_frequency?: string,
  start_date?: string,
  default_inventory?: false,
  customerEmail?: string,
  tax_applied:string
  other_charges:string
}
