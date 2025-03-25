import { useState } from 'react';
import TaxPayableTab from './TaxPayable';
import TaxReceivableTab from './TaxReceivable';
import CapitalGainTab from './CapitalGainTax';



const TaxManagementTab: React.FC = () => {
    const [menu, setMenu] = useState<number>(0)

    const menuBar = [
        {
            name: "Tax Payable",
            id: 0
        },
        {
            name: "Tax Receivable",
            id: 1
        },
        {
            name: "Capital Gain Tax",
            id: 2
        },
        {
            name: "Capital Allowance Calculation",
            id: 3
        },
        {
            name: "Income Tax Computation",
            id: 4
        },
    ]
    return (
        <>
            <main>
                <div className='flex justify-between my-3'>
                    <p className='text-xl font-medium'>Tax Management</p>
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

                {menu === 0 && <TaxPayableTab />}
                {menu === 1 && <TaxReceivableTab />}
                {menu === 2 && <CapitalGainTab />}
                {menu === 3 && <CapitalGainTab />}
                {menu === 4 && <CapitalGainTab />}
            </main>
        </>

    );
};

export default TaxManagementTab;
