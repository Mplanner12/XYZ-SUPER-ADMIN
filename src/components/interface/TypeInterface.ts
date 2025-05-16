export interface Customer {
    customerName: string;
    allocationOrder: string;
    defaultInventoryLocation: boolean;
  }

  export interface OrderData {
    id: string;
    product: string;
    description: string;
    productCategory: string;
    uoM: string;
    stockQuantity: string;
    unitPrice: string;
    totalPrice: string;
}

export interface RegionResponse {
  message: string;
  status: string;
  code: number;
  data: string;
}



export interface InvoiceData {
  invoiceID: string
}


