"use client";
import React, { ChangeEvent } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderLayout from "@/components/MainLayouts/HeaderLayout";
import {
  CircleCheck,
  PaperclipIcon,
  PinIcon,
  Rabbit,
  RectangleEllipsis,
  X,
} from "lucide-react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { MultilineTextField, TextField } from "@/components/reusable/TextField";
import Dropdown from "@/components/reusable/DropDown";
import { Button as CustomButton } from '@/components/reusable/Button';
import { customerOptions } from "@/data/dropDownOption";
import { useForm } from "react-hook-form";
import CustomerDropdown from "@/components/reusable/CustomerDropDown";
import { useCustomerCreditLimitInformation, useCustomers, useEnum, useInvoices, useUsers } from "../../hooks/query";
import { useCreateCreditControl } from "../../hooks/mutate";
import CustomerSegmentDropdown from "@/components/reusable/CustomerSegmentDropDown";
import EmptyState from "@/components/reusable/EmptyState";
import { DateTime } from "@/components/reusable/DateTime";
import moment from "moment";

const CreditControl = () => {
  const [customer, setCustomer] = useState(""); //customer Id
  const [riskLevel, setRiskLevel] = useState('')
  const [status, setStatus] = useState('')
  const { control, getValues } = useForm();
  const [success, setSuccess] = useState(false)
  const [customerId, setcustomerId] = useState('')
  const [customerSegmentId, setCustomerSegmentId] = useState('')
  const router = useRouter();
  if (typeof window !== "undefined") {
    const businessId = localStorage.getItem('business_id')
  }

  const [activeTab, setActiveTab] = useState<number>(2);
  const [subTab, setSubTab] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [notifycustomer, setNotifycustomer] = useState(false)
  const [notifyAccountManager, setNotifyAccountManager] = useState(false)
  const [notifyFinanceDepartment, setNotifyFinanceDepartment] = useState(false)
  const [notifyCreditControlTeam, setNotifyCreditControlTeam] = useState(false)
  const [formCompletedBy, setFormCompletedBy] = useState('') // form completed by id

  // API CALL
  const {data:overdueInvoices, isPending} = useInvoices({
    id: customer,
    overdue_invoices: true,
  })
  const {data:customers, isPending:customerIsPending} = useCustomers({
    customer_id: '',
  })
  const {data:customerSegment} = useEnum({
    type: 'CUSTOMER_SEGMENT'
  })
  const {data:users} = useUsers({
    business_id : '1'
  })
  const {mutate:createCreditControlMutate} = useCreateCreditControl()
  
  const selectedCustomer = customers?.find((customerObject:any) => customerObject?.id == customer)
	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];
		setSelectedFile(file || null);
	};
  const {data:customerCreditLimitInformation} = useCustomerCreditLimitInformation({
    email: selectedCustomer?.email
  })

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    console.log(`New rating is: ${newRating}`);
  };

  useEffect(() => {
    if (activeTab === 0) {
      router.push("/finance/receivables");
    }
    if (activeTab === 1) {
      router.push("/finance/receivables/generate-invoice");
    }
    if (activeTab === 3) {
      router.push("/finance/receivables/receive-payments");
    }
  }, [activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

  const Prev = () => {
    if (subTab === 0) {
      setSubTab(0);
    } else if (subTab != 0) {
      setSubTab(subTab - 1);
    }
  };

  const Next = () => {
    if (subTab >= 0) {
      setSubTab(subTab + 1);
    } else if (subTab === 2) {
      setSubTab(2);
    }
  };

  const createCreditControl = () => {
    createCreditControlMutate({
      "customer": customer,
      "customer_segment": customerSegmentId,
      "account_manager": 0,
      "requested_credit_limit": Number(getValues('requestedCreditLimit')),
      "reason_for_credit_limit": getValues('reason'),
      "supporting_document": "string",
      "system_recommendation": 0,
      "override_recommendation": Number(getValues('overrideRecommendation')),
      "manager_recommendation": Number(getValues('managerRecommendation')),
      "approval_workflow": {
        approval_step: getValues('approvalStep'),
        status: status,
        comment: getValues('comment'),
      },
      "notify_account_manager": notifyAccountManager,
      "notify_credit_control_team": notifyCreditControlTeam,
      "notify_customer": notifycustomer,
      "notify_finance_department": notifyFinanceDepartment,
      "custom_notification_message": getValues('customNotificationMessage'),
      "attachement": "string",
      "date_of_submission": getValues('dateOfSubmission'),
      "form_completed_by": formCompletedBy,
      
      "created_at": moment(new Date()).format('YYYY-MM-DD HH:MM:SS'),
    })
  }

  const tabs = [
    "Receivables Management",
    "Create Invoice",
    "Receivable Credit Control",
    "Receive Payments",
  ];

  const subtabs = [
    "Credit Information",
    "Bad Debt Information",
    "Submission & Approval",
  ];

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const breadcrumbs = ["Admin Dashboard", "Finance Module"];
  return (
    <div className="h-[100vh] overflow-scroll no-scrollbar bg-[#FAFAFA]">
      <HeaderLayout
        moduleName="Finance Module"
        moduleLink="/finance/overview"
        page="Receivables Management"
        pageLink="/finance/receivables"
        breadcrumbs={breadcrumbs}
      />

      <div className="bg-secondary rounded-[16px] py-6 px-3 mt-4 sm:mx-6">
        <div className="bg-[#8133F1] p-3 flex gap-y-2 flex-wrap sm:flex-nowrap w-fit rounded-xl">
          {tabs.map((tab, index) => (
            <p
              key={index}
              onClick={() => setActiveTab(index)}
              className={`w-fit px-4 py-2 rounded-[8px] transition-colors duration-300 cursor-pointer inline-flex items-center ${
                activeTab === index ? "bg-white text-[#8133F1]" : "text-white"
              }`}
            >
              {tab}
            </p>
          ))}
        </div>

        {activeTab === 2 && (
          <>
            <main>
              <p className="font-medium text-lg my-3">
                Receivable Credit Control
              </p>

              <div className="grid grid-cols-3 md:w-3/5 justify-between border border-[#8133F1] rounded-[8px] text-[#8133F1] my-2">
                {subtabs.map((sub, index) => (
                  <button key={index}
                    className={`${
                      subTab === index
                        ? "text-white bg-[#8133F1]"
                        : "text-[#8133F1]"
                    }  px-2 py-3 rounded-lg`}
                    onClick={() => setSubTab(index)}
                  >
                    {sub}
                  </button>
                ))}
              </div>

              {subTab === 0 && (
                <>
                  <div>
                    <p className="text-lg font-medium text-[#A4A8A7] mt-6 mb-2">
                      New Credit Limit and Bad Debt Form
                    </p>
                    <div className="flex gap-3 my-2">
                      <CustomerDropdown
                        placeholder="Select Customer"
                        label="Customer Name"
                        options={customers}
                        value={customer}
                        onChange={(value) => setCustomer(value)}
                        className="w-[250px] text-base"
                        buttonClassName="bg-white"
                        labelClassName="font-medium"
                      />
                      <TextField
                        name="emailAddress"
                        label="Email Address"
                        placeholder="Customer XYZ"
                        font="medium"
                        type="email"
                        variant="medium"
                        value={selectedCustomer?.email}
                        control={control}
                      />
                    </div>
                    <div className="flex gap-3 my-2">
                      <Dropdown
                        placeholder="Select"
                        label="Account Manager"
                        options={customerOptions}
                        value={customer}
                        onChange={(value) => setCustomer(value)}
                        className="w-[250px] text-base"
                        buttonClassName="bg-white"
                        labelClassName="font-medium"
                      />
                      <CustomerSegmentDropdown
                        placeholder="Select"
                        label="Customer Segment"
                        options={customerSegment}
                        value={customerSegmentId}
                        onChange={(value) => setCustomerSegmentId(value)}
                        className="w-[250px] text-base"
                        buttonClassName="bg-white"
                        labelClassName="font-medium"
                      />
                    </div>

                    <p className="text-lg font-medium text-[#A4A8A7] mt-6 mb-2">
                      Credit Limit Information
                    </p>
                    <div className="w-full mx-auto overflow-x-auto no-scrollbar">
                      <table className="min-w-full bg-white border border-[#EAECF0]">
                        <thead className="font-semibold border border-[#EAECF0] shadow-sm">
                          <tr className="bg-[#FAFAFA] text-sm text-[#575757] ">
                            <th className="py-6 px-4 font-semibold text-nowrap text-left">
                              <p>Current Credit Limit (USD)</p>
                            </th>
                            <th className="py-2 px-4 font-semibold text-nowrap text-left">
                              <p>	Outstanding Balance (USD)</p>
                            </th>
                            <th className="py-2 px-4 font-semibold text-nowrap text-left">
                              <p>Average MonthlySales (USD)</p>
                            </th>
                            <th className="py-2 px-4 font-semibold text-nowrap text-left">
                              <p>Days Sales Outstanding (DSO):</p>
                            </th>
                            {/* <th className="py-2 px-4 font-semibold text-nowrap text-left">
                              <p>Credit Score</p>
                            </th> */}
                          </tr>
                        </thead>
                        <tbody className="bg-white text-sm divide-y divide-[#EAECF0]">
                          <tr
                            className="bg-white"
                          >
                            <td className="px-4 py-4 whitespace-nowrap">
                              {customerCreditLimitInformation?.current_credit_limit}
                            </td>
                            <td className={`px-5 py-4 whitespace-nowrap `}>
                              {customerCreditLimitInformation?.outstanding_balance}
                            </td>
                            <td className={`px-5 py-4 whitespace-nowrap`}>
                              {customerCreditLimitInformation?.average_monthly_sales}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              {customerCreditLimitInformation?.days_sales_outstanding}
                            </td>
                            {/* <td className="px-4 py-4 whitespace-nowrap">
                              <StarRating rating={rating} onRate={handleRatingChange} />
                            </td> */}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-lg font-medium text-[#A4A8A7] mt-6 mb-2">
                      New Credit Limit Request
                    </p>
                    <div className="w-full mx-auto overflow-x-auto no-scrollbar">
                      <table className="min-w-full bg-white border border-[#EAECF0]">
                        <thead className="font-semibold border border-[#EAECF0] shadow-sm">
                          <tr className="bg-[#FAFAFA] text-sm text-[#575757] ">
                            <th className="py-6 px-4 font-semibold text-nowrap text-left">
                              <p>Requested Credit Limit (USD)</p>
                            </th>
                            <th className="py-2 px-4 font-semibold text-nowrap text-left">
                              <p>Reason for Credit Limit Change</p>
                            </th>
                            <th className="py-2 px-4 font-semibold text-nowrap text-left">
                              <p>Supporting Document</p>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white text-sm divide-y divide-[#EAECF0]">
                          <tr
                            className="bg-white"
                          >
                            <td className="px-4 py-4 whitespace-nowrap">
                              <TextField 
                                name="requestedCreditLimit"
                                placeholder="200000"
                                variant="short"
                                control={control}
                              />
                            </td>
                            <td className={`px-5 py-4 whitespace-nowrap `}>
                              <MultilineTextField
                                name="reason"
                                placeholder="Expansion of business operations"
                                rows={1}
                                variant="medium"
                                control={control}
                              />
                            </td>
                            <td className={`px-5 py-4 whitespace-nowrap`}>
                              <input type="file" onChange={handleFileChange} /> 
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-lg font-medium text-[#A4A8A7] mt-6 mb-2">
                      Credit Limit Recommendations
                    </p>
                    <div className="w-full mx-auto overflow-x-auto no-scrollbar">
                      <table className="min-w-full bg-white border border-[#EAECF0]">
                        <thead className="font-semibold border border-[#EAECF0] shadow-sm">
                          <tr className="bg-[#FAFAFA] text-sm text-[#575757] ">
                            <th className="py-6 px-4 font-semibold text-nowrap text-left">
                              <p>System Recommendation (USD)</p>
                            </th>
                            <th className="py-2 px-4 font-semibold text-nowrap text-left">
                              <p>Override Recommendation</p>
                            </th>
                            <th className="py-2 px-4 font-semibold text-nowrap text-left">
                              <p>Manager Recommendation</p>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white text-sm divide-y divide-[#EAECF0]">
                          <tr
                            className="bg-white"
                          >
                            <td className="px-4 py-4 whitespace-nowrap">
                              200000
                            </td>
                            <td className={`px-5 py-4 whitespace-nowrap `}>
                              <TextField 
                                name="overrideRecommendation"
                                placeholder="Enter Amount"
                                variant="short"
                                control={control}
                              />
                            </td>
                            <td className={`px-5 py-4 whitespace-nowrap`}>
                              <MultilineTextField
                                name="managerRecommendation"
                                placeholder="Approve increase to $200,000"
                                rows={1}
                                variant="medium"
                                control={control}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex justify-between my-5">
                    <button
                      disabled
                      className="px-5 py-3 border rounded-lg text-[#939292]"
                      onClick={() => Prev()}
                    >
                      Prev
                    </button>
                    <button
                      className="px-5 py-3 border rounded-lg text-white bg-[#8133F1]"
                      onClick={() => Next()}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}

              {subTab === 1 && (
                <>
                  <div>
                    <p className="text-lg font-medium text-[#A4A8A7] mt-6 mb-2">
                      Outstanding Debt Details
                    </p>
                    <div className="my-2">
                      <TextField
                        name="totalOverdueAmount"
                        label="Total Overdue Amount"
                        placeholder="customer@gmail.com"
                        font="medium"
                        type="email"
                        variant="medium"
                        value={selectedCustomer?.debt}
                        control={control}
                      />
                    </div>

                    <p className="text-lg font-medium text-[#A4A8A7] mt-6 mb-2">
                      Overdue Invoices
                    </p>
                    <div className="w-full mx-auto overflow-x-auto no-scrollbar">
                      {overdueInvoices?.length > 0 ? ( 
                      <table className="min-w-full bg-white border border-[#EAECF0]">
                        <thead className="font-semibold border border-[#EAECF0] shadow-sm">
                          <tr className="bg-[#FAFAFA] text-sm text-[#575757] ">
                            <th className="py-6 px-4 font-semibold text-nowrap text-left">
                              <p>Invoice Number</p>
                            </th>
                            <th className="py-2 px-4 font-semibold text-nowrap text-left">
                              <p>Due Date</p>
                            </th>
                            <th className="py-2 px-4 font-semibold text-nowrap text-left">
                              <p>Amount  (USD)</p>
                            </th>
                            <th className="py-2 px-4 font-semibold text-nowrap text-left">
                              <p>Status</p>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white text-sm divide-y divide-[#EAECF0]">
                          {overdueInvoices?.map((overdueInvoice:any)=>(
                            <tr key={overdueInvoice?.id} className="bg-white">
                              <td className="px-4 py-4 whitespace-nowrap">
                                {overdueInvoice?.invoice_no} 
                              </td>
                              <td className={`px-5 py-4 whitespace-nowrap `}>
                                {<DateTime dateString = {overdueInvoice?.due_date} />}
                              </td>
                              <td className={`px-5 py-4 whitespace-nowrap`}>
                                {overdueInvoice?.amount_due}
                              </td>
                              <td className={`px-5 py-4 whitespace-nowrap`}>
                                {overdueInvoice?.status}
                              </td>
                            </tr>
                          ))}
                          
                        </tbody>
                      </table>
                      ) : (
                        <EmptyState
                          img={
                            <Rabbit
                              size={150}
                              className="text-primary-normal p-1 rounded-lg"
                            />
                          }
                          title={`No Record Found`}
                          text={`Oops! It seems that there is no record matching your search`}
                        />
                      )}
                    </div>

                    <p className="text-lg font-medium text-[#A4A8A7] mt-6 mb-2">
                      Bad Debt Assessment
                    </p>
                    <div className="w-full mx-auto overflow-x-auto">
                      <table className="min-w-full bg-white border border-[#EAECF0]">
                        <thead className="font-semibold border border-[#EAECF0] shadow-sm">
                          <tr className="bg-[#FAFAFA] text-sm text-[#575757] ">
                            <th className="py-6 px-4 font-semibold text-nowrap text-left">
                              <p>Bad Debt Risk Level</p>
                            </th>
                            <th className="py-2 px-4 font-semibold text-nowrap text-left">
                              <p>Reason for Bad Debt Assessment</p>
                            </th>
                            <th className="py-2 px-4 font-semibold text-nowrap text-left">
                              <p>Previous Collection Actions</p>
                            </th>
                            <th className="py-2 px-4 font-semibold text-nowrap text-left">
                              <p>Proposed Collection Actions</p>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white text-sm divide-y divide-[#EAECF0]">
                          <tr
                            className="bg-white"
                          >
                            <td className="px-4 py-4 whitespace-nowrap">
                              <Dropdown
                                placeholder="Select"
                                options={levelOptions}
                                value={riskLevel}
                                onChange={(value) => setRiskLevel(value)}
                                className="w-[110px] text-base"
                                buttonClassName="bg-white"
                                labelClassName="font-medium"
                              />
                              </td>
                            <td className={`px-5 py-4 whitespace-nowrap `}>
                              <MultilineTextField
                                name="reasonForBadDebt"
                                placeholder="Expansion of business operations"
                                variant="medium"
                                rows={1}
                                control={control}
                              />
                            </td>
                            <td className={`px-5 py-4 whitespace-nowrap `}>
                              <MultilineTextField
                                name="previousCollectionActions"
                                placeholder="Sent reminder emails on 2024-05-15, 2024-06-15, and 2024-07-01"
                                variant="medium"
                                rows={1}
                                control={control}
                              />
                            </td>
                            <td className={`px-5 py-4 whitespace-nowrap `}>
                              <MultilineTextField
                                name="proposedCollectionActions"
                                placeholder="Initiate phone calls for payment arrangements"
                                variant="medium"
                                rows={1}
                                control={control}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="flex justify-between my-5">
                      <button
                        className="px-5 py-3 border rounded-lg border-[#8133F1] text-[#8133F1]"
                        onClick={() => Prev()}
                      >
                        Prev
                      </button>
                      <button
                        className="px-5 py-3 border rounded-lg text-white bg-[#8133F1]"
                        onClick={() => Next()}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              )}

              {subTab === 2 && (
                <>
                  <div>
                    <p className="text-lg text-[#A4A8A7] font-medium mt-6 mb-2">
                      Approval Workflow
                    </p>
                    <div className="w-full mx-auto overflow-x-auto">
                      <table className="min-w-full bg-white border border-[#EAECF0]">
                        <thead className="font-semibold border border-[#EAECF0] shadow-sm">
                          <tr className="bg-[#FAFAFA] text-sm text-[#575757] ">
                            <th className="py-6 px-4 font-semibold text-nowrap text-left">
                              <p>Approval Step</p>
                            </th>
                            <th className="py-2 px-4 font-semibold text-nowrap text-left">
                              <p>Status</p>
                            </th>
                            <th className="py-2 px-4 font-semibold text-nowrap text-left">
                              <p>Comment</p>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white text-sm divide-y divide-[#EAECF0]">
                          <tr
                            className="bg-white"
                          >
                            <td className="px-4 py-4 whitespace-nowrap">
                              <MultilineTextField
                                name="approvalStep"
                                placeholder="Initial Review by Account Manager"
                                variant="medium"
                                rows={1}
                                control={control}
                              />
                            </td>
                            <td className={`px-5 py-4 whitespace-nowrap `}>
                              <Dropdown
                                placeholder="Select"
                                options={statusOptions}
                                value={status}
                                onChange={(value) => setStatus(value)}
                                className="w-[110px] text-base"
                                buttonClassName="bg-white"
                                labelClassName="font-medium"
                              />
                            </td>
                            <td className={`px-5 py-4 whitespace-nowrap `}>
                              <MultilineTextField
                                name="comment"
                                placeholder="Reviewed, supportive"
                                variant="medium"
                                rows={1}
                                control={control}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="space-y-2">
                      <p className="text-lg text-[#A4A8A7] font-medium mt-6 mb-2">
                        Automated Notifications
                      </p>
                      <label className="flex gap-3">
                        <input type="checkbox" className="outline-none" 
                          onChange={(e:any) => setNotifyAccountManager(e.target.checked)}
                        />
                        Notify Account Manager
                      </label>
                      <label className="flex gap-3">
                        <input type="checkbox" className="outline-none" 
                          onChange={(e:any)=> setNotifycustomer(e.target.checked)}
                        />
                        Notify Customer
                      </label>
                      <label className="flex gap-3">
                        <input type="checkbox" className="outline-none" 
                          onChange={(e:any)=> setNotifyCreditControlTeam(e.target.checked)}
                        />
                        Notify Credit Control Team
                      </label>
                      <label className="flex gap-3">
                        <input type="checkbox" className="outline-none" 
                          onChange={(e:any) => setNotifyFinanceDepartment(e.target.checked)}
                        />
                        Notify Finance Department
                      </label>
                    </div>

                    <div>
                      <p className="text-lg text-[#A4A8A7] font-medium mt-6 mb-2">
                        Custom Notification Message
                      </p>
                      <MultilineTextField
                        name="customNotificationMessage"
                        rows={5}
                        variant="xlong"
                        placeholder="Dear ABC Corporation, your credit limit increase request has been approved. Please ensure timely payments to maintain your credit status. Thank you sender_name"
                        control={control}
                      />
                      <div className="bg-[#F0F0F0] w-min p-3 my-2 flex items-center">
                        Invoice.pdf <X />
                      </div>

                      <div className="flex justify-between md:w-2/3">
                        <div className="flex items-center gap-3">
                          <button> A </button>
                          <button>
                            {" "}
                            <PaperclipIcon color="#8133F1" />{" "}
                          </button>
                          <button>
                            {" "}
                            <PinIcon />{" "}
                          </button>
                          <button>
                            {" "}
                            <RectangleEllipsis />{" "}
                          </button>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-[120px]">
                            <CustomButton fullWidth variant='outlined' >
                              Cancel
                            </CustomButton>
                          </div>
                          <div className="w-[170px]">
                            <CustomButton fullWidth>
                              Save Message
                            </CustomButton>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-lg text-[#A4A8A7] font-medium mt-6 mb-2">
                          Submission
                        </p>
                        <div className="flex gap-3">
                          <CustomerDropdown
                            placeholder="Select"
                            label="Form Completed By"
                            options={customers}
                            value={formCompletedBy}
                            onChange={(value) => setFormCompletedBy(value)}
                            className="w-[250px] text-base"
                            buttonClassName="bg-white"
                            labelClassName="font-medium"
                          />
                          <TextField
                            name="dateOfSubmission"
                            label="Date of Submission"
                            placeholder="Customer XYZ"
                            font="medium"
                            type="date"
                            variant="medium"
                            control={control}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between my-5">
                      <button
                        className="px-5 py-3 border rounded-[16px] border-[#8133F1] text-[#8133F1]"
                        onClick={() => Prev()}
                      >
                        Prev
                      </button>
                      {/* <button className='px-5 py-3 border rounded-lg text-white bg-[#8133F1]'>Submit</button> */}
                      <Button
                        variant="outlined"
                        onClick={()=> setSuccess(!success)}
                        className="px-10 py-3 bg-[#8133F1] text-white rounded-[16px] border hover:bg-[#8133F1]"
                        sx={{ textTransform: "none" }}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </main>
          </>
        )}
      </div>
      {success && (
        <div className="flex justify-center items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
        <div className='relative mb-10'>
          <button className=" bg-white h-10 absolute z-50 -top-12 -right-10 text-gray-500 hover:text-gray-700 cursor-pointer w-10 justify-center items-center mx-auto flex rounded-full"
            onClick={()=>{setSuccess(!success)}}
          >
            <X className='text-primary-normal' />
          </button>
          <div className="w-fit max-h-[95%] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll no-scrollbar px-[50px] py-6 ">
            <div className="flex justify-center my-5 mt-20">
              <CircleCheck color="green" size="15%" />
            </div>
            <div className="flex justify-center my-10">
              <p className="max-w-[300px] text-center text-lg font-light">
                New Credit Limit and Bad Debt Form Submission is successful
              </p>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

const levelOptions = [
  {label:'High', value:'high'},
  {label:'Medium', value:'high'},
  {label:'low', value:'high'},
]
const statusOptions = [
  {label:'Approved', value:'high'},
  {label:'Rejected', value:'high'},
  {label:'Pending', value:'high'},
]

export default CreditControl;
