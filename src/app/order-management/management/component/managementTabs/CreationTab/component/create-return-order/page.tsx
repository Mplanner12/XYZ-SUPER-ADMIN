"use client"
import CustomInput from '@/components/Frominput/CustomInput';
import { Customer, InvoiceData, OrderData } from '@/components/interface/TypeInterface';
import { allocationOrderOptions, CreateReturnOrderData, customerOptions } from '@/util/mockData/mockData';
import { ColumnDef } from '@tanstack/react-table';
import { FormikErrors, useFormik } from 'formik';
import { ChevronLeft, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'
import ActionButton from '@/components/Buttons/ActionButton';
import NonEditAbleTable from '../create-new-order/component/NonEditAbleTable';



const CreateReturnOrderpage: React.FC = () => {

    // interface LocationData {
    //     name: string;
    //     address: string;
    //     coordinates?: string;
    //     postalCode?: string;
    //     preferredCurrency?: string;
    //   }

    //   const columns: ColumnDef<LocationData, any>[] = [
    //     {
    //       id: 'name', // Add id here
    //       header: 'Store Outlets',
    //       accessorKey: 'name',
    //     },
    //     {
    //       id: 'address',
    //       header: 'Address',
    //       accessorKey: 'address',
    //     },
    //     {
    //       id: 'coordinates',
    //       header: 'Location on Map',
    //       accessorKey: 'coordinates',
    //     },
    //     {
    //       id: 'postalCode',
    //       header: 'Postal Code',
    //       accessorKey: 'postalCode',
    //     },
    //     {
    //       id: 'preferredCurrency',
    //       header: 'Preferred Currency',
    //       accessorKey: 'preferredCurrency',
    //     }
    //   ];

    const router = useRouter();

    const handleBackClick = () => {
        router.back();
    };

    const formik = useFormik<{
        customers: Customer[];
        orders: OrderData[];
        invoice: InvoiceData[];
    }>({
        initialValues: {
            customers: [
                { customerName: '', allocationOrder: '', defaultInventoryLocation: false }
            ],
            orders: [
                {
                    id: "",
                    product: "",
                    description: "",
                    productCategory: "",
                    uoM: "",
                    stockQuantity: "",
                    unitPrice: "",
                    totalPrice: "",
                }
            ],
            invoice: [
                { invoiceID: "" }
            ]
        },
        onSubmit() { },
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        index: number
    ) => {
        const { name, value, type } = e.target;
        const customers = [...formik.values.customers];

        if (type === 'checkbox') {
            const isChecked = (e.target as HTMLInputElement).checked;
            customers[index] = {
                ...customers[index],
                [name]: isChecked
            };
        } else {
            customers[index] = {
                ...customers[index],
                [name]: value
            };
        }

        formik.setFieldValue('customers', customers);
    };

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

    // const handleAddRow = () => {
    //     formik.setFieldValue('orders', [
    //         ...formik.values.orders,
    //         {
    //             id: "",
    //             product: "",
    //             description: "",
    //             productCategory: "",
    //             uoM: "",
    //             stockQuantity: "",
    //             unitPrice: "",
    //             totalPrice: "",
    //         }
    //     ]);
    // };

    // const handleUpdateRow = (index: number, key: string, value: any) => {
    //     const updatedData = formik.values.orders.map((row, rowIndex) =>
    //         rowIndex === index ? { ...row, [key]: value } : row
    //     );
    //     formik.setFieldValue('orders', updatedData);
    // };


    // const addNewCustomer = () => {
    //     const customers = [
    //         ...formik.values.customers,
    //         { customerName: '', allocationOrder: '', defaultInventoryLocation: false },
    //     ];
    //     formik.setFieldValue('customers', customers);
    // };

    const handleInvoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        formik.setFieldValue('invoice[0].invoiceID', value);
    };

    return (
        <section>
            <main>
                <div className='flex justify-between items-center'>
                    <div className='gap-2 md:gap-4 flex items-center'>
                        <ChevronLeft className='text-primary-normal cursor-pointer' onClick={handleBackClick} />
                        <p className='font-medium tracking-wider text-[#434343] text-lg md:text-xl'>
                            Create a Return Order
                        </p>
                    </div>
                    <p className='text-xs md:text-lg font-medium text-[#939292]'>Sales Order: 6789</p>
                </div>

                <div className='my-4'>
                    <p className='font-medium tracking-wider text-[#434343] text-base md:text-lg'>
                        Order Information
                    </p>
                </div>

                <form onSubmit={formik.handleSubmit}>
                    <div className='w-full [@media(min-width:900px)]:w-[45rem]'>
                        {formik.values.customers.map((customer, index) => (
                            <div
                                key={index}
                                className='flex flex-col md:flex-row w-full just items-baseline flex-1 gap-3 mb-4'
                            >
                                <CustomInput
                                    placeholder='Select A Customer'
                                    label='Customer Name'
                                    type='select'
                                    id={`customerName-${index}`}
                                    name='customerName'
                                    value={customer.customerName}
                                    onChange={(e) => handleChange(e, index)}
                                    options={customerOptions}
                                    error={
                                        formik.touched.customers?.[index]?.customerName &&
                                            formik.errors.customers &&
                                            formik.errors.customers[index] &&
                                            (formik.errors.customers as FormikErrors<Customer[]>)[index]
                                                ?.customerName
                                            ? (formik.errors.customers as FormikErrors<Customer[]>)[index]
                                                ?.customerName
                                            : undefined
                                    }
                                />

                                <div className='w-full flex flex-col'>
                                    <CustomInput
                                        placeholder='Select an Inventory Location'
                                        label='Allocate Order '
                                        type='select'
                                        id={`allocationOrder-${index}`}
                                        name='allocationOrder'
                                        value={customer.allocationOrder}
                                        onChange={(e) => handleChange(e, index)}
                                        options={allocationOrderOptions}
                                        error={
                                            formik.touched.customers?.[index]?.allocationOrder &&
                                                formik.errors.customers &&
                                                formik.errors.customers[index] &&
                                                (formik.errors.customers as FormikErrors<Customer[]>)[index]
                                                    ?.allocationOrder
                                                ? (formik.errors.customers as FormikErrors<Customer[]>)[index]
                                                    ?.allocationOrder
                                                : undefined
                                        }
                                    />

                                    <div className='flex items-center gap-1 justify-end'>
                                        <input
                                            id={`defaultInventoryLocation-${index}`}
                                            name='defaultInventoryLocation'
                                            type='checkbox'
                                            checked={customer.defaultInventoryLocation}
                                            onChange={(e) => handleChange(e, index)}
                                            className='border text-primary-normal w-4 h-4 bg-primary-normal  border-primary-normal'
                                        />
                                        <label
                                            htmlFor={`defaultInventoryLocation-${index}`}
                                            className='text-[#434343] text-xs md:text-base '
                                        >
                                            Mark as Default Inventory Location
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='md:w-1/3 mb-5 w-[60%]'>
                    <CustomInput
                        placeholder='Invoice Number'
                        label='Invoice Number'
                        type='text'
                        id="formik.values.invoice.invoiceID"
                        name='formik.values.invoice.invoiceID'
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
                            const invoice = [...formik.values.invoice];
                            invoice[0] = { ...invoice[0], invoiceID: e.target.value };
                            formik.setFieldValue('invoice', invoice);
                        }}
                        value={formik.values.invoice[0].invoiceID}

                    />
                    </div>
                    <NonEditAbleTable
                        initialData={CreateReturnOrderData}
                        columns={columns}
                    />

                    <ActionButton actionType='submit' text="Proceed" customPadding='w-[14rem] py-4 mt-5' />
                </form>
            </main>
        </section>
    )
}

export default CreateReturnOrderpage