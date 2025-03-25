import ActionButton from '@/components/Buttons/ActionButton';
import CustomInput from '@/components/Frominput/CustomInput';
import { useModal } from '@/util/Modals/ModalsContext';
import { useFormik } from 'formik';
import { X } from 'lucide-react';
import React, { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import Image from 'next/image';
import CustomCheckbox from '@/components/reusable/CustomCheckbox';


const CustomizeAccount: React.FC = () => {
    const { closeModal } = useModal();

    const formik = useFormik({
        initialValues: {
            session: "",
        },
        onSubmit() { },
    });

    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-[#434343] bg-opacity-50 flex justify-center items-center overflow-y-auto py-2">
            <div className='relative mb-10 mt-20'>
                <button
                    onClick={closeModal}
                    className="absolute bg-white h-10 -top-12 -right-10 text-gray-500 hover:text-gray-700 cursor-pointer w-10 justify-center items-center mx-auto flex rounded-full">
                    <X className='text-primary-normal' />
                </button>
                <div className="bg-white p-6 rounded-2xl justify-center items-center  shadow-md w-[40rem] relative no-scrollbar">
                    <div className="flex flex-col w-[60%] m-auto mb-6 text-center">
                        <p className='text-[20px] font-medium mb-3'>Customize Column</p>
                        <p className='mb-3'>
                            Check or uncheck active columns based on your preference.
                            You can rearrange order of appearance by dragging each columns
                        </p>
                        <div className='flex justify-between mb-3 items-center'>
                            <div className='mb-1'>
                                <CustomCheckbox label='Account Code' />
                            </div>
                            <div className='mb-1'>
                                <Image className="ml-2" src="/equalSign.png" width={18} height={18} alt="icon" />
                            </div>
                        </div>
                        <div className='flex justify-between mb-3 items-center'>
                            <div className='mb-1'>
                                <CustomCheckbox label='Account Name' />
                            </div>
                            <div className='mb-1'>
                                <Image className="ml-2" src="/equalSign.png" width={18} height={18} alt="icon" />
                            </div>
                        </div>
                        <div className='flex justify-between mb-3 items-center'>
                            <div className='mb-1'>
                                <CustomCheckbox label='Account Type' />
                            </div>
                            <div className='mb-1'>
                                <Image className="ml-2" src="/equalSign.png" width={18} height={18} alt="icon" />
                            </div>
                        </div>
                        <div className='flex justify-between mb-3 items-center'>
                            <div className='mb-1'>
                                <CustomCheckbox label='Parent Account' />
                            </div>
                            <div className='mb-1'>
                                <Image className="ml-2" src="/equalSign.png" width={18} height={18} alt="icon" />
                            </div>
                        </div>
                        <div className='flex justify-between mb-3 items-center'>
                            <div className='mb-1'>
                                <CustomCheckbox label='Location' />
                            </div>
                            <div className='mb-1'>
                                <Image className="ml-2" src="/equalSign.png" width={18} height={18} alt="icon" />
                            </div>
                        </div>
                        <div className='flex justify-between mb-3 items-center'>
                            <div className='mb-1'>
                                <CustomCheckbox label='Description' />
                            </div>
                            <div className='mb-1'>
                                <Image className="ml-2" src="/equalSign.png" width={18} height={18} alt="icon" />
                            </div>
                        </div>
                        <div className='flex justify-between mb-3 items-center'>
                            <div className='mb-1'>
                                <CustomCheckbox label='Opening Balance' />
                            </div>
                            <div className='mb-1'>
                                <Image className="ml-2" src="/equalSign.png" width={18} height={18} alt="icon" />
                            </div>
                        </div>
                        <div className='flex justify-between mb-3 items-center'>
                            <div className='mb-1'>
                                <CustomCheckbox label='Currency' />
                            </div>
                            <div className='mb-1'>
                                <Image className="ml-2" src="/equalSign.png" width={18} height={18} alt="icon" />
                            </div>
                        </div>
                    </div>

                    <div className='my-5 flex justify-center'>
                        <ActionButton text="Save Changes" customPadding='py-4 px-3 w-[50%]' />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default CustomizeAccount;