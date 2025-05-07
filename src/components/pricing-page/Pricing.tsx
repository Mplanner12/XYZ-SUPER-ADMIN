import Image from 'next/image';
import React from 'react';
import { pricingImage } from '../../../public';

const howItworks = [
	{
		content: 'Each module is priced separately',
	},
	{
		content: 'Some	modules have sub-modules',
	},
	{
		content: 'Choose any combination of sub-modules within a module',
	},
	{
		content: 'Pay only for the sub-modules 	and full modules you activate',
	},
	{
		content: 'Pay per user per month for each active sub-module and full modules',
	},
];

export default function BusinessPricing() {
	return (
		<section
			id="about"
			className="justify-center flex items-center align-middle"
		>
			<div className=" flex flex-1 flex-col justify-between md:justify-center md:items-center items-center align-middle text-left text-[40px] px-6 sm:px-8 gap-6 md:flex-row py-6">
				<div className="max-w-[605px] flex justify-start items-center align-middle relative h-[365px]">
					<Image
						src={pricingImage}
						alt=""
						className="w-fit h-fit object-contain"
						loading="lazy"
					/>
				</div>
				<div className="flex flex-col flex-wrap justify-start items-start px-4">
					<div className="flex flex-col items-start justify-start text-[30px]">
						<h3 className="max-w-[583px] sm:text-[35px] leading-[38.41px] text-[28px] w-full font-normal py-2 text-wrap">
							Pricing That Fits Your Business
						</h3>
						<p className="max-w-[380px] text-sm text-foundation-grey-grey-800">
							At XYZ, we believe in flexible, scalable pricing that grows with
							your business. Our unique modular pricing allows you to choose
							only the features you need, when you need them.
						</p>
					</div>

          <div className='bg-white rounded-2xl mt-5 w-full'>
            <div className='px-4 py-2 w-full'>
              <h4 className='text-sm flex gap-2 font-semibold items-center py-4'>
                <span>
                  <Image
                    src="/cogs.svg"
                    alt=""
                    height={6}
                    width={6}
                    className="w-5 h-5 object-contain"
                  />
                </span>
                How it works
              </h4>
              {howItworks.map((item, index) => (
                <div key={index}>
                  <p className='text-sm font-normal leading-4 text-foundation-grey-grey-800'>{item.content}</p>
                  <p className='border border-[#CFCECE] w-full my-2'/>
                </div>
              ))}
            </div>
          </div>
				</div>
			</div>
		</section>
	);
}
