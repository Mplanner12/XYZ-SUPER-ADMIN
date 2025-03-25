"use client";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PlusIcon, Pencil } from "lucide-react";
import { FiSearch } from "react-icons/fi";

// Components
import SubmitButton from "@/components/Buttons/SubmitButton";
import ModalComponent from "@/components/inventory/ModalComponent";
import TableDropDown from "@/components/inventory/TableDropDown/TableDropDown";
import InputElement from "@/app/(pages)/setup/_setupComponets/Input/InputElement";
import SelectElement from "@/app/(pages)/setup/_setupComponets/Input/SelectElement";
import { toast } from "react-toastify";
import { decodeToken } from "@/api";
import { useAddRoles, useDeleteRoleById, useUpdateRoleById } from "@/hooks/mutate";
import { useGetRoleById } from "@/hooks/query";
import LoadingOverlay from "@/components/reusable/LoadingOverlay";

// Types for endpoint requirements
interface UserRoleData {
  business_id?: any;
  name: string;
  approval_amount: string;
  approval_level: "Level 1" | "Level 2" | "Level 3" | "Level 4" | "Level 5";
  permission_type: "Full Access" | "Partial Access" | "None Access";
  id?: string;
  sub_role: string;
}

interface UserRoleModalProps {
  initialData?: UserRoleData;
  onSubmit: (data: UserRoleData) => void;
  isEditing?: boolean;
  isPending?: boolean;
}

// response data type
export interface RoleResponse {
  business_id?: number;
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_order?: string;
  name?: string;
  approval_level?: string;
}

const AddUserRoleModal: React.FC<UserRoleModalProps> = ({
  initialData,
  onSubmit,
  isEditing = false,
  isPending = false,
}) => {
  const [businessId, setBusinessId] = useState<number | null>(null);

  useEffect(() => {
    const fetchBusinessId = async () => {
      const businessToken = await decodeToken();
      if (businessToken && typeof businessToken.business_id === "number") {
        setBusinessId(businessToken.business_id);
      } else {
        toast.error("Business Id not found");
        // Handle error ( redirect to login page)
      }
    };

    fetchBusinessId();
  }, []);

  const modalRef = useRef<HTMLDivElement>(null);


  const methods = useForm<UserRoleData>({
    defaultValues: initialData || {
      business_id: businessId,
      name: "",
      approval_amount: "",
      approval_level: "Level 1",
      permission_type: "None Access",
    },
  });

  const {
    register,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = methods;

  // const handleSubmit = (data: UserRoleData) => {
  //   // Add business_id if needed
  //   const submissionData = {
  //     ...data,
  //     business_id: businessId,
  //     id: initialData?.id || uuidv4(),
  //   };

  //   onSubmit(submissionData);
  //   methods.reset();
  // };

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      methods.reset(initialData);
    }
  }, [initialData, methods]);

  const handleSubmit = (data: UserRoleData) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="w-[80%]">
        <div className="flex flex-col px-2 gap-3 w-full">
          <InputElement
            id="name"
            label="Role Name"
            type="text"
            placeholder="Enter role name"
            registerName="name"
            error={errors.name?.message}
          />

          <SelectElement
            id="permission_type"
            label="Permission Type"
            options={[
              { value: "Full Access", label: "Full Access" },
              { value: "Partial Access", label: "Partial Access" },
              { value: "None Access", label: "None Access" },
            ]}
            registerName="permission_type"
            error={errors.permission_type?.message}
          />

          <SelectElement
            id="sub-role"
            label="Sub-Role"
            options={[
              { value: "Admin", label: "Admin" },
              { value: "Store Manager", label: "Store Manager" },
              { value: "Sales Manager", label: "Sales Manager" },
              { value: "Procurement Manager", label: "Procurement Manager" },
              { value: "Warehouse Manager", label: "Warehouse Manager" },
              { value: "Marketing Officer", label: "Marketing Officer" },
            ]}
            registerName="permission_type"
            error={errors.sub_role?.message}
          />

          <SelectElement
            id="approval_level"
            label="Approval Level"
            options={[
              { value: "Level 1", label: "Level 1" },
              { value: "Level 2", label: "Level 2" },
              { value: "Level 3", label: "Level 3" },
              { value: "Level 4", label: "Level 4" },
              { value: "Level 5", label: "Level 5" },
            ]}
            registerName="approval_level"
            error={errors.approval_level?.message}
          />

          <InputElement
            id="approval_amount"
            label="Approval Amount Limit"
            type="text"
            placeholder="Enter approval amount limit"
            registerName="approval_amount"
            error={errors.approval_amount?.message}
          />

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-xl w-full px-4 py-3 text-sm font-semibold shadow-sm border border-solid border-foundation-purple-purple-400 bg-foundation-purple-purple-400 hover:bg-foundation-purple-purple-300 text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              {isPending
                ? "Loading..."
                : isEditing
                ? "Update Role"
                : "Add Role"}
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

