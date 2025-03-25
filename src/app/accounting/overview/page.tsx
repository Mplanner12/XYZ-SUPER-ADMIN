"use client"
import RecentActivies from '@/components/accounting/overview/RecentActivities';
import SelectDropDown from '@/components/accounting/shared/SelectDropDown/SelectDropDown';
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import CustomSelect from '@/components/reusable/CustomSelect';
import { dateDropDownOption, timePeriods } from '@/data/dropDownOption';
import { useFormik } from 'formik';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


const LineChart = dynamic(() => import('@/components/accounting/overview/TSLChart'), {
    loading: () => <p>Loading...</p>,
    ssr: false
});

const HorizontalBarChart = dynamic(() => import('@/components/accounting/overview/APGChart'), {
    loading: () => <p>Loading...</p>,
    ssr: false
});

const PieChart = dynamic(() => import('@/components/accounting/overview/ARGChart'), {
    loading: () => <p>Loading...</p>,
    ssr: false
});

const OverviewPage = () => {
    const [openFilter, setOpenFilter] = useState<string | null>(null);

    const handleToggle = (filterName: string) => {
        setOpenFilter(openFilter === filterName ? null : filterName);
    };

    const items = [
        { title: "Total Revenue", amount: "$ 100,000", link: "/accounting/report-analytics?tab=cash-flow-statement" },
        { title: "Total Expenses", amount: "$ 50,000", link: "/accounting/report-analytics?tab=profit-loss-segment" },
        { title: "Total Asset", amount: "$ 20,000", link: "/accounting/report-analytics?tab=balance-sheet" },
        { title: "Total Liability", amount: "$ 75,000", link: "/accounting/report-analytics?tab=income-statement" },
        { title: "Total Equity", amount: "$ 150,000", link: "/accounting/report-analytics?tab=income-statement" },
    ];

    const handleLocationSelect = (selectedOption: string) => {
        console.log("Selected Location:", selectedOption);
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

    const breadcrumbs = ['Admin Dashboard', 'Accounting Module'];

    return (
        <div className=''>
            <HeaderLayout
                moduleName="Accounting Module"
                moduleLink='/accounting/overview'
                pageLink='/accounting/overview'
                page="Overview"
                breadcrumbs={breadcrumbs}
            />
            <div className='px-7 pt-4'>
                <div className='flex text-[14px] mb-4 items-center flex-wrap gap-3'>
                    <span className='flex'>
                        <SelectDropDown
                            textColor="#8133F1"
                            textSize={14}
                            zIndex={10}
                            menuWidth={10}
                            label="Filter By Location"
                            options={["Location A", "Location B", " Location C", "Location D"]}
                            onSelect={handleLocationSelect}
                            isOpen={openFilter === "location"}
                            onToggle={() => handleToggle("location")}
                        />
                    </span>
                    <span className='flex'>
                        <SelectDropDown
                            textColor="#8133F1"
                            textSize={14}
                            zIndex={10}
                            menuWidth={10}
                            label="Filter By Product Category"
                            options={["Category A", "Category B", " Category C", "Category D"]}
                            onSelect={handleLocationSelect}
                            isOpen={openFilter === "category"}
                            onToggle={() => handleToggle("category")}
                        />
                    </span>
                    <p className='text-primary-normal'>Filter by Dates</p>
                    <div className='w-[13%]'>
                        <CustomSelect
                            options={timePeriods}
                            name="timePeriods"
                            placeholder="All"
                            className="review-filter"
                        />
                    </div>

                    <p className='text-primary-normal'>Date Range</p>
                    <div className='relative w-[35%] md:w-[13%]'>
                        <DatePicker
                            selected={formik.values.dateFrom}
                            dateFormat="dd/MM/yyyy"
                            className="rounded-[6px] bg-white w-full border-0 bg-inherit h-[2.9rem] py-1.5 px-2 text-[14px] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 outline-none focus:ring-inset focus:ring-[#8133F1]"
                            onChange={handleDateChange}
                        />
                        <Image
                            src='/calendar.png'
                            className="absolute right-2 2xl:right-8 top-[.7rem]"
                            width={18}
                            height={18}
                            alt="icon"
                        />
                    </div>
                    <p className='text-primary-normal'>to</p>
                    <div className='relative w-[35%] md:w-[13%]'>
                        <DatePicker
                            selected={formik.values.dateFrom}
                            dateFormat="dd/MM/yyyy"
                            className="rounded-[6px] bg-white w-full border-0 bg-inherit h-[2.9rem] py-1.5 px-2 text-[14px] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 outline-none focus:ring-inset focus:ring-[#8133F1]"
                            onChange={handleDateChange}
                        />
                        <Image
                            src='/calendar.png'
                            className="absolute right-2 2xl:right-8 top-[.7rem]"
                            width={18}
                            height={18}
                            alt="icon"
                        />
                    </div>
                </div>
                <div className='bg-secondary px-4 py-4 rounded-2xl'>
                    <div className='overflow-x-auto no-scrollbar'>
                        <div className="flex justify-between gap-2 mb-4 min-w-[298%] md:min-w-[128%] lg:min-w-full ">
                            {items.map((item, index) => (
                                <div key={index} className="rounded-2xl shadow-custom bg-white w-[25%] p-3">
                                    <div className="flex justify-between mb-3">
                                        <Image src="/cash-multiple.svg" width={22} height={22} alt="icons" />
                                        <Link href={item.link}>
                                            <Image src="/open-in-new.svg" width={22} height={22} alt="icons" />
                                        </Link>
                                    </div>
                                    <p className="text-sm text-foundation-black-black-400 mb-3">{item.title}</p>
                                    <p className="text-xl text-foundation-grey-grey-800 font-medium">{item.amount}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between flex-wrap gap-[2px] items-baseline mb-4">
                        <div className="bg-[#fff] p-5 pb-7 rounded-[20px] shadow-custom mb-5 md:mb-0 w-full md:w-[65%]">
                            <LineChart />
                        </div>

                        <div className="bg-[#fff] p-5 rounded-[20px] w-full h-full md:w-[33%] shadow-custom">
                            <PieChart />
                        </div>
                    </div>

                    <div className="flex justify-between flex-wrap gap-[2px] items-baseline mb-4">
                        <div className="bg-[#fff] p-5 pb-7 rounded-[20px] shadow-custom mb-5 md:mb-0 w-full md:w-[65%]">
                            <HorizontalBarChart />
                        </div>

                        <div className="bg-[#fff] p-5 rounded-[20px] w-full md:w-[33%] shadow-custom">
                            <div className=''>
                                <RecentActivies />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverviewPage;