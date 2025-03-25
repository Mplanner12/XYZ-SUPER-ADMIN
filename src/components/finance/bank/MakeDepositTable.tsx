"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  Row,
  Table,
} from "@tanstack/react-table";
import React, { useState, useCallback, useEffect } from "react";
import { ChevronDown, EllipsisVertical, Plus, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { TextField } from "@/components/reusable/TextField";
import { SelectField } from "@/components/reusable/SelectField";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Button } from "@/components/reusable/Button";
import { Modal } from "@/components/reusable/Modal";
import LoadingOverlay from "@/components/reusable/LoadingOverlay";
import { useGetAccountingListItemById, useGetDefaultChartOfAccount } from "@/app/accounting/hooks/query";

export type Deposit = {
  id: string;
  receivedFrom: string;
  receivedFromId?: string;
  name: string;
  fromAccount: string;
  accountListId?: string; //Add this to track the selected account's list ID
  description: string;
  checkNo: string;
  relatedParty: string;
  list: string;
  amount: string;
};

type TableMeta = {
  updateData: (rowIndex: number, columnId: string, value: any) => void;
};
// new
interface MakeDepositTableProps {
  onDataUpdate: (data: Deposit[]) => void;
  customerList: [];
  paymentMethodList: [];
  currency:string;
  allLists: [];
}

const initialData: Deposit[] = [
  {
    id: "1",
    receivedFrom: "Select List",
    name: 'Select Name',
    fromAccount: "Select Account",
    description: "",
    checkNo: "",
    relatedParty: "",
    list: "",
    amount: "",
  },
  // Add more initial data as needed
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
      className="outline-none border border-borderColor rounded-[8px] px-2 py-3"
    />
  );
};

interface SelectCellProps<TData extends object, TValue>
  extends EditableCellProps<TData, TValue> {
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
    <select
      value={value as string}
      onChange={onChange}
      className="outline-none"
    >
      <option value="">Select</option>
      {options?.map((item: any) => {
        const nameKey = Object.keys(item).find(key => key.endsWith("_name"));
        return(
          <option
          key={nameKey ? item[nameKey] : null}
          value={nameKey ? item[nameKey] : null}
        >
          {nameKey ? item[nameKey] : null}
        </option>
        )
      })}
    </select>
  );
};

const SelectDropDown = <TData extends object, TValue>({
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
    <select
      value={value as string}
      onChange={onChange}
      className="outline-none"
    >
      <option value="">Select</option>
      {options?.map((item: any) => {
        // const nameKey = Object.keys(item).find(key => key.endsWith("_name"));
        return(
          <option
          key={item?.ID}
          value={item?.ID}
        >
          {item?.name}
        </option>
        )
      })}
    </select>
  );
};

// Create a new ListCell component to handle the list column with its own API call
interface ListCellProps<TData extends object> {
  row: Row<Deposit>;
  getValue: () => any;
  column: {
    id: string;
  };
  table: Table<TData>;
}
const ListCell = <TData extends object>({
  row,
  getValue,
  column,
  table,
}: ListCellProps<TData>) => {
  const accountListId = row.original.accountListId;
  const { data: subListItem } = useGetAccountingListItemById({ 
    id: accountListId || '',
  });

  const value = getValue();
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    (table.options.meta as TableMeta).updateData(row.index, column.id, e.target.value);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className="outline-none"
    >
      <option value="">Select List</option>
      {subListItem?.data?.map((item: any) => {
        const nameKey = Object.keys(item).find(key => key.endsWith("_name"));
        return(
          <option
          key={nameKey ? item[nameKey] : null}
          value={nameKey ? item[nameKey] : null}
        >
          {nameKey ? item[nameKey] : null}
        </option>
        )
      })}
    </select>
  );
};

