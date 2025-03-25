"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Settings } from "lucide-react";

interface APIIntegrationSetupProps {
  onNext: () => void;
  onPrev: () => void;
}

// Define the schema for API integration validation
const apiIntegrationSchema = z.object({
  paymentGateway: z.string().optional(),
  emailService: z.string().optional(),
  cloudStorage: z.string().optional(),
  analytics: z.string().optional(),
});

type APIIntegrationType = z.infer<typeof apiIntegrationSchema>;

const APIIntegrationSetup: React.FC<APIIntegrationSetupProps> = ({
  onNext,
  onPrev,
}) => {
  const [showConfigModal, setShowConfigModal] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<APIIntegrationType>({
    resolver: zodResolver(apiIntegrationSchema),
    defaultValues: {
      paymentGateway: "",
      emailService: "",
      cloudStorage: "",
      analytics: "",
    },
  });

  const onSubmit = (data: APIIntegrationType) => {
    console.log("Submitting API integration setup:", data);
    onNext();
  };

  const handleConfigClick = (section: string) => {
    setShowConfigModal(section);
    // In a real implementation, you would show a configuration modal here
    console.log(`Opening configuration for ${section}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center text-foundation-black-black-400 mb-6">
        Integration Setup
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Payment Gateway */}
        <div className="mb-6 p-6 bg-white border border-foundation-grey-grey-300 rounded-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium text-foundation-black-black-400">
                Payment Gateway
              </h3>
              <p className="text-foundation-grey-grey-700 mt-1">
                Configure payment processing integration
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleConfigClick("paymentGateway")}
              className="p-2 bg-white border border-foundation-grey-grey-300 rounded-md hover:bg-foundation-grey-grey-50 transition-colors"
            >
              <Settings size={18} className="text-foundation-grey-grey-700" />
            </button>
          </div>
          <div>
            <label
              htmlFor="paymentGateway"
              className="block text-foundation-black-black-400 text-center mb-2"
            >
              API Key
            </label>
            <input
              type="text"
              id="paymentGateway"
              {...register("paymentGateway")}
              className="w-full px-4 py-3 border border-foundation-grey-grey-300 rounded-md focus:outline-none focus:ring-2 focus:ring-foundation-purple-purple-100"
            />
            {errors.paymentGateway && (
              <p className="text-red-500 text-sm mt-1">
                {errors.paymentGateway.message}
              </p>
            )}
          </div>
        </div>

        {/* Email Service */}
        <div className="mb-6 p-6 bg-white border border-foundation-grey-grey-300 rounded-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium text-foundation-black-black-400">
                Email Service
              </h3>
              <p className="text-foundation-grey-grey-700 mt-1">
                Set up email service provider
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleConfigClick("emailService")}
              className="p-2 bg-white border border-foundation-grey-grey-300 rounded-md hover:bg-foundation-grey-grey-50 transition-colors"
            >
              <Settings size={18} className="text-foundation-grey-grey-700" />
            </button>
          </div>
          <div>
            <label
              htmlFor="emailService"
              className="block text-foundation-black-black-400 text-center mb-2"
            >
              API Key
            </label>
            <input
              type="text"
              id="emailService"
              {...register("emailService")}
              className="w-full px-4 py-3 border border-foundation-grey-grey-300 rounded-md focus:outline-none focus:ring-2 focus:ring-foundation-purple-purple-100"
            />
            {errors.emailService && (
              <p className="text-red-500 text-sm mt-1">
                {errors.emailService.message}
              </p>
            )}
          </div>
        </div>

        {/* Cloud Storage */}
        <div className="mb-6 p-6 bg-white border border-foundation-grey-grey-300 rounded-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium text-foundation-black-black-400">
                Cloud Storage
              </h3>
              <p className="text-foundation-grey-grey-700 mt-1">
                Configure cloud storage integration
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleConfigClick("cloudStorage")}
              className="p-2 bg-white border border-foundation-grey-grey-300 rounded-md hover:bg-foundation-grey-grey-50 transition-colors"
            >
              <Settings size={18} className="text-foundation-grey-grey-700" />
            </button>
          </div>
          <div>
            <label
              htmlFor="cloudStorage"
              className="block text-foundation-black-black-400 text-center mb-2"
            >
              API Key
            </label>
            <input
              type="text"
              id="cloudStorage"
              {...register("cloudStorage")}
              className="w-full px-4 py-3 border border-foundation-grey-grey-300 rounded-md focus:outline-none focus:ring-2 focus:ring-foundation-purple-purple-100"
            />
            {errors.cloudStorage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.cloudStorage.message}
              </p>
            )}
          </div>
        </div>

        {/* Analytics */}
        <div className="mb-8 p-6 bg-white border border-foundation-grey-grey-300 rounded-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium text-foundation-black-black-400">
                Analytics
              </h3>
              <p className="text-foundation-grey-grey-700 mt-1">
                Set up analytics tracking
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleConfigClick("analytics")}
              className="p-2 bg-white border border-foundation-grey-grey-300 rounded-md hover:bg-foundation-grey-grey-50 transition-colors"
            >
              <Settings size={18} className="text-foundation-grey-grey-700" />
            </button>
          </div>
          <div>
            <label
              htmlFor="analytics"
              className="block text-foundation-black-black-400 text-center mb-2"
            >
              API Key
            </label>
            <input
              type="text"
              id="analytics"
              {...register("analytics")}
              className="w-full px-4 py-3 border border-foundation-grey-grey-300 rounded-md focus:outline-none focus:ring-2 focus:ring-foundation-purple-purple-100"
            />
            {errors.analytics && (
              <p className="text-red-500 text-sm mt-1">
                {errors.analytics.message}
              </p>
            )}
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

export default APIIntegrationSetup;
