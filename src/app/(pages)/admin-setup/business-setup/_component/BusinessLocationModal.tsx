import InputElement from '@/app/(pages)/setup/_setupComponets/Input/InputElement';
import SelectElement from '@/app/(pages)/setup/_setupComponets/Input/SelectElement';
import LocationSelector from '@/components/setup/LocationSelector';
import { businessType } from '@/data/setupData';
import { formDataSchema } from '@/lib/setupSchema';
import { Map, MapIcon } from 'lucide-react';
import React from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

const BusinessLocationModal = () => {
	const { register, handleSubmit } = useForm();
	const methods = useForm();

	const onSubmit = async (data: any) => {
		// Handle form submission
		console.log(data);
	};

	return (
		<FormProvider {...methods}>
			<form action="" onSubmit={methods.handleSubmit(onSubmit)}>
				<div className="flex flex-col px-2 gap-2">
					<InputElement
						id="location_name"
						label="Location Name"
						type="text"
						placeholder="What is the name of the location?"
						registerName="location_name"
						// error={errors.businessLocation?.message}
					/>
					<InputElement
						id="street_address"
						label="Street Address"
						type="text"
						placeholder="What is the address?"
						registerName="street_address"
						// error={errors.businessStreet?.message}
					/>
					<InputElement
						id="postal_code"
						label="Postal Code"
						type="text"
						placeholder="What is the postal code?"
						registerName="postal_code"
						// error={errors.postalCode?.message}
					/>
					<SelectElement
						id="business_state"
						label="State"
						options={businessType}
						registerName="business_state"
						// error={errors.businessState?.message}
					/>
					<SelectElement
						id="business_country"
						label="Country"
						options={businessType}
						registerName="businessCountry"
						// error={errors.businessCountry?.message}
					/>

					<SelectElement
						id="business_segment"
						label="Segment"
						options={businessType}
						registerName="business_segment"
						// error={errors.businessCountry?.message}
					/>

					<SelectElement
						id="preferred_currency"
						label="Preferred Currency"
						options={businessType}
						registerName="preferreed_currency"
						// error={errors.businessSegment?.message}
					/>
					<InputElement
						id="mapLocation"
						label="Location on map"
						type="text"
						placeholder="Select location on map"
						registerName="mapLocation"
						// error={errors.mapLocation?.message}
					/>
					<div className=" w-full">
						<label
							htmlFor="business_location"
							className="w-fit h-fit flex font-inter text-sm font-medium leading-6 text-foundation-grey-grey-800 gap-[1px]"
						>
							Location on map{' '}
						</label>
						<div className="mt-[2px] relative">
							<input
								type="text"
								id="business_location"
								placeholder="Select location on map"
								className="block w-full rounded-md border border-solid py-3 px-3 text-foundation-grey-grey-900 shadow-sm outline-none border-foundation-grey-grey-600 placeholder:text-foundation-grey-grey-600 focus:border-2 focus:border-solid focus:border-foundation-purple-purple-100 focus:bg-foundation-grey-grey-50 sm:text-sm sm:leading-6"
								{...register('business_location')}
							/>
							{/* {errors.businessName?.message && (
								<p className="mt-2 text-sm text-red-400">
									{errors.businessName.message}
								</p>
							)} */}
							<MapIcon
								size={20}
								className="text-foundation-purple-purple-400 absolute top-3.5 right-0 mr-2 "
							/>
						</div>
					</div>

					<button
						type="submit"
						className={`rounded-xl px-4 py-3 text-sm font-semibold shadow-sm border border-solid border-foundation-purple-purple-400 bg-foundation-purple-purple-400 hover:bg-foundation-purple-purple-300 text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer mt-4`}
					>
						Add Location
					</button>
				</div>
				{/* <div className="w-[60%] mt-4 px-2">
					<LocationSelector>
						<MapIcon
							size={20}
							className="text-black absolute top-3.5 right-0 mr-2 "
						/>
					</LocationSelector>
				</div> */}
			</form>
		</FormProvider>
	);
};

export default BusinessLocationModal;
