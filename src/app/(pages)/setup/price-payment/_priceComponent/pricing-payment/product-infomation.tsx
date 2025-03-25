import InputElement from '@/app/(pages)/setup/_setupComponets/Input/InputElement';
import InputFileUpload from '@/app/(pages)/setup/_setupComponets/Input/UploadInputElement';
import * as data from '@/data/setupData';
import { businessType, filingInformation } from '@/data/setupData';
import { useCountriesData, useCurrenciesData, useLanguageData, useStateData } from '@/hooks/query/utilsApiCallBack';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import SelectElement from '../../../_setupComponets/Input/SelectElement';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import Image from 'next/image';
import SubmitButton from '@/components/Buttons/SubmitButton';
import { debounce } from 'lodash';
import { useGetAccountingListById } from '@/app/accounting/hooks/query';
import { useCreateSubscription } from '@/hooks/mutate';
import { decodeToken } from '@/api';
import { toast } from 'react-toastify';
import LoadingOverlay from '@/components/reusable/LoadingOverlay';

import { useAppDispatch } from '@/redux/Store';
import { setFormData, setPricingType } from '@/redux/Slices/pricingSlice';
import { usePathname } from 'next/navigation';

const PriceInfoSchema = z.object({
  currency: z.string().min(1, "Preferred Currency is required"),
  renewal_type: z.string().min(1, "renewal type is required"),
  order_history: z.string().min(1, "order history is required"),
  payment_method: z.string().min(1, "payment method is required"),
  dateFrom: z.date().nullable(),
  dateTo: z.date().nullable(),
  payment_plan: z.string().min(1, "payment plan is required"),
  no_of_users: z.string().min(1, "number of users is required"),
  plan: z.string().min(1, "number of users is required"),
});


type Inputs = z.infer<typeof PriceInfoSchema>;

interface Props {
	onNext: () => void;
	onPrev: () => void;
}

