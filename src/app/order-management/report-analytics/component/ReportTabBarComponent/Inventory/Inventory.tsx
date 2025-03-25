import ReportAnalyticsTable from '@/components/OrderManagementComponent/Table/ReportAnalyticsTable/ReportAnalyticsTable'
import { ColumnDef } from '@tanstack/react-table';
import React from 'react'


interface approvalData {
    id: string,
    productName: string,
    productCategory: string,
    inventryQuantity: string,
    quantitySold: string,
    quantityAvaliable: string,
    totalAmountUsd: string,
    date: string
  }
  const TableData: approvalData[] = [
    {
      id: '5567',
      productName: 'Bag of rice',
      productCategory: 'Groceries',
      inventryQuantity: "10",
      quantitySold:"34",
      quantityAvaliable:"49",
      totalAmountUsd: '100',
      date: '06-23-2022'
    },
  ];

const Inventory:React.FC = () => {
    const columns: ColumnDef<approvalData, any>[] = [
        { header: 'ID', accessorKey: 'id' },
        { header: 'Product Name', accessorKey: 'productName' },
        { header: 'Product Category', accessorKey: 'productCategory' },
        { header: 'Inventory Quantity', accessorKey: 'inventryQuantity' },
        { header: 'Quantity Sold', accessorKey: 'quantitySold' },
        { header: 'Quantity Avaliable', accessorKey: 'quantityAvaliable' },
        { header: 'Total Amount (USD)', accessorKey: 'totalAmountUsd' },
        { header: 'Date', accessorKey: 'date' }
      ];
  return (
    <div>
        <ReportAnalyticsTable
        title='Inventory Turnover'
        initialData={TableData}
        columns={columns}
      />
    </div>
  )
}

export default Inventory