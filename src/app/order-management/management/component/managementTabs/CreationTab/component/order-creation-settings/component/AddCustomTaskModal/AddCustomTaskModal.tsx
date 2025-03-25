import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Plus, X, Trash2 } from 'lucide-react';
import CustomInput from '@/components/Frominput/CustomInput';
import { useModal } from '@/util/Modals/ModalsContext';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';
import { addCustomTax } from '@/services/OrderManagementServices/PostApi';
import { CustomError } from '@/components/interface/errormessage';
import SubmitButton from '@/components/Buttons/SubmitButton';


export interface TaxEntry {
  name: string;
  basis: string;
  location: string;
  amount: number;
}

const AddCustomTaskModal: React.FC = () => {
  const { closeModal } = useModal();
  const [taxEntries, setTaxEntries] = useState([{ name: '', basis: '', amount: 0, location: '' }]);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      taxEntries: taxEntries,
    },
    onSubmit: async (values) => {
      setLoading(true);
      const formattedData: TaxEntry[] = values.taxEntries.map((entry) => ({
        name: entry.name,
        basis: entry.basis,
        location: entry.location,
        amount: parseFloat(entry.amount.toString()),
      }));

      try {
        const response = await addCustomTax(formattedData);
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
        setLoading(false);
      }
    },
  });

  const addNewTaxEntry = () => {
    setTaxEntries([...taxEntries, { name: '', basis: '', amount: 0, location: '' }]);
  };

  const removeTaxEntry = (index: number) => {
    const updatedEntries = taxEntries.filter((_, i) => i !== index);
    setTaxEntries(updatedEntries);
    formik.setFieldValue('taxEntries', updatedEntries);
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    if (field === 'amount' && parseFloat(value) > 100) return;
    const updatedEntries = [...taxEntries];
    updatedEntries[index] = { ...updatedEntries[index], [field]: value };
    setTaxEntries(updatedEntries);
    formik.setFieldValue('taxEntries', updatedEntries);
  };

  const isFormValid = taxEntries.every(
    (entry) => entry.name && entry.basis && entry.location && entry.amount > 0 && entry.amount <= 100
  );
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
          <h2 className="text-xl text-center font-semibold mb-6">Add Custom Tax to Invoice</h2>
          <form onSubmit={formik.handleSubmit}>
            {taxEntries.map((entry, index) => (
              <div key={index} className="mb-4 pb-4 border-b border-gray-200">
                <div className="flex justify-end items-end mb-2">
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeTaxEntry(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>

                <CustomInput
                  label="Location"
                  placeholder="Enter Location"
                  type="text"
                  id={`location-${index}`}
                  name={`location-${index}`}
                  onChange={(e) => handleInputChange(index, 'location', e.target.value)}
                  value={entry.location}
                />

                <CustomInput
                  label="Tax Name"
                  placeholder="Enter Tax Name"
                  type="text"
                  id={`name-${index}`}
                  name={`name-${index}`}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  value={entry.name}
                />
                <CustomInput
                  label="Tax Basis"
                  placeholder="Enter Tax Basis"
                  type="text"
                  id={`basis-${index}`}
                  name={`basis-${index}`}
                  onChange={(e) => handleInputChange(index, 'basis', e.target.value)}
                  value={entry.basis}
                />
                <CustomInput
                  label="Tax Rate"
                  placeholder="Enter Tax Rate nothing grater than 100(%)"
                  type="number"
                  id={`amount-${index}`}
                  name={`amount-${index}`}
                  onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
                  value={entry.amount.toString()}
                />
              </div>
            ))}

            <div className="flex items-end justify-end mb-4">
              <div className="flex items-center gap-2 cursor-pointer w-fit" onClick={addNewTaxEntry}>
                <Plus className="text-primary-normal" />
                <p className="font-medium tracking-wide text-primary-normal text-base">
                  Add A New Tax
                </p>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <SubmitButton text="Add Tax to Invoice" customPadding="px-5 py-4 mt-5 mb-3" actionType='submit'
                disabled={!isFormValid || loading} 
                loading={loading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCustomTaskModal;
