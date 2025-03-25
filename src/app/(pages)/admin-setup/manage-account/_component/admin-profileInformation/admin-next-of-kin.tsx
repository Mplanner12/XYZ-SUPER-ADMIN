import { PricePaymentSchema } from '@/lib/pricePaymentSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaAsterisk } from 'react-icons/fa';
import { z } from 'zod';
import InputElement from '@/app/(pages)/setup/_setupComponets/Input/InputElement';

type Inputs = z.infer<typeof PricePaymentSchema>;

interface NextOfKinProps {
	handleTabSwitch: (tab: string) => void;
}

const AdminNextOfKin: React.FC<NextOfKinProps> = ({ handleTabSwitch }) => {

	const [nextTab, setNextTab] = useState('more-profile-info');

	const methods = useForm<Inputs>({
		resolver: zodResolver(PricePaymentSchema),
	});

	const {
		register,
		handleSubmit,
		watch,
		reset,
		trigger,
		formState: { errors },
	} = methods;

	const processForm: SubmitHandler<Inputs> = (data) => {
		console.log(data);
		reset();
	};

	return (
		<form action="">
			<div className="md:w-[80%] w-full">
				<h2 className="text-base font-semibold leading-7 text-foundation-black-black-400 my-0 mt-1">
					Next of Kin Details
				</h2>
				<p className="text-sm font-normal text-foundation-black-black-400 my-0 mt-2">
					Enter the necessary details for your Next of Kin
				</p>
				<div className="mt-5 flex flex-col gap-y-4">
					<div className="flex md:flex-row flex-col w-full gap-10">
						<InputElement
							id="nameOfKin"
							label="Name of Next of Kin"
							type="text"
							required
							placeholder="What is the name of your Next of Kin?"
							registerName="nameOfKin"
							// error={errors.legalConsultantName?.message}
						/>
						<InputElement
							id="kinRelationship"
							label="Relationship"
							type="text"
							placeholder="What is your relationship with this person"
							registerName="kinRelationship"
							// error={errors.contactPerson?.message}
						/>
					</div>
					{/* Email Adddress and gender*/}
					<div className="flex md:flex-row flex-col w-full gap-10">
						<InputElement
							id="kinPermanentAddress"
							label="Address of Next of Kin"
							required
							type="text"
							placeholder="Enter your Permananet Address"
							registerName="kinPermanentAddress"
							// error={errors.auditorAddress?.message}
						/>
					</div>

					{/* Phone number and emergency number  */}

					<div className="flex md:flex-row flex-col w-full gap-10">
						<InputElement
							id="kinEmail"
							label="Email Address"
							type="text"
							placeholder="What is your Next of Kin email address"
							registerName="kinEmail"
							// error={errors.legalConsultantName?.message}
						/>
						<InputElement
							id="kinPhoneNumber"
							label="Phone Number"
							type="text"
							required
							placeholder="Enter Your Next of Kin phone number"
							registerName="kinPhoneNumber"
							// error={errors.contactPerson?.message}
						/>
					</div>
				</div>

				<div className="flex justify-between mt-5">
					<button
						type="button"
						onClick={() => handleTabSwitch('more-profile-info')}
						className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-foundation-purple-purple-500 shadow-sm border-solid border-foundation-purple-purple-500 border-2 hover:bg-foundation-purple-purple-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
					>
						Prev
					</button>
					<button
						type="submit"
						className={`rounded-xl px-4 py-3 text-sm font-semibold shadow-sm border border-solid border-foundation-purple-purple-400 bg-foundation-purple-purple-400 hover:bg-foundation-purple-purple-300 text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer`}
					>
						Save & Proceed
					</button>
				</div>
			</div>
		</form>
	);
};

export default AdminNextOfKin;