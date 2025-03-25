"use client"

import OverViewFilter from '@/components/finance/OverviewFilter';
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import Image from 'next/image';
import React, { useState } from 'react';
import InventoryManagement from './components/InventoryManagement';
import ManagementCharts from './components/ManagementCharts';

// date picker 
import CustomSelect from '@/components/reusable/CustomSelect';
import { timePeriods } from '@/data/dropDownOption';
import { useFormik } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const InventoryPage = () => {
  const [menu, setMenu] = useState('Overview');

	const menuBar = [
		{
			name: 'Overview',
			id: 1,
		},
		{
			name: 'Inventory Management',
			id: 2,
		},
	];

    const [openFilter, setOpenFilter] = useState<string | null>(null);
    
	const handleToggle = (filterName: string) => {
        setOpenFilter(openFilter === filterName ? null : filterName);
	};

  // date function
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
    
	const handleLocationSelect = (selectedOption: string) => {
        console.log('Selected Location:', selectedOption);
	};
    
	const handleCategorySelect = (selectedOption: string) => {
        console.log('Selected Category:', selectedOption);
	};
    
    const breadcrumbs = ['Admin Dashboard', 'Inventory Module'];
	return (
		<div className="">
			<HeaderLayout
				moduleName="Inventory Module"
				moduleLink="/inventory/overview"
				page="Inventory Management"
				pageLink="/inventory/inventory-management"
				breadcrumbs={breadcrumbs}
			/>

			<div className="pt-4 px-4">
				<div className="bg-secondary py-4 rounded-2xl text-[#434343]">
					<div className="flex gap-4 sm:flex-row flex-col justify-between sm:px-4 px-2 items-center">
						<div className="border mb-2 border-solid border-primary-normal rounded-[8px] w-fit flex text-xs md:text-sm lg:text-base gap-4 no-scrollbar">
							{menuBar?.map(({ name, id }: any) => (
								<p
									key={id}
									className={`flex justify-between items-center text-[16px] text-primary-normal px-[8px] py-[5px] cursor-pointer transition flex-shrink-0 ${
										menu === name
											? 'bg-primary-normal rounded-[8px] text-white'
											: ''
									}`}
									onClick={(e) => {
										e.preventDefault();
										setMenu(name);
									}}
								>
									{name}
								</p>
							))}
						</div>

						{/* filter */}

						<div
							className={`${
								menu === 'Inventory Management' ? 'hidden' : ''
							} gap-4 items-center flex flex-row sm:flex-nowrap flex-wrap whitespace-nowrap`}
						>
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
						</div>
					</div>

					<div
						className={`${
							menu === 'Inventory Management' ? 'hidden' : ''
						} flex gap-4 flex-wrap items-center mt-4 px-6`}
					>
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

					{/* tab contents */}
					<div className="mt-1 px-4">
						<div>{menu === 'Overview' && <ManagementCharts />}</div>
						<div>
							{menu === 'Inventory Management' && <InventoryManagement />}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InventoryPage;
