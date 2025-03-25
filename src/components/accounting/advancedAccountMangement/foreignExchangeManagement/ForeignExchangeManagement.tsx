import { useState } from 'react';
import TransactionManagementTab from './TransactionManagement';
import BalanceManagementTab from './BalanceManagement';





const ForeignExchangeManagement: React.FC = () => {
    const [menu, setMenu] = useState<number>(0)

    const menuBar = [
        {
            name: "Foreign Exchange Transactions Management",
            id: 0
        },
        {
            name: "Foreign Exchange Balance Management",
            id: 1
        },
    ]
    return (
        <>
            <main>
                <div className='flex justify-between my-3'>
                    <p className='text-xl font-medium'>Foreign Exchange Management</p>
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

                {menu === 0 && <TransactionManagementTab />}
                {menu === 1 && <BalanceManagementTab />}
            </main>
        </>

    );
};

export default ForeignExchangeManagement;
