import ActionButton from '@/components/Buttons/ActionButton';
import TransparentButton from '@/components/Buttons/TransparentButton';
import CustomCheckbox from '@/components/reusable/CustomCheckbox';
import CustomSelect from '@/components/reusable/CustomSelect';
import { useModal } from '@/util/Modals/ModalsContext';
import { useFormik } from 'formik';
import { Paperclip, Pen, Plus, Printer, PrinterIcon, Save, SquareArrowOutUpRightIcon, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LuCopyPlus } from "react-icons/lu";


const PaidInvoice: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState("account-details");
    const { closeModal } = useModal();


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

    const jobType = [{
        listItem: "Engineer",
    }]

    return (
        <div className="fixed  top-0 left-0 z-50 w-full h-full bg-[#434343] bg-opacity-50 flex justify-center overflow-y-auto items-center">
            <div className='relative mt-[34rem] mx-20 lg:mt-[37rem] mb-10'>
                <button
                    onClick={closeModal}
                    className="absolute bg-white h-10 -top-12 -right-10 text-gray-500 hover:text-gray-700 cursor-pointer w-10 justify-center items-center mx-auto flex rounded-full">
                    <X className='text-primary-normal' />
                </button>
                <div className="bg-white p-6 rounded-2xl shadow-md lg:max-w-[96rem] relative overflow-auto">

                    <div className='pt-2 pb-4 border-b border-[#BCBBBB] mb-5'>
                        <div className='text-[#8133F1] flex gap-3 mb-5'>
                            <button className='flex gap-1'>Find <SquareArrowOutUpRightIcon size="16px" /></button>
                            <button className='flex gap-1'>New <Plus size="17px" /></button>
                            <button className='flex gap-1'>Save <Save size="17px" /></button>
                            <button className='flex gap-1'>Create A Copy <LuCopyPlus size="17px" /></button>
                            <button className='flex gap-1'>Delete <Trash2 size="17px" /></button>
                            <button className='flex gap-1'>Print <Printer size="17px" /></button>
                            <button className='flex gap-1'>Attach <Paperclip size="17px" /></button>
                        </div>
                        <div className='text-[#8133F1] flex gap-3'>
                            <button className='flex gap-1'>Memorize
                                <Image className="mr-1" src="/head.png" width={21} height={21} alt="icon" />
                            </button>
                            <button className='flex gap-1'>Mark as pending <PrinterIcon size="16px" /></button>
                        </div>
                    </div>
                    <p className='text-[16px] font-medium mb-3'>Invoice</p>
                    <div className="flex gap-8">
                        <div className="w-[70%]">
                            <span className='flex gap-1 text-[#00A814] mb-5'>
                                <Image className="mr-1" src="/check-mark.png" width={21} height={21} alt="icon" />
                                Paid
                            </span>
                            <div className='flex items-center gap-2 mb-3'>
                                <p className='mr-[39px]'>Date</p>
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
                                <p> Bill To</p>
                                <div className="rounded-[6px] flex flex-col justify-center bg-white w-[24%] border border-[#E9EAF0] bg-inherit h-[2.9rem] py-1.5 px-2 text-[14px]">
                                    Aaron Davies
                                </div>

                                <div className="rounded-[6px] flex flex-col justify-center bg-white w-[24%] border border-[#E9EAF0] bg-inherit h-[2.9rem] py-1.5 px-2 text-[14px]">
                                    92104 Milford Way, Millbrae, CA 94030
                                </div>
                            </div>
                            <div className='flex items-center gap-2 mb-3'>
                                <p>Invoice No</p>
                                <div className="rounded-[6px] bg-white w-[27%] flex flex-col justify-center border border-[#E9EAF0] bg-inherit h-[2.9rem] py-1.5 px-2 text-[14px]">
                                    14345
                                </div>
                                <p> Ship To</p>
                                <div className="rounded-[6px] flex flex-col justify-center bg-white w-[24%] border border-[#E9EAF0] bg-inherit h-[2.9rem] py-1.5 px-2 text-[14px]">
                                    Aaron Davies
                                </div>

                                <div className="rounded-[6px] flex flex-col justify-center bg-white w-[24%] border border-[#E9EAF0] bg-inherit h-[2.9rem] py-1.5 px-2 text-[14px]">
                                    92104 Milford Way, Millbrae, CA 94030
                                </div>
                            </div>
                            <div className='flex items-center gap-2 mb-3'>
                                <p className='mr-[7px]'>Due Date</p>
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
                            <div className='flex items-center gap-7 mb-3'>
                                <p>Terms</p>
                                <div className="rounded-[6px] bg-white w-[27%] border border-[#E9EAF0] bg-inherit h-[2.9rem] py-1.5 px-2 text-[14px]">
                                    12345
                                </div>
                            </div>

                            <div className='my-5'>
                                <div className='overflow-x-auto scrollbar-hide'>
                                    <table className="min-w-[280%] md:min-w-[128%] lg:min-w-full text-[14px]">
                                        <thead className="w-full">
                                            <tr className="text-[#374B58] text-[12px] border-[#eaecf0]  border-b  font-[500] bg-[#F5F5F5]">
                                                <td className="py-5 pl-5 gap-2 items-center">
                                                    Product
                                                </td>
                                                <td className="py-5 pl-5 gap-2 items-center">
                                                    Description
                                                </td>
                                                <td className="py-5 gap-2 items-center">
                                                    Quantity
                                                </td>
                                                <td className="py-5 gap-2 items-center">
                                                    Uom
                                                </td>
                                                <td className="py-5 gap-2 items-center">
                                                    Rate
                                                </td>
                                                <td className="py-5 gap-2 items-center">
                                                    Amount(USD)
                                                </td>
                                                <td className="py-5 gap-2 items-center">
                                                    Tax(USD)
                                                </td>
                                            </tr>
                                        </thead>

                                        <tbody className="w-full bg-white">
                                            <tr className=" border-[#eaecf0] hover:bg-gray-200  hover:bg-[#F2F8FF] text-[14px] border-b text-[#545A5D]"

                                            >
                                                <td className="py-6 pl-5 flex gap-2 items-center">
                                                    06-22-2022
                                                </td>
                                                <td className="py-6  text-left ">
                                                    Sales Journal
                                                </td>
                                                <td className="py-6  text-left ">
                                                    400101
                                                </td>
                                                <td className="py-6  text-left ">
                                                    Accounts Receivable
                                                </td>
                                                <td className="py-6 pl-5 flex gap-2 items-center">
                                                    Sale to customer XYZ
                                                </td>
                                                <td className="py-6  text-left ">
                                                    HQ
                                                </td>
                                                <td className="py-6  text-left ">
                                                    Israel Matti
                                                </td>
                                            </tr>
                                            <tr className=" border-[#eaecf0] hover:bg-gray-200  hover:bg-[#F2F8FF] text-[14px] border-b text-[#545A5D]"

                                            >
                                                <td className="py-6 pl-5 flex gap-2 items-center">
                                                    06-22-2022
                                                </td>
                                                <td className="py-6  text-left ">
                                                    Sales Journal
                                                </td>
                                                <td className="py-6  text-left ">
                                                    400101
                                                </td>
                                                <td className="py-6  text-left ">
                                                    Accounts Receivable
                                                </td>
                                                <td className="py-6 pl-5 flex gap-2 items-center">
                                                    Sale to customer XYZ
                                                </td>
                                                <td className="py-6  text-left ">
                                                    HQ
                                                </td>
                                                <td className="py-6  text-left ">
                                                    Israel Matti
                                                </td>
                                            </tr>
                                            <tr className=" border-[#eaecf0] hover:bg-gray-200  hover:bg-[#F2F8FF] text-[14px] border-b text-[#545A5D]"

                                            >
                                                <td className="py-6 pl-5 flex gap-2 items-center">
                                                    Total
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td className="py-6  text-left ">
                                                    1500
                                                </td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <CustomCheckbox
                                label="Enable online Payment"
                            />
                            <div className='mt-5 flex items-baseline'>
                                <div className='flex items-center gap-2 mb-3 w-[65%]'>
                                    <p>Invoice No</p>
                                    <div className="rounded-[6px] flex flex-col justify-center bg-white w-[27%] border border-[#E9EAF0] bg-inherit h-[2.9rem] py-1.5 px-2 text-[14px]">
                                        Great product
                                    </div>
                                </div>
                                <div className='flex gap-2 mb-3 w-[35%]'>
                                    <div className='mr-4'>
                                        <p className='mb-4'>Tax</p>
                                        <p className='mb-4'>Total</p>
                                        <p className='mb-4'>Payment Applied</p>
                                        <p className='mb-4'>Balance</p>
                                    </div>
                                    <div className=''>
                                        <p className='mb-4'>0.00</p>
                                        <p className='mb-4'>10,000</p>
                                        <p className='mb-4'>0.000</p>
                                        <p className='mb-4'>10,000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[30%] bg-[#FAFAFA] p-4">
                            <div className='flex items-center gap-2 mb-3'>
                                <p className='mr-3'>Customer Job</p>
                                <div className="w-[61%]">
                                    <CustomSelect
                                        options={jobType} name='job'
                                        placeholder="Select a Job"
                                        className="review-filter"
                                    />
                                </div>
                            </div>
                            <div className='flex items-center gap-16 mb-3'>
                                <p className='mr-3'>Class</p>
                                <div className="w-[61%]">
                                    <CustomSelect
                                        options={jobType} name='job'
                                        placeholder="Select a Class"
                                        className="review-filter"
                                    />
                                </div>
                            </div>
                            <div className="flex w-full mb-3">
                                <button
                                    onClick={() => handleTabChange("account-details")}
                                    className={`cursor-pointer lg:w-[43%] md:w-[31%] font-[500] text-[14px] border-r-0 rounded-tr-[0px] rounded-br-[0px] inline-block py-[8px] px-2 rounded-md transition-colors ${selectedTab === "account-details"
                                        ? "bg-[#8133F1] text-[#fff] border-[#8133F1] border-0"
                                        : "bg-[#fff] text-[#8133F1] border-[#8133F1] !border-[1px] transition-all ease-linear duration-150"
                                        }`}
                                >
                                    Account details
                                </button>
                                <button
                                    onClick={() => handleTabChange("optional-tab")}
                                    className={`cursor-pointer lg:w-[30%] md:w-[37%] font-[500] text-[14px] border-l-0 rounded-tl-[0px] rounded-bl-[0px] inline-block py-[8px] px-2 rounded-md ${selectedTab === "optional-tab"
                                        ? "bg-[#8133F1] text-[#fff] border-0 rounded-l-[8px]"
                                        : "bg-[#fff] text-[#8133F1] border-[#8133F1] !border-[1px]  transition-all ease-linear duration-150"
                                        }`}
                                >
                                    Optional
                                </button>
                            </div>
                            <div className="flex justify-between">
                                <p className='text-[18px] font-medium mb-3'>Summary</p>
                                <button className='flex gap-1 text-[#8133F1]'><Pen size="16px" /></button>
                            </div>
                            <div className="flex justify-between">
                                <p className='font-medium mb-3'>Phone</p>
                                <p>650-256-3334</p>
                            </div>
                            <div className="flex justify-between">
                                <p className='font-medium mb-3'>Email</p>
                                <p>aarondavis@gmail.com</p>
                            </div>
                            <div className="flex justify-between">
                                <p className='font-medium mb-3'>Delivery Method</p>
                                <p>DHL</p>
                            </div>
                            <div className="flex justify-between">
                                <p className='font-medium mb-3'>Opening</p>
                                <p>0</p>
                            </div>
                            <div className="flex justify-between">
                                <p className='font-medium mb-3'>Active Balance</p>
                                <p>0</p>
                            </div>
                            <div className="flex justify-between">
                                <p className='font-medium mb-3'>Delivery Method</p>
                                <p>0</p>
                            </div>
                            <div className="flex justify-between">
                                <p className='text-[18px] font-medium mb-3'>Customer Payment</p>
                                <button className='flex gap-1 text-[#8133F1]'><Pen size="16px" /></button>
                            </div>
                            <div className="">
                                <p className='mb-3'>Customer cannot pay Online</p>
                            </div>
                            <CustomCheckbox
                                label="Enable online Payment"
                            />
                            <div className="flex justify-between mt-3">
                                <p className='text-[18px] font-medium mb-3'>Recent Transactions</p>
                            </div>
                            <div className="flex justify-between">
                                <p className='font-medium mb-3'>25-05-2024</p>
                                <p>$10,000</p>
                            </div>

                            <div className="flex justify-between">
                                <p className='text-[18px] font-medium mb-3'>Notes</p>
                                <button className='flex gap-1 text-[#8133F1]'><Pen size="16px" /></button>
                            </div>
                            <p className='mb-3'>Customer cannot pay Online</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5  my-5 w-[40%]'>
                        <ActionButton text="Save & Close" customPadding='py-4 px-3 w-[50%]' />
                        <TransparentButton text="Revert" customPadding='py-4 px-1 w-[50%]' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaidInvoice;