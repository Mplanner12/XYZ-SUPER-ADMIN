import ActionButton from '@/components/Buttons/ActionButton';
import TransparentButton from '@/components/Buttons/TransparentButton';
import { useModal } from '@/util/Modals/ModalsContext';
import { X } from 'lucide-react';
import React from 'react';

const ConfirmationModal = () => {
  const { closeModal } = useModal();
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-[#434343] bg-opacity-50 flex justify-center items-center">
      <div className="relative w-[90%] md:w-[650px] bg-white p-8 rounded-xl shadow-lg">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute bg-white h-10 -top-12 -right-10 text-gray-500 hover:text-gray-700 cursor-pointer w-10 justify-center items-center mx-auto flex rounded-full"
        >
          <X className="text-primary-normal" />
        </button>

        {/* Modal Title */}
        <h2 className="text-xl font-medium text-center mb-6">Order Confirmation Status</h2>

        {/* Products Section */}
        <div className="space-y-4">
         
          <div className="flex justify-between">
            <span>Product </span>
            <span>Amount</span>
          </div>
          <div className="flex justify-between">
            <span>Bottled water</span>
            <span>10</span>
          </div>
          <div className="flex justify-between">
            <span>Carton Of Peak Milk</span>
            <span>100</span>
          </div>
          <div className="flex justify-between">
            <span>Nivea Cream</span>
            <span>50</span>
          </div>
          <div className="flex justify-between ">
            <span>Total Amount</span>
            <span>200 USD</span>
          </div>
        </div>

        {/* Delivery Information Section */}
        <div className="space-y-4 mt-6">
          <h3 className="text-lg font-light text-center">Delivery Information</h3>
          <div className="flex justify-between">
            <span >Delivery Date</span>
            <span>22/07/2024</span>
          </div>
          <div className="flex justify-between">
            <span >Delivery Address</span>
            <span>
              Industrial Crescent, 100253, Mushin <br />
              Lagos State Nigeria
            </span>
          </div>
          <div className="flex justify-between">
            <span >Delivery Vendor</span>
            <span>GIG Logistics</span>
          </div>
        </div>

        {/* Customer Information Section */}
        <div className="space-y-4 mt-6">
          <h3 className="text-lg font-light text-center">Customer Information</h3>
          <div className="flex justify-between">
            <span >Customer Name</span>
            <span>David Simon</span>
          </div>
          <div className="flex justify-between">
            <span >Customer Phone Number</span>
            <span>+2348956753369</span>
          </div>
          <div className="flex justify-between">
            <span >Customer Email Address</span>
            <span>davidsimon@gmail.com</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-5 md:w-64 w-full mx-auto">
          <ActionButton text="Download Order Confirmation" customPadding="px-6 w-full py-4" />
          <TransparentButton text="Share Order Confirmation" customPadding="px-6 w-full py-4" />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
