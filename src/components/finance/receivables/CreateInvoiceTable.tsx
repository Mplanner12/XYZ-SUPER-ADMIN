'use client'
import React, { useState, useCallback, useEffect } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  Row,
  Table,
} from '@tanstack/react-table';
import { EllipsisVertical, PlusCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export type Payment = {
  id: string;
  product: string;
  description: string;
  quantity: string;
  uom: string;
  rate: string;
  amount: string;
  discount: string;
  tax: string;
};

// new
interface CreateInvoiceTableProps {
  onDataUpdate: (data: Payment[]) => void;
}

type TableMeta = {
  updateData: (rowIndex: number, columnId: string, value: any) => void;
};

const initialData: Payment[] = [
  {
    id: `INV-1${uuidv4()}`,
    product: '',
    description: '',
    quantity: '',
    uom: '',
    rate: '',
    amount: '',
    discount: '',
    tax: '',
  },
  // Add more initial data as needed
];

const receivedFromOptions = [
  { value: "John Doe", label: 'John Doe'},
  { value: "Jane Smith", label: 'Jane Smith'},
  { value: "Company XYZ", label: 'Company XYZ'},
];


interface EditableCellProps<TData extends object, TValue> {
  getValue: () => TValue;
  row: Row<TData>;
  column: {
    id: string;
  };
  table: Table<TData>;
}

const EditableCell = <TData extends object, TValue>({
  getValue,
  row,
  column: { id },
  table,
}: EditableCellProps<TData, TValue>) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    (table.options.meta as TableMeta).updateData(row.index, id, value);
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      value={value as string}
      onChange={(e) => setValue(e.target.value as TValue)}
      onBlur={onBlur}
      className='outline-none border border-borderColor px-2 py-3 rounded-[8px]'
    />
  );
};

interface SelectCellProps<TData extends object, TValue> extends EditableCellProps<TData, TValue> {
  options: any;
}

const SelectCell = <TData extends object, TValue>({
  getValue,
  row,
  column: { id },
  table,
  options,
}: SelectCellProps<TData, TValue>) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value as TValue);
    (table.options.meta as TableMeta).updateData(row.index, id, e.target.value);
  };

  return (
    <select value={value as string} onChange={onChange} className='outline-none'>
      {options.map((option:any) => (
        <option key={option?.value} value={option?.value}>
          {option?.label}
        </option>
      ))}
    </select>
  );
};

interface ActionMenuProps {
  row: Row<Payment>;
  onEdit: (row: Row<Payment>) => void;
  onDelete: (row: Row<Payment>) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ row, onEdit, onDelete, isOpen, onToggle }) => {
  return (
    <div className="relative">
      <button onClick={onToggle}>
        <EllipsisVertical />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              onClick={() => {
                onDelete(row);
                onToggle();
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              role="menuitem"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const CreateInvoiceTable: React.FC<CreateInvoiceTableProps> = ({ onDataUpdate }) => {
  const [data, setData] = useState<Payment[]>(() => [...initialData]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  
  const columnHelper = createColumnHelper<Payment>();

  const columns = [
    columnHelper.accessor('product', {
      header: 'Product',
      cell: (info) => (
        <SelectCell {...info} options={receivedFromOptions} />
      ),
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: EditableCell,
    }),
    columnHelper.accessor('quantity', {
      header: 'Quantity	',
      cell: EditableCell,
    }),
    columnHelper.accessor('uom', {
      header: 'UOM',
      cell: EditableCell,
    }),
    columnHelper.accessor('rate', {
      header: 'Rate (USD)',
      cell: EditableCell,
    }),
    columnHelper.accessor('amount', {
      header: 'Amount (USD)',
      cell: EditableCell,
    }),
    columnHelper.accessor('discount', {
      header: 'Discount (USD)',
      cell: EditableCell,
    }),
    columnHelper.accessor('tax', {
      header: 'Tax (USD)',
      cell: (info) => (
        <SelectCell {...info} options={receivedFromOptions} />
      ),
      // footer: ({table}) => {
      //   const sum = table.getFilteredRowModel().rows.reduce((acc, row) => {
      //     const value = row.getValue('tax');
      //     if (typeof value === 'string') {
      //       const numericValue = value.replace(/,/g, '');
      //       return acc + (Number(numericValue) || 0);
      //     }
      //     return acc;
      //   }, 0);
        
      //   return `$${sum.toLocaleString()}`;
      // }
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <ActionMenu
          row={row}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isOpen={openMenuId === row.id}
          onToggle={() => handleToggleMenu(row.id)}
        />
      ),
    }),
  ];

  const table = useReactTable<Payment>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: any) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    } as TableMeta,
  });

  const handleEdit = useCallback((row: Row<Payment>) => {
    // Implement your edit logic here
    console.log('Editing row:', row.original);
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = useCallback((row: Row<Payment>) => {
    setData((old) => old.filter((item) => item.id !== row.original.id));
  }, []);

  // new
  useEffect(() => {
    onDataUpdate(data);
  }, [data, onDataUpdate]);

  const handleAddRow = useCallback(() => {
    const newRow: Payment = {
      id: (data.length + 1).toString(),
      product: '',
      description: '',
      quantity: '',
      uom: '',
      rate: '',
      amount: '',
      discount: '',
      tax: '',
    };
    setData((old) => [...old, newRow]);
  }, [data]);

  const handleToggleMenu = useCallback((rowId: string) => {
    setOpenMenuId((prevId) => (prevId === rowId ? null : rowId));
  }, []);

  return (
    <div className="p-2">
      <div className="overflow-x-scroll border border-[#EAECF0] rounded-xl">
				<table
					style={{ borderSpacing: 0 }}
					className="w-full text-wrap bg-white text-center text-sm"
				>
					<thead className="bg-foundation-grey-grey-300/25 border-b border-[#EAECF0] text-sm ">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="py-6 px-4 font-medium text-nowrap"
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
											  )}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody className='divide-y divide-[#EAECF0]  bg-white '>
						{table.getRowModel().rows.map((row) => (
							<tr
								key={row.id}
							>
								{row.getVisibleCells().map((cell) => (
									<td
										key={cell.id}
										className="py-6 px-4 whitespace-break-spaces text-[#939292]"
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => {
              return (
                <tr key={footerGroup.id} className='border-t border-[#EAECF0] '>
                  {footerGroup.headers.map((footer) => {
                    return (
                      <td key={footer.id} className='text-left py-6 px-4'>
                        {footer.isPlaceholder
                          ? null
                          : flexRender(
                              footer.column.columnDef.footer,
                              footer.getContext()
                            )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tfoot>
				</table>
			</div>
      <div className="mt-4">
        <button
          onClick={handleAddRow}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-normal hover:bg-primary-dark focus:outline-none"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Add Row
        </button>
      </div>
    </div>
  );
};

export default CreateInvoiceTable;