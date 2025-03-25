import ReportAnalyticsTable from '@/components/OrderManagementComponent/Table/ReportAnalyticsTable/ReportAnalyticsTable';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react'

interface approvalData {
    id: string,
    productName: string,
    productCategory: string,
    stockQuantity: string,
    paymentStatus: string,
    totalAmountUsd: string,
    date: string
  }
  const TableData: approvalData[] = [
    {
      id: '5567',
      productName: 'Bag of rice',
      productCategory: 'Groceries',
      stockQuantity: "10",
      paymentStatus: "Paid",
      totalAmountUsd: '100',
      date: '06-23-2022'
    },
  ];

const TrendsReports:React.FC = () => {
    const columns: ColumnDef<approvalData, any>[] = [
        { header: 'ID', accessorKey: 'id' },
        { header: 'Product Name', accessorKey: 'productName' },
        { header: 'Product Category', accessorKey: 'productCategory' },
        { header: 'Stock Quantity', accessorKey: 'stockQuantity' },
        { header: 'Payment Status', accessorKey: 'paymentStatus' },
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

export default TrendsReports