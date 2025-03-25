"use client"
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import APIIntegration from '@/components/accounting/preferences/APIIntegration';
import AccountSettings from '@/components/accounting/preferences/AccountSettings';
import Appearance from '@/components/accounting/preferences/Appearance';
import LanguageTab from '@/components/accounting/preferences/LanguageSettings';
import NotificationTab from '@/components/accounting/preferences/Notifications';
import ReportAndChartTab from '@/components/accounting/preferences/ReportAndChart';
import SecuritySettings from '@/components/accounting/preferences/SecuritySettings';
import { useState } from 'react';



const Preferences = () => {
    const [activeTab, setActiveTab] = useState<number>(0);

    const tabs = [
        "Notifications",
        "Account Settings",
        "Language & Localization",
        "Report & Charts",
        "Security Settings",
        "Appearance",
        "API Integration",
    ];

    const breadcrumbs = ['Admin Dashboard', 'Accounting Module'];

    return (
        <div className=''>
            <HeaderLayout
                moduleName="Accounting Module"
                page="Advanced Account Management"
                breadcrumbs={breadcrumbs}
            />
            <div className='px-7 pt-4'>
                <div className='bg-secondary px-5 pt-4 pb-16 rounded-2xl text-[#434343]'>
                    <div className='overflow-x-auto no-scrollbar mb-7'>
                        <div className='bg-[#8133F1] p-2 flex justify-between min-w-[280%] md:min-w-[128%] lg:min-w-full rounded-xl'>
                            {tabs.map((tab, index) => (
                                <p
                                    key={index}
                                    onClick={() => setActiveTab(index)}
                                    className={`px-2 py-2 rounded-xl transition-colors duration-300 cursor-pointer ${activeTab === index
                                        ? "bg-white text-[#8133F1]"
                                        : "text-white"
                                        }`}
                                >
                                    {tab}
                                </p>
                            ))}
                        </div>
                    </div>

                    {activeTab === 0 && <NotificationTab />}
                    {activeTab === 1 && <AccountSettings />}
                    {activeTab === 2 && <LanguageTab />}
                    {activeTab === 3 && <ReportAndChartTab />}
                    {activeTab === 4 && <SecuritySettings />}
                    {activeTab === 5 && <Appearance />}
                    {activeTab === 6 && <APIIntegration />}
                </div>
            </div>
        </div>
    )
}

export default Preferences;