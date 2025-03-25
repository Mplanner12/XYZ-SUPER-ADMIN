import ActionButton from '@/components/Buttons/ActionButton';
import { InventoryOverviewCard } from '@/util/mockData/mockData';
import { SquareArrowOutUpRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { MdOutlineShowChart } from 'react-icons/md';

const InventoryOverviewCards
 = () => {

    const rates = "50%";
    
	return (
		<div className="flex-1  [@media(max-width:857px)]:overflow-x-auto scrollbar-none ">
			<div className="flex flex-nowrap gap-4 md:gap-5 lg:gap-10 py-4">
				{InventoryOverviewCard.map((item) => (
					<div
						key={item.id}
						className="shadow-lg bg-white p-4 rounded-2xl flex-1 gap-3 [@media(max-width:857px)]:min-w-[15rem] flex flex-col"
					>
						<div className="flex justify-between items-center">
							<Image
								src={item.icon}
								alt={item.content}
								width={25}
								height={25}
							/>
							<SquareArrowOutUpRight className="cursor-pointer text-primary-normal" />
						</div>
						<div className="flex flex-col mt-1">
							<p className="text-foundation-black-black-400 font-normal text-[16px] tracking-wide">
								{item.content}
							</p>
						</div>
						<div className="flex items-center">
							<p className="text-foundation-grey-grey-800 [@media(max-width:966px)]:text-sm mt-2 font-normal text-xl leading-6 tracking-wide">
								{item.amount}
							</p>
							{item.context2 && (
                <div className="flex items-center mt-1">
                    <p className="text-xl leading-6 flex gap-3 text-green-500 items-center">
                        <span><MdOutlineShowChart size={24}/></span>
                        {item.context2}
                    </p>
                </div>	
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default InventoryOverviewCards
;
