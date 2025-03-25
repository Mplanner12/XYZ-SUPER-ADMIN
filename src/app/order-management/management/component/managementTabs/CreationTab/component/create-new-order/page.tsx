"use client";
import React, { useEffect, useState } from 'react';
import { ArrowRightFromLine, ChevronLeft, Plus } from 'lucide-react';
import CustomInput from '@/components/Frominput/CustomInput';
import { useFormik } from 'formik';
import { allocationOrderOptions } from '@/util/mockData/mockData';
import CreateOrderInfoTab from './CreateOrderInfoTab/CreateOrderInfoTab';
import ActionButton from '@/components/Buttons/ActionButton';
import { useRouter } from 'next/navigation';
import { useModal } from '@/util/Modals/ModalsContext';
import AddNewCustomerModal from './modal/AddNewCustomerModal';
import { useFetchCustomerName } from '@/services/OrderManagementServices';
import { updateCustomerDefault_Dnventory } from '@/services/OrderManagementServices/UpdateApi';
import { CreateOrderPostType } from '@/components/interface/postInterface';
import { addNewOrderCreation } from '@/services/OrderManagementServices/PostApi';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';
import { CustomError } from '@/components/interface/errormessage';
import { useGetInventories } from '@/app/inventory/hooks/query';
import ImportOrderExelSheet from './component/ImportOrderExelSheet/ImportOrderExelSheet';

