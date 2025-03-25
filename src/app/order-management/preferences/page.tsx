"use client"
import HeaderLayout from '@/components/MainLayouts/HeaderLayout'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import NotificationTab from './component/PreferencesTab/NotificationTab/NotificationTab';
import PreferenceTabBar from './component/preferenceTabBar/preferenceTabBar';
import AccountTab from './component/PreferencesTab/Account/AccountTab';
import LanguageTab from './component/PreferencesTab/LanguageTab/LanguageTab';
import ReportAndChartTab from './component/PreferencesTab/ReportAndChartTab/ReportAndChartTab';
import SecurityAndSettings from './component/PreferencesTab/SecurityAndSettings/SecurityAndSettings';
import AppearanceTab from './component/PreferencesTab/AppearanceTab/AppearanceTab';



const page = () => {
    const breadcrumbs = ['Admin Dashboard', 'Order Management'];
    const [activeTab, setActiveTab] = useState('Notifications');
    const [activePage, setActivePage] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const handleUrlChange = () => {
            const tabFromUrl = searchParams.get('tab');
            const pageFromUrl = searchParams.get('page');
            if (tabFromUrl) {
                setActiveTab(tabFromUrl);
            }
            if (pageFromUrl) {
                setActivePage(pageFromUrl);
            } else {
                setActivePage(null);
            }
        };

        handleUrlChange();
        window.addEventListener('popstate', handleUrlChange);

        return () => {
            window.removeEventListener('popstate', handleUrlChange);
        };
    }, [searchParams]);

    const handleTabChange = (tabName: string) => {
        setActiveTab(tabName);
        setActivePage(null);
        router.push(`/order-management/preferences?tab=${encodeURIComponent(tabName)}`);
    };

    return (
        <div>
            <HeaderLayout
                moduleName="Order Management Module"
                page="Preferences"
                breadcrumbs={breadcrumbs}
                moduleLink='/order-management/overview'
            />

            <main>
                <section className="bg-[#FCFCFC] w-full rounded-md flex-grow p-3 md:p-6">
                    <PreferenceTabBar activeTab={activeTab} onTabChange={handleTabChange} />

                    <div className='mt-5 p-3 md:p-6'>
                        {activeTab === 'Notifications' && (
                            <>
                                <NotificationTab />
                            </>
                        )}

                        {activeTab === 'Account' && (
                            <>
                                <AccountTab />
                            </>
                        )}

                        {activeTab === 'Language & Localization' && (
                            <>
                                <LanguageTab />
                            </>
                        )}

                        {activeTab === 'Report & Charts' && (
                            <>
                                <ReportAndChartTab />
                            </>
                        )}

                        {activeTab === 'Security Settings' && (
                            <>
                                <SecurityAndSettings />
                            </>
                        )}
                        {activeTab === 'Appearance' && (
                            <>
                                <AppearanceTab />
                            </>
                        )}
                    </div>
                </section>
            </main>
        </div>
    )
}

export default page