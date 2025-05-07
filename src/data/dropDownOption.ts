export const location = [{ listItem: "Abuja" }, { listItem: "Lagos" }];

export const taxType = [
  { listItem: "Tax Payable" },
  { listItem: "Tax Receivable" },
  { listItem: "Capital Gain Tax" },
];

export const dataType = [
  { listItem: "Text/Number" },
  { listItem: "Text" },
  { listItem: "Text/DropDown" },
  { listItem: "Number/Currency" },
  { listItem: "Percentage" },
];

export const timePeriods = [
  { listItem: "Last 7 Days" },
  { listItem: "Last 30 Days" },
  { listItem: "Last Quarter" },
  { listItem: "Year-to-Date" },
  { listItem: "Last Year" },
];

export const dateDropDownOption = [
  { listItem: "Today" },
  { listItem: "This Week" },
  { listItem: "This Week-to-Date" },
  { listItem: "This Month" },
  { listItem: "This Month-to-Date" },
  { listItem: "This Fiscal Quarter" },
  { listItem: "This Fiscal Quarter-to-Date" },
  { listItem: "This Fiscal Year-to-Last Month" },
  { listItem: "This Fiscal Year-to-Date" },
  { listItem: "Yesterday" },
  { listItem: "Last Week" },
  { listItem: "Last Week-to-Date" },
  { listItem: "Last Month" },
  { listItem: "Last Month-to-Date" },
  { listItem: "Last Fiscal Quarter" },
  { listItem: "Last Fiscal Quarter-to-Date" },
  { listItem: "This Fiscal Year-to-Date" },
  { listItem: "This Fiscal Year" },
];

export const parentAccountType = [
  { listItem: "Asset" },
  { listItem: "Liability" },
  { listItem: "Equity" },
  { listItem: "Revenue" },
  { listItem: "Expense" },
];

export const accountType = [
  { listItem: "AssetAccounts Payable " },
  { listItem: "Accounts Receivableity" },
  { listItem: "Assets" },
  { listItem: "Common stock" },
  { listItem: "Cost of Goods Sold" },
  { listItem: "Current Asset" },
  { listItem: "Equity" },
  { listItem: "Expenses" },
  { listItem: "Gains" },
  { listItem: "General & Administrative Exenses" },
  { listItem: "Income Tax Expense" },
  { listItem: "Intangible Assets" },
  { listItem: "Inventory" },
  { listItem: "Liabilities" },
  { listItem: "Long-term Debt" },
  { listItem: "Losses" },
  { listItem: "Memorandum Accounts" },
  { listItem: "Other Comprehensive Income" },
  { listItem: "Other Operating Expenses" },
  { listItem: "Other Revenues" },
  { listItem: "Prepaid Expenses" },
  { listItem: "Selling Expenses" },
];

