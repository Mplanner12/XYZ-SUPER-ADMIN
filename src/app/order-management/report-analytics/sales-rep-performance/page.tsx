'use client'
import ReportAnalyticsTable from '@/components/OrderManagementComponent/Table/ReportAnalyticsTable/ReportAnalyticsTable';
import { ColumnDef } from '@tanstack/react-table';
import Dropdown from '@/components/reusable/DropDown';
import React, { useState } from 'react';
import { reportOptions } from '../page';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/reusable/Button';


interface approvalData {
  id: string,
  repName: string,
  unitOrder: string,
  repetOrder: string,
  totalAmountUsd: string,
  date: string
}
const TableData: approvalData[] = [
  {
    id: '5567',
    repName: 'Samuel Charles',
    unitOrder: '43',
    repetOrder: "3",
    totalAmountUsd: '100',
    date: '06-23-2022'
  },
];

const SalesReport: React.FC = () => {
  const [selectedReport,] = useState<string>('sales-rep-performance');
  const router = useRouter()


  const columns: ColumnDef<approvalData, any>[] = [
    { header: 'ID', accessorKey: 'id' },
    { header: 'Sales Rep. Name', accessorKey: 'repName' },
    { header: 'Total Unit Orders', accessorKey: 'unitOrder' },
    { header: 'Repeat Orders', accessorKey: 'repetOrder' },
    { header: 'Total Amount (USD)', accessorKey: 'totalAmountUsd' },
    { header: 'Date', accessorKey: 'date' }
  ];
 
  const getReportTitle = () => {
    const selectedOption = reportOptions.find(option => option.value === selectedReport);
    return selectedOption ? selectedOption.label : 'Unknown Report';
  };

  return (
    <div>
      <div className='px-6 pt-6 mb-4'>
        <div className='bg-secondary rounded-[16px] py-6 px-3 mt-4'>
          <h2 className='mb-4'>Report & Analytics</h2>
          <Dropdown
            placeholder='Select a Report Type'
            options={reportOptions}
            value={selectedReport}
            onChange={(value) => {
              router.push(`/order-management/report-analytics/${value}`)

            }}
            className="w-[250px] text-base "
            buttonClassName='border-none text-[24px] text-primary-normal !px-0'
          />
          <div className='w-[340px] mt-4'>
            <Button fullWidth>Proceed</Button>
          </div>
        </div>  
      </div>

      {/* Display the appropriate table based on selected report */}
      <div className='px-6'>
      <ReportAnalyticsTable
        title={getReportTitle()} 
        initialData={TableData} 
        columns={columns}
        showExpand={false}
      />
      </div>
    </div>
  );
};

export default SalesReport;
