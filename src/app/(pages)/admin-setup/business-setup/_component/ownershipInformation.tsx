import { decodeToken } from '@/api';
import SubmitButton from '@/components/Buttons/SubmitButton';
import TableDropDown from '@/components/inventory/TableDropDown/TableDropDown';
import { useDeleteOwnershipInformation, useOwnershipInformation, useUpdateOwnershipInformation } from '@/hooks/mutate';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuCopyPlus } from 'react-icons/lu';
import { toast } from 'react-toastify';
import { z } from 'zod';

const OwnershipFormSchema = z.object({
	shareholder_name: z.string().min(1, 'Shareholder name is required'),
	no_of_share_in_fiscal_year: z.string().min(1, 'Number of shares is required'),
	book_value_of_ordinary_share: z.string().min(1, 'Rc number is required'),
	dividend_outstanding_amount: z.string().min(1, 'Rc number is required'),
});

// type ownershipData = z.infer<typeof OwnershipFormSchema>;
interface OwnershipData {
	id?: string;
	shareholder_name: string;
	no_of_share_in_fiscal_year: string;
	book_value_of_ordinary_share: string;
	dividend_outstanding_amount: string;
	isEditing?: boolean;
}


interface AdminOwnershipInfoProps {
  onNext: () => void;
  onPrev: () => void;
}

