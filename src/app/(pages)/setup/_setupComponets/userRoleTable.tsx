'use client';
import SubmitButton from '@/components/Buttons/SubmitButton';
import ModalComponent from '@/components/inventory/ModalComponent';
import TableDropDown from '@/components/inventory/TableDropDown/TableDropDown';
import AddUserRoleModal from '@/components/setup/add-user-role';
import CustomDropDown from '@/components/setup/customDropdown';
import { useAddRoles, useDeleteRoleById, useUpdateRoleById } from '@/hooks/mutate';
import { useGetRoleById } from '@/hooks/query';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, Minimize, PlusIcon } from 'lucide-react';
import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { FiSearch } from 'react-icons/fi';
import { ImPencil } from 'react-icons/im';
import {v4 as uuidv4} from 'uuid';

interface Props {
  onNext: () => void;
  onPrev: () => void;
}
interface UserRoleData {
	id: string;
	userRoles: string;
	approvalLevel: string;
	approvalLimit: string;
	permission: string;
	action?: string;
}

const options = [
	'Level 0',
	'Level 1',
	'Level 2',
	'Level 3',
	'Level 4',
	'Level 5',
];

const permissions = [
	'No Permission',
	'Partial',
	'Full',
];

const columnHelper = createColumnHelper<UserRoleData>();

const generateTscTableOptions = [
	{
		label: 'View Details',
	},
	{ label: 'Edit' },
	{ label: 'Delete' },
];

const UserRole: React.FC<Props> = ({onNext, onPrev}) => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const {mutate: createUserRoles, isPending} = useAddRoles();
	const {mutate: updateRoles, isPending: isUpdate} = useUpdateRoleById()
	const {mutate: deleteRoles, isPending: isDelete} = useDeleteRoleById()
	const {data: existingRoles, isPending: isGetting} = useGetRoleById();

  const handleModal = () => {
		// handle payment logic
		console.log('proceeding with payment');
	};

	const [data, setData] = useState<UserRoleData[]>([
    {
      id: uuidv4(),
      userRoles: "Admin",
      approvalLevel: ``,
      approvalLimit: "< $5000",
      permission: "",
      action: "",
    },
    {
      id: uuidv4(),
      userRoles: "Sales Manager",
      approvalLevel: ``,
      approvalLimit: "< $4000",
      permission: "",
      action: "",
    },
    {
      id: uuidv4(),
      userRoles: "Store Manager",
      approvalLevel: ``,
      approvalLimit: "< $3000",
      permission: "",
      action: "",
    },
  ]);

  // this handles option change in a custom select element
  const handleCategoryChange = (selectedOption: string, rowId: string) => {
		const updatedData = data.map((row) =>
			row.id === rowId ? { ...row, approvalLevel: selectedOption } : row
		);

		setData(updatedData); // Update the table data state
	};

  const handlePermissionChange = (selectedOption: string, rowId: string) => {
		const updatedData = data.map((row) =>
			row.id === rowId ? { ...row, permission: selectedOption } : row
		);

		setData(updatedData); // Update the table data state
	};

	// Table header and body data
	const columns = [
		columnHelper.accessor('userRoles', {
			header: 'Role',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('approvalLevel', {
			header: 'Approval Level',
			cell: (info) => {
				const category = info.getValue();
				return (
					<div className="">
						<CustomDropDown
							options={options}
							label="Level 0"
							iconColor="#8133f1"
							initialValue={category}
							handleChange={(option) =>
								handleCategoryChange(option, info.row.original.id)
							}
							styles=""
							stylesOption=""
						/>
					</div>
				);
			},
		}),
		columnHelper.accessor('approvalLimit', {
			header: 'Approval Limit Amount',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('permission', {
			header: 'Permission',
			cell: (info) => {
				const category = info.getValue();
				return (
					<div className="">
						<CustomDropDown
							options={permissions}
							label="No permission"
							iconColor="#8133f1"
							initialValue={category}
							handleChange={(option) =>
								handlePermissionChange(option, info.row.original.id)
							}
							styles=""
							stylesOption="gap-4"
						/>
					</div>
				);
			},
		}),

		columnHelper.accessor('action', {
			header: 'Edit Permissions',
			cell: (info) => (
				<div className="">
					<TableDropDown
						icon={<ImPencil />}
						options={generateTscTableOptions}
					/>
					{info.getValue()}
				</div>
			),
		}),
	];

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const onSubmit: SubmitHandler<Props> = async (data) => {
		
	}

	return (
    <>
      <div className=" w-full mt-5">
        <main>
          <div className="flex justify-between flex-wrap items-left mb-4 md:mb-2">
            <h2 className="text-base font-semibold">User Roles</h2>
            {/* search input */}
            <div className="flex md:w-[30%] w-full">
              <div className="w-fit relative ">
                <input
                  type="text"
                  name="search"
                  placeholder="Search for a user"
                  size={70}
                  className={
                    "block w-full rounded-[4px] border-0 h-auto py-3 pr-2 pl-9 text-[16px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-[#8133F1] focus:ring-2 placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                  }
                />
                <span>
                  <FiSearch className="text-[22px] absolute left-2 top-[.7rem] text-[#66686B]" />
                </span>
              </div>
            </div>
          </div>

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
            <div
              className="flex font-medium text-sm text-foundation-purple-purple-500 items-center justify-end mr-10 py-3 gap-1 cursor-pointer"
              onClick={openModal}
            >
              <PlusIcon />
              Add More Roles
            </div>

            {/* modal component */}
            <ModalComponent
              isOpen={isModalOpen}
              onClose={closeModal}
              title="Add A New Role"
              styles="max-w-xl"
            >
              <div className="w-[70%]">
                <AddUserRoleModal />
              </div>
            </ModalComponent>
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

export default UserRole;
