"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import ApprovedJournalTab from '@/components/accounting/accountManagement/ApprovedJournal';
import CashFlowStatementTab from '@/components/accounting/accountManagement/CashFlowStatement';
import ChangesInEquityTab from '@/components/accounting/accountManagement/ChangesInEquity';
import FinancialPositionTab from '@/components/accounting/accountManagement/FinancialPosition';
import GeneralJournalTab from '@/components/accounting/accountManagement/GeneralJournal';
import GeneralLedgerTab from '@/components/accounting/accountManagement/GeneralLedger';
import IncomeStatementTab from '@/components/accounting/accountManagement/IncomeStatement';
import PendingJournalTab from '@/components/accounting/accountManagement/PendingJournal';
import RatiosAndMetricsTab from '@/components/accounting/accountManagement/RatiosAndMetrics';
import TrialBalanceTab from '@/components/accounting/accountManagement/TrialBalance';

const ReceivablesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Read activeTab from URL or default to 0
  const [activeTab, setActiveTab] = useState<number>(
    parseInt(searchParams.get('tab') || '0', 10)
  );

  const tabs = [
    "General Journal",
    "Pending Journal Entries",
    "Approved Journal Entries",
    "General Ledger",
    "Trial Balance",
    "Income Statement",
    "Financial Position",
    "Cash Flow Statement",
    "Changes in Equity",
    "Ratios & Metrics"
  ];

  const breadcrumbs = ['Admin Dashboard', 'Accounting Module'];

  useEffect(() => {
    router.push(`?tab=${activeTab}`, { shallow: false } as any);
}, [activeTab, router]);

  return (
    <div>
      <HeaderLayout
        moduleName="Accounting Module"
        page="Account Management"
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
                  className={`px-2 py-2 rounded-xl transition-colors duration-300 cursor-pointer ${
                    activeTab === index
                      ? "bg-white text-[#8133F1]"
                      : "text-white"
                  }`}
                >
                  {tab}
                </p>
              ))}
            </div>
          </div>

          {activeTab === 0 && <GeneralJournalTab />}
          {activeTab === 1 && <PendingJournalTab />}
          {activeTab === 2 && <ApprovedJournalTab />}
          {activeTab === 3 && <GeneralLedgerTab />}
          {activeTab === 4 && <TrialBalanceTab />}
          {activeTab === 5 && <IncomeStatementTab />}
          {activeTab === 6 && <FinancialPositionTab />}
          {activeTab === 7 && <CashFlowStatementTab />}
          {activeTab === 8 && <ChangesInEquityTab />}
          {activeTab === 9 && <RatiosAndMetricsTab />}
        </div>
      </div>
    </div>
  );
};

export default ReceivablesPage;
