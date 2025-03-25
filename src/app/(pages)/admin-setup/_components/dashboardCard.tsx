import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MdLockOutline } from 'react-icons/md';

interface DashboardCardProps {
    title: string;
    icon: string;
    content: string;
    path: string;
    locked?: boolean;
}


export default function DashboardCard({title, icon, content, path, locked} : DashboardCardProps) {
  return (
		<Link href={path} className=''>
			<div className="relative bg-foundation-purple-purple-400 flex flex-col flex-wrap flex-1 text-wrap hover:bg-foundation-purple-purple-200 rounded-xl max-h-[500px] px-6 py-8 text-white h-full gap-2">
				<div className="flex justify-between items-center mb-2">
					<h3 className='font-medium text-[20px] leading-[20px]'>{title}</h3>
					<Image
						src={icon}
						alt=""
						width={500}
						height={500}
                        loading='lazy'
						className="h-[24px] w-[24px] object-contain"
					/>
				</div>
				<p className='font-normal text-[14px] leading-[22px]'>{content}</p>

        {locked && (
          <div className='absolute inset-0 h-auto bg-white rounded-xl bg-opacity-75 flex items-center justify-center cursor-not-allowed'>
            <MdLockOutline className='h-12 w-12 text-foundation-grey-grey-700'/>
          </div>
        )}

        {/* disable link or interaction if locked */}
        {/* {!locked ? (
          <a href={path} className='text-black hover:underline'>
            
          </a>
        ) : (
          <span className='text-blue-400 cursor-not-allowed'>Locked</span>
        )} */}
			</div>
		</Link>
	);
}
