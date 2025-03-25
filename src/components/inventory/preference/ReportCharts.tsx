import React from 'react';
import { CiBarcode } from 'react-icons/ci';
import { FaRegFileImage } from 'react-icons/fa6';
import { FiDatabase } from 'react-icons/fi';
import { GoGift } from 'react-icons/go';
import { LuShapes } from 'react-icons/lu';
import { PiChartLineLight } from 'react-icons/pi';

const ReportCharts = () => {

    const sections = [
        {
        title: 'Preferred Data Filters',
        description: 'Select filters used on tables. ',
        icon: <FiDatabase />,
        },
        {
        title: 'Time Interval',
        description: 'Select the time interval when working with dates.',
        icon: <LuShapes />,
        },
        {
        title: 'Charts Types',
        description: 'Select the Chart types you prefer.',
        icon: <PiChartLineLight />, 
        },
    ];
  return (
		<div className='text-foundation-black-black-400 sm:mt-8 mt-5'>
			<h2 className="text-xl text-foundation-black-black-400 font-normal">
				Report & Charts Settings
			</h2>
            <div className='mt-4 flex flex-col gap-4 text-base cursor-pointer'>
                {sections.map((section, index) => (
                    <div key={index} className="flex gap-6 items-center">
                    {section.icon}
                    <div className="flex flex-col gap-[4px]">
                        <h3 className='text-base font-medium'>{section.title}</h3>
                        <p className='text-sm font-normal'>{section.description}</p>
                    </div>
                    </div>
                ))}

            </div>
		</div>
	);
}

export default ReportCharts