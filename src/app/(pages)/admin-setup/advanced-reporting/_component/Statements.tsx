
import OverViewFilter from '@/app/order-management/overview/component/OverViewFilter/OverViewFilter';
import React, { useState } from 'react';
import { BsSortUp } from 'react-icons/bs';
import { IoExitOutline, IoFilterSharp } from 'react-icons/io5';
import { LiaFillDripSolid } from 'react-icons/lia';
import { MdOutlinePrint } from 'react-icons/md';
import { RiShareForwardLine } from 'react-icons/ri';

const Statements = () => {

    const statementDate = "May 31, 2024";
    const company = "XYZ Cooperation";
    const location = "HQ";
    const currency = "USD"

    const [openFilter, setOpenFilter] = useState<string | null>(null);

    const handleToggle = (filterName: string) => {
        setOpenFilter(openFilter === filterName ? null : filterName);
    };

    const handleSelectDepartment = (selectedOption: string) => {
        console.log('Select Department:', selectedOption);
    };

    const handleCriteriaOption = (selectedOption: string) => {
        console.log('Select Criteria Option:', selectedOption);
    };

    const handlePeriodOption = (selectedOption: string) => {
        console.log('Select Period Option:', selectedOption);
    };
    const handleReportType = (selectedOption: string) => {
        console.log('Select Report Type:', selectedOption);
    };
  return (
		<div className="flex flex-col gap-4 mt-5">
			<h2 className=" font-normal text-base items-center m-0 text-foundation-purple-purple-400">
				Income Statement
			</h2>
			<p className='text-sm text-foundation-black-black-400'>As of {statementDate}</p>
			<p className="font-semibold text-sm items-center m-0">{company}</p>
			<div className="flex gap-8 text-sm text-foundation-black-black-400">
				<p>location: {location}</p>
				<p>Currency: {currency}</p>
			</div>
			<div className="md:gap-8 gap-4 flex-wrap flex text-sm">
				<OverViewFilter
					label="Select Department"
					options={['Department 1', 'Department 2', 'Department 3']}
					onSelect={handleSelectDepartment}
					isOpen={openFilter === 'department'}
					onToggle={() => handleToggle('department')}
				/>
				<OverViewFilter
					label="Select Criteria Option"
					options={['Criteria 1', 'Criteria 2', 'Criteria 3']}
					onSelect={handleCriteriaOption}
					isOpen={openFilter === 'Criteria'}
					onToggle={() => handleToggle('Criteria')}
				/>
				<OverViewFilter
					label="Select Period Option"
					options={['Period Option 1', 'Period Option 2', 'Period Option 3']}
					onSelect={handlePeriodOption}
					isOpen={openFilter === 'periodOption'}
					onToggle={() => handleToggle('periodOption')}
				/>
				<OverViewFilter
					label="Select Report Type"
					options={['Report Type 1', 'Report Type 2', 'Report Type 3']}
					onSelect={handleReportType}
					isOpen={openFilter === 'reportType'}
					onToggle={() => handleToggle('reportType')}
				/>
			</div>
			<div className="flex gap-6 text-foundation-purple-purple-400 text-sm">
				<p className="flex gap-2 items-center">
					Download Report <IoExitOutline />
				</p>
				<p className="flex gap-2 items-center">
					Print Report <MdOutlinePrint />
				</p>
				<p className="flex gap-2 items-center">
					Share Report <RiShareForwardLine />
				</p>
				<p className="flex gap-2 items-center">
					Customize Report <LiaFillDripSolid />
				</p>
			</div>
			<div className="flex gap-4 text-sm text-foundation-purple-purple-400">
				<p className="flex align-middle gap-2">
					Filter <IoFilterSharp color="#8133F1" size={24} />
				</p>
				<p className="flex align-middle gap-2">
					Sort <BsSortUp color="#8133F1" size={24} />
				</p>
			</div>
		</div>
	);
}

export default Statements