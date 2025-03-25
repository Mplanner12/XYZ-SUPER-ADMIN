"use client";
import { decodeToken } from "@/api";
import SubmitButton from "@/components/Buttons/SubmitButton";
import OverViewFilter from "@/components/finance/OverviewFilter";
import TableDropDown from "@/components/inventory/TableDropDown/TableDropDown";
import LoadingOverlay from "@/components/reusable/LoadingOverlay";
import { useAddCreateUser } from "@/hooks/mutate";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, Minimize, PlusIcon } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { BsSortUp } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

interface UserManagementData {
  id: string;
  first_name: string;
  user_status: string;
  email_address: string;
  user_role: string;
  phone: string;
  createdDate: string;
  isEditing?: boolean;
}

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

const UserManagementTable: React.FC<Props> = ({ onNext, onPrev }) => {
  const [editingData, setEditingData] = useState<{
    [key: string]: UserManagementData;
  }>({});
  const [businessId, setBusinessId] = useState<number | null>(null);
  const [users, setUsers] = useState<UserManagementData[]>([]);

  const { mutate: createUsersMutate, isPending: isCreating } =
    useAddCreateUser();

  // Simulated data fetching - replace with actual API call
  // useEffect(() => {
  //   const initialData = [
  //     {
  //       id: uuidv4(),
  //       first_name: "Lanre Ibrahim",
  //       user_status: "Active",
  //       email_address: "lanre2345@gmail.com",
  //       phone: "+24558555554",
  //       user_role: "Admin",
  //       createdDate: "06-23-2022",
  //       isEditing: false,
  //     },
  //   ];
  //   setUsers(initialData);
  // }, []);

  // const { data: initialUsers } = await fetchUserData(); // Fetch data from API
  // setUsers(initialUsers);

  const handleEdit = (id: string) => {
    const updatedUsers = users.map((user) => ({
      ...user,
      isEditing: user.id === id ? true : user.isEditing,
    }));
    setUsers(updatedUsers);
    const userToEdit = users.find((user) => user.id === id);
    if (userToEdit) {
      setEditingData({
        ...editingData,
        [id]: { ...userToEdit },
      });
    }
  };

  const handleSave = async (id: string) => {
    try {
      // Replace with actual API call
      // await updateUser({ ...editingData[id] });

      // await updateUserData({ ...editingData[id] }); // Update user data via API
      const updatedUsers = users.map((user) =>
        user.id === id
          ? { ...user, ...editingData[id], isEditing: false }
          : user
      );
      setUsers(updatedUsers);
      setEditingData((prev) => {
        const { [id]: _, ...rest } = prev; // Remove saved data from editingData
        return rest;
      });
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // Replace with actual API call
      // await deleteUser(id);

      // await deleteUserData(id); // Delete user via API
      const updatedUsers = users.filter((user) => user.id !== id);
      toast.success("User information deleted successfully");
      setUsers(updatedUsers);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleInputChange = (
    id: string,
    field: keyof UserManagementData,
    value: string
  ) => {
    setEditingData({
      ...editingData,
      [id]: {
        ...editingData[id],
        [field]: value,
      },
    });
  };

  const addNewUser = () => {
    const newUserId = uuidv4();
    setUsers([
      ...users,
      {
        id: newUserId,
        first_name: "",
        user_status: "Active",
        email_address: "",
        phone: "",
        user_role: "sales manager",
        createdDate: new Date().toLocaleDateString(),
        isEditing: true,
      },
    ]);
  };

  // checking for Validation
  const validateUserData = (user: UserManagementData): boolean => {
    if (!user.email_address.trim()) {
      toast.error("Email address is required for all users");
      return false;
    }
    if (!user.first_name.trim()) {
      toast.error("Name is required for all users");
      return false;
    }
    if (!user.user_role.trim()) {
      toast.error("User role is required");
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email_address)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    // Basic phone validation (optional field but if provided should be valid)
    if (user.phone && !/^\+?[\d\s-]{10,}$/.test(user.phone)) {
      toast.error("Please enter a valid phone number");
      return false;
    }

    return true;
  };

  const generateTableOptions = (id: string) => [
    {
      label: users.find((user) => user.id === id)?.isEditing ? "Save" : "Edit",
      action: () =>
        users.find((user) => user.id === id)?.isEditing
          ? handleSave(id)
          : handleEdit(id),
    },
    {
      label: "Delete",
      action: () => handleDelete(id),
    },
  ];

  useEffect(() => {
    const fetchBusinessId = async () => {
      const businessToken = await decodeToken();
      if (businessToken && typeof businessToken.business_id === "number") {
        setBusinessId(businessToken.business_id);
      } else {
        toast.error("user Id not found");
        // Handle error (e.g., redirect to login page)
      }
    };

    fetchBusinessId();
  }, []);

  // handleSubmit function
  const handleSubmit = async () => {
    try {
      // Filter out any empty rows and format the data
      const validUsers = users
        .filter((user) => user.email_address.trim() !== "")
        .map(({ isEditing, id, ...userData }) => ({
          first_name: userData.first_name,
          user_status: userData.user_status,
          email_address: userData.email_address,
          user_role: userData.user_role,
          phone: userData.phone,
          createdDate: userData.createdDate,
        }));

      if (validUsers.length === 0) {
        toast.error("Please add at least one user with valid information");
        return;
      }
      // Validate all users before submission
      // const allUsersValid = validUsers.every((user) =>
      //   validateUserData(user as UserManagementData)
      // );

      // if (!allUsersValid) {
      //   return;
      // }

      // Check for any users still in editing mode
      const hasEditingUsers = users.some((user) => user.isEditing);
      if (hasEditingUsers) {
        toast.error("Please save all editing changes before proceeding");
        return;
      }

      // Create the proper payload structure
      const payload = {
        data: {
          users: validUsers,
        },
      };

      await createUsersMutate(
        {
          data: validUsers,
        },
        {
          onSuccess: () => {
            toast.success("Users information saved successfully");
            onNext();
          },
          onError: (error: any) => {
            toast.error(error.message || "Error submitting users information");
          },
        }
      );
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Error submitting users information");
    }
  };

  if (isCreating) {
    return (
      <div>
        <LoadingOverlay />
      </div>
    );
  }

  return (
    <>
      <div className=" w-full mt-5 px-2">
        <main>
          <div className="flex justify-between flex-wrap items-center mb-4 md:mb-2">
            <h2 className="text-sm font-semibold">Invite Users</h2>
            {/* search input */}
            <div className="flex gap-6 items-center md:w-[50%] w-full">
              <div className="flex justify-between text-sm text-foundation-purple-purple-400">
                <div className="flex gap-4">
                  <p className="flex align-middle gap-2 cursor-pointer">
                    Filter <IoFilterSharp color="#8133F1" size={24} />
                  </p>
                  <p className="flex align-middle gap-2 cursor-pointer">
                    Sort <BsSortUp color="#8133F1" size={24} />
                  </p>
                </div>
              </div>
              <div className="w-fit relative">
                <input
                  type="text"
                  name="search"
                  placeholder="Search for a user"
                  size={70}
                  className={
                    "block w-full rounded-[6px] border-0 h-auto py-3.5 pr-2 pl-9 text-[16px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-[#8133F1] focus:ring-2 placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                  }
                />
                <span>
                  <FiSearch className="text-[22px] absolute left-2 top-[.8rem] text-[#66686B]" />
                </span>
              </div>
            </div>
          </div>

          <div className="scroll overflow-x-auto border-2 border-foundation-grey-grey-300 rounded-2xl mt-4">
            <table className="w-full text-wrap bg-white text-left text-sm">
              <thead className="bg-foundation-grey-grey-300/25 text-foundation-black-black-400 text-sm w-full border-b-foundation-grey-grey-300 text-left rounded-2xl">
                <tr>
                  <th className="py-4 px-4 font-medium text-left">Name</th>
                  <th className="py-4 px-4 font-medium text-left">
                    Email Address
                  </th>
                  <th className="py-4 px-4 font-medium text-left">
                    Phone Number
                  </th>
                  <th className="py-4 px-4 font-medium text-center">Created</th>
                  <th className="py-4 px-4 font-medium text-center">Status</th>
                  <th className="py-4 px-4 font-medium text-center">Role</th>
                  <th className="py-4 px-4 font-medium ">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`${
                      index === users.length - 1 ? "border-b-none" : "border-b"
                    } border-b-foundation-grey-grey-300 hover:bg-gray-100`}
                  >
                    <td className="py-4 text-left px-4 whitespace-nowrap text-foundation-grey-grey-700">
                      {user.isEditing ? (
                        <input
                          type="text"
                          value={
                            editingData[user.id]?.first_name || user.first_name
                          }
                          onChange={(e) =>
                            handleInputChange(
                              user.id,
                              "first_name",
                              e.target.value
                            )
                          }
                          className="border p-1 rounded"
                        />
                      ) : (
                        user.first_name
                      )}
                    </td>
                    <td className="py-4 px-4 text-left whitespace-nowrap text-foundation-grey-grey-700">
                      {user.isEditing ? (
                        <input
                          type="email"
                          value={
                            editingData[user.id]?.email_address ||
                            user.email_address
                          }
                          onChange={(e) =>
                            handleInputChange(
                              user.id,
                              "email_address",
                              e.target.value
                            )
                          }
                          className="border p-1 rounded"
                        />
                      ) : (
                        user.email_address
                      )}
                    </td>
                    <td className="py-4 px-4 text-left whitespace-nowrap text-foundation-grey-grey-700">
                      {user.isEditing ? (
                        <input
                          type="text"
                          value={editingData[user.id]?.phone || user.phone}
                          onChange={(e) =>
                            handleInputChange(user.id, "phone", e.target.value)
                          }
                          className="border p-1 rounded"
                        />
                      ) : (
                        user.phone
                      )}
                    </td>
                    <td className="py-4 px-4 text-center whitespace-nowrap text-foundation-grey-grey-700">
                      {user.createdDate}
                    </td>
                    <td className="py-4 px-4 text-center whitespace-nowrap text-foundation-grey-grey-700">
                      {user.isEditing ? (
                        <div className="relative">
                          <select
                            value={
                              editingData[user.id]?.user_status ||
                              user.user_status ||
                              "Active"
                            }
                            onChange={(e) =>
                              handleInputChange(
                                user.id,
                                "user_status",
                                e.target.value
                              )
                            }
                            className="appearance-none border-none active:border-none outline-none p-2 rounded w-full pr-8"
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                          <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                            <ChevronDown className="text-[#8133F1] w-5 h-5" />
                          </span>
                        </div>
                      ) : (
                        user.user_status
                      )}
                    </td>
                    <td className="py-4 text-center px-4 whitespace-nowrap text-foundation-grey-grey-700">
                      {user.isEditing ? (
                        <div className="relative">
                          <select
                            value={
                              editingData[user.id]?.user_role ||
                              user.user_role ||
                              "Select Role"
                            }
                            onChange={(e) =>
                              handleInputChange(
                                user.id,
                                "user_role",
                                e.target.value
                              )
                            }
                            className="appearance-none border-none active:border-none outline-none p-2 rounded w-full pr-8"
                          >
                            <option value="" disabled>
                              Select Role
                            </option>
                            <option value="Sales Manager">Sales Manager</option>
                            <option value="Store Manager">Store Manager</option>
                          </select>
                          <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                            <ChevronDown className="text-[#8133F1] w-5 h-5" />
                          </span>
                        </div>
                      ) : (
                        user.user_role
                      )}
                    </td>
                    <td className="py-4 text-center px-4 whitespace-nowrap text-foundation-grey-grey-700">
                      <TableDropDown options={generateTableOptions(user.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="w-full self-stretch py-4">
              <p
                className="flex items-center justify-start w-full self-stretch text-foundation-purple-purple-400 cursor-pointer px-4"
                onClick={addNewUser}
              >
                <PlusIcon />
                Add More Users
              </p>
            </div>
          </div>
        </main>

        <div className="flex justify-between">
          <SubmitButton
            text="Prev"
            onClick={onPrev}
            customPadding="w-20 py-4 mt-5 mb-3"
            actionType="button"
            // loading={isPending}
          />
          <SubmitButton
            text="Next"
            // onClick={handleSubmit}
            onClick={onNext}
            customPadding="w-20 py-4 mt-5 mb-3"
            actionType="submit"
            loading={isCreating}
          />
        </div>
      </div>
    </>
  );
};

export default UserManagementTable;
