import { useModal } from '@/util/Modals/ModalsContext';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import "react-datepicker/dist/react-datepicker.css";


const SuccessModal: React.FC = () => {
    const { closeModal } = useModal();

    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-[#434343] bg-opacity-50 flex justify-center items-center overflow-y-auto py-2">
            <div className='relative mb-10'>
                <button
                    onClick={closeModal}
                    className="absolute bg-white h-10 -top-12 -right-10 text-gray-500 hover:text-gray-700 cursor-pointer w-10 justify-center items-center mx-auto flex rounded-full">
                    <X className='text-primary-normal' />
                </button>
                <div className="bg-white p-6 rounded-2xl justify-center items-center  shadow-md w-[40rem] relative no-scrollbar">
                    <div className="flex flex-col w-[60%] justify-center m-auto mb-6">
                        <Image className="m-auto pt-12" src="/successIcon.png" width={50} height={50} alt="icon" />
                        <p className='my-7 text-center text-[18px]'>
                            New Account Added
                        </p>
                    </div>

                    <span className='my-5 flex justify-center m-auto w-[60%]'>
                        <Link href="/accounting/accounting-list" className='w-full'>
                            <button onClick={closeModal} className={`bg-foundation-purple-purple-400 border-none hover:bg-foundation-purple-purple-100 w-full py-4 cursor-pointer text-foundation-white-white-400 rounded-[16px]`}>
                                See All Acounts
                            </button>
                        </Link>
                    </span>
                </div>
            </div>
        </div >
    );
};

export default SuccessModal;