import { useModal } from '@/util/Modals/ModalsContext';
import { useFormik } from 'formik';
import { ArrowUpNarrowWideIcon, ChevronDownIcon, ForwardIcon, ListFilterIcon, MessageSquareIcon, PaintBucketIcon, PrinterIcon, RotateCwIcon, SquareArrowOutUpRightIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const CashFlowStatementTab: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState("Pending-journal");
    const { openModal } = useModal();

    const handleTabChange = (tab: string) => {
        setSelectedTab(tab);
    };

    const handleDateChange = (date: Date | null) => {
        if (date) {
            formik.setFieldValue('dateFrom', date);
        }
    };

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
                    <div>
                        <p className='text-xl font-medium mb-3'>Cash Flow Statement</p>
                        <p className='text-[14px] mb-3'>As of May 31, 2024</p>
                        <p className='text-[17px] font-medium mb-2'>XYZ Corporation</p>
                        <div className="flex gap-2 mb-2">
                            <p className='text-[14px]'>Location: <span className='font-medium'>HQ</span></p>
                            <p className='text-[14px]'>Currency: <span className='font-medium'>USD</span> </p>
                        </div>
                    </div>
                </div>

                <div className='flex items-center justify-between gap-[6.6rem] mb-3'>
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
                    <div className='text-[15px]'>
                        <div className='text-[#8133F1] flex gap-2 justify-between mb-5'>
                            <button className='flex gap-1'>Download <Image className="ml-2" src="/download.png" width={20} height={20} alt="icon" /></button>
                            <button className='flex gap-1'>Print  <Image className="ml-2" src="/print.png" width={18} height={18} alt="icon" /></button>
                            <button className='flex gap-1'>Share  <Image className="ml-2" src="/share.png" width={18} height={18} alt="icon" /></button>
                        </div>
                        <div className='text-[#8133F1] flex gap-2 justify-end mb-2'>
                            <button className='flex gap-1'>Customize  <Image className="ml-2" src="/customize.png" width={20} height={20} alt="icon" /></button>
                            <button className='flex gap-1'>Refresh <RotateCwIcon size="18px" /></button>
                            <button className='flex gap-1'>Comment <MessageSquareIcon size="18px" /></button>
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
                        <table className="min-w-[280%] md:min-w-[128%] lg:min-w-full text-[14px]">
                            <thead className="w-full">
                                <tr className="text-[#374B58] text-[12px] border-[#eaecf0]  border-b  font-[500] bg-[#F5F5F5]">
                                    <td className="py-5 pl-5 gap-2 items-center">
                                        Account Code
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        Account Name
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        Amount(USD)
                                    </td>
                                </tr>
                            </thead>

                            <tbody className="w-full bg-white">
                                <tr className=" border-[#eaecf0] bg-[#F0F0F0] table-row-hover text-[14px] border-b text-[#545A5D]">
                                    <td className="py-6 pl-5 text-left ">
                                        <div className="flex items-center gap-1">
                                            Cash Flows from Operating Activities  <ChevronDownIcon size="17px" />
                                        </div>
                                    </td>
                                    <td className="py-6  text-left ">

                                    </td>

                                    <td className=" py-6 pr-5">

                                    </td>
                                </tr>
                                <tr className=" border-[#eaecf0] hover:bg-[#F2F8FF] text-[14px] border-b text-[#545A5D]">
                                    <td className="py-6 pl-5 text-left ">
                                        400101
                                    </td>
                                    <td className="py-6  text-left ">
                                        Sales Revenue
                                    </td>

                                    <td className=" py-6 pr-5">
                                        1000
                                    </td>
                                </tr>
                                <tr className=" border-[#eaecf0] border-b hover:bg-[#F2F8FF] text-[14px]  text-[#545A5D]">
                                    <td className="py-6 pl-5 text-left ">

                                    </td>
                                    <td className="py-6  text-left ">
                                        Total
                                    </td>

                                    <td className="py-6 border-[#8A8A8A] border-t-2 pr-5">
                                        1000
                                    </td>
                                </tr>
                                <tr className=" border-[#eaecf0] bg-[#F0F0F0] table-row-hover text-[14px] border-b text-[#545A5D]">
                                    <td className="py-6 pl-5 text-left ">
                                        <div className="flex items-center gap-1">
                                            Cash Flows from Investing Activities <ChevronDownIcon size="17px" />
                                        </div>
                                    </td>

                                    <td className="py-6  text-left ">

                                    </td>
                                    <td className=" py-6 pr-5">

                                    </td>
                                </tr>
                                <tr className=" border-[#eaecf0] hover:bg-[#F2F8FF] text-[14px] border-b text-[#545A5D]">
                                    <td className="py-6 pl-5 text-left ">
                                        400101
                                    </td>
                                    <td className="py-6  text-left ">
                                        Sales Revenue
                                    </td>

                                    <td className=" py-6 pr-5">
                                        1000
                                    </td>
                                </tr>
                                <tr className=" border-[#eaecf0] border-b hover:bg-[#F2F8FF] text-[14px]  text-[#545A5D]">
                                    <td className="py-6 pl-5 text-left ">

                                    </td>
                                    <td className="py-6  text-left ">
                                        Total
                                    </td>

                                    <td className="py-6 border-[#8A8A8A] border-t-2 pr-5">
                                        1000
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>

    );
};

export default CashFlowStatementTab;
