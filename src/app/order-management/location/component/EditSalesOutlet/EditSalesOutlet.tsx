import SubmitButton from '@/components/Buttons/SubmitButton';
import CustomInput from '@/components/Frominput/CustomInput';
import { CustomError } from '@/components/interface/errormessage';
import { SalesOutLetPostype } from '@/components/interface/postInterface';
import { useCountriesData, useCurrenciesData, useLanguageData, useRegionData, useStateData } from '@/hooks/query/utilsApiCallBack'
import { useFetchSalesOutlet } from '@/services/OrderManagementServices'
import { updateSalesOutlets } from '@/services/OrderManagementServices/UpdateApi';
import { useModal } from '@/util/Modals/ModalsContext'
import { isAxiosError } from 'axios';
import { useFormik } from 'formik';
import { debounce } from 'lodash';
import { X } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import * as Yup from 'yup';

interface SalesOutletRowData {
    id: string;
    outlet_name: string;
    street_address: string;
    postal_code: string;
    country: string;
    state: string;
    preferred_language: string;
    preferred_currency: string;
    region: string;
}
interface EditSalesOutletPropsType {
    rowData: SalesOutletRowData
}

const EditSalesOutlet: React.FC<EditSalesOutletPropsType> = ({ rowData }) => {
    const { closeModal } = useModal()
    const { refetch } = useFetchSalesOutlet()
    const [loading, setLoading] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState("");
    const [countrySearchTerm, setCountrySearchTerm] = useState("");
    const [languageSearchTerms, setLanguageSearchTerm] = useState("");
    const [currencieSearchTerms, setCurrencieSearchTerm] = useState("");
    const { data: countriesResponse, isLoading: isLoadingCountries, refetch: refetchCountries } = useCountriesData(countrySearchTerm);
    const { data: currenciesResponse, isLoading: isCurrencies, refetch: refetchCurrencies } = useCurrenciesData(currencieSearchTerms);
    const { data: languageResponse, isLoading: isLanguage, refetch: refetchLanguages } = useLanguageData(languageSearchTerms);
    const { data: stateResponse, isLoading: isState } = useStateData(selectedCountry);
    const { data: regionResponse} = useRegionData(selectedCountry);


    const validationSchema = Yup.object({
        outlet_name: Yup.string().required('Outlet Name is required'),
        street_address: Yup.string().required('Street Address is required'),
        postal_code: Yup.string().required('Postal Code is required'),
        country: Yup.string().required('Country is required'),
        state: Yup.string().required('State is required'),
        preferred_language: Yup.string().required('Preferred Language is required'),
        preferred_currency: Yup.string().required('Preferred Currency is required'),
        region: Yup.string().required('region on map is required')
    });

    const handleCountrySearch = useCallback(
        debounce((searchTerm: string) => {
            setCountrySearchTerm(searchTerm);
            refetchCountries();
        }, 300),
        [refetchCountries]
    );

    const handleLanguageSearch = useCallback(
        debounce((searchTerm: string) => {
            setLanguageSearchTerm(searchTerm);
            refetchLanguages();
        }, 300),
        [refetchCountries]
    );

    const handleCurrenciesSearch = useCallback(
        debounce((searchTerm: string) => {
            setCurrencieSearchTerm(searchTerm);
            refetchCurrencies();
        }, 300),
        [refetchCountries]
    );

    const formik = useFormik({
        initialValues: {
            outlet_name: rowData.outlet_name || "",
            street_address: rowData.street_address || "",
            postal_code: rowData.postal_code || "",
            state: rowData.state || "",
            country: rowData.country || "",
            preferred_language: rowData.preferred_language || "",
            preferred_currency: rowData.preferred_currency || "",
            region: rowData.region || ""
        },
        validationSchema,
        validateOnMount: true,
        onSubmit: async (value: SalesOutLetPostype) => {
            setLoading(true)
            try {
                const response = await updateSalesOutlets(value, rowData.id)
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

    useEffect(() => {
        if (regionResponse?.data) {
          formik.setFieldValue("region", regionResponse.data);
        }
      }, [regionResponse?.data]);
      


    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-[#434343] bg-opacity-50 flex justify-center items-center">
            <div className="relative w-[80%] h-[80vh] overflow-auto scrollbar-none md:w-[550px]">
                <div className="bg-white p-6 rounded-xl shadow-md relative">
                    <button
                        onClick={closeModal}
                        className="absolute bg-white h-10 top-3 right-3 text-gray-500 hover:text-gray-700 flex justify-center items-center w-10 rounded-full shadow-lg">
                        <X className='text-primary-normal' />
                    </button>
                    <h2 className="text-xl text-center font-semibold mb-6">Edit Sales Outlet</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='flex flex-col gap-1'>
                            <CustomInput
                                label='Outlet Name'
                                placeholder='What is the name of the Sales outlet'
                                type='text'
                                id="outlet_name"
                                name='outlet_name'
                                onChange={formik.handleChange}
                                value={formik.values.outlet_name}
                                error={formik.touched.outlet_name && formik.errors.outlet_name || ""}
                            />

                            <CustomInput
                                label='Street Address'
                                placeholder='What is the address?'
                                type='text'
                                id="street_address"
                                name='street_address'
                                onChange={formik.handleChange}
                                value={formik.values.street_address}
                                error={formik.touched.street_address && formik.errors.street_address || ""}
                            />

                            <CustomInput
                                label='Postal Code'
                                placeholder='What is the postal code?'
                                type='text'
                                id="postal_code"
                                name='postal_code'
                                onChange={formik.handleChange}
                                value={formik.values.postal_code}
                                error={formik.touched.postal_code && formik.errors.postal_code || ""}
                            />

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
                                isSearchable={true}
                                onInputChange={handleCountrySearch}
                            />

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


                            <CustomInput
                                label='Preferred Language'
                                placeholder='Select the Language'
                                type='select'
                                id="preferred_language"
                                name='preferred_language'
                                onChange={formik.handleChange}
                                value={formik.values.preferred_language}
                                isLoading={isLanguage}
                                options={languageResponse && languageResponse.map((language: string) => ({
                                    value: language,
                                    label: language
                                }))}
                                error={formik.touched.preferred_language && formik.errors.preferred_language || ""}
                                isSearchable={true}
                                onInputChange={handleLanguageSearch}
                            />

                            <CustomInput
                                label='Preferred Currency'
                                placeholder='Select the Currency'
                                type='select'
                                id="preferred_currency"
                                name='preferred_currency'
                                onChange={formik.handleChange}
                                value={formik.values.preferred_currency}
                                isLoading={isCurrencies}
                                options={currenciesResponse && currenciesResponse.map((currency: { symbol: string; code: string }) => ({
                                    value: currency.code,
                                    label: currency.code
                                }))}
                                error={formik.touched.preferred_currency && formik.errors.preferred_currency || ""}
                                isSearchable={true}
                                onInputChange={handleCurrenciesSearch}
                            />

                            <CustomInput
                                label='Region'
                                placeholder='Region'
                                type='text'
                                id="region"
                                name='region'
                                onChange={formik.handleChange}
                                value={formik.values.region}
                                error={formik.touched.region && formik.errors.region || ""}
                                readOnly
                                // isSearchable={true}
                                // onInputChange={handleCurrenciesSearch}
                            />
                        </div>

                        <div className='flex justify-center items-center'>
                            <SubmitButton
                                text="Update Sales Outlet"
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

export default EditSalesOutlet