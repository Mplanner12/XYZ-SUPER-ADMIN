"use client";

import { useState } from "react";
import { z } from "zod";

// Define the Zod schema for module configuration
export const moduleConfigSchema = z.object({
  modules: z
    .array(
      z.object({
        id: z.string().min(1, "Module ID is required"),
        title: z.string().min(1, "Module title is required"),
        description: z.string().optional(),
        enabled: z.boolean(),
      })
    )
    .refine((modules) => modules.some((module) => module.enabled), {
      message: "At least one module must be enabled to proceed",
    }),
});

// Type derived from the schema
export type ModuleConfigType = z.infer<typeof moduleConfigSchema>;

interface ModuleItem {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

interface ModuleToggleListProps {
  onToggleChange?: (id: string, enabled: boolean) => void;
}

const ModuleToggleList: React.FC<ModuleToggleListProps> = ({
  onToggleChange,
}) => {
  const [modules, setModules] = useState<ModuleItem[]>([
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
    {
      id: "procurement",
      title: "Procurement",
      description: "Purchase orders and vendor management",
      enabled: false,
    },
    {
      id: "production",
      title: "Production",
      description: "Manufacturing and work orders",
      enabled: false,
    },
  ]);

  const handleToggle = (id: string) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === id ? { ...module, enabled: !module.enabled } : module
      )
    );

    const updatedModule = modules.find((module) => module.id === id);
    if (updatedModule && onToggleChange) {
      onToggleChange(id, !updatedModule.enabled);
    }
  };

  // Function to get current module configuration (can be used when submitting)
  const getModuleConfig = (): ModuleConfigType => {
    return { modules };
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {modules.map((module) => (
        <div
          key={module.id}
          className="flex items-center justify-between p-6 bg-foundation-white-white-400 rounded-xl border border-foundation-grey-grey-300"
        >
          <div className="flex flex-col">
            <h3 className="text-foundation-black-black-400 text-base font-semibold">
              {module.title}
            </h3>
            <p className="text-foundation-grey-grey-700 text-sm mt-1">
              {module.description}
            </p>
          </div>
          <div
            className={`relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors ${
              module.enabled
                ? "bg-foundation-purple-purple-400"
                : "bg-foundation-grey-grey-300"
            }`}
            onClick={() => handleToggle(module.id)}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                module.enabled ? "translate-x-5" : "translate-x-1"
              } my-0.5`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModuleToggleList;