const CreateNewOrderPage: React.FC = () => {
  const { openModal } = useModal();
  const { data: fetchCustomer } = useFetchCustomerName()
  const { data: fetchInventories } = useGetInventories()
  
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('orderInfo');
  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [isloading, setLoading] = useState(false)
  useEffect(() => {
    if (fetchCustomer) {
      setCustomers(fetchCustomer);
    }
  }, [fetchCustomer]);

  const handleBackClick = () => {
    router.back();
  };


  const formik = useFormik({
    initialValues: {
      order_type: 1,
      products: [
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
      ],
      customer: '',
      phone: '',
      street_address: '',
      state: '',
      country: '',
      postal_code: '',
      allocate_order: '',
      delivery_date: '',
      // delivery_status: '',
      delivery_vendor: 3,
      end_date: '',
      payment_method_for_repeat_order: '',
      // payment_status: '',
      repeat_order: false,
      // repeat_order_frequency: '',
      start_date: '',
      default_inventory: false,
      customerEmail: '',
      tax_applied:'',
      other_charges:""

    },
    onSubmit: async (values:CreateOrderPostType) => {
      // await updateCustomerDefault_Dnventory(selectedCustomerId);

      try {
        const { default_inventory, customerEmail, ...rest } = values;

        const updatedValues = {
          ...rest,
          // customer: Number(values.customer) ,
          // allocate_order: Number(values.allocate_order),
          delivery_vendor:Number(values.delivery_vendor)
        };
        const response = await addNewOrderCreation(updatedValues);
        if (response.status === 200) {
            toast.success(response.message)
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

      // try {
      //   console.log('All form data:', values);
      //   if (!selectedCustomerId) {
      //     console.error('No customer selected.');
      //     return;
      //   }
      //   const formData = {
      //     default_inventory: values.default_inventory,
      //   };
      //   await updateCustomerDefault_Dnventory(formData, selectedCustomerId);
      // } catch (error) {
      //   console.error('Error updating default inventory:', error);
      // }
    }
  });



  const handleAddCustomerModal = () => {
    openModal(<AddNewCustomerModal />);
  };

  const handleOrderExelSheet = () => {
    openModal(<ImportOrderExelSheet />);
  };

  const handleTabNavigation = () => {
    if (activeTab === 'orderInfo') {
      setActiveTab('deliveryInfo');
    } else if (activeTab === 'deliveryInfo') {
      setActiveTab('Taxes_and_Other_Charges');
    }else if (activeTab === 'Taxes_and_Other_Charges'){
      setActiveTab("repeatOrderInfo")
    } else if (activeTab === 'repeatOrderInfo') {
      formik.handleSubmit();
    }
  };


  const handleCustomerChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'customer') {
      const selectedCustomer = customers.find(customer => customer.id.toString() === value);

      if (selectedCustomer) {
        setSelectedCustomerId(selectedCustomer.id.toString());
        formik.setValues({
          ...formik.values,
          customer: String(value),
          customerEmail: selectedCustomer.email,
          phone: selectedCustomer.phone,
          street_address: selectedCustomer.street_address,
          state: selectedCustomer.state,
          country: selectedCustomer.country,
          postal_code: selectedCustomer.postal_code,
        });
      }
    } else {
      formik.handleChange(event);
    }
  };

  return (
    <section>
      <main>
        <div className='flex justify-between items-center'>
          <div className='gap-4 flex items-center'>
            <ChevronLeft className='text-primary-normal cursor-pointer' onClick={handleBackClick} />
            <p className='font-medium tracking-wider text-[#434343] text-base md:text-xl'>
              Create a New Order
            </p>
          </div>
          <p className='text-xs md:text-lg font-medium text-[#939292]'>Sales Order: 6789</p>
        </div>

        <div className='my-4 items-center flex gap-2'>
          <p className='font-medium tracking-wider text-[#434343] text-base md:text-lg'>
            Order Information
          </p>
          <div className='flex items-center gap-3'
          onClick={handleOrderExelSheet}
          >
            <p className='font-medium tracking-wide cursor-pointer text-primary-normal text-sm md:text-base'>
              Import From Excel Sheet
            </p>
            <ArrowRightFromLine className='text-primary-normal' />
          </div>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className='w-full [@media(min-width:900px)]:w-[45rem]'>
            <div className='flex flex-col md:flex-row w-full gap-3'>
              <div className='w-full flex flex-col'>
                <CustomInput
                  placeholder='Select A Customer'
                  label='Customer Name'
                  type='select'
                  id='customer'
                  name='customer'
                  value={formik.values.customer.toString()}
                  onChange={handleCustomerChange}
                  options={customers.map((customer) => ({
                    label: `${customer.first_name} ${customer.last_name}`,
                    value: customer.id.toString()
                  }))}
                />
                <div
                  onClick={handleAddCustomerModal}
                  className='flex items-center gap-2 w-fit cursor-pointer'
                >
                  <Plus className='text-primary-normal' />
                  <p className='font-medium tracking-wide text-primary-normal text-sm md:text-base'>
                    Add New Customer
                  </p>
                </div>
              </div>

              <div className='w-full flex flex-col'>
                <CustomInput
                  placeholder='Select an Inventory Location'
                  label='Allocate Order'
                  type='select'
                  id='allocate_order'
                  name='allocate_order'
                  value={formik.values.allocate_order.toString()}
                  onChange={formik.handleChange}
                  options={fetchInventories?.map((inventory: { name: any; id: { toString: () => any; }; }) => ({
                    label: inventory.name,
                    value: inventory.id.toString(),
                  })) || []}
                />
                <div className='flex items-center gap-1 justify-end'>
                  <input
                    id='default_inventory'
                    name='default_inventory'
                    type='checkbox'
                    checked={formik.values.default_inventory}
                    onChange={formik.handleChange}
                    className='border text-primary-normal w-4 h-4 bg-primary-normal border-primary-normal'
                  />
                  <label htmlFor='default_inventory' className='text-[#434343] text-base'>
                    Mark as Default Inventory Location
                  </label>
                </div>
              </div>
            </div>
          </div>

          <CreateOrderInfoTab
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            formik={formik}
          />

          <ActionButton
            customPadding='w-[14rem] py-4'
            text={
              activeTab === 'repeatOrderInfo'
                ? 'Submit'
                : 'Proceed'
            }
            onClick={handleTabNavigation}
          />
        </form>
        {/* <CreateOrderInfoTab activeTab={activeTab} setActiveTab={setActiveTab} />
          <ActionButton
            customPadding='w-[14rem] py-4'
            text={
              activeTab === 'repeatOrderInfo'
                ? 'Submit'
                : activeTab === 'deliveryInfo'
                ? 'Proceed'
                : 'Proceed'
            }
            onClick={activeTab === 'repeatOrderInfo' ? formik.handleSubmit : handleTabNavigation}
          /> */}
      </main>
    </section>
  );
};

export default CreateNewOrderPage;
