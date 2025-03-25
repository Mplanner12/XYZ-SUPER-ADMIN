import React, { useState } from 'react';
import { useReactTable, flexRender, getCoreRowModel, ColumnDef } from '@tanstack/react-table';
import { cn } from '@/lib/utils';

export type TableRow = {
  [key: string]: any;
};

export interface Column<T> {
  header: string;
  accessor: keyof T | string;
  Cell?: (value: unknown, row: T) => React.ReactNode;
}

interface NonEditAbleTableProps<T> {
  initialData: T[];
  columns: ColumnDef<T, any>[];
  title?: string;
}

const NonEditAbleTable = <T extends TableRow>({ initialData, columns }: NonEditAbleTableProps<T>) => {
  const [data, setData] = useState<T[]>(initialData);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allRowIds = data.map((_, index) => index.toString());
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (rowId: string) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows((prev) => prev.filter((id) => id !== rowId));
    } else {
      setSelectedRows((prev) => [...prev, rowId]);
    }
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full overflow-x-auto">
      <div className={cn("flex-1 shadow-md rounded-sm border-[#EAECF0]", "[@media(max-width:960px)]:overflow-x-auto")}>
        <table
          style={{ borderSpacing: 0 }}
          className={cn("min-w-full bg-white text-sm", "[@media(max-width:960px)]:min-w-[145%]")}
        >
          <thead className="bg-foundation-grey-grey-300/25 text-foundation-grey-grey-800 whitespace-nowrap text-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                <th className="py-4 px-4 font-normal border-b border-[#EAECF0] text-left">
                  <input
                  className='w-4 h-4 accent-primary-normal'
                    type="checkbox"
                    checked={selectedRows.length === data.length}
                    onChange={handleSelectAll}
                  />
                </th>
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
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-solid border-[#EAECF0]">
                <td className="py-4 px-4">
                  <input
                  className='w-4 h-4 accent-primary-normal'
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                  />
                </td>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="py-4 px-4 text-foundation-grey-grey-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NonEditAbleTable;
