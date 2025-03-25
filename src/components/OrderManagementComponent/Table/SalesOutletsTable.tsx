import React, { useEffect, useRef, useState } from 'react';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
  SortingState,
  getFilteredRowModel,
} from '@tanstack/react-table';
import {
  ArrowUpDown,
  Plus,
  MoreVertical,
  Minimize2,
  Maximize2,
  ArrowUpNarrowWide,
  ArrowUpWideNarrow,
  Search,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import TableSkeleton from '../TableSkeleton/TableSkeleton';
import { useModal } from '@/util/Modals/ModalsContext';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';
import EditSalesOutlet from '@/app/order-management/location/component/EditSalesOutlet/EditSalesOutlet';

export type TableRow = {
  id: string;
  [key: string]: any;
};

export interface Column<T> {
  header: string;
  accessor: keyof T | string;
  Cell?: (value: unknown, row: T) => React.ReactNode;
}

interface SalesOutletsTableProps<T extends TableRow> {
  initialData: T[];
  columns: ColumnDef<T, any>[];
  showAddMore?: boolean;
  showExpand?: boolean;
  title?: string;
  ActionAddLocationClick?: () => void;
  isExpanded: boolean;
  isLoading?: boolean
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const SalesOutletsTable = <T extends TableRow>({
  initialData,
  columns,
  title,
  showAddMore = true,
  showExpand = true,
  ActionAddLocationClick,
  isExpanded,
  setIsExpanded,
  isLoading,
}: SalesOutletsTableProps<T>) => {
  const [data, setData] = useState<T[]>(initialData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const {openModal} = useModal()

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

  useEffect(() => {
    setData(initialData);
  }, [initialData]);


  const handleLogRowData = (rowData: any) => {
    const { id } = rowData;
    openModal(<DeleteConfirmationModal deleteSalesID={id}/>)
  };

  const handleEditSalesOutlet = (rowData: any) => {
    const { id } = rowData;
    openModal(<EditSalesOutlet  rowData={rowData}/>)
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
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const getSortIcon = (column: any) => {
    if (!column.getIsSorted()) {
      return <ArrowUpDown className="w-4 h-4 ml-2" />;
    }
    return column.getIsSorted() === 'asc' ? (
      <ArrowUpNarrowWide className="w-4 h-4 ml-2" />
    ) : (
      <ArrowUpWideNarrow className="w-4 h-4 ml-2" />
    );
  };

  if (isLoading) {
    return (
      <div className="w-full p-2 md:p-4 overflow-x-auto">
        <TableSkeleton columns={columns.length} rows={5} />
      </div>
    );
  }

  return (
    <div className="w-full p-2 md:p-4 overflow-x-auto">
      <div className="justify-between items-center flex pb-5">
        <p className="font-medium tracking-wider text-[#434343] text-xl">{title}</p>
        {showAddMore && (
          <div onClick={ActionAddLocationClick} className="flex items-center gap-2 cursor-pointer">
            <Plus className="text-primary-normal" />
            <p className="font-medium tracking-wide text-primary-normal text-base">
              Add More Locations
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pb-5 ">
        <div className="relative w-[50%]">
          <input
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search a Store Name..."
            className="pl-10 pr-5 py-3 border border-[#CFCECE] rounded-md outline-none "
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        <div className="flex items-center gap-4">
          {showExpand && (
            <div className="flex items-center gap-2 cursor-pointer" onClick={toggleExpand}>
              <p className="font-medium tracking-wide text-primary-normal text-base">
                {isExpanded ? 'Minimize' : 'Expand'}
              </p>
              {isExpanded ? <Minimize2 className="text-primary-normal" /> : <Maximize2 className="text-primary-normal" />}
            </div>
          )}
        </div>
      </div>

      <div className={cn("flex-1 shadow-md rounded-sm border-[#EAECF0]", "[@media(max-width:960px)]:overflow-x-auto")}>
        {table?.getRowModel().rows.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No Data Available.
          </div>
        ) : (
          <table
            style={{ borderSpacing: 0 }}
            className={cn("min-w-full bg-white text-sm", "[@media(max-width:960px)]:min-w-[165%]")}
          >
            <thead className="bg-foundation-grey-grey-300/25 text-foundation-grey-grey-800 whitespace-nowrap text-sm">
              {table?.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="py-4 px-4 font-normal border-b border-[#EAECF0] text-left cursor-pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && getSortIcon(header.column)}
                      </div>
                    </th>
                  ))}
                  <th key="action-header" className="py-4 px-4 font-normal border-b border-[#EAECF0]"
                  style={{ width: '5px' }}
                  >
                    Action
                  </th>
                </tr>
              ))}
            </thead>
            <tbody>
              {table?.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b border-solid border-[#EAECF0]">
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
                      <div
                        ref={dropdownRef}
                        className="absolute right-0 bottom-full mb-2 w-56 bg-white  shadow-md rounded-md z-50">
                        <button
                        onClick={() => handleEditSalesOutlet(row.original)}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleLogRowData(row.original)} 
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



export default SalesOutletsTable;