import Image from 'next/image';
import React from 'react';



const Appearance: React.FC = () => {
    return (
        <main>
            <h2 className="text-2xl font-semibold mb-6">Appearance</h2>
            <div className='flex flex-col gap-5'>
                <div className='flex items-center gap-4'>
                    <Image
                        src='/switch.png'
                        className=""
                        width={18}
                        height={18}
                        alt="icon"
                    />
                    <div className='flex flex-col'>
                        <p className='font-medium text-lg'>Change Theme</p>
                        <p className='text-[#434343] text-sm'>Switch your app theme </p>
                    </div>
                </div>

                <div className='flex items-center gap-4'>
                    <Image
                        src='/view.png'
                        className=""
                        width={18}
                        height={18}
                        alt="icon"
                    />
                    <div className='flex flex-col'>
                        <p className='font-medium text-lg'>Default View</p>
                        <p className='text-[#434343] text-sm'>Select the default view for tables</p>
                    </div>
                </div>

                <div className='flex items-center gap-4'>
                    <Image
                        src='/font.png'
                        className=""
                        width={18}
                        height={18}
                        alt="icon"
                    />
                    <div className='flex flex-col'>
                        <p className='font-medium text-lg'>Fonts</p>
                        <p className='text-[#434343] text-sm'>Select the default font.</p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Appearance