"use client"

import React, { useState } from 'react';
import { string } from 'zod';
import Annually from './pricing-section/Annually';
import Monthly from './pricing-section/Monthly';
import Quartely from './pricing-section/Quartely';

interface ModulePricingProps {
  headerStyle?: string;
  style?: string
}

const ModulePricing: React.FC<ModulePricingProps> = ({headerStyle, style}) => {

  const [menu, setMenu] = useState('Monthly');

	const menuBar = [
		{
			name: 'Monthly',
			id: 1,
		},
		{
			name: 'Quartely',
			id: 2,
		},
		{
			name: 'Annually',
			id: 3,
		},
	];


  return (
    <div>
      <div className="flex flex-col flex-wrap">
        <h2 className=" font-[500] text-foundation-black-black-400 text-[20px] m-0">
          Pricing
        </h2>
        <p className="font-normal text-[14px] text-foundation-grey-grey-700 m-0 mt-[14px]">
          Our product pricing is calculated based on number of apps you
          subscribe for and the number of users. You can subscribe for an app by
          clicking on the checkbox.
        </p>
      </div>
      <div className={`flex flex-col py-6 ${headerStyle} `}>
        <div className="flex flex-1 justify-center items-center">
          <div className="border mb-2 border-solid border-primary-normal rounded-[8px] w-fit flex text-xs md:text-sm lg:text-base gap-4 no-scrollbar">
            {menuBar?.map(({ name, id }: any) => (
              <p
                key={id}
                className={`flex justify-between items-center text-[16px] text-primary-normal px-[8px] py-[5px] cursor-pointer transition flex-shrink-0 ${
                  menu === name
                    ? "bg-primary-normal rounded-[8px] text-white"
                    : ""
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
        </div>

        {/* tab contents */}
        <div className={`py-2 `}>
          <div>{menu === "Monthly" && <Monthly />}</div>
          <div>{menu === "Quartely" && <Quartely />}</div>
          <div>{menu === "Annually" && <Annually />}</div>
        </div>
      </div>
    </div>
  );
}

export default ModulePricing