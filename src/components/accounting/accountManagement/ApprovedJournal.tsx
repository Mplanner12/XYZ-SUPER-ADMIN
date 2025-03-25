import { useGetApprovedGeneralJournal } from '@/app/accounting/hooks/query';
import CustomCheckbox from '@/components/reusable/CustomCheckbox';
import LoadingOverlay from '@/components/reusable/LoadingOverlay';
import { formatDateMonthAndYear } from '@/helpers/config';
import { useModal } from '@/util/Modals/ModalsContext';
import { ArrowUpNarrowWideIcon, ChevronDownIcon, ListFilterIcon, MessageSquareIcon, RotateCwIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import TableDropDown from "../shared/TableDropDown/TableDropDown";
import ApprovedJournalDetails from './ApprovedJournalDetails';
import DeleteApproveModal from './DeleteApprovedJournal';


const ApprovedJournalTab: React.FC = () => {
    const [selectedId, setSelectedId] = useState<string | undefined>("");
    const [selectedTab, setSelectedTab] = useState("approved-journal");
    const { openModal, closeModal } = useModal();
    const { data, isFetching } = useGetApprovedGeneralJournal();
    const journals = data?.data || [];

    const handleTabChange = (tab: string) => {
        setSelectedTab(tab);
    };

    const handleOpenDeleteModal = (id: string) => {
        openModal(<DeleteApproveModal id={id} text={"Are you sure you want to delete this entries?"} />)
    } 

    const handleViewDetails = (id: string) => {
        setSelectedId(id);
        handleTabChange("Journal-details");
    };

    const generateTableOptions = (id: string) => [
        { label: "View Details", action: () => handleViewDetails(id) },
        { label: "Delete", action: () => handleOpenDeleteModal(id) },
    ];

    if (isFetching) {
        return <LoadingOverlay />;
    }
    return (
        <>
            {selectedTab === "approved-journal" &&
                <main>
                    <div className='flex justify-between my-3'>
                        <p className='text-xl font-medium'>Approved Journal Entries ({journals?.length})</p>
                        <div className='text-[15px]'>
                            <div className='text-[#8133F1] flex gap-2 justify-between mb-3'>
                                <button className='flex gap-1'>Download <Image className="ml-2" src="/download.png" width={20} height={20} alt="icon" /></button>
                                <button className='flex gap-1'>Print  <Image className="ml-2" src="/print.png" width={18} height={18} alt="icon" /></button>
                                <button className='flex gap-1'>Share  <Image className="ml-2" src="/share.png" width={18} height={18} alt="icon" /></button>
                                <button className='flex gap-1'>Customize  <Image className="ml-2" src="/customize.png" width={20} height={20} alt="icon" /></button>
                            </div>
                            <div className='text-[#8133F1] flex gap-2 justify-end'>
                                <button className='flex gap-1'>Refresh <RotateCwIcon size="16px" /></button>
                                <button className='flex gap-1'>Comment <MessageSquareIcon size="16px" /></button>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end text-[15px]'>

                    </div>

                    <div className='mb-4'>
                        <div className="relative w-[50%] lg:w-[40%] mb-4 md:mb-0">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Search for journal type or name"
                                    size={70}
                                    className={
                                        "block w-full rounded-[6px] border-0 h-[3.2rem] py-1.5 pr-2 pl-9 text-[16px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-[#8133F1] focus:ring-2 placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                    }
                                />
                                <span>
                                    <FiSearch className="text-[22px] absolute left-2 top-[.9rem] text-[#66686B]" />
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='text-[#8133F1] flex gap-5 justify-between text-[15px]'>
                        <div className='flex gap-3'>
                            <button className='flex gap-1'>Filter <ListFilterIcon size="17px" /></button>
                            <button className='flex gap-1'>Sort <ArrowUpNarrowWideIcon size="17px" /></button>
                        </div>
                        <div className='flex gap-3'>
                            <button className='flex gap-1'> Showing all Column <ChevronDownIcon size="17px" /></button>
                            <button className='flex gap-1'>
                                Minimize Table
                                <Image className="mr-1" src="/resizeicon.svg" width={21} height={21} alt="icon" />
                            </button>
                        </div>
                    </div>

                    <div className='my-5'>
                        <div className='overflow-x-auto overflow-y-hidden scrollbar-hide'>
                            <table className="min-w-[280%] md:min-w-[128%] lg:min-w-full text-[14px]">
                                <thead className="w-full">
                                    <tr className="text-[#374B58] text-[12px] border-[#eaecf0]  border-b  font-[500] bg-[#F5F5F5]">
                                        <td className="py-5 pl-5 gap-2 items-center">
                                            Date
                                        </td>
                                        <td className="py-5 gap-2 items-center">
                                            Entry ID
                                        </td>
                                        <td className="py-5 gap-2 items-center">
                                            Journal Type
                                        </td>
                                        <td className="py-5 gap-2 items-center">
                                            Posted By
                                        </td>
                                        <td className="py-5 gap-2 items-center">
                                            Status
                                        </td>
                                        <td className="py-5 gap-2 items-center">
                                            Related Party
                                        </td>
                                        <td className="py-5 gap-2 items-center">
                                            In-transfer
                                        </td>
                                        <td className="py-5 gap-2 pr-5 items-center">
                                            Action
                                        </td>
                                    </tr>
                                </thead>

                                <tbody className="w-full bg-white">

                                    {journals.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="py-6 text-center text-gray-500">
                                                No Approved journal found
                                            </td>
                                        </tr>
                                    ) : (
                                        (Array.isArray(journals) ? journals : []).map((journal: any, index: any) => (
                                            <tr
                                                key={index}
                                                className="border-[#eaecf0] hover:bg-gray-200 text-[14px] border-b text-[#545A5D]"
                                            >
                                                <td className="py-6 pl-5 flex gap-2 items-center">
                                                    {formatDateMonthAndYear(journal?.date)}
                                                </td>
                                                <td className="py-6 text-left">
                                                    {journal?.number}
                                                </td>
                                                <td className="py-6 text-left">
                                                    {journal?.type}
                                                </td>
                                                <td className="py-6 text-left">
                                                    {journal?.posted_by}
                                                </td>
                                                <td className="py-6 text-left">
                                                    {journal?.status ==="Posted"? "Approved": ""}
                                                </td>
                                                <td className="py-6 pr-5">
                                                    <CustomCheckbox label="" checked={journal?.entries[0]?.related_party} />
                                                </td>
                                                <td className="py-6 pr-5">
                                                    <CustomCheckbox label="" checked={journal?.entries[0]?.in_transfer} />
                                                </td>
                                                <td className="py-6 pr-5">
                                                    <TableDropDown options={generateTableOptions(journal?.ID)} />
                                                </td>
                                            </tr>
                                        ))
                                    )}

                                    {/* <tr className=" border-[#eaecf0] hover:bg-gray-200 text-[14px] border-b text-[#545A5D]">
                                        <td className="py-6 pl-5 flex gap-2 items-center">
                                            Total
                                        </td>
                                        <td className="py-6  text-left ">
                                        </td>
                                        <td className="py-6  text-left ">
                                        </td>
                                        <td className="py-6  text-left ">
                                        </td>
                                        <td className="py-6  text-left ">
                                        </td>
                                        <td className="py-6  text-left ">
                                            1000
                                        </td>
                                        <td className=" py-6 pr-5">
                                            2000
                                        </td>
                                        <td className="py-6  text-left ">
                                        </td>
                                        <td className=" py-6 pr-5">
                                        </td>
                                        <td className=" py-6 pr-5">
                                        </td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            }
            <div>{selectedTab === "Journal-details" && <ApprovedJournalDetails id={selectedId} handleTabChange={handleTabChange} />}</div>
        </>
    );
};

export default ApprovedJournalTab;
