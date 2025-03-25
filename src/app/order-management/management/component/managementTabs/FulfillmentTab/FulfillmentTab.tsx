import FreeTable from '@/components/OrderManagementComponent/Table/FreeTable';
import SalesOutletsTable from '@/components/OrderManagementComponent/Table/SalesOutletsTable'
import { ColumnDef } from '@tanstack/react-table';
import React from 'react'


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
        status: 'Unapproved',
        date: '06-23-2022'
    },
    {
        id: '5567',
        customerName: 'Samuel Charles',
        totalAmount: '1,500',
        unitOrder: "0",
        repeatOrder: "4",
        status: 'Unapproved',
        date: '06-23-2022'
    },
    {
        id: '5567',
        customerName: 'Samuel Charles',
        totalAmount: '1,500',
        unitOrder: "0",
        repeatOrder: "4",
        status: 'Unapproved',
        date: '06-23-2022'
    },

];

const FulfillmentTab: React.FC = () => {
    const columns: ColumnDef<approvalData, any>[] = [
        { header: 'ID', accessorKey: 'id' },
        { header: 'Customer Name', accessorKey: 'customerName' },
        { header: 'Total Amount (USD)', accessorKey: 'totalAmount' },
        { header: 'Unit Order', accessorKey: 'unitOrder' },
        { header: 'Repeat Order', accessorKey: 'repeatOrder' },
        { header: 'Status', accessorKey: 'status' },
        { header: 'Date', accessorKey: 'date' }
    ];
    return (
        <div>
            <FreeTable
                showAddMore={false}
                showExpand={false}
                title='Order Fulfillment'
                initialData={TableData}
                columns={columns}
            />
        </div>
    )
}

export default FulfillmentTab