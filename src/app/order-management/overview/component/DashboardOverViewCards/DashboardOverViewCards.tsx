import ActionButton from '@/components/Buttons/ActionButton';
import { OrderManagementOverViewCard } from '@/util/mockData/mockData';
import Image from 'next/image';
import React from 'react';
import { SquareArrowOutUpRight } from 'lucide-react';


const DashboardOverViewCards = () => {
  return (
    <div className='flex-1  [@media(max-width:857px)]:overflow-x-auto scrollbar-none '>
      <div className='flex flex-nowrap gap-4 md:gap-5 lg:gap-10 p-4'>
        {OrderManagementOverViewCard.map((item) => (
          <div
          
            key={item.id}
            className='shadow-lg p-4 rounded-xl flex-1 gap-3 [@media(max-width:857px)]:min-w-[15rem] flex flex-col'>
            <div className='flex justify-between items-center'>
              <Image src={item.icon} alt={item.content} width={25} height={25} />
              <SquareArrowOutUpRight className='cursor-pointer text-primary-normal'/>
            </div>
            <div className='flex flex-col mt-1'>
              <p className='text-foundation-black-black-400 font-medium text-[16px] tracking-wide'>
                {item.content}
              </p>
            </div>
            <div className='flex items-center'>
              <p className='text-foundation-grey-grey-800 [@media(max-width:966px)]:text-sm mt-2 font-medium text-xl tracking-wide'>
                {item.amount}
              </p>
              <div className='flex gap-1 items-center'>
                {item.button && (
                  <ActionButton text={item.button} customPadding='px-3 py-3' />
                )}
                {item.context2 && (
                  <p className='text-foundation-grey-grey-800'>{item.context2}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardOverViewCards;
