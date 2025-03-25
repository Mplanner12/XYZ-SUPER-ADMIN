"use client"
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import AccountingNotesTab from '@/components/accounting/advancedAccountMangement/accountingNote/AccountingNotes';
import ClosingProcedureTab from '@/components/accounting/advancedAccountMangement/closingProceedures/ClosingProceedures';
import FixedAssetManagementTab from '@/components/accounting/advancedAccountMangement/fixedAssetMangement/FixedAssetManagement';
import ForeignExchangeManagement from '@/components/accounting/advancedAccountMangement/foreignExchangeManagement/ForeignExchangeManagement';
import RelatedPartiesTransaction from '@/components/accounting/advancedAccountMangement/relatedPartiesTransaction/RelatedPartiesTransaction';
import TaxManagementTab from '@/components/accounting/advancedAccountMangement/taxManagement/TaxManagement';
import { useState } from 'react';



const ReceivablesPage = () => {

    const [activeTab, setActiveTab] = useState<number>(0);

    const tabs = [
        "Accounting Notes",
        "Fixed Asset Management",
        "Tax Management",
        "Foreign Exchange Management",
        "Related Parties Transactions",
        "Closing Procedure",
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
                <div className='bg-secondary px-5 py-4 rounded-2xl text-[#434343]'>
                    <div className='overflow-x-auto no-scrollbar'>
                        <div className='bg-[#8133F1] p-2 flex justify-between min-w-[280%] md:min-w-[128%] lg:min-w-full rounded-xl'>
                            {tabs.map((tab, index) => (
                                <p
                                    key={index}
                                    onClick={() => setActiveTab(index)}
                                    className={`px-2 py-2 w-[15%] rounded-xl transition-colors duration-300 cursor-pointer ${activeTab === index
                                        ? "bg-white text-[#8133F1]"
                                        : "text-white"
                                        }`}
                                >
                                    {tab}
                                </p>
                            ))}
                        </div>
                    </div>

                    {activeTab === 0 && <AccountingNotesTab />}
                    {activeTab === 1 && <FixedAssetManagementTab />}
                    {activeTab === 2 && <TaxManagementTab />}
                    {activeTab === 3 && <ForeignExchangeManagement />}
                    {activeTab === 4 && <RelatedPartiesTransaction />}
                    {activeTab === 5 && <ClosingProcedureTab />}
                </div>
            </div>
        </div>
    )
}

export default ReceivablesPage 