const ProductInformation: React.FC<Props> = ({onNext, onPrev}) => {

  const [currencySearchTerm, setCurrencySearchterm] = useState("");
  const {data: currencyResponse, isLoading: isCurrency } = useGetAccountingListById({id: '113'});

  const {mutate: createSubscription, isPending} = useCreateSubscription(); 

  // const currencyOptions = currencyResponse.data.ListCategory.flatMap(
  //   (category: { ListSubCategory: Array<{ Name: string; ID: number }> }) =>
  //     category.ListSubCategory.map((subCategory) => ({
  //       value: subCategory.ID,
  //       label: subCategory.Name,
  //     }))
  // );

  const transformOptions = (options: Array<Record<string, any>>) => {
    return options.map((item) => {
      // Find the key that ends with '_name'
      const nameKey = Object.keys(item).find((key) => key.endsWith("_name"));
      const nameValue = nameKey ? item[nameKey] : null;

      return {
        value: nameValue,
        label: nameValue,
      };
    });
  };

  // const transformedOptions = transformOptions(
  //   currencyResponse.data.ListCategory.flatMap(
  //     (category: any) => category.ListSubCategory
  //   )
  // );

	const methods = useForm<Inputs>({
		resolver: zodResolver(PriceInfoSchema),
	});

	const {
		register,
		watch,
		reset,
    handleSubmit,
		formState: { errors },
	} = methods;


  // const handleCurrencySearch = useCallback(
  //   debounce((searchTerm: string) => {
  //     setCurrencySearchterm(searchTerm);
  //     refetchCurrency();
  //   }, 300),
  //   [refetchCurrency]
  // );

  const preferredCurrency = watch("currency");

  const handleDateChange = (date: Date | null, type: "dateFrom" | "dateTo") => {
    // Update the form state based on the date change
    methods.setValue(type, date);
  };

  
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      
        localStorage.setItem('productInfo', JSON.stringify({
        numberOfUsers: data.no_of_users,
        plan: data.plan,
        paymentPlan: data.payment_plan,
        currency: data.currency
      }));
      
      await createSubscription({
        data
      }, {
        onSuccess: () => {
          onNext();
        }, onError(error) {
          toast.error(error.message)
        },
      });
    } catch (error) {
      toast.error
    }
  };

  const dateFromValue = watch("dateFrom");
  const dateToValue = watch("dateTo");

  console.log(currencyResponse);

	return (
    <FormProvider {...methods}>
      {isPending && <LoadingOverlay />}
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="lg:w-[80%] w-full">
          <h2 className="text-base font-semibold leading-7 text-foundation-black-black-400 my-0">
            Product Information
          </h2>

          <div className="max-w-[450px] flex flex-wrap gap-6 justify-between mt-2 mb-7">
            <div className="flex flex-col justify-center items-start text-start gap-2">
              <h4 className="m-0 text-sm font-normal leading-5 text-foundation-black-black-400 my-0">
                Product Name
              </h4>
              <p className="m-0 ml-2 text-foundation-grey-grey-700 text-xs">
                XYZ
              </p>
            </div>
            <div className="flex flex-col 2md:flex-rowcol justify-center items-start text-start gap-2">
              <h4 className="m-0 text-sm font-normal leading-5 text-foundation-black-black-400 my-0">
                Product Number
              </h4>
              <p className="m-0 ml-2 text-foundation-grey-grey-700 text-xs">
                DES-125-1220
              </p>
            </div>
            <div className="flex flex-col 2md:flex-rowcol justify-center items-start text-start gap-2">
              <h4 className="m-0 text-sm font-normal leading-5 text-foundation-black-black-400 my-0">
                Customer ID
              </h4>
              <p className="m-0 ml-2 text-foundation-grey-grey-700 text-xs">
                CIDA10000
              </p>
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-y-4">
            {/* Customer Plan and Number of users */}
            <div className="flex md:flex-row flex-col w-full gap-10">
              <div className="w-full">
                <SelectElement
                  id="plan"
                  label="Customer Plan"
                  options={data.customerPlan}
                  registerName="plan"
                  error={errors.plan?.message}
                />
              </div>
              <div className="w-full">
                <InputElement
                  id="no_of_users"
                  label="Number of Users"
                  type="number"
                  placeholder="Select number of users"
                  registerName="no_of_users"
                  error={errors.no_of_users?.message}
                />
              </div>
            </div>

            {/* Payment plan and Payment method */}
            <div className="flex md:flex-row flex-col w-full gap-10">
              <div className="w-full">
                <SelectElement
                  id="payment_plan"
                  label="Payment Plan"
                  options={data.paymentPlan}
                  registerName="payment_plan"
                  error={errors.payment_plan?.message}
                />
              </div>
              <div className="w-full">
                <SelectElement
                  id="payment_method"
                  label="Payment Method"
                  options={data.paymentMethod}
                  registerName="payment_method"
                  error={errors.payment_method?.message}
                />
              </div>
            </div>

            {/* Order History and Renewal Type */}
            <div className="flex md:flex-row flex-col w-full gap-10">
              <div className="w-full">
                {/* <SelectElement
									id="order_history"
									label="Order History"
									options={data.orderHitory}
									registerName="order_history"
									error={errors.order_history?.message}
								/> */}
                <p className="w-fit h-fit flex font-inter text-sm font-medium leading-6 text-foundation-grey-grey-800 gap-[1px] mb-0.5">
                  Order History
                </p>
                <div className="flex items-center gap-2 ">
                  <p>Date Range</p>
                  <div className="relative">
                    <DatePicker
                      // selected={formik.values.dateFrom}
                      dateFormat="dd/MM/yyyy"
                      selected={dateFromValue}
                      className="rounded-[6px] bg-white w-full border-0 bg-inherit h-[2.9rem] py-1.5 px-2 text-[14px] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2  outline-none focus:ring-inset focus:ring-[#8133F1]"
                      onChange={(date) => handleDateChange(date, "dateFrom")}
                    />
                    <Image
                      src="/calendar.png"
                      className="absolute right-2 top-[.7rem]"
                      width={18}
                      height={18}
                      alt="icon"
                    />
                  </div>
                  <p>to</p>
                  <div className="relative">
                    <DatePicker
                      // selected={formik.values.dateFrom}
                      dateFormat="dd/MM/yyyy"
                      selected={dateToValue}
                      className="rounded-[6px] bg-white w-full border-0 bg-inherit h-[2.9rem] py-1.5 px-2 text-[14px] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2  outline-none focus:ring-inset focus:ring-[#8133F1]"
                      onChange={(date) => handleDateChange(date, "dateTo")}
                    />
                    <Image
                      src="/calendar.png"
                      className="absolute right-2 top-[.7rem]"
                      width={18}
                      height={18}
                      alt="icon"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full">
                <SelectElement
                  id="renewal_type"
                  label="Renewal Type"
                  options={data.renewalType}
                  registerName="renewal_type"
                  error={errors.renewal_type?.message}
                />
              </div>
            </div>

            {/* Business Type and filling information */}
            <div className="flex flex-col w-full gap-10">
              <div className="w-full md:w-[48%]">
                {/* <SelectElement
                  id="currency"
                  label="Currency Type"
                  isLoading={isCurrency}
                  value={preferredCurrency}
                  options={currencyOptions}
                  registerName="currency"
                  error={errors.currency?.message}
                /> */}
              </div>
            </div>
          </div>
          <p className="m-0 my-3">
            <a
              onClick={onNext}
              className=" font-inter text-sm text-foundation-purple-purple-300 cursor-pointer hover:text-foundation-purple-purple-200"
            >
              Try our free plan Valid for 30 days with Limited Features
            </a>
          </p>
        </div>
        <div className="flex justify-between">
          {/* <SubmitButton
            text="Prev"
            onClick={onPrev}
            customPadding="w-20 py-4 mt-5 mb-3"
            actionType="button"
            loading={isPending}
          />
          <SubmitButton
            text="submit"
            customPadding="w-20 py-4 mt-5 mb-3"
            actionType="submit"
            loading={isPending}
          /> */}
        </div>
      </form>
    </FormProvider>
  );
};

export default ProductInformation;
