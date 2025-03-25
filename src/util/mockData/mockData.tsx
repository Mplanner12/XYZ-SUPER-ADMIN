export const OrderManagementOverViewCard = [
  {
    id: 1,
    icon: "/cash-multiple.png",
    open: "/open-in-new.png",
    content: "Total Revenue",
    amount: "$ 50,000,000"
  },
  {
    id: 2,
    icon: "/cartIcon.png",
    open: "/open-in-new.png",
    content: "Number of Orders",
    amount: "$ 50,000,000"
  },
  {
    id: 3,
    open: "/open-in-new.png",
    icon: "/gift-outline.png",
    content: "Top Selling Product",
    button: "Plastics",
    context2: "10000 units sold"
  }
]

export const customerOptions = [
  { label: 'Customer 1', value: 'customer1' },
  { label: 'Customer 2', value: 'customer2' },
  { label: 'Customer 3', value: 'customer3' },
];

export const allocationOrderOptions = [
  { label: 'Location 1', value: "1" },
  { label: 'Location 2', value: "2" },
  { label: 'Location 3', value: "3" },
];

export const generalYesAndNo = [
  { label: 'yes', value: "true" },
  { label: 'No', value: "false" },
];



export const CreateReturnOrderData = [
  {
    id: "5590",
    product: "indomine",
    description: "A fast food for breakfast",
    productCategory:"Groceries",
    uoM: "KG",
    stockQuantity:"10",
    unitPrice:"2",
    totalPrice:"3"
  },
  {
    id: "5590",
    product: "indomine",
    description: "A fast food for breakfast",
    productCategory:"Groceries",
    uoM: "KG",
    stockQuantity:"10",
    unitPrice:"9",
    totalPrice:"5"
  },
  {
    id: "5590",
    product: "nutella",
    description: "A cereal for breakfast",
    productCategory:"Groceries",
    uoM: "KG",
    stockQuantity:"10",
    unitPrice:"5",
    totalPrice:"3"
  },
  {
    id: "5590",
    product: "indomine",
    description: "A cereal for breakfast",
    productCategory:"Groceries",
    uoM: "KG",
    stockQuantity:"10",
    unitPrice:"5",
    totalPrice:"3"
  },
];


export const TableDataLocation = [
  {
    outlet_name: "Mushin Store",
    street_address: "Industrial ajay, 100253, Mushin Lagos State bank",
    location: "Latitude: 37.7749° N, Longitude: -122.4194° W",
    postal_code: "349454",
    preferred_language: "French",
    preferred_currency: "NGN"
  },
  {
    outlet_name: "Victoria Island Store",
    street_address: "Industrial bank, 100253, Mushin Lagos State germany",
    location: "Latitude: 37.7749° N, Longitude: -122.4194° W",
    postal_code: "115021",
    preferred_language: "German",
    preferred_currency: "GBP"
  },
  {
    outlet_name: "Victoria Island Store",
    street_address: "ojay sent, 100253, Mushin Lagos State uk",
    location: "Latitude: 37.7749° N, Longitude: -122.4194° W",
    postal_code: "112021",
    preferred_language: "Dutch",
    preferred_currency: "USD"
  },
  {
    outlet_name: "Victoria Island Store",
    street_address: "Crescent, 100253, Mushin Lagos State Nigeria",
    location: "Latitude: 37.7749° N, Longitude: -122.4194° W",
    postal_code: "115021",
    preferred_language: "Spanish",
    preferred_currency: "CYN"
  },
];

export const TableData = [
  {
    name: "Mushin Store",
    address: "Industrial Crescent, 100253, Mushin Lagos State Nigeria",
    coordinates: "Latitude: 37.7749° N, Longitude: -122.4194° W",
  },
  {
    name: "Victoria Island Store",
    address: "Industrial Crescent, 100253, Mushin Lagos State Nigeria",
    coordinates: "Latitude: 37.7749° N, Longitude: -122.4194° W",
  },
  {
    name: "Victoria Island Store",
    address: "Industrial Crescent, 100253, Mushin Lagos State Nigeria",
    coordinates: "Latitude: 37.7749° N, Longitude: -122.4194° W",
  },
  {
    name: "Victoria Island Store",
    address: "Industrial Crescent, 100253, Mushin Lagos State Nigeria",
    coordinates: "Latitude: 37.7749° N, Longitude: -122.4194° W",
  },
];

export const AuDit_trialsData = [
  {
    logID: "55443",
    userID: "Pastor Bright",
    action: "User Added a new location",
    time: "12:00PM",
    date: "06-22-2022",
  },
  {
    logID: "53943",
    userID: "Prosper Sadiku",
    action: "User Login attempt",
    time: "11:39AM",
    date: "06-22-2022",
  }
];

export const InventoryOverviewCard = [
  {
    id: 1,
    icon: '/cash-multiple.png',
    open: '/open-in-new.png',
    content: 'Total Stock Value',
    amount: '$ 50,000,000',
  },
  {
    id: 2,
    icon: '/package-icon.png',
    open: '/open-in-new.png',
    content: 'Number of SKUs',
    amount: '$ 50,000,000',
  },
  {
    id: 3,
    icon: '/package-open-icon.png',
    open: '/open-in-new.png',
    content: 'Stock Turnover Rate',
    context2: '50',
  },
];





export const TransactionTypesData = [
  { label: "Sales", value: "sales" },
  { label: "Payment", value: "payment" },
  { label: "Sales Return", value: "sales_return" },
  { label: "Sale Refund", value: "sale_refund" },
  { label: "Bad Debt Write-off", value: "bad_debt_write_off" },
  { label: "Sales Discount", value: "sales_discount" },
  { label: "PrePayment", value: "prepayment" },
  { label: "Unearned Revenue", value: "unearned_revenue" },
  { label: "Accrued Revenue", value: "accrued_revenue" },
  { label: "Deferred Revenue", value: "deferred_revenue" },
  { label: "Credit Memo", value: "credit_memo" },
  { label: "Chargeback", value: "chargeback" },
  { label: "VAT", value: "vat" },
  { label: "Other Charges", value: "other_charges" }
];

export const DebitAccountsData = [
  { label: "Sales", value: "sales" },
  { label: "Cash/Bank", value: "cash_bank" },
  { label: "Return Inward", value: "return_inward" },
  { label: "Sales Inward", value: "sales_inward" },
  { label: "Bad Debt Expense", value: "bad_debt_expense" },
  { label: "Sales Discount", value: "sales_discount" },
  { label: "Receivables", value: "receivables" },
  { label: "Unearned Revenue", value: "unearned_revenue" },
  { label: "Deferred Revenue", value: "deferred_revenue" },
  { label: "VAT Payables", value: "vat_payables" },
  { label: "Other Charges", value: "other_charges" }
];

export const CreditAccountsData = [
  { label: "Receivables", value: "receivables" },
  { label: "Sales", value: "sales" },
  { label: "Cash/Bank", value: "cash_bank" },
  { label: "Unearned Revenue", value: "unearned_revenue" },
  { label: "Revenue", value: "revenue" },
  { label: "Sales Returns", value: "sales_returns" }
];


import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<any, any>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'coordinates',
    header: 'Coordinates',
    cell: (info) => info.getValue(),
  },
];
