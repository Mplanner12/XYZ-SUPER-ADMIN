import { useUpdateChartOfAccount } from '@/app/accounting/hooks/mutate';
import { useGetAccountingList, useGetDefaultChartOfAccount } from '@/app/accounting/hooks/query';
import CustomSelect from '@/components/reusable/CustomSelect';
import LoadingOverlay from '@/components/reusable/LoadingOverlay';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import COASortDropdown from './COASortDropdown';
import { FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import CustomCheckbox from '@/components/reusable/CustomCheckbox';

interface AccountSummaryTabProps {
    proceed: () => void;
}

interface Account {
    id: string;
    name: string;
    code: string;
    opening_balance: number;
    balance: number;
    parent_type?: string;
    type?: string;
    list_name: string;
    children?: Account[];
}

interface GroupedAccounts {
    [parent_type: string]: {
        [type: string]: Account[];
    };
}

const AccountSummary: React.FC<AccountSummaryTabProps> = ({ proceed }) => {
    const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
    const { data: lists } = useGetAccountingList();
    const { mutate: updateAccount } = useUpdateChartOfAccount();
    const { data, isLoading: isFetching } = useGetDefaultChartOfAccount();
    const accounts = data?.data || [];

    const [groupedAccounts, setGroupedAccounts] = useState<GroupedAccounts>({});
    const [searchQuery, setSearchQuery] = useState('');
    const [showNonZeroOnly, setShowNonZeroOnly] = useState(false);
    const [selectedLists, setSelectedLists] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isFilterDropdownVisible, setFilterDropdownVisible] = useState(false);
    const [showNonZeroAccounts, setShowNonZeroAccounts] = useState(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const toggleFilterDropdown = () => {
        setFilterDropdownVisible(!isFilterDropdownVisible);
    };

    const handleFilterSelect = (selectedOption: string) => {
        console.log('Selected sorting option:', selectedOption);
    };

    const handleCheckboxChange = () => {
        setShowNonZeroAccounts(prevState => !prevState);
    };

    useEffect(() => {
        const grouped: GroupedAccounts = accounts.reduce((acc: GroupedAccounts, account: Account) => {
            const parentType = account.parent_type?.trim() || 'Uncategorized';
            const type = account.type?.trim() || 'Others';

            // Initialize the correct group for parent_type and type
            if (!acc[parentType]) acc[parentType] = {};
            if (!acc[parentType][type]) acc[parentType][type] = [];

            // Add the main account to the grouped structure
            acc[parentType][type].push(account);

            return acc;
        }, {});

        console.log('Grouped Accounts with Children:', grouped);
        setGroupedAccounts(grouped);
    }, [accounts]);

    const renderAccount = (account: any, level: number = 0): JSX.Element => {
        const basePadding = 43;
        const levelPadding = 20;
        const accountPadding = basePadding + level * levelPadding;
    
        // Increase the width of CustomSelect container by 2% for each nested level
        const baseWidthPercentage = 40;
        const adjustedWidthPercentage = baseWidthPercentage + level * 2;
    
        return (
            <div key={account.id}>
                <div
                    className="flex justify-between items-center py-2 px-1 hover:bg-[#f7f7f7]"
                    style={{
                        paddingLeft: `${accountPadding}px`,
                        backgroundColor: level % 2 === 0 ? '#E9E8E8' : '#FFFFFF',
                        height: level !== 0 ? '3.4rem': '', 
                    }}
                >
                    <p>{account.code} {account.name}</p>
                    
                    {/* Only render CustomSelect for top-level accounts (level 0) */}
                    {level === 0 && (
                        <div style={{ width: `${adjustedWidthPercentage}%` }}>
                            <CustomSelect
                                options={
                                    lists?.map((list: any) => ({
                                        listItem: list.name,
                                        value: list.ID,
                                    })) || []
                                }
                                name={`list_id_${account.id}`}
                                placeholder="Select list"
                                className="review-filter"
                                selectedValue={selectedLists[account.id] || ''}
                                handleDropdownChange={(selectedOption: any) =>
                                    handleDropdownChange(account.id, selectedOption)
                                }
                            />
                        </div>
                    )}
                </div>
    
                {/* Check for children recursively */}
                {account.children && account.children.length > 0 && (
                    <div>
                        {account.children.map((childAccount: any) =>
                            renderAccount(childAccount, level + 1)
                        )}
                    </div>
                )}
            </div>
        );
    };

    // Filter the grouped accounts based on search query and other criteria
    const filteredAndSearchedAccounts = Object.entries(groupedAccounts).reduce(
        (acc, [parentType, types]) => {
            acc[parentType] = Object.entries(types).reduce((typeAcc, [type, accounts]) => {
                const filteredAccounts = accounts.filter((account) => {
                    const matchesSearch = account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        account.code.toLowerCase().includes(searchQuery.toLowerCase());
                    const matchesNonZero = !showNonZeroOnly || account.balance > 0;
                    return matchesSearch && matchesNonZero;
                });

                if (filteredAccounts.length > 0) {
                    typeAcc[type] = filteredAccounts;
                }
                return typeAcc;
            }, {} as { [key: string]: Account[] }); // Explicitly type the accumulator

            return acc;
        },
        {} as GroupedAccounts // Explicitly type the outer accumulator
    );

    const getParentType = (types: any) => {
        for (const key of Object.keys(types)) {
            if (types[key].length > 0) {
                return types[key][0]?.parent_type || 'Parent Type Not Available';
            }
        }
        return null;
    };

    // Handle form submission with account ID
    const handleSubmit = (values: any) => {
        setIsLoading(true)
        if (!selectedAccountId) {
            setIsLoading(false)
            toast.error('No list selected.');
            return;
        }
        updateAccount(
            { id: selectedAccountId, data: values },
            {
                onSuccess: (response) => {
                    setIsLoading(false)
                    if (response?.status === 'success') {
                        toast.success('Account updated successfully');
                    }
                },
                onError: (error) => {
                    setIsLoading(false)
                    toast.error('Error while submitting data:', error);
                },
            }
        );
    };

    const handleDropdownChange = (accountId: string, selectedOption: any) => {
        console.log('Account ID:', accountId);
        console.log('Selected Option:', selectedOption);

        setSelectedLists((prev) => ({
            ...prev,
            [accountId]: selectedOption?.value,
        }));

        setSelectedAccountId(accountId);
    };

    const formik = useFormik({
        initialValues: { list_id: '' },
        onSubmit: (values) => {
            const finalValues = {
                ...values,
                list_id: selectedAccountId ? Number(selectedLists[selectedAccountId]) || '' : '',
                isDefault: true,
            };

            handleSubmit(finalValues);
        },
    });

    useEffect(() => {
        const initializeSelectedLists = () => {
            const initialLists = accounts.reduce((acc: any, account: any) => {
                console.log("account", account)
                acc[account.id] = account.list_name || ''; // Use a default value or API-provided list
                return acc;
            }, {} as { [key: string]: string });

            setSelectedLists(initialLists);
        };

        if (accounts.length > 0) {
            initializeSelectedLists();
        }
    }, [accounts]);

    if (isFetching) return <LoadingOverlay />;

    return (
        <>
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
                                    className={"block w-full rounded-[6px] border-0 h-[3.2rem] py-1.5 pr-2 pl-9 text-[16px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-[#8133F1] focus:ring-2 placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"}
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
                    <div className="text-[#8133F1] flex">
                        <span className="mr-4">
                            <CustomCheckbox
                                checked={showNonZeroAccounts}
                                label="Show Only Non-Zero Account"
                                onChange={handleCheckboxChange}
                            />
                        </span>
                    </div>
                </div>
            </div>
            <div className="w-[60%] pb-12">
                <div>
                    {Object.keys(filteredAndSearchedAccounts).length > 0 ? (
                        Object.entries(filteredAndSearchedAccounts).map(([parentType, types], groupIdx) => (
                            <div key={parentType}>
                                <div className="flex justify-between items-center py-1 px-1">
                                    <p className="text-[16px] font-semibold mb-1 mt-3 capitalize">
                                        {getParentType(types)}
                                    </p>
                                    {groupIdx === 0 && (
                                        <p className="text-[16px] font-semibold mb-1">Associated List</p>
                                    )}
                                </div>
                                {Object.entries(types).map(([type, accounts], typeIdx) => (
                                    <div key={type}>
                                        <div className="flex justify-between py-2 px-1 ml-[29px] capitalize">
                                            <p>
                                                {`${groupIdx + 1}.${typeIdx + 1}`} {type}
                                            </p>
                                        </div>
                                        {accounts.map((account) => renderAccount(account))}
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-5">No matching accounts found</div>
                    )}
                </div>
                <button
                    onClick={() => formik.handleSubmit()}
                    className="bg-foundation-purple-purple-400 border-none mt-5 hover:bg-foundation-purple-purple-100 w-[50%] py-3 cursor-pointer text-foundation-white-white-400 rounded-[16px]"
                >

                    {isLoading ? "Processing..." : "   Save & Proceed"}
                </button>
            </div >
        </>
    );
};

export default AccountSummary;



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