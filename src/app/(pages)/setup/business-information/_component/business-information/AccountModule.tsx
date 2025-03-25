"use client";
import { useState } from "react";
import { z } from "zod";
import { moduleConfigSchema, ModuleConfigType } from "./ModuleToggleList";
import { useAccountModule } from "@/hooks/mutate";
import ModuleToggleList from "./ModuleToggleList";

interface AccountModuleProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function AccountModule({ onNext, onPrev }: AccountModuleProps) {
  const [modules, setModules] = useState<ModuleConfigType["modules"]>([
    {
      id: "accounting",
      title: "Accounting",
      description: "General ledger, accounts payable, and receivable",
      enabled: false,
    },
    {
      id: "inventory",
      title: "Inventory",
      description: "Stock management and tracking",
      enabled: false,
    },
    {
      id: "sales",
      title: "Sales",
      description: "Orders, invoicing, and customer management",
      enabled: false,
    },
  ]);
  const [error, setError] = useState<string | null>(null);
  const handleModuleToggle = (moduleId: string, enabled: boolean) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === moduleId ? { ...module, enabled } : module
      )
    );
  };

  const handleNext = () => {
    try {
      moduleConfigSchema.parse({ modules });
      setError(null);
      onNext();
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    }
  };

  return (
    <div className="container mx-auto px-3 pt-1 pb-3.5">
      <h1 className="text-lg font-semibold text-foundation-black-black-400 mb-4">
        Module Configuration
      </h1>
      <p className="text-foundation-grey-grey-700 mb-8">
        Enable or disable modules based on your business needs
      </p>

      <ModuleToggleList onToggleChange={handleModuleToggle} />
      {/* Display the error message */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="mt-5 flex w-full justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="rounded-xl hover:bg-white px-4 py-3 text-sm font-normal hover:text-foundation-grey-grey-900 shadow-sm border border-solid hover:border-foundation-grey-grey-600 bg-foundation-purple-purple-400 text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="rounded-xl hover:bg-white px-4 py-3 text-sm font-normal hover:text-foundation-grey-grey-900 shadow-sm border border-solid hover:border-foundation-grey-grey-600 bg-foundation-purple-purple-400 text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}
