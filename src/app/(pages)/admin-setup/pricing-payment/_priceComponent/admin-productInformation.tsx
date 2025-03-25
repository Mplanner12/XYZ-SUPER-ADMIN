import InputElement from "@/app/(pages)/setup/_setupComponets/Input/InputElement";
import InputFileUpload from "@/app/(pages)/setup/_setupComponets/Input/UploadInputElement";
import * as data from "@/data/setupData";
import { businessType, filingInformation } from "@/data/setupData";
import {
  useCountriesData,
  useCurrenciesData,
  useLanguageData,
  useStateData,
} from "@/hooks/query/utilsApiCallBack";
import { PricePaymentSchema } from "@/lib/pricePaymentSchema";
import { formDataSchema } from "@/lib/setupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FaAsterisk } from "react-icons/fa";
import { z } from "zod";
import SelectElement from "@/app/(pages)/setup/_setupComponets/Input/SelectElement";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Image from "next/image";
import SubmitButton from "@/components/Buttons/SubmitButton";

const PriceInfoSchema = z.object({
  preferred_currency: z.string().min(1, "Preferred Currency is required"),
  renewal_type: z.string().min(1, "renewal type is required"),
  order_history: z.string().min(1, "order history is required"),
  payment_method: z.string().min(1, "payment method is required"),
  payment_plan: z.string().min(1, "payment plan is required"),
  number_users: z.string().min(1, "number of users is required"),
  customer_plan: z.string().min(1, "number of users is required"),
});

type Inputs = z.infer<typeof PriceInfoSchema>;

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

const AdminProductInformation: React.FC<Props> = ({ onNext, onPrev }) => {
  const { data: currenciesResponse, isLoading: isCurrencies } =
    useCurrenciesData();

  const methods = useForm<Inputs>({
    resolver: zodResolver(PriceInfoSchema),
  });

  const {
    register,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = methods;

  const handleSubmit = () => {
    onNext();
  };

  return (
    <FormProvider {...methods}>
      <form action="">
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
                  id="customer_plan"
                  label="Customer Plan"
                  options={data.customerPlan}
                  registerName="customer_plan"
                  error={errors.customer_plan?.message}
                />
              </div>
              <div className="w-full">
                <InputElement
                  id="number_users"
                  label="Number of Users"
                  type="number"
                  placeholder="Select number of users"
                  registerName="number_users"
                  // error={errors.number_users?.message}
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
                      className="rounded-[6px] bg-white w-full border-0 bg-inherit h-[2.9rem] py-1.5 px-2 text-[14px] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2  outline-none focus:ring-inset focus:ring-[#8133F1]"
                      // onChange={handleDateChange}
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
                      className="rounded-[6px] bg-white w-full border-0 bg-inherit h-[2.9rem] py-1.5 px-2 text-[14px] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2  outline-none focus:ring-inset focus:ring-[#8133F1]"
                      // onChange={handleDateChange}
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
                <SelectElement
                  id="preferred_currency"
                  label="Currency Type"
                  isLoading={isCurrencies}
                  options={
                    currenciesResponse &&
                    currenciesResponse.map(
                      (currency: { symbol: string; code: string }) => ({
                        value: currency.code,
                        label: currency.code,
                      })
                    )
                  }
                  registerName="preferred_currency"
                  error={errors.preferred_currency?.message}
                />
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
      </form>
    </FormProvider>
  );
};

export default AdminProductInformation;
