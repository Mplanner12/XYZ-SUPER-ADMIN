"use client"
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import { useFormik } from 'formik';
import { ArrowUpNarrowWideIcon, ListFilterIcon } from 'lucide-react';
import Image from 'next/image';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const AuditTrail: React.FC = () => {
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

    const breadcrumbs = ['Admin Dashboard', 'Accounting Module'];

    return (
        <>
            <HeaderLayout
                moduleName="Accounting Module"
                page="Audit Trail"
                breadcrumbs={breadcrumbs}
            />
            <div className='px-9 pt-4'>
                <main  className='bg-secondary px-5 py-4 rounded-2xl text-[#434343]'>
                    <div className='my-3'>
                        <div className='mb-3'>
                            <p className='text-xl font-medium mb-3'>Audit Trail</p>
                        </div>
                        <div className='text-[#8133F1] text-[16px] flex gap-5 mb-5'>
                            <button className='flex gap-1'>Export Trail <Image className="ml-2" src="/export.png" width={20} height={20} alt="icon" /></button>
                            <button className='flex gap-1'>Print Trail <Image className="ml-2" src="/print.png" width={20} height={20} alt="icon" /></button>
                            <button className='flex gap-1'>Share Trail <Image className="ml-2" src="/share.png" width={20} height={20} alt="icon" /></button>
                        </div>
                    </div>

                    <div className='text-[#8133F1] flex gap-5 items-center justify-between'>
                        <div className='flex gap-3'>
                            <button className='flex gap-1'>Filter <ListFilterIcon size="17px" /></button>
                            <button className='flex gap-1'>Sort <ArrowUpNarrowWideIcon size="17px" /></button>
                        </div>
                        <div className='flex items-center gap-2 '>
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

                    <div className='my-5'>
                        <div className='overflow-x-auto scrollbar-hide'>
                            <table className="min-w-[280%] md:min-w-[128%] lg:min-w-full text-[14px]">
                                <thead className="w-full">
                                    <tr className="text-[#374B58] text-[12px] border-[#eaecf0]  border-b  font-[500] bg-[#F5F5F5]">
                                        <td className="py-5 pl-5 gap-2 items-center">
                                            LogID
                                        </td>
                                        <td className="py-5 gap-2 items-center">
                                           UserID
                                        </td>
                                        <td className="py-5 gap-2 items-center">
                                            Action
                                        </td>
                                        <td className="py-5 gap-2 items-center">
                                            TIme
                                        </td>
                                        <td className="py-5 pl-5 gap-2 items-center">
                                            Date
                                        </td>
                                    </tr>
                                </thead>

                                <tbody className="w-full bg-white">
                                    <tr className=" border-[#eaecf0] hover:bg-gray-200 hover:bg-[#F2F8FF] text-[14px] border-b text-[#545A5D]"

                                    >
                                        <td className="py-6 pl-5 flex gap-2 items-center">
                                             55678
                                        </td>
                                        <td className="py-6  text-left ">
                                            Samuel Charles
                                        </td>
                                        <td className="py-6  text-left ">
                                            User Login attempt
                                        </td>
                                        <td className="py-6  text-left ">
                                            11:39
                                        </td>
                                        <td className="py-6 pl-5 flex gap-2 items-center">
                                        06-22-2022
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default AuditTrail;
