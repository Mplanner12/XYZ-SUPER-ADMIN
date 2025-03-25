"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface BillingConfigProps {
  onNext: () => void;
  onPrev: () => void;
}

// Define the schema for billing configuration validation
const billingConfigSchema = z.object({
  currency: z.string().min(1, { message: "Please select a currency" }),
  paymentTerms: z
    .string()
    .min(1, { message: "Payment terms are required" })
    .regex(/^\d+$/, { message: "Payment terms must be a number" }),
  invoiceFormat: z.string().min(1, { message: "Invoice format is required" }),
  autoEnabled: z.boolean().default(false),
});

type BillingConfigType = z.infer<typeof billingConfigSchema>;

const BillingConfig: React.FC<BillingConfigProps> = ({ onNext, onPrev }) => {
  const [autoEnabled, setAutoEnabled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BillingConfigType>({
    resolver: zodResolver(billingConfigSchema),
    defaultValues: {
      currency: "",
      paymentTerms: "30",
      invoiceFormat: "INV-{YYYY}-{0000}",
      autoEnabled: false,
    },
  });

  const currencyOptions = [
    { value: "USD", label: "US Dollar (USD)" },
    { value: "EUR", label: "Euro (EUR)" },
    { value: "GBP", label: "British Pound (GBP)" },
    { value: "JPY", label: "Japanese Yen (JPY)" },
    { value: "CAD", label: "Canadian Dollar (CAD)" },
    { value: "AUD", label: "Australian Dollar (AUD)" },
  ];

  const onSubmit = (data: BillingConfigType) => {
    console.log("Submitting billing config:", data);
    onNext();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center text-foundation-black-black-400 mb-6">
        Billing Configuration
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Billing Currency */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-foundation-black-black-400 mb-2">
            Billing Currency
          </h3>
          <p className="text-foundation-grey-grey-700 mb-2">Currency</p>
          <div className="relative">
            <select
              {...register("currency")}
              className="w-full px-4 py-3 border border-foundation-grey-grey-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-foundation-purple-purple-100"
            >
              <option value="" disabled>
                Select currency
              </option>
              {currencyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          {errors.currency && (
            <p className="text-red-500 text-sm mt-1">
              {errors.currency.message}
            </p>
          )}
        </div>

        {/* Default Payment Terms */}
        <div className="mb-6">
          <label
            htmlFor="paymentTerms"
            className="block text-foundation-black-black-400 mb-2"
          >
            Default Payment Terms (Days)
          </label>
          <input
            type="text"
            id="paymentTerms"
            {...register("paymentTerms")}
            className="w-full px-4 py-3 border border-foundation-grey-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-foundation-purple-purple-100"
          />
          {errors.paymentTerms && (
            <p className="text-red-500 text-sm mt-1">
              {errors.paymentTerms.message}
            </p>
          )}
        </div>

        {/* Invoice Sequence Format */}
        <div className="mb-6">
          <label
            htmlFor="invoiceFormat"
            className="block text-foundation-black-black-400 mb-2"
          >
            Invoice Sequence Format
          </label>
          <input
            type="text"
            id="invoiceFormat"
            {...register("invoiceFormat")}
            placeholder="INV-{YYYY}-{0000}"
            className="w-full px-4 py-3 border border-foundation-grey-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-foundation-purple-purple-100"
          />
          {errors.invoiceFormat && (
            <p className="text-red-500 text-sm mt-1">
              {errors.invoiceFormat.message}
            </p>
          )}
        </div>

        {/* Enable Auto Billing */}
        <div className="flex items-center justify-between mb-10">
          <label
            htmlFor="autoEnabled"
            className="text-foundation-black-black-400"
          >
            Enable Auto Billing
          </label>
          <div
            className={`relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors ${
              autoEnabled
                ? "bg-foundation-purple-purple-400"
                : "bg-foundation-grey-grey-300"
            }`}
            onClick={() => setAutoEnabled(!autoEnabled)}
          >
            <input
              type="checkbox"
              id="autoEnabled"
              className="sr-only"
              {...register("autoEnabled")}
              checked={autoEnabled}
              onChange={() => setAutoEnabled(!autoEnabled)}
            />
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                autoEnabled ? "translate-x-5" : "translate-x-1"
              } my-0.5`}
            />
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={onPrev}
            className="px-8 py-3 border border-foundation-grey-grey-300 rounded-lg text-foundation-black-black-400 hover:bg-foundation-grey-grey-50 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-foundation-purple-purple-400 text-white rounded-lg hover:bg-foundation-purple-purple-300 transition-colors"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default BillingConfig;
