'use client';
import download from '@/assets/icons/box-arrow-top-right.svg';
import OverViewFilter from '@/components/finance/OverviewFilter';
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useState } from 'react';
import InventoryOverviewCards from './components/InventoryOverviewCard';

// date picker
import CustomSelect from '@/components/reusable/CustomSelect';
import { timePeriods } from '@/data/dropDownOption';
import { useFormik } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InventoryLineChart = dynamic(() => import('@/components/inventory/overview/LineChart'), {
  loading: () => <p className='text-center'>Loading...</p>,
  ssr: false
});

const ScatterChart = dynamic(() => import('@/components/inventory/overview/ScatterChart'), {
  loading: () => <p className='text-center'>Loading...</p>,
  ssr: false
});

const HorizontalBarChart = dynamic(() => import('@/components/inventory/overview/HorizontalBarChart'), {
  loading: () => <p className='text-center'>Loading...</p>,
  ssr: false
});

const PieChart = dynamic(() => import('@/components/inventory/overview/InventoryPieChart'), {
  loading: () => <p className='text-center'>Loading...</p>,
  ssr: false
});

const OverviewPage = () => {
	const [openFilter, setOpenFilter] = useState<string | null>(null);

	const handleToggle = (filterName: string) => {
		setOpenFilter(openFilter === filterName ? null : filterName);
	};

	const handleLocationSelect = (selectedOption: string) => {
		console.log('Selected Location:', selectedOption);
	};

	const handleCategorySelect = (selectedOption: string) => {
		console.log('Selected Category:', selectedOption);
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

	const breadcrumbs = ['Admin Dashboard', 'Inventory Module'];

	return (
		<div className="">
			<HeaderLayout
				moduleName="Inventory Module"
        moduleLink='/inventory/overview'
				page="Overview"
        pageLink='/inventory/overview'
				breadcrumbs={breadcrumbs}
			/>

			{/* filter */}

			<div className="gap-4 flex-wrap flex px-7 pt-4 items-center text-[14px] ">
				<OverViewFilter
					label="Filter By Location"
					options={['Location 1', 'Location 2', 'Location 3']}
					onSelect={handleLocationSelect}
					isOpen={openFilter === 'location'}
					onToggle={() => handleToggle('location')}
				/>
				<OverViewFilter
					label="Filter By Product Category"
					options={['Category 1', 'Category 2', 'Category 3']}
					onSelect={handleCategorySelect}
					isOpen={openFilter === 'category'}
					onToggle={() => handleToggle('category')}
				/>

				<p className="text-primary-normal">Filter by Dates</p>
				<div className="w-[13%]">
					<CustomSelect
						options={timePeriods}
						name="timePeriods"
						placeholder="All"
						className="review-filter"
					/>
				</div>

        <p className="text-primary-normal">Date Range</p>
        <div className="relative w-[35%] md:w-[13%]">
          <DatePicker
            selected={formik.values.dateFrom}
            dateFormat="dd/MM/yyyy"
            className="rounded-[6px] bg-white w-full border-0 bg-inherit h-[2.9rem] py-1.5 px-2 text-[14px] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 outline-none focus:ring-inset focus:ring-[#8133F1]"
            onChange={handleDateChange}
          />
          <Image
            src="/calendar.png"
            className="absolute right-2 top-[.7rem]"
            width={18}
            height={18}
            alt="icon"
          />
        </div>
        <p className="text-primary-normal">to</p>
        <div className="relative w-[35%] md:w-[13%]">
          <DatePicker
            selected={formik.values.dateFrom}
            dateFormat="dd/MM/yyyy"
            className="rounded-[6px] bg-white w-full border-0 bg-inherit h-[2.9rem] py-1.5 px-2 text-[14px] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 outline-none focus:ring-inset focus:ring-[#8133F1]"
            onChange={handleDateChange}
          />
          <Image
            src="/calendar.png"
            className="absolute right-2 top-[.7rem]"
            width={18}
            height={18}
            alt="icon"
          />
        </div>
			</div>

			<main className="px-6 py-2">
				<section className="bg-foundation-grey-grey-50 rounded-2xl px-4">
					<div className="">
						<InventoryOverviewCards />
					</div>

					{/* dashboard Charts */}

					{/* LineChart and Scatter chart */}
					<div className="flex justify-between flex-wrap gap-5  mb-4 items-start">
						<div className="bg-white shadow-custom mb-5 md:mb-0 w-full md:w-[65%] rounded-2xl py-6">
							<div className="flex justify-between gap-x-4 px-4 mb-4">
								<div>
									<div className="flex gap-2 items-end self-start text-base text-neutral-700">
										<p>Inventory Trends Chart</p>
										<Image
											loading="lazy"
											src={download}
											alt=""
											className="h-auto object-contain shrink-0 w-5 aspect-square"
										/>
									</div>
									<p className="mt-2 text-xs text-[#939292]">
										A line chart showing trends in Inventory.
									</p>
								</div>
								<div className="flex flex-wrap gap-x-4">
									<div className="flex items-center gap-x-2 h-fit">
										<span className="block bg-error w-[12px] rounded-[50%] h-[12px] " />
										<span className="text-[12px]">Inventory Levels</span>
									</div>
									<div className="flex items-center gap-x-2 h-fit">
										<span className="block bg-[#00A814] w-[12px] rounded-[50%] h-[12px] " />
										<span className="text-[12px]">Turnover Rates</span>
									</div>
									<div className="flex items-center gap-x-2 h-fit">
										<span className="block bg-[#B78AF7] w-[12px] rounded-[50%] h-[12px] " />
										<span className="text-[12px]">Inventory Demand</span>
									</div>
								</div>
							</div>
							<div className="border border-solid border-[#F0f0f0]" />
							<div>
								<InventoryLineChart />
							</div>
						</div>

						<div className="bg-white w-full md:w-[33%] shadow-custom rounded-2xl py-6">
							<div className="flex justify-between gap-x-4 px-4 mb-4">
								<div className="text-base text-neutral-700">
									<p>Inventory Level vs Product Sales</p>
									{/* <p className="mt-2 text-xs text-[#939292]">
										Based on Location
									</p> */}
								</div>
								<Image
									loading="lazy"
									src={download}
									alt=""
									className="object-contain shrink-0 w-5 aspect-square"
								/>
							</div>
							{/* border line */}
							<div className="border border-solid border-[#F0F0F0]" />
							{/* legend */}
							<div className="flex flex-wrap gap-4 w-[300px] sm:w-[350px] px-4 mt-4">
								<div className="flex items-center gap-x-2">
									<span className="block bg-[#CEB0FA] w-[12px] rounded-[50%] h-[12px] " />
									<span className="text-[12px]">Group 1</span>
								</div>
								<div className="flex items-center gap-x-2">
									<span className="block bg-[#B78AF7] w-[12px] rounded-[50%] h-[12px] " />
									<span className="text-[12px]">Group 2</span>
								</div>
								<div className="flex items-center gap-x-2">
									<span className="block bg-[#9654F4;] w-[12px] rounded-[50%] h-[12px] " />
									<span className="text-[12px]">Group 3</span>
								</div>
								<div className="flex items-center gap-x-2">
									<span className="block bg-[#8133F1] w-[12px] rounded-[50%] h-[12px] " />
									<span className="text-[12px]">Group 4</span>
								</div>
								<div className="flex items-center gap-x-2">
									<span className="block bg-[#6200EE] w-[12px] rounded-[50%] h-[12px] " />
									<span className="text-[12px]">Group 5</span>
								</div>
							</div>
							<div className="">
								<ScatterChart />
							</div>
						</div>
					</div>

					{/* Barchart and Recent activity */}
					<div className="flex justify-between  flex-wrap gap-5 w-full mt-6 mb-4 items-start">
						{/* Horizontal Bar Chart */}
						<div className="bg-white shadow-custom mb-5 md:mb-0 w-full md:w-[65%] rounded-2xl py-6">
							<div className="flex justify-between items-start gap-x-4 px-4 mb-4">
								<div>
									<div className="flex gap-2 text-base text-neutral-700">
										<p>Inventory Value Chart</p>
										<Image
											loading="lazy"
											src={download}
											alt=""
											className="h-auto object-contain shrink-0 w-5 aspect-square"
										/>
									</div>
									<p className="mt-2 text-xs text-[#939292]">
										A bar chart showing inventory revenue by product category
									</p>
								</div>
								<div className="flex flex-wrap gap-x-4">
									<div className="flex items-center gap-x-2">
										<span className="block bg-[#ff3b30] w-[12px] rounded-[50%] h-[12px] " />
										<span className="text-[12px]">Product category 1</span>
									</div>
									<div className="flex items-center gap-x-2">
										<span className="block bg-[#34c759] w-[12px] rounded-[50%] h-[12px] " />
										<span className="text-[12px]">Product category 2</span>
									</div>
								</div>
							</div>
							{/* border line */}
							<div className="border border-solid border-[#F0F0F0]" />
							<div className="">
								<HorizontalBarChart />
							</div>
						</div>
						<div className="bg-white p-5 rounded-2xl w-full md:w-[33%] shadow-custom">
							<PieChart />
						</div>
					</div>
				</section>
			</main>
		</div>
	);
};

export default OverviewPage;
