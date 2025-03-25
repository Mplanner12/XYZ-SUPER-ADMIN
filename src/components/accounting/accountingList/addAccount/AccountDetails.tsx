"use client";
import { AccountDetailsFormValues } from "@/app/accounting/accounting-list/add-account/page";
import { useChartOfAccountByFilter, useGetAccountingListItemById, useGetParentAccountType } from "@/app/accounting/hooks/query";
import CustomSelect from "@/components/reusable/CustomSelect";
import { useFormik } from "formik";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


interface AccountDetailsTabProps {
    proceed: (values: any) => void;
    formValues: AccountDetailsFormValues | null;
}

const AccountDetails: React.FC<AccountDetailsTabProps> = ({ proceed, formValues }) => {
    const [selectedParentType, setSelectedParentType] = useState<string | null>(formValues?.account_parent_type || null);
    const [selectedSubAccount, setSelectedSubAccount] = useState<string>(formValues?.sub_account_type || "");
    const [filteredAccountType, setFilteredAccountType] = useState<any[]>([]);
    const [filteredAccountCode, setFilteredAccountCode] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { data: parentAccountType } = useGetParentAccountType();
    const { data: chartOfAccount } = useChartOfAccountByFilter({ account: selectedSubAccount });
    const { data: LocationList } = useGetAccountingListItemById({ id: '95' });

    const accounts = chartOfAccount?.data || [];

    const params = useSearchParams();
    const id: any = params.get("id");

    const mapCodeToValue = (code: any) => {
        const mainCode = code.split('.')[0];
        return parseInt(mainCode) * 10000;
    };

    // Filter Account Types based on selected Parent Type
    useEffect(() => {
        const initialFilteredAccountType = selectedParentType
            ? parentAccountType?.find((item: any) => item.id === selectedParentType)?.sub_account_types || []
            : [];

        const transformedAccountCodes = initialFilteredAccountType.map((item: any) => ({
            ...item,
            code: mapCodeToValue(item.code),
        }));

        setFilteredAccountType(initialFilteredAccountType);
        setFilteredAccountCode(transformedAccountCodes[0]?.code);

    }, [selectedParentType]);

    useEffect(() => {
        if (formValues) {
            setSelectedParentType(formValues.account_parent_type);
            setSelectedSubAccount(formValues.account_type);
        }
    }, [formValues]);

    const formik = useFormik({
        initialValues: {
            location_name: formValues?.location_name || "",
            account_parent_type: formValues?.account_parent_type || null,
            account_parent_id: formValues?.account_parent_id || "",
            account_type: formValues?.account_type || "",
            sub_account_type: formValues?.sub_account_type || "",
            sub_account: formValues?.account_name || "",
            account_name: formValues?.account_name || "",
            account_code: formValues?.account_code || filteredAccountCode || "",
            opening_balance: formValues?.opening_balance || "",
            account_description: formValues?.account_description || "",
        },
        enableReinitialize: true,
        validate: (values) => {
            const errors: Partial<AccountDetailsFormValues> = {};

            if (!values.location_name) errors.location_name = "location name is required";
            if (!id && !values.sub_account_type) errors.sub_account_type = "Account type is required";
            if (!values.account_name) errors.account_name = "Account Name is required";
            if (!values.account_code) errors.account_code = "Account Code is required";
            if (!values.opening_balance) errors.opening_balance = "Opening Balance is required";
            if (!values.account_description) errors.account_description = "Account description is required";

            return errors;
        },
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const openingBalance = typeof values.opening_balance === 'string'
                    ? values.opening_balance.replace(/,/g, "")
                    : values.opening_balance;

                const { account_parent_id, account_parent_type, ...otherValues } = values;

                const finalValues = {
                    ...otherValues,
                    ...(typeof account_parent_id === 'number' ? { account_parent_id } : {}),
                    opening_balance: parseFloat(openingBalance),
                };

                if (!values.account_parent_id) {
                    delete finalValues.account_parent_id;
                }

                proceed(finalValues);

            } catch (error) {
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <p className="text-xl font-medium mb-2">Account Details</p>
                <p className="text-[14px] text-[#939292] mb-4">Kindly fill out your account information</p>

                {/* location_name Field */}
                <div className="w-full md:w-[32%] mb-5">
                    <label className="text-[15px] mb-2 block">Location</label>
                    <CustomSelect
                        options={
                            LocationList
                                ? LocationList?.data?.some((item: any) =>
                                    Object.keys(item).some((key) => key.endsWith("_name"))
                                )
                                    ? LocationList?.data
                                        ?.map((item: any) => {
                                            const nameKey = Object.keys(item).find((key) =>
                                                key.endsWith("_name")
                                            );
                                            return nameKey    ? { listItem: item[nameKey], value: item.id }  : null;
                                        })
                                        .filter(Boolean)
                                    : ["No sublist found"]
                                : [""]
                        }
                        name="location_name"
                        placeholder="Select a location"
                        className="review-filter"
                        enableEffect={!!id}
                        selectedLevel={formValues?.location_name}
                        selectedValue={formik.values.location_name}
                        handleDropdownChange={(selectedOption) => {
                            formik.setFieldValue("location_name", selectedOption?.listItem);
                        }}
                    />
                    {formik.errors.location_name && <div className="text-red-500 text-sm">{formik.errors.location_name}</div>}
                </div>

                {/* Parent Account Type Select */}
                <div className="w-full md:w-[32%] mb-5">
                    <label className="text-[15px] mb-2 block">Parent Account Type</label>
                    <CustomSelect
                        options={parentAccountType?.map((acc: any) => ({
                            listItem: acc.name,
                            value: acc.id ?? ""
                        })) || []}
                        name="account_parent_type"
                        placeholder="Select parent account type"
                        enableEffect={id ? true : false}
                        className="review-filter"
                        selectedValue={formik.values.account_parent_type}
                        handleDropdownChange={(selectedOption) => {
                            formik.setFieldValue("account_parent_type", selectedOption?.value);
                            setSelectedParentType(selectedOption?.value || null);
                        }}
                    />
                    {formik.errors.account_parent_type && <div className="text-red-500 text-sm">{formik.errors.account_parent_type}</div>}
                </div>

                {/* Account Type Select */}
                <div className="flex gap-4">
                    <div className="w-full md:w-[32%] mb-5">
                        <label className="text-[15px] mb-2 block">Account Type</label>
                        <CustomSelect
                            options={(Array.isArray(filteredAccountType) ? filteredAccountType : []).map((acc: any) => ({
                                listItem: acc.name,
                                value: acc.id ?? ""
                            }))}
                            name="sub_account_type"
                            placeholder="Select account type"
                            enableEffect={id ? true : false}
                            className="review-filter"
                            selectedValue={formik.values.sub_account_type}
                            handleDropdownChange={(selectedOption) => {
                                formik.setFieldValue("sub_account_type", selectedOption?.value);
                                setSelectedSubAccount(selectedOption?.listItem);
                            }}
                        />
                        {formik.errors.sub_account_type && <div className="text-red-500 text-sm">{formik.errors.sub_account_type}</div>}
                    </div>

                    <div className="w-full md:w-[32%] mb-5">
                        <label className="text-[15px] mb-2 block">Account Name</label>
                        <input
                            type="text"
                            name="account_name"
                            placeholder="Cash & Cash Equivalents"
                            className="block w-full rounded-[6px] border-0 h-[2.9rem] py-1.5 pr-2 pl-4 text-[14px] bg-[#fff] text-[#242424] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                            value={formik.values.account_name}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.account_name && <div className="text-red-500 text-sm">{formik.errors.account_name}</div>}
                    </div>
                </div>

                {/* Account Name and Code */}
                <div className="flex gap-4">
                    <div className="w-full md:w-[32%] mb-5">
                        <label className="text-[15px] mb-2 block">Account Code</label>
                        <input
                            type="text"
                            name="account_code"
                            placeholder="10000"
                            maxLength={5}
                            className="block w-full rounded-[6px] border-0 h-[2.9rem] py-1.5 pr-2 pl-4 text-[14px] bg-[#fff] text-[#242424] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                            value={formik.values.account_code}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.account_code && <div className="text-red-500 text-sm">{formik.errors.account_code}</div>}
                    </div>

                    {/* Sub-account Select */}
                    <div className="w-full md:w-[32%] mb-5">
                        <label className="text-[15px] mb-2 block">Sub-account (Optional)</label>
                        <CustomSelect
                            name="account_parent_id"
                            options={accounts?.map((acc: any) => ({
                                listItem: acc.name,
                                value: acc.id ?? ""
                            })) || []}
                            className="review-filter"
                            enableEffect={id ? true : false}
                            selectedValue={formik.values.account_parent_id}
                            handleDropdownChange={(selectedOption) => {
                                formik.setFieldValue("account_parent_id", selectedOption?.value);
                            }}
                            placeholder="Select sub-account"
                        />
                        {formik.errors.account_parent_id && <div className="text-red-500 text-sm">{formik.errors.account_parent_id}</div>}
                    </div>
                </div>

                {/* Opening Balance */}
                <div className="w-full md:w-[32%] mb-5">
                    <label className="text-[15px] mb-2 block">Opening Balance (USD)</label>
                    <input
                        type="text"
                        name="opening_balance"
                        placeholder="500,000"
                        className="block w-full rounded-[6px] border-0 h-[2.9rem] py-1.5 pr-2 pl-4 text-[14px] bg-[#fff] text-[#242424] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                        value={formik.values.opening_balance}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.opening_balance && <div className="text-red-500 text-sm">{formik.errors.opening_balance}</div>}
                </div>
                {/* Account account_Description */}
                <div className="w-full md:w-[68%] mb-5">
                    <label className="text-[15px] mb-2 block">Description</label>
                    <input
                        type="text"
                        name="account_description"
                        placeholder="Enter the account description"
                        className="block w-full rounded-[6px] border-0 h-[2.9rem] py-1.5 pr-2 pl-4 text-[14px] bg-[#fff] text-[#242424] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                        value={formik.values.account_description}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.account_description && <div className="text-red-500 text-sm">{formik.errors.account_description}</div>}
                </div>

                <div className="mt-12">
                    <button
                        type="submit"
                        className={'bg-foundation-purple-purple-400 border-none hover:bg-foundation-purple-purple-100 w-[32%] py-4 cursor-pointer text-foundation-white-white-400 rounded-[16px]'}
                        disabled={isLoading || formik.isSubmitting}
                    >
                        Proceed
                    </button>
                </div>
            </form>
        </>
    );
};

export default AccountDetails;
