import ActionButton from '@/components/Buttons/ActionButton';
import { useModal } from '@/util/Modals/ModalsContext';
import { useFormik } from 'formik';
import { X } from 'lucide-react';
import React from 'react';
import "react-datepicker/dist/react-datepicker.css";


const ExportChartOfAccount: React.FC = () => {
    const { closeModal } = useModal();
    const formik = useFormik({
        initialValues: {
            session: "",
        },
        onSubmit() { },
    });

    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-[#434343] bg-opacity-50 flex justify-center items-center overflow-y-auto py-2">
            <div className='relative mb-10'>
                <button
                    onClick={closeModal}
                    className="absolute bg-white h-10 -top-12 -right-10 text-gray-500 hover:text-gray-700 cursor-pointer w-10 justify-center items-center mx-auto flex rounded-full">
                    <X className='text-primary-normal' />
                </button>
                <div className="bg-white p-6 rounded-2xl justify-center items-center  shadow-md w-[40rem] relative no-scrollbar">
                    <div className="flex flex-col w-[60%] m-auto mb-6">
                        <p className='text-[20px] font-medium mb-3'>Export Secondary Chart of Account</p>
                        <p className='mb-3'>
                            Select a secondary chart of account to export
                        </p>
                        <div className='text-start'>
                            <p className='mb-1'>
                                Cost Account
                            </p>
                            <p className='mb-1'>
                                Tax Account
                            </p>
                            <p className='mb-1'>
                                Payable Account
                            </p>
                            <p className='mb-1'>
                                Receivable Account
                            </p>

                        </div>
                    </div>

                    <div className='my-5 flex justify-center'>
                        <ActionButton text="Export Chart of Account" customPadding='py-4 px-3 w-[50%]' />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ExportChartOfAccount;