"use client";
import SelectDropDown from "@/components/accounting/shared/SelectDropDown/SelectDropDown";
import TableDropDown from "@/components/accounting/shared/TableDropDown/TableDropDown";
import HeaderLayout from "@/components/MainLayouts/HeaderLayout";
import LoadingOverlay from "@/components/reusable/LoadingOverlay";
import { ArrowUpNarrowWideIcon, ChevronLeftIcon, ListFilterIcon, Plus } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiSearch } from "react-icons/fi";
import { toast } from 'react-toastify';
import { useCreateAccountingListItem } from "../../hooks/mutate";
import { useGetAccountingListById, useGetAccountingListItemById } from "../../hooks/query";


type RowType = {
    [key: string]: any;
};
interface EditableRow {
    [dataKey: string]: string;
}

interface EditableValues {
    [rowIndex: number]: EditableRow;
}

const OtherListDetails: React.FC = () => {
    const [rows, setRows] = useState<RowType[]>([{}]);
    const [previousRows, setPreviousRows] = useState<RowType[]>([{}]); 
    const [openFilter, setOpenFilter] = useState("");
    const [openEditFilter, setOpenEditFilter] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [subCategoryOptions, setSubCategoryOptions] = useState<string[]>([]);
    const [editRowId, setEditRowId] = useState<number | null>(null);
    const [editableValues, setEditableValues] = useState<EditableValues>({});

    console.log("editRowId", editRowId)

    const params = useSearchParams();
    const accountId: any = params.get("id");
    const tableRef = useRef<HTMLDivElement>(null);

    const { data: listData, isFetching } = useGetAccountingListById({ id: accountId });
    const { data: listItem, refetch } = useGetAccountingListItemById({ id: accountId });

    const { mutate } = useCreateAccountingListItem();

    const lists = listData || [];


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, columnName: string) => {
        const updatedRows = [...rows];
        updatedRows[rowIndex][columnName] = e.target.value;
        setRows(updatedRows);
    };

    const handleEditInputChange = (e: any, rowIndex: any, dataKey: any) => {
        setEditableValues((prevValues: any) => ({
            ...prevValues,
            [rowIndex]: {
                ...prevValues[rowIndex],
                [dataKey]: e.target.value
            }
        }));
    };

    const handleDateChange = (date: any, rowIndex: any, columnName: string) => {
        const updatedRows = [...rows];
        updatedRows[rowIndex][columnName] = date ? date.toISOString().slice(0, 10) : "",
            setRows(updatedRows);
    };

    const handleEditDateChange = (date: any, rowIndex: any, dataKey: any) => {
        setEditableValues((prevValues) => ({
            ...prevValues,
            [rowIndex]: {
                ...prevValues[rowIndex],
                [dataKey]: date ? date.toISOString().split('T')[0] : ""
            }
        }));
    };

    const handleToggle = (dropdownId: string) => {
        setOpenFilter((prev) => (prev === dropdownId ? "" : dropdownId));
    };

    const handleEditToggle = (dropdownId: string) => {
        setOpenEditFilter((prev) => (prev === dropdownId ? "" : dropdownId));
    };

    // Save Changes
    const handleSaveChanges = () => {
        setIsLoading(true);
        const entries: any = {};

        rows.forEach((row, rowIndex) => {
            lists?.data?.column?.forEach((column: any) => {
                const columnId = column?.ID?.toString();
                let value = row[column?.name];

                // Only add the value to entries if the column ID exists and value is defined
                if (columnId && value !== undefined) {
                    entries[columnId] = value.toString();
                }
            });
        });
        const payload = {
            entry: entries,
            list_id: Number(accountId),
        };

        mutate(payload, {
            onSuccess: () => {
                setIsLoading(false);
                toast.success("Item added successfully!");
                refetch()
                setTimeout(() => {
                    setRows((prevRows) =>
                        prevRows.map((row) =>
                            Object.fromEntries(
                                Object.keys(row).map((key) => [key, ""])
                            )
                        )
                    );
                }, 1000)
            },
            onError: (error) => {
                setIsLoading(false);
                const errorMessage = error?.response?.data?.message || "Error adding item.";
                toast.error(errorMessage);
            },
        });

    };

    const handleRevertChanges = () => {
        setRows([...previousRows]); // Restore the previous state
        console.log("Changes reverted:", previousRows);
    };

    const handleDropdownSelect = (selectedOption: string, rowIndex: number, columnName: string) => {
        console.log(columnName)
        if (!rows[rowIndex]) {
            console.warn(`Row at index ${rowIndex} does not exist.`);
            return;
        }

        // Shallow copy the rows array to avoid direct mutation
        const updatedRows = [...rows];

        // Check if the selected column is "Category" and update subCategoryOptions
        if (columnName === "Category") {
            const category = lists?.data?.ListCategory?.find((cat: any) => cat.Name === selectedOption);
            console.log(category)

            if (category) {
                const subCategories = category.ListSubCategory.map((subCat: any) => subCat.Name);
                setSubCategoryOptions(subCategories);
                updatedRows[rowIndex].subCategoryOptions = subCategories;
            } else {
                updatedRows[rowIndex].subCategoryOptions = [];
            }

            // Reset the SubCategory value when a new Category is selected
            updatedRows[rowIndex]["SubCategory"] = "";
        }
        // Update the selected option for both rows and editableValues states
        updatedRows[rowIndex][columnName] = selectedOption;
        setRows(updatedRows);
    };

    const handleEditDropdownSelect = (selectedOption: string, rowIndex: number, dataKey: string) => {
        console.log(dataKey)
        console.log(rows)


        if (!rows[rowIndex]) {
            console.warn(`Row at index ${rowIndex} does not exist.`);
            return;
        }

        // Shallow copy the rows array to avoid direct mutation
        const updatedRows = [...rows];

        // Check if the selected column is "Category" and update subCategoryOptions
        if (dataKey === "category") {
            const category = lists?.data?.ListCategory?.find((cat: any) => cat.Name === selectedOption);
            console.log(category)
            if (category) {
                const subCategories = category.ListSubCategory.map((subCat: any) => subCat.Name);
                setSubCategoryOptions(subCategories);
                updatedRows[rowIndex].subCategoryOptions = subCategories;
            } else {
                updatedRows[rowIndex].subCategoryOptions = [];
            }

            // Reset the SubCategory value when a new Category is selected
            updatedRows[rowIndex]["SubCategory"] = "";

            setEditableValues((prevValues) => ({
                ...prevValues,
                [rowIndex]: {
                    ...prevValues[rowIndex],
                    SubCategory: "", // Reset SubCategory in editable state
                },
            }));
        }

        // Update the selected option for both rows and editableValues states
        updatedRows[rowIndex][dataKey] = selectedOption;
        setRows(updatedRows);

        setEditableValues((prevValues) => ({
            ...prevValues,
            [rowIndex]: {
                ...prevValues[rowIndex],
                [dataKey]: selectedOption,
            },
        }));
    };

    const handleEditRow = (id: number) => {
        setEditRowId(id);
        setPreviousRows(JSON.parse(JSON.stringify(rows))); // Deep copy of rows for cancellation
    };

    // Save changes made in edit mode
    const handleSaveRow = (id: number) => {
        setEditRowId(null);
        // Save logic here (e.g., update API call)
    };

    const handleCancelEdit = () => {
        setRows([...previousRows]);
        setEditRowId(null);
    };

    const generateTableOptions = (rowIndex: number) => {

        return editRowId === rowIndex
            ? [
                { label: "Save", action: () => handleSaveRow(rowIndex) },
                { label: "Cancel", action: handleCancelEdit },
            ]
            : [
                { label: "Edit", action: () => handleEditRow(rowIndex) },
                { label: "Delete" }
            ];
    };

    // Function to initialize editable values for each row based on dataKey
    const initializeEditableValues = () => {
        const initialValues: any = {};
        listItem?.data?.forEach((row: any, rowIndex: any) => {
            initialValues[rowIndex] = {};
            lists?.data?.column?.forEach((column: any) => {
                const dataKey = column.name.toLowerCase().replace(/\s+/g, '_');
                initialValues[rowIndex][dataKey] = row[dataKey] || "";  // Set initial value from7+ row data
            });
        });
        setEditableValues(initialValues);
    };

    useEffect(() => {
        initializeEditableValues();
    }, [listItem, lists]);

    const breadcrumbs = ["Admin Dashboard", "Accounting Module"];

    if (isFetching) {
        return <LoadingOverlay />;
    }
    return (
        <>
            <HeaderLayout moduleName="Accounting Module" page="Other Lists" breadcrumbs={breadcrumbs} />

            <main className="px-9 pt-4">
                <p className="text-xl mt-3 mb-4 flex items-center font-medium">
                    <Link href="/accounting/other-list/">
                        <ChevronLeftIcon size={"20px"} color="#8133F1" />
                    </Link>
                    <span>{lists?.data?.name}({listItem?.data?.length})</span>
                </p>

                <div className="text-[#8133F1] flex gap-5 items-center justify-between">
                    <div className="flex gap-3">
                        <button className="flex gap-1 text-[16px]">
                            Filter <ListFilterIcon size="20px" />
                        </button>
                        <button className="flex gap-1 text-[16px]">
                            Sort <ArrowUpNarrowWideIcon size="20px" />
                        </button>
                    </div>
                    <div className="relative w-[30%] lg:w-[30%] mb-4 md:mb-0">
                        <div className="relative w-full">
                            <input
                                type="text"
                                name="search"
                                placeholder="Search for an item, account, or item type"
                                size={70}
                                className="block w-full rounded-[6px] border-0 h-[3.2rem] py-1.5 pr-2 pl-9 text-[16px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-[#8133F1] focus:ring-2 placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                            />
                            <span>
                                <FiSearch className="text-[22px] absolute left-2 top-[.9rem] text-[#66686B]" />
                            </span>
                        </div>
                    </div>
                </div>

                <div className="my-5">
                    <div className="overflow-x-auto scrollbar-hide" ref={tableRef}>
                        <table className="min-w-[280%] md:min-w-[128%] lg:min-w-[133%] text-[14px]">
                            <thead>
                                <tr className="text-[#374B58] text-[12px] font-[500] bg-[#F5F5F5]">
                                    {lists?.data?.column?.map((list: any, index: any) => (
                                        <td key={index} className={`py-5 ${index === 0 ? "pl-5" : ""}`}>{list?.name}</td>
                                    ))}
                                    <td className="pr-5">
                                        Action
                                    </td>
                                </tr>
                            </thead>
                            <tbody className="w-full bg-white">
                                {listItem?.data?.map((row: any, editRowIndex: number) => (
                                    <tr
                                        key={editRowIndex}
                                        className="text-[#374B58] border-[#eaecf0] border-b hover:bg-[#f7f7f7] text-[14px]"
                                    >
                                        {lists?.data?.column?.map((column: any, columnIndex: any) => {
                                            const dataKey = column.name.toLowerCase().replace(/\s+/g, '_');
                                            const editableValue: any = editableValues[editRowIndex]?.[dataKey] || "";

                                            return (
                                                <td key={columnIndex} className={`py-5 ${columnIndex === 0 ? "pl-5" : ""}`}>
                                                    {editRowId === editRowIndex ? (
                                                        column.type === "Text" || column.type === "Text/Number" || column.type === "Percentage" ? (
                                                            <input
                                                                type="text"
                                                                value={editableValue}
                                                                onChange={(e) => handleEditInputChange(e, editRowIndex, dataKey)}
                                                                placeholder={`Enter ${column.name}`}
                                                                className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                                            />
                                                        ) : column.type === "Dropdown" || column.type === "Text/Dropdown" ? (
                                                            <SelectDropDown
                                                                textColor="#545A5D"
                                                                iconColor="#8133F1"
                                                                textSize={14}
                                                                tableRef={tableRef}
                                                                zIndex={10}
                                                                menuWidth={10}
                                                                label={editableValue || `Select ${column.name}`}
                                                                options={
                                                                    column.name === "Status"
                                                                        ? ["Active", "Inactive"]
                                                                        : column.name === "Category"
                                                                            ? lists?.data?.ListCategory?.map((cat: any) => cat?.Name)
                                                                            : column.name === "SubCategory"
                                                                                ? subCategoryOptions
                                                                                : ["Option 1", "Option 2", "Option 3"]
                                                                }
                                                                onSelect={(selectedOption) => handleEditDropdownSelect(selectedOption, editRowIndex, dataKey)}
                                                                isOpen={openEditFilter === `dropdown-${editRowIndex}-${columnIndex}`}
                                                                onToggle={() => handleEditToggle(`dropdown-${editRowIndex}-${columnIndex}`)}
                                                            />
                                                        ) : column.type === "Date" ? (
                                                            <DatePicker
                                                                selected={editableValue ? new Date(editableValue) : null}
                                                                onChange={(date) => handleEditDateChange(date, editRowIndex, dataKey)}
                                                                dateFormat="yyyy-MM-dd"
                                                                className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                                                placeholderText={`Select Date`}
                                                            />
                                                        )
                                                            : (
                                                                <input
                                                                    type="text"
                                                                    value={editableValue}
                                                                    onChange={(e) => handleEditInputChange(e, editRowIndex, dataKey)}
                                                                    placeholder={`Enter${column?.name}`}
                                                                    className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                                                />
                                                            )
                                                    ) : (
                                                        <span>{editableValue}</span>
                                                    )}
                                                </td>
                                            );
                                        })}
                                        <td className="pr-5">
                                            <TableDropDown options={generateTableOptions(editRowIndex)} />
                                        </td>
                                    </tr>
                                ))}

                                {rows?.map((row, rowIndex) => (
                                    <tr
                                        key={rowIndex}
                                        className="border-[#eaecf0] hover:bg-[#f7f7f7] text-[14px] border-b text-[#545A5D]"
                                    >
                                        {lists?.data?.column?.map((column: any, colIndex: number) => (
                                            <td key={colIndex} className={`py-6 ${colIndex === 0 ? "pl-5" : ""}`}>
                                                {/* Render inputs based on column type */}
                                                {column.type === "Text" || column.type === "Text/Number" || column.type === "Percentage" ? (
                                                    <input
                                                        type="text"
                                                        name={column.name}
                                                        value={row?.[column.name] || ""}
                                                        onChange={(e) => handleInputChange(e, rowIndex, column.name)}
                                                        placeholder={`Enter ${column.name}`}
                                                        className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                                    />
                                                ) : column.type === "Dropdown" || column.type === "Text/Dropdown" ? (
                                                    <SelectDropDown
                                                        textColor={"#545A5D"}
                                                        iconColor={"#8133F1"}
                                                        textSize={14}
                                                        tableRef={tableRef}
                                                        zIndex={10}
                                                        menuWidth={10}
                                                        label={row?.[column.name] || `Select ${column.name}`}
                                                        options={
                                                            column.name === "Status"
                                                                ? ["Active", "Inactive"]
                                                                : column.name === "Category"
                                                                    ? lists?.data?.ListCategory?.map((cat: any) => cat?.Name)
                                                                    : column.name === "SubCategory"
                                                                        ? subCategoryOptions
                                                                        : ["Option 1", "Option 2", "Option 3"]
                                                        }
                                                        onSelect={(selectedOption) =>
                                                            handleDropdownSelect(selectedOption, rowIndex, column.name) // Pass rowIndex here
                                                        }
                                                        isOpen={openFilter === `dropdown-${rowIndex}-${colIndex}`}
                                                        onToggle={() => handleToggle(`dropdown-${rowIndex}-${colIndex}`)}
                                                    />

                                                ) : column.type === "Date" ? (
                                                    <DatePicker
                                                        selected={row?.[column.name] ? new Date(row?.[column.name]) : null}
                                                        dateFormat="dd-MM-yyyy"
                                                        placeholderText="Enter Date"
                                                        className="rounded-[6px] bg-white border-0 bg-inherit h-[2.4rem] w-[90%] py-1.5 px-2 text-[14px] focus:ring-2 outline-none shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-inset focus:ring-[#8133F1]"
                                                        onChange={(date) => handleDateChange(date, rowIndex, column.name)}
                                                    />
                                                )
                                                    : (
                                                        <input
                                                            type="text"
                                                            name={column?.name}
                                                            value={row[column?.name] || ""}
                                                            onChange={(e) => handleInputChange(e, rowIndex, column?.name)}
                                                            placeholder={`Enter${column?.name}`}
                                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                                        />
                                                    )}
                                            </td>
                                        ))}
                                        <td>
                                            <TableDropDown options={generateTableOptions} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                        <button onClick={() => setRows([...rows, {}])} className="my-5 flex text-[#8133F1] gap-1 items-center">
                            <Plus size={"18px"} /> <span>Add New Row</span>
                        </button>
                    </div>
                </div>
                <div className="flex gap-5 mt-9">
                    <button onClick={handleSaveChanges} disabled={isLoading} className="bg-foundation-purple-purple-400 text-white py-4 w-[32%] rounded-[16px]">
                        {isLoading ? "Processing..." : "Save changes"}
                    </button>
                    <button onClick={handleRevertChanges} className="text-foundation-purple-purple-400 py-4 w-[32%] border rounded-[16px]">
                        Revert Changes
                    </button>
                </div>
            </main>
        </>
    );
};

export default OtherListDetails;