const AdminOwnershipInfo: React.FC<AdminOwnershipInfoProps> = ({
  onPrev, onNext
}) => {
  
  const [businessId, setBusinessId] = useState<number | null>(null);
  const [shareholders, setShareholders] = useState<OwnershipData[]>([]);

	// api calls
  const {mutate: ownershipMutate, isPending} = useOwnershipInformation();
	const {mutate: deleteOwnershipMutate, isPending: isDelete} = useDeleteOwnershipInformation();
	const {mutate: updateOwnershipMutate, isPending: isUpdate} = useUpdateOwnershipInformation();

	// setup router
	const router  = useRouter()

  useEffect(() => {
		const fetchBusinessId = async () => {
			const businessToken = await decodeToken();
			if (businessToken && typeof businessToken.business_id === 'number') {
				setBusinessId(businessToken.business_id);
			} else {
				toast.error('user Id not found');
				// Handle error (e.g., redirect to login page)
			}
		};

		fetchBusinessId();
	}, []);

	const addNewShareholder = () => {
		setShareholders([
			...shareholders,
			{
				shareholder_name: '',
				no_of_share_in_fiscal_year: '',
				book_value_of_ordinary_share: '',
				dividend_outstanding_amount: '',
        isEditing: true,
			},
		]);
	};

  const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const { name, value } = e.target;
		const updatedShareholders = [...shareholders];
		updatedShareholders[index] = {
			...updatedShareholders[index],
			[name]: value,
		};
		setShareholders(updatedShareholders);
	};

	const handleChange = (index: number, field: keyof OwnershipData, value: string) => {
    const updatedShareholders = shareholders.map((shareholder, i) => 
      i === index ? { ...shareholder, [field]: value } : shareholder
    );
    setShareholders(updatedShareholders);
  };

	const toggleEdit = (index: number) => {
    const updatedShareholders = shareholders.map((shareholder, i) => 
      i === index ? { ...shareholder, isEditing: !shareholder.isEditing } : shareholder
    );
    setShareholders(updatedShareholders);
  };

	const saveLocalChanges = (index: number) => {
		const updatedShareholders = shareholders.map((shareholder, i) =>
			i === index ? { ...shareholder, isEditing: false } : shareholder
		);
		setShareholders(updatedShareholders);
	};

  const updateShareholderInfo = async (index: number) => {
		// const shareholder = shareholders[index];
		// if (!shareholder.id) {
		// 	toast.error('Cannot update shareholder without an ID');
		// 	return;
		// }

		try {
			// await updateOwnershipMutate({
			// 	ownership_id: shareholder.id,
			// 	data: {
			// 		shareholder_name: shareholder.shareholder_name,
			// 		no_of_share_in_fiscal_year: shareholder.no_of_share_in_fiscal_year,
			// 		book_value_of_ordinary_share:
			// 			shareholder.book_value_of_ordinary_share,
			// 		dividend_outstanding_amount: shareholder.dividend_outstanding_amount,
			// 	},
			// });
			toast.success('Shareholder information updated successfully');
			toggleEdit(index);
		} catch (error) {
			toast.error('Error updating shareholder information');
			console.error('Update error:', error);
		}
	};

  const deleteShareholderInfo = async (index: number) => {
		const shareholder = shareholders[index];
		if (!shareholder.id) {
			const updatedShareholders = shareholders.filter((_, i) => i !== index);
      setShareholders(updatedShareholders);
			toast.error('Cannot delete shareholder without an ID');
			return;
		}

		try {
			await deleteOwnershipMutate({
				ownership_id: shareholder.id,
				data: {},
			});
			const updatedShareholders = shareholders.filter((_, i) => i !== index);
			setShareholders(updatedShareholders);
			toast.success('Shareholder information deleted successfully');
		} catch (error) {
			toast.error('Error deleting shareholder information');
			console.error('Delete error:', error);
		}
	};

  const handleSubmit = async () => {
		if (!businessId) {
			toast.error('Business ID is not available. Please try again.');
			return;
		}

		const currentDate = new Date().toISOString();

    // const validShareholders = shareholders.filter(shareholder => shareholder.shareholder_name.trim() !== '')
		// 	.map(({isEditing, ...shareholderData}) => ({...shareholderData,}));

    

    // const formattedData = {
		// 	business_id: businessId,
		// 	shareholders: validShareholders.map((shareholder) => ({
		// 		...shareholder,
		// 		created_at: currentDate,
		// 		updated_at: currentDate,
		// 	})),
		// };
		
		const validShareholders = shareholders
    .filter(shareholder => shareholder.shareholder_name.trim() !== '')
    .map(({ isEditing, ...shareholderData }) => ({
      shareholder_name: shareholderData.shareholder_name,
      no_of_share_in_fiscal_year: shareholderData.no_of_share_in_fiscal_year,
      book_value_of_ordinary_share: shareholderData.book_value_of_ordinary_share,
      dividend_outstanding_amount: shareholderData.dividend_outstanding_amount,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));

		if (validShareholders.length === 0) {
			toast.error('Please add at least one shareholder with a name.');
			return;
		}

		try {
			await ownershipMutate([...validShareholders],
				{
					onSuccess() {
						toast.success('Ownership information submitted successfully');
						onNext();		
					}, onError(error, variables, context) {
							toast.error(error.message)
					},
				}
			);
		} catch (error) {
			toast.error('Error submitting ownership information');
		}
	};

  const generateTableOptions = (index: number) => [
		{
			label: shareholders[index].isEditing ? 'Save' : 'Edit',
			action: () =>
				shareholders[index].isEditing
					? updateShareholderInfo(index)
					: toggleEdit(index),
		},
		{
			label: 'Delete',
			action: () => deleteShareholderInfo(index),
		},
	];


	return (
		<>
			<main className="pb-10">
				<h2 className="text-base font-semibold leading-7 text-gray-900">
					Ownership Information
				</h2>
				<p className="mt-1 text-sm leading-6 text-gray-600">
					Shares & Shareholders
				</p>

				<div className="my-5">
					<div className="overflow-x-auto whitespace-nowrap scrollbar-hide border border-foundation-grey-grey-300 rounded-xl">
						<table className="w-[100%] text-[14px]">
							<thead className="w-full">
								<tr className="text-[#374B58] text-[12px] border-[#eaecf0] border-b font-[500] bg-[#F5F5F5]">
									<td className="py-5 px-4">ShareHolder name</td>
									<td className="py-5 px-4">
										Number of Shares in fiscal years
									</td>
									<td className="py-5 px-4">Books Value of Ordinary Shares</td>
									<td className="py-5 px-4">Dividend Outstanding Amount</td>
									<td className="py-5 px-4">Action</td>
								</tr>
							</thead>

							<tbody className="w-full bg-white">
								{shareholders.map((shareholder, index) => (
									<tr
										key={index}
										className="border-[#eaecf0] hover:bg-gray-200 text-[14px] border-b text-[#545A5D]"
									>
										<td className="py-6 px-4">
											{shareholder.isEditing ? (
												<input
													type="text"
													name="shareholder_name"
													value={shareholder.shareholder_name}
													onChange={(e) => handleChange(index, 'shareholder_name', e.target.value)}
													placeholder="Enter A Shareholder name"
													className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
												/>
											) : (
												shareholder.shareholder_name
											)}
										</td>
										<td className="py-6">
											{shareholder.isEditing ? (
												<input
													type="number"
													name="no_of_share_in_fiscal_year"
													value={shareholder.no_of_share_in_fiscal_year}
													onChange={(e) => handleChange(index, 'no_of_share_in_fiscal_year', e.target.value)}
													placeholder="Enter no of shares"
													className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
												/>
											) : (
												shareholder.no_of_share_in_fiscal_year
											)}
										</td>
										<td className="py-6">
											{shareholder.isEditing ? (
												<input
													type="number"
													name="book_value_of_ordinary_share"
													value={shareholder.book_value_of_ordinary_share}
													onChange={(e) => handleChange(index, 'book_value_of_ordinary_share', e.target.value)}
													placeholder="Enter Book Value"
													className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
												/>
											) : (
												shareholder.book_value_of_ordinary_share
											)}
										</td>
										<td className="py-6">
											{shareholder.isEditing ? (
												<input
													type="number"
													name="dividend_outstanding_amount"
													value={shareholder.dividend_outstanding_amount}
													onChange={(e) => handleChange(index, 'dividend_outstanding_amount', e.target.value)}
													placeholder="Enter Dividend amount"
													className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
												/>
											) : (
												shareholder.dividend_outstanding_amount
											)}
										</td>
										<td className="py-6 px-4">
											<TableDropDown options={generateTableOptions(index)} />
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<div className="w-full">
							<p
								className="flex items-center justify-end w-full self-stretch text-[#8133F1] mb-4 mt-4 cursor-pointer px-4"
								onClick={addNewShareholder}
							>
								<Image
									className="mr-2"
									src="/plus.png"
									width={23}
									height={23}
									alt="icon"
								/>{' '}
								Add More Shareholders
							</p>
						</div>
					</div>
				</div>

				{/* <div className="flex gap-5">
					<button
						onClick={clearRecentRow}
						className={
							' text-foundation-purple-purple-400 border-none hover:text-white hover:bg-foundation-purple-purple-100 w-[32%] py-3 cursor-pointer rounded-[16px]'
						}
					>
						Clear field
					</button>
				</div> */}
				<div className="flex justify-between">
					<SubmitButton
						text="Prev"
						onClick={onPrev}
						customPadding="w-20 py-4 mt-5 mb-3"
						actionType="button"
						loading={isPending}
					/>
					<SubmitButton
						text="Next"
						onClick={handleSubmit}
						customPadding="w-20 py-4 mt-5 mb-3"
						actionType="button"
						loading={isPending}
					/>
				</div>
			</main>
		</>
	);
};

export default AdminOwnershipInfo;