export const tableData = [
  {
    category: "Assets",
    subcategories: [
      {
        title: "1.1 Current Assets",
        accounts: [
          { title: "10000 Cash & Cash Equivalents" },
          { title: "10010 Petty Cash" },
          { title: "10020 Bank Accounts" },
          { title: "10030 Marketable Accounts" },
          { title: "10100 Accounts Receivable" },
          { title: "10110 Accounts Receivable - Trade" },
          { title: "10120 Allowance for Doubtful Accounts" },
        ],
      },
      {
        title: "1.2 Non-Current Assets",
        accounts: [
          { title: "11000 Property, Plant & Equipment" },
          { title: "11010 Land" },
          { title: "11020 Buildings" },
          { title: "11030 Machinery" },
          { title: "11040 Accumulated Depreciation" },
          { title: "11100 Intangible Assets" },
          { title: "11110 Goodwill" },
          { title: "11120 Patents" },
          { title: "11130 Trademarks" },
          { title: "11200 Long-Term Investments" },
          { title: "11210 Investments in Subsidiaries" },
          { title: "11220 Investments in Associates" },
        ],
      },
    ],
  },
  {
    category: "Liabilities",
    subcategories: [
      {
        title: "2.1 Current Liabilities",
        accounts: [
          { title: "20000 Accounts Payable" },
          { title: "20010 Trade Payables" },
          { title: "20020 Accrued Expenses" },
          { title: "20100 Short-term Loans" },
          { title: "20110 Bank Overdraft" },
          { title: "20120 Current Portion of Long-term Debt" },
          { title: "20200 Other Current Liabilities" },
        ],
      },
      {
        title: "2.2 Non-Current Liabilities",
        accounts: [
          { title: "21000 Long-term Debt" },
          { title: "21010 Bank Loans" },
          { title: "21020 Bonds Payable" },
          { title: "21100 Deferred Tax Liabilities" },
          { title: "21200 Other Non-Current Liabilities" },
          { title: "21210 Deferred Revenues" },
          { title: "21220 Lease Obligations" },
        ],
      },
    ],
  },
  {
    category: "Equity",
    subcategories: [
      {
        title: "3.1 Share Capital",
        accounts: [
          { title: "30000 Share Capital" },
          { title: "30010 Common Stock" },
          { title: "30020 Preferred Stock" },
          { title: "30100 Additional Paid-in Capital" },
        ],
      },
      {
        title: "3.2 Retained Earnings",
        accounts: [
          { title: "30200 Retained Earnings" },
          { title: "30300 Treasury Stock" },
          { title: "30400 Other Comprehensive Income Revenue" },
        ],
      },
    ],
  },
  {
    category: "Revenue",
    subcategories: [
      {
        title: "4.1 Sales Revenue",
        accounts: [
          { title: "40000 Sales Revenue" },
          { title: "40010 Product Sales" },
          { title: "40020 Service Sales" },
        ],
      },
      {
        title: "4.2 Other Operating Revenue",
        accounts: [
          { title: "40100 Other Operating Revenue" },
          { title: "40110 Rental Income" },
          { title: "40120 Interest Income" },
        ],
      },
    ],
  },
  {
    category: "Expenses",
    subcategories: [
      {
        title: "5.1 Cost of Goods Sold",
        accounts: [
          { title: "50000 Cost Of Goods Sold" },
          { title: "50010 Direct Materials" },
          { title: "50020 Direct Labour" },
          { title: "50030 Manufacturing Overhead" },
        ],
      },
      {
        title: "5.2 Operating Expenses",
        accounts: [
          { title: "51000 Selling Expenses" },
          { title: "51010 Sales Commissions" },
          { title: "51020 Advertising Expenses" },
          { title: "52000 General & Administrative Expenses" },
          { title: "52010 Salaries & Wages" },
          { title: "52020 Office Supplies" },
          { title: "52030 Depreciation Expense" },
          { title: "53000 Research & Development Expense" },
          { title: "54000 Other Operating Expenses" },
          { title: "54010 Utilities" },
          { title: "54020 Rent Expense" },
        ],
      },
      {
        title: "5.3 Non-Operating Expenses",
        accounts: [
          { title: "55000 Interest Expense" },
          { title: "55100 Loss on Sale of Assets" },
          { title: "55200 Other Non-Operating Expenses" },
        ],
      },
    ],
  },
  {
    category: "Gains & Losses",
    subcategories: [
      {
        title: "6.1 Gains",
        accounts: [
          { title: "60000 Gains" },
          { title: "60010 Gain on Sale of Assets" },
          { title: "60020 Other Gains" },
        ],
      },
      {
        title: "6.2 Losses",
        accounts: [
          { title: "60100 Losses" },
          { title: "60110 Loss on Impairment" },
          { title: "60120 Other Losses" },
        ],
      },
    ],
  },
  {
    category: "Income Taxes",
    subcategories: [
      {
        title: "7.1 Income Tax Expense",
        accounts: [
          { title: "70000 Income Tax Expense" },
          { title: "70010 Current Tax Expense" },
          { title: "70020 Deferred Tax Expense" },
        ],
      },
    ],
  },
  {
    category: "Other Revenue & Expenses",
    subcategories: [
      {
        title: "8.1 Other Revenues",
        accounts: [
          { title: "80000 Other Revenues" },
          { title: "80010 Dividend Income" },
          { title: "80020 Rental Income" },
          { title: "80030 Royalty Income" },
        ],
      },
      {
        title: "8.2 Other Expenses",
        accounts: [
          { title: "80100 Other Expenses" },
          { title: "80110 Donations" },
          { title: "80120 Fines & Penalties" },
          { title: "80130 Foreign Exchange Losses" },
        ],
      },
    ],
  },
  {
    category: "Comprehensive Income",
    subcategories: [
      {
        title: "9.1 Other Comprehensive Income",
        accounts: [
          { title: "90000 Other Comprehensive Income" },
          {
            title:
              "90010 Unrealized Gains/Losses on Available-for-sale Securities",
          },
          { title: "90020 Foreign Currency Translation Income" },
          { title: "90030 Pension Liability Adjustments" },
        ],
      },
    ],
  },
  {
    category: "Memorandum Accounts",
    subcategories: [
      {
        title: "10.1 Memorandum Accounts",
        accounts: [
          { title: "91000 Memorandum Accounts" },
          { title: "91010 Contingent Liabilities" },
          { title: "91020 Commitments" },
        ],
      },
    ],
  },
];

