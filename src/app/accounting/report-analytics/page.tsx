"use client";
import BalanceStatement from '@/components/accounting/reportAnalytics/BalanceSheet';
import CashFlowStatement from '@/components/accounting/reportAnalytics/CashFlowStatement';
import EquityStatement from '@/components/accounting/reportAnalytics/EquityStatement';
import FinancialRatios from '@/components/accounting/reportAnalytics/FinancialRatios';
import IncomeStatement from '@/components/accounting/reportAnalytics/IncomeStatement';
import ProfitLossSegment from '@/components/accounting/reportAnalytics/ProfitLossSegment';
import TrialBalance from '@/components/accounting/reportAnalytics/TrialBalance';
import SelectDropDown from '@/components/accounting/shared/SelectDropDown/SelectDropDown';
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import { reportAnalysisMenu } from '@/data/dropDownOption';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';


const ReportAnalytics = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [openFilter, setOpenFilter] = useState<string | null>(null);
    const [selectedTab, setSelectedTab] = useState<string | null>(null);

    useEffect(() => {
        const tab = searchParams.get("tab");
        if (tab) {
            setSelectedTab(tab);
        } else {
            setSelectedTab(null);
        }
    }, [searchParams]);

    const handleToggle = (filterName: string) => {
        setOpenFilter(openFilter === filterName ? null : filterName);
    };

    const handleDropDownSelect = (selectedOption: string) => {
        let newTab = "";
        switch (selectedOption) {
            case "Balance Sheet":
                newTab = "balance-sheet";
                break;
            case "Income Statement":
                newTab = "income-statement";
                break;
            case "Cash Flow Statement":
                newTab = "cash-flow-statement";
                break;
            case "Trial Balance":
                newTab = "trial-balance";
                break;
            case "Equity Statement":
                newTab = "equity-statement";
                break;
            case "Financial Ratios":
                newTab = "financial-ratios";
                break;
            case "Profit & Loss by Segment":
                newTab = "profit-loss-segment";
                break;
            default:
                newTab = "";
        }
        router.push(`/accounting/report-analytics?tab=${newTab}`, { scroll: false });
    };

    const breadcrumbs = ['Admin Dashboard', 'Accounting Module'];

    const renderSelectedTab = () => {
        switch (selectedTab) {
            case "balance-sheet":
                return <BalanceStatement />;
            case "income-statement":
                return <IncomeStatement />;
            case "cash-flow-statement":
                return <CashFlowStatement />;
            case "trial-balance":
                return <TrialBalance />;
            case "equity-statement":
                return <EquityStatement />;
            case "financial-ratios":
                return <FinancialRatios />;
            case "profit-loss-segment":
                return <ProfitLossSegment />;
            default:
                return null;
        }
    };

    return (
        <div className=''>
            <HeaderLayout
                moduleName="Accounting Module"
                page="Report & Analytics"
                breadcrumbs={breadcrumbs}
            />
            <div className='px-7 py-4'>
                <div className='bg-secondary px-5 py-4 rounded-2xl text-[#434343]'>
                    <SelectDropDown
                        textSize={22}
                        textColor="#8133F1"
                        zIndex={20}
                        menuWidth={16.5}
                        maxHeight={300}
                        label="Select a Report Type"
                        options={reportAnalysisMenu}
                        onSelect={handleDropDownSelect}
                        isOpen={openFilter === "menu"}
                        onToggle={() => handleToggle("menu")}
                    />
                    
                    {!selectedTab && (
                        <div className="mt-3">
                            <button
                                onClick={() => handleToggle("menu")}
                                type="button"
                                className="bg-foundation-purple-purple-400 border-none hover:bg-foundation-purple-purple-100 w-[32%] py-3 cursor-pointer text-foundation-white-white-400 rounded-[16px]"
                            >
                                Proceed
                            </button>
                        </div>
                    )}
                    <div className="mt-1">
                        {renderSelectedTab()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportAnalytics;