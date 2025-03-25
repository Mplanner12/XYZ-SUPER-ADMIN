import React from 'react';
import { CiBarcode } from 'react-icons/ci';
import { FaRegFileImage } from 'react-icons/fa6';
import { FiDatabase } from 'react-icons/fi';
import { GoGift } from 'react-icons/go';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { ImFontSize } from "react-icons/im";
import { LuShapes } from 'react-icons/lu';
import { PiChartLineLight, PiLayoutLight } from 'react-icons/pi';

const Apperance = () => {

    const sections = [
        {
        title: 'Change Theme',
        description: 'Switch your app theme',
        icon: <HiOutlineSwitchHorizontal />,
        },
        {
        title: 'Default View',
        description: 'Select the default view for tables',
        icon: <PiLayoutLight />,
        },
        {
        title: 'Fonts',
        description: 'Select the default font',
        icon: <ImFontSize />, 
        },
    ];
  return (
		<div className='text-foundation-black-black-400 sm:mt-8 mt-5'>
			<h2 className="text-xl text-foundation-black-black-400 font-normal">
				Apperance
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

export default Apperance