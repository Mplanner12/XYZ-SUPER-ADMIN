import { useState } from 'react';
import FinancialRecordsTab from './FinancialRecords';
import NonFinancialRecordsTab from './NonFinancialRecords';




const FixedAssetManagementTab: React.FC = () => {
    const [menu, setMenu] = useState<number>(0)

    const menuBar = [
        {
            name: "Fixed Financial Records",
            id: 0
        },
        {
            name: "Asset non-financial record",
            id: 1
        },
    ]

    return (
        <>
            <main>
                <div className='flex justify-between my-3'>
                    <p className='text-xl font-medium'>Fixed Asset Management</p>
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

                {menu === 0 && <FinancialRecordsTab />}
                {menu === 1 && <NonFinancialRecordsTab />}

            </main>
        </>

    );
};

export default FixedAssetManagementTab;
