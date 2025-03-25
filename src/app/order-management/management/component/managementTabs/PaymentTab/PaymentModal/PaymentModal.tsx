import ActionButton from '@/components/Buttons/ActionButton'
import TransparentButton from '@/components/Buttons/TransparentButton'
import { useModal } from '@/util/Modals/ModalsContext'
import { X } from 'lucide-react'
import React from 'react'

const PaymentModal = () => {
  const { closeModal } = useModal()
  
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-[#434343] bg-opacity-50 flex justify-center items-center">
      <div className="relative w-[90%] md:w-[550px] bg-white p-6 rounded-xl shadow-lg">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute bg-white h-10 -top-12 -right-10 text-gray-500 hover:text-gray-700 cursor-pointer w-10 justify-center items-center mx-auto flex rounded-full">
          <X className='text-primary-normal' />
        </button>

        {/* Modal Content */}
        <h2 className="text-xl font-bold text-center mb-4">Payment Receipt</h2>

        <div className="space-y-5">
          {/* Receipt Info */}
          <div className="flex justify-between">
            <span className="text-gray-500">Receipt ID</span>
            <span className="font-medium">7788RT</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Transaction ID</span>
            <span className="font-medium">7788RT</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Customer Name</span>
            <span className="font-medium">David Simon</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Customer ID</span>
            <span className="font-medium">8568RT</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Payment Method</span>
            <span className="font-medium">PayPal</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Payment Date</span>
            <span className="font-medium">22/07/2024</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Amount Paid</span>
            <span className="font-medium">17890 USD</span>
          </div>
        </div>

        {/* You can add your buttons below */}
        <div className='w-full flex justify-center items-center'>
        <div className="mt-6 flex flex-col gap-5 md:w-64 w-[80%]">
          <ActionButton text="Download Payment Receipt" customPadding='px-6 w-full py-4'/>
          <TransparentButton text="Share Payment Receipt" customPadding='px-6 w-full py-4'/>
        </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentModal
