import SelectElement from '@/app/(pages)/setup/_setupComponets/Input/SelectElement';
import React from 'react';
import SelectComponent from './SelectComponent';

const SecuritySettings = () => {

    const sessionDuration = [
        { value: '', label: 'Select duration for login validity' },
        { value: '30min', label: '30min' },
        { value: '1', label: '1hr' },
        { value: '6', label: '6hr' },
    ];
  return (
		<div className="flex flex-col gap-4 sm:mt-8 mt-5 text-sm">
			<form action="">
				<h3 className="text-xl text-foundation-black-black-400 font-normal">
					Notification Settings
				</h3>
				<div className="flex flex-col gap-2 mt-2">
					<div className="flex gap-2">
						<input
							type="radio"
							id="autoNotification"
							name="notification"
							value="autoNotification"
						/>
						<label htmlFor="radioOption1">
							Automatic notifications for approvers, buyers, or other relevant
							personnel on Inventory module.
						</label>
					</div>
					<div className="flex gap-2">
						<input
							type="radio"
							id="noNotification"
							name="notification"
							value="noNotification"
						/>
						<label htmlFor="noNotification">{'Don’t send notifications'}</label>
					</div>
				</div>

				<div className='text-xl mt-4 sm:w-[40%] w-full'>
					<SelectComponent
						id="loginSession"
						label="Login Session Expiration"
						options={sessionDuration}
						// error={errors.filingInformation?.message}
					/>
				</div>
			</form>
		</div>
	);
}

export default SecuritySettings