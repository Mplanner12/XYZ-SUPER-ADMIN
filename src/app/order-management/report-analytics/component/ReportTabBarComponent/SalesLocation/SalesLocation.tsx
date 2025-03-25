import ReportAnalyticsTable from '@/components/OrderManagementComponent/Table/ReportAnalyticsTable/ReportAnalyticsTable';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react'


interface approvalData {
    id: string,
    outletName: string,
    address: string,
    totalUnitOrder: string,
    totalAmountUsd: string,
    date: string
  }
  const TableData: approvalData[] = [
    {
      id: '5567',
      outletName: 'Mushin Store',
      address: 'Industrial Crescent, 100253, Mushin,Lagos State Nigeria',
      totalUnitOrder: "3",
      totalAmountUsd: '100',
      date: '06-23-2022'
    },
  ];

const SalesLocation:React.FC = () => {
    const columns: ColumnDef<approvalData, any>[] = [
        { header: 'ID', accessorKey: 'id' },
        { header: 'Outlet Name', accessorKey: 'outletName' },
        { header: 'Address', accessorKey: 'address' },
        { header: 'Total Unit Order', accessorKey: 'totalUnitOrder' },
        { header: 'Total Amount (USD)', accessorKey: 'totalAmountUsd' },
        { header: 'Date', accessorKey: 'date' }
      ];
  return (
    <div>
         <ReportAnalyticsTable
        title='Sales Performance by Locations'
        initialData={TableData}
        columns={columns}
        />
    </div>
  )
}

export default SalesLocation