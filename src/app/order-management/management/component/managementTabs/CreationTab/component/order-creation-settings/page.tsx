"use client"
import React from 'react'
import { ChevronLeft, Plus, SquareStack } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useModal } from '@/util/Modals/ModalsContext';
import AddProductDiscountModal from './component/AddProductDiscountModal/AddProductDiscountModal';
import AddCustomChargesModal from './component/AddCustomChargesModal/AddCustomChargesModal';
import AddCustomTaskModal from './component/AddCustomTaskModal/AddCustomTaskModal';

const OrderCreationPage: React.FC = () => {
    const router = useRouter();
    const { openModal } = useModal();

    const handleBackClick = () => {
        router.back();
    };


    const handleAddProductDiscountModal = () => {
        openModal(<AddProductDiscountModal />)
    }

    const handleAddCustomChargesModal = () => {
        openModal(<AddCustomChargesModal />)
    }

    const handleAddCustomTaskModal = () => {
        openModal(<AddCustomTaskModal />)
    }

    const handleManageCustomInvoice = () => {
        router.push('/order-management/management?tab=Order%20Creation&page=manage-custom-invoice'); 
      };

      const handleManageTaskInvoice = () => {
        router.push('/order-management/management?tab=Order%20Creation&page=manage-tax-invoice'); 
      };

      const handleManageDiscount = () => {
        router.push('/order-management/management?tab=Order%20Creation&page=manage-discount-product'); 
      };

      
      

    return (
        <main>
            <div className='flex'>
                <div className='gap-4 flex items-center'>
                    <ChevronLeft className='text-primary-normal cursor-pointer' onClick={handleBackClick} />
                    <p className='font-medium tracking-wider text-[#434343] text-xl'>
                        Order Creation Settings
                    </p>
                </div>
            </div>

            <div className='flex flex-col gap-5 mt-8'>
                <div className='flex items-center gap-2 cursor-pointer w-fit'
                    onClick={handleAddProductDiscountModal}
                >
                    <Plus className='text-primary-normal' />
                    <p className='font-medium tracking-wide text-primary-normal text-base'>Add Product Discount</p>
                </div>




                <div className='flex items-center gap-2 cursor-pointer w-fit'
                    onClick={handleAddCustomTaskModal}
                >
                    <Plus className='text-primary-normal' />
                    <p className='font-medium tracking-wide text-primary-normal text-base'>Add Custom Tax to Invoice </p>
                </div>

                <div className='flex items-center gap-2 cursor-pointer w-fit'
                    onClick={handleAddCustomChargesModal}
                >
                    <Plus className='text-primary-normal' />
                    <p className='font-medium tracking-wide text-primary-normal text-base'>Add Custom Charges to Invoice </p>
                </div>

                <div 
            onClick={handleManageCustomInvoice}
                className='flex items-center gap-2 cursor-pointer w-fit'
                >
                    <SquareStack className='text-primary-normal' />
                    <p className='font-medium tracking-wide text-primary-normal text-base'>Manage Custom Charges on Invoice </p>
                </div>



                <div className='flex items-center gap-2 cursor-pointer w-fit'
                onClick={handleManageTaskInvoice}
                >
                    <SquareStack className='text-primary-normal' />
                    <p className='font-medium tracking-wide text-primary-normal text-base'>Manage Custom Tax on Invoice </p>
                </div>


                <div className='flex items-center gap-2 cursor-pointer w-fit'
                onClick={handleManageDiscount}
                >
                    <SquareStack className='text-primary-normal' />
                    <p className='font-medium tracking-wide text-primary-normal text-base'>Manage Discounts on Products</p>
                </div>
            </div>
        </main>
    )
}

export default OrderCreationPage