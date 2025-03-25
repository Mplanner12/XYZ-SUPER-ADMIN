"use client"
import HeaderLayout from '@/components/MainLayouts/HeaderLayout'
import React, { useState } from 'react'
import OverViewFilter from './component/OverViewFilter/OverViewFilter';
import DashboardOverViewCards from './component/DashboardOverViewCards/DashboardOverViewCards';
import DashboardLineChart from './component/DashboardCharts/DashboardLineChart';
import DashboardScatterChart from './component/DashboardCharts/DashboardScatterChart';
import DashboardHorizontalChart from './component/DashboardCharts/DashboardHorizontalChart';
import DashboardPieChart from './component/DashboardCharts/DashboardPieChart';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from 'formik';
import CustomSelect from '@/components/reusable/CustomSelect';
import { timePeriods } from '@/data/dropDownOption';



const OverviewPage = () => {
    const [openFilter, setOpenFilter] = useState<string | null>(null);

    const handleToggle = (filterName: string) => {
        setOpenFilter(openFilter === filterName ? null : filterName);
    };

    const handleLocationSelect = (selectedOption: string) => {
        console.log("Selected Location:", selectedOption);
    };

    const handleCategorySelect = (selectedOption: string) => {
        console.log("Selected Category:", selectedOption);
    };

    const handleSalesRepSelect = (selectedOption: string) => {
        console.log("Selected Sales Rep:", selectedOption);
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

    const breadcrumbs = ['Admin Dashboard', 'Order Management'];
    return (
        <div className=''>
            <HeaderLayout
                moduleName="Order Management Module"
                page="Overview"
                moduleLink='/order-management/overview'
                breadcrumbs={breadcrumbs}
            />

            {/* filter */}

            <div className="md:gap-3 gap-4 flex-wrap items-center flex p-6 ">
                <OverViewFilter
                    label="Filter By Location"
                    options={["Location 1", "Location 2", "Location 3"]}
                    onSelect={handleLocationSelect}
                    isOpen={openFilter === "location"}
                    onToggle={() => handleToggle("location")}
                />
                <OverViewFilter
                    label="Filter By Product Category"
                    options={["Category 1", "Category 2", "Category 3"]}
                    onSelect={handleCategorySelect}
                    isOpen={openFilter === "category"}
                    onToggle={() => handleToggle("category")}
                />
                <OverViewFilter
                    label="Filter By Sales Rep"
                    options={["Sales Rep 1", "Sales Rep 2", "Sales Rep 3"]}
                    onSelect={handleSalesRepSelect}
                    isOpen={openFilter === "salesRep"}
                    onToggle={() => handleToggle("salesRep")}
                />

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

            <main className='px-6'>
                <section className='bg-[#FCFCFC] rounded-md'>
                    <div className=''>
                        <DashboardOverViewCards />
                    </div>

                    {/* dashboard Charts */}
                    <div className={cn(
                        'flex flex-col justify-between w-full h-full pb-10   gap-5 px-3 md:px-6 z-10',
                        '[@media(min-width:1089px)]:flex-nowrap'
                    )}>
                        <div className={cn(
                            'flex flex-col w-full gap-7',
                            '[@media(min-width:1089px)]:flex-row'
                        )}>
                            <div className='[@media(min-width:1089px)]:w-[70%]'>
                                <DashboardLineChart />
                            </div>
                            <div className='[@media(min-width:1089px)]:w-[30%]'>
                                <DashboardScatterChart />
                            </div>
                        </div>

                        <div className={cn(
                            'flex flex-col w-full gap-7',
                            '[@media(min-width:1089px)]:flex-row '
                        )}>
                            <div className='[@media(min-width:1089px)]:w-[70%]'>
                                <DashboardHorizontalChart />
                            </div>
                            <div className='[@media(min-width:1089px)]:w-[30%]'>
                                <DashboardPieChart />
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    )
}

export default OverviewPage 