"use client";
import CustomCheckbox from "@/components/reusable/CustomCheckbox";
import CustomCombobox from "@/components/reusable/CustomCombobox";
import CustomSelect from "@/components/reusable/CustomSelect";
import { commonCostOption, costTypeOption, location, subAccountOption, taxType } from "@/data/dropDownOption";
import { useModal } from "@/util/Modals/ModalsContext";
import SuccessModal from "./SuccessModal";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ReactNode, useState } from "react";
import { useChartOfAccount, useUpdateChartOfAccount } from "@/app/accounting/hooks/mutate";
import { AccountDetailsFormValues } from "@/app/accounting/accounting-list/add-account/page";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";


interface OptionalTabProps {
    formValues: AccountDetailsFormValues | null;
}

const OptionalTab: React.FC<OptionalTabProps> = ({ formValues }) => {
    const { mutate, isError } = useChartOfAccount();
    const { mutate: updateAccount } = useUpdateChartOfAccount();
    const { openModal } = useModal();

    const [isLoading, setIsLoading] = useState(false);
    const params = useSearchParams();
    const id: any = params.get("id");

    const [checkedState, setCheckedState] = useState({
        tax_line: false,
        audit_line: false,
        cost_line: false,
    });

    const handleCheckboxChange = (field: string) => (isChecked: boolean) => {
        setCheckedState((prevState) => ({
            ...prevState,
            [field]: isChecked,
        }));
    };

    const handleOpenSuccessModal = () => {
        openModal(<SuccessModal />);
    };

    const handleSubmit = (values: any) => {
        setIsLoading(true);

        if (id) {
            updateAccount({ id, data: values }, {
                onSuccess: (response) => {
                    if (response?.status === "success") {
                        toast.success("Account Edited successfully");
                    }
                },
                onError: (error) => {
                    console.error("Error while submitting data:", error);
                },
                onSettled: () => {
                    setIsLoading(false);
                }
            });
        } else {
            mutate(values, {
                onSuccess: (response) => {
                    if (response?.status === "success") {
                        toast.success(response.status);
                        handleOpenSuccessModal();
                    }
                },
                onError: (error) => {
                    console.error("Error while submitting data:", error);
                },
                onSettled: () => {
                    setIsLoading(false);
                }
            });
        }
    };

    const formik = useFormik({
        initialValues: {
            tax_type: formValues?.tax_type || '',
            tax_sub_account: formValues?.tax_sub_account || '',
            tax_account_name: formValues?.tax_account_name || '',
            tax_code: formValues?.tax_code || '',
            tax_description: formValues?.tax_description || '',
            audit_sub_account: formValues?.audit_sub_account || '',
            audit_account_name: formValues?.audit_account_name || '',
            audit_account_code: formValues?.audit_account_code || '',
            audit_description: formValues?.audit_description || '',
            cost_type: formValues?.cost_type || '',
            cost_sub_account: formValues?.cost_sub_account || '',
            common_cost_allocation_type: formValues?.common_cost_allocation_type || '',
            cost_description: formValues?.cost_description || '',
            tax_line: formValues?.tax_line || false,
            audit_line: formValues?.audit_line || false,
            cost_line: formValues?.cost_line || false,
        },
        validationSchema: Yup.object().shape({
            ...(checkedState.tax_line && {
                tax_type: Yup.string().required('Tax type is required'),
                tax_sub_account: Yup.string().required('Sub-account is required'),
                tax_account_name: Yup.string().required('Tax Account Name is required'),
                tax_code: Yup.string().required('Tax Code is required'),
                tax_description: Yup.string().required('Tax Account Description is required'),
            }),
            ...(checkedState.audit_line && {
                audit_sub_account: Yup.string().required('Audit Sub-account is required'),
                audit_account_name: Yup.string().required('Audit Account Name is required'),
                audit_account_code: Yup.string().required('Audit Account Code is required'),
                audit_description: Yup.string().required('Audit Account Description is required'),
            }),
            ...(checkedState.cost_line && {
                cost_type: Yup.string().required('Cost Type is required'),
                common_cost_allocation_type: Yup.string().required('Common Cost Allocation type is required'),
                cost_description: Yup.string().required('Cost Account Description is required'),
            }),
        }),
        onSubmit: (values) => {
            const finalValues = {
                ...values,
                ...(formValues ? formValues : {}),
                opening_balance: formValues ? Number(formValues.opening_balance) : 0,
                isDefault: true
            };
            handleSubmit(finalValues)
        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <p className="text-xl font-medium mb-2 mt-2">Tax, Audit & Cost Line Mapping</p>
                <p className="text-[14px] text-[#939292] mb-5">You can map your tax, audit & cost line to the respective accounts. </p>
                <span className="mr-4">
                    <CustomCheckbox
                        label="Tax Line"
                        checked={checkedState.tax_line}
                        onChange={handleCheckboxChange('tax_line')}
                    />
                </span>
                <div className="flex gap-4">
                    <div className="w-full md:w-[32%] mb-5">
                        <label className="text-[15px] mb-2 block">Tax Type</label>
                        <CustomSelect
                            options={taxType}
                            name="tax_type"
                            placeholder="Select tax type"
                            selectedValue={formik.values.tax_type}
                            className="review-filter"
                            handleDropdownChange={(selectedOption) => formik.setFieldValue('tax_type', selectedOption?.listItem)}
                            isDisabled={!checkedState.tax_line}
                            enableEffect={id ? true : false}
                        />
                        {formik.errors.tax_type && <div className="text-red-500 text-sm mt-2">{formik.errors.tax_type as ReactNode}</div>}
                    </div>
                    <div className="w-full md:w-[32%] mb-5">
                        <label className="text-[15px] mb-2 block">Sub-account</label>
                        <CustomCombobox
                            name="tax_sub_account"
                            sections={subAccountOption}
                            placeholder="Select account type"
                            handleDropdownChange={(selectedOption) => formik.setFieldValue('tax_sub_account', selectedOption?.listItem)}
                            isDisabled={!checkedState.tax_line}
                        />
                        {formik.errors.tax_sub_account && <div className="text-red-500 text-sm mt-2">{formik.errors.tax_sub_account as ReactNode}</div>}
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="w-full md:w-[32%] mb-5">
                        <label className="text-[15px] mb-2 block">Tax Account Name</label>
                        <input
                            type="text"
                            name="tax_account_name"
                            placeholder="Enter Account Name"
                            size={70}
                            value={formik.values.tax_account_name}
                            className={`block w-full rounded-[6px] border-0 h-[2.9rem] py-1.5 pr-2 pl-4 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none`}
                            onChange={formik.handleChange}
                            disabled={!checkedState.tax_line}
                        />
                        {formik.errors.tax_account_name && <div className="text-red-500 text-sm mt-2">{formik.errors.tax_account_name as ReactNode}</div>}
                    </div>

                    <div className="w-full md:w-[32%] mb-5">
                        <label className="text-[15px] mb-2 block">Tax Code</label>
                        <input
                            type="text"
                            name="tax_code"
                            placeholder="Enter Tax Code"
                            size={70}
                            value={formik.values.tax_code}
                            className={`block w-full rounded-[6px] border-0 h-[2.9rem] py-1.5 pr-2 pl-4 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none`}
                            onChange={formik.handleChange}
                            disabled={!checkedState.tax_line}
                        />
                        {formik.errors.tax_code && <div className="text-red-500 text-sm mt-2">{formik.errors.tax_code as ReactNode}</div>}
                    </div>
                </div>

                <div className="w-full md:w-[66%] mb-5">
                    <label className="text-[15px] mb-2 block">Tax Account Description</label>
                    <input
                        type="text"
                        name="tax_description"
                        placeholder="Enter account description"
                        size={70}
                        value={formik.values.tax_description}
                        className={`block w-full rounded-[6px] border-0 h-[2.9rem] py-1.5 pr-2 pl-4 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none`}
                        onChange={formik.handleChange}
                        disabled={!checkedState.tax_line}
                    />
                    {formik.errors.tax_description && <div className="text-red-500 text-sm mt-2">{formik.errors.tax_description as ReactNode}</div>}
                </div>

                <span className="mr-4">
                    <CustomCheckbox
                        label="Audit Line"
                        checked={checkedState.audit_line}
                        onChange={handleCheckboxChange('audit_line')}
                    />
                </span>

                <div className="w-full md:w-[32%] mb-5">
                    <label className="text-[15px] mb-2 block">Sub-account</label>
                    <CustomSelect
                        options={location}
                        name="audit_sub_account"
                        selectedLevel={formValues?.audit_sub_account}
                        placeholder="Select account type"
                        className="review-filter"
                        handleDropdownChange={(selectedOption) => formik.setFieldValue('audit_sub_account', selectedOption?.listItem)}
                        isDisabled={!checkedState.audit_line}
                        enableEffect={id ? true : false}
                    />
                    {formik.errors.audit_sub_account && <div className="text-red-500 text-sm mt-2">{formik.errors.audit_sub_account as ReactNode}</div>}
                </div>

                <div className="flex gap-4">
                    <div className="w-full md:w-[32%] mb-5">
                        <label className="text-[15px] mb-2 block">Audit Account Name</label>
                        <input
                            type="text"
                            name="audit_account_name"
                            value={formik.values.audit_account_name}
                            placeholder="Enter Account Name"
                            size={70}
                            className={`block w-full rounded-[6px] border-0 h-[2.9rem] py-1.5 pr-2 pl-4 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none`}
                            onChange={formik.handleChange}
                            disabled={!checkedState.audit_line}
                        />
                        {formik.errors.audit_account_name && <div className="text-red-500 text-sm mt-2">{formik.errors.audit_account_name as ReactNode}</div>}
                    </div>

                    <div className="w-full md:w-[32%] mb-5">
                        <label className="text-[15px] mb-2 block">Audit Account Code</label>
                        <input
                            type="text"
                            name="audit_account_code"
                            value={formik.values.audit_account_code}
                            placeholder="Enter Audit Code"
                            size={70}
                            className={`block w-full rounded-[6px] border-0 h-[2.9rem] py-1.5 pr-2 pl-4 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none`}
                            onChange={formik.handleChange}
                            disabled={!checkedState.audit_line}
                        />
                        {formik.errors.audit_account_code && <div className="text-red-500 text-sm mt-2">{formik.errors.audit_account_code as ReactNode}</div>}
                    </div>
                </div>

                <div className="w-full md:w-[66%] mb-5">
                    <label className="text-[15px] mb-2 block">Audit Account Description</label>
                    <input
                        type="text"
                        name="audit_description"
                        value={formik.values.audit_description}
                        placeholder="Enter account description"
                        size={70}
                        className={`block w-full rounded-[6px] border-0 h-[2.9rem] py-1.5 pr-2 pl-4 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none`}
                        onChange={formik.handleChange}
                        disabled={!checkedState.audit_line}
                    />
                    {formik.errors.audit_description && <div className="text-red-500 text-sm mt-2">{formik.errors.audit_description as ReactNode}</div>}
                </div>

                <span className="mr-4">
                    <CustomCheckbox
                        label="Cost Line"
                        checked={checkedState.cost_line}
                        onChange={handleCheckboxChange('cost_line')}
                    />
                </span>

                <div className="flex gap-4">
                    <div className="w-full md:w-[32%] mb-5">
                        <label className="text-[15px] mb-2 block">Cost Type</label>
                        <CustomCombobox
                            sections={costTypeOption}
                            name="cost_type"
                            placeholder="Cost Type"
                            handleDropdownChange={(selectedOption) => formik.setFieldValue('cost_type', selectedOption?.listItem)}
                            isDisabled={!checkedState.cost_line}
                        />
                        {formik.errors.cost_type && <div className="text-red-500 text-sm mt-2">{formik.errors.cost_type as ReactNode}</div>}
                    </div>
                    <div className="w-full md:w-[32%] mb-5">
                        <label className="text-[15px] mb-2 block">Sub-account</label>
                        <CustomCombobox
                            name="cost_sub_account"
                            sections={subAccountOption}
                            placeholder="Select account type"
                            handleDropdownChange={(selectedOption) => formik.setFieldValue('cost_sub_account', selectedOption?.listItem)}
                            isDisabled={!checkedState.cost_line}
                        />
                        {formik.errors.cost_sub_account && <div className="text-red-500 text-sm mt-2">{formik.errors.cost_sub_account as ReactNode}</div>}
                    </div>
                </div>

                <div className="w-full md:w-[32%] mb-5">
                    <label className="text-[15px] mb-2 block">Common Cost Allocation Type</label>
                    <CustomCombobox
                        sections={commonCostOption}
                        name="common_cost_allocation_type"
                        placeholder="Common Cost Allocation Type"
                        handleDropdownChange={(selectedOption) => formik.setFieldValue('common_cost_allocation_type', selectedOption?.listItem)}
                        isDisabled={!checkedState.cost_line}
                    />
                    {formik.errors.common_cost_allocation_type && <div className="text-red-500 text-sm mt-2">{formik.errors.common_cost_allocation_type as ReactNode}</div>}
                </div>

                <div className="w-full md:w-[66%] mb-5">
                    <label className="text-[15px] mb-2 block">Cost Account Description</label>
                    <input
                        type="text"
                        name="cost_description"
                        value={formik.values.cost_description}
                        placeholder="Enter account description"
                        size={70}
                        className={`block w-full rounded-[6px] border-0 h-[2.9rem] py-1.5 pr-2 pl-4 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none`}
                        onChange={formik.handleChange}
                        disabled={!checkedState.cost_line}
                    />
                    {formik.errors.cost_description && <div className="text-red-500 text-sm mt-2">{formik.errors.cost_description as ReactNode}</div>}
                </div>

                <div className="mt-12">
                    <button
                        type="submit"
                        className={'bg-foundation-purple-purple-400 border-none hover:bg-foundation-purple-purple-100 w-[32%] py-4 cursor-pointer text-foundation-white-white-400 rounded-[16px]'}
                        disabled={isLoading || formik.isSubmitting}
                    >
                        {isLoading ? "Processing..." : "Proceed"}
                    </button>
                </div>
            </form>
        </>
    );
};

export default OptionalTab;
