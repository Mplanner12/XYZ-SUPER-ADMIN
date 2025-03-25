import InputElement from '@/app/(pages)/setup/_setupComponets/Input/InputElement';
import SelectElement from '@/app/(pages)/setup/_setupComponets/Input/SelectElement';
import { businessType } from '@/data/setupData';
import React from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

const permission = [
	{ value: 'full', label: 'Full' },
	{ value: 'partial', label: 'Partial' },
	{ value: 'partial', label: 'No Permission' },
];

const subRole = [
	{ value: 'null', label: 'Select the Primary Role' },
	{ value: 'admin', label: 'Admin' },
	{ value: 'sales-Manager', label: 'Sales Manager' },
	{ value: 'store-manager', label: 'Store Manager' },
	{ value: 'procurement-manager', label: 'Procurement Manager' },
	{ value: 'warehouse-manager', label: 'Warehouse Manager' },
	{ value: 'marketing-officer', label: 'Marketing Officer' },
];

const approvalLevel = [
	{ value: 'null', label: 'Select the Level Number' },
	{ value: 'level-1', label: 'Level 1' },
	{ value: 'level-2', label: 'Level 2' },
	{ value: 'level-3', label: 'Level 3' },
	{ value: 'level-4', label: 'Level 4' },
	{ value: 'level-5', label: 'Level 5' },
];

const AddUserRoleModal = () => {
	const { register, handleSubmit } = useForm();
	const methods = useForm();

	const onSubmit = async (data: any) => {
		// Handle form submission
		console.log(data);
	};

	return (
		<FormProvider {...methods}>
			<form action="" onSubmit={methods.handleSubmit(onSubmit)}>
				<div className="flex flex-col px-2 gap-3 w-full">
					<InputElement
						id="roleName"
						label="Role Name"
						type="text"
						placeholder="What is name of the Role"
						registerName="roleName"
						// error={errors.businessLocation?.message}
					/>
					<SelectElement
						id="permission"
						label="Permission"
						options={permission}
						registerName="permission"
						// error={errors.businessState?.message}
					/>
					<SelectElement
						id="subRole"
						label="Sub-Role"
						options={subRole}
						registerName="subRole"
						// error={errors.businessState?.message}
					/>
					<SelectElement
						id="approvalLevel"
						label="Approval Level Number"
						options={approvalLevel}
						registerName="approvalLevel"
						// error={errors.businessState?.message}
					/>
					<InputElement
						id="approvalAmountLimit"
						label="Approval Amount Limit (in USD)"
						type="number"
						placeholder="Enter the highest amount this role can approval"
						registerName="storageZone"
						// error={errors.postalCode?.message}
					/>
          <div className='flex justify-center mt-6'>
            <button
              type="submit"
              className="rounded-xl  w-full px-4 py-3 text-sm font-semibold shadow-sm border border-solid border-foundation-purple-purple-400 bg-foundation-purple-purple-400 hover:bg-foundation-purple-purple-300 text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              Add Role
            </button>
          </div>
				</div>
			</form>
		</FormProvider>
	);
};

export default AddUserRoleModal;
