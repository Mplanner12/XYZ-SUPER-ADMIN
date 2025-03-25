"use client"
7
import AccountSettings from '@/components/inventory/preference/AccountSettings';
import Apperance from '@/components/inventory/preference/Apperance';
import LanguageLocal from '@/components/inventory/preference/LanguageLocal';
import Notifications from '@/components/inventory/preference/Notifications';
import ProductSettings from '@/components/inventory/preference/ProductSettings';
import ReportCharts from '@/components/inventory/preference/ReportCharts';
import SecuritySettings from '@/components/inventory/preference/SecuritySettings';
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import React, { useState } from 'react';

const Preference = () => {
	const [activeTab, setActiveTab] = useState<number>(0);

	const tabs = [
		'Notifications',
		'Account',
		'Product Settings',
		'Language & Localization',
        'Report & Charts',
        'Security Settings',
        'Apperance',
	];

    const breadcrumbs = ['Admin Dashboard', 'Inventory Module'];

	return (
		<div>
			<HeaderLayout
				moduleName="Inventory Module"
				moduleLink="/inventory/overview"
				page="Preference"
				pageLink="/inventory/preferences"
				breadcrumbs={breadcrumbs}
			/>

			<div className="sm:px-7 px-2 pt-4">
				<div className="bg-secondary px-5 py-4 rounded-2xl text-[#434343]">
					<div className="overflow-x-auto no-scrollbar">
						<div className="bg-[#8133F1] p-2 py-4 flex justify-between min-w-[100%] rounded-xl">
							{tabs.map((tab, index) => (
								<p
									key={index}
									onClick={() => setActiveTab(index)}
									className={`pl-3 pr-3 py-2 rounded-md transition-colors duration-300 cursor-pointer ${
										activeTab === index
											? 'bg-white text-[#8133F1]'
											: 'text-white'
									}`}
								>
									{tab}
								</p>
							))}
						</div>
					</div>

					{activeTab === 0 && <Notifications />}
					{activeTab === 1 && <AccountSettings />}
					{activeTab === 2 && <ProductSettings />}
					{activeTab === 3 && <LanguageLocal />}
					{activeTab === 4 && <ReportCharts />}
					{activeTab === 5 && <SecuritySettings />}
					{activeTab === 6 && <Apperance />}
				</div>
			</div>
		</div>
	);
};

export default Preference;