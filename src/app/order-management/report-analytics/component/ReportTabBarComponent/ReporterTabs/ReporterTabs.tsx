import ReportAnalyticsTable from '@/components/OrderManagementComponent/Table/ReportAnalyticsTable/ReportAnalyticsTable'
import { ColumnDef } from '@tanstack/react-table';
import React from 'react'

interface approvalData {
  id: string,
  customerName: string,
  paymentMethod: string,
  unitOrder: string,
  repeatOrder: string,
  totalAmountUsd: string,
  date: string
}
const TableData: approvalData[] = [
  {
    id: '5567',
    customerName: 'Pastor bright',
    paymentMethod: 'Credit Card',
    unitOrder: "10",
    repeatOrder: "3",
    totalAmountUsd: '100',
    date: '06-23-2022'
  },
];


const ReporterTabs: React.FC = () => {
  const columns: ColumnDef<approvalData, any>[] = [
    { header: 'ID', accessorKey: 'id' },
    { header: 'Customer Name', accessorKey: 'customerName' },
    { header: 'Payment Method', accessorKey: 'paymentMethod' },
    { header: 'Unit Order', accessorKey: 'unitOrder' },
    { header: 'Repeat Order', accessorKey: 'repeatOrder' },
    { header: 'Total Amount (USD)', accessorKey: 'totalAmountUsd' },
    { header: 'Date', accessorKey: 'date' }
  ];
  return (
    <div>
      <ReportAnalyticsTable
        title='Customer Trends Report'
        initialData={TableData}
        columns={columns}
      />
    </div>
  )
}

export default ReporterTabs