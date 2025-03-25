import SelectElement from '@/app/(pages)/setup/_setupComponets/Input/SelectElement';
import React from 'react';
import SelectComponent from './SelectComponent';

const LanguageLocal = () => {

    const language = [
        { value: '', label: 'Select Prefered Language' },
        { value: 'english', label: 'English' },
        { value: 'french', label: 'French' },
        { value: 'Spanish', label: 'Spanish' },
    ];

    const country = [
        { value: '', label: 'Select Prefered Language' },
        { value: 'english', label: 'United State of America' },
        { value: 'nigeria', label: 'Nigeria' },
        { value: 'mexico', label: 'Mexico' },
    ];

    const currency = [
        { value: '', label: 'Select Default currency' },
        { value: 'english', label: 'USD' },
        { value: 'nigeria', label: 'NGN' },
        { value: 'mexico', label: 'Peso' },
    ];
  return (
		<div>
			<h2 className="text-xl text-foundation-black-black-400 font-normal mt-9">
				Product Settings
			</h2>
			<form action="">
				<div className="flex flex-col gap-4 sm:w-[40%] w-full">
					<SelectComponent
						id="language"
						label="Select a preferred language"
						options={language}
						// error={errors.filingInformation?.message}
					/>
					<SelectComponent
						id="country"
						label="Select country"
						options={country}
						// error={errors.filingInformation?.message}
					/>

					<SelectComponent
						id="currency"
						label="Select currency"
						options={currency}
						// error={errors.filingInformation?.message}
					/>
				</div>
			</form>
		</div>
	);
}

export default LanguageLocal