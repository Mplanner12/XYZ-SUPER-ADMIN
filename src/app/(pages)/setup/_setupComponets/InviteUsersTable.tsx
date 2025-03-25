'use client';

import OverViewFilter from '@/components/finance/OverviewFilter';
import TableDropDown from '@/components/inventory/TableDropDown/TableDropDown';
import CustomDropDown from '@/components/setup/customDropdown';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, Minimize, PlusIcon } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsSortUp } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import { IoFilterSharp } from 'react-icons/io5';
import { receiptSend } from '../../../../../public';
import SubmitButton from '@/components/Buttons/SubmitButton';
import { useGetListUsers } from '@/hooks/query';
import { toast } from 'react-toastify';
import LoadingOverlay from '@/components/reusable/LoadingOverlay';

interface Props {
	onNext: () => void;
	onPrev: () => void;
}

export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  emailAddress?: string;
  status?: string;
  phoneNumber?: string;
  role?: string;
}

interface InviteUsersData {
	id: number;
	userName: string;
	userStatus: string;
	emailAddress: string;
	userRole: string;
	phoneNumber: string;
	action?: string;
}

export interface UsersResponse {
  data: User[];
  status: number;
  message: string;
}

const status = [
	'Active',
	'InActive',
	'Reset',
	'Pending',
	'Invite',
];

const columnHelper = createColumnHelper<InviteUsersData>();

const InviteUsersTable: React.FC<Props> = ({onNext, onPrev}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: response, isPending: isFetching, error } = useGetListUsers();
  const [data, setData] = useState<InviteUsersData[]>([]);

  // const [data, setData] = useState<InviteUsersData[]>([
  // 	{
  // 		id: 1,
  // 		userName: 'Lanre Ibrahim',
  // 		userStatus: `Active`,
  // 		emailAddress: 'lanre2345@gmail.com',
  // 		phoneNumber: '+24558555554',
  // 		userRole: 'Admin',
  // 		action: '',
  // 	},
  // 	{
  // 		id: 2,
  // 		userName: 'Mike Badis',
  // 		userStatus: `Active`,
  // 		emailAddress: 'mike123@gmail.com',
  // 		phoneNumber: '+12498989895',
  // 		userRole: 'Sales Manager',
  // 		action: '',
  // 	},
  // 	{
  // 		id: 3,
  // 		userName: 'Nathaniel Bassey',
  // 		userStatus: `Active`,
  // 		emailAddress: 'bassey23@gmail.com',
  // 		phoneNumber: '+2348078456921',
  // 		userRole: 'Store Manager',
  // 		action: '',
  // 	},
  // ]);

  const sendInvite = async (email: string) => {
    try {
      const response = await fetch("/api/account_setup/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add your authorization header here if needed
        },
        body: JSON.stringify({
          email,
          redirect_url: `${window.location.origin}/signup`, // Adjust redirect URL as needed
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send invite");
      }

      toast.success(`Invite sent successfully to ${email}`);
    } catch (error) {
      toast.error(`Failed to send invite to ${email}`);
      console.error("Error sending invite:", error);
    }
  };

  // Function to send invites to all users
  const sendInviteAll = async () => {
    try {
      const invitePromises = data.map((user) => sendInvite(user.emailAddress));

      await Promise.all(invitePromises);
      toast.success("All invites sent successfully");
    } catch (error) {
      toast.error("Failed to send some invites");
      console.error("Error sending invites:", error);
    }
  };

  // Update data when usersData changes
 useEffect(() => {
   if (response?.data) {
     const formattedData = response.data.map((user: User) => ({
       id: user.id,
       userName:
         user.firstName && user.lastName
           ? `${user.firstName} ${user.lastName}`
           : user.userName || "Unknown User",
       userStatus: user.status || "Pending",
       emailAddress: user.email || user.emailAddress || "",
       phoneNumber: user.phoneNumber || "",
       userRole: user.role || "User",
     }));
     setData(formattedData);
   }
 }, [response]);

  // this handles option change in a custom select element
  const handleStatusChange = (selectedOption: string, rowId: number) => {
    const updatedData = data.map((row) =>
      row.id === rowId ? { ...row, userStatus: selectedOption } : row
    );

    setData(updatedData); // Update the table data state
  };

  // Filter data based on search query
  const filteredData = data.filter(
    (user) =>
      user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.emailAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phoneNumber.includes(searchQuery)
  );

  // Table header and body data
  const columns = [
    columnHelper.accessor("userName", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("emailAddress", {
      header: "Email Address",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("phoneNumber", {
      header: "Phone Number",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("userStatus", {
      header: "Status",
      cell: (info) => {
        const category = info.getValue();
        return (
          <div className="">
            <CustomDropDown
              options={status}
              label=""
              iconColor="#8133f1"
              initialValue={category}
              handleChange={(option) =>
                handleStatusChange(option, info.row.original.id)
              }
              styles=""
              stylesOption="gap-4"
            />
          </div>
        );
      },
    }),
    columnHelper.accessor("userRole", {
      header: "Role",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("action", {
      header: "Actions",
      cell: (info) => (
        <div className="text-sm text-foundation-purple-purple-400 flex gap-1"
        onClick={() => sendInvite(info.row.original.emailAddress)}>
          <Image src={receiptSend} alt="Send receipt image" /> Send Invite
          {info.getValue()}
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // if (error) {
  //   return (
  //     <div className="text-red-500 p-4">
  //       Error loading users: {error.message}
  //     </div>
  //   );
  // }

  return (
    <>
      <div className=" w-full">
        <main>
          <div className="flex justify-between flex-wrap items-center mb-4 md:mb-2">
            <div className="inline-block">
              <h2 className="text-base font-semibold">Invite Users</h2>
              <p className="text-sm text-foundation-grey-grey-700 max-w-[280px]">
                Send an invite to all the users you have assigned roles and
                permissions
              </p>
            </div>
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
          <div className="flex justify-end w-full px-3 mt-5">
            <p
              className="text-sm text-foundation-purple-purple-400 flex gap-1 cursor-pointer"
              onClick={sendInviteAll}
            >
              <Image src={receiptSend} alt="Send receipt image" />
              Invite All
            </p>
          </div>

          {isFetching ? (
            <div>
              <LoadingOverlay />
            </div>
          ) : (
            <div className="scroll overflow-x-auto border-2 border-foundation-grey-grey-300 rounded-2xl mt-4">
              <table className="w-full text-wrap bg-white text-left text-sm">
                <thead className="bg-foundation-grey-grey-300/25 text-foundation-black-black-400 text-sm ">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="py-4 px-4 font-medium border-b border-foundation-grey-grey-200 "
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
                  {table.getRowModel().rows.map((row, index) => (
                    <tr
                      key={row.id}
                      className={`border-b border-foundation-grey-grey-300`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="py-4 px-4 whitespace-break-spaces text-foundation-grey-grey-700"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {error && (
                <div className="text-red-500 p-4">
                  Error loading users: {error.message}
                </div>
              )}
            </div>
          )}
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
            onClick={onNext}
            customPadding="w-20 py-4 mt-5 mb-3"
            actionType="submit"
            // loading={isPending}
          />
        </div>
      </div>
    </>
  );
};

export default InviteUsersTable;
