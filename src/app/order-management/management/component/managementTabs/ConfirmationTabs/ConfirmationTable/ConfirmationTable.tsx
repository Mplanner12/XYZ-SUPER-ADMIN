import React, { useState } from 'react';
import { useReactTable, flexRender, getCoreRowModel, ColumnDef } from '@tanstack/react-table';
import { ArrowUpWideNarrow, ListFilter, Maximize2, MoreVertical, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useModal } from '@/util/Modals/ModalsContext';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

export type TableRow = {
  [key: string]: any;
};

export interface Column<T> {
  header: string;
  accessor: keyof T | string;
  Cell?: (value: unknown, row: T) => React.ReactNode;
}

interface ConfirmationTableProps<T> {
  initialData: T[];
  columns: ColumnDef<T, any>[];
  showAddMore?: boolean;
  showExpand?: boolean;
  title?:string
  ActionAddLocationClick?: () => void
}


const ConfirmationTable = <T,>({ initialData, columns, title, showAddMore = true, showExpand = true, ActionAddLocationClick}: ConfirmationTableProps<T>) => {
  const [data, setData] = useState<T[]>(initialData);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const {openModal} = useModal()

 const  handleOpenModal = () => {
  openModal(<ConfirmationModal/>)
 }

  return (
    <div className="w-full mt-3 overflow-x-auto">
      <div className='justify-between items-center flex pb-5'>
        <p className='font-medium tracking-wider text-[#434343] text-xl'>{title}</p>
        {showAddMore && (
          <div
          onClick={ActionAddLocationClick}
           className='flex items-center gap-2 cursor-pointer'>
            <Plus className='text-primary-normal'/>
            <p className='font-medium tracking-wide text-primary-normal text-base'>Add More Locations</p>
          </div>
        )}
      </div>

      <div className='flex justify-between items-center pb-5'>
        <div className='flex gap-4'>
          <div className='flex items-center gap-2'>
            <p className='font-medium tracking-wide text-primary-normal text-base'>Filter</p>
            <ListFilter className='text-primary-normal'/>
          </div>
          <div className='flex items-center gap-2'>
            <p className='font-medium tracking-wide text-primary-normal text-base'>Sort</p>
            <ArrowUpWideNarrow className='text-primary-normal'/>
          </div>
        </div>

        {showExpand && (
          <div className='flex items-center gap-2'>
            <p className='font-medium tracking-wide text-primary-normal text-base'>Expand</p>
            <Maximize2 className='text-primary-normal'/>
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
                  className="py-4 px-4 font-normal border-b border-[#EAECF0]"
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
                <td 
                onClick={handleOpenModal}
                className="pl-8">
                  <p className='font-medium cursor-pointer text-base text-primary-normal'>View</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConfirmationTable;


