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
    <main className='h-[100vh] overflow-scroll no-scrollbar'>
      <HeaderLayout
        moduleName="Order Management Module"
        page="Report & Analytics"
        breadcrumbs={breadcrumbs}
        moduleLink='/order-management/overview'
      />
      <div className='px-6 pt-6 mb-4'>
        <div className='bg-secondary rounded-[16px] py-6 px-3 mt-4'>
          <h2 className='mb-4'>Report & Analytics</h2>
          <Dropdown
            placeholder='Select a Report Type'
            options={reportOptions}
            value={selectedValue}
            onChange={(value) => {
              router.push(`/order-management/report-analytics/${value}`)
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
  { label: 'Sales Summary', value: 'sales-summary' },
  { label: 'Inventory Turnover', value: 'inventory-turnover' },
  { label: 'Customer Trends Report', value: 'customer-trends-report' },
  { label: 'Sales Rep Performance', value: 'sales-rep-performance' },
  { label: 'Sales Performance by Locations', value: 'sales-performance-locations' },
];


export default ReportsPage 