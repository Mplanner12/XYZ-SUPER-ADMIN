import React from 'react';
import { useReactTable, flexRender, getCoreRowModel, ColumnDef } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TableRow = {
    [key: string]: any;
};

interface CreateOrderTableProps<T> {
    data: T[];
    columns: ColumnDef<T, any>[];
    onAddRow: () => void;
    onUpdateRow: (index: number, key: string, value: any) => void;
}

const CreateOrderTable = <T,>({ data, columns, onAddRow, onUpdateRow }: CreateOrderTableProps<T>) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="w-full overflow-x-auto">
        <div className={cn("flex-1 shadow-md rounded-sm border-[#EAECF0]", "[@media(max-width:1290px)]:overflow-x-auto")}>
            <table
                style={{ borderSpacing: 0 }}
                className={cn("min-w-full bg-white text-sm", "[@media(max-width:1290px)]:min-w-[140%]")}
            >
                    <thead className="bg-foundation-grey-grey-300/25 text-foundation-grey-grey-800 whitespace-nowrap text-sm">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className="py-4 px-4 font-normal border-b border-[#EAECF0] text-left">
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row, rowIndex) => (
                            <tr key={row.id} className="border-b border-solid border-[#EAECF0]">
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="py-4 px-4 text-foundation-grey-grey-700">
                                        <input
                                            type="text"
                                            value={cell.getValue() as string}
                                            onChange={(e) => onUpdateRow(rowIndex, cell.column.id, e.target.value)}
                                             className="w-full border border-[#c4c8ce] py-2 focus:outline-none focus:border-primary-normal"
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='flex items-center gap-2 my-4 cursor-pointer w-fit' onClick={onAddRow}>
                <Plus className='text-primary-normal' />
                <p className='font-medium tracking-wide text-primary-normal text-base'>Add A New Product</p>
            </div>
        </div>
    );
};

export default CreateOrderTable;