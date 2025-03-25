"use client"

import { Menu } from '@headlessui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  Row,
  Table,
} from '@tanstack/react-table';
import React, { useState, useCallback } from 'react';
import { EllipsisVertical, Plus, PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation';

type Payment = {
	id: string;
  investmentName: string;
  investmentType: string;
	issueDate: string;
	currency: string;
	faceValue: string;
  numberOfShares: string;
  issuePrice: number;
	legalStructure: string;
	jurisdiction: string;
  regulatoryCompliance: string;
  investmentDescription: string;
  eligibility: string;
  supportingDocument: string;
}

type TableMeta = {
  updateData: (rowIndex: number, columnId: string, value: any) => void;
};

const initialData: Payment[] = [
  {
    id: '1',
    investmentName: 'common stock',
    investmentType: 'Stock Issuance A',
    issueDate: '01-15-2024',
    currency: '234',
    faceValue: '$5,000',
    numberOfShares:'100,000',
    issuePrice: 10,
    legalStructure: 'Corporation',
    jurisdiction: 'United State',
    regulatoryCompliance: 'Quarterly',
    investmentDescription: 'Small business equity financing',
    eligibility: 'Small business with at',
    supportingDocument: 'Legal agreements, Financial statements',
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
      className='outline-none border border-borderColor rounded-[8px] px-2 py-3'
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

const FinancingDetailsEquityTable= () => {
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const [data, setData] = useState<Payment[]>(() => [...initialData]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleMakeTransfer = () =>{
    setSuccess(!success)
  }
  const columnHelper = createColumnHelper<Payment>();

  const columns = [
    columnHelper.accessor('investmentName',{
      header: "Investment Name",
      cell: (info) => (
        <SelectCell {...info} options={fromAccountOptions} />
      ),
    }),
    columnHelper.accessor('investmentType', {
      header: 'Investment Type',
      cell: (info) => (
        <SelectCell {...info} options={fromAccountOptions} />
      ),
    }),
    columnHelper.accessor('issueDate', {
      header: 'Issue Date',
      cell: ({getValue}) => <input type='date' /> ,
    }),
    columnHelper.accessor('currency', {
      header: 'Currency',
      cell: (info) => (
        <SelectCell {...info} options={fromAccountOptions} />
      ),
    }),
    columnHelper.accessor('faceValue', {
      header: 'Face Value/Principal Amount(USD)',
      cell: EditableCell,
    }),
    columnHelper.accessor('numberOfShares', {
      header: 'Number of Shares/Units',
      cell: EditableCell,
    }),
    columnHelper.accessor('issuePrice', {
      header: 'Current Value (USD)',
      cell: EditableCell,
    }),
    columnHelper.accessor('legalStructure', {
      header: 'Legal Structure',
      cell: EditableCell,
    }),
    columnHelper.accessor('jurisdiction', {
      header: 'Jurisdiction',
      cell: EditableCell,
    }),
    columnHelper.accessor('regulatoryCompliance', {
      header: 'Regulatory Compliance',
      cell: EditableCell,
    }),
    columnHelper.accessor('investmentDescription', {
      header: 'Investment Description',
      cell: EditableCell,
    }),
    columnHelper.accessor('eligibility', {
      header: 'Eligibility',
      cell: EditableCell,
    }),
    columnHelper.accessor('supportingDocument', {
      header: 'Supporting Document',
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
      investmentName: '',
      investmentType: '',
      issueDate: '',
      currency: '',
      faceValue: '',
      numberOfShares:'',
      issuePrice: 10,
      legalStructure: '',
      jurisdiction: '',
      regulatoryCompliance: '',
      investmentDescription: '',
      eligibility: '',
      supportingDocument: '',
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

export default FinancingDetailsEquityTable;
