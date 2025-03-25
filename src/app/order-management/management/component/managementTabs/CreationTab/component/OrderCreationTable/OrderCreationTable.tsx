import React, { useState, useEffect, useRef } from 'react';
import { useReactTable, flexRender, getCoreRowModel, ColumnDef, SortingState, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { ArrowUpWideNarrow, ListFilter, X, MoreVertical, ArrowUpDown, ArrowUpNarrowWide, Search } from 'lucide-react';

export type TableRow = {
  [key: string]: any;
};

export interface Column<T> {
  header: string;
  accessor: keyof T | string;
  Cell?: (value: unknown, row: T) => React.ReactNode;
  enableSorting?: boolean;
}

interface OrderCreationTableProps<T> {
  initialData: T[];
  columns: ColumnDef<T, any>[];
  title?: string;
}

const OrderCreationTable = <T extends TableRow>({ initialData, columns, title }: OrderCreationTableProps<T>) => {
  const [data, setData] = useState<T[]>(initialData);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLTableDataCellElement>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

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

  const handleDeleteRow = (rowId: string) => {
    setData((prevData) => prevData.filter((_, index) => index.toString() !== rowId));
    setShowDropdown(null);
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  const getSortIcon = (column: any) => {
    if (!column.getCanSort()) {
      return null;
    }
    if (!column.getIsSorted()) {
      return <ArrowUpDown className="w-4 h-4 ml-2" />;
    }
    return column.getIsSorted() === 'asc' ? (
      <ArrowUpNarrowWide className="w-4 h-4 ml-2" />
    ) : (
      <ArrowUpWideNarrow className="w-4 h-4 ml-2" />
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="justify-between items-center flex pb-5">
        <p className="font-medium tracking-wider text-[#434343] text-xl">{title}</p>
        <div className="relative">
          <input
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search Customer Name..."
            className="pl-10 pr-5 py-3 border border-[#CFCECE] rounded-md outline-none "
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      <div className={`mb-4 flex justify-between items-center ${selectedRows.length > 0 ? "visible" : "invisible"}`}>
        <div className="flex gap-3 items-center">
          <X
            onClick={() => setSelectedRows([])}
            className="text-primary-normal" />
          <p className="font-medium text-lg">{selectedRows.length} Items Selected</p>
        </div>
        <p className="font-medium tracking-wide text-primary-normal text-base cursor-pointer">Send Selection For Approval</p>
      </div>

      <div className={cn("flex-1 shadow-md rounded-sm border-[#EAECF0]", "[@media(max-width:960px)]:overflow-x-auto")}>
        {table.getRowModel().rows.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No results found.
          </div>
        ) : (
          <table
            style={{ borderSpacing: 0 }}
            className={cn("min-w-full bg-white text-sm", "[@media(max-width:960px)]:min-w-[145%]")}
          >
            <thead className="bg-foundation-grey-grey-300/25 text-foundation-grey-grey-800 whitespace-nowrap text-sm">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  <th className="py-4 px-4 font-normal border-b border-[#EAECF0] text-left">
                    <input
                      className="w-4 h-4 accent-primary-normal"
                      type="checkbox"
                      checked={selectedRows.length === data.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={cn(
                        "py-4 px-4 font-normal border-b border-[#EAECF0] text-left",
                        header.column.getCanSort() ? "cursor-pointer" : ""
                      )}
                      onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                    >
                      <div className="flex items-center gap-2">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && getSortIcon(header.column)}
                      </div>
                    </th>
                  ))}
                  <th className="py-4 px-4 font-normal border-b border-[#EAECF0]">Action</th>
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b border-solid border-[#EAECF0]">
                  <td className="py-4 px-4">
                    <input
                      className="w-4 h-4 accent-primary-normal"
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                    />
                  </td>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-4 px-4 text-foundation-grey-grey-700">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                  <td className="py-4 px-4 text-foundation-grey-grey-700 relative" ref={dropdownRef}>
                    <MoreVertical
                      className="cursor-pointer"
                      onClick={() => setShowDropdown(showDropdown === row.id ? null : row.id)}
                    />
                    {showDropdown === row.id && (
                      <div className="absolute right-0 bottom-full mb-2 w-48 bg-white  shadow-md rounded-md z-50"
                        ref={dropdownRef}
                      >
                        <button
                          onClick={() => console.log(`Send row ${row.id} for approval`)}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Send for Approval
                        </button>
                        <button
                          onClick={() => console.log(`Send row ${row.id} for approval`)}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Create a Return Order
                        </button>
                        <button
                          onClick={() => handleDeleteRow(row.id)}
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
        )}
      </div>
    </div>
  );
};

export default OrderCreationTable;