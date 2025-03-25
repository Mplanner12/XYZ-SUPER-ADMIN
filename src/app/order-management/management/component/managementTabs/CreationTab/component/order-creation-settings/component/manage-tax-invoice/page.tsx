"use client"
import React from 'react'
import { ChevronLeft } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import ManageTaxInvoiceTable from './component/ManageTaxInvoiceTable';
import { useRouter } from 'next/navigation';
import { useFetchCustomTaxApi } from '@/services/OrderManagementServices';
import TableSkeleton from '@/components/OrderManagementComponent/TableSkeleton/TableSkeleton';

interface CustomTax {
  id: number;
  name: string;
  basis: string;
  location: string;
  amount: number;
  created_at: string;
  updated_at: string | null;
}

interface TableDataType {
  id: string;
  taskName: string;
  RateBasis: string;
  rate: string;
}

const ManageTaskInvoice = () => {
  const router = useRouter();
  const { data, isLoading } = useFetchCustomTaxApi(1, 10);

  const handleBackClick = () => {
    router.back();
  };

  // Transform the data to match table structure
  const transformedData: TableDataType[] = data ? data.map((tax: CustomTax) => ({
    id: tax.id.toString(),
    taskName: tax.name,
    RateBasis: tax.basis,
    rate: tax.amount.toString()
  })) : [];

  const columns: ColumnDef<TableDataType, any>[] = [
    { 
      header: 'ID', 
      accessorKey: 'id' 
    },
    { 
      header: 'Task Name', 
      accessorKey: 'taskName' 
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
          Manage Custom Tax On Invoice
        </p>
      </div>

      <div>
        <ManageTaxInvoiceTable
          showAddMore={false}
          showExpand={false}
          initialData={transformedData}
          columns={columns}
        />
      </div>
    </main>
  )
}

export default ManageTaskInvoice