const UserRoleTable: React.FC<{ onNext: () => void; onPrev: () => void }> = ({
  onNext,
  onPrev,
}) => {
  const [data, setData] = useState<UserRoleData[]>([]);
  const [businessId, setBusinessId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<UserRoleData | undefined>(
    undefined
  );
  const [roleId, setRoleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // API hooks
  const { mutate: createUserRoles, isPending: isCreating } = useAddRoles();
  const { mutate: updateRoles, isPending: isUpdating } = useUpdateRoleById();
  const { mutate: deleteRoles, isPending: isDeleting } = useDeleteRoleById();
  const {
    data: rolesData,
    isPending: isfetching,
    error,
  } = useGetRoleById(
    businessId
      ? {
          business_id: businessId,
          page: 1,
          per_page: 10,
          sort_by: "id",
          sort_order: "asc",
        }
      : undefined
  );

  useEffect(() => {
    const fetchBusinessId = async () => {
      const businessToken = await decodeToken();
      if (businessToken && typeof businessToken.business_id === "number") {
        setBusinessId(businessToken.business_id);
      } else {
        toast.error("Business Id not found");
        // Handle error (e.g., redirect to login page)
      }
    };

    fetchBusinessId();
  }, []);

  const handleCreateRole = (newRole: UserRoleData) => {
    createUserRoles(
      { data: {...newRole, business_id: businessId} },
      {
        onSuccess: (response) => {
          toast.success("Role created successfully");
          setRoleId(response.role_id);
          setIsModalOpen(false);
        },
        onError: (error) => {
          console.error("Error creating role:", error);
          toast.error(error.message);
        },
      }
    );
  };

  const handleUpdateRole = (updatedRole: UserRoleData) => {

    if (!roleId) {
      console.error("role_id is not available for update.");
      return;
    }

    updateRoles({data: updatedRole, role_id: roleId}, {
      onSuccess: () => {
        setIsModalOpen(false);
        setEditingRole(undefined);
      },
      onError: (error) => {
        console.error("Error updating role:", error);
        toast.error(error.message);
      },
    });
  };

  const handleDeleteRole = (deletedRole: UserRoleData) => {
    if (!roleId) {
      console.error("role_id is not available for deletion.");
      return;
    }

    deleteRoles(
      { data: deletedRole, role_id: roleId },
      {
        onSuccess: () => {
          toast.success("Role deleted successfully");
        },
        onError: (error) => {
          console.error("Error deleting role:", error);
          toast.error(error.message);
        },
      }
    );
  };

  const openEditModal = (role: UserRoleData) => {
    setEditingRole(role);
    setRoleId(role.id || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRole(undefined);
  };

  const columnHelper = createColumnHelper<UserRoleData>();

  const columns = [
    columnHelper.accessor("name", {
      header: "Role Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("approval_level", {
      header: "Approval Level",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("approval_amount", {
      header: "Approval Limit",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("permission_type", {
      header: "Permission Type",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <TableDropDown
          icon={<Pencil />}
          options={[
            {
              label: "Edit",
              onClick: () => {
                console.log("Edit clicked", info.row.original)
                openEditModal(info.row.original)
              }
            },
            {
              label: "Delete",
              onClick: () => handleDeleteRole(info.row.original),
            },
          ]}
        />
      ),
    }),
  ];

  // const table = useReactTable({
  //   data,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  // });

  // const { data: rolesData, isPending: isFetching } = useGetRoleById({
  //   business_id: businessId,
  //   page: 1,
  //   per_page: 10,
  // });
  // console.log("rolesData:", rolesData);

  // const filteredRoles =
  //   rolesData?.data.filter((role: UserRoleData) =>
  //     role.name?.toLowerCase().includes(searchQuery.toLowerCase())
  // ) || [];

  const roles: UserRoleData[] = rolesData?.data || [];

  const filteredRoles = roles.filter((role) =>
    role.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const table = useReactTable({
    data: filteredRoles,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });


  if (error) {
    return <div>Error loading roles: {error.message}</div>;
  }
  

  if (isCreating || isUpdating || isDeleting) {
    return <div><LoadingOverlay/></div>;
  }

  return (
    <div className="w-full mt-5">
      <div className="flex justify-between flex-wrap items-left mb-4 md:mb-2">
        <h2 className="text-base font-semibold">User Roles</h2>
        <div className="flex items-center gap-4">
          <div className="w-fit relative">
            <input
              type="text"
              placeholder="Search roles"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-[4px] border-0 h-auto py-3 pr-2 pl-9 text-[16px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-[#8133F1] focus:ring-2 placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
            />
            <FiSearch className="text-[22px] absolute left-2 top-[.7rem] text-[#66686B]" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border-2 border-foundation-grey-grey-300 rounded-2xl mt-4">
        <table className="w-full text-wrap bg-white text-left text-sm">
          <thead className="bg-foundation-grey-grey-300/25">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-4 px-4 font-medium border-b border-foundation-grey-grey-200"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-foundation-grey-grey-300"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="py-4 px-4 whitespace-break-spaces text-foundation-grey-grey-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex font-medium text-sm text-foundation-purple-purple-500 items-center justify-start mr-10 py-3 px-3 gap-1 cursor-pointer">
          <button
            onClick={() => {
              setEditingRole(undefined);
              setIsModalOpen(true);
            }}
            className="flex items-center text-foundation-purple-purple-400 hover:text-foundation-purple-purple-300 rounded"
          >
            <PlusIcon className="mr-2" /> Add Role
          </button>
        </div>
      </div>

      <ModalComponent
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingRole(undefined);
        }}
        // onClose={closeModal}
        title={editingRole ? "Edit Role" : "Add New Role"}
        styles="max-w-xl w-full"
      >
        <AddUserRoleModal
          initialData={editingRole}
          onSubmit={editingRole ? handleUpdateRole : handleCreateRole}
          isEditing={!!editingRole}
          isPending={isCreating || isUpdating}
        />
      </ModalComponent>

      <div className="flex justify-between mt-4">
        <SubmitButton
          text="Prev"
          onClick={onPrev}
          customPadding="w-20 py-4"
          actionType="button"
        />
        <SubmitButton
          text="Next"
          onClick={onNext}
          customPadding="w-20 py-4"
          actionType="submit"
        />
      </div>
    </div>
  );
};

export default UserRoleTable;
