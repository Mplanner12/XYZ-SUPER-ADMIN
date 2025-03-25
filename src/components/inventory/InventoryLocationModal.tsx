import InputElement from '@/app/(pages)/setup/_setupComponets/Input/InputElement';
import SelectElement from '@/app/(pages)/setup/_setupComponets/Input/SelectElement';
import { businessType } from '@/data/setupData';
import { formDataSchema } from '@/lib/setupSchema';
import React from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';


const InventoryLocationModal = () => {
  const { register, handleSubmit } = useForm();
  const methods = useForm();
  
  const onSubmit = async (data : any) => {
		// Handle form submission
    console.log(data)
	};
    
  return (
		<FormProvider {...methods}>
			<form action="" onSubmit={methods.handleSubmit(onSubmit)}>
				<div className="flex flex-col px-2 gap-2">
					<InputElement
						id="warehouseName"
						label="Warehouse Name"
						type="text"
						placeholder="What is the name of the Sales outlet"
						registerName="warehouseName"
						// error={errors.businessLocation?.message}
					/>
					<InputElement
						id="warehouseAddress"
						label="Street Address"
						type="text"
						placeholder="What is the address?"
						registerName="warehouseAddress"
						// error={errors.businessStreet?.message}
					/>
					<InputElement
						id="postalCode"
						label="Postal Code"
						type="text"
						placeholder="What is the postal code?"
						registerName="postalCode"
						// error={errors.postalCode?.message}
					/>
					<SelectElement
						id="businessState"
						label="State"
						options={businessType}
						registerName="businessState"
						// error={errors.businessState?.message}
					/>
					<SelectElement
						id="businessCountry"
						label="Country"
						options={businessType}
						registerName="businessCountry"
						// error={errors.businessCountry?.message}
					/>

					<SelectElement
						id="storageCapacity"
						label="Storage Capacity (M^3)"
						options={businessType}
						registerName="storageCapacity"
						// error={errors.businessSegment?.message}
					/>
					<InputElement
						id="storageZone"
						label="Storage Zone"
						type="text"
						placeholder="What is the storage zone?"
						registerName="storageZone"
						// error={errors.postalCode?.message}
					/>
					{/* <InputElement
						id="mapLocation"
						label="Location on map"
						type="text"
						placeholder="Select location on map"
						registerName="mapLocation"
						// error={errors.mapLocation?.message}
					/> */}
				</div>
			</form>
		</FormProvider>
	);
}

export default InventoryLocationModal