import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {
  icon: any;
  rightIcon?: any;
  text: string;
  amount: string;
  url?:string;
  setMenu?: any;
  detail?: boolean
}

const Card = ({icon, text, amount, rightIcon, url, setMenu}: Props) => {
  const router = useRouter()
  return (
    <div className='min-w-[205px] w-[23%] h-[132px] bg-white shadow-lg mx-auto flex flex-col justify-between gap-3 px-4 py-5 rounded-[16px]'>
      <div className='flex justify-center items-center'>
        <Image src={icon} alt={text} className=''/>
        {rightIcon && <Image src={rightIcon} alt={text} className='block ml-auto cursor-pointer'
          onClick={()=>{
            url && router.push(`${url}`)
            setMenu && setMenu(`bank management`)
          }}
        />}
      </div>
      <p className='text-[#4E4949] text-sm leading[14.4] '>{text}</p>
      <h2 className='text-[#727171]'>{amount}</h2>
       
    </div>
  )
}

export default Card