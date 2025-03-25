import React from 'react';

const Notifications = () => {
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		console.log(formData);
	};

	return (
		<div className="flex flex-col gap-4 sm:mt-8 mt-5 text-sm">
			<form onSubmit={handleSubmit}>
				<h3 className="text-xl text-foundation-black-black-400 font-normal">
					Notification Settings
				</h3>
				<div className="flex flex-col gap-4 mt-2">
					<div className="flex gap-2">
						<input
							type="radio"
							id="autoNotification"
							name="notification"
							value="autoNotification"
						/>
						<label htmlFor="radioOption1">
							Automatic notifications for approvers, buyers, or other relevant
							personnel on <br/> Inventory module.
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
				<h3 className="text-xl text-foundation-black-black-400 font-normal mt-4">
					Email & Communications
				</h3>
				<div className="flex flex-col gap-4 mt-2">
					<div className="flex gap-2">
						<input
							type="checkbox"
							id="checkboxOption1"
							name="checkboxOptions"
							value="option1"
						/>
						<label htmlFor="checkboxOption1">
							Receive notifications for product updates, promotions &
							Newsletters
						</label>
					</div>
					<div className="flex gap-2">
						<input
							type="checkbox"
							id="checkboxOption2"
							name="checkboxOptions"
							value="option2"
						/>
						<label htmlFor="checkboxOption2">
							Receive notifications for relevant communications &
							recommendations
						</label>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Notifications;
