'use client'
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import { Button } from '@/components/reusable/Button';
import Dropdown from '@/components/reusable/DropDown';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const ReportsPage = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const router = useRouter()

  const breadcrumbs = ['Admin Dashboard', 'Finance Module'];
  return (
    <main className='h-[100vh] overflow-scroll'>
      <HeaderLayout
        moduleName="Finance Module"
        moduleLink='/finance/overview'
        page="Report & Analytics"
        pageLink='/finance/reports'
        breadcrumbs={breadcrumbs}
      />
      <div className='px-6 pt-6 mb-4'>
        <div className='bg-secondary rounded-[16px] py-6 px-3 mt-4'>
          <h2 className='mb-4'>Report & Analytics</h2>
          <Dropdown
            placeholder='Select a Report Type'
            options={reportOptions}
            value={selectedValue}
            onChange={(value) => {
              router.push(`/finance/reports/${value}`)
              setSelectedValue(value)
            }}
            className="w-[250px] text-base "
            buttonClassName='border-none text-[24px] text-primary-normal !px-0'
          />
          <div className='w-[340px] mt-4'>
            <Button fullWidth>Proceed</Button>
          </div>
        </div>
        
      </div>
    </main>
  )
}

export const reportOptions = [
  { label: 'Balance Sheet',  value: "balance-sheet"},
  { label: 'Income Statement',  value: "income-statement"},
  { label: 'Cash Flow Statement',  value: "cash-flow-statement"},
  { label: 'Trial Balance',  value: "trial-balance"},
  { label: 'Profit & Loss by Segment',  value: "profit-and-loss"},
  { label: 'Equity Statement',  value: "equity-statement"},
  { label: 'Financial Ratios',  value: "financial-ratios"},
];
// const rest = [
  
//   { label: 'Accounts Receivable Aging',  value: "Accounts Receivable Aging"},
//   { label: 'Accounts Payable Aging',  value: "Accounts Payable Aging"},
//   { label: 'Profit & Loss by Segment',  value: "Profit & Loss by Segment"},
//   { label: 'Budget Vs Actual',  value: "Budget Vs Actual"},
//   { label: 'Departmental Expense Report',  value: "Departmental Expense Report"},
//   { label: 'Project Profitability',  value: "Project Profitability"},
//   { label: 'Sales by Customer Summary',  value: "Sales by Customer Summary"},
//   { label: 'Inventory Valuation',  value: "Inventory Valuation"},
//   { label: 'Fixed Assets Register',  value: "Fixed Assets Register"},

//   { label: 'Dividend Reports',  value: "Dividend Reports"},
//   { label: 'Segment Performance',  value: "Segment Performance"},
//   { label: 'Contact Revenue & Expenses',  value: "Contact Revenue & Expenses"},
//   { label: 'Currency Exchange Gain/Loss',  value: "Currency Exchange Gain/Loss"},
//   { label: 'Consolidated Financial Statements',  value: "Consolidated Financial Statements"},

// ]

export default ReportsPage 