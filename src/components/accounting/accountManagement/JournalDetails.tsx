import { approveGeneralJournal, reverseGeneralJournal } from '@/app/accounting/api';
import { useGetAccountingListItemById, useGetGeneralJournalById } from '@/app/accounting/hooks/query';
import CustomCheckbox from '@/components/reusable/CustomCheckbox';
import LoadingOverlay from '@/components/reusable/LoadingOverlay';
import { formatCurrency, formatDateMonthAndYear } from '@/helpers/config';
import { useModal } from '@/util/Modals/ModalsContext';
import { ArrowUpNarrowWideIcon, ChevronDown, ChevronDownIcon, ChevronLeft, ListFilterIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import TableDropDown from "../shared/TableDropDown/TableDropDown";
import DeleteModal from './DeleteModal';
import DatePicker from 'react-datepicker';
import AccountSelectModal from './AccountSelectModal';
import SelectDropDown from '../shared/SelectDropDown/SelectDropDown';


interface JournalDetailsProps {
    handleTabChange: (tab: string) => void;
    id: string | undefined;
    initialJournalsData?: any
}

const JournalDetails: React.FC<JournalDetailsProps> = ({ handleTabChange, id, initialJournalsData }) => {
    const [journalId, setJournalId] = useState<string | undefined>("");
    const [editRowId, setEditRowId] = useState<number | null>(null);
    const [journals, setJournals] = useState(initialJournalsData);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<{ [key: string]: boolean }>({});
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [selectedAccountingListId, setSelectedAccountingListId] = useState<string | undefined>()
    const [subListItems, setSubListItems] = useState<any[]>([]);
    const [openFilter, setOpenFilter] = useState<string | null>(null);

    const { openModal, closeModal } = useModal();
    const { data: subListItem } = useGetAccountingListItemById({ id: selectedAccountingListId, });
    const { data, refetch, isFetching } = useGetGeneralJournalById({ id: journalId || "" });
    const journalDetails = journalId ? data?.data : journals;
console.log(subListItems)

    const tableRef = useRef<HTMLDivElement>(null);

    const handleEditRow = (rowId: number) => {
        setEditRowId(rowId);
    };

    const handleToggle = (filterName: string, index: number) => {
        setOpenFilter(openFilter === filterName ? null : filterName);

        if (openFilter !== filterName) {
            setSelectedAccountingListId(journals[index]?.list_id || null);
        }
    };

    const handleSaveRow = (journalIndex: number) => {
        setEditRowId(null); // Exit edit mode
        // Save logic can be implemented here (e.g., API call or state update)
    };

    const handleCancelEdit = () => {
        setEditRowId(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, journalIndex: number, entryIndex: number) => {
        const { name, value } = e.target;
        setJournals((prev: any) =>
            prev.map((journal: any, jIndex: any) =>
                jIndex === journalIndex
                    ? {
                        ...journal,
                        entries: journal.entries.map((entry: any, eIndex: any) =>
                            eIndex === entryIndex ? { ...entry, [name]: value } : entry
                        ),
                    }
                    : journal
            )
        );
    };

    const handleDateChange = (date: Date | null, journalIndex: number) => {
        setJournals((prevJournals: any) =>
            prevJournals.map((journal: any, jIndex: any) =>
                jIndex === journalIndex
                    ? {
                        ...journal,
                        date: date?.toISOString().split("T")[0] || "",
                    }
                    : journal
            )
        );
    };

    const handleOpenDeleteModal = (id: string) => {
        openModal(<DeleteModal id={id} text={"Are you sure you want to delete this entries?"} />)
    }

    const handleApproveGeneralJournal = async () => {
        try {
            const response = await approveGeneralJournal(journalId);
            if (response.status === "success") {
                toast.success("Journal approved successfully");
                handleTabChange("Pending-journal")
                closeModal();
            }
        } catch (error: any) {
            console.log(error)
            if (error) {
                toast.error((error.response.data.error || "failed to approve"));
            } else {
                toast.error("Network Error please Try Again");
            }
        }
    };

    const handleReverseGeneralJournal = async () => {
        try {
            const response = await reverseGeneralJournal(journalId);
            if (response.status === "success") {
                toast.success(response.message);
                refetch();
                closeModal();
            }
        } catch (error: any) {
            console.log(error)
            if (error) {
                toast.error((error.response.data.error || "failed to reverse"));
            } else {
                toast.error("Network Error please Try Again");
            }
        }
    };

    const handleSelectAll = () => {
        const newState: Record<string, boolean> = {};
        const selectedIds: string[] = [];
        const allSelected = !isAllSelected;
        setIsAllSelected(allSelected);

        if (journalId && journalDetails) {
            journalDetails.forEach((entry: any, index: number) => {
                newState[`entry-${index}`] = allSelected;
                if (allSelected) {
                    selectedIds.push(entry.ID);
                }
            });
        } else if (journals) {
            journals.forEach((journal: any, journalIndex: number) => {
                newState[`entry-${journalIndex}`] = allSelected;
                if (allSelected) {
                    selectedIds.push(journal.ID);
                }
            });
        }

        setSelectedCheckboxes(newState);
        console.log("Selected IDs:", selectedIds);
    };

    const handleCheckboxChange = (key: string) => {
        const updatedCheckboxes = {
            ...selectedCheckboxes,
            [key]: !selectedCheckboxes[key],
        };
        setSelectedCheckboxes(updatedCheckboxes);

        // Check if all checkboxes are now selected
        const allSelected = Object.values(updatedCheckboxes).every(Boolean);
        setIsAllSelected(allSelected);
    };

    const handleSelectAccount = (journalIndex: number, entryIndex: number) => {
        openModal(
            <AccountSelectModal
                onClose={() => closeModal()}
                onSelectAccount={(account: { account_id: string; account_name: string; account_code: string; associatedList: string[], list_id: string, }) => {
                    handleAccountSelection(account, journalIndex, entryIndex);
                }}
            />
        );
    };

    const handleAccountSelection = (
        account: { account_id: string; account_name: string; account_code: string; associatedList: string[]; list_id: string },
        journalIndex: number,
        entryIndex: number
    ) => {
        const updatedJournals = [...journals]; // Create a copy of journals
    
        // Ensure the specified journal and entry exist
        if (!updatedJournals[journalIndex] || !updatedJournals[journalIndex].entries[entryIndex]) {
            console.error(`Invalid journalIndex ${journalIndex} or entryIndex ${entryIndex}`);
            return;
        }
    
        // Update the specific entry
        updatedJournals[journalIndex].entries[entryIndex] = {
            ...updatedJournals[journalIndex].entries[entryIndex],
            account_id: account.account_id,
            account_name: account.account_name,
            account_code: account.account_code,
            associatedList: account.associatedList,
            list_id: account.list_id,
        };
    
        // Update state with the modified journals array
        setJournals(updatedJournals);
    
        // Update the selected accounting list ID
        if (account.list_id !== selectedAccountingListId) {
            setSelectedAccountingListId(account.list_id);
        }    
        console.log(updatedJournals);
    };
    
    useEffect(() => {
        setJournalId(id);

        return () => {
            setJournalId(undefined);
        };
    }, [id])

    useEffect(() => {
        if (subListItem?.data) {
            setSubListItems(subListItem.data);
        }
    }, [subListItem]);


    if (isFetching) {
        return <LoadingOverlay />;
    }

    const generateTableOptions = (id: string, journalIndex: number, entryIndex: number, entry: any) => {

        return [
            { label: 'Approve', action: () => handleApproveGeneralJournal() },
            { label: 'Reject' },
            { label: 'Reverse', action: () => handleReverseGeneralJournal() },
            { label: "Edit", action: () => handleEditRow(journalIndex) },
            { label: "Delete", action: () => handleOpenDeleteModal(id) },
        ]
    };

    return (
        <>
            <main className='pb-10'>
                <div className='flex justify-between my-3'>
                    <p className='text-xl font-medium cursor-pointer flex' onClick={() => handleTabChange("Pending-journal")}>
                        <ChevronLeft color='#8133F1' /> {journalId ? 'Journal Entry Details' : 'All Journal Entry Details '}
                    </p>
                </div>

                <div className='flex justify-between'>
                    {journalId ?
                        <div className='mb-3'>
                            <p className='text-[17px] font-medium mb-2'>XYZ Corporation</p>
                            <div className="flex gap-2 mb-2">
                                <p className='text-[15px]'>Journal Type: <span className='font-medium'>{journalDetails?.type}</span> </p>
                                <p className='text-[15px] ml-4'>Journal No: <span className='font-medium'>{journalDetails?.number}</span></p>
                            </div>
                            <div className="flex gap-2 mb-2">
                                <p className='text-[15px]'>Posted By: <span className='font-medium'>{journalDetails?.posted_by}</span> </p>
                                <p className='text-[15px] ml-4'>Location: <span className='font-medium'></span></p>
                            </div>
                            <div className="flex gap-2 mb-2">
                                <p className='text-[15px]'>Currency: <span className='font-medium'>USD</span> </p>
                                <p className='text-[15px] ml-4'>Date: <span className='font-medium'>{formatDateMonthAndYear(journalDetails?.date)}</span></p>
                            </div>
                        </div>
                        :
                        ""
                    }
                </div>
                <div className={`flex ${journalId ? 'justify-between ' : 'justify-end'} flex-wrap item-center w-[100%] mb-2`}>
                    {journalId ?
                        <div className='flex'>
                            <p className='text-[15px]'>Status: <span className='font-medium'>{journalDetails?.status}</span> </p>
                            <p className='text-[15px] ml-4'>Approved By: <span className='font-medium mr-4'>Segun adenuga</span>
                                <span className='font-medium text-[#939292] '>06-22-2022: 11:39 AM</span>
                            </p>
                        </div>
                        : ""
                    }
                    <div className='text-[#8133F1] flex gap-5 justify-between'>
                        <button className='flex gap-1'>Approve All </button>
                        <button className='flex gap-1'>Reject All </button>
                        <button className='flex gap-1'>Reverse All</button>
                        <button className='flex gap-1 text-[#E00B2B]'>Delete All</button>
                    </div>
                </div>
                <div className='text-[#8133F1] flex gap-5 flex-wrap justify-between'>
                    <div className='flex gap-3'>
                        <button className='flex gap-1'>Filter <ListFilterIcon size="17px" /></button>
                        <button className='flex gap-1'>Sort <ArrowUpNarrowWideIcon size="17px" /></button>
                        {/* <button className='flex gap-1'><span className='text-black'>Total By</span> Select Column <ChevronDownIcon size="17px" /></button> */}
                    </div>
                    <div className='flex gap-3'>
                        <button className='flex gap-1'> Showing all Column <ChevronDownIcon size="17px" /></button>
                        <button className='flex gap-1'>
                            Minimize Table
                            <Image className="mr-1" src="/resizeicon.svg" width={21} height={21} alt="icon" />
                        </button>
                    </div>
                </div>

                <div className='my-5'>
                    <div className='overflow-x-auto scrollbar-hide'>
                        <table className="min-w-[280%] md:min-w-[128%] lg:min-w-[140%] text-[14px]">
                            <thead className="w-full">
                                <tr className="text-[#374B58] text-[12px] border-[#eaecf0]  border-b  font-[500] bg-[#F5F5F5]">
                                    <td className="pl-5">
                                        {journalId ? "" : <CustomCheckbox label="" checked={isAllSelected} onChange={handleSelectAll} />}
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        Date
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        Account Code
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        Account Name
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        Description
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        Customer Name
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        Debit
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        Credit
                                    </td>
                                    <td className="py-5 w-[10%] pr-5">Sublist</td>
                                    <td className="py-5 gap-2 pr-5 items-center">
                                        Action
                                    </td>
                                </tr>
                            </thead>

                            <tbody className="w-full bg-white">
                                {journalId
                                    ?
                                    journalDetails.entries.map((entry: any, index: number) => {
                                        return (
                                            <tr
                                                key={index}
                                                className="border-[#eaecf0] hover:bg-gray-200 text-[14px] border-b text-[#545A5D]"
                                            >
                                                {index === 0 && (
                                                    <td className="py-6 pl-5" rowSpan={journalDetails.entries.length}>
                                                        <CustomCheckbox
                                                            checked={selectedCheckboxes[`entry-${index}`] || false}
                                                            onChange={() => handleCheckboxChange(`entry-${index}`)}
                                                        />
                                                    </td>
                                                )}
                                                <td className="py-6 flex gap-2 items-center">
                                                    {formatDateMonthAndYear(journalDetails.date)}
                                                </td>
                                                <td className="py-6 text-left">{entry.account_code}</td>
                                                <td className="py-6 text-left">{entry.account_name}</td>
                                                <td className="py-6 text-left">{entry.description}</td>
                                                <td className="py-6 text-left">{entry.name}</td>
                                                <td className="py-6 text-left">{formatCurrency(entry.debit_amount)}</td>
                                                <td className="py-6 text-left">{formatCurrency(entry.credit_amount)}</td>
                                                {index === 0 && (
                                                    <td className="py-6 pr-5" rowSpan={journalDetails.entries.length}>
                                                        <TableDropDown options={generateTableOptions(entry?.id, 0, index, entry)} />
                                                    </td>
                                                )}
                                            </tr>
                                        )
                                    })
                                    :
                                    journals.map((journal: any, journalIndex: number) => (
                                        <React.Fragment key={journalIndex}>
                                            {journal.entries.map((entry: any, entryIndex: number) => {
                                                const isEditing = journalIndex === editRowId;
                                                return (
                                                    <tr
                                                        key={entryIndex}
                                                        className="border-[#eaecf0] hover:bg-gray-200 text-[14px] border-b text-[#545A5D]"
                                                    >
                                                        {entryIndex === 0 && (
                                                            <td className="py-6 pl-5" rowSpan={journal.entries.length}>
                                                                <CustomCheckbox
                                                                    checked={selectedCheckboxes[`entry-${journalIndex}`] || false}
                                                                    onChange={() => handleCheckboxChange(`entry-${journalIndex}`)}
                                                                />
                                                            </td>
                                                        )}
                                                        <td className="py-6 flex gap-2 items-center">
                                                            {isEditing ? (
                                                                <DatePicker
                                                                    selected={journal.date ? new Date(journal.date) : null}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="Enter Date"
                                                                    className="rounded-[6px] bg-white border-0 bg-inherit h-[2.4rem] w-[90%] py-1.5 px-2 text-[14px] focus:ring-2 outline-none shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-inset focus:ring-[#8133F1]"
                                                                    onChange={(date: any) => handleDateChange(date, journalIndex)}
                                                                />
                                                            ) : (
                                                                formatDateMonthAndYear(journal.date)
                                                            )}
                                                        </td>
                                                        <td className="py-6 text-left">
                                                            {isEditing ? (
                                                                <input
                                                                    type="text"
                                                                    name="account_code"
                                                                    className={
                                                                        "block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                                                    }
                                                                    value={entry.account_code || ""}
                                                                    onChange={(e) => handleInputChange(e, journalIndex, entryIndex)}
                                                                />
                                                            ) : (
                                                                entry.account_code
                                                            )}
                                                        </td>
                                                        <td className="py-6 text-left">
                                                            {isEditing ? (
                                                                <div className="relative" onClick={() => handleSelectAccount(journalIndex, entryIndex)}>
                                                                    <input
                                                                        type="text"
                                                                        name="account_name"
                                                                        value={entry.account_name || 'Select Account'}
                                                                        className="w-full pl-2 pr-8 cursor-pointer focus:ring-[#8133F1] outline-none"
                                                                        readOnly
                                                                    />
                                                                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-600">
                                                                        <ChevronDown />
                                                                    </span>
                                                                </div>
                                                            ) : (
                                                                entry.account_name
                                                            )}
                                                        </td>

                                                        <td className="py-6 text-left">
                                                            {isEditing ? (
                                                                <input
                                                                    type="text"
                                                                    name="description"
                                                                    className={
                                                                        "block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                                                    }
                                                                    value={entry.description || ""}
                                                                    onChange={(e) => handleInputChange(e, journalIndex, entryIndex)}
                                                                />
                                                            ) : (
                                                                entry.description
                                                            )}
                                                        </td>
                                                        <td className="py-6 text-left">
                                                            {isEditing ? (
                                                                <input
                                                                    type="text"
                                                                    name="name"
                                                                    className={
                                                                        "block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                                                    }
                                                                    value={entry.customer_name || ""}
                                                                    onChange={(e) => handleInputChange(e, journalIndex, entryIndex)}
                                                                />
                                                            ) : (
                                                                entry.customer_name
                                                            )}
                                                        </td>
                                                        <td className="py-6 text-left">
                                                            {isEditing ? (
                                                                <input
                                                                    type="number"
                                                                    name="debit_amount"
                                                                    className={
                                                                        "block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                                                    }
                                                                    value={entry.debit_amount || 0}
                                                                    onChange={(e) => handleInputChange(e, journalIndex, entryIndex)}
                                                                />
                                                            ) : (
                                                                formatCurrency(entry.debit_amount)
                                                            )}
                                                        </td>
                                                        <td className="py-6 text-left">
                                                            {isEditing ? (
                                                                <input
                                                                    type="number"
                                                                    name="credit_amount"
                                                                    className={
                                                                        "block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                                                    }
                                                                    value={entry.credit_amount || 0}
                                                                    onChange={(e) => handleInputChange(e, journalIndex, entryIndex)}
                                                                />
                                                            ) : (
                                                                formatCurrency(entry.credit_amount)
                                                            )}
                                                        </td>
                                                        <td className="py-6 text-left">
                                                            {isEditing ? (
                                                                <div>
                                                                    <SelectDropDown
                                                                        textColor={"#545A5D"}
                                                                        iconColor={"#8133F1"}
                                                                        tableRef={tableRef}
                                                                        textSize={14}
                                                                        zIndex={10}
                                                                        menuWidth={9}
                                                                        label={journals?.entries?.associatedList?.length ? "" : ""}
                                                                        options={
                                                                            (subListItems?.some((item: any) =>
                                                                                Object.keys(item).some(key => key.endsWith("_name"))
                                                                            )
                                                                                ? subListItems?.map((item: any) => {
                                                                                    const nameKey = Object.keys(item).find(key => key.endsWith("_name"));
                                                                                    return nameKey ? item[nameKey] : null;
                                                                                }).filter(Boolean)
                                                                                : ["No sublist found"]
                                                                            )
                                                                        }                                                                        
                                                                        onSelect={(option) => {
                                                                            console.log("Selected option:", option);
                                                                        }}
                                                                        isOpen={openFilter === `sublist-${entryIndex}`}
                                                                        onToggle={() => handleToggle(`sublist-${entryIndex}`, entryIndex)}
                                                                    />
                                                                </div>
                                                            ) : (
                                                                formatCurrency(entry.credit_amount)
                                                            )}
                                                        </td>
                                                        {entryIndex === 0 && (
                                                            <td className="py-6 pr-5" rowSpan={journal.entries.length}>
                                                                <TableDropDown options={generateTableOptions(entry?.id, journalIndex, entryIndex, entry)} />
                                                            </td>
                                                        )}
                                                    </tr>
                                                );
                                            })}
                                        </React.Fragment>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='flex gap-5'>
                    <button className={`bg-foundation-purple-purple-400 border-none hover:bg-foundation-purple-purple-100 w-[32%] py-3 cursor-pointer text-foundation-white-white-400 rounded-[16px]`}>
                        Save Changes
                    </button>
                    <button onClick={handleCancelEdit} className={`text-foundation-purple-purple-400 hover:bg-foundation-purple-purple-100 hover:text-white w-[32%] py-3 cursor-pointer border boorder-foundation-purple-purple-400 rounded-[16px]`}>
                        Revert Changes
                    </button>
                </div>
            </main>
        </>

    );
};

export default JournalDetails;
