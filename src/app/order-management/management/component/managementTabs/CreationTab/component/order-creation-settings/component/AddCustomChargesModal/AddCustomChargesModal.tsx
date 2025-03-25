import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Plus, X, Trash2 } from 'lucide-react';
import ActionButton from '@/components/Buttons/ActionButton';
import CustomInput from '@/components/Frominput/CustomInput';
import { useModal } from '@/util/Modals/ModalsContext';
import { addCustomeCharges } from '@/services/OrderManagementServices/PostApi';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';
import { CustomError } from '@/components/interface/errormessage';
import SubmitButton from '@/components/Buttons/SubmitButton';

export interface ChargeEntry {
  name: string;
  basis: string;
  amount: number;
}

const AddCustomChargesModal: React.FC = () => {
  const { closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);


  const [chargeEntries, setChargeEntries] = useState<ChargeEntry[]>([
    { name: '', basis: '', amount: 0 }
  ]);

  const formik = useFormik({
    initialValues: {
      chargeEntries: chargeEntries,
    },
    onSubmit: async (values) => {
      setIsLoading(true)
      const formattedData: ChargeEntry[] = values.chargeEntries.map((entry) => ({
        name: entry.name,
        basis: entry.basis,
        amount: parseFloat(entry.amount.toString()),
      }));
      try {
        const response = await addCustomeCharges(formattedData);
        if (response.status === 200) {
          toast.success(response.message);
          closeModal();
        }
      } catch (error) {
        if (
          isAxiosError(error) &&
          error.response?.data &&
          (error.response.data as CustomError).message
        ) {
          toast.error((error.response.data as CustomError).message);
        } else {
          toast.error('Network Error. Please Try Again');
        }
      } finally {
        setIsLoading(false)
      }
    },
  });


  const addNewChargeEntry = () => {
    setChargeEntries([...chargeEntries, { name: '', basis: '', amount: 0 }]);
  };


  const removeChargeEntry = (index: number) => {
    const updatedEntries = chargeEntries.filter((_, i) => i !== index);
    setChargeEntries(updatedEntries);
    formik.setFieldValue('chargeEntries', updatedEntries);
  };


  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedEntries = [...chargeEntries];
    updatedEntries[index] = {
      ...updatedEntries[index],
      [field]: field === 'amount' ? Math.min(parseFloat(value), 100) : value,
    };
    setChargeEntries(updatedEntries);
    formik.setFieldValue('chargeEntries', updatedEntries);
  };

  const isFormValid = () => {
    return chargeEntries.every(entry => entry.name && entry.basis && entry.amount > 0);
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-[#434343] bg-opacity-50 flex justify-center items-center">
      <div className="relative w-[80%] md:w-[550px]">
        <button
          onClick={closeModal}
          className="absolute bg-white h-10 -top-12 -right-10 text-gray-500 hover:text-gray-700 cursor-pointer w-10 justify-center items-center mx-auto flex rounded-full"
        >
          <X className="text-primary-normal" />
        </button>

        <div className="bg-white p-6 rounded-xl shadow-md max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl text-center font-semibold mb-6">Add Custom Charges to Invoice</h2>
          <form onSubmit={formik.handleSubmit}>
            {chargeEntries.map((entry, index) => (
              <div key={index} className="mb-4 pb-4 border-b border-gray-200">
                <div className="flex justify-end items-end mb-2">
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeChargeEntry(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
                <CustomInput
                  label="Custom Charge Name"
                  placeholder="What is the Charge Called?"
                  type="text"
                  id={`name-${index}`}
                  name={`name-${index}`}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  value={entry.name}
                />
                <CustomInput
                  label="Charge Basis"
                  placeholder="Purchase Amount"
                  type="text"
                  id={`basis-${index}`}
                  name={`basis-${index}`}
                  onChange={(e) => handleInputChange(index, 'basis', e.target.value)}
                  value={entry.basis}
                />
                <CustomInput
                  label="Custom Charge Rate"
                  placeholder="Enter the charge rate (%)"
                  type="number"
                  id={`amount-${index}`}
                  name={`amount-${index}`}
                  onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
                  value={entry.amount.toString()}
                />
              </div>
            ))}

            <div className="flex items-end justify-end mb-4">
              <div
                className="flex items-center gap-2 cursor-pointer w-fit"
                onClick={addNewChargeEntry}
              >
                <Plus className="text-primary-normal" />
                <p className="font-medium tracking-wide text-primary-normal text-base">
                  Add A New Charge
                </p>
              </div>
            </div>

            <div className="flex justify-center items-center">
            <SubmitButton
                text="Add Charges to Invoice"
                customPadding="px-5 py-4 mt-5 mb-3"
                actionType="submit"
                disabled={!isFormValid()} 
                loading={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCustomChargesModal;