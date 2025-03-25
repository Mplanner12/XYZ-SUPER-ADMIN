"use client";
import { useCallback, useEffect } from "react";
import HeaderLayout from "@/components/MainLayouts/HeaderLayout";
import {
  BanknoteIcon,
  BrainIcon,
  CalendarClockIcon,
  CheckIcon,
  ChevronLeftIcon,
  CopyPlusIcon,
  CreditCardIcon,
  DeleteIcon,
  Ellipsis,
  EllipsisVertical,
  FileSearch2Icon,
  ListPlus,
  ListPlusIcon,
  MoveDownLeftIcon,
  PaperclipIcon,
  PencilIcon,
  PlusIcon,
  PrinterIcon,
  SaveIcon,
  X,
} from "lucide-react";
import React from "react";
import { useState } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import SideBar from "@/components/finance/receivables/SideBar";
import Dropdown from "@/components/reusable/DropDown";
import { Button as CustomButton } from '@/components/reusable/Button';
import { customerOptions, customerTaxCodeOptions, taxOptions } from "@/data/dropDownOption";
import { MultilineTextField, TextField } from "@/components/reusable/TextField";
import { useForm } from "react-hook-form";
import CreateInvoiceTable from "@/components/finance/receivables/CreateInvoiceTable";
import { Payment } from "@/components/finance/receivables/CreateInvoiceTable";
import { useAddInvoice } from "../../hooks/mutate";


