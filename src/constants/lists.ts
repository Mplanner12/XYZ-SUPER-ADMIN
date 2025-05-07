export const ListNames = {
  salesLocations: 'Sales Location',
  businessLocations: 'Business Locations',
  warehouseLocations: 'Warehouse Locations',
  productionLocations: 'Production Locations',
  currency: 'Currency ',
  employee: 'Employee',
  supplier: 'Supplier',
  cashAndBank: 'Cash and Bank',
  customer:'Customer',
  paymentMethod: 'Payment Method List',
  expenses: 'Expenses',
  tax: 'Tax',
  discount: 'Discount',
  inventories: 'Inventories',
  fixedAssets: 'Fixed Assets',
} as const;

// If you want to use as types as well
export type ListNameKeys = keyof typeof ListNames;