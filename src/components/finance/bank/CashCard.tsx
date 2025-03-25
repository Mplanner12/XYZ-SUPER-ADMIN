import Image from 'next/image'
import React from 'react'

const CashCard = ({icon, text, title}:any) => {
  return (
    <div className='w-[146px] h-[163px] flex flex-col justify-between bg-white rounded-[16px] shadow-sm px-4 py-6'>
      <div>
        <Image src={icon} alt='bank' className='mb-4'/>
        <p className=''>{text}</p>
      </div>
      <h3 className='text-[#727171] font-semibold'>{title}</h3>
    </div>
  )
}

export default CashCard