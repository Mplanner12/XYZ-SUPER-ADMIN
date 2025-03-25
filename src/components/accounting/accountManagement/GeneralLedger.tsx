import CustomCheckbox from '@/components/reusable/CustomCheckbox';
import { useGetApprovedGeneralJournal } from '@/app/accounting/hooks/query';
import { useModal } from '@/util/Modals/ModalsContext';
import { useFormik } from 'formik';
import { ArrowUpNarrowWideIcon, ChevronDownIcon, ChevronUpIcon, ListFilterIcon, MessageSquareIcon, PaintBucketIcon, PrinterIcon, RotateCwIcon, SquareArrowOutUpRightIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiSearch } from 'react-icons/fi';
import PaidInvoice from './PaidInvoice';
import { formatCurrency } from '@/helpers/config';


const GeneralLedgerTab: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState("Pending-journal");
    const { openModal } = useModal();

    const [expandedSections, setExpandedSections] = useState<string[]>([]);
    const { data, isFetching } = useGetApprovedGeneralJournal();
    const journals = data?.data || [];

    const toggleSection = (sectionName: string) => {
        setExpandedSections((prev) =>
            prev.includes(sectionName)
                ? prev.filter((name) => name !== sectionName)
                : [...prev, sectionName]
        );
    };

    const handleOpenCreateOrderLinkModal = () => {
        openModal(<PaidInvoice />)
    }

    const handleDateChange = (date: Date | null) => {
        if (date) {
            formik.setFieldValue('dateFrom', date);
        }
    };

    const groupedEntries = journals.reduce((acc: any, journal: any) => {
        journal.entries.forEach((entry: any) => {
            const accountName = entry.account_name;
            if (!acc[accountName]) {
                acc[accountName] = [];
            }
            acc[accountName].push(entry);
        });
        return acc;
    }, {});

    const formik = useFormik({
        initialValues: { dateFrom: new Date() },
        // validationSchema,
        onSubmit: (values: any) => {
            //   handleSubmit(values);
        },
    });
    return (
        <>
            <main>
                <div className='flex justify-between my-3'>
                    <div className='mb-3'>
                        <p className='text-xl font-medium mb-3'>General Ledger Entries ({Object.keys(groupedEntries)?.length})</p>
                        <div className='mb-4'>
                            <div className="relative w-[50%] lg:w-[55%] mb-4 md:mb-0">
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        name="search"
                                        placeholder="Search for Journal type, Account or Name"
                                        size={70}
                                        className={
                                            "block w-full rounded-[6px] border-0 h-[3.2rem] py-1.5 pr-2 pl-9 text-[16px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-[#8133F1] focus:ring-2 placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                        }
                                    />
                                    <span>
                                        <FiSearch className="text-[22px] absolute left-2 top-[.9rem] text-[#66686B]" />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <p className='text-[17px] font-medium mb-2'>XYZ Corporation</p>
                        <div className="flex gap-2 mb-2">
                            <p className='text-[14px]'>Location: <span className='font-medium'>HQ</span></p>
                            <p className='text-[14px]'>Currency: <span className='font-medium'>USD</span> </p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <p>Date Range</p>
                            <div className='relative'>
                                <DatePicker
                                    selected={formik.values.dateFrom}
                                    dateFormat="dd/MM/yyyy"
                                    className="rounded-[6px] bg-white w-full border-0 bg-inherit h-[2.9rem] py-1.5 px-2 text-[14px] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2  outline-none focus:ring-inset focus:ring-[#8133F1]"
                                    onChange={handleDateChange}
                                />
                                <Image
                                    src='/calendar.png'
                                    className="absolute right-2 top-[.7rem]"
                                    width={18}
                                    height={18}
                                    alt="icon"
                                />
                            </div>
                            <p>to</p>
                            <div className='relative'>
                                <DatePicker
                                    selected={formik.values.dateFrom}
                                    dateFormat="dd/MM/yyyy"
                                    className="rounded-[6px] bg-white w-full border-0 bg-inherit h-[2.9rem] py-1.5 px-2 text-[14px] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2  outline-none focus:ring-inset focus:ring-[#8133F1]"
                                    onChange={handleDateChange}
                                />
                                <Image
                                    src='/calendar.png'
                                    className="absolute right-2 top-[.7rem]"
                                    width={18}
                                    height={18}
                                    alt="icon"
                                />
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        <div className='text-[15px]'>
                            <div className='text-[#8133F1] flex gap-2 justify-between mb-2'>
                                <button className='flex gap-1'>Download <Image className="ml-2" src="/download.png" width={20} height={20} alt="icon" /></button>
                                <button className='flex gap-1'>Print  <Image className="ml-2" src="/print.png" width={18} height={18} alt="icon" /></button>
                                <button className='flex gap-1'>Share  <Image className="ml-2" src="/share.png" width={18} height={18} alt="icon" /></button>
                                <button className='flex gap-1'>Customize  <Image className="ml-2" src="/customize.png" width={20} height={20} alt="icon" /></button>
                            </div>
                        </div>
                        <div className='text-[#8133F1] flex gap-5 justify-end text-[15px]'>
                            <button className='flex gap-1'>Refresh <RotateCwIcon size="16px" /></button>
                            <button className='flex gap-1'>Comment <MessageSquareIcon size="16px" /></button>
                        </div>
                    </div>
                </div>

                <div className='text-[#8133F1] flex gap-5 justify-between text-[15px]'>
                    <div className='flex gap-3'>
                        <button className='flex gap-1'>Filter <ListFilterIcon size="17px" /></button>
                        <button className='flex gap-1'>Sort <ArrowUpNarrowWideIcon size="17px" /></button>
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
                        <table className="min-w-[280%] md:min-w-[128%] lg:min-w-[130%] text-[14px]">
                            <thead className="w-full">
                                <tr className="text-[#374B58] text-[12px] border-[#eaecf0]  border-b  font-[500] bg-[#F5F5F5]">
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
                                        Related Party
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        In-transfer
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        List
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        Debit
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        Credit
                                    </td>
                                    <td className="py-5 gap-2 pr-5 items-center">
                                        Balance
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(groupedEntries).map((category) => (
                                    <React.Fragment key={category}>
                                        <tr
                                            onClick={() => toggleSection(category)}
                                            className="border-[#eaecf0] bg-[#F0F0F0] table-row-hover text-[14px] border-b text-[#545A5D] cursor-pointer"
                                        >
                                            <td colSpan={15} className="py-6 pl-5 text-left">
                                                <div className="flex items-center gap-1">
                                                    {category}
                                                    {expandedSections.includes(category) ? (
                                                        <ChevronUpIcon size="17px" />
                                                    ) : (
                                                        <ChevronDownIcon size="17px" />
                                                    )}
                                                </div>
                                            </td>
                                        </tr>

                                        {expandedSections.includes(category) &&
                                            groupedEntries[category].map((entry: any, index: any) => (
                                                <tr
                                                    key={index}
                                                    className="border-[#eaecf0] hover:bg-[#f7f7f7] text-[14px] border-b text-[#545A5D]"
                                                    // onClick={handleOpenCreateOrderLinkModal}
                                                >
                                                    <td className="py-6 pl-5 flex gap-2 items-center">
                                                        {entry.date}
                                                    </td>
                                                    <td className="py-6 text-left">{entry.journal}</td>
                                                    <td className="py-6 text-left">{entry.account_code}</td>
                                                    <td className="py-6 text-left">{entry.account_name}</td>
                                                    <td className="py-6 pl-5 flex gap-2 items-center">
                                                        {entry.description}
                                                    </td>
                                                    <td className="py-6 text-left">{entry.contact}</td>
                                                    <td className="py-6 pr-5">
                                                        <CustomCheckbox label="" checked={entry.related_party} />
                                                    </td>
                                                    <td className="py-6 pr-5">
                                                        <CustomCheckbox label="" />
                                                    </td>
                                                    <td className="py-6 text-left"></td>
                                                    <td className="py-6 text-left">{formatCurrency(entry?.debit_amount)}</td>
                                                    <td className="py-6 pr-5">{formatCurrency(entry?.credit_amount)}</td>
                                                    <td className="py-6 pr-5">{formatCurrency(entry?.balance)}</td>
                                                </tr>
                                            ))}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>

    );
};

export default GeneralLedgerTab;
