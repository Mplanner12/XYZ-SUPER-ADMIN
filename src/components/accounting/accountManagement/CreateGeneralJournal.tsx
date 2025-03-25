import { useCreateGeneralJournal } from "@/app/accounting/hooks/mutate";
import { useGetAccountingListItemById } from "@/app/accounting/hooks/query";
import CustomCheckbox from "@/components/reusable/CustomCheckbox";
import { useModal } from '@/util/Modals/ModalsContext';
import { ChevronDown, ChevronDownIcon, ChevronLeftIcon, Paperclip, Plus, Save, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { LuCopyPlus } from "react-icons/lu";
import { toast } from "react-toastify";
import SelectDropDown from '../shared/SelectDropDown/SelectDropDown';
import AccountSelectModal from "./AccountSelectModal";


interface ProcedureChecklistTabProps {
    goBack: () => void;
}

const CreateGeneralJournalTab: React.FC<ProcedureChecklistTabProps> = ({ goBack }) => {
    const [openFilter, setOpenFilter] = useState<string | null>(null);
    const { openModal, closeModal } = useModal();
    const [randomCode, setRandomCode] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [subListItems, setSubListItems] = useState<any[]>([]);
    const { mutate } = useCreateGeneralJournal();
    const [selectedAccountingListId, setSelectedAccountingListId] = useState<string | undefined>()
    const { data: subListItem } = useGetAccountingListItemById({ id: selectedAccountingListId, });
    const { data: customerList } = useGetAccountingListItemById({ id: '96' });


    const tableRef = useRef<HTMLDivElement>(null);

    const [rows, setRows] = useState<any[]>([
        {
            account_code: "",
            date: "",
            description: "",
            debit: "",
            credit: "",
            billable: false,
            customer_name: "",
            account_name: "",
            related_party: false,
        },
        {
            account_code: "",
            date: "",
            description: "",
            debit: "",
            credit: "",
            billable: false,
            customer_name: "",
            account_name: "",
            related_party: false,
        },
    ]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;

        const updatedRows = [...rows];

        if (name === "description") {
            updatedRows[index] = {
                ...updatedRows[index],
                [name]: value,
            };
        } else {
            let rawValue = value.replace(/\D/g, "");
            const formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const displayValue = rawValue ? `₦ ${formattedValue}` : "";

            updatedRows[index] = {
                ...updatedRows[index],
                [name]: rawValue,
                ...(name === "debit" && rawValue ? { credit: "" } : {}),
                ...(name === "credit" && rawValue ? { debit: "" } : {}),
            };

            e.target.value = displayValue;
        }

        setRows(updatedRows);
    };

    const handleCheckboxChange = (index: any) => {
        const updatedRows = [...rows];
        updatedRows[index].related_party = !updatedRows[index].related_party;
        setRows(updatedRows);
    };

    const handleToggle = (filterName: string, index: number) => {
        setOpenFilter(openFilter === filterName ? null : filterName);

        if (openFilter !== filterName) {
            setSelectedAccountingListId(rows[index]?.list_id || null);
        }
    };

    const handleJournalSelect = (selectedOption: boolean, index: number) => {
        const updatedRows = [...rows];
        updatedRows[index] = {
            ...updatedRows[index],
            billable: selectedOption
        };
        setRows(updatedRows);
    };

    const handleDateChange = (date: Date | null, rowIndex: number) => {
        if (!date) return; 
    
        const newDate = date.toISOString().split("T")[0];
    
        const updatedRows = rows.map((row, index) => {
            if (rowIndex === 0) {
                return { ...row, date: newDate };
            }
            if (index === rowIndex) {
                return { ...row, date: newDate };
            }
            return row; 
        });
    
        setRows(updatedRows);
    };

    const handleNameSelect = (selectedOption: string, index: number) => {
        const updatedRows = [...rows];
        updatedRows[index] = { ...updatedRows[index], customer_name: selectedOption };
        setRows(updatedRows);
    };

    const handlePostJournal = () => {
        setLoading(true);

        const lastRow = rows[rows.length - 1];

        if (
            lastRow.account_code &&
            lastRow.date &&
            (lastRow.debit || lastRow.credit) &&
            lastRow.account_name
        ) {
            if (lastRow.billable && !lastRow.customer_name) {
                setLoading(false);
                toast.error("Please select a customer name for billable entries.");
                return;
            }

            const formattedEntries = rows.map((row) => {
                const entry: any = {
                    account_id: row.account_id || null,
                    billable: row.billable,
                    customer_list_id: row.customer_list_id || null,
                    customer_name: row.customer_name || "",
                    description: row.description || "",
                    in_transfer: row.in_transfer || false,
                    related_party: row.related_party || false,
                    credit_amount: row.credit ? parseFloat(row.credit) : null,
                    debit_amount: row.debit ? parseFloat(row.debit) : null,
                };

                return entry;
            });

            const payload = {
                date: lastRow.date,
                entries: formattedEntries,
                number: randomCode,
                type: "General journal",
            }; 10

            mutate(payload, {
                onSuccess: () => {
                    setLoading(false);
                    toast.success("Journal successfully created.");
                    clearAllRows();
                },
                onError: () => {
                    setLoading(false);
                },
            });
        } else {
            setLoading(false);
            toast.error("Please fill in all the required fields.");
        }
    };

    const handlePostAndCreateNewJournal = () => {
        setLoading(true);

        const lastRow = rows[rows.length - 1];

        if (
            lastRow.account_code &&
            lastRow.date &&
            lastRow.description &&
            (lastRow.debit || lastRow.credit) &&
            lastRow.billable !== undefined &&
            lastRow.location &&
            lastRow.account_name
        ) {
            if (lastRow.billable && !lastRow.customer_name) {
                setLoading(false);
                toast.error("Please select a customer name for billable entries.");
                return;
            }

            const formattedEntries = rows.map((row) => {
                const entry: any = {
                    account_id: row.account_id,
                    billable: row.billable,
                    customer_list_id: row.customer_list_id,
                    customer_name: row.customer_name,
                    description: row.description,
                    in_transfer: row.in_transfer,
                    related_party: row.related_party,
                };

                if (row.credit) {
                    entry.credit_amount = parseFloat(row.credit);
                }

                if (row.debit) {
                    entry.debit_amount = parseFloat(row.debit);
                }

                return entry;
            });

            const payload = {
                date: lastRow.date,
                entries: formattedEntries,
                number: randomCode,
                type: "General journal",
            };

            setLoading(false);
            mutate(payload);

            const newRow = {
                account_code: "",
                date: new Date(),
                description: "",
                debit: "",
                credit: "",
                billable: false,
                customer_name: "",
                account_name: "",
            };

            setRows([...rows, newRow]);
        } else {
            setLoading(false);
            toast.error("Please fill in all the required fields.");
        }
    };

    const addNewRow = () => {
        const currentDate = rows[0]?.date || new Date().toISOString().split("T")[0]; // Use the first row's date if it exists

        setRows([
            ...rows,
            {
                account_code: "",
                date: currentDate, // Use the consistent date
                description: "",
                debit: "",
                credit: "",
                billable: "",
                customer_name: "",
                account_name: "",
            },
        ]);
    };

    const clearAllRows = () => {
        const currentDate = new Date();
        if (rows.length > 0) {
            const clearedRows = rows.map(row => ({
                account_code: "",
                date: currentDate.toISOString().split("T")[0],
                description: "",
                debit: "",
                credit: "",
                billable: "",
                customer_name: "",
                account_name: "",
            }));
            setRows(clearedRows);
        } else {
            alert("No rows to clear.");
        }
    };

    const totalDebit = rows.reduce((sum, row) => {
        const debitValue = parseFloat(row.debit) || 0;
        return sum + debitValue;
    }, 0);

    const totalCredit = rows.reduce((sum, row) => {
        const creditValue = parseFloat(row.credit) || 0;
        return sum + creditValue;
    }, 0);

    const handleSelectAccount = (index: number) => {
        openModal(
            <AccountSelectModal
                onClose={() => closeModal()}
                onSelectAccount={(account: { account_id: string; account_name: string; account_code: string; associatedList: string[], list_id: string, }) => {
                    handleAccountSelection(account, index);
                }}
            />
        );
    };

    const handleAccountSelection = (account: { account_id: string; account_name: string; account_code: string; associatedList: string[], list_id: string, }, index: number) => {
        const updatedRows = [...rows];
        updatedRows[index].account_id = account.account_id;// update account id
        updatedRows[index].account_name = account.account_name;
        updatedRows[index].account_code = account.account_code;
        updatedRows[index].associatedList = account.associatedList;
        updatedRows[index].list_id = account.list_id;
        setRows(updatedRows);

        setSelectedAccountingListId(updatedRows[index].list_id);
    };

    useEffect(() => {
        const generateRandomCode = (): string => {
            const prefix = "M GJN";
            const randomNumber = Math.floor(1000 + Math.random() * 9000);
            return `${prefix}${randomNumber}`;
        };

        const newCode = generateRandomCode();
        setRandomCode(newCode);

        const currentDate = new Date();

        setRows((prevRows) =>
            prevRows.map((row) => ({
                ...row,
                date: currentDate.toISOString().split("T")[0],
            }))
        );

    }, []);

    useEffect(() => {
        if (subListItem?.data) {
            setSubListItems(subListItem.data);
        }
    }, [subListItem]);

    return (
        <>
            <main className='pb-10'>
                <div className='flex justify-between items-baseline mt-3 mb-12'>
                    <p onClick={goBack} className='text-xl cursor-pointer mb-1 flex items-center font-medium'>
                        <ChevronLeftIcon size={"18px"} color="#8133F1" />
                        <span> Create a General Journal</span>
                    </p>
                    <div>
                        <div className='text-[#8133F1] flex gap-5 mb-6 justify-between text-[15px]'>
                            <button className='flex gap-1'>New <Plus size="17px" /></button>
                            <button className='flex gap-1'>Save <Save size="17px" /></button>
                            <button className='flex gap-1'>Create A Copy <LuCopyPlus size="17px" /></button>
                            <button className='flex gap-1'>Delete <Trash2 size="17px" /></button>
                        </div>
                        <div className='text-[#8133F1] flex gap-5 justify-end text-[16px]'>
                            <button className='flex gap-1'>Print   <Image className="mr-1" src="/print.png" width={18} height={18} alt="icon" /></button>
                            <button className='flex gap-1'>Attach <Paperclip size="17px" /></button>
                            <button className='flex gap-1'>
                                Memorize
                                <Image className="mr-1" src="/head.png" width={21} height={21} alt="icon" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className='flex justify-between'>
                    <div className='mb-3'>
                        <p className='text-xl font-medium mb-2'>XYZ Corporation</p>
                        <div className="flex gap-2">
                            <p className='text-[14px]'>Location: <span className='font-medium'>NY</span> </p>
                            <p className='text-[14px]'>Entry No: <span className='font-medium'>{randomCode}</span></p>
                        </div>
                        <div className="flex gap-2">
                            <p className='text-[14px]'>Currency: <span className='font-medium'>USD</span> </p>
                            <p className='text-[14px]'>Date: <span className='font-medium'>{new Date().toLocaleDateString('en-GB')}  </span></p>
                        </div>
                    </div>
                </div>

                <div className='mb-4'>
                    <p className='text-[14px] font-medium mb-2'>Prepared by</p>
                    <div className=' w-[300px]'>
                        <input
                            type="text"
                            name="search"
                            placeholder="Enter your name"
                            size={70}
                            className={
                                "block w-full rounded-[6px] border-0 h-[2.9rem] py-1.5 pr-2 pl-4 text-[16px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                            }
                        />
                    </div>
                </div>

                <div className='text-[#8133F1] flex gap-5 justify-end text-[15px]'>
                    <button className='flex gap-1'>Showing all columns <ChevronDownIcon size="17px" /></button>
                </div>

                <div className="my-5">
                    <div className="overflow-x-auto scrollbar-hide" ref={tableRef}>
                        <table className="min-w-[280%] md:min-w-[128%] lg:min-w-[140%] text-[14px]">
                            <thead className="w-full">
                                <tr className="text-[#374B58] text-[12px] border-[#eaecf0] border-b font-[500] bg-[#F5F5F5]">
                                    <td className="py-5 pl-5 w-[8%]">Date</td>
                                    <td className="py-5 w-[8%]">Account Code</td>
                                    <td className="py-5 w-[8%]">Account Name</td>
                                    <td className="py-5 w-[12%]">Description</td>
                                    <td className="py-5 w-[10%]">Debit</td>
                                    <td className="py-5 w-[10%]">Credit</td>
                                    <td className="py-5 w-[10%]">Billable</td>
                                    <td className="py-5 w-[10%]">Customer Name</td>
                                    <td className="py-5 w-[6%]">Related Party</td>
                                    <td className="py-5 w-[10%] pr-5">Sublist</td>
                                </tr>
                            </thead>

                            <tbody className="w-full bg-white">
                                {rows.map((row, index: any) => (
                                    <tr
                                        key={index}
                                        className="border-[#eaecf0] hover:bg-gray-200 text-[14px] border-b text-[#545A5D]"
                                    >
                                        <td className="py-6 pl-5">
                                            <DatePicker
                                                selected={row.date ? new Date(row.date) : null}
                                                dateFormat="dd-MM-yyyy"
                                                placeholderText="Enter Date"
                                                className="rounded-[6px] bg-white border-0 bg-inherit h-[2.4rem] w-[90%] py-1.5 px-2 text-[14px] focus:ring-2 outline-none shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-inset focus:ring-[#8133F1]"
                                                onChange={(date) => handleDateChange(date, index)}
                                            />
                                        </td>
                                        <td className="py-6">
                                            <input
                                                type="text"
                                                name="account_code"
                                                value={row.account_code}
                                                onChange={(e) => handleInputChange(e, index)}
                                                placeholder="Enter Code"
                                                className={
                                                    "block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                                }
                                            />
                                        </td>
                                        <td className="py-6 text-left" onClick={() => handleSelectAccount(index)}>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={row.account_name || 'Select Account'}
                                                    className="w-full pl-2 pr-8 cursor-pointer focus:ring-[#8133F1] outline-none"
                                                    readOnly
                                                />
                                                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-600">
                                                    <ChevronDown />
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-6">
                                            <input
                                                type="text"
                                                name="description"
                                                value={row.description}
                                                onChange={(e) => handleInputChange(e, index)}
                                                placeholder="Enter Description"
                                                className={
                                                    "block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                                }
                                            />
                                        </td>
                                        <td className="py-6">
                                            <input
                                                type="text"
                                                name="debit"
                                                value={
                                                    row.debit
                                                        ? row.debit.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                                        : ""
                                                }
                                                onChange={(e) => handleInputChange(e, index)}
                                                placeholder="Enter Debit"
                                                className={
                                                    "block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                                }
                                            />
                                        </td>
                                        <td className="py-6">
                                            <input
                                                type="text"
                                                name="credit"
                                                value={
                                                    row.credit
                                                        ? row.credit.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                                        : ""
                                                }
                                                onChange={(e) => handleInputChange(e, index)}
                                                placeholder="Enter Credit"
                                                className={
                                                    "block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                                }
                                            />
                                        </td>
                                        <td className="py-6">
                                            <SelectDropDown
                                                textColor={"#545A5D"}
                                                iconColor={"#8133F1"}
                                                tableRef={tableRef}
                                                textSize={14}
                                                zIndex={10}
                                                menuWidth={10}
                                                label={rows[index]?.billable ? "Yes" : "No"}
                                                options={["Yes", "No"]}
                                                onSelect={(selectedOption) => {
                                                    const booleanValue = selectedOption === "Yes";
                                                    handleJournalSelect(booleanValue, index);
                                                }}
                                                isOpen={openFilter === `billable-${index}`}
                                                onToggle={() => handleToggle(`billable-${index}`, index)}
                                            />
                                        </td>
                                        <td className="py-6">
                                            {row.billable ? (
                                                <SelectDropDown
                                                    textColor={"#545A5D"}
                                                    iconColor={"#8133F1"}
                                                    tableRef={tableRef}
                                                    textSize={14}
                                                    zIndex={10}
                                                    menuWidth={10}
                                                    label={row.customer_name || "Select Name"}
                                                    options={
                                                        customerList
                                                            ? customerList?.data?.some((item: any) =>
                                                                Object.keys(item).some((key) => key.endsWith("_name"))
                                                            )
                                                                ? customerList?.data
                                                                    ?.map((item: any) => {
                                                                        const nameKey = Object.keys(item).find((key) =>
                                                                            key.endsWith("_name")
                                                                        );
                                                                        return nameKey ? item[nameKey] : null;
                                                                    })
                                                                    .filter(Boolean)
                                                                : ["No sublist found"]
                                                            : [""]
                                                    }
                                                    onSelect={(selectedOption) => handleNameSelect(selectedOption, index)}
                                                    isOpen={openFilter === `customer_name-${index}`}
                                                    onToggle={() => handleToggle(`customer_name-${index}`, index)}
                                                />
                                            ) : (
                                                <span className="text-[#B0B2B6] text-[14px]">N/A</span>
                                            )}
                                        </td>
                                        <td className="py-6">
                                            <CustomCheckbox
                                                checked={row.related_party}
                                                onChange={() => handleCheckboxChange(index)}
                                            />
                                        </td>
                                        <td className="py-6 pr-5">
                                            <SelectDropDown
                                                textColor={"#545A5D"}
                                                iconColor={"#8133F1"}
                                                tableRef={tableRef}
                                                textSize={14}
                                                zIndex={10}
                                                menuWidth={9}
                                                label={row.associatedList?.length ? "" : ""}
                                                options={
                                                    row.associatedList?.length
                                                        ? (subListItems?.some((item: any) =>
                                                            Object.keys(item).some(key => key.endsWith("_name"))
                                                        )
                                                            ? subListItems?.map((item: any) => {
                                                                const nameKey = Object.keys(item).find(key => key.endsWith("_name"));
                                                                return nameKey ? item[nameKey] : null;
                                                            }).filter(Boolean)
                                                            : ["No sublist found"]
                                                        )
                                                        : [""]
                                                }
                                                onSelect={(option) => {
                                                    console.log("Selected option:", option);
                                                }}
                                                isOpen={openFilter === `sublist-${index}`}
                                                onToggle={() => handleToggle(`sublist-${index}`, index)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                                {/* Totals Row */}
                                <tr className="border-[#eaecf0] text-[14px] border-b text-[#545A5D]">
                                    <td className="py-6 pl-5"></td>
                                    <td className="py-6"></td>
                                    <td className="py-6"></td>
                                    <td className="py-6 font-semibold">Total</td>
                                    <td className="py-6 font-semibold">
                                        {totalDebit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                    <td className="py-6 font-semibold">
                                        {totalCredit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                    <td className="py-6"></td>
                                    <td className="py-6"></td>
                                    <td className="py-6"></td>
                                    <td className="py-6"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>
                    <span className="flex items-center text-[#8133F1] mb-4 cursor-pointer" onClick={addNewRow}>
                        <Image className="mr-2" src="/plus.png" width={23} height={23} alt="icon" /> Add a new entry
                    </span>
                </div>

                <div className='flex gap-5'>
                    <button onClick={handlePostJournal} className={"bg-foundation-purple-purple-400 border-none hover:bg-foundation-purple-purple-100 w-[32%] py-4 cursor-pointer text-foundation-white-white-400 rounded-[16px]"}>
                        {loading ? "Processing..." : "Post General Journal"}
                    </button>
                    <button onClick={handlePostAndCreateNewJournal} className={"text-foundation-purple-purple-400 hover:bg-foundation-purple-purple-100 hover:text-white w-[32%] py-4 cursor-pointer border boorder-foundation-purple-purple-400 rounded-[16px]"}>
                        {loading ? "Processing..." : "Post & Create New General Journal"}
                    </button>
                    <button onClick={clearAllRows} className={" text-foundation-purple-purple-400 border-none hover:text-white hover:bg-foundation-purple-purple-100 w-[32%] py-3 cursor-pointer rounded-[16px]"}>
                        Clear field
                    </button>
                </div>
            </main>
        </>
    );
};

export default CreateGeneralJournalTab;