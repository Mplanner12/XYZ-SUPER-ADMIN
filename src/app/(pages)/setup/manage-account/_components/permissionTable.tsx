import React, { useState } from 'react';

interface Feature {
	id: string;
	name: string;
	permissions: {
		view: boolean;
		add: boolean;
		edit: boolean;
		delete: boolean;
		print: boolean;
		share: boolean;
	};
}

const initialFeatures: Feature[] = [
	{
		id: '1',
		name: 'Customer Information',
		permissions: {
			view: false,
			add: false,
			edit: false,
			delete: false,
			print: false,
			share: false,
		},
	},
	{
		id: '2',
		name: 'Customer Categories',
		permissions: {
			view: false,
			add: false,
			edit: false,
			delete: false,
			print: false,
			share: false,
		},
	},
	{
		id: '3',
		name: 'Order Management',
		permissions: {
			view: false,
			add: false,
			edit: false,
			delete: false,
			print: false,
			share: false,
		},
	},
	{
		id: '4',
		name: 'Communication Tracking',
		permissions: {
			view: false,
			add: false,
			edit: false,
			delete: false,
			print: false,
			share: false,
		},
	},
	{
		id: '5',
		name: 'Credit Management',
		permissions: {
			view: false,
			add: false,
			edit: false,
			delete: false,
			print: false,
			share: false,
		},
	},
	{
		id: '6',
		name: 'Sales History',
		permissions: {
			view: false,
			add: false,
			edit: false,
			delete: false,
			print: false,
			share: false,
		},
	},
	{
		id: '7',
		name: 'Quotation and Pricing',
		permissions: {
			view: false,
			add: false,
			edit: false,
			delete: false,
			print: false,
			share: false,
		},
	},
	{
		id: '8',
		name: 'Communication Tracking',
		permissions: {
			view: false,
			add: false,
			edit: false,
			delete: false,
			print: false,
			share: false,
		},
	},
	{
		id: '9',
		name: 'Lead and Opportunity Tracking',
		permissions: {
			view: false,
			add: false,
			edit: false,
			delete: false,
			print: false,
			share: false,
		},
	},
	{
		id: '10',
		name: 'Feedback and Surveys',
		permissions: {
			view: false,
			add: false,
			edit: false,
			delete: false,
			print: false,
			share: false,
		},
	},
	{
		id: '11',
		name: 'Contact Mangement',
		permissions: {
			view: false,
			add: false,
			edit: false,
			delete: false,
			print: false,
			share: false,
		},
	},
	{
		id: '12',
		name: 'Document Management',
		permissions: {
			view: false,
			add: false,
			edit: false,
			delete: false,
			print: false,
			share: false,
		},
	},
	{
		id: '13',
		name: 'Notifications and Alerts',
		permissions: {
			view: false,
			add: false,
			edit: false,
			delete: false,
			print: false,
			share: false,
		},
	},
	{
		id: '14',
		name: 'Reporting and Analytics',
		permissions: {
			view: false,
			add: false,
			edit: false,
			delete: false,
			print: false,
			share: false,
		},
	},
	{
		id: '15',
		name: 'Integration',
		permissions: {
			view: false,
			add: false,
			edit: false,
			delete: false,
			print: false,
			share: false,
		},
	},
];

const PermissionTable: React.FC = () => {
	const [features, setFeatures] = useState<Feature[]>(initialFeatures);

	const handlePermissionChange = (
		featureId: string,
		permission: keyof Feature['permissions']
	) => {
		setFeatures((prevFeatures) =>
			prevFeatures.map((feature) =>
				feature.id === featureId
					? {
							...feature,
							permissions: {
								...feature.permissions,
								[permission]: !feature.permissions[permission],
							},
					  }
					: feature
			)
		);
	};

	const toggleAllPermissions = (featureId: string, value: boolean) => {
		setFeatures((prevFeatures) =>
			prevFeatures.map((feature) =>
				feature.id === featureId
					? {
							...feature,
							permissions: {
								view: value,
								add: value,
								edit: value,
								delete: value,
								print: value,
								share: value,
							},
					  }
					: feature
			)
		);
	};

	return (
		<div className="">
			<table className="min-w-full bg-white border-none text-sm">
				<thead>
					<tr className="bg-gray-100 text-foundation-grey-grey-800 border-none">
						<th className="py-2 text-left font-normal">Features</th>
						<th className="py-2 text-center font-normal">View</th>
						<th className="py-2 text-center font-normal">Add</th>
						<th className="py-2 text-center font-normal">Edit</th>
						<th className="py-2 text-center font-normal">Delete</th>
						<th className="py-2 text-center font-normal">Print</th>
						<th className="py-2 text-center font-normal ">Share</th>
					</tr>
				</thead>
				<tbody>
					{features.map((feature) => (
						<tr key={feature.id} className="hover:bg-gray-50">
							<td className="py-2">
								<div className="flex items-center">
									<input
										type="checkbox"
										id={`feature-${feature.id}`}
										className="mr-1 custom-checkbox"
										checked={Object.values(feature.permissions).some(Boolean)}
										onChange={(e) =>
											toggleAllPermissions(feature.id, e.target.checked)
										}
									/>
									<label htmlFor={`feature-${feature.id}`}>
										{feature.name}
									</label>
								</div>
							</td>
							{(
								Object.keys(feature.permissions) as Array<
									keyof Feature['permissions']
								>
							).map((permission) => (
								<td key={permission} className="py-2 px-4 text-center">
									<input
										type="checkbox"
										className="custom-checkbox"
										checked={feature.permissions[permission]}
										onChange={() =>
											handlePermissionChange(feature.id, permission)
										}
									/>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default PermissionTable;
