import React, { useState } from 'react';
import { useReactTable, flexRender, getCoreRowModel, ColumnDef } from '@tanstack/react-table';
import { Printer, Share2, PaintBucket, ArrowRightFromLine, ArrowUpWideNarrow, ListFilter, Maximize2, MoreVertical, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { TextField } from '@/components/reusable/TextField';
import Dropdown from '@/components/reusable/DropDown';
import { dateFilterOptions } from '@/data/dropDownOption';


export type TableRow = {
    [key: string]: any;
};

export interface Column<T> {
    header: string;
    accessor: keyof T | string;
    Cell?: (value: unknown, row: T) => React.ReactNode;
}

interface ReportAnalyticsTableProps<T> {
    initialData: T[];
    columns: ColumnDef<T, any>[];
    showExpand?: boolean;
    title?: string
}


const ReportAnalyticsTable = <T,>({ initialData, columns, title, showExpand = true }: ReportAnalyticsTableProps<T>) => {
    const [data, setData] = useState<T[]>(initialData);
    const { control } = useForm()
    const [dateFilter, setDateFilter] = useState('')


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="w-full p-2 md:p-4 ">
            <div className='justify-between items-center flex pb-3'>
                <p className='font-medium tracking-wider text-[#434343] text-xl'>{title}</p>
            </div>

            <div className='mb-3 flex items-center gap-4'>
                <div className='flex items-center gap-1'>
                    <p className='font-medium tracking-wide text-primary-normal text-sm'>Download Report</p>
                    <ArrowRightFromLine className='text-primary-normal' />
                </div>

                <div className='flex items-center gap-1'>
                    <p className='font-medium tracking-wide text-primary-normal text-sm'>Print Report</p>
                    <Printer className='text-primary-normal' />
                </div>

                <div className='flex items-center gap-1'>
                    <p className='font-medium tracking-wide text-primary-normal text-sm'>Share Report</p>
                    <Share2 className='text-primary-normal' />
                </div>

                <div className='flex items-center gap-1'>
                    <p className='font-medium tracking-wide text-primary-normal text-sm'>Customise Report</p>
                    <PaintBucket className='text-primary-normal' />
                </div>
            </div>

            <div className='flex justify-between md:flex-row flex-col items-center pb-5'>
                <div className='flex gap-4'>
                    <div className='flex items-center gap-2'>
                        <p className='font-medium tracking-wide text-primary-normal text-base'>Filter</p>
                        <ListFilter className='text-primary-normal' />
                    </div>
                    <div className='flex items-center gap-2'>
                        <p className='font-medium tracking-wide text-primary-normal text-base'>Sort</p>
                        <ArrowUpWideNarrow className='text-primary-normal' />
                    </div>
                </div>

                <div className='flex flex-wrap gap-2 mb-4'>
                    <div className='flex items-center gap-2'>
                        <p className='font-bold'>Date</p>
                        <Dropdown
                            placeholder='Select Location'
                            options={dateFilterOptions}
                            value={dateFilter}
                            onChange={(value) => setDateFilter(value)}
                            className="w-[140px] text-base"
                            buttonClassName='bg-white'
                        />
                    </div>
                    <div className='flex items-center gap-2'>
                        <p className='font-bold'>From</p>
                        <TextField
                            name='dateFrom'
                            type='date'
                            variant='short'
                            control={control}
                        />
                    </div>
                    <div className='flex items-center gap-2'>
                        <p className='font-bold'>To</p>
                        <TextField
                            name='dateTo'
                            type='date'
                            variant='short'
                            control={control}
                        />
                    </div>
                </div>
            </div>




            <div className={cn("flex-1 shadow-md rounded-sm border-[#EAECF0]", "[@media(max-width:1290px)]:overflow-x-auto")}>
                <table
                    style={{ borderSpacing: 0 }}
                    className={cn("min-w-full bg-white text-sm", "[@media(max-width:1290px)]:min-w-[140%]")}
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

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportAnalyticsTable;


