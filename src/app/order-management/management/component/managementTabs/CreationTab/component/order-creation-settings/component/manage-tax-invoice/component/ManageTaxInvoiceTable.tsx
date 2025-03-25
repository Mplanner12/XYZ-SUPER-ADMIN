import React, { useEffect, useRef, useState } from 'react';
import { useReactTable, flexRender, getCoreRowModel, ColumnDef } from '@tanstack/react-table';
import { Maximize2, MoreVertical, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fetchCustomTax } from '@/services/OrderManagementServices/FetchApi';

export type TableRow = {
  [key: string]: any;
};

export interface Column<T> {
  header: string;
  accessor: keyof T | string;
  Cell?: (value: unknown, row: T) => React.ReactNode;
}

interface ManageTaxInvoiceTableProps<T> {
  initialData: T[];
  columns: ColumnDef<T, any>[];
  showAddMore?: boolean;
  showExpand?: boolean;
  title?: string
  ActionAddLocationClick?: () => void
}


const ManageTaxInvoiceTable = <T,>({ initialData, columns, title, showAddMore = true, showExpand = true, ActionAddLocationClick }: ManageTaxInvoiceTableProps<T>) => {
  const [data, setData] = useState<T[]>(initialData);

  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [fromTime, setFromTime] = useState<string>('');
  const [toTime, setToTime] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchParams, setSearchParams] = useState({
    fromDate: '',
    fromTime: '',
    toDate: '',
    toTime: '',
    status: '',
    location:''
  });
  const { } = fetchCustomTax(
    searchParams.fromDate,
    searchParams.fromTime,
    searchParams.toDate,
    searchParams.toTime,
    searchParams.status,
    searchParams.location,
    pageNumber,
    pageSize
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const dropdownRef = useRef<HTMLTableDataCellElement>(null);
  const [showDropdown, setShowDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div className="w-full mt-3 overflow-x-auto">
      <div className='justify-between items-center flex pb-5'>
        <p className='font-medium tracking-wider text-[#434343] text-xl'>{title}</p>
        {showAddMore && (
          <div
            onClick={ActionAddLocationClick}
            className='flex items-center gap-2 cursor-pointer'>
            <Plus className='text-primary-normal' />
            <p className='font-medium tracking-wide text-primary-normal text-base'>Add More Locations</p>
          </div>
        )}
      </div>

      <div className='flex justify-between items-center pb-5'>
        {/* <div className='flex gap-4'>
          <div className='flex items-center gap-2'>
            <p className='font-medium tracking-wide text-primary-normal text-base'>Filter</p>
            <ListFilter className='text-primary-normal' />
          </div>
          <div className='flex items-center gap-2'>
            <p className='font-medium tracking-wide text-primary-normal text-base'>Sort</p>
            <ArrowUpWideNarrow className='text-primary-normal' />
          </div>
        </div> */}

        {showExpand && (
          <div className='flex items-center gap-2'>
            <p className='font-medium tracking-wide text-primary-normal text-base'>Expand</p>
            <Maximize2 className='text-primary-normal' />
          </div>
        )}
      </div>

      <div className={cn("flex-1 shadow-md rounded-sm border-[#EAECF0]", "[@media(max-width:960px)]:overflow-x-auto")}>
        <table
          style={{ borderSpacing: 0 }}
          className={cn("min-w-full bg-white text-sm", "[@media(max-width:960px)]:min-w-[145%]")}
        >
          <thead className="bg-foundation-grey-grey-300/25 text-foundation-grey-grey-800 whitespace-nowrap text-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-4 px-4 font-normal border-b border-[#EAECF0] text-left"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
                <th
                  key="action-header"
                  className="py-4 px-4 font-normal border-b border-[#EAECF0] text-center"
                  style={{ width: '5px' }}
                >
                  Action
                </th>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-solid border-[#EAECF0]">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="py-4 px-4 text-foundation-grey-grey-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="py-4 px-5 text-foundation-grey-grey-700 relative" ref={dropdownRef}>
                  <MoreVertical
                    className="cursor-pointer"
                    onClick={() => setShowDropdown(showDropdown === row.id ? null : row.id)}
                  />
                  {showDropdown === row.id && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 bottom-full mb-2 w-56 bg-white  shadow-md rounded-md z-50">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        // onClick={() => handleDeleteRow(row.id)}
                        className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTaxInvoiceTable;


