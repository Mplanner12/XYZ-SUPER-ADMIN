"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronUp, ChevronDown } from "lucide-react";

interface SecurityConfigProps {
  onNext: () => void;
  onPrev: () => void;
}

// Define the schema for security configuration validation
const securityConfigSchema = z.object({
  twoFactorAuth: z.boolean().default(false),
  passwordMinLength: z.number().min(6).default(8),
  requireSpecialChars: z.boolean().default(false),
  requireNumbers: z.boolean().default(false),
  sessionTimeout: z.number().min(5).default(30),
});

type SecurityConfigType = z.infer<typeof securityConfigSchema>;

const SecurityConfig: React.FC<SecurityConfigProps> = ({ onNext, onPrev }) => {
  const [securitySettings, setSecuritySettings] = useState<SecurityConfigType>({
    twoFactorAuth: false,
    passwordMinLength: 8,
    requireSpecialChars: false,
    requireNumbers: false,
    sessionTimeout: 30,
  });

  const { handleSubmit } = useForm<SecurityConfigType>({
    resolver: zodResolver(securityConfigSchema),
    defaultValues: securitySettings,
  });

  const toggleSetting = (key: keyof SecurityConfigType) => {
    if (typeof securitySettings[key] === "boolean") {
      setSecuritySettings((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    }
  };

  const updateNumericValue = (
    key: keyof SecurityConfigType,
    value: number,
    min: number,
    max: number = 100
  ) => {
    const newValue = Math.max(min, Math.min(max, value));
    setSecuritySettings((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  const incrementValue = (
    key: keyof SecurityConfigType,
    min: number,
    max: number = 100
  ) => {
    updateNumericValue(key, (securitySettings[key] as number) + 1, min, max);
  };

  const decrementValue = (key: keyof SecurityConfigType, min: number) => {
    updateNumericValue(key, (securitySettings[key] as number) - 1, min);
  };

  const onSubmit = (data: SecurityConfigType) => {
    console.log("Submitting security configuration:", data);
    onNext();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center text-foundation-black-black-400 mb-6">
        Security Configuration
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Two-Factor Authentication */}
        <div className="mb-6 p-6 bg-white border border-foundation-grey-grey-300 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-foundation-black-black-400">
              Enable Two-Factor Authentication
            </h3>
            <div
              className={`relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors ${
                securitySettings.twoFactorAuth
                  ? "bg-foundation-purple-purple-400"
                  : "bg-foundation-grey-grey-300"
              }`}
              onClick={() => toggleSetting("twoFactorAuth")}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  securitySettings.twoFactorAuth
                    ? "translate-x-5"
                    : "translate-x-1"
                } my-0.5`}
              />
            </div>
          </div>
        </div>

        {/* Password Policy */}
        <div className="mb-6 p-6 bg-white border border-foundation-grey-grey-300 rounded-lg">
          <h3 className="text-lg font-medium text-foundation-black-black-400 text-center mb-4">
            Password Policy
          </h3>

          {/* Minimum Length */}
          <div className="flex items-center justify-between mb-4">
            <label className="text-foundation-black-black-400">
              Minimum Length
            </label>
            <div className="flex items-center">
              <input
                type="text"
                value={securitySettings.passwordMinLength}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0;
                  updateNumericValue("passwordMinLength", value, 6);
                }}
                className="w-16 px-3 py-2 text-center border border-foundation-grey-grey-300 rounded-md focus:outline-none focus:ring-2 focus:ring-foundation-purple-purple-100"
              />
              <div className="flex flex-col ml-1">
                <button
                  type="button"
                  onClick={() => incrementValue("passwordMinLength", 6)}
                  className="border border-foundation-grey-grey-300 rounded-t-md px-1"
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => decrementValue("passwordMinLength", 6)}
                  className="border border-foundation-grey-grey-300 rounded-b-md px-1"
                >
                  <ChevronDown size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Require Special Characters */}
          <div className="flex items-center justify-between mb-4">
            <label className="text-foundation-black-black-400">
              Require Special Characters
            </label>
            <div
              className={`relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors ${
                securitySettings.requireSpecialChars
                  ? "bg-foundation-purple-purple-400"
                  : "bg-foundation-grey-grey-300"
              }`}
              onClick={() => toggleSetting("requireSpecialChars")}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  securitySettings.requireSpecialChars
                    ? "translate-x-5"
                    : "translate-x-1"
                } my-0.5`}
              />
            </div>
          </div>

          {/* Require Numbers */}
          <div className="flex items-center justify-between">
            <label className="text-foundation-black-black-400">
              Require Numbers
            </label>
            <div
              className={`relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors ${
                securitySettings.requireNumbers
                  ? "bg-foundation-purple-purple-400"
                  : "bg-foundation-grey-grey-300"
              }`}
              onClick={() => toggleSetting("requireNumbers")}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  securitySettings.requireNumbers
                    ? "translate-x-5"
                    : "translate-x-1"
                } my-0.5`}
              />
            </div>
          </div>
        </div>

        {/* Session Timeout */}
        <div className="mb-8 p-6 bg-white border border-foundation-grey-grey-300 rounded-lg">
          <div className="flex items-center justify-between">
            <label className="text-foundation-black-black-400">
              Session Timeout (minutes)
            </label>
            <div className="flex items-center">
              <input
                type="text"
                value={securitySettings.sessionTimeout}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0;
                  updateNumericValue("sessionTimeout", value, 5);
                }}
                className="w-16 px-3 py-2 text-center border border-foundation-grey-grey-300 rounded-md focus:outline-none focus:ring-2 focus:ring-foundation-purple-purple-100"
              />
              <div className="flex flex-col ml-1">
                <button
                  type="button"
                  onClick={() => incrementValue("sessionTimeout", 5)}
                  className="border border-foundation-grey-grey-300 rounded-t-md px-1"
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => decrementValue("sessionTimeout", 5)}
                  className="border border-foundation-grey-grey-300 rounded-b-md px-1"
                >
                  <ChevronDown size={14} />
                </button>
              </div>
            </div>
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

export default SecurityConfig;
