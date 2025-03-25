import React from 'react';
import { CiBarcode } from 'react-icons/ci';
import { FaRegFileImage } from 'react-icons/fa6';
import { GoGift } from 'react-icons/go';
import { LuShapes } from 'react-icons/lu';

const ProductSettings = () => {

    const sections = [
        {
        title: 'Product Variant Management',
        description: 'Manage product variants like size, color and custom variants.',
        icon: <LuShapes />,
        },
        {
        title: 'Category Management',
        description: 'Manage product categories.',
        icon: <LuShapes />,
        },
        {
        title: 'Barcode Generation',
        description: 'Manage barcode generation settings.',
        icon: <CiBarcode />, 
        },
        {
        title: 'Image Management',
        description: 'Manage product images.',
        icon: <FaRegFileImage />, 
        },
        {
        title: 'Promotional Product Management',
        description: 'Manage promotional products.',
        icon: <GoGift />, 
        },
    ];
  return (
		<div className='text-foundation-black-black-400 sm:mt-8 mt-5'>
			<h2 className="text-xl text-foundation-black-black-400 font-normal">
				Product Settings
			</h2>
            <div className='mt-4 flex flex-col gap-4 text-base cursor-pointer'>
                {sections.map((section, index) => (
                    <div key={index} className="flex gap-6 items-center">
                    {section.icon}
                    <div className="flex flex-col gap-[6px]">
                        <h3 className='text-base font-medium'>{section.title}</h3>
                        <p className='text-sm font-normal'>{section.description}</p>
                    </div>
                    </div>
                ))}

            </div>
		</div>
	);
}

export default ProductSettings