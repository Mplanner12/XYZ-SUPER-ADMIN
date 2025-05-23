"use client";
import React, { useState } from "react";
import { useGetAllModules, ModuleDetail } from "@/api/admin/getAllModules";
import { LuLayoutGrid, LuCheckCircle, LuShoppingCart } from "react-icons/lu";
import EmptyState from "@/components/reusable/EmptyState";

const ModuleSelectionPage: React.FC = () => {
  const { data: modules, isLoading, error } = useGetAllModules();
  const [selectedModules, setSelectedModules] = useState<
    Record<string, Record<string, boolean>>
  >({});

  const handleSubModuleToggle = (moduleId: string, subModuleId: string) => {
    setSelectedModules((prev) => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [subModuleId]: !prev[moduleId]?.[subModuleId],
      },
    }));
  };

  const handleSelectAllSubModules = (
    moduleId: string,
    module: ModuleDetail,
    select: boolean
  ) => {
    setSelectedModules((prev) => {
      const newModuleSelection = { ...(prev[moduleId] || {}) }; // Ensure prev[moduleId] exists
      module.sub_modules.forEach((sm) => {
        newModuleSelection[sm.id] = select;
      });
      return {
        ...prev,
        [moduleId]: newModuleSelection,
      };
    });
  };

  const countSelectedSubModules = () => {
    let count = 0;
    Object.values(selectedModules).forEach((subModuleMap) => {
      if (subModuleMap) {
        // Check if subModuleMap is defined
        Object.values(subModuleMap).forEach((isSelected) => {
          if (isSelected) count++;
        });
      }
    });
    return count;
  };

  const calculateTotalPrice = () => {
    // TODO: Implement actual pricing logic based on sub-modules
    const pricePerSubModule = 10; // Example price per sub-module
    return countSelectedSubModules() * pricePerSubModule;
  };

  if (isLoading) {
    return (
      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="h-10 bg-foundation-grey-grey-700/50 rounded w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-48 bg-foundation-grey-grey-700/50 rounded-xl"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 md:p-10 max-w-7xl mx-auto text-red-400 text-center">
        <h2 className="text-2xl font-semibold mb-4">Error Loading Modules</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!modules || modules.length === 0) {
    return (
      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        <EmptyState
          img={null}
          title="No Modules Available"
          text="Currently, there are no modules available for selection."
        />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 pb-6 border-b border-foundation-grey-grey-700/50">
        <div className="flex items-center mb-6 sm:mb-0">
          <div className="w-12 h-12 bg-gradient-to-br from-foundation-green-green-400 to-foundation-green-green-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
            <LuLayoutGrid className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foundation-white-white-400 mb-1">
              Select Your Modules
            </h1>
            <p className="text-foundation-grey-grey-400 text-sm">
              Choose the modules you want to activate for your business.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8 mb-10">
        {modules.map((module) => (
          <div
            key={module.id}
            className="p-6 rounded-xl border bg-foundation-black-black-400/50 border-foundation-grey-grey-700/50 shadow-lg"
          >
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-foundation-grey-grey-700/30">
              <h2 className="text-2xl font-semibold text-foundation-purple-purple-300">
                {module.name}
              </h2>
              <div className="flex items-center space-x-2">
                <label className="text-sm text-foundation-grey-grey-300 cursor-pointer flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-foundation-purple-purple-500 bg-foundation-black-black-400 border-foundation-grey-grey-600 rounded focus:ring-foundation-purple-purple-500 mr-2"
                    // Determine if all sub-modules are selected
                    checked={module.sub_modules.every(
                      (sm) => selectedModules[module.id]?.[sm.id]
                    )}
                    onChange={(e) =>
                      handleSelectAllSubModules(
                        module.id,
                        module,
                        e.target.checked
                      )
                    }
                  />
                  Select All
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {module.sub_modules.map((subModule) => (
                <div
                  key={subModule.id}
                  className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md
                                ${
                                  selectedModules[module.id]?.[subModule.id]
                                    ? "bg-foundation-green-green-500/15 border-foundation-green-green-400"
                                    : "bg-foundation-black-black-500/30 border-foundation-grey-grey-600 hover:border-foundation-green-green-500/50"
                                }`}
                  onClick={() => handleSubModuleToggle(module.id, subModule.id)}
                >
                  <div className="flex justify-between items-center mb-1">
                    <h3
                      className={`text-md font-medium ${
                        selectedModules[module.id]?.[subModule.id]
                          ? "text-foundation-green-green-300"
                          : "text-foundation-white-white-300"
                      }`}
                    >
                      {subModule.name}
                    </h3>
                    {selectedModules[module.id]?.[subModule.id] && (
                      <LuCheckCircle className="w-5 h-5 text-foundation-green-green-400" />
                    )}
                  </div>
                  {/* Placeholder for sub-module price or description */}
                  <p className="text-xs text-foundation-grey-grey-500">
                    $10/mo {/* Example Price per sub-module */}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-foundation-black-black-400/70 rounded-xl shadow-lg flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0">
          <p className="text-xl font-semibold text-foundation-white-white-300">
            Total Price: ${calculateTotalPrice()}/mo
          </p>
          <p className="text-sm text-foundation-grey-grey-400">
            You have selected {countSelectedSubModules()} sub-modules.
          </p>
        </div>
        <button className="group px-8 py-3 bg-gradient-to-r from-foundation-green-green-400 to-foundation-green-green-500 text-white font-semibold rounded-xl hover:from-foundation-green-green-300 hover:to-foundation-green-green-400 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
          <LuShoppingCart className="mr-2 w-5 h-5 group-hover:animate-pulse" />
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default ModuleSelectionPage;
