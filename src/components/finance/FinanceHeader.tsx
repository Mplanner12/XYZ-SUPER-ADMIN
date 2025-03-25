"use client"
import React from 'react'
import { Bell, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import dummyUser from '@/assets/icons/user.svg'


const FinanceHeader = ({page}:{page:string; }) => {
  const user = false
 
  return (
    <div className='bg-secondary text-[#434343] w-[100%] h-[90px] border-b border-[#F3F4F6] flex justify-between items-center px-6'>
      <div>
        <h2 className='h2 font-normal mb-2'>Finance Module</h2>
        <div className='flex items-center'>
          <span>Admin Dashboard</span> 
          <ChevronRight size={20} className='text-primary-normal'/> 
          <span>Finance Module</span> 
          <ChevronRight size={20} className='text-primary-normal'/>
          <span>{page}</span>
        </div>
      </div>
      <div className='flex items-center gap-3'>
        <div className='relative rounded-full overflow-hidden'>
          {user ?
            (<Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/${user}`}
              alt="display-image"
              height={46}
              width={46}
              className='object-contain rounded-full'
            />)
            : (
              <Image src={dummyUser} alt='user image'/>
            )}
        </div>
        <p className='font-semibold max-w-40 text-primary-normal'>Admin</p>
        <div className='relative rounded-full bg-white p-2'>
          <span className='block w-3 h-3 bg-error rounded-[50%] absolute top-0 right-0'></span>
          <Bell size={18} className='text-primary-normal'/>
        </div>
      </div>
    </div>
  )
}

export default FinanceHeader