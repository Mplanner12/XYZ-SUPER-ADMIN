import Button from '@/components/Buttons/Button'
import TransparentButton from '@/components/Buttons/TransparentButton'
import { CustomError } from '@/components/interface/errormessage'
import { useFetchSalesOutlet } from '@/services/OrderManagementServices'
import { deleteSalesOutletStore } from '@/services/OrderManagementServices/DeleteApi'
import { useModal } from '@/util/Modals/ModalsContext'
import { isAxiosError } from 'axios'
import { X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

interface DeleteConfirmationModalProps {
  deleteSalesID:string
}

const DeleteConfirmationModal:React.FC<DeleteConfirmationModalProps> = ({ deleteSalesID}) => {
  const {refetch} = useFetchSalesOutlet()

  const { closeModal } = useModal()
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await deleteSalesOutletStore(deleteSalesID);
      if (response.status === 200) {
        toast.success(response.message);
        refetch();
        closeModal();
      }
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.data &&
        (error.response.data as CustomError).message
      ) {
        toast.error((error.response.data as CustomError).message);
      } else {
        toast.error("Network Error please Try Again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-[#434343] bg-opacity-50 flex justify-center items-center">
      <div className="relative w-[90%] md:w-[550px]">
        <button
          onClick={closeModal}
          className="absolute bg-white h-10 -top-12 -right-2 md:-right-10 text-gray-500 hover:text-gray-700 cursor-pointer w-10 justify-center items-center mx-auto flex rounded-full">
          <X className='text-primary-normal' />
        </button>

        <div className="bg-white p-6 rounded-xl shadow-md max-h-full ">
        <div className="p-4 text-center">
       <div className='flex justify-center items-center my-5'>
          <Image 
          src="/binPic.svg"
          alt="binPic"
          width={40}
          height={40}
          />
       </div>
          <p className="text-base text-gray-600 mb-6">
            This action cannot be undone.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Button
              className={`flex-1 p-2 ${loading ? "bg-red-600" : "bg-red-600"} text-white rounded-lg px-7 py-3`}
              label={loading ? "Deleting..." : "Yes, Delete"}
              onClick={handleDelete}
              disabled={loading}
            />
            <Button
             className={`bg-transparent border flex-1 p-2  hover:text-white hover:border-0 border-foundation-purple-purple-400  hover:bg-foundation-purple-purple-100  cursor-pointer text-foundation-purple-purple-400 rounded-lg px-7 py-3`}
              label="No, Cancel"
              onClick={closeModal}
            />
           
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmationModal