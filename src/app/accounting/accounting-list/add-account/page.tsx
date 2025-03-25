"use client"
import AccountDetails from "@/components/accounting/accountingList/addAccount/AccountDetails";
import OptionalTab from "@/components/accounting/accountingList/addAccount/OptionalTab";
import HeaderLayout from "@/components/MainLayouts/HeaderLayout";
import { useState, useEffect, useMemo } from "react";
import { useGetChartOfAccountById } from "../../hooks/query";
import { useSearchParams } from "next/navigation";


export interface AccountDetailsFormValues {
    location_name: string;
    account_parent_id: string;
    account_parent_type: string;
    account_type: string;
    sub_account_type: string;
    sub_account: string;
    tax_sub_account?: string; 
    account_name: string;
    account_code: string;
    opening_balance: string;
    name?: string;
    code?: string;
    balance?: string;
    parent_type?: string;
    type?: string;
    account_description: string;
    tax_type: string;
    tax_account_name: string;
    tax_code: string;
    tax_description: string;
    audit_sub_account: string;
    audit_account_name: string;
    audit_account_code: string;
    audit_description: string;
    cost_type: string;
    cost_sub_account: string;
    common_cost_allocation_type: string;
    cost_description: string;
    tax_line: boolean;
    audit_line: boolean;
    cost_line: boolean;
}

const AddAccount: React.FC = () => {
    const breadcrumbs = ['Admin Dashboard', 'Accounting Module'];

    const [menu, setMenu] = useState('Account details')
    const [formValues, setFormValues] = useState<AccountDetailsFormValues | null>(null);

    const params = useSearchParams();
    const accountId: any = params.get("id");


    const { data, isLoading, isError, error } = useGetChartOfAccountById({ id: accountId });
    const accounts = useMemo(() => data?.data || [], [data]);

    const handleProceed = (values: any) => {
        setFormValues(values);
        setMenu('Optional');
    };

    useEffect(() => {
        if (accounts) { 
            setFormValues((prevValues) => ({
                ...prevValues || {},
                location_name: accounts?.location_name || '',
                account_parent_id: accounts?.name || '',
                account_parent_type:  accounts?.parentID || '',
                account_type: accounts?.type || '',
                sub_account_type: accounts?.type_id || '',
                sub_account: accounts?.account_name || '',
                account_name: accounts?.name || '',
                parent_type: accounts?.parent_type || '',
                type: accounts?.type || '',
                account_code: accounts?.code || '',
                opening_balance: accounts?.balance || '',
                account_description: accounts?.description || '',
                tax_line: accounts?.tax_line || false,
                tax_type: accounts?.tax_type || '',
                tax_account_name: accounts?.tax_account_name || '',
                tax_code: accounts?.tax_code || '',
                tax_description: accounts?.tax_description || '',
                tax_sub_account: accounts?.tax_sub_account || '',
                audit_line: accounts?.audit_line || false,
                audit_account_name: accounts?.audit_account_name || '',
                audit_account_code: accounts?.audit_account_code || '',
                audit_description: accounts?.audit_description || '',
                audit_sub_account: accounts?.audit_sub_account || '',
                cost_line: accounts?.cost_line || false,
                cost_type: accounts?.cost_type || '',
                common_cost_allocation_type: accounts?.common_cost_allocation_type || '',
                cost_description: accounts?.cost_description || '',
                cost_sub_account: accounts?.cost_sub_account || '',
            }));
        }
    }, [accounts]); // Only run when accounts change
    
    const menuBar = [
        {
            name: "Account details",
            id: 1
        },
        {
            name: "Optional",
            id: 2
        },
    ]

    return (
        <>
            <HeaderLayout
                moduleName="Accounting Module"
                page="Accounting List"
                breadcrumbs={breadcrumbs}
            />
            <div className=" px-7 pt-4">
                <div className='bg-secondary px-5 py-4 rounded-2xl text-[#434343]'>
                    <p className="text-xl font-medium mb-2">Chart Of Account Setup</p>

                    <div className="border border-solid border-primary-normal rounded-[8px] w-fit flex text-xs md:text-sm lg:text-base gap-4 no-scrollbar">
                        {menuBar?.map(({ name, id }: any) => (
                            <p
                                key={id}
                                className={`flex justify-between items-center text-[16px] text-primary-normal px-[8px] py-[5px] cursor-pointer transition flex-shrink-0 ${menu === name ? "bg-primary-normal rounded-[8px] text-white" : ""
                                    }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setMenu(name);
                                }}
                            >
                                {name}
                            </p>
                        ))}
                    </div>

                    <div className="mt-1 pb-16">
                        <div>{menu === "Account details" && <AccountDetails formValues={formValues} proceed={handleProceed} />}</div>
                        <div>{menu === "Optional" && <OptionalTab formValues={formValues} />}</div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default AddAccount;
