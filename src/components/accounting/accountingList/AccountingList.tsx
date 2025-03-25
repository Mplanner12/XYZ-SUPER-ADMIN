import { useGetChartOfAccount, useGetDefaultChartOfAccount } from '@/app/accounting/hooks/query';
import LoadingOverlay from '@/components/reusable/LoadingOverlay';
import { useModal } from '@/util/Modals/ModalsContext';
import { ChevronDownIcon, MessageSquareIcon, RotateCwIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from "react";
import { FiSearch } from 'react-icons/fi';
import TableDropDown from "../shared/TableDropDown/TableDropDown";
import COASortDropdown, { SortOption } from "./COASortDropdown";
import CustomizeAccount from './CustomizeAccount';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import ExportChartOfAccount from './ExportChartOfAccount';
import ImportChartOfAccount from './ImportChartOfAccount';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/helpers/config';



const AccountingListPg: React.FC = () => {
    const [isFilterDropdownVisible, setFilterDropdownVisible] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredAccounts, setFilteredAccounts] = useState<any[]>([]);
    const [sortOption, setSortOption] = useState<string | null>(null);
    const [filterOption, setFilterOption] = useState<string | null>(null);
    const [groupedAccounts, setGroupedAccounts] = useState<any>({});

    const { data, isLoading, isError, error } = useGetDefaultChartOfAccount();
    const accounts = data?.data || [];

    const router = useRouter();
    const { openModal } = useModal();

    const handleNavigation = (route: string) => {
        router.push(route);
    };

    useEffect(() => {
        // Initialize with the original accounts
        let filteredData = Array.isArray(accounts) ? [...accounts] : [];

        // Apply search filter
        if (searchQuery) {
            filteredData = filteredData.filter((account: any) =>
                account?.account_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                account?.account_code?.toString().includes(searchQuery)
            );
        }

        // Apply filter option
        if (filterOption) {
            filteredData = filteredData.filter((account: any) => {
                if (filterOption === 'Active') return account.status === 'Active';
                if (filterOption === 'Inactive') return account.status === 'Inactive';
                return true; // Handle any other options if added later
            });
        }

        // Apply sorting if needed
        if (sortOption) {
            filteredData.sort((a: any, b: any) => {
                switch (sortOption) {
                    case 'Account Code Ascending':
                        return a.account_code - b.account_code;
                    case 'Account Code Descending':
                        return b.account_code - a.account_code;
                    case 'Account Name Ascending':
                        return a.account_name.localeCompare(b.account_name);
                    case 'Account Name Descending':
                        return b.account_name.localeCompare(a.account_name);
                    default:
                        return 0;
                }
            });
        }

        // Avoid redundant updates
        setFilteredAccounts((prev) => {
            const isEqual =
                prev.length === filteredData.length &&
                prev.every((acc, index) => acc._id === filteredData[index]._id);
            return isEqual ? prev : filteredData;
        });
    }, [accounts, searchQuery, filterOption, sortOption]);

    useEffect(() => {
        let filteredData = Array.isArray(accounts) ? [...accounts] : [];

        // Apply search filter
        if (searchQuery) {
            filteredData = filteredData.filter((account: any) =>
                account?.account_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                account?.account_code?.toString().includes(searchQuery)
            );
        }

        // Apply filter option
        if (filterOption) {
            filteredData = filteredData.filter((account: any) => {
                if (filterOption === 'Active') return account.status === 'Active';
                if (filterOption === 'Inactive') return account.status === 'Inactive';
                return true;
            });
        }

        // Group accounts by account_type and type
        const grouped = filteredData.reduce((acc: any, account: any) => {
            const { account_type, type } = account;
            if (!acc[account_type]) acc[account_type] = {};
            if (!acc[account_type][type]) acc[account_type][type] = [];
            acc[account_type][type].push(account);
            return acc;
        }, {});
        setGroupedAccounts(grouped);
    }, [accounts, searchQuery, filterOption]);

    const toggleFilterDropdown = () => {
        setFilterDropdownVisible(!isFilterDropdownVisible);
    };

    const handleFilterSelect = (selectedOption: string) => {
        setFilterOption(selectedOption);
    };

    const handleOpenImportModal = () => {
        openModal(<ImportChartOfAccount />)
    }

    const handleOpenExportModal = () => {
        openModal(<ExportChartOfAccount />)
    }

    const handleOpenCustomizeModal = () => {
        openModal(<CustomizeAccount />)
    }

    const renderAccountRow = (account: any, level: number = 0): JSX.Element => {
        const basePadding = 20;
        const accountPadding = basePadding * level;

        return (
            <>
                <tr key={account._id} className="hover:bg-[#f7f7f7]">
                    <td className="pl-5 py-2" style={{ paddingLeft: `${accountPadding}px` }}>{account.code}</td>
                    <td className="px-2 py-2">{account.name}</td>
                    <td className="px-2 py-2">{account.type}</td>
                    <td className="px-2 py-2">{account.parent_type}</td>
                    <td className="px-2 py-2">{account.location}</td>
                    <td className="px-2 py-2">{account.description}</td>
                    <td className="px-2 py-2">{formatCurrency(account.opening_balance)}</td>
                    <td className="px-2 py-2">{account.currency}</td>
                    <td className="pr-5 py-2">
                        <TableDropDown options={generateTableOptions(account)} />
                    </td>
                </tr>

                {/* Render children recursively with increased level */}
                {account.children && account.children.map((childAccount: any) =>
                    renderAccountRow(childAccount, level + 1)
                )}
            </>
        );
    };

    const handleLogRowData = (rowData: any) => {
        const { id } = rowData;
        openModal(<DeleteConfirmationModal TitleTopic='Are You sure you want to Delete this account' accountID={id} />)
    };

    const generateTableOptions = (rowData: any) => {
        return [
            { label: 'Edit account', action: () => handleNavigation(`/accounting/accounting-list/add-account/?id=${rowData.id}`) },
            { label: 'Make this account active' },
            { label: 'Make this account inactive' },
            { label: 'Delete Account', action: () => handleLogRowData(rowData) },
        ];
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <>
            {isLoading ? <LoadingOverlay /> :
                <main className='bg-secondary px-5 py-4 rounded-2xl text-[#434343]'>
                    <div className='flex justify-between my-3'>
                        <span className='text-[24px] flex items-center'>Mushinware House <ChevronDownIcon className='ml-2' /></span>
                        <div className='text-[15px]'>
                            <div className='text-[#8133F1] flex gap-2 justify-between mb-2'>
                                <button className='flex gap-1'>Download <Image className="ml-2" src="/download.png" width={20} height={20} alt="icon" /></button>
                                <button className='flex gap-1'>Print  <Image className="ml-2" src="/print.png" width={18} height={18} alt="icon" /></button>
                                <button className='flex gap-1'>Share  <Image className="ml-2" src="/share.png" width={18} height={18} alt="icon" /></button>
                                <button className='flex gap-1'>Customize  <Image className="ml-2" src="/customize.png" width={20} height={20} alt="icon" /></button>
                                <button className='flex gap-1'>Refresh <RotateCwIcon size="18px" /></button>
                            </div>
                            <div className='text-[#8133F1] flex gap-2 justify-end'>
                                <button className='flex gap-1'>Comment <MessageSquareIcon size="18px" /></button>
                                <button className='flex gap-1' onClick={handleOpenExportModal}>Export Secondary Chart of Account <Image className="ml-2" src="/export.png" width={20} height={20} alt="icon" /></button>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between items-center my-5 text-[15px]'>
                        <p className='text-[20px]'>Chart Of Account ({filteredAccounts.length})</p>
                        <div className="relative w-[50%] lg:w-[40%] mb-4 md:mb-0">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Search for a account name or code"
                                    size={70}
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    className={"block w-full rounded-[6px] border-0 h-[3.2rem] py-1.5 pr-2 pl-9 text-[16px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-[#8133F1] focus:ring-2 placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"}
                                />
                                <span>
                                    <FiSearch className="text-[22px] absolute left-2 top-[.9rem] text-[#66686B]" />
                                </span>
                            </div>
                        </div>
                        <div>
                            <Link href="/accounting/accounting-list/add-account">
                                <span className="flex items-center text-[#8133F1]"> <Image className="mr-2" src="/plus.png" width={23} height={23} alt="icon" /> Add another account </span>
                            </Link>
                        </div>
                    </div>

                    <div className='text-[#8133F1] flex gap-5 justify-between text-[15px]'>
                        <div className="flex items-center text-[#8133F1] relative">
                            <div>
                                <span className="mr-3 flex items-center cursor-pointer" onClick={toggleFilterDropdown}> Filter <Image className="ml-2" src="/filter-icon.svg" width={20} height={20} alt="icon" /></span>
                                <COASortDropdown
                                    isVisible={isFilterDropdownVisible}
                                    onSelect={handleFilterSelect}
                                    onClose={() => setFilterDropdownVisible(false)}
                                    positioning={-101}
                                    options={COAFilterOptions}
                                />
                            </div>
                        </div>
                        <button className='flex gap-1' onClick={handleOpenImportModal}> Import Chart of Accounts  <Image className="ml-2" src="/import.png" width={20} height={20} alt="icon" /></button>
                        <button className='flex gap-1'>Show all columns <ChevronDownIcon size="17px" /></button>
                    </div>

                    <div className='my-5'>
                        <div className='overflow-x-auto scrollbar-hide'>
                            <table className="min-w-[280%] md:min-w-[128%] lg:min-w-full text-[14px] mb-5">
                                <thead className="w-full">
                                    <tr className="text-[#374B58] text-[12px] border-[#eaecf0]  border-b  font-[500] bg-[#F5F5F5]">
                                        <td className="py-5 pl-5 gap-2 items-center">
                                            Account Code
                                        </td>
                                        <td className="py-5 gap-2 items-center">
                                            Account Name
                                        </td>
                                        <td className="py-5 gap-2 items-center">
                                            Acount Type
                                        </td>
                                        <td className="py-5 gap-2 items-center">
                                            Parent Account Type
                                        </td>
                                        <td className="py-5 gap-2 items-center">
                                            Location
                                        </td>
                                        <td className="py-5 gap-2 items-center">
                                            Description
                                        </td>

                                        <td className="py-5 gap-2 items-center">
                                            Opening Balance
                                        </td>
                                        <td className="py-5 gap-2 items-center">
                                            Status
                                        </td>
                                        <td className="py-5 gap-2 pr-5 items-center">
                                            Action
                                        </td>
                                    </tr>
                                </thead>

                                <tbody className="w-full bg-white">
                                    {filteredAccounts.length > 0 ? (
                                        filteredAccounts.map((account: any) => renderAccountRow(account))
                                    ) : (
                                        <tr>
                                            <td colSpan={9} className="text-center py-5">No matching accounts found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            }
        </>
    );
};

export default AccountingListPg;


const COAFilterOptions = [
    {
        label: 'Filter by Account Category',
        subOptions: [
            { label: 'Inventory' },
            { label: 'Accounts Payable' },
            { label: 'Salaries Expense' }
        ],
    },
    {
        label: 'Filter by Status',
        subOptions: [
            { label: 'Active' },
            { label: 'Inactive' },
        ],
    },
    {
        label: 'Filter by Currency',
        subOptions: [
            { label: 'NGN' },
            { label: 'USD' },
        ],
    },
    {
        label: 'Filter by Department',
        subOptions: [
            { label: ' Tax Accounts' },
            { label: 'Audit Accounts' },
            { label: 'Cost Accounts' },
        ],
    },
];
