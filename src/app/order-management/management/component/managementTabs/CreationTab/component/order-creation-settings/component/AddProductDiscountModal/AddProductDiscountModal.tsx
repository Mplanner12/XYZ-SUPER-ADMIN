import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Plus, X, Trash2 } from 'lucide-react';
import CustomInput from '@/components/Frominput/CustomInput';
import { useModal } from '@/util/Modals/ModalsContext';
import { useGetInventories } from '@/app/inventory/hooks/query';
import { toast } from 'react-toastify';
import { CustomError } from '@/components/interface/errormessage';
import { isAxiosError } from 'axios';
import { addProductDiscount } from '@/services/OrderManagementServices/PostApi';
import SubmitButton from '@/components/Buttons/SubmitButton';

// Interface for a single discount entry
export interface DiscountEntry {
  name: string;
  applicable_products: number[];
  rate: number;
  start_date: string;
  end_date: string;
}

interface FormValues {
    discountEntries: DiscountEntry[];
  }

const AddProductDiscountModal: React.FC = () => {
  const { closeModal } = useModal();
  const { data: fetchInventories } = useGetInventories()
  const [loading, setLoading] = useState(false)

  const [discountEntries, setDiscountEntries] = useState<DiscountEntry[]>([
    { name: '', applicable_products: [], rate: 0, start_date: '', end_date: '' }
  ]);

  const formik = useFormik<FormValues>({
    initialValues: {
      discountEntries: discountEntries,
    },
    onSubmit: async (values) => {
      setLoading(true)
      try {
        const updatedEntries = values.discountEntries.map((entry) => ({
          ...entry,
          start_date: `${entry.start_date} 00:00:00`,
          end_date: `${entry.end_date} 00:00:00`,
        }));

        for (const entry of updatedEntries) {
          const response = await addProductDiscount(entry);
          if (response.status === 200) {
            toast.success(response.message);
          }
        }
        closeModal();
      } catch (error) {
        if (isAxiosError(error) && error.response?.data && (error.response.data as CustomError).message) {
          toast.error((error.response.data as CustomError).message);
        } else {
          toast.error('Network Error. Please Try Again');
        }
      }finally{
        setLoading(false)
      }
    },
  });

  const addNewDiscountEntry = () => {
    setDiscountEntries([...discountEntries, { name: '', applicable_products: [], rate: 0, start_date: '', end_date: '' }]);
  };

  const removeDiscountEntry = (index: number) => {
    const updatedEntries = discountEntries.filter((_, i) => i !== index);
    setDiscountEntries(updatedEntries);
    formik.setFieldValue('discountEntries', updatedEntries);
  };

  const handleInputChange = (index: number, field: keyof DiscountEntry, value: string | number[]) => {
    const updatedEntries = [...discountEntries];
  
    if (field === 'applicable_products') {
      updatedEntries[index][field] = (value as string).split(',').map(Number);
    } else if (field === 'rate') {
      const rateValue = Math.min(parseFloat(value as string), 100);
      updatedEntries[index][field] = rateValue;
    } else if (field === 'start_date' || field === 'end_date') {
      updatedEntries[index][field] = value as string;
    } else {
      updatedEntries[index][field] = value as string;
    }
  
    setDiscountEntries(updatedEntries);
    formik.setFieldValue('discountEntries', updatedEntries);
  };
  

  const areFieldsEmpty = () => {
    return discountEntries.some(
      (entry) =>
        !entry.name ||
        entry.applicable_products.length === 0 ||
        entry.rate === 0 ||
        !entry.start_date ||
        !entry.end_date
    );
  };


  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-[#434343] bg-opacity-50 flex justify-center items-center">
      <div className="relative w-[90%] md:w-[550px]">
        <button
          onClick={closeModal}
          className="absolute bg-white h-10 -top-12 -right-10 text-gray-500 hover:text-gray-700 cursor-pointer w-10 justify-center items-center mx-auto flex rounded-full"
        >
          <X className="text-primary-normal" />
        </button>

        <div className="bg-white p-6 rounded-xl shadow-md max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl text-center font-semibold mb-6">Add a Product Discount</h2>
          <form onSubmit={formik.handleSubmit}>
            {discountEntries.map((entry, index) => (
              <div key={index} className="mb-4 pb-4 border-b border-gray-200">
                <div className="flex justify-end items-end mb-2">
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeDiscountEntry(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
                <CustomInput
                  label="Discount Name"
                  placeholder="What is the Discount Called?"
                  type="text"
                  id={`name-${index}`}
                  name={`name-${index}`}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  value={entry.name}
                />
                <CustomInput
                  label="Applicable Products"
                  placeholder="Select products that will be discounted"
                  type="select"
                  id={`applicable_products-${index}`}
                  name={`applicable_products-${index}`}
                  onChange={(e) => handleInputChange(index, 'applicable_products', e.target.value)}
                  value={entry.applicable_products.join(',')}
                  options={fetchInventories?.map((inventory: { name: any; id: { toString: () => any; }; }) => ({
                    label: inventory.name,
                    value: inventory.id.toString(),
                  })) || []}
                />
                <CustomInput
                  label="Discount Rate"
                  placeholder="Enter the Discount rate nothing grater than 100(%)"
                  type="number"
                  id={`rate-${index}`}
                  name={`rate-${index}`}
                  onChange={(e) => handleInputChange(index, 'rate', e.target.value)}
                  value={entry.rate.toString()}
                />
                <CustomInput
                  label="Start Date"
                  type="date"
                  id={`start_date-${index}`}
                  name={`start_date-${index}`}
                  onChange={(e) => handleInputChange(index, 'start_date', e.target.value)}
                  value={entry.start_date}
                />
                <CustomInput
                  label="End Date"
                  type="date"
                  id={`end_date-${index}`}
                  name={`end_date-${index}`}
                  onChange={(e) => handleInputChange(index, 'end_date', e.target.value)}
                  value={entry.end_date}
                />
              </div>
            ))}

            <div className="flex items-end justify-end mb-4">
              <div
                className="flex items-center gap-2 cursor-pointer w-fit"
                onClick={addNewDiscountEntry}
              >
                <Plus className="text-primary-normal" />
                <p className="font-medium tracking-wide text-primary-normal text-base">
                  Add More Discount
                </p>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <SubmitButton
                text="Add Discount to Invoice"
                customPadding="px-5 py-4 mt-5 mb-3"
                actionType="submit"
                loading={loading}
                disabled={areFieldsEmpty() || loading} 
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductDiscountModal;