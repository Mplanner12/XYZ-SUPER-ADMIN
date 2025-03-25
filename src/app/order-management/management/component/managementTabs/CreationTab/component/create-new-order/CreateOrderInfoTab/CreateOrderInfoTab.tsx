import React, { useCallback, useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import CreateOrderTable from '../component/CreateOrderTable';
import CustomInput from '@/components/Frominput/CustomInput';
import { OrderData } from '@/components/interface/TypeInterface';
import { useCountriesData, useStateData } from '@/hooks/query/utilsApiCallBack';
import { generalYesAndNo } from '@/util/mockData/mockData';
import { debounce } from 'lodash';
import { useModal } from '@/util/Modals/ModalsContext';
import AddCustomTaskModal from '../../order-creation-settings/component/AddCustomTaskModal/AddCustomTaskModal';
import { Plus, SquareStack } from 'lucide-react';
import AddCustomChargesModal from '../../order-creation-settings/component/AddCustomChargesModal/AddCustomChargesModal';




interface CreateOrderInfoTabProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    formik: any;
}

const CreateOrderInfoTab: React.FC<CreateOrderInfoTabProps> = ({ activeTab, setActiveTab, formik }) => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [countrySearchTerm, setCountrySearchTerm] = useState("");
    const { data: countriesResponse, isLoading: isLoadingCountries, refetch: refetchCountries } = useCountriesData(countrySearchTerm);
    const { data: stateResponse, isLoading: isState } = useStateData(selectedCountry);
    const { openModal } = useModal();

    const handleAddCustomTaskModal = () => {
        openModal(<AddCustomTaskModal />)
    }

    const handleAddCustomChargesModal = () => {
        openModal(<AddCustomChargesModal />)
    }

    const columns: ColumnDef<OrderData, any>[] = [
        { header: 'ID', accessorKey: 'id' },
        { header: 'Product', accessorKey: 'product' },
        { header: 'Description', accessorKey: 'description' },
        { header: 'Product Category', accessorKey: 'productCategory' },
        { header: 'UoM', accessorKey: 'uoM' },
        { header: 'Stock Quantity', accessorKey: 'stockQuantity' },
        { header: 'Unit Price (USD)', accessorKey: 'unitPrice' },
        { header: 'Total Price (USD)', accessorKey: 'totalPrice' },
    ];


    const handleAddRow = () => {
        formik.setFieldValue('products', [
            ...formik.values.products,
            {
                id: '',
                product: '',
                description: '',
                productCategory: '',
                uoM: '',
                stockQuantity: '',
                unitPrice: '',
                totalPrice: '',
            },
        ]);
    };

    const handleUpdateRow = (index: number, key: string, value: any) => {
        const updatedProducts = [...formik.values.products];
        updatedProducts[index] = { ...updatedProducts[index], [key]: value };
        formik.setFieldValue('products', updatedProducts);
    };

    useEffect(() => {
        setSelectedCountry(formik.values.country);
    }, [formik.values.country]);


    const handleCountrySearch = useCallback(
        debounce((searchTerm: string) => {
            setCountrySearchTerm(searchTerm);
            refetchCountries();
        }, 300),
        [refetchCountries]
    );

    return (
        <div>
            <div className="flex mt-5">
                <button
                    type="button"
                    className={`px-4 py-2 rounded-l-lg ${activeTab === 'orderInfo'
                        ? 'bg-primary-normal text-white'
                        : 'text-primary-normal border border-primary-normal'
                        }`}
                    onClick={() => setActiveTab('orderInfo')}
                >
                    Order Info
                </button>
                <button
                    type="button"
                    className={`px-4 py-2 ${activeTab === 'deliveryInfo'
                        ? 'bg-primary-normal text-white'
                        : 'text-primary-normal border-t border-b border-r border-primary-normal'
                        }`}
                    onClick={() => setActiveTab('deliveryInfo')}
                >
                    Delivery Info
                </button>
                <button
                    type="button"
                    className={`px-4 py-2 ${activeTab === 'Taxes_and_Other_Charges'
                        ? 'bg-primary-normal text-white'
                        : 'text-primary-normal border-t border-b border-r border-primary-normal'
                        }`}
                    onClick={() => setActiveTab('Taxes_and_Other_Charges')}
                >
                    Taxes & and Other Charges
                </button>
                <button
                    type="button"
                    className={`px-4 py-2 rounded-r-lg ${activeTab === 'repeatOrderInfo'
                        ? 'bg-primary-normal text-white'
                        : 'text-primary-normal border border-primary-normal'
                        }`}
                    onClick={() => setActiveTab('repeatOrderInfo')}
                >
                    Repeat Order Info
                </button>
            </div>

            <div>
                <div className="mt-4">
                    {activeTab === 'orderInfo' && (
                        <div>
                            <CreateOrderTable
                                data={formik.values.products}
                                columns={columns}
                                onAddRow={handleAddRow}
                                onUpdateRow={handleUpdateRow}
                            />
                        </div>
                    )}
                    {activeTab === 'deliveryInfo' && (
                        <div className='w-[45rem] flex flex-col gap-4'>
                            <div className='flex flex-row gap-3'>
                                <CustomInput
                                    placeholder='davidsimon@gmail.com'
                                    label="Customer Email Address"
                                    type='email'
                                    id="customerEmail"
                                    name='customerEmail'
                                    value={formik.values.customerEmail}
                                    onChange={formik.handleChange}
                                    // value={customer.allocationOrder}
                                    // onChange={(e) => handleChange(e, index)}
                                    // options={allocationOrderOptions}
                                    readOnly={true}
                                />

                                <CustomInput
                                    placeholder='+23489504034'
                                    label="Phone Number"
                                    type='text'
                                    id="phone"
                                    name='phone'
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                />
                            </div>


                            <div className='flex flex-row gap-2'>
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
                            </div>

                            <div className='flex flex-row gap-3'>
                                <CustomInput
                                    placeholder='No 9 Victoria Island'
                                    label="Street Address"
                                    type='text'
                                    id="street_address"
                                    name='street_address'
                                    value={formik.values.street_address}
                                    onChange={formik.handleChange}
                                />

                                <CustomInput
                                    placeholder='092309'
                                    label="Postal Code"
                                    type='text'
                                    id="postal_code"
                                    name='postal_code'
                                    value={formik.values.postal_code}
                                    onChange={formik.handleChange}
                                />
                            </div>


                            <div className='flex flex-row gap-3'>
                                <CustomInput
                                    placeholder='GIG'
                                    label="Delivery Vendor"
                                    type='select'
                                    id="delivery_vendor"
                                    name='delivery_vendor'
                                    value={formik.values.delivery_vendor}
                                    onChange={formik.handleChange}
                                // Add options for delivery_vendor
                                />

                                <CustomInput
                                    label="Delivery Date"
                                    type='date'
                                    id="delivery_date"
                                    name='delivery_date'
                                    value={formik.values.delivery_date}
                                    onChange={formik.handleChange}
                                />

                            </div>
                        </div>
                    )}
                    {activeTab === 'Taxes_and_Other_Charges' && (
                        <div>
                            <div className='w-[45rem] flex flex-col gap-4'>
                                <h2 className="font-medium tracking-wider text-[#434343] text-lg">Tax & Other Charges</h2>

                                <div className='w-1/2'>
                                    <CustomInput
                                        placeholder='East Bayshore, Out of state'
                                        label="Task Applied"
                                        type='select'
                                        id="tax_applied"
                                        name='tax_applied'
                                        value={formik.values.tax_applied}
                                        onChange={formik.handleChange}
                                    />

                                    <div className='flex items-center gap-2 mb-3 cursor-pointer w-fit'
                                        onClick={handleAddCustomTaskModal}
                                    >
                                        <Plus className='text-primary-normal' />
                                        <p className='font-medium tracking-wide text-primary-normal text-base'>Add another tax </p>
                                    </div>
                                </div>

                                <div className='w-1/2'>
                                    <CustomInput
                                        placeholder='Service Charge, Processing Fee'
                                        label="Other Charges"
                                        type='select'
                                        id="other_charges"
                                        name='other_charges'
                                        value={formik.values.other_charges}
                                        onChange={formik.handleChange}
                                    />
                                    <div className='flex items-center gap-2 mb-3 cursor-pointer w-fit'
                                        onClick={handleAddCustomChargesModal}
                                    >
                                        <Plus className='text-primary-normal' />
                                        <p className='font-medium tracking-wide text-primary-normal text-base'>Add another charges </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'repeatOrderInfo' && (
                        <div className='w-[45rem] flex flex-col gap-4'>
                            <h2 className="font-medium tracking-wider text-[#434343] text-lg">Repeat Order Information</h2>
                            <div className='flex flex-row gap-3'>
                                <CustomInput
                                    placeholder='select Reapeat order'
                                    label="Reapeat Order"
                                    type='select'
                                    id="repeat_order"
                                    name='repeat_order'
                                    value={formik.values.repeat_order}
                                    onChange={formik.handleChange}
                                    // value={customer.allocationOrder}
                                    // onChange={(e) => handleChange(e, index)}
                                    options={generalYesAndNo}
                                />

                                <CustomInput
                                    placeholder='Select the frequency of this repeat order'
                                    label="Repeat Order Frequency"
                                    type='select'
                                    id="repeat_order_frequency"
                                    name='repeat_order_frequency'
                                    value={formik.values.repeat_order_frequency}
                                    onChange={formik.handleChange}
                                // Add options for repeat_order_frequency
                                />
                            </div>

                            <div className='flex flex-row gap-3'>
                                <CustomInput
                                    placeholder='Select a Payment method'
                                    label="Payment Method for Repeat Order"
                                    type='select'
                                    id="payment_method_for_repeat_order"
                                    name='payment_method_for_repeat_order'
                                    value={formik.values.payment_method_for_repeat_order}
                                    onChange={formik.handleChange}
                                // Add options for payment_method_for_repeat_order
                                />

                                <CustomInput
                                    placeholder='Select a starting date'
                                    label="Start Date"
                                    type='date'
                                    id="start_date"
                                    name='start_date'
                                    value={formik.values.start_date}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            <div className='w-1/2'>
                                <CustomInput
                                    placeholder='Select a date to end repeat order'
                                    label="End Date"
                                    type='date'
                                    id="end_date"
                                    name='end_date'
                                    value={formik.values.end_date}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateOrderInfoTab;
