"use client";
import React, { useEffect, useState } from "react";
import {
  LuUsers,
  LuUserPlus,
  LuPlusCircle,
  LuKeyRound,
  LuBuilding2,
} from "react-icons/lu";
import { CiCirclePlus } from "react-icons/ci";
import { useGetCompanyUsers, CompanyUser } from "@/api/admin/getCompanyUsers";
import { useGetCompanyRoles, Role } from "@/api/admin/getCompanyRoles";
import { useCreateRole, CreateRolePayload } from "@/api/admin/createRole";
import { useInviteUser, InviteUserPayload } from "@/api/admin/inviteUser";
import {
  useGetCompanyModules,
  Module as PermissionModule,
  ActionPermissions,
} from "@/api/admin/getCompanyModules";
import {
  useUpdateRolePermissions,
  UpdateRolePermissionsPayload,
  PermissionSetting,
} from "@/api/admin/updateRolePermissions";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import EmptyState from "../reusable/EmptyState";

// Zod Schemas
const inviteUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  role_id: z.string().min(1, "Role is required"),
});
type InviteUserFormData = z.infer<typeof inviteUserSchema>;

const createRoleSchema = z.object({
  name: z.string().min(1, "Role name is required"),
});
type CreateRoleFormData = z.infer<typeof createRoleSchema>;

interface UsersViewProps {
  activeCompanyId: string | null;
}

