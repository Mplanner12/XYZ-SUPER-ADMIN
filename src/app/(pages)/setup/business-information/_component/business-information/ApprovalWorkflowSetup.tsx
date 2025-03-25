"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";

interface ApprovalWorkflowSetupProps {
  onNext: () => void;
  onPrev: () => void;
}

// Define the schema for approval workflow validation
const approvalWorkflowSchema = z.object({
  purchaseOrders: z.object({
    enabled: z.boolean().default(false),
    threshold: z.string().optional(),
    level: z.string().optional(),
  }),
  salesOrders: z.object({
    enabled: z.boolean().default(false),
    threshold: z.string().optional(),
    level: z.string().optional(),
  }),
  expenses: z.object({
    enabled: z.boolean().default(false),
    threshold: z.string().optional(),
    level: z.string().optional(),
  }),
  payments: z.object({
    enabled: z.boolean().default(false),
    threshold: z.string().optional(),
    level: z.string().optional(),
  }),
});

type ApprovalWorkflowType = z.infer<typeof approvalWorkflowSchema>;

const ApprovalWorkflowSetup: React.FC<ApprovalWorkflowSetupProps> = ({
  onNext,
  onPrev,
}) => {
  const [approvalSettings, setApprovalSettings] =
    useState<ApprovalWorkflowType>({
      purchaseOrders: { enabled: false, threshold: "", level: "" },
      salesOrders: { enabled: false, threshold: "", level: "" },
      expenses: { enabled: false, threshold: "", level: "" },
      payments: { enabled: false, threshold: "", level: "" },
    });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const { handleSubmit } = useForm<ApprovalWorkflowType>({
    resolver: zodResolver(approvalWorkflowSchema),
    defaultValues: approvalSettings,
  });

  const toggleApproval = (key: keyof ApprovalWorkflowType) => {
    setApprovalSettings((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        enabled: !prev[key].enabled,
      },
    }));
  };

  const handleThresholdChange = (
    key: keyof ApprovalWorkflowType,
    value: string
  ) => {
    setApprovalSettings((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        threshold: value,
      },
    }));
  };

  const handleLevelChange = (
    key: keyof ApprovalWorkflowType,
    value: string
  ) => {
    setApprovalSettings((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        level: value,
      },
    }));
    setOpenDropdown(null);
  };

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const approvalLevels = [
    "Single Level",
    "Two Levels",
    "Three Levels",
    "Manager Only",
    "Department Head",
    "Executive",
  ];

  const onSubmit = (data: ApprovalWorkflowType) => {
    console.log("Submitting approval workflow setup:", data);
    onNext();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center text-foundation-black-black-400 mb-6">
        Approval Workflow Setup
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Purchase Orders Approval */}
        <div className="mb-6 p-6 bg-white border border-foundation-grey-grey-300 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-foundation-black-black-400">
              Purchase Orders Approval
            </h3>
            <div
              className={`relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors ${
                approvalSettings.purchaseOrders.enabled
                  ? "bg-foundation-purple-purple-400"
                  : "bg-foundation-grey-grey-300"
              }`}
              onClick={() => toggleApproval("purchaseOrders")}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  approvalSettings.purchaseOrders.enabled
                    ? "translate-x-5"
                    : "translate-x-1"
                } my-0.5`}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-center text-foundation-black-black-400 mb-2">
              Approval Threshold
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter amount"
                value={approvalSettings.purchaseOrders.threshold}
                onChange={(e) =>
                  handleThresholdChange("purchaseOrders", e.target.value)
                }
                disabled={!approvalSettings.purchaseOrders.enabled}
                className="w-full px-4 py-3 border border-foundation-grey-grey-300 rounded-md focus:outline-none focus:ring-2 focus:ring-foundation-purple-purple-100 disabled:bg-foundation-grey-grey-50 disabled:text-foundation-grey-grey-600"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-foundation-grey-grey-600">$</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-center text-foundation-black-black-400 mb-2">
              Approval Levels
            </label>
            <div className="relative">
              <div
                className="w-full px-4 py-3 border border-foundation-grey-grey-300 rounded-md flex justify-between items-center cursor-pointer disabled:bg-foundation-grey-grey-50 disabled:text-foundation-grey-grey-600"
                onClick={() =>
                  approvalSettings.purchaseOrders.enabled &&
                  toggleDropdown("purchaseOrders")
                }
              >
                <span
                  className={
                    approvalSettings.purchaseOrders.level
                      ? "text-foundation-black-black-400"
                      : "text-foundation-grey-grey-600"
                  }
                >
                  {approvalSettings.purchaseOrders.level || "Select level"}
                </span>
                <ChevronDown
                  size={20}
                  className="text-foundation-grey-grey-600"
                />
              </div>
              {openDropdown === "purchaseOrders" && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-foundation-grey-grey-300 rounded-md shadow-lg">
                  {approvalLevels.map((level) => (
                    <div
                      key={level}
                      className="px-4 py-2 hover:bg-foundation-grey-grey-50 cursor-pointer"
                      onClick={() => handleLevelChange("purchaseOrders", level)}
                    >
                      {level}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sales Orders Approval */}
        <div className="mb-6 p-6 bg-white border border-foundation-grey-grey-300 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-foundation-black-black-400">
              Sales Orders Approval
            </h3>
            <div
              className={`relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors ${
                approvalSettings.salesOrders.enabled
                  ? "bg-foundation-purple-purple-400"
                  : "bg-foundation-grey-grey-300"
              }`}
              onClick={() => toggleApproval("salesOrders")}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  approvalSettings.salesOrders.enabled
                    ? "translate-x-5"
                    : "translate-x-1"
                } my-0.5`}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-center text-foundation-black-black-400 mb-2">
              Approval Threshold
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter amount"
                value={approvalSettings.salesOrders.threshold}
                onChange={(e) =>
                  handleThresholdChange("salesOrders", e.target.value)
                }
                disabled={!approvalSettings.salesOrders.enabled}
                className="w-full px-4 py-3 border border-foundation-grey-grey-300 rounded-md focus:outline-none focus:ring-2 focus:ring-foundation-purple-purple-100 disabled:bg-foundation-grey-grey-50 disabled:text-foundation-grey-grey-600"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-foundation-grey-grey-600">$</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-center text-foundation-black-black-400 mb-2">
              Approval Levels
            </label>
            <div className="relative">
              <div
                className="w-full px-4 py-3 border border-foundation-grey-grey-300 rounded-md flex justify-between items-center cursor-pointer disabled:bg-foundation-grey-grey-50 disabled:text-foundation-grey-grey-600"
                onClick={() =>
                  approvalSettings.salesOrders.enabled &&
                  toggleDropdown("salesOrders")
                }
              >
                <span
                  className={
                    approvalSettings.salesOrders.level
                      ? "text-foundation-black-black-400"
                      : "text-foundation-grey-grey-600"
                  }
                >
                  {approvalSettings.salesOrders.level || "Select level"}
                </span>
                <ChevronDown
                  size={20}
                  className="text-foundation-grey-grey-600"
                />
              </div>
              {openDropdown === "salesOrders" && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-foundation-grey-grey-300 rounded-md shadow-lg">
                  {approvalLevels.map((level) => (
                    <div
                      key={level}
                      className="px-4 py-2 hover:bg-foundation-grey-grey-50 cursor-pointer"
                      onClick={() => handleLevelChange("salesOrders", level)}
                    >
                      {level}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Expenses Approval */}
        <div className="mb-6 p-6 bg-white border border-foundation-grey-grey-300 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-foundation-black-black-400">
              Expenses Approval
            </h3>
            <div
              className={`relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors ${
                approvalSettings.expenses.enabled
                  ? "bg-foundation-purple-purple-400"
                  : "bg-foundation-grey-grey-300"
              }`}
              onClick={() => toggleApproval("expenses")}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  approvalSettings.expenses.enabled
                    ? "translate-x-5"
                    : "translate-x-1"
                } my-0.5`}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-center text-foundation-black-black-400 mb-2">
              Approval Threshold
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter amount"
                value={approvalSettings.expenses.threshold}
                onChange={(e) =>
                  handleThresholdChange("expenses", e.target.value)
                }
                disabled={!approvalSettings.expenses.enabled}
                className="w-full px-4 py-3 border border-foundation-grey-grey-300 rounded-md focus:outline-none focus:ring-2 focus:ring-foundation-purple-purple-100 disabled:bg-foundation-grey-grey-50 disabled:text-foundation-grey-grey-600"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-foundation-grey-grey-600">$</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-center text-foundation-black-black-400 mb-2">
              Approval Levels
            </label>
            <div className="relative">
              <div
                className="w-full px-4 py-3 border border-foundation-grey-grey-300 rounded-md flex justify-between items-center cursor-pointer disabled:bg-foundation-grey-grey-50 disabled:text-foundation-grey-grey-600"
                onClick={() =>
                  approvalSettings.expenses.enabled &&
                  toggleDropdown("expenses")
                }
              >
                <span
                  className={
                    approvalSettings.expenses.level
                      ? "text-foundation-black-black-400"
                      : "text-foundation-grey-grey-600"
                  }
                >
                  {approvalSettings.expenses.level || "Select level"}
                </span>
                <ChevronDown
                  size={20}
                  className="text-foundation-grey-grey-600"
                />
              </div>
              {openDropdown === "expenses" && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-foundation-grey-grey-300 rounded-md shadow-lg">
                  {approvalLevels.map((level) => (
                    <div
                      key={level}
                      className="px-4 py-2 hover:bg-foundation-grey-grey-50 cursor-pointer"
                      onClick={() => handleLevelChange("expenses", level)}
                    >
                      {level}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Payments Approval */}
        <div className="mb-8 p-6 bg-white border border-foundation-grey-grey-300 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-foundation-black-black-400">
              Payments Approval
            </h3>
            <div
              className={`relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors ${
                approvalSettings.payments.enabled
                  ? "bg-foundation-purple-purple-400"
                  : "bg-foundation-grey-grey-300"
              }`}
              onClick={() => toggleApproval("payments")}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  approvalSettings.payments.enabled
                    ? "translate-x-5"
                    : "translate-x-1"
                } my-0.5`}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-center text-foundation-black-black-400 mb-2">
              Approval Threshold
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter amount"
                value={approvalSettings.payments.threshold}
                onChange={(e) =>
                  handleThresholdChange("payments", e.target.value)
                }
                disabled={!approvalSettings.payments.enabled}
                className="w-full px-4 py-3 border border-foundation-grey-grey-300 rounded-md focus:outline-none focus:ring-2 focus:ring-foundation-purple-purple-100 disabled:bg-foundation-grey-grey-50 disabled:text-foundation-grey-grey-600"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-foundation-grey-grey-600">$</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-center text-foundation-black-black-400 mb-2">
              Approval Levels
            </label>
            <div className="relative">
              <div
                className="w-full px-4 py-3 border border-foundation-grey-grey-300 rounded-md flex justify-between items-center cursor-pointer disabled:bg-foundation-grey-grey-50 disabled:text-foundation-grey-grey-600"
                onClick={() =>
                  approvalSettings.payments.enabled &&
                  toggleDropdown("payments")
                }
              >
                <span
                  className={
                    approvalSettings.payments.level
                      ? "text-foundation-black-black-400"
                      : "text-foundation-grey-grey-600"
                  }
                >
                  {approvalSettings.payments.level || "Select level"}
                </span>
                <ChevronDown
                  size={20}
                  className="text-foundation-grey-grey-600"
                />
              </div>
              {openDropdown === "payments" && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-foundation-grey-grey-300 rounded-md shadow-lg">
                  {approvalLevels.map((level) => (
                    <div
                      key={level}
                      className="px-4 py-2 hover:bg-foundation-grey-grey-50 cursor-pointer"
                      onClick={() => handleLevelChange("payments", level)}
                    >
                      {level}
                    </div>
                  ))}
                </div>
              )}
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
            Finish
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApprovalWorkflowSetup;
