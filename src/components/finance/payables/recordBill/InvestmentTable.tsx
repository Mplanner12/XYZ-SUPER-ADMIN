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
import { customerOptions } from '@/data/dropDownOption';

export type Investment = {
  id: string;
  investment: string;
  description: string;
  qty: string;
  uom: string;
  cost: string;
  amount: string;
  customerJob: string;
  billable: string;
  list: string;
};

type TableMeta = {
  updateData: (rowIndex: number, columnId: string, value: any) => void;
};

interface InvestmentTableProps {
  onDataUpdate: (data: Investment[]) => void;
}

const initialData: Investment[] = [
  {
    id: '1',
    investment: 'Furniture and Fittings',
    description: 'Executive Table',
    qty: '20',
    uom: '',
    cost: '4750',
    amount: '95,000	',
    customerJob: 'John Smith: Remodel',
    billable: 'Check',
    list: 'New Construction',
  },
  // Add more initial data as needed
];

const receivedFromOptions = [
  { value: "John Doe", label: 'John Doe'},
  { value: "Jane Smith", label: 'Jane Smith'},
  { value: "Company XYZ", label: 'Company XYZ'},
];
const fromAccountOptions = [
  { value: "Savings", label: 'Savings'},
  { value: "Checking", label: 'Checking'},
  { value: "Business", label: 'Business'},
];
const paymentMethodOptions = [
  { value: "Check", label: 'Check'},
  { value: "Cash", label: 'Cash'},
  { value: "Transfer", label: 'Transfer'},
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
  row: Row<Investment>;
  onEdit: (row: Row<Investment>) => void;
  onDelete: (row: Row<Investment>) => void;
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
                onEdit(row);
                onToggle();
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              role="menuitem"
            >
              Edit
            </button>
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

const InvestmentTable: React.FC<InvestmentTableProps> = ({ onDataUpdate }) => {
  const [billable, setBillable] = useState(false)
  const [data, setData] = useState<Investment[]>(() => [...initialData]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const columnHelper = createColumnHelper<Investment>();

  const columns = [
    columnHelper.accessor('investment', {
      header: 'Investment',
      cell: EditableCell,
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: EditableCell,
    }),
    columnHelper.accessor('qty', {
      header: 'Qty',
      cell: EditableCell,
    }),
    columnHelper.accessor('uom', {
      header: 'UoM',
      cell: EditableCell,
    }),
    columnHelper.accessor('cost', {
      header: 'Cost(GBP)',
      cell: EditableCell,
    }),
    columnHelper.accessor('amount', {
      header: 'Amount',
      cell: EditableCell,
    }),
    columnHelper.accessor('customerJob', {
      header: 'Customer & Job',
      cell: (info) => (
        <SelectCell {...info} options={customerOptions} />
      ),
    }),
    columnHelper.accessor('billable', {
      header: 'Reimburse',
      cell: (info) => <input type='checkbox' onChange={(e)=> {setBillable(e.target.checked); }} />
    }),
    columnHelper.accessor('list', {
      header: 'List',
      cell: (info) => (
        <SelectCell {...info} options={paymentMethodOptions} />
      ),
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

  const table = useReactTable<Investment>({
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

  const handleEdit = useCallback((row: Row<Investment>) => {
    // Implement your edit logic here
    console.log('Editing row:', row.original);
  }, []);

  const handleDelete = useCallback((row: Row<Investment>) => {
    setData((old) => old.filter((item) => item.id !== row.original.id));
  }, []);

  useEffect(() => {
    onDataUpdate(data);
  }, [data, onDataUpdate]);

  const handleAddRow = useCallback(() => {
    const newRow: Investment = {
      id: (data.length + 1).toString(),
      investment: '',
      description: '',
      qty: '',
      uom: '',
      cost: '',
      amount: '',
      customerJob: '',
      billable: '',
      list: '',
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
										className="text-left py-6 px-4 font-medium text-nowrap"
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

export default InvestmentTable;