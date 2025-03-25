import { ChevronLeftIcon } from 'lucide-react';
import TableDropDown from '../../shared/TableDropDown/TableDropDown';

interface ProcedureChecklistTabProps {
    goBack: () => void; 
}

const ProcedureChecklistTab: React.FC<ProcedureChecklistTabProps> = ({goBack}) => {

    const generateTscTableOptions = [
        { label: 'View Details' },
        { label: 'Edit' },
        { label: 'Delete' },
    ];

    return (
        <>
            <main>
            <div className='my-3'>
                    <p onClick={goBack} className='text-xl cursor-pointer mb-1 flex items-center font-medium'>
                        <ChevronLeftIcon size={"18px"} color="#8133F1"/>
                       <span> Closing Procedure Checklist</span>
                   </p>
                    <p className='text-[14px] text-[#727171] font-medium'>Customize auto-generated financial statements & manage schedule for auto-generation of the checklist</p>
                </div>
                <p className='text-[17px] mb-1 font-medium'>
                       <span>Checklist</span>
                   </p>
                   <p className='text-[14px] text-[#727171] font-medium'>
                   Select tasks to automate at the closing period of the year
                </p>

                <div className='my-5'>
                    <div className='overflow-x-auto scrollbar-hide'>
                        <table className="w-[280%] md:w-[128%] lg:w-full text-[14px]">
                            <thead className="w-full">
                                <tr className="text-[#374B58] text-[12px] border-[#eaecf0]  border-b  font-[500] bg-[#F5F5F5]">
                                    <td className="py-5 w-[11%] pl-5 gap-2 items-center">
                                        Frequency
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        Phase
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        Activity
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        Responsible Party
                                    </td>
                                    <td className="py-5 pl-5 gap-2 items-center">
                                        Deadline
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        Actions
                                    </td>
                                </tr>
                            </thead>

                            <tbody className="w-full bg-white">
                                <tr className=" border-[#eaecf0] hover:bg-gray-200 text-[14px] border-b text-[#545A5D]">
                                    <td className="py-6 pl-5 text-left">
                                        IFRS1
                                    </td>
                                    <td className="py-6  text-left">
                                       Accounting team
                                    </td>
                                    <td className="py-6  text-left">
                                        Develop a transition plan
                                    </td>
                                    <td className="py-6  text-left">
                                        All entities adopting IFRS
                                    </td>
                                    <td className="py-6 pl-5 text-left">
                                        No longer applicable
                                    </td>
                                    <td className="py-6  text-left">
                                       <TableDropDown options={generateTscTableOptions} />
                                    </td>
                                </tr>
                                <tr className=" border-[#eaecf0] hover:bg-gray-200 text-[14px] border-b text-[#545A5D]">
                                    <td className="py-6 pl-5 text-left">
                                        IFRS1
                                    </td>
                                    <td className="py-6  text-left">
                                       Accounting team
                                    </td>
                                    <td className="py-6  text-left">
                                        Develop a transition plan
                                    </td>
                                    <td className="py-6  text-left">
                                        All entities adopting IFRS
                                    </td>
                                    <td className="py-6 pl-5 text-left">
                                        No longer applicable
                                    </td>
                                    <td className="py-6  text-left">
                                       <TableDropDown options={generateTscTableOptions} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>

    );
};

export default ProcedureChecklistTab;
