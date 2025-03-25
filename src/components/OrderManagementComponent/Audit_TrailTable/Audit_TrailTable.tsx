import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useReactTable, flexRender, getCoreRowModel, ColumnDef } from '@tanstack/react-table';
import { MoreVertical } from 'lucide-react';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { cn } from '@/lib/utils';
import { useFetchAuditLogs } from '@/services/OrderManagementServices';
import TableSkeleton from '../TableSkeleton/TableSkeleton';
import { debounce } from 'lodash';

export interface AuditLog {
    id: number;
    user_id: string;
    action: string;
    time: string;
    date: string;
}

interface Audit_TrailTableProps {
    title?: string;
}

interface SearchParams {
    fromDate: string | null;
    fromTime: string | null;
    toDate: string | null;
    toTime: string | null;
}

const Audit_TrailTable: React.FC<Audit_TrailTableProps> = ({ title }) => {
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);
    const [fromTime, setFromTime] = useState<string | null>(null);
    const [toTime, setToTime] = useState<string | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchParams, setSearchParams] = useState<SearchParams>({
        fromDate: null,
        fromTime: null,
        toDate: null,
        toTime: null,
    });

    const { data, isLoading, isError, refetch } = useFetchAuditLogs(
        searchParams.fromDate,
        searchParams.fromTime,
        searchParams.toDate,
        searchParams.toTime,
        pageNumber,
        pageSize
    );

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

  const debouncedSetSearchParams = useCallback(
    debounce((newParams) => {
        setSearchParams(newParams);
    }, 3000),
    []
);

useEffect(() => {
    debouncedSetSearchParams({
        fromDate: fromDate ? fromDate.toISOString().split('T')[0] : '',
        fromTime,
        toDate: toDate ? toDate.toISOString().split('T')[0] : '',
        toTime,
    });
}, [fromDate, toDate, fromTime, toTime, debouncedSetSearchParams]);

    const columns: ColumnDef<AuditLog>[] = [
        {
            header: 'ID',
            accessorKey: 'id',
        },
        {
            header: 'User ID',
            accessorKey: 'user_id',
        },
        {
            header: 'Action',
            accessorKey: 'action',
        },
        {
            header: 'Time',
            accessorKey: 'time',
        },
        {
            header: 'Date',
            accessorKey: 'date',
        },
    ];

    const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleFromDateChange = (date: Date | null) => {
        setFromDate(date);
        // debouncedRefetch();
    };
    
    const handleToDateChange = (date: Date | null) => {
        setToDate(date);
        // debouncedRefetch();
    };
    
    const handleFromTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFromTime(e.target.value);
        // debouncedRefetch();
    };
    
    const handleToTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setToTime(e.target.value);
        // debouncedRefetch();
    };
    

    return (
        <div className="w-full p-2 md:p-4">
            <div className='pb-5'>
                <p className='font-medium tracking-wider text-[#434343] text-xl'>{title}</p>
            </div>

            <div className='flex items-center flex-row gap-2 mb-4'>
                <div className='flex [@media(min-width:1020px)]:flex-row flex-col items-end [@media(min-width:1020px)]:items-center gap-2'>
                    <div className='flex items-center gap-2'>
                        <p className='font-medium tracking-wide text-primary-normal text-base'>From</p>
                        <div className='relative'>
                            <DatePicker
                                selected={fromDate}
                                onChange={handleFromDateChange}
                                dateFormat="yyyy-MM-dd"
                                className="rounded-[6px] bg-white w-[10rem] [@media(min-width:1020px)]:w-full border-0 bg-inherit h-[2.9rem] py-1.5 px-2 text-[14px] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 outline-none focus:ring-inset focus:ring-[#8133F1]"
                            />
                            <Image
                                src='/calendar.png'
                                className="absolute right-2 top-[.7rem]"
                                width={18}
                                height={18}
                                alt="icon"
                            />
                        </div>

                        <div className='relative'>
                            <DatePicker
                                selected={toDate}
                                onChange={handleToDateChange}
                                dateFormat="yyyy-MM-dd"
                                className="rounded-[6px] bg-white w-[10rem] [@media(min-width:1020px)]:w-full border-0 bg-inherit h-[2.9rem] py-1.5 px-2 text-[14px] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 outline-none focus:ring-inset focus:ring-[#8133F1]"
                            />
                            <Image
                                src='/calendar.png'
                                className="absolute right-2 top-[.7rem]"
                                width={18}
                                height={18}
                                alt="icon"
                            />
                        </div>                      
                    </div>

                    <div className='flex items-center gap-2'>
                        <p className='font-medium tracking-wide text-primary-normal text-base'>To</p>
                        <input
                            type="time"
                            value={fromTime || ""}
                            onChange={handleFromTimeChange}
                            className="rounded-[6px] bg-white w-[8rem] border-0 bg-inherit h-[2.9rem] py-1.5 px-2 text-[14px] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 outline-none focus:ring-inset focus:ring-[#8133F1]"
                        />
                        <input
                            type="time"
                            value={toTime  || ""}
                            onChange={handleToTimeChange}
                            className="rounded-[6px] bg-white w-[8rem] border-0 bg-inherit h-[2.9rem] py-1.5 px-2 text-[14px] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 outline-none focus:ring-inset focus:ring-[#8133F1]"
                        />
                    </div>
                </div>
            </div>

            {isLoading ? (
                 <div className="w-full p-2 md:p-4 overflow-x-auto">
                 <TableSkeleton columns={columns.length} rows={5} />
               </div>
            ) : isError ? (
                <div className='flex justify-center items-center'>
                    <p>Error fetching data</p>
                </div>
            ) : (
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
                        //   onClick={() => handleLogRowData(row.original)} 
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
            )}
        </div>
    );
};

export default Audit_TrailTable;