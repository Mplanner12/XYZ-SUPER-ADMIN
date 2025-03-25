import { useGetGeneralJournalById } from '@/app/accounting/hooks/query';
import CustomCheckbox from '@/components/reusable/CustomCheckbox';
import LoadingOverlay from '@/components/reusable/LoadingOverlay';
import { formatCurrency, formatDateMonthAndYear } from '@/helpers/config';
import { useModal } from '@/util/Modals/ModalsContext';
import { ArrowUpNarrowWideIcon, ChevronDownIcon, ChevronLeft, ListFilterIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import TableDropDown from "../shared/TableDropDown/TableDropDown";
import DeleteModal from './DeleteModal';
import { isAxiosError } from 'axios';
import { CustomError } from '@/components/interface/errormessage';
import { toast } from 'react-toastify';
import { approveGeneralJournal, reverseGeneralJournal } from '@/app/accounting/api';


interface JournalDetailsProps {
    handleTabChange: (tab: string) => void;
    id: string | undefined;
    journals?: any
}

const ApprovedJournalDetails: React.FC<JournalDetailsProps> = ({ handleTabChange, id, journals }) => {
    const [journalId, setJournalId] = useState<string | undefined>("");
    const { openModal, closeModal } = useModal();
    const { data, refetch, isFetching } = useGetGeneralJournalById({ id: journalId || "" });
    const journalDetails = journalId ? data?.data : journals;


    const handleOpenDeleteModal = (id: string) => {
        openModal(<DeleteModal id={id} text={"Are you sure you want to delete this entries?"} />)
    }

    const handleReverseGeneralJournal = async () => {
        try {
            const response = await reverseGeneralJournal(journalId);
            if (response.status === "success") {
                toast.success("Journal reversed successfully");
                handleTabChange("approved-journal")
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

    const generateTableOptions = (id: string) => [
        { label: 'Reverse', action: () => handleReverseGeneralJournal() },
        { label: "Delete", action: () => handleOpenDeleteModal(id) },
    ];

    useEffect(() => {
        setJournalId(id);

        return () => {
            setJournalId(undefined);
        };
    }, [id])

    if (isFetching) {
        return <LoadingOverlay />;
    }

    return (
        <>
            <main className='pb-10'>
                <div className='flex justify-between my-3'>
                    <p className='text-xl font-medium cursor-pointer flex' onClick={() => handleTabChange("approved-journal")}>
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
                        <table className="min-w-[280%] md:min-w-[128%] lg:min-w-full text-[14px]">
                            <thead className="w-full">
                                <tr className="text-[#374B58] text-[12px] border-[#eaecf0]  border-b  font-[500] bg-[#F5F5F5]">
                                    <td></td>
                                    <td className="py-5 pl-5 gap-2 items-center">
                                        Date
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        Journal Type
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
                                    <td className="py-5 gap-2 pr-5 items-center">
                                        Action
                                    </td>
                                </tr>
                            </thead>

                            <tbody className="w-full bg-white">
                                {journalId
                                    ?
                                    journalDetails.entries.map((entry: any, index: number) => (
                                        <tr
                                            key={index}
                                            className="border-[#eaecf0] hover:bg-gray-200 text-[14px] border-b text-[#545A5D]"
                                        >
                                            {index === 0 && (
                                                <td className="py-6 pl-5" rowSpan={journalDetails.entries.length}>
                                                    <CustomCheckbox label="" />
                                                </td>
                                            )}
                                            <td className="py-6 pl-5 flex gap-2 items-center">
                                                {formatDateMonthAndYear(journalDetails.date)}
                                            </td>
                                            <td className="py-6 text-left">{journalDetails.type || "N/A"}</td>
                                            <td className="py-6 text-left">{entry.account_code}</td>
                                            <td className="py-6 text-left">{entry.account_name}</td>
                                            <td className="py-6 text-left">{entry.description}</td>
                                            <td className="py-6 text-left">{entry.name}</td>
                                            <td className="py-6 text-left">{formatCurrency(entry.debit_amount)}</td>
                                            <td className="py-6 text-left">{formatCurrency(entry.credit_amount)}</td>
                                            {index === 0 && (
                                                <td className="py-6 pr-5" rowSpan={journalDetails.entries.length}>
                                                    <TableDropDown options={generateTableOptions(entry?.id)} />
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                    : ""}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='flex gap-5'>
                    <button className={`bg-foundation-purple-purple-400 border-none hover:bg-foundation-purple-purple-100 w-[32%] py-3 cursor-pointer text-foundation-white-white-400 rounded-[16px]`}>
                        Save Changes
                    </button>
                    <button className={`text-foundation-purple-purple-400 hover:bg-foundation-purple-purple-100 hover:text-white w-[32%] py-3 cursor-pointer border boorder-foundation-purple-purple-400 rounded-[16px]`}>
                        Revert Changes
                    </button>
                </div>
            </main>
        </>

    );
};

export default ApprovedJournalDetails;
