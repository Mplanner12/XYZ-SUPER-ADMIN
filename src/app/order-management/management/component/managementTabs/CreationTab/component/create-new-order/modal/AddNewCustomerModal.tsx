import React, { useEffect, useState } from 'react'
import SubmitButton from '@/components/Buttons/SubmitButton';
import CustomInput from '@/components/Frominput/CustomInput';
import { useCountriesData, useStateData } from '@/hooks/query/utilsApiCallBack';
import { useModal } from '@/util/Modals/ModalsContext';
import { useFormik } from 'formik';
import { X } from 'lucide-react';
import * as Yup from 'yup';
import { AddNewCustomerPostType } from '@/components/interface/postInterface';
import { isAxiosError } from 'axios';
import { CustomError } from '@/components/interface/errormessage';
import { toast } from 'react-toastify';
import { addNewCustomer } from '@/services/OrderManagementServices/PostApi';
import { useFetchCustomerName } from '@/services/OrderManagementServices';


const AddNewCustomerModal: React.FC = () => {
  const { closeModal } = useModal();
  const [loading, setLoading] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState("");
  const { data: countriesResponse, isLoading: isLoadingCountries } = useCountriesData();
  const { data: stateResponse, isLoading: isState } = useStateData(selectedCountry);
  const {refetch} = useFetchCustomerName()


  const validationSchema = Yup.object({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    street_address: Yup.string().required('Street Address is required'),
    postal_code: Yup.string().required('Postal Code is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      state: "",
      street_address: "",
      country: "",
      postal_code: "",
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: async (value:AddNewCustomerPostType) => { 
      setLoading(true)
      try {
        const updatedValues = {
          ...value,
          phone: String(value.phone),
        };
  
        const response = await addNewCustomer(updatedValues);
        if (response.status === 200) {
            toast.success(response.message)
            closeModal()
            refetch()
        }
    } catch (error) {
        if (
            isAxiosError(error) &&
            error.response &&
            error.response.data &&
            (error.response.data as CustomError).message

        ) {
            toast.error((error.response.data as CustomError).message)
        } else {
            toast.error('Network Error please Try Again')
        }
    } finally {
        setLoading(false)
    }
    },
  });

  useEffect(() => {
    setSelectedCountry(formik.values.country);
}, [formik.values.country]);

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-[#434343] bg-opacity-50 flex justify-center items-center">
      <div className="relative w-[80%] [@media(min-width:879px)]:w-[793px]   [@media(max-width:879px)]:h-[80vh] [@media(max-width:879px)]:overflow-auto scrollbar-none">
        <div className="bg-white p-6 rounded-xl shadow-md relative">

          <button
            onClick={closeModal}
            className="absolute bg-white h-10 top-3 right-3 text-gray-500 hover:text-gray-700 flex justify-center items-center w-10 rounded-full shadow-lg">
            <X className='text-primary-normal' />
          </button>

          <h2 className="text-xl text-center font-semibold mb-6">Add a New Customer</h2>
          <form onSubmit={formik.handleSubmit}>
            <div
              className='flex flex-col [@media(min-width:879px)]:flex-row w-full just items-baseline flex-1 gap-3 mb-1'
            >
              <div className='w-full flex flex-col'>
                <CustomInput
                  placeholder='Customer First Name'
                  label='Customer First Name'
                  type='text'
                  onChange={formik.handleChange}
                  id="first_name"
                  name="first_name"
                  value={formik.values.first_name}
                />
              </div>

              <div className='w-full flex flex-col'>
                <CustomInput
                  placeholder='Customer Last Name'
                  label='Customer Last Name'
                  type='text'
                  onChange={formik.handleChange}
                  id="last_name"
                  name="last_name"
                  value={formik.values.last_name}
                />
              </div>
            </div>

            <div
              className='flex flex-col [@media(min-width:879px)]:flex-row w-full just items-baseline flex-1 gap-3 mb-1'
            >
              <div className='w-full flex flex-col'>
                <CustomInput
                  placeholder='email'
                  label='email'
                  type='email'
                  onChange={formik.handleChange}
                  id="email"
                  name="email"
                  value={formik.values.email}
                />
              </div>

              <div className='w-full flex flex-col'>
                <CustomInput
                  placeholder='phone'
                  label='phone'
                  type='number'
                  onChange={formik.handleChange}
                  id="phone"
                  name="phone"
                  value={formik.values.phone}
                />
              </div>
            </div>

            <div
              className='flex flex-col [@media(min-width:879px)]:flex-row w-full just items-baseline flex-1 gap-3 mb-1'
            >
              <div className='w-full flex flex-col'>
                <CustomInput
                  label='Country'
                  placeholder='Select the Country'
                  type='select'
                  id="country"
                  name='country'
                  onChange={formik.handleChange}
                  value={formik.values.country}
                  isLoading={isLoadingCountries}
                  options={countriesResponse && countriesResponse.map((country: { code: string; name: string }) => ({
                    value: country.name,
                    label: country.name
                  }))}
                  error={formik.touched.country && formik.errors.country || ""}
                />
              </div>

              <div className='w-full flex flex-col'>
                <CustomInput
                  label='State'
                  placeholder='Select the State'
                  type='select'
                  id="state"
                  name='state'
                  onChange={formik.handleChange}
                  value={formik.values.state}
                  isLoading={isState}
                  options={
                    Array.isArray(stateResponse)
                      ? stateResponse.map((state: { name: string }) => ({
                        value: state.name,
                        label: state.name,
                      }))
                      : []
                  }
                  error={formik.touched.state && formik.errors.state || ""}
                />
              </div>
            </div>

            <div
              className='flex flex-col [@media(min-width:879px)]:flex-row w-full just items-baseline flex-1 gap-3 mb-1'
            >
              <div className='w-full flex flex-col'>
                <CustomInput
                  placeholder='Street Address'
                  label='Street Address'
                  type='text'
                  onChange={formik.handleChange}
                  id="street_address"
                  name="street_address"
                  value={formik.values.street_address}
                />
              </div>

              <div className='w-full flex flex-col'>
                <CustomInput
                  placeholder='Postal Code'
                  label='Postal Code'
                  type='text'
                  onChange={formik.handleChange}
                  id="postal_code"
                  name="postal_code"
                  value={formik.values.postal_code}
                />
              </div>
            </div>



            <div className='flex justify-center items-center'>
              <SubmitButton
                text="Add New Customer"
                customPadding='w-40 py-4 mt-5 mb-3'
                actionType="submit"
                loading={loading}
                disabled={!formik.isValid || formik.isSubmitting}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddNewCustomerModal