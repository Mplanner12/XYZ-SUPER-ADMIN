"use client"

import React, { useCallback, useState } from 'react';
import PermissionTable from './permissionTable';
import SubmitButton from '@/components/Buttons/SubmitButton';
import { ChevronDown, ChevronRight, Minus, Plus } from 'lucide-react';
import { toast } from 'react-toastify';

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

interface PermissionLevel {
  level: "no" | "partial" | "full";
}

interface Permission {
  view: boolean;
  add: boolean;
  edit: boolean;
  delete: boolean;
  print: boolean;
  share: boolean;
}

interface FeaturePermission {
  id: string;
  name: string;
  permissions: Permission;
}

// interface ModulePermission extends PermissionLevel {
//   moduleName: string;
//   features: FeaturePermission[];
// }

interface ModulePermission {
  moduleName: string;
  level: "no" | "partial" | "full";
  features: FeaturePermission[];
}

const initialModulePermissions: ModulePermission[] = [
  {
    moduleName: "Account Management",
    level: "no",
    features: [
      {
        id: "chart-of-account",
        name: "Chart of Account",
        permissions: {
          view: false,
          add: false,
          edit: false,
          delete: false,
          print: false,
          share: false,
        },
      },
      {
        id: "account-management",
        name: "Account Management",
        permissions: {
          view: false,
          add: false,
          edit: false,
          delete: false,
          print: false,
          share: false,
        },
      },
      {
        id: "advance-account-management",
        name: "Adavanced Acct. Management",
        permissions: {
          view: false,
          add: false,
          edit: false,
          delete: false,
          print: false,
          share: false,
        },
      },
      {
        id: "associated-list",
        name: "Associated List",
        permissions: {
          view: false,
          add: false,
          edit: false,
          delete: false,
          print: false,
          share: false,
        },
      },
      {
        id: "report-analytics",
        name: "Report Analytics",
        permissions: {
          view: false,
          add: false,
          edit: false,
          delete: false,
          print: false,
          share: false,
        },
      },
      {
        id: "audit-trail",
        name: "Audit Trial",
        permissions: {
          view: false,
          add: false,
          edit: false,
          delete: false,
          print: false,
          share: false,
        },
      },
      // Add more account-related features
    ],
  },
  {
    moduleName: "Finance Management",
    level: "no",
    features: [
      {
        id: "banking-management",
        name: "Banking Management",
        permissions: {
          view: false,
          add: false,
          edit: false,
          delete: false,
          print: false,
          share: false,
        },
      },
      {
        id: "receivables-management",
        name: "Receivable Management",
        permissions: {
          view: false,
          add: false,
          edit: false,
          delete: false,
          print: false,
          share: false,
        },
      },
      {
        id: "payable-management",
        name: "Payable Management",
        permissions: {
          view: false,
          add: false,
          edit: false,
          delete: false,
          print: false,
          share: false,
        },
      },
      {
        id: "investment-management",
        name: "Investment Management",
        permissions: {
          view: false,
          add: false,
          edit: false,
          delete: false,
          print: false,
          share: false,
        },
      },
      {
        id: "financing-management",
        name: "Finance Management",
        permissions: {
          view: false,
          add: false,
          edit: false,
          delete: false,
          print: false,
          share: false,
        },
      },
      {
        id: "report-analytics",
        name: "Report & Analytics",
        permissions: {
          view: false,
          add: false,
          edit: false,
          delete: false,
          print: false,
          share: false,
        },
      },
      {
        id: "audit-trial",
        name: "Audit Trial",
        permissions: {
          view: false,
          add: false,
          edit: false,
          delete: false,
          print: false,
          share: false,
        },
      },
    ],
  },
  {
    moduleName: "Order Management",
    level: "no",
    features: [
      {
        id: "location-management",
        name: "Location Management",
        permissions: {
          view: false,
          add: false,
          edit: false,
          delete: false,
          print: false,
          share: false,
        },
      },
      {
        id: "order-management",
        name: "Order Management",
        permissions: {
          view: false,
          add: false,
          edit: false,
          delete: false,
          print: false,
          share: false,
        },
      },
      {
        id: "report-analytics",
        name: "Report & Analytics",
        permissions: {
          view: false,
          add: false,
          edit: false,
          delete: false,
          print: false,
          share: false,
        },
      },
      {
        id: "audit-trial",
        name: "Audit Trial",
        permissions: {
          view: false,
          add: false,
          edit: false,
          delete: false,
          print: false,
          share: false,
        },
      },
    ],
  },
  {
    moduleName: "Inventory Management",
    level: "no",
    features: [
      {
        id: "location-management",
        name: "Location Management",
        permissions: {
          view: false,
          add: false,
          edit: false,
          delete: false,
          print: false,
          share: false,
        },
      },
      {
        id: "product-management",
        name: "Product Management",
        permissions: {
          view: false,
          add: false,
          edit: false,
          delete: false,
          print: false,
          share: false,
        },
      },
      {
        id: "inventory-management",
        name: "Inventory Management",
        permissions: {
          view: false,
          add: false,
          edit: false,
          delete: false,
          print: false,
          share: false,
        },
      },
      {
        id: "order-management",
        name: "Order Management",
        permissions: {
          view: false,
          add: false,
          edit: false,
          delete: false,
          print: false,
          share: false,
        },
      },
      {
        id: "report-analytics",
        name: "Report & Analytics",
        permissions: {
          view: false,
          add: false,
          edit: false,
          delete: false,
          print: false,
          share: false,
        },
      },
      {
        id: "audit-trial",
        name: "Audit Trial",
        permissions: {
          view: false,
          add: false,
          edit: false,
          delete: false,
          print: false,
          share: false,
        },
      },
    ],
  },
  {
    moduleName: "Procurement Management",
    level: "no",
    features: [],
  },
  {
    moduleName: "Warehouse Management",
    level: "no",
    features: [],
  },
  {
    moduleName: "Production Management",
    level: "no",
    features: [],
  },
  {
    moduleName: "Human Resources Management",
    level: "no",
    features: [],
  },
  {
    moduleName: "Payroll Management",
    level: "no",
    features: [],
  },
  {
    moduleName: "Business Management",
    level: "no",
    features: [],
  },
  {
    moduleName: "Modelling Audit",
    level: "no",
    features: [],
  },
  // Add more modules as needed
];


