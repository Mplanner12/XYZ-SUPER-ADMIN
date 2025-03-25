import Image from 'next/image';
import React from 'react'

type Props = {
  icon: any;
  rightIcon?: any;
  text: string;
  title: string;
}

const PreferencesCard = ({icon, text, title}: Props) => {
  return (
    <div className='w-[211px] h-[150px] bg-white shadow-lg mx-auto flex flex-col justify-between gap-2 px-4 py-2 rounded-[16px]'>
      <div className=''>
        <Image src={icon} alt={text} width={32} height={32}/>
      </div>
      <p className='text-[#727171] text-base font-medium'>{title}</p>
      <p className='w-[179px] text-[#727171] text-sm leading[14.4] '>{text}</p>
    </div>
  )
}

export default PreferencesCard