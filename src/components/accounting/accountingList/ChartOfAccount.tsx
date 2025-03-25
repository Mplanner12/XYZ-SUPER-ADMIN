import { useGetChartOfAccount } from '@/app/accounting/hooks/query';
import COASortDropdown from '@/components/accounting/accountingList/COASortDropdown';
import CustomCheckbox from "@/components/reusable/CustomCheckbox";
import LoadingOverlay from "@/components/reusable/LoadingOverlay";
import { formatCurrency } from "@/helpers/config";
import { useModal } from '@/util/Modals/ModalsContext';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import TableDropDown from "../shared/TableDropDown/TableDropDown";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import ImportChartOfAccount from './ImportChartOfAccount';


const AccountDetails: React.FC = () => {
    const [isFilterDropdownVisible, setFilterDropdownVisible] = useState(false);
    const [showNonZeroAccounts, setShowNonZeroAccounts] = useState(true);
    const [filteredAccounts, setFilteredAccounts] = useState<any>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { data, isLoading, isError, error } = useGetChartOfAccount();
    const accounts = data?.data || [];
    console.log(accounts)

    const router = useRouter();
    const { openModal } = useModal();


    const toggleFilterDropdown = () => {
        console.log(COAFilterOptions)
        setFilterDropdownVisible(!isFilterDropdownVisible);
    };

    const handleFilterSelect = (selectedOption: string) => {
        console.log('Selected sorting option:', selectedOption);
    };

    const handleLogRowData = (rowData: any) => {
        const { id } = rowData;
        openModal(<DeleteConfirmationModal TitleTopic='Are You sure you want to Delete this account' accountID={id} />)
    };

    const handleOpenImportModal = () => {
        openModal(<ImportChartOfAccount />)
    }

    const handleNavigation = (route: string) => {
        router.push(route);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleCheckboxChange = () => {
        setShowNonZeroAccounts(prevState => !prevState);
    };

    const filtered = useMemo(() => {
        let result = Array.isArray(accounts) ? [...accounts] : [];

        // Filter for non-zero accounts if the toggle is enabled
        if (showNonZeroAccounts) {
            result = result.filter((account: any) => account.balance > 0);
        }

        // Filter based on search query for account code or name
        if (searchQuery.trim() !== "") {
            result = result.filter((account: any) =>
                account.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                account.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return result;
    }, [accounts, showNonZeroAccounts, searchQuery]);

    useEffect(() => {
        if (JSON.stringify(filteredAccounts) !== JSON.stringify(filtered)) {
            setFilteredAccounts(filtered);
        }
    }, [filtered, filteredAccounts]);

    const renderAccountRow = (account: any, level: number = 1): JSX.Element => {
        const basePadding = 20;
        const accountPadding = basePadding * level;

        return (
            <>
                <tr key={account._id} className="hover:bg-[#f7f7f7] capitalize">
                    <td className="pl-5 py-2" style={{ paddingLeft: `${accountPadding}px` }}>{account.code}</td>
                    <td className="px-2 py-2">{account.name}</td>
                    <td className="px-2 py-2">{account.type}</td>
                    <td className="px-2 py-2">{account.parent_type}</td>
                    <td className="px-2 py-2">{account.location_name}</td>
                    <td className="px-2 py-2">{account.description}</td>
                    <td className="px-2 py-2">{formatCurrency(account.opening_balance)}</td>
                    <td className="px-2 py-2">{account.status}</td>
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

    const generateTableOptions = (rowData: any) => {
        return [
            { label: 'Edit account', action: () => handleNavigation(`/accounting/accounting-list/add-account/?id=${rowData.id}`) },
            { label: 'Make this account active' },
            { label: 'Make this account inactive' },
            { label: 'Delete Account', action: () => handleLogRowData(rowData) },
        ];
    };

    return (
        <>
            {isLoading ? <LoadingOverlay /> :
                <div className="pb-12">
                    <div className="flex flex-wrap justify-between items-center py-2 mb-2">
                        <div className="w-full">
                            <div className="flex flex-wrap md:flex-nowrap items-center mb-3 justify-between">
                                <div className="relative w-[50%] lg:w-[40%] mb-4 md:mb-0">
                                    <div className="relative w-full">
                                        <input
                                            type="text"
                                            name="search"
                                            placeholder="Search for a account code or name"
                                            size={70}
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            className={
                                                "block w-full rounded-[6px] border-0 h-[3.2rem] py-1.5 pr-2 pl-9 text-[16px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-[#8133F1] focus:ring-2 placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                            }
                                        />
                                        <span>
                                            <FiSearch className="text-[22px] absolute left-2 top-[.9rem] text-[#66686B]" />
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center text-[#8133F1]">
                                    <div>
                                        <span className="mr-3 flex items-center cursor-pointer" onClick={toggleFilterDropdown}> Filter <Image className="ml-2" src="/filter-icon.svg" width={20} height={20} alt="icon" /></span>
                                        <COASortDropdown
                                            isVisible={isFilterDropdownVisible}
                                            onSelect={handleFilterSelect}
                                            onClose={() => setFilterDropdownVisible(false)}
                                            options={COAFilterOptions}
                                            positioning={193}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between mb-5">
                                <p className="text-xl mb-1">Default Chart of Accounts</p>
                                <Link href="/accounting/accounting-list/add-account">
                                    <span className="flex items-center text-[#8133F1]"> <Image className="mr-2" src="/plus.png" width={23} height={23} alt="icon" /> Add another account </span>
                                </Link>
                            </div>
                            <div className="flex justify-between w-[55%] mb-5">
                                <div className="text-[#8133F1] flex">
                                    <span className="mr-4">
                                        <CustomCheckbox
                                            checked={showNonZeroAccounts}
                                            label="Show Only Non-Zero Account"
                                            onChange={handleCheckboxChange}
                                        />
                                    </span>
                                </div>
                                <button className='flex gap-1' onClick={handleOpenImportModal}> Import Chart of Accounts  <Image className="ml-2" src="/import.png" width={20} height={20} alt="icon" /></button>
                            </div>
                        </div>
                    </div>
                    <div className='overflow-x-auto scrollbar-hide'>
                        <table className="min-w-[280%] md:min-w-[128%] lg:min-w-[120%] text-[14px]">
                            <thead className="w-full">
                                <tr className="text-[#374B58] border-[#eaecf0] text-[12px] border-b font-[500] bg-[#F5F5F5]">
                                    <td className="py-5 pl-5 gap-2 items-center">
                                        Account Code
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        Account Name
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        Account Type
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
            }
        </>

    );
};

export default AccountDetails;

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
