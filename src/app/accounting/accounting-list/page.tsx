"use client"
import AccountSummary from '@/components/accounting/accountingList/AccountSummary';
import AccountDetails from '@/components/accounting/accountingList/ChartOfAccount';
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import { useState } from 'react';


const AccountingList = () => {
    const [menu, setMenu] = useState('Chart of Accounts Summary')

    const menuBar = [
        {
            name: "Chart of Accounts Summary",
            id: 1
        },
        {
            name: "Chart of Accounts Detailed View",
            id: 2
        },
    ]

    const breadcrumbs = ['Admin Dashboard', 'Accounting Module'];

    return (
        <div className=''>
            <HeaderLayout
                moduleName="Accounting Module"
                moduleLink='/accounting/overview'
                pageLink='/accounting/accounting-list'
                page="Accounting List"
                breadcrumbs={breadcrumbs}
            />
            <div className='px-7 pt-4'>
                <div className='bg-secondary px-5 py-4 rounded-2xl text-[#434343]'>
                    <p className="text-xl font-medium mb-2">Chart Of Account Setup</p>
                    <p className="text-xl mb-1">Account Type</p>
                    <p className="text-[16px] mb-3">
                        Select an account type
                    </p>

                    <div className="border mb-2 border-solid border-primary-normal rounded-[8px] w-fit flex text-xs md:text-sm lg:text-base gap-4 no-scrollbar">
                        {menuBar?.map(({ name, id }: any) => (
                            <p
                                key={id}
                                className={`flex justify-between items-center text-[16px] text-primary-normal px-[8px] py-[5px] cursor-pointer transition flex-shrink-0 ${menu === name ? "bg-primary-normal rounded-[8px] text-white" : ""
                                    }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setMenu(name);
                                }}
                            >
                                {name}
                            </p>
                        ))}
                    </div>

                    <div className="mt-2">
                        <div>{menu === "Chart of Accounts Summary" && <AccountSummary proceed={() => setMenu("Chart of Accounts Detailed View")} />}</div>
                        <div>{menu === "Chart of Accounts Detailed View" && <AccountDetails />}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountingList;
