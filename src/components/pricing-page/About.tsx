import Image, { StaticImageData } from 'next/image';
import React from 'react';
import { FaRegFaceSmile } from "react-icons/fa6";
import { shieldLock } from '../../../public';

type Reason = {
	icon: React.ReactNode;
	title: string;
	content: string;
	img: string | StaticImageData;
  title2: string;
  content2: string;
};

const items = [
	{
		icon: shieldLock,
		title: 'Comprehensive',
		content: 'All your business needs in one platform',
	},
	{
		icon: shieldLock,
		title: 'Comprehensive',
		content: 'All your business needs in one platform',
	},
	{
		icon: shieldLock,
		title: 'Comprehensive',
		content: 'All your business needs in one platform',
	},
];

const reasons: Reason[] = [
	{
		icon: <FaRegFaceSmile />,
		title: 'Customization',
		content:
			'Companies can create a tailored solution by selecting only the sub-modules they need.',
		img: shieldLock,
		title2: 'Comprehensive',
		content2: 'All your business needs in one platform',
	},
	{
		icon: <FaRegFaceSmile />,
		title: 'Customization',
		content:
			'Companies can create a tailored solution by selecting only the sub-modules they need.',
		img: shieldLock,
		title2: 'Comprehensive',
		content2: 'All your business needs in one platform',
	},
	{
		icon: <FaRegFaceSmile />,
		title: 'Customization',
		content:
			'Companies can create a tailored solution by selecting only the sub-modules they need.',
		img: shieldLock,
		title2: 'Comprehensive',
		content2: 'All your business needs in one platform',
	},
];

const About = () => {
  return (
		<div className=" justify-center flex items-center align-middle text-white">
			<div className=" justify-center items-center px-4">
				<h2 className="text-[2.5em] leading-10 font-light w-full text-center py-2 text-wrap">
					Why Choose XYZ?
				</h2>

        <div className='flex flex-col mt-5'>
          <div className="mt-4 flex flex-wrap justify-center gap-8 gap-y-12">
            {reasons.map((reason, index) => (
              <div key={index} className="flex flex-col gap-3 max-w-[323px]">
                <p className='text-2xl'>{reason.icon}</p>
                <h3 className='font-normal text-2xl leading-6'>{reason.title}</h3>
                <p className='font-light'>{reason.content}</p>

                <div className='mt-2 flex flex-col gap-3'>
                  <Image src={reason.img} alt={reason.title2} className="w-8 h-8 object-contain" />
                  <h3 className='font-normal text-2xl leading-6'>{reason.title2}</h3>
                  <p className='font-light'>{reason.content2}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
			</div>
		</div>
	);
}

export default About