"use client"
import TableDropDown from '@/components/accounting/shared/TableDropDown/TableDropDown';
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import { ArrowUpNarrowWideIcon, ListFilterIcon, Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGetAccountingList } from '../hooks/query';
import LoadingOverlay from '@/components/reusable/LoadingOverlay';
import { useModal } from '@/util/Modals/ModalsContext';
import DeleteConfirmationModal from '@/components/accounting/otherList/DeleteConfirmationModal';


const OtherList = () => {
    const router = useRouter();
    const { openModal } = useModal();
    const { data, isLoading, isError, error } = useGetAccountingList();
    const lists = data || [];

    const handleNavigation = (route: string) => {
        router.push(route);
    };

    const handleLogRowData = (id: any) => {
        openModal(<DeleteConfirmationModal TitleTopic='Are You sure you want to delete this List' accountID={id} />)
    };

    const breadcrumbs = ['Admin Dashboard', 'Accounting Module'];

    const generateTableOptions = (id: string) => [
        { label: 'View Details', action: () => handleNavigation(`/accounting/other-list/details/?id=${id}`) },
        { label: 'Edit', action: () => handleNavigation(`/accounting/other-list/create-list/?id=${id}`) },
        { label: 'Delete', action: () => handleLogRowData(id) },
    ];

    return (
        <div className=''>
            <HeaderLayout
                moduleName="Accounting Module"
                page="Other Lists"
                breadcrumbs={breadcrumbs}
            />
            {isLoading ? <LoadingOverlay /> :
                <div className='px-9 pt-4'>
                    <div className='bg-secondary px-7 py-4 rounded-2xl text-[#434343]'>
                        <p className="text-xl font-medium mb-2">List</p>
                        <div className='text-[#8133F1] items-center flex gap-5 justify-between'>
                            <div className='flex gap-3'>
                                <button className='flex gap-1'>Filter <ListFilterIcon size="17px" /></button>
                                <button className='flex gap-1'>Sort <ArrowUpNarrowWideIcon size="17px" /></button>
                            </div>
                            <div>
                                <Link href={"/accounting/other-list/create-list"}><button className='flex gap-1'> <Plus size="19px" />Create a List </button></Link>
                            </div>
                        </div>

                        <div className='my-5'>
                            <div className='overflow-x-auto scrollbar-hide'>
                                <table className="w-[280%] md:w-[128%] lg:w-full text-[14px]">
                                    <thead className="w-full">
                                        <tr className="text-[#374B58] text-[12px] border-[#eaecf0]  border-b font-[500] bg-[#F5F5F5]">
                                            <td className="py-5 w-[11%] pl-6">
                                                No
                                            </td>
                                            <td className="py-5">
                                                Lists
                                            </td>
                                            <td className="py-5">
                                                Description
                                            </td>
                                            <td className="py-5 pr-6 w-[2%]">
                                                Action
                                            </td>
                                        </tr>
                                    </thead>

                                    <tbody className="w-full bg-white">
                                        {(Array.isArray(lists) ? lists : []).map((list: any, index: any) => (
                                            <tr key={index} className="border-[#eaecf0] hover:bg-[#f7f7f7] text-[14px] border-b text-[#545A5D]">
                                                <td className="py-6 pl-5 text-left">
                                                    {index + 1}
                                                </td>
                                                <td className="py-6 text-left">
                                                    {list.name}
                                                </td>
                                                <td className="py-6 text-left">
                                                    {list.description || 'No description'}
                                                </td>
                                                <td className="py-6 pr-6 text-left">
                                                    <TableDropDown options={generateTableOptions(list.ID)} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default OtherList;