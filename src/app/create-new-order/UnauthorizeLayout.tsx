import Image from 'next/image';
import React from 'react';


export default function CreateNewOrderUnauthorize({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen flex-grow justify-center mx-auto items-center bg-[#8133F1] flex leading-[normal]">
      <div className=''>
      <div className="absolute bottom-4 left-4">
        <Image
          src="/xyz.svg"
          alt="logo"
          width={100}
          height={60}
        />
      </div>
      </div>
          {children}
    </div>
  );
}