const UsersView: React.FC<UsersViewProps> = ({ activeCompanyId }) => {
  const [users, setUsers] = useState<CompanyUser[]>([]);
  const [isInviteUserModalOpen, setIsInviteUserModalOpen] = useState(false);
  const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false);
  const [isManagePermissionsModalOpen, setIsManagePermissionsModalOpen] =
    useState(false);
  const [selectedRoleForPermissions, setSelectedRoleForPermissions] =
    useState<Role | null>(null);

  const {
    data: companyUsers,
    isLoading: isLoadingUsers,
    error: usersError,
  } = useGetCompanyUsers(activeCompanyId);
  const {
    data: companyRoles,
    isLoading: isLoadingRoles,
    error: rolesError,
  } = useGetCompanyRoles(activeCompanyId);
  const {
    data: companyModules,
    isLoading: isLoadingModules,
    error: modulesError,
  } = useGetCompanyModules(activeCompanyId);

  const { mutate: inviteUserMutate, isPending: isInvitingUser } =
    useInviteUser();
  const { mutate: createRoleMutate, isPending: isCreatingRole } =
    useCreateRole();
  const {
    mutate: updateRolePermissionsMutate,
    isPending: isUpdatingPermissions,
  } = useUpdateRolePermissions();

  // Forms
  const inviteUserForm = useForm<InviteUserFormData>({
    resolver: zodResolver(inviteUserSchema),
  });
  const createRoleForm = useForm<CreateRoleFormData>({
    resolver: zodResolver(createRoleSchema),
  });

  const handleInviteUserSubmit: SubmitHandler<InviteUserFormData> = (data) => {
    if (!activeCompanyId) {
      toast.error("No active company selected.");
      return;
    }
    inviteUserMutate(
      { ...data, company_id: activeCompanyId },
      {
        onSuccess: () => {
          setIsInviteUserModalOpen(false);
          inviteUserForm.reset();
        },
      }
    );
  };

  const handleCreateRoleSubmit: SubmitHandler<CreateRoleFormData> = (data) => {
    if (!activeCompanyId) {
      toast.error("No active company selected.");
      return;
    }
    createRoleMutate(
      { ...data, company_id: activeCompanyId },
      {
        onSuccess: () => {
          setIsCreateRoleModalOpen(false);
          createRoleForm.reset();
        },
      }
    );
  };

  const openManagePermissionsModal = (role: Role) => {
    setSelectedRoleForPermissions(role);
    setIsManagePermissionsModalOpen(true);
    // Here you would also fetch current permissions for this role if not already available
    // and pre-fill the permissions form.
  };

  // Simplified Permissions Form Handling (actual implementation will be more complex)
  const handleUpdatePermissions = (permissionsData: PermissionSetting[]) => {
    if (!selectedRoleForPermissions) return;
    updateRolePermissionsMutate(
      {
        role_id: selectedRoleForPermissions.id,
        permissions: permissionsData,
      },
      {
        onSuccess: () => {
          setIsManagePermissionsModalOpen(false);
        },
      }
    );
  };

  if (!activeCompanyId) {
    return (
      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        <EmptyState
          title="No Company Selected"
          text="Please select an active company to manage users and roles."
          img={
            <LuBuilding2 className="w-16 h-16 text-foundation-grey-grey-600 mx-auto" />
          }
        />
      </div>
    );
  }

  if (isLoadingUsers || isLoadingRoles) {
    return (
      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        {/* Basic Skeleton Loader */}
        <div className="animate-pulse">
          <div className="h-8 bg-foundation-grey-grey-700/50 rounded w-1/4 mb-4"></div>
          <div className="h-12 bg-foundation-grey-grey-700/50 rounded w-1/5 mb-8"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-16 bg-foundation-grey-grey-700/50 rounded"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (usersError || rolesError) {
    return (
      <div className="p-6 md:p-10 max-w-7xl mx-auto text-red-400">
        Error loading data: {usersError?.message || rolesError?.message}
      </div>
    );
  }

  return (
    <>
      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 pb-6 border-b border-foundation-grey-grey-700/50">
          <div className="flex items-center mb-6 sm:mb-0">
            <div className="w-12 h-12 bg-gradient-to-br from-foundation-purple-purple-400 to-foundation-purple-purple-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <LuUsers className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foundation-white-white-400 mb-1">
                User & Role Management
              </h1>
              <p className="text-foundation-grey-grey-400 text-sm">
                Manage users, roles, and permissions for your company.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsInviteUserModalOpen(true)}
            className="group px-6 py-3 bg-gradient-to-r from-foundation-purple-purple-400 to-foundation-purple-purple-500 text-white font-semibold rounded-xl hover:from-foundation-purple-purple-300 hover:to-foundation-purple-purple-400 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <LuUserPlus className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Invite User
          </button>
        </div>

        {/* Users List Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foundation-white-white-300 mb-6">
            Users
          </h2>
          {companyUsers && companyUsers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyUsers.map((user) => (
                <div
                  key={user.id}
                  className="bg-foundation-black-black-400/50 p-5 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-medium text-foundation-purple-purple-300">
                    {user.name}
                  </h3>
                  <p className="text-sm text-foundation-grey-grey-400">
                    {user.email}
                  </p>
                  <p className="text-xs text-foundation-grey-grey-500 mt-1">
                    Role: {user.role}
                  </p>
                  {/* Add actions like Edit User Role, Deactivate User etc. */}
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Users Found"
              text="Invite users to collaborate with your company."
              img={
                <LuBuilding2 className="w-16 h-16 text-foundation-grey-grey-600 mx-auto" />
              }
            />
          )}
        </section>

        {/* Roles and Permissions Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-foundation-white-white-300">
              Roles & Permissions
            </h2>
            <button
              onClick={() => setIsCreateRoleModalOpen(true)}
              className="group px-5 py-2.5 border border-foundation-purple-purple-400 text-foundation-purple-purple-300 font-semibold rounded-lg hover:bg-foundation-purple-purple-400/10 transition-all duration-300 flex items-center shadow-sm hover:shadow-md"
            >
              <LuPlusCircle className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              Create Role
            </button>
          </div>
          {companyRoles && companyRoles.length > 0 ? (
            <div className="space-y-4">
              {companyRoles.map((role) => (
                <div
                  key={role.id}
                  className="bg-foundation-black-black-400/50 p-5 rounded-lg shadow flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-medium text-foundation-purple-purple-300">
                      {role.name}
                    </h3>
                    {/* Display number of users in this role or other info */}
                  </div>
                  <button
                    onClick={() => openManagePermissionsModal(role)}
                    className="p-2 text-foundation-blue-blue-400 hover:text-foundation-blue-blue-300 transition-colors"
                    title="Manage Permissions"
                  >
                    <LuKeyRound size={20} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Roles Defined"
              text="Create roles to manage user access and permissions."
              img={
                <LuBuilding2 className="w-16 h-16 text-foundation-grey-grey-600 mx-auto" />
              }
            />
          )}
        </section>
      </div>

      {/* Invite User Modal */}
      {isInviteUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4">
          <div className="bg-foundation-black-black-500/80 backdrop-blur-md rounded-xl p-8 w-full max-w-md shadow-2xl border border-foundation-grey-grey-700/50">
            <h2 className="text-2xl font-semibold mb-6 text-center text-foundation-purple-purple-300">
              Invite New User
            </h2>
            <form
              onSubmit={inviteUserForm.handleSubmit(handleInviteUserSubmit)}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm text-foundation-grey-grey-300 mb-1">
                  Full Name
                </label>
                <input
                  {...inviteUserForm.register("name")}
                  className="w-full px-4 py-2.5 rounded-lg border border-foundation-grey-grey-600 bg-foundation-black-black-400 text-white placeholder-foundation-grey-grey-500 focus:outline-none focus:ring-2 focus:ring-foundation-purple-purple-500"
                />
                {inviteUserForm.formState.errors.name && (
                  <p className="text-red-400 text-xs mt-1">
                    {inviteUserForm.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-foundation-grey-grey-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  {...inviteUserForm.register("email")}
                  className="w-full px-4 py-2.5 rounded-lg border border-foundation-grey-grey-600 bg-foundation-black-black-400 text-white placeholder-foundation-grey-grey-500 focus:outline-none focus:ring-2 focus:ring-foundation-purple-purple-500"
                />
                {inviteUserForm.formState.errors.email && (
                  <p className="text-red-400 text-xs mt-1">
                    {inviteUserForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-foundation-grey-grey-300 mb-1">
                  Assign Role
                </label>
                <select
                  {...inviteUserForm.register("role_id")}
                  className="w-full px-4 py-2.5 rounded-lg border border-foundation-grey-grey-600 bg-foundation-black-black-400 text-white focus:outline-none focus:ring-2 focus:ring-foundation-purple-purple-500 appearance-none"
                >
                  <option value="" className="text-foundation-grey-grey-500">
                    Select a role...
                  </option>
                  {companyRoles?.map((role) => (
                    <option
                      key={role.id}
                      value={role.id}
                      className="bg-foundation-black-black-400 text-white"
                    >
                      {role.name}
                    </option>
                  ))}
                </select>
                {inviteUserForm.formState.errors.role_id && (
                  <p className="text-red-400 text-xs mt-1">
                    {inviteUserForm.formState.errors.role_id.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsInviteUserModalOpen(false)}
                  className="px-5 py-2.5 bg-foundation-grey-grey-600 text-white rounded-lg hover:bg-foundation-grey-grey-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isInvitingUser}
                  className="px-5 py-2.5 bg-foundation-purple-purple-500 text-white rounded-lg hover:bg-foundation-purple-purple-600 transition-colors disabled:opacity-60"
                >
                  {isInvitingUser ? "Sending Invite..." : "Send Invite"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Role Modal */}
      {isCreateRoleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4">
          <div className="bg-foundation-black-black-500/80 backdrop-blur-md rounded-xl p-8 w-full max-w-md shadow-2xl border border-foundation-grey-grey-700/50">
            <h2 className="text-2xl font-semibold mb-6 text-center text-foundation-purple-purple-300">
              Create New Role
            </h2>
            <form
              onSubmit={createRoleForm.handleSubmit(handleCreateRoleSubmit)}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm text-foundation-grey-grey-300 mb-1">
                  Role Name
                </label>
                <input
                  {...createRoleForm.register("name")}
                  className="w-full px-4 py-2.5 rounded-lg border border-foundation-grey-grey-600 bg-foundation-black-black-400 text-white placeholder-foundation-grey-grey-500 focus:outline-none focus:ring-2 focus:ring-foundation-purple-purple-500"
                />
                {createRoleForm.formState.errors.name && (
                  <p className="text-red-400 text-xs mt-1">
                    {createRoleForm.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCreateRoleModalOpen(false)}
                  className="px-5 py-2.5 bg-foundation-grey-grey-600 text-white rounded-lg hover:bg-foundation-grey-grey-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingRole}
                  className="px-5 py-2.5 bg-foundation-purple-purple-500 text-white rounded-lg hover:bg-foundation-purple-purple-600 transition-colors disabled:opacity-60"
                >
                  {isCreatingRole ? "Creating..." : "Create Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manage Permissions Modal */}
      {isManagePermissionsModalOpen &&
        selectedRoleForPermissions &&
        companyModules && (
          <PermissionsModal
            isOpen={isManagePermissionsModalOpen}
            onClose={() => setIsManagePermissionsModalOpen(false)}
            role={selectedRoleForPermissions}
            modules={companyModules}
            onSave={handleUpdatePermissions}
            isSaving={isUpdatingPermissions}
          />
        )}
    </>
  );
};

export default UsersView;

// PermissionsModal Component (can be moved to its own file)
interface PermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: Role;
  modules: PermissionModule[];
  onSave: (permissions: PermissionSetting[]) => void;
  isSaving: boolean;
}

const PermissionsModal: React.FC<PermissionsModalProps> = ({
  isOpen,
  onClose,
  role,
  modules,
  onSave,
  isSaving,
}) => {
  // This state will hold the current permission settings for the form
  // Initialize with existing permissions for the role if available, otherwise default to all false.
  const [currentPermissions, setCurrentPermissions] = useState<
    Record<string, Record<string, ActionPermissions>>
  >(() => {
    const initial: Record<string, Record<string, ActionPermissions>> = {};
    // TODO: Fetch and pre-fill existing permissions for `role.id`
    // For now, default all to false.
    modules.forEach((module) => {
      initial[module.id] = {};
      module.sub_modules.forEach((subModule) => {
        initial[module.id][subModule.id] = {
          view: false,
          add: false,
          edit: false,
          delete: false,
          print: false,
          share: false,
        };
      });
    });
    return initial;
  });

  const handleActionChange = (
    moduleId: string,
    subModuleId: string,
    action: keyof ActionPermissions,
    value: boolean
  ) => {
    setCurrentPermissions((prev) => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [subModuleId]: {
          ...prev[moduleId]?.[subModuleId],
          [action]: value,
        },
      },
    }));
  };

  const handleSavePermissions = () => {
    const payloadPermissions: PermissionSetting[] = [];
    Object.keys(currentPermissions).forEach((moduleId) => {
      Object.keys(currentPermissions[moduleId]).forEach((subModuleId) => {
        payloadPermissions.push({
          module_id: moduleId,
          sub_module_id: subModuleId,
          actions: currentPermissions[moduleId][subModuleId],
        });
      });
    });
    onSave(payloadPermissions);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4">
      <div className="bg-foundation-black-black-500/80 backdrop-blur-md rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-foundation-grey-grey-700/50">
        <h2 className="text-2xl font-semibold mb-6 text-center text-foundation-purple-purple-300">
          Manage Permissions for <span className="font-bold">{role.name}</span>
        </h2>
        <div className="space-y-6">
          {modules.map((module) => (
            <div
              key={module.id}
              className="p-4 border border-foundation-grey-grey-700/50 rounded-lg"
            >
              <h3 className="text-lg font-medium text-foundation-white-white-300 mb-3">
                {module.name}
              </h3>
              {module.sub_modules.map((subModule) => (
                <div
                  key={subModule.id}
                  className="ml-4 mb-3 p-3 border-l-2 border-foundation-purple-purple-500/50"
                >
                  <h4 className="text-md text-foundation-grey-grey-200 mb-2">
                    {subModule.name}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
                    {(
                      Object.keys(
                        currentPermissions[module.id]?.[subModule.id] || {}
                      ) as Array<keyof ActionPermissions>
                    ).map((action) => (
                      <label
                        key={action}
                        className="flex items-center space-x-2 text-sm text-foundation-grey-grey-300 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-foundation-purple-purple-500 bg-foundation-black-black-400 border-foundation-grey-grey-600 rounded focus:ring-foundation-purple-purple-500"
                          checked={
                            currentPermissions[module.id]?.[subModule.id]?.[
                              action
                            ] || false
                          }
                          onChange={(e) =>
                            handleActionChange(
                              module.id,
                              subModule.id,
                              action,
                              e.target.checked
                            )
                          }
                        />
                        <span>
                          {action.charAt(0).toUpperCase() + action.slice(1)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-foundation-grey-grey-700/50">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-foundation-grey-grey-600 text-white rounded-lg hover:bg-foundation-grey-grey-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSavePermissions}
            disabled={isSaving}
            className="px-5 py-2.5 bg-foundation-purple-purple-500 text-white rounded-lg hover:bg-foundation-purple-purple-600 transition-colors disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save Permissions"}
          </button>
        </div>
      </div>
    </div>
  );
};
