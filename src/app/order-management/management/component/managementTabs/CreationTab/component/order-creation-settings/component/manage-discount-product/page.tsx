"use client"
import { ColumnDef } from '@tanstack/react-table';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import ManageDiscountProductTable from './component/ManageDiscountProductTable';
import { useProductDiscountApi } from '@/services/OrderManagementServices';
import TableSkeleton from '@/components/OrderManagementComponent/TableSkeleton/TableSkeleton';
import { format } from 'date-fns';

// Interface for the API response
interface ProductDiscount {
  id: number;
  name: string;
  applicable_products: number[];
  rate: number;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string | null;
}

// Interface for the table data
interface TableDataType {
  id: string;
  customerName: string;
  productName: string;
  rate: string;
  startDate: string;
  endDate: string;
}

const ManageDiscountProduct = () => {
  const router = useRouter();
  const { data, isLoading } = useProductDiscountApi(1, 10);

  const handleBackClick = () => {
    router.back();
  };

  // const getProductName = (productId: number) => {
  //   const productMap: Record<number, string> = {
  //     1: 'Product A',
  //     2: 'Product B'
  //   };
  //   return productMap[productId] || 'Unknown Product';
  // };

  const transformedData: TableDataType[] = data ? data.map((item: ProductDiscount) => ({
    id: item.id.toString(),
    customerName: item.name,
    // productName: item.applicable_products.map(id => getProductName(id)).join(', '),
    productName: item.applicable_products.join(', '),
    rate: item.rate.toString(),
    startDate: format(new Date(item.start_date), 'MM-dd-yyyy'),
    endDate: format(new Date(item.end_date), 'MM-dd-yyyy')
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
      header: 'Product Name', 
      accessorKey: 'productName' 
    },
    { 
      header: 'Rate', 
      accessorKey: 'rate',
      cell: ({ getValue }) => {
        const value = getValue();
        return `$${parseFloat(value).toFixed(2)}`;
      }
    },
    { 
      header: 'Start Date', 
      accessorKey: 'startDate' 
    },
    { 
      header: 'End Date', 
      accessorKey: 'endDate' 
    }
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
          Manage Discounts On Products
        </p>
      </div>

      <div>
        <ManageDiscountProductTable
          showAddMore={false}
          showExpand={false}
          initialData={transformedData}
          columns={columns}
        />
      </div>
    </main>
  )
}

export default ManageDiscountProduct