export const costTypeOption = [
  {
    title: "Direct Cost",
    options: [{ listItem: "Variable cost" }, { listItem: "Fixed cost" }],
  },
  {
    title: "Indirect Cost",
    options: [{ listItem: "Variable cost" }, { listItem: "Fixed cost" }],
  },
  {
    title: "Common Cost",
    options: [{ listItem: "Variable cost" }, { listItem: "Fixed cost" }],
  },
];

export const commonCostOption = [
  {
    title: "Common Cost",
    options: [
      { listItem: "Percentage" },
      { listItem: "Quantity" },
      { listItem: "Time" },
      { listItem: "Weight" },
      { listItem: "Value" },
    ],
  },
];

export const subAccountOption = [
  {
    title: "Variable cost",
    options: [
      { listItem: "Material" },
      { listItem: "Labour" },
      { listItem: "Machine" },
      { listItem: "Overhead" },
    ],
  },
];

export const reportAnalysisMenu = [
  "Balance Sheet",
  "Income Statement",
  "Cash Flow Statement",
  // "Accounts Receivable Aging",
  // "Accounts Payable Aging",
  "Trial Balance",
  "Profit & Loss by Segment",
  // "Budget Vs Actual",
  // "Departmental Expense Report",
  // "Project Profitability",
  // "Sales by Customer Summary",
  // "Inventory Valuation",
  // "Fixed Assets Register",
  "Equity Statement",
  // "Dividend Reports",
  "Financial Ratios",
  // "Segment Performance",
  // "Contact Revenue & Expenses",
  // "Currency Exchange Gain/Loss",
  // "Consolidated Financial Statements"
];

export const criteriaOptions = [
  {
    label: "Group",
    value: "group",
    children: [
      { label: "Sales", value: "sales" },
      { label: "Marketing", value: "Marketing" },
      { label: "Admin", value: "Admin" },
      { label: "Warehouse", value: "Warehouse" },
    ],
  },
  {
    label: "Location",
    value: "location",
    children: [
      { label: "NYC", value: "NYC" },
      { label: "HQ", value: "HQ" },
      { label: "Baltimore", value: "Baltimore" },
      { label: "Cleveland", value: "Cleveland" },
    ],
  },
  {
    label: "Class",
    value: "class",
    children: [
      { label: "Product Lines", value: "Product Lines" },
      { label: "Modelling", value: "Modelling" },
      { label: "Fabrication", value: "Fabrication" },
      { label: "Ordering", value: "Ordering" },
    ],
  },
  {
    label: "Segment",
    value: "segment",
    children: [
      { label: "Georgraphic", value: "Georgraphic" },
      { label: "Product", value: "Product" },
      { label: "Services", value: "Services" },
    ],
  },
];

export const customerOptions = [
  { value: "John Doe", label: "John Doe" },
  { value: "Jane Smith", label: "Jane Smith" },
];
export const customerTaxCodeOptions = [
  { value: "12345", label: "12345" },
  { value: "1645", label: "1645" },
];
export const frequencyTypeOptions = [
  { value: "monthly", label: "Monthly" },
  { value: "weekly", label: "Weekly" },
];
export const locationOptions = [
  { value: "HQ", label: "HQ" },
  { value: "Location", label: "Ikoyi" },
];
export const paymentOptions = [
  { value: "Cash", label: "Cash" },
  { value: "Check", label: "Check" },
];
export const taxOptions = [
  { value: "Eastshore", label: "Eastshore" },
  { value: "Westshore", label: "Wstshore" },
];
export const dateFilterOptions = [
  { value: "Last 7 Days", label: "Last 7 Days" },
  { value: "Last 30 Days", label: "Last 30 Days" },
  { value: "Last Quater", label: "Last Quater" },
  { value: "Year-to-Date", label: "Year-to-Date" },
  { value: "Last Year", label: "Last Year" },
];

export const bankOptions = [
  { value: "Bank A", label: "Bank A" },
  { value: "Bank B", label: "Bank B" },
  { value: "Bank C", label: "Bank C" },
];
export const investmentOptions = [
  { value: "Bank A", label: "Buy" },
  { value: "Bank B", label: "Sell" },
];
