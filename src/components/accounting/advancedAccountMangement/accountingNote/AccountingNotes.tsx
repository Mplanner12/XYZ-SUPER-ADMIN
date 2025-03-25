import { useState } from 'react';
import AccountingStandardsTab from './AccountingStandards';
import FinancialSupportTab from './FinancialSupport';
import IncidentReportTab from './IncidentReport';



const AccountingNotesTab: React.FC = () => {
    const [menu, setMenu] = useState<number>(0)

    const menuBar = [
        {
            name: "Accounting Standards & Policies",
            id: 0
        },
        {
            name: "Incident Report and Notes Log",
            id: 1
        },
        {
            name: "Financial Supporting Document",
            id: 2
        },
    ]

    return (
        <>
            <main>
                <div className='flex justify-between my-3'>
                    <p className='text-xl font-medium'>Accounting Notes</p>
                </div>

                <div className='text-[#8133F1] flex gap-5 justify-between mb-4'>
                    <div className="border border-solid border-primary-normal rounded-[8px] w-fit flex text-xs md:text-sm lg:text-base gap-4 no-scrollbar">
                        {menuBar?.map(({ name, id }: any) => (
                            <p
                                key={id}
                                className={`flex justify-between items-center text-[16px] text-primary-normal px-[8px] py-[5px] cursor-pointer transition flex-shrink-0 ${menu === id ? "bg-primary-normal rounded-[8px] text-white" : ""
                                    }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setMenu(id);
                                }}
                            >
                                {name}
                            </p>
                        ))}
                    </div>
                </div>

                {menu === 0 && <AccountingStandardsTab />}
                {menu === 1 && <IncidentReportTab />}
                {menu === 2 && <FinancialSupportTab />}

            </main>
        </>

    );
};

export default AccountingNotesTab;