const CreateInvoice = () => {
  const [more, setMore] = useState<number | null>(null) //more is groupID
  const [customer, setCustomer] = useState("");
  const [list, setList] = useState("");
  const [customerTaxCode, setCustomerTaxCode] = useState('')
  const [tax, setTax] = useState('')
  const [billTo, setBillTo] = useState('')
  const [shipTo, setShipTo] = useState('')
  const [frequencyType, setFrequencyType] = useState('')
  const [frequency, setFrequency] = useState('')
  const [numberOfPayment, setNumberOfPayment] = useState('')
  const [createGroup, setCreateGroup] = useState(false)
  const [viewGroup, setViewGroup] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const router = useRouter();
  const {control} = useForm()
  const [charge, setCharge] = useState<boolean>(false);
  const [action, setAction] = useState<boolean>(false);

  // API CALL
  const {mutate} = useAddInvoice()

  const show = (): void => {
    charge ? setCharge(false) : setCharge(true);
  };

  const group = (): void => {
    action ? setAction(false) : setAction(true);
  };
  const [activeTab, setActiveTab] = useState<number>(0);
  const [sideTab, setSideTab] = useState<number>(0);

  const side = ["Customer", "Transaction", "Automation"];

  // getting table data
  const [tableData, setTableData] = useState<Payment[]>([]);
  const handleTableDataUpdate = useCallback((data: Payment[]) => {
    setTableData(data);
  }, []);
  // const handleGetData = useCallback(() => {
  //   console.log('Current Table Data:', tableData);
  //   // You can perform any other operations with tableData here
  // }, [tableData]);

  useEffect(() => {
    if (activeTab === 1) {
      router.push("/finance/receivables/generate-invoice");
    }
    if (activeTab === 3) {
      router.push("/finance/receivables/receive-payments");
    }
    if (activeTab === 2) {
      router.push("/finance/receivables/credit-control");
    }
  }, [activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

  const tabs = [
    "Receivables Management",
    "Invoice Generation",
    "Receivable Credit Control",
    "Receive Payments",
  ];

  const createInvoice = () => {
    mutate({
      tableData
    })
  }
  function createData(
    product: string,
    description: string,
    quantity: number,
    uom: any,
    rate: number,
    amount: number,
    discount: number,
    tax: string
  ) {
    return { product, description, quantity, uom, rate, amount, discount, tax };
  }

  const rows = [createData("whmm", "hmm", 1, "wow", 1, 1, 1, "hmm")];

  const ResponsiveDatePickers = () => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={[
            "DatePicker",
            "MobileDatePicker",
            "DesktopDatePicker",
            "StaticDatePicker",
          ]}
        >
          {/* <DemoItem label=""> */}
          <DatePicker
            sx={{
              border: "0px solid #CACACA",
              padding: "1px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "4px",
                "& fieldset": {
                  borderColor: "#CACACA",
                },
                "&:hover fieldset": {
                  borderColor: "#CACACA",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#CACACA", // Remove border on focus
                },
                "& input": {
                  color: "#03191B99", // Set text color
                  height: "12px",
                },
              },
            }}
            className="rounded p-0 focus:outline-none"
          />
          {/* </DemoItem> */}
        </DemoContainer>
      </LocalizationProvider>
    );
  };

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
    <>
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

          {activeTab === 0 && (
            <>
              <div className="my-3">
                <div className="flex items-center">
                  <ChevronLeftIcon
                    onClick={() => {
                      router.push("/finance/receivables");
                    }}
                  />{" "}
                  <p className="text-xl font-medium">Create Invoice</p>
                </div>
              </div>

              <div className="text-[#8133F1] flex flex-wrap gap-5">
                <button className="flex gap-1">
                  Find <FileSearch2Icon size="16px" />
                </button>
                <button className="flex gap-1">
                  New <PlusIcon size="16px" />
                </button>
                <button className="flex gap-1">
                  Save <SaveIcon size="16px" />
                </button>
                <button className="flex gap-1">
                  Create a copy <CopyPlusIcon size="16px" />
                </button>
                <button className="flex gap-1">
                  Delete <DeleteIcon size="16px" />
                </button>
                <button className="flex gap-1">
                  Print <PrinterIcon size="16px" />
                </button>
                <button className="flex gap-1">
                  Attach file <PaperclipIcon size="16px" />
                </button>
              </div>

              <div className="text-[#8133F1] flex flex-wrap gap-5 my-5">
                <button className="flex gap-1">
                  Memorize <BrainIcon size="16px" />
                </button>
                <button className="flex gap-1">
                  Mark as Pending <CalendarClockIcon size="16px" />
                </button>
                <button className="flex gap-1">
                  Add Time & Costs <PlusIcon size="16px" />
                </button>
                <button className="flex gap-1">
                  Apply Credits <CreditCardIcon size="16px" />
                </button>
              </div>

              <div className="text-[#8133F1] flex flex-wrap gap-5 my-5">
                <button className="flex gap-1">
                  Receive Payments <MoveDownLeftIcon size="16px" />
                </button>
                <button className="flex gap-1">
                  Refund/Credit <BanknoteIcon size="16px" />
                </button>
                <button className="flex gap-1">
                  Create a Batch <ListPlusIcon size="16px" />
                </button>
              </div>

              <div className="border-b my-5 border-b-[#BCBBBB]"></div>
              {/* Main Cintents */}
              <main className="flex flex-wrap md:flex-nowrap gap-5">
                {/* Left Contents */}
                <div className="w-full md:w-4/6 leading-loose">
                  <p>XYZ Corporation</p>
                  <div className="mb-4">
                    <div className="flex gap-5">
                      <p>
                        Location: <span className="font-medium">NYC</span>
                      </p>
                      <p>
                        Currency: <span className="font-medium">USD</span>
                      </p>
                    </div>
                    <p>
                      Date: <span>May 31, 2024</span>
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Dropdown
                      placeholder="Select"
                      label="Prepared By"
                      options={customerOptions}
                      value={customer}
                      onChange={(value) => setCustomer(value)}
                      className="w-[170px] text-base"
                      buttonClassName="bg-white"
                      labelClassName="font-medium"
                    />
                    <Dropdown
                      label="Customer"
                      placeholder="Select Customer"
                      options={customerOptions}
                      value={customer}
                      onChange={(value) => setCustomer(value)}
                      className="w-[170px] text-base"
                      buttonClassName="bg-white"
                    />
                  </div>
                  <p className="font-medium text-lg my-3">Invoice</p>
                  <p className="text-xs">
                    09/26/2024{" "}
                    <span className="text-[#8133F1]">See history</span>{" "}
                  </p>

                  <div className="grid grid-cols-3 justify-start items-center gap-3 my-2">
                    <label className="grid grid-cols-2 items-center gap-1 mx-1">
                      Invoice Date
                      <ResponsiveDatePickers />
                    </label>
                    <label className="flex justify-start col-span-2 items-center gap-2 mx-1">
                      <span>Bill To</span>
                      <Dropdown
                        placeholder="Select Customer"
                        options={customerOptions}
                        value={billTo}
                        onChange={(value) => setBillTo(value)}
                        className="w-[170px] text-base"
                        buttonClassName="bg-white"
                      />
                      <MultilineTextField
                        name="billingAddress"
                        rows={2}
                        variant="short"
                        placeholder="431 Hampshire Blvd East Bayshore CA 94327"
                        control={control}
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-3 justify-start items-center gap-3 my-2">
                    <label className="grid grid-cols-2 items-center gap-1 mx-1">
                      Invoice No
                      <TextField
                        name="invoiceNumber"
                        placeholder="1234"
                        variant="xshort"
                        control={control}
                      />
                    </label>
                    <label className="flex justify- col-span-2 items-center gap-2 mx-1">
                      <span>Ship To</span>
                      <Dropdown
                        placeholder="Select Customer"
                        options={customerOptions}
                        value={shipTo}
                        onChange={(value) => setShipTo(value)}
                        className="w-[170px] text-base"
                        buttonClassName="bg-white"
                      />
                      <MultilineTextField
                        name="shipingAddress"
                        rows={2}
                        variant="short"
                        placeholder="431 Hampshire Blvd East Bayshore CA 94327"
                        control={control}
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-3 items-center gap-3 my-2">
                    <label className="grid grid-cols-2 items-center gap-1 mx-1">
                      Due Date
                      <ResponsiveDatePickers />
                    </label>
                    <div className="col-span-2"></div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-2">
                    <label className="grid grid-cols-2 items-center gap-1 mx-1">
                      Terms
                      <TextField
                        name="short"
                        placeholder="Customer XYZ"
                        variant="xshort"
                        control={control}
                      />
                    </label>
                    <div className="col-span-2"></div>
                  </div>

                  <main>
                    <CreateInvoiceTable onDataUpdate={handleTableDataUpdate} />

                    <div className="my-5">
                      <label className="text-[#8133F1] flex gap-2">
                        <input type="checkbox" name="" id="" />
                        Enable Online Payment
                      </label>
                      <div className="flex justify-between my-3">
                        <div className="leading-10">
                          <p>Tax Applied</p>
                          <p className="text-[#A4A8A7]">
                            Federal Sales Tax (7.5%)
                          </p>
                          <p className="text-[#A4A8A7]">State Tax (5%)</p>
                          <p className="flex text-[#8133F1] items-center gap-3">
                            Add Other Charges
                            <PlusIcon onClick={() => show()} />
                          </p>
                          <div className={` ${charge ? "block" : "hidden"} `}>
                            <div className="flex gap-3 items-center">
                              <select
                                name=""
                                id=""
                                className="border rounded-[8px] py-3 px-2 block border-[#BCBBBB] text-[#A4A8A7]"
                              >
                                <option value="">Delivery Charge</option>
                                <option value="">Service Charge</option>
                              </select>
                              <input
                                type="text"
                                className="block border focus:border-1 rounded-[8px] px-2 py-0.5 text-[#A4A8A7] focus:border-inherit outline-none"
                                placeholder="Net 30"
                              />
                              <X />
                            </div>
                            <button className="text-[#8133F1]">
                              Add More Charges
                            </button>
                          </div>
                        </div>

                        <div className="leading-10">
                          <div className="flex justify-between gap-1 lg:gap-20">
                            <label>Total Before Taxes</label> <p>5,653.50</p>
                          </div>
                          <div className="flex justify-between gap-1 lg:gap-20">
                            <label>Tax Amount</label>
                            <Dropdown
                              placeholder="San Tomas"
                              options={taxOptions}
                              value={tax}
                              onChange={(value) => setTax(value)}
                              className="w-[100px] text-base"
                              buttonClassName="bg-white"
                            />
                            <p>2,708.17</p>
                          </div>
                          <div className="flex justify-between gap-1 lg:gap-20">
                            <label>Other Charges</label> <p>10.00</p>
                          </div>
                          <div className="flex justify-between gap-1 lg:gap-20">
                            <label>Total</label> <p>8,351.67</p>
                          </div>
                          <div className="flex justify-between gap-1 lg:gap-20">
                            <label>Payment Applied</label> <p>8,361.67</p>
                          </div>
                          <div className="flex justify-between gap-1 lg:gap-20">
                            <label>Amount Due</label> <p>0.00</p>
                          </div>
                        </div>
                      </div>
                      <MultilineTextField
                        name="note"
                        label="Note From Customer"
                        rows={2}
                        variant="xlong"
                        placeholder="Great product"
                        control={control}
                      />
                      <div className="grid grid-cols-2 gap-5 w-2/3 mt-6">
                        <CustomButton
                          onClick={() => {
                            router.push(
                              "/finance/receivables/generate-invoice"
                            );
                          }}
                        >
                          Generate Invoice
                        </CustomButton>
                        <CustomButton variant="outlined">
                          Revert
                        </CustomButton>
                      </div>
                    </div>
                  </main>
                </div>
                {/* side bar */}
                <SideBar
                  side={side} sideTab ={sideTab} setSideTab={setSideTab} more={more} setMore={setMore} 
                  customer={customer} setCustomer={setCustomer} frequency ={frequency} setFrequency={setFrequency}
                  frequencyType={frequencyType} setFrequencyType={setFrequencyType} list={list} setList={setList}
                  numberOfPayment={numberOfPayment} setNumberOfPayment={setNumberOfPayment} createGroup={createGroup} 
                  setCreateGroup ={setCreateGroup} setViewGroup ={setViewGroup} setDeleteModal ={setDeleteModal}
                />
                {/* <div className="w-full md:w-1/4 my-3 leading-10">
                  <div className="flex justify-end gap-2 items-center">
                    <label> Customer:Job</label>
                    <select name="" id="" className="border rounded py-2 px-2">
                      <option value="">Select Customer</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2 items-center">
                    <label>List</label>
                    <select name="" id="" className="border rounded py-2 px-2">
                      <option value="">Remodel</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-3 justify-between border border-[#8133F1] rounded-[8px] text-[#8133F1] my-2 text-xs">
                    {side.map((tab, index) => (
                      <button
                        key={index}
                        onClick={() => setSideTab(index)}
                        className={`p-1 text-wrap ${
                          sideTab === index
                            ? "text-white bg-[#8133F1] rounded-[4px]"
                            : "text-[#8133F1]"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {sideTab === 0 && (
                    <>
                      <div>
                        <div className="">
                          <p className="flex justify-between text-lg">
                            Summary <PencilIcon className="text-[#8133F1]" />
                          </p>
                          <div className="flex justify-between gap-1 lg:gap-20">
                            <label>Phone</label> <p>555-3221-1111</p>
                          </div>
                          <div className="flex justify-between gap-1 lg:gap-20">
                            <label>Email</label> <p>ismith@samplename.com</p>
                          </div>
                          <div className="flex justify-between gap-1 lg:gap-20">
                            <label>Delivery Method</label> <p>Email</p>
                          </div>
                          <div className="flex justify-between gap-1 lg:gap-20">
                            <label>Open Balance</label> <p>12,897</p>
                          </div>
                          <div className="flex justify-between gap-1 lg:gap-20">
                            <label>Active Estimate</label> <p>3</p>
                          </div>
                          <div className="flex justify-between gap-1 lg:gap-20">
                            <label>Sales Order to be Invoiced</label> <p>0</p>
                          </div>
                          <div className="flex justify-between gap-1 lg:gap-20">
                            <label>Reimbursable Expenses</label> <p>172.50</p>
                          </div>
                        </div>

                        <div className="">
                          <p className="flex justify-between font-medium text-lg">
                            Customer Payment{" "}
                            <PencilIcon className="text-[#8133F1]" />
                          </p>
                          <div className="flex justify-between gap-1 lg:gap-20">
                            <label>Customer cannot pay Online</label> <p></p>
                          </div>
                        </div>

                        <div className="">
                          <p className="flex justify-between font-medium text-lg">
                            Recent Transaction{" "}
                          </p>
                          <div className="flex justify-between my-1 gap-1 lg:gap-20 text-xs">
                            <label>
                              25-05-2024{" "}
                              <span className="text-[#8133F1]">Payment</span>{" "}
                            </label>{" "}
                            <p>$10,000</p>
                          </div>
                          <div className="flex justify-between my-1 gap-1 lg:gap-20 text-xs">
                            <label>
                              25-05-2024{" "}
                              <span className="text-[#8133F1]">
                                Invoice Paid
                              </span>{" "}
                            </label>{" "}
                            <p>$10,000</p>
                          </div>
                        </div>

                        <div className="my-3">
                          <p className="flex justify-between font-medium text-lg">
                            Customer Payment{" "}
                            <PencilIcon className="text-[#8133F1]" />
                          </p>
                          <div className="flex justify-between">
                            <label>Customer can pay Online</label> <p></p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {sideTab === 1 && (
                    <>
                      <div>
                        <p className="flex justify-between font-medium text-lg">
                          Recent Transaction{" "}
                        </p>
                        <div className="flex justify-between my-1 gap-1 lg:gap-20 text-xs">
                          <label>
                            25-05-2024{" "}
                            <span className="text-[#8133F1]">Payment</span>{" "}
                          </label>{" "}
                          <p>$10,000</p>
                        </div>
                        <div className="flex justify-between my-1 gap-1 lg:gap-20 text-xs">
                          <label>
                            25-05-2024{" "}
                            <span className="text-[#8133F1]">Invoice Paid</span>{" "}
                          </label>{" "}
                          <p>$10,000</p>
                        </div>
                      </div>
                    </>
                  )}

                  {sideTab === 2 && (
                    <>
                      <div>
                        <p className="text-center text-lg">
                          Automate Invoice Generation
                        </p>

                        <div className="flex justify-between">
                          <label>Frequency Type</label>
                          <select
                            name=""
                            id=""
                            className="w-1/2 border rounded py-2 md:px-2 block border-[#BCBBBB] text-[#A4A8A7]"
                          >
                            <option value="">One Time</option>
                          </select>
                        </div>

                        <div className="flex justify-between my-2">
                          <label>Frequency</label>
                          <select
                            name=""
                            id=""
                            className="w-1/2 border rounded py-2 md:px-2 block border-[#BCBBBB] text-[#A4A8A7]"
                          >
                            <option value="">Daily</option>
                          </select>
                        </div>

                        <div className="flex justify-between items-center">
                          <label>Recurring Date</label>
                          <div className="w-1/2">
                            <ResponsiveDatePickers />
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <label>Number of Payments</label>
                          <input
                            type="text"
                            value=""
                            className="w-1/2 border my-2 outline-none rounded px-2 text-[#A4A8A7] focus:border-inherit"
                            placeholder="10"
                          />
                        </div>

                        <p className="text-lg">Groups Invoicing</p>
                        <button className="flex text-[#8133F1] items-center gap-1">
                          <PlusIcon />
                          <CreateGroupDialogs />
                        </button>

                        <p className="text-[#727171]">Groups (2)</p>
                        <div className="relative flex justify-between items-center">
                          <label>Seasoned Customers </label>
                          <EllipsisVertical onClick={() => group()} />
                          <div
                            className={`${
                              action ? "block" : "hidden"
                            } absolute mt-3 right-0 top-5 border-white shadow-xl bg-white text-[#575757] p-3 rounded-xl font-light leading-loose`}
                          >
                            <button className="flex gap-3 items-center">
                              Send Invoice
                            </button>
                            <button className="flex gap-3 items-center">
                              {" "}
                              <GroupMembersDialogs />{" "}
                            </button>
                            <button className="flex gap-3 items-center text-[#E00B2B]">
                              Delete
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <label>New Customers </label>
                          <EllipsisVertical />
                        </div>
                      </div>
                    </>
                  )}
                </div> */}
              </main>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateInvoice;