const ManagePermissions: React.FC<Props> = ({ onNext, onPrev }) => {

  const [modulePermissions, setModulePermissions] = useState<ModulePermission[]>(initialModulePermissions);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openModules, setOpenModules] = useState<{[moduleName: string]: boolean}>({});

  // Update module permission level
  // const updateModuleLevel = useCallback((moduleName: string, level: 'no' | 'partial' | 'full') => {
  //   setModulePermissions(prev => 
  //     prev.map(module => 
  //       module.moduleName === moduleName 
  //         ? { 
  //             ...module, 
  //             level, 
  //             features: module.features.map(feature => ({
  //               ...feature,
  //               permissions: level === 'full' 
  //                 ? Object.fromEntries(Object.keys(feature.permissions).map(key => [key, true])) 
  //                 : level === 'no'
  //                   ? Object.fromEntries(Object.keys(feature.permissions).map(key => [key, false]))
  //                   : feature.permissions
  //             }))
  //           }
  //         : module
  //     )
  //   );
  // }, []);

  const updateModuleLevel = useCallback(
    (moduleName: string, level: "no" | "partial" | "full") => {
      setModulePermissions((prev) =>
        prev.map((module) => {
          if (module.moduleName !== moduleName) return module;

          return {
            ...module,
            level,
            features: module.features.map((feature) => ({
              ...feature,
              permissions:
                level === "full"
                  ? {
                      view: true,
                      add: true,
                      edit: true,
                      delete: true,
                      print: true,
                      share: true,
                    }
                  : level === "no"
                  ? {
                      view: false,
                      add: false,
                      edit: false,
                      delete: false,
                      print: false,
                      share: false,
                    }
                  : feature.permissions,
            })),
          };
        })
      );
      // Automatically toggle module visibility when changing levels
      setOpenModules(prev => ({
        ...prev,
        [moduleName]: level !== 'no'
      }));
  }, []);

  const toggleModuleExpand = (moduleName: string) => {
    setOpenModules((prev) => ({
      ...prev,
      [moduleName]: !prev[moduleName],
    }));
  };

  const toggleFeaturePermissions = useCallback(
    (moduleName: string, featureId: string, checked: boolean) => {
      setModulePermissions((prev) =>
        prev.map((module) => {
          if (module.moduleName !== moduleName) return module;

          return {
            ...module,
            features: module.features.map((feature) =>
              feature.id === featureId
                ? {
                    ...feature,
                    permissions: {
                      view: checked,
                      add: checked,
                      edit: checked,
                      delete: checked,
                      print: checked,
                      share: checked,
                    },
                  }
                : feature
            ),
          };
        })
      );
    },
    []
  );

  
  // Update feature permissions
  const updateFeaturePermissions = useCallback((moduleName: string, featureId: string, permissionKey: string, value: boolean) => {
    setModulePermissions(prev => 
      prev.map(module => 
        module.moduleName === moduleName
          ? {
              ...module,
              features: module.features.map(feature => 
                feature.id === featureId
                  ? {
                      ...feature,
                      permissions: {
                        ...feature.permissions,
                        [permissionKey]: value
                      }
                    }
                  : feature
              )
            }
          : module
      )
    );
  }, []);

  const handleSubmit = async () => {
    // Filter out modules and features with no permissions or feature-level permissions
    
    // Reset previous errors
    setError(null);
    setIsSubmitting(true);
    
    try {
      // Filter and prepare permissions
      const preparedPermissions = modulePermissions.filter(
        (module) =>
          module.level !== "no" ||
          module.features.some((feature) =>
            Object.values(feature.permissions).some(Boolean)
          )
      );

      // Validate permissions
      const isValid = preparedPermissions.length > 0;

      if (!isValid) {
        setError("Please select at least one permission");
        setIsSubmitting(false);
        return;
      }

      // Simulate API call (replace with actual API call)
      const response = await savePermissions(preparedPermissions);

      // If save is successful, move to next step
      if (response.success) {
        onNext();
      } else {
        setError(response.message || "Failed to save permissions");
      }
    } catch (err) {
      setError("An error occurred while saving permissions");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const savePermissions = async (permissions: ModulePermission[]) => {
    // Replace with actual API endpoint
    try {
      const response = await fetch("/api/permissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ permissions }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return {
        success: true,
        message: "Permissions saved successfully",
      };
    } catch (error) {
      console.error("Error saving permissions:", error);
      return {
        success: false,
        message: "Failed to save permissions",
      };
    }
  };
  
	return (
    <div>
      <div>
        <h2 className="text-base m-0 font-semibold leading-7 text-foundation-black-black-400">
          Manage Permissions
        </h2>
        <p className="mt-1 m-0 text-sm leading-6 text-foundation-grey-grey-800">
          Manage Permissions for each role created.
        </p>
      </div>

      <div className="flex justify-between items-center mt-2">
        <h3 className="text-sm m-0 font-normal leading-7 text-foundation-black-black-400">
          Modules
        </h3>
        <p className="bg-foundation-purple-purple-100 px-[10px] py-1 rounded-full text-sm font-normal text-foundation-black-black-400">
          Role: Sales Manager
        </p>
      </div>

      <div className='overflow-x-auto no-scroll sm:text-sm text-sm'>
        {modulePermissions.map((module) => (
          <div key={module.moduleName}>
            <table
              className="flex items-center justify-between space-x-20 p-1 py-2 cursor-pointer hover:bg-gray-50 whitespace-nowrap"
              onClick={() =>
                module.features.length > 0 &&
                toggleModuleExpand(module.moduleName)
              }
            >
              <tr>
                <th className="flex items-center">
                  {module.features.length > 0 &&
                    (module.level !== "full" ? (
                      openModules[module.moduleName] ? (
                        <Minus
                          className="mr-1 text-foundation-purple-purple-400"
                          size={20}
                        />
                      ) : (
                        <Plus
                          className="mr-1 text-foundation-purple-purple-400"
                          size={20}
                        />
                      )
                    ) : (
                      ""
                    ))}
                  <span className="font-normal text-base">{module.moduleName}</span>
                </th> 
              </tr>

              <tbody>
                <tr>
                  <div className='flex justify-end text-sm gap-x-10'>
                    <td className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={module.level === "no"}
                        onChange={() => updateModuleLevel(module.moduleName, "no")}
                        className='custom-checkbox'
                      />
                      No Permission
                    </td>
                    <td className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={module.level === "partial"}
                        onChange={() =>
                          updateModuleLevel(module.moduleName, "partial")
                        }
                        className='custom-checkbox'
                      />
                      Partial Permission
                    </td>
                    <td className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={module.level === "full"}
                        onChange={() =>
                          updateModuleLevel(module.moduleName, "full")
                        }
                        className='custom-checkbox'
                      />
                      Full Permission
                    </td>
                  </div>
                </tr>
              </tbody>
            </table>

            {/* Feature-level permissions */}
            {module.features.length > 0 &&
              module.level !== "no" &&
              openModules[module.moduleName] && (
                <table className="p-4 min-w-full w-full bg-foundation-grey-grey-200 rounded-md shadow-sm border-spacing-y-2">
                  {/*  feature header */}
                  <thead>
                    <tr>
                      <th className="text-left font-normal px-4 py-2">Features</th>
                      {Object.keys(module.features[0].permissions).map(
                        (permissionKey) => (
                          <th
                            key={permissionKey}
                            className="text-center px-4 font-normal"
                          >
                            {permissionKey.charAt(0).toUpperCase() +
                              permissionKey.slice(1)}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {module.features.map((feature) => (
                      <tr key={feature.id} className="mb-4 hover:bg-gray-50">
                        {/* Select All Checkbox for Feature */}
                        <td className="px-4 py-2 flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={Object.values(feature.permissions).every(
                              Boolean
                            )}
                            onChange={(e) =>
                              toggleFeaturePermissions(
                                module.moduleName,
                                feature.id,
                                e.target.checked
                              )
                            }
                            className="custom-checkbox"
                          />
                          <span className="text-sm mb-1">{feature.name}</span>
                        </td>

                        {(
                          Object.keys(feature.permissions) as Array<
                            keyof typeof feature.permissions
                          >
                        ).map((permissionKey) => (
                          <td
                            key={permissionKey}
                            className="px-4 py-2 text-center"
                          >
                            <input
                              type="checkbox"
                              className="mr-2 custom-checkbox"
                              checked={feature.permissions[permissionKey]}
                              onChange={(e) =>
                                updateFeaturePermissions(
                                  module.moduleName,
                                  feature.id,
                                  permissionKey,
                                  e.target.checked
                                )
                              }
                              disabled={module.level === "no"}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
          </div>
        ))}

        {/* Error Message */}
        {/* {error && <div className="text-red-500 mb-4 font-semibold text-2xl">{toast.error(error)}</div>} */}
      </div>

      <div className="flex justify-between">
        <SubmitButton
          text="Prev"
          onClick={onPrev}
          customPadding="w-20 py-4 mt-5 mb-3"
          actionType="button"
          // loading={isPending}
        />
        <SubmitButton
          text="Save & Next"
          // onClick={handleSubmit}
          onClick={onNext}
          customPadding="w-fit py-4 mt-5 mb-3"
          actionType="submit"
          loading={isSubmitting}
        />
      </div>
    </div>
  );
}

export default ManagePermissions