const NameCell = <TData extends object>({
  row,
  getValue,
  column,
  table,
}: ListCellProps<TData>) => {
  const receivedFrom = row.original.receivedFrom ;
  const { data: subListItem } = useGetAccountingListItemById({ 
    id: receivedFrom !== 'Select List' ? receivedFrom : '' ,
  });

  const value = getValue();
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    (table.options.meta as TableMeta).updateData(row.index, column.id, e.target.value);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className="outline-none"
    >
      <option value="">Select List</option>
      {subListItem?.data?.map((item: any) => {
        const nameKey = Object.keys(item).find(key => key.endsWith("_name"));
        return(
          <option
          key={nameKey ? item[nameKey] : null}
          value={nameKey ? item[nameKey] : null}
        >
          {nameKey ? item[nameKey] : null}
        </option>
        )
      })}
    </select>
  );
};


interface FromAccountCellProps<TData extends object> {
  row: any;
  column: {
    id: string;
  };
  table: Table<TData>;
}
const FromAccountCell = <TData extends object>({
  row,
  column,
  table,
}: FromAccountCellProps<TData>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(row.original.fromAccount);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const [groupedAccounts, setGroupedAccounts] = useState<{
    [parentType: string]: { [type: string]: any[] };
  }>({});
  // API CALL
  const { data: chartOfAccount, isLoading: isFetching } = useGetDefaultChartOfAccount();
  const accounts = chartOfAccount?.data || [];
  // Group accounts by parent_type and type
  useEffect(() => {
    // Group accounts by parent_type and type with trimming and fallback handling.
    const grouped = accounts.reduce((acc: any, account: any) => {
      const parentType = account.parent_type?.trim() || "Uncategorized";
      const type = account.type?.trim() || "Others";

      // Ensure the correct group is created for parent_type and type
      if (!acc[parentType]) acc[parentType] = {};
      if (!acc[parentType][type]) acc[parentType][type] = [];

      acc[parentType][type].push(account);
      return acc;
    }, {});

    //console.log("Grouped Accounts:", grouped); // Debugging log to ensure correctness

    setGroupedAccounts(grouped);
  }, [accounts]);

  const handleOptionClick = (accountName: string, accountListId: string) => {
    setSelectedValue(accountName);
    // Update both fromAccount and accountListId in the row data
    (table.options.meta as TableMeta).updateData(row.index, column.id, accountName);
    (table.options.meta as TableMeta).updateData(row.index, 'accountListId', accountListId);
    toggleModal();
  };

  // if (isFetching) return <LoadingOverlay />;
  return (
    <>
      {isFetching && <LoadingOverlay />}
      <div className="py-6 text-left relative">
        <button
          onClick={toggleModal}
          className="w-[200px] pl-2 pr-8 cursor-pointer focus:ring-[#8133F1] outline-none"
        >
          {selectedValue}
          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-600">
            <ChevronDown />
          </span>
        </button>
        {isOpen && (
          <Modal onClose={toggleModal}>
            <div className="py-2">
            </div>
            <h2 className="text-lg font-semibold mb-4">Select Account</h2>
            <table className="min-w-full text-left">
              <thead className="text-[16x]">
                <tr>
                  <th className="py-2 px-4">Account Code</th>
                  <th className="py-2 px-4">Account Name</th>
                  <th className="py-2 px-4">Associated List</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(groupedAccounts).map(([parentType, types]) => (
                  <React.Fragment key={parentType}>
                    {/* Render parent type header */}
                    <tr className="bg-gray-200 font-bold text-[16px]">
                      <td colSpan={3} className="py-2 px-4 capitalize">
                        {parentType}
                      </td>
                    </tr>

                    {Object.entries(types)?.map(([type, accounts]) => (
                      <React.Fragment key={type}>
                        {/* Render type header only once per type */}
                        <tr className="bg-gray-100 font-semibold text-[15px]">
                          <td colSpan={3} className="py-2 px-4 capitalize">
                            {type}
                          </td>
                        </tr>
                        {accounts?.map((account: any) => (
                          <tr
                            key={account.code}
                            onClick={() => {
                              // onSelectAccount({
                              //   account_name: account.name,
                              //   account_code: account.code,
                              //   associatedList: [account.list_name],
                              //   list_id: account.list_id,
                              // });
                              handleOptionClick(account?.name, account?.list_id) // Pass both name and list_id
                            }}
                            className="cursor-pointer hover:bg-[#f7f7f7] text-[#939292] text-[14px]"
                          >
                            <td className="py-2 px-4">{account.code}</td>
                            <td className="py-2 px-4">{account.name}</td>
                            <td className="py-2 px-4">{account.list_name}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </Modal>
        )}
      </div>
    </>
  );
};

interface ActionMenuProps {
  row: Row<Deposit>;
  onEdit: (row: Row<Deposit>) => void;
  onDelete: (row: Row<Deposit>) => void;
  isOpen: boolean;
  onToggle: () => void;
}
const ActionMenu: React.FC<ActionMenuProps> = ({
  row,
  onEdit,
  onDelete,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="relative">
      <button onClick={onToggle}>
        <EllipsisVertical />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
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

// Table ********************************************************************************************************
const MakeDepositTable: React.FC<MakeDepositTableProps> = ({
  onDataUpdate,
  customerList,
  paymentMethodList,
  currency,
  allLists,
}) => {
  const [makeTransfer, setMakeTransfer] = useState(false);
  const [success, setSuccess] = useState(false);
  const { control } = useForm();
  const [data, setData] = useState<Deposit[]>(() => [...initialData]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);


  const columnHelper = createColumnHelper<Deposit>();

  const columns = [
    columnHelper.accessor("receivedFrom", {
      header: "Received From",
      cell: (info) => <SelectDropDown {...info} options={allLists} />,
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: ({ row, getValue, column, table }) => (
        <NameCell {...{ row, getValue, column, table }} />
      ),
    }),
    columnHelper.accessor("fromAccount", {
      header: "From Account",
      cell: ({ row, column, table }) => (
        <FromAccountCell {...{ row, column, table }} />
      ),
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: EditableCell,
    }),
    columnHelper.accessor("checkNo", {
      header: "Check No.",
      cell: EditableCell,
    }),
    columnHelper.accessor("relatedParty", {
      header: "Related Party",
      // cell: (info) => <SelectCell {...info} options={paymentMethodList} />,
      cell: (info) => <input type= 'checkbox' />
    }),
    columnHelper.accessor("list", {
      header: "List",
      cell: ({ row, getValue, column, table }) => (
        <ListCell {...{ row, getValue, column, table }} />
      ),
    }),
    columnHelper.accessor("amount", {
      header: `Amount`,
      cell: EditableCell,
    }),
    columnHelper.display({
      id: "actions",
      header: "Action",
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

  const table = useReactTable<Deposit>({
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

  const handleEdit = useCallback((row: Row<Deposit>) => {
    // Implement your edit logic here
    console.log("Editing row:", row.original);
  }, []);

  const handleDelete = useCallback((row: Row<Deposit>) => {
    setData((old) => old.filter((item) => item.id !== row.original.id));
  }, []);

  // new
  useEffect(() => {
    onDataUpdate(data);
  }, [data, onDataUpdate]);

  const handleAddRow = useCallback(() => {
    const newRow: Deposit = {
      id: (data.length + 1).toString(),
      receivedFrom: "Select List",
      receivedFromId: "",
      name: 'Select Name',
      fromAccount: "Select Account",
      accountListId: "", // Initialize with empty accountListId
      description: "",
      checkNo: "",
      relatedParty: "Select Payment Method",
      list: "",
      amount: "",
    };
    setData((old) => [...old, newRow]);
  }, [data]);

  const handleToggleMenu = useCallback((rowId: string) => {
    setOpenMenuId((prevId) => (prevId === rowId ? null : rowId));
  }, []);

  const handleMakeTransfer = () => {
    setSuccess(!success);
  };
  return (
    <div className=" w-full">
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
          <tbody className="divide-y divide-[#EAECF0]  bg-white ">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
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
          className="flex items-center bg-primary-normal hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
        >
          <PlusCircle size={20} className="mr-2" />
          Add New
        </button>
      </div>
      {makeTransfer && (
        <div className="flex items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
          <div className="relative w-fit max-h-[95%] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll no-scrollbar px-[50px] py-[50px] ">
            <h2 className="mb-2">Make Transfer </h2>
            <p className="text-[#939292] mb-4">
              Transfer money between accounts
            </p>
            <div className="flex justify-between gap-4 mb-4">
              <SelectField
                name="location"
                label="Location"
                options={locationOptions}
                control={control}
              />
              <SelectField
                name="type"
                label="Transfer Type"
                options={transferOptions}
                control={control}
              />
            </div>
            <div className="flex justify-between gap-4 mb-4">
              <TextField
                name="date"
                label="Date"
                type="date"
                control={control}
              />
              <SelectField
                name="type"
                label="Transfer Type"
                options={classOptions}
                control={control}
              />
            </div>
            <div className="flex justify-between gap-4 mb-4">
              <SelectField
                name="transferFund"
                label="Transfer Funds From"
                options={transferFundOptions}
                helperText="Account Currency is Dollars (USD)"
                control={control}
              />
              <TextField
                name="type"
                label="Ending Balance (GBP)"
                placeholder="46,969.10"
                coloredBg
                control={control}
              />
            </div>
            <div className="flex justify-between gap-4 mb-4">
              <SelectField
                name="receiveFund"
                label="Receiving Account"
                options={receiveFundOptions}
                helperText="Account Currency is Pounds (£)"
                control={control}
              />
              <div className="flex justify-between items-center w-[340px] h-[48px] bg-[#F0F0F0] px-4 mt-6">
                <p>Exchange rate</p>
                <div className="bg-white border border-[#939292] rounded-[4px] px-4 py-3">
                  <p>$ 1</p>
                </div>
                <Image
                  src="/exchange.svg"
                  alt="exchange rate"
                  width={24}
                  height={24}
                />
                <div className="bg-white border border-[#939292] rounded-[4px] px-4 py-3">
                  <p>£ 0.8</p>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <TextField
                name="amount"
                label="Amount to be Transferred (USD)"
                placeholder="Enter Amount"
                control={control}
              />
            </div>
            <TextField
              name="amount"
              label="Description"
              placeholder="Enter Transaction Description"
              variant="xlong"
              control={control}
            />
            <div className="flex flex-col md:flex-row gap-6 mt-6">
              <div className="w-[157px]">
                <Button fullWidth onClick={handleMakeTransfer}>
                  Make Transfer
                </Button>
              </div>
              <div className="w-[340px]">
                <Button fullWidth variant="outlined">
                  Make Transfer & Create New
                </Button>
              </div>
              <button
                className="text-primary-normal"
                onClick={() => setMakeTransfer(!makeTransfer)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const locationOptions = [
  { value: "", label: "Select location" },
  { value: "lagos", label: "Lagos" },
  { value: "abuja", label: "Abuja" },
];
const transferOptions = [
  { value: "", label: "Select transfer type" },
  { value: "Intra-Bank Transfer", label: "Intra-Bank Transfer" },
  { value: "Inter-Bank Transfer", label: "Inter-Bank Transfer" },
];
const classOptions = [
  { value: "", label: "Select transfer type" },
  { value: "Intra-Bank Transfer", label: "Intra-Bank Transfer" },
  { value: "Inter-Bank Transfer", label: "Inter-Bank Transfer" },
];
const transferFundOptions = [
  { value: "", label: "Select" },
  { value: "A", label: "Bank A" },
  { value: "B", label: "Bank B" },
];
const receiveFundOptions = [
  { value: "", label: "Select" },
  { value: "A", label: "Bank A" },
  { value: "B", label: "Bank B" },
];

export default MakeDepositTable;
