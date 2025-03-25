import React from 'react'
import { ColumnDef } from '@tanstack/react-table';
import PaymentTable from './PaymentTable/PaymentTable';



interface approvalData {
    id: string,
    customerName: string,
    totalAmount: string,
    unitOrder: string,
    repeatOrder: string,
    status: string,
    date: string
}
const TableData: approvalData[] = [
    {
        id: '5567',
        customerName: 'Samuel Charles',
        totalAmount: '1,500',
        unitOrder: "0",
        repeatOrder: "4",
        status: 'paid',
        date: '06-23-2022'
    },
    {
        id: '5567',
        customerName: 'Samuel Charles',
        totalAmount: '1,500',
        unitOrder: "0",
        repeatOrder: "4",
        status: 'paid',
        date: '06-23-2022'
    },
    {
        id: '5567',
        customerName: 'Samuel Charles',
        totalAmount: '1,500',
        unitOrder: "0",
        repeatOrder: "4",
        status: 'paid',
        date: '06-23-2022'
    },
];

const PaymentTab:React.FC = () => {
    const columns: ColumnDef<approvalData, any>[] = [
        { header: 'ID', accessorKey: 'id' },
        { header: 'Customer Name', accessorKey: 'customerName' },
        { header: 'Total Amount (USD)', accessorKey: 'totalAmount' },
        { header: 'Unit Order', accessorKey: 'unitOrder' },
        { header: 'Repeat Order', accessorKey: 'repeatOrder' },
        { header: 'Payment Status', accessorKey: 'status' },
        { header: 'Date', accessorKey: 'date' }
    ];
  return (
    <div>
         <PaymentTable
                title='Payment'
                showAddMore={false}
                showExpand={false}
                initialData={TableData}
                columns={columns}
            />
    </div>
  )
}

export default PaymentTab