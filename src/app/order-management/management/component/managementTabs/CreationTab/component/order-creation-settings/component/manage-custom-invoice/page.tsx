"use client"
import React from 'react'
import { ChevronLeft } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import ManageCustomerInvoiceTable from './component/ManageCustomerInvoiceTable';
import { useRouter } from 'next/navigation';
import { useFetchCustomCharges } from '@/services/OrderManagementServices';
import TableSkeleton from '@/components/OrderManagementComponent/TableSkeleton/TableSkeleton';

interface CustomCharge {
  id: number;
  name: string;
  basis: string;
  amount: number;
  created_at: string;
  updated_at: string | null;
}

interface TableDataType {
  id: string;
  customerName: string;
  RateBasis: string;
  rate: string;
}

const ManageCustomInvoice = () => {
  const router = useRouter();
  const { data, isLoading } = useFetchCustomCharges(1, 10);

  const handleBackClick = () => {
    router.back();
  };

  // Transform the data to match table structure
  const transformedData: TableDataType[] = data ? data.map((charge: CustomCharge) => ({
    id: charge.id.toString(),
    customerName: charge.name,
    RateBasis: charge.basis,
    rate: charge.amount.toString()
  })) : [];

  const columns: ColumnDef<TableDataType, any>[] = [
    { 
      header: 'ID', 
      accessorKey: 'id' 
    },
    { 
      header: 'Customer Name', 
      accessorKey: 'customerName' 
    },
    { 
      header: 'Rate Basis', 
      accessorKey: 'RateBasis' 
    },
    { 
      header: 'Rate', 
      accessorKey: 'rate',
      cell: ({ row }) => {
        const amount = parseFloat(row.original.rate);
        return `$${amount.toFixed(2)}`;
      }
    },
  ];

  if (isLoading) {
    return (
      <div className="w-full p-2 md:p-4 overflow-x-auto">
        <TableSkeleton columns={columns.length} rows={5} />
      </div>
    );
  }



  return (
    <main>
      <div className='gap-4 flex items-center'>
        <ChevronLeft 
          className='text-primary-normal cursor-pointer' 
          onClick={handleBackClick} 
        />
        <p className='font-medium tracking-wider text-[#434343] text-xl'>
          Manage Custom Charges On Invoice
        </p>
      </div>

      <div>
        <ManageCustomerInvoiceTable
          showAddMore={false}
          showExpand={false}
          initialData={transformedData}
          columns={columns}
        />
      </div>
    </main>
  )
}

export default ManageCustomInvoice