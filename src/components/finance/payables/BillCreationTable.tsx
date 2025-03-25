'use client'
import React, { useState, useCallback } from 'react';
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

type Payment = {
  id: string;
  product: string;
  description: string;
	quantity: string;
	uom: string;
	rate: string;
  vat: string;
  customer: string;
  account: string;
  amount: string;
};

type TableMeta = {
  updateData: (rowIndex: number, columnId: string, value: any) => void;
};

const initialData: Payment[] = [
  {
    id: '1',
    product: 'Light Pine',
    description: 'Light pine kitchen  cabinet wall unit',
    quantity: "4",
    uom: "7500",
    rate: "400",
    vat: '7.5%',
    customer: 'John Smith',
    account: 'Accounts Payable-20050',
    amount: '1,600.00',
  },
  // Add more initial data as needed
];

const customerOptions = [
  { value: "John Doe", label: 'John Doe'},
  { value: "Jane Smith", label: 'Jane Smith'},
  { value: "Company XYZ", label: 'Company XYZ'},
];
const accountOptions = [
  { value: "Savings", label: 'Savings'},
  { value: "Checking", label: 'Checking'},
  { value: "Business", label: 'Business'},
];
const productOptions = [
  { value: "Light Pine", label: 'Light Pine'},
  { value: "Product xyz", label: 'Product xyz'},
  { value: "pine", label: 'Pine'},
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
      className='outline-none min-w-fit border border-borderColor px-2 py-3 rounded-[8px]'
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

const BillCreationTable: React.FC = () => {
  const [billable, setBillable] = useState(false)
  const [data, setData] = useState<Payment[]>(() => [...initialData]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const columnHelper = createColumnHelper<Payment>();

  const columns = [
    columnHelper.accessor('product', {
      header: 'Product',
      cell: (info) => (
        <SelectCell {...info} options={productOptions} />
      ),
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: EditableCell,
    }),
    columnHelper.accessor('quantity', {
      header: 'Quantity',
      cell: EditableCell,
    }),
    columnHelper.accessor('uom', {
      header: 'UoM',
      cell: EditableCell,
    }),
    columnHelper.accessor('rate', {
      header: 'Rate (USD)',
      cell: EditableCell,
    }),
    columnHelper.accessor('vat', {
      header: 'VAT(%)',
      cell: EditableCell,
    }),
    columnHelper.accessor('customer', {
      header: 'Customer',
      cell: (info) => (
        <SelectCell {...info} options={customerOptions} />
      ),
    }),
    columnHelper.accessor('account', {
      header: 'Account',
      cell: (info) => (
        <SelectCell {...info} options={accountOptions} />
      ),
    }),
    columnHelper.accessor('amount', {
      header: 'Amount',
      cell: EditableCell,
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
  }, []);

  const handleDelete = useCallback((row: Row<Payment>) => {
    setData((old) => old.filter((item) => item.id !== row.original.id));
  }, []);

  const handleAddRow = useCallback(() => {
    const newRow: Payment = {
      id: (data.length + 1).toString(),
      product: '',
      description: '',
      quantity:'' ,
      uom: '',
      rate: "",
      vat: '',
      customer: '',
      account: '',
      amount: '',
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

export default BillCreationTable;


// "use client"

// import { Menu } from '@headlessui/react';
// import {
//     createColumnHelper,
//     flexRender,
//     getCoreRowModel,
//     useReactTable,
// } from '@tanstack/react-table';
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';

// interface TableRow {
// 	id: number;
//   product: string;
//   description: string;
// 	quantity: number;
// 	uom: number;
// 	rate: number;
//   vat: string;
//   customer: string;
//   account: string;
//   amount: string;
// }

// const columnHelper = createColumnHelper<TableRow>();

// const BillCreationTable = () => {
//   const [success, setSuccess] = useState(false)
//   const router = useRouter()

//   const handleMakeTransfer = () =>{
//     setSuccess(!success)
//   }

//   const [data, setData] = useState<TableRow[]>([
// 		{
//       id: 1,
//       product: 'Light Pine',
//       description: 'Light pine kitchen  cabinet wall unit',
//       quantity: 4,
//       uom: 7500,
//       rate: 400,
//       vat: '7.5%',
//       customer: 'John Smith',
//       account: 'Accounts Payable-20050',
//       amount: '1,600.00',
//     },
//     {
//       id: 2,
//       product: 'Light Pine',
//       description: 'Light pine kitchen  cabinet wall unit',
//       quantity: 4,
//       uom: 7500,
//       rate: 400,
//       vat: '7.5%',
//       customer: 'John Smith',
//       account: 'Accounts Payable-20050',
//       amount: '1,600.00',
//     },
// 	]);
//   const columns = [
//     columnHelper.accessor('product',{
//       header: "Product",
//       cell: ({getValue}) => getValue(), 
//     }),
//     columnHelper.accessor('description', {
//       header: 'Description',
//       cell: (info) => info.getValue(),
//     }),
//     columnHelper.accessor('quantity', {
//       header: 'Quantity',
//       cell: ({getValue}) => getValue(),
//     }),
//     columnHelper.accessor('uom', {
//       header: 'Uom',
//       cell: (info) => info.getValue(),
//     }),
//     columnHelper.accessor('rate', {
//       header: 'Rate (USD)',
//       cell: (info) => info.getValue(),
//     }),
//     columnHelper.accessor('vat', {
//       header: 'VAT(%)',
//       cell: (info) => info.getValue(),
//     }),
//     columnHelper.accessor('customer', {
//       header: 'Customer',
//       cell: (info) => info.getValue(),
//     }),
//     columnHelper.accessor('account', {
//       header: 'Account',
//       cell: (info) => info.getValue(),
//     }),
//     columnHelper.accessor('amount', {
//       header: 'Amount (USD)',
//       cell: (info) => info.getValue(),
//     }),
//   ];
  
// 	const table = useReactTable({
// 		data,
// 		columns,
// 		getCoreRowModel: getCoreRowModel(),
// 	});

// 	return (
// 		<div className="w-full">
// 			<div className="overflow-x-scroll no-scrollbar border border-[#EAECF0] rounded-xl">
// 				<table
// 					style={{ borderSpacing: 0 }}
// 					className="w-full text-wrap bg-white text-center text-sm"
// 				>
// 					<thead className="bg-foundation-grey-grey-300/25 border-b border-[#EAECF0] text-sm ">
// 						{table.getHeaderGroups().map((headerGroup) => (
// 							<tr key={headerGroup.id}>
// 								{headerGroup.headers.map((header) => (
// 									<th
// 										key={header.id}
// 										className="py-6 px-4 font-medium"
// 									>
// 										{header.isPlaceholder
// 											? null
// 											: flexRender(
// 													header.column.columnDef.header,
// 													header.getContext()
// 											  )}
// 									</th>
// 								))}
// 							</tr>
// 						))}
// 					</thead>
// 					<tbody className='divide-y divide-[#EAECF0] bg-white '>
// 						{table.getRowModel().rows.map((row) => (
// 							<tr
// 								key={row.id}
// 							>
// 								{row.getVisibleCells().map((cell) => (
// 									<td
// 										key={cell.id}
// 										className="py-6 px-4 whitespace-break-spaces text-[#939292]"
// 									>
// 										{flexRender(cell.column.columnDef.cell, cell.getContext())}
// 									</td>
// 								))}
// 							</tr>
// 						))}
// 					</tbody>
// 				</table>
// 			</div>
// 		</div>
// 	);
// };

// export default BillCreationTable;
