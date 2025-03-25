import { useState } from 'react';
import FinancialStatementTab from './FinancialStatements';
import ProcedureChecklistTab from './ProcedureChecklist';
import { ChevronRightIcon } from 'lucide-react';




const ClosingProcedureTab: React.FC = () => {
    const [menu, setMenu] = useState<number>(0)

    const menuBar = [
        {
            name: "Closing procedure checklist",
            id: 1
        },
        {
            name: "Auto-Generated  Financial Statements",
            id: 2
        },
    ]
    return (
        <>
            <main>
                {menu === 0 &&
                    <div className="pb-56">
                        <div className='my-3'>
                            <p className='text-xl font-medium'>Closing Procedure</p>
                            <p className='text-[14px] text-[#727171] font-medium'>View auto-generated closing financial statement & manage your company’s closing procedure</p>
                        </div>

                        <div className='text-[#434343] flex gap-5 justify-between mb-4'>
                            <div className="text-xs md:text-sm lg:text-base gap-4 no-scrollbar">
                                {menuBar?.map(({ name, id }: any) => (
                                    <p
                                        key={id}
                                        className={`flex flex-col justify-between text-[16px]`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setMenu(id);
                                        }}
                                    >
                                        <span className="flex gap-1 cursor-pointer items-center mb-[4px]"> {name} <ChevronRightIcon size={"18px"} color="#8133F1" /></span>
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                }
                {menu === 1 && <ProcedureChecklistTab goBack={() => setMenu(0)} />}
                {menu === 2 && <FinancialStatementTab goBack={() => setMenu(0)} />}
            </main>
        </>

    );
};

export default ClosingProcedureTab;
