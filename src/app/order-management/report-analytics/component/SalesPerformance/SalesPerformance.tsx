import ReportAnalyticsTable from '@/components/OrderManagementComponent/Table/ReportAnalyticsTable/ReportAnalyticsTable';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react'

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

const SalesPerformance = () => {
    const columns: ColumnDef<approvalData, any>[] = [
        { header: 'ID', accessorKey: 'id' },
        { header: 'Sales Rep. Name', accessorKey: 'repName' },
        { header: 'Total Unit Orders', accessorKey: 'unitOrder' },
        { header: 'Repeat Orders', accessorKey: 'repetOrder' },
        { header: 'Total Amount (USD)', accessorKey: 'totalAmountUsd' },
        { header: 'Date', accessorKey: 'date' }
      ];
  return (
    <div>
        <ReportAnalyticsTable
        title='Sales Rep Performance'
        initialData={TableData}
        columns={columns}
      />
    </div>
  )
}

export default SalesPerformance