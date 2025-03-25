import { useGetDefaultChartOfAccount } from '@/app/accounting/hooks/query';
import LoadingOverlay from '@/components/reusable/LoadingOverlay';
import { X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
interface AccountSelectModalProps {
    onClose: () => void;
    onSelectAccount: (account: { account_name: string; account_code: string; }) => void;
}

const AccountSelectModal: React.FC<AccountSelectModalProps> = ({ onClose, onSelectAccount }) => {
    const [groupedAccounts, setGroupedAccounts] = useState<
        { [parentType: string]: { [type: string]: any[] } }
    >({});

    const { data, isLoading: isFetching } = useGetDefaultChartOfAccount();
    const accounts = data?.data || [];

    // Group accounts by parent_type and type
    useEffect(() => {
        // Group accounts by parent_type and type with trimming and fallback handling.
        const grouped = accounts.reduce((acc: any, account: any) => {
            const parentType = account.parent_type?.trim() || 'Uncategorized';
            const type = account.type?.trim() || 'Others';

            // Ensure the correct group is created for parent_type and type
            if (!acc[parentType]) acc[parentType] = {};
            if (!acc[parentType][type]) acc[parentType][type] = [];

            acc[parentType][type].push(account);
            return acc;
        }, {});

        console.log('Grouped Accounts:', grouped); // Debugging log to ensure correctness

        setGroupedAccounts(grouped);
    }, [accounts]);


    if (isFetching) return <LoadingOverlay />;
    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-[#434343] bg-opacity-50 flex justify-center items-center overflow-y-auto py-2 md:pt-[4rem]">
            <div className="relative mt-16 mb-10">
                <button
                    onClick={onClose}
                    className="absolute bg-white h-10 -top-12 -right-10 text-gray-500 hover:text-gray-700 cursor-pointer w-10 justify-center items-center mx-auto flex rounded-full">
                    <X className='text-primary-normal' />
                </button>
                <div className="bg-white p-6 rounded-2xl justify-center items-center shadow-md  w-[25rem] md:w-[40rem] relative no-scrollbar">
                    <h2 className="text-lg font-semibold mb-4">Select Account</h2>
                    <table className="min-w-full text-left">
                        <thead className="text-[16x]">
                            <tr>
                                <th className="py-2 px-4">Account Code</th>
                                <th className="py-2 px-4 ">Account Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(groupedAccounts).map(([parentType, types]) => (
                                <React.Fragment key={parentType}>
                                    {/* Render parent type header */}
                                    <tr className="bg-gray-200 font-bold text-[16px]">
                                        <td colSpan={3} className="py-2 px-4 capitalize">
                                            {parentType}
                                        </td>
                                    </tr>

                                    {Object.entries(types).map(([type, accounts]) => (
                                        <React.Fragment key={type}>
                                            {/* Render type header only once per type */}
                                            <tr className="bg-gray-100 font-semibold text-[15px]">
                                                <td colSpan={3} className="py-2 px-4 capitalize">
                                                    {type}
                                                </td>
                                            </tr>
                                            {accounts.map((account: any) => (
                                                <tr
                                                    key={account.code}
                                                    onClick={() => {
                                                        onSelectAccount({
                                                            account_name: account.name,
                                                            account_code: account.code,
                                                        });
                                                        onClose();
                                                    }}
                                                    className="cursor-pointer hover:bg-[#f7f7f7] text-[#939292] text-[14px]"
                                                >
                                                    <td className="py-2 px-4">{account.code}</td>
                                                    <td className="py-2 px-4">{account.name}</td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AccountSelectModal;
