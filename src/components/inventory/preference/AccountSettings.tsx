import React, { useState } from 'react';
import { AiOutlineCalculator } from 'react-icons/ai';
import { CiWallet } from 'react-icons/ci';
import ValuationMethod from './ValuationMethod';

const AccountSettings = () => {
    const [menu, setMenu] = useState('Pending Enteries')
    const [selectedTab, setSelectedTab] = useState("account-settings");

    const handleTabChange = (tab: string) => {
        setSelectedTab(tab);
    };

    const sections = [
        {
        title: 'Valuation Method',
        description: 'Switch your business valuation method',
        icon: <AiOutlineCalculator />,
        },
        {
        title: 'Inventory Adjustment Accounts',
        description: 'Switch your chart of accounts for inventory adjustment',
        icon: <CiWallet />,
        },
    ];
  return (
		<div>
			{selectedTab === 'account-settings' && (
				<main>
					<div className="text-foundation-black-black-400 sm:mt-8 mt-5">
						<h2 className="text-xl text-foundation-black-black-400 font-normal">
							Account Settings
						</h2>
						<div className="mt-4 flex flex-col gap-4 text-base cursor-pointer">
							{sections.map((section, index) => (
								<div
									key={index}
									className="flex gap-6 items-center hover:text-foundation-purple-purple-400"
									onClick={() => handleTabChange('valuation-method')}
								>
									{section.icon}
									<div className="flex flex-col gap-[4px]">
										<h3 className="text-base font-medium">{section.title}</h3>
										<p className="text-sm font-normal">{section.description}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</main>
			)}
			<div>
				{selectedTab === 'valuation-method' && (
					<ValuationMethod handleTabChange={handleTabChange} />
				)}
			</div>
		</div>
	);
}

export default AccountSettings