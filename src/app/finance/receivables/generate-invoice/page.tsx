"use client";
import {
  BadgeCheckIcon,
  BanknoteIcon,
  BrainIcon,
  CalendarClockIcon,
  CircleCheck,
  CopyPlusIcon,
  CreditCardIcon,
  DeleteIcon,
  FileSearch2Icon,
  ListPlusIcon,
  MoveDownLeftIcon,
  PaperclipIcon,
  Plus,
  PlusIcon,
  PrinterIcon,
  SaveIcon,
  X,
} from "lucide-react";
import React, { useCallback, useEffect, ChangeEvent } from "react";
import { useState } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useRouter, useSearchParams } from "next/navigation";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import HeaderLayout from "@/components/MainLayouts/HeaderLayout";
import SideBar from "@/components/finance/receivables/SideBar";
import { useForm } from "react-hook-form";
import { MultilineTextField, TextField } from "@/components/reusable/TextField";
import Dropdown from "@/components/reusable/DropDown";
import { Button as CustomButton } from '@/components/reusable/Button';
import { taxOptions } from "@/data/dropDownOption";
import Image from "next/image";
import CreateInvoiceTable from "@/components/finance/receivables/CreateInvoiceTable";
import { Payment } from "@/components/finance/receivables/CreateInvoiceTable";
import { useAddInvoice } from "../../hooks/mutate";
import { useCustomers, useEnum, useEnumTypes, useEstimates, useTaxes } from "../../hooks/query";
import { v4 as uuidv4 } from 'uuid';
import LoadingOverlay from "@/components/reusable/LoadingOverlay";
import CustomerDropdown from "@/components/reusable/CustomerDropDown";
import moment from "moment";

interface Charge {
  type: string;
  amount: string;
}

const GenerateInvoice = () => {
  const [more, setMore] = useState<number | null>(null) //more is groupID
  const searchParams = useSearchParams();
  const initialMenu = searchParams.get('invoiceDelivery');
  const initialOpen = searchParams.get('openPaymentReminder');
  const [invoiceDelivery, setInvoiceDelivery] = useState(initialMenu ? true : false)
  const [paymentReminder , setPaymentReminder ] = useState(initialOpen ? true : false)
  const [paymentReminderSuccess, setPaymentReminderSuccess] = useState(false)
  const [list, setList] = useState(""); 
  const [tax, setTax] = useState('') //tax id
  const [customer, setCustomer] = useState(''); // Customer Id
  const [customerId, setcustomerId] = useState('')
  const [preparedBy, setPreparedBy] = useState('') // Customer Id
  const [billTo, setBillTo] = useState('') // Customer Id
  const [shipTo, setShipTo] = useState('') // Customer Id
  const [frequencyType, setFrequencyType] = useState('')
  const [frequency, setFrequency] = useState('')
  const [numberOfPayment, setNumberOfPayment] = useState('')
  const [createGroup, setCreateGroup] = useState(false)
  const [viewGroup, setViewGroup] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [success, setSuccess] = useState(false)
  const [enableOnlinePayment, setEnableOnlinePayment] = useState(false)
  const [location, setLocation] = useState('')
  const [currency, setCurrency] = useState('')
  const [page, setPage] = useState<number>(1)
  const router = useRouter();
  const {control, getValues} = useForm()
  // console.log(customer)

  // API CALL
  const {mutate:createInvoiceMutate, isPending:createInvoiceIsPending, isSuccess} = useAddInvoice()
  const {data:enumTypes} = useEnumTypes()
  const {data:taxes, isPending:taxesIsPending} = useTaxes()
  const {data:enumByType} = useEnum({
    type: 'PAYMENT'
  })
  const {data:estimates} = useEstimates()
  const {data:customers, isPending:customerIsPending} = useCustomers({
    customer_id: customerId,
  })

  const billToCustomer = customers?.find((customer:any)=> customer?.id == billTo)
  const shipToCustomer = customers?.find((customer:any)=> customer?.id == shipTo)
  const selectedTax = taxes?.find((taxObject:any)=> taxObject?.id == tax)
  const selectedCustomer = customers?.find((customerObject:any)=> customerObject?.id == customer)

  const [activeTab, setActiveTab] = useState<number>(1);
  const [sideTab, setSideTab] = useState<number>(0);
  const [charges, setCharges] = useState<Charge[]>([{ type: '', amount: '' }]);
  const [charge, setCharge] = useState<boolean>(false);

  // getting table data
  const [tableData, setTableData] = useState<Payment[]>([]);
  const handleTableDataUpdate = useCallback((data: Payment[]) => {
    setTableData(data);
  }, []);

  // CONSOLE
  // console.log(tableData)
  // console.log(selectedTax)

  // getting Charges data
  const addCharge = () => {
    setCharges([...charges, { type: '', amount: '' }]);
  };
  const removeCharge = (index: number) => {
    const newCharges = charges.filter((_, i) => i !== index);
    setCharges(newCharges);
  };
  const updateCharge = (index: number, field: keyof Charge, value: string) => {
    const newCharges = charges.map((charge, i) => {
      if (i === index) {
        return { ...charge, [field]: value };
      }
      return charge;
    });
    setCharges(newCharges);
  };

  const [action, setAction] = useState<boolean>(false);

  const [isChecked, setIsChecked] = useState(false);
  const [cc, setCc] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const Cc = (): void => {
    cc ? setCc(false) : setCc(true);
  };

  const group = (): void => {
    action ? setAction(false) : setAction(true);
  };

  useEffect(() => {
    if (activeTab === 0) {
      router.push("/finance/receivables");
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
    "Create Invoice",
    "Receivable Credit Control",
    "Receive Payments",
  ];

  const side = ["Customer", "Transaction", "Automation"];

  const generateInvoice = () =>{
    const other_charges = charges.reduce((acc:any, obj) => {
      const [key, value] = Object.entries(obj)[0];
      acc[key] = String(value);
      return acc;
    }, {});
    createInvoiceMutate({
      "location": "string",  
      "currency": "string", // make the ui a drop down
      "date": getValues('date'),

      "prepared_by": preparedBy,
      "customer": customer,
      "invoice_date": getValues('invoiceDate'),
      "bill_to": billToCustomer?.id,
      "invoice_no": getValues('invoiceNumber'),
      "ship_to": billToCustomer?.id,
      "due_date": getValues('dueDate'),
      "terms": getValues('terms'),
      "payment_status": 0,
      products: tableData,
      "online_payment": enableOnlinePayment,

      "federal_tax": 0, //the two is tax_applied
      "state_tax": 0,
      "total_before_taxes": 0,
      "tax_amount": 0,
      "tax_location": "string",
      other_charges,
      "total_after_taxes": 0,
      "payment_applied": 0, // where is payment applied coming from
      "amount_due": 0,
      note_from_customer: getValues("noteFromCustomer"),
      
      "customer_job": "string",
      "list": "string",
      "phone": "string",
      "email": "string",
      "delivery_method": 0,
      "open_balance": 0,
      "active_estimate": [
        0
      ],
      "sales_order_to_be_invoiced": [
        "string"
      ],
      "reimbursable_expenses": 0,

      "notes": "string",
      "outstanding_days": 0,

      "updated_at": moment(new Date()).format('YYYY-MM-DD HH:MM:SS'),
      "created_at": moment(new Date()).format('YYYY-MM-DD HH:MM:SS')
    },
    {
      onSuccess:()=>{
        setSuccess(!success)
      }
    })

  }

  const sendInvoiceDelivery = () => {
    setPaymentReminder(!paymentReminder)
  }
  const sendPaymentReminder = () => {
    setPaymentReminderSuccess(!paymentReminderSuccess)
  }

  const removeGroupName = (nameToRemove: any) => {
    
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

  const rows = [createData("prepping", "slab", 1, null, 512, 512, 0.0, "Non")];

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

  function TimePickerValue() {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["TimePicker", "TimePicker"]}>
          <TimePicker defaultValue={dayjs("2022-04-17T15:30")} />
        </DemoContainer>
      </LocalizationProvider>
    );
  }

  const breadcrumbs = ["Admin Dashboard", "Finance Module"];

  return (
    <>
      { (createInvoiceIsPending || customerIsPending ) && <LoadingOverlay/> }
      <div className="h-[100vh] overflow-scroll bg-[#FAFAFA]">
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

          {activeTab === 1 && (
            <>
              <div className="my-3">
                <div className="flex items-center">
                  <p className="text-xl font-medium">Invoice Generation</p>
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
                {/* Right Contents */}
                <div className="w-full md:w-4/6 leading-loose">
                  <p>XYZ Corporation</p>

                  <div className="mb-4">
                    <div className="flex gap-5">
                      <div className="flex items-center gap-x-4">
                        Location: 
                        <Dropdown
                          placeholder="Tax"
                          options={taxOptions}
                          value={location}
                          onChange={(value) => setLocation(value)}
                          className="w-[100px] text-base"
                          buttonClassName="bg-white"
                        />
                      </div>
                      <div className="flex items-center gap-x-4">
                        Currency:
                        <Dropdown
                          placeholder="currency"
                          options={taxOptions}
                          value={currency}
                          onChange={(value) => setCurrency(value)}
                          className="w-[100px] text-base"
                          buttonClassName="bg-white"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-x-4">
                      Date: 
                      <TextField
                        name="date"
                        font="medium"
                        type="date"
                        variant="long"
                        control={control}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <CustomerDropdown
                      placeholder="Select"
                      label="Prepared By"
                      options={customers}
                      value={preparedBy}
                      onChange={(value) => setPreparedBy(value)}
                      className="w-[340px] text-base"
                      buttonClassName="bg-white"
                      labelClassName="font-medium"
                    />
                    <CustomerDropdown
                      placeholder="Select Customer"
                      label="Customer"
                      options={customers}
                      value={customer}
                      onChange={(value) => setCustomer(value)}
                      className="w-[340px] text-base"
                      buttonClassName="bg-white"
                    />
                  </div>
                  <p className="font-medium text-lg my-3">Invoice</p>
                  <p className="text-xs flex gap-3 items-center">
                    {/* <span className='flex items-center text-[#3DB5E6] gap-1'> <BadgeCheckIcon/> Partial Payment</span>
                        <span className='flex items-center text-[#E00B2B] gap-1'> <BadgeCheckIcon/> Not Paid</span> */}
                    <span className="flex items-center text-[#00A814] gap-1">
                      {" "}
                      <BadgeCheckIcon /> Paid
                    </span>
                    {getValues('date')}
                    <span className="text-[#8133F1]">See history</span>
                  </p>

                  <div className="grid grid-cols-3 justify-start items-center gap-3 my-2">
                    <label className="grid grid-cols-2 items-center gap-1 mx-1">
                      Invoice Date
                      <TextField
                        name="invoiceDate"
                        font="medium"
                        type="date"
                        variant="xshort"
                        control={control}
                      />
                    </label>
                    <div className="flex justify-start col-span-2 items-center gap-2 mx-1">
                      <span>Bill To</span>
                      <CustomerDropdown
                        placeholder="Select Customer"
                        options={customers}
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
                        value={billToCustomer?.street_address}
                        control={control}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 justify-start items-center gap-3 my-2">
                    <div className="grid grid-cols-2 items-center gap-1 mx-1">
                      Invoice No
                      <TextField
                        className="invoiceNumber"
                        name="short"
                        placeholder="INV-1001"
                        variant="xshort"
                        control={control}
                      />
                    </div>
                    <div className="flex justify- col-span-2 items-center gap-2 mx-1">
                      <span>Ship To</span>
                      <CustomerDropdown
                        placeholder="Select Customer"
                        options={customers}
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
                        value={shipToCustomer?.street_address}
                        control={control}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 items-center gap-3 my-2">
                    <label className="grid grid-cols-2 items-center gap-1 mx-1">
                      Due Date
                      <TextField
                        name="dueDate"
                        font="medium"
                        type="date"
                        variant="xshort"
                        control={control}
                      />
                    </label>
                    <div className="col-span-2"></div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="grid grid-cols-2 items-center gap-1 mx-1">
                      Terms
                      <TextField
                        name='terms'
                        placeholder="Customer XYZ"
                        variant="xshort"
                        control={control}
                      />
                    </div>
                    <div className="col-span-2"></div>
                  </div>

                  <main>
                    <div className="w-full">
                      {/* <InvoiceTable /> */}
                      <CreateInvoiceTable onDataUpdate={handleTableDataUpdate} />
                    </div>

                    <div className="my-5">
                      <label className="text-[#8133F1] flex items-center gap-2">
                        <input type="checkbox" checked={enableOnlinePayment} onChange={(e:any) => setEnableOnlinePayment(e.target.checked)} />
                        Enable Online Payment
                      </label>

                      <div className="flex justify-between my-3">
                        <div className="leading-10">
                          <p>Tax Applied</p>
                          {selectedTax && <>
                          <p className="text-[#A4A8A7]">
                            Federal Sales Tax ({selectedTax?.federal}%)
                          </p>
                          <p className="text-[#A4A8A7]">State Tax ({selectedTax?.state}%)</p>
                          </>}
                          <p className="flex text-[#8133F1] items-center gap-3">
                            Add Other Charges
                            <Plus onClick={() => setCharge(!charge)} />
                          </p>
                          <div className={charge ? "block" : "hidden"}>
                            {charges.map((charge, index) => (
                              <div key={index} className="flex gap-2 items-center mb-2">
                                <select
                                  value={charge.type}
                                  onChange={(e: ChangeEvent<HTMLSelectElement>) => updateCharge(index, 'type', e.target.value)}
                                  className="border rounded py-3 px-2 block border-[#BCBBBB] text-[#A4A8A7]"
                                >
                                  <option value="">Select Charge Type</option>
                                  <option value="Delivery Charge">Delivery Charge</option>
                                  <option value="Service Charge">Service Charge</option>
                                </select>
                                <input
                                  type="text"
                                  value={charge.amount}
                                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateCharge(index, 'amount', e.target.value)}
                                  className="block border focus:border-1 rounded px-2 py-0.5 text-[#A4A8A7] focus:border-inherit outline-none"
                                  placeholder="Enter amount"
                                />
                                <X onClick={() => removeCharge(index)} className="text-error cursor-pointer" />
                              </div>
                            ))}
                            <button onClick={addCharge} className="text-[#8133F1]">
                              Add More Charges
                            </button>
                          </div>
                        </div>

                        <div className="leading-10">
                          <div className="flex justify-between gap-2">
                            <label>Total Before Taxes</label> <p>5,653.50</p>
                          </div>
                          <div className="flex justify-between items-center gap-2">
                            <label className="text-nowrap">Tax Amount</label>
                            <select className="w-[100px] text-base bg-white px-3 py-3 rounded-md border border-borderColor shadow-lg outline-none"
                              onChange={(e)=>setTax(e.target.value)}
                            >
                              <option value="">Select Tax</option>
                              {taxes?.map((tax:any)=>(
                                <option key={tax?.id} value={tax?.id}>{tax?.name}</option>
                              ))}
                              {taxesIsPending && <option value="">loading...</option>}
                            </select>
                            {/* <Dropdown
                              placeholder="Tax"
                              options={taxOptions}
                              value={tax}
                              onChange={(value) => setTax(value)}
                              className="w-[100px] text-base"
                              buttonClassName="bg-white"
                            /> */}
                            <p>2,708.17</p>
                          </div>
                          <div className="flex justify-between gap-2">
                            <label>Other Charges</label> <p>10.00</p>
                          </div>
                          <div className="flex justify-between gap-1 lg:gap-20">
                            <label>Total</label> <p>8,351.67</p>
                          </div>
                          <div className="flex justify-between gap-2">
                            <label>Payment Applied</label> <p>8,361.67</p>
                          </div>
                          <div className="flex justify-between gap-2">
                            <label>Amount Due</label> <p>0.00</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <MultilineTextField
                          name="noteFromCustomer"
                          label="Note From Customer"
                          rows={2}
                          variant="xlong"
                          placeholder="Great product"
                          control={control}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-5 w-2/3">
                        {/* <InvoiceDialogs /> */}
                        <CustomButton className='px-10 py-3 bg-[#8133F1] text-white rounded-md border'
                          onClick={generateInvoice}
                        >
                          Generate Invoice 
                        </CustomButton>
                        <button className="px-5 md:px-10 py-3 border-[#8133F1] text-[#8133F1] rounded-[16px] border">
                          Revert
                        </button>
                      </div>
                    </div>
                  </main>
                </div>

                {/* side bar */}
                <SideBar
                  side={side} sideTab ={sideTab} setSideTab={setSideTab} more={more} setMore={setMore} 
                  customer={selectedCustomer} setCustomer={setCustomer} frequency ={frequency} setFrequency={setFrequency}
                  frequencyType={frequencyType} setFrequencyType={setFrequencyType} list={list} setList={setList}
                  numberOfPayment={numberOfPayment} setNumberOfPayment={setNumberOfPayment} createGroup={createGroup} 
                  setCreateGroup ={setCreateGroup} setViewGroup ={setViewGroup} setDeleteModal ={setDeleteModal}
                  enableOnlinePayment = {enableOnlinePayment} setEnableOnlinePayment = {setEnableOnlinePayment}
                />
              </main>
            </>
          )}
        </div>
      </div>
      {viewGroup && (
        <div className="flex items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
          <div className="relative w-fit max-h-[95%] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll no-scrollbar px-[50px] py-[50px] ">
            <Image src='/close-white-bg.svg'  alt='close' width={48} height={48} className='cursor-pointer absolute top-0 right-0'
              onClick={()=>setViewGroup(!viewGroup)}
            />
            <h2 className='text-[24px] font-bold mb-6'>Group Members</h2>
            <TextField
              name='groupName'
              label='Group Name'
              font='bold'
              placeholder='Seasoned Customers'
              control={control}
            />
            <div className='flex flex-wrap gap-2 my-4 max-w-[629px]'>
              {groupNames.map((groupName, index)=>(
                <div key={index} className='flex items-center bg-[#F0F0F0] rounded-[8px] px-3 py-2'>
                  <span className='text-sm'>{groupName?.name}</span>
                  <button 
                    onClick={() => removeGroupName(groupName?.name)}
                    className='ml-2 text-primary-normal hover:text-red-500'
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
            <TextField
              name='customerName'
              label='Customer Name'
              font='bold'
              placeholder='John Doe'
              control={control}
            />

            <button className='flex items-center gap-x-2 text-primary-normal mt-4 '>
              <Plus />
              <p>Add Another Customer</p>
            </button>
            
            <div className='w-[340px] mt-4'>
              <CustomButton fullWidth>Save</CustomButton>
            </div>
          </div>
        </div>
      )}
      {deleteModal && (
        <div className="flex items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
          <div className='relative mb-10'>
            <button className=" bg-white h-10 absolute z-50 -top-12 -right-10 text-gray-500 hover:text-gray-700 cursor-pointer w-10 justify-center items-center mx-auto flex rounded-full"
              onClick={()=>setDeleteModal(!deleteModal)}
            >
              <X className='text-primary-normal' />
            </button>
            <div className="relative w-fit max-h-[95%] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll no-scrollbar px-[50px] py-[50px] ">
              <h2 className='text-[24px] font-bold mb-3'>Delete Group</h2>
              <p className='mb-6'>Are you sure you want to delete this group?</p>
              
              <div className='flex items-center gap-x-4'>
                <CustomButton
                  onClick={()=>setDeleteModal(!deleteModal)}
                >Delete</CustomButton>
                <CustomButton variant='outlined' 
                  onClick={()=> setDeleteModal(false)}
                >Cancel</CustomButton>
              </div>
            </div>
          </div>
        </div>
      )}
      {createGroup && (
        <div className="flex justify-center items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
        <div className='relative'>
            <button className=" bg-white h-10 absolute z-50 -top-12 -right-10 text-gray-500 hover:text-gray-700 cursor-pointer w-10 justify-center items-center mx-auto flex rounded-full"
              onClick={()=>setCreateGroup(!createGroup)}
            >
              <X className='text-primary-normal' />
            </button>
            <div className="relative w-fit max-h-[95%] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll no-scrollbar px-[50px] py-[50px] ">
              <h2 className='text-[24px] font-bold mb-2'>Create a Group</h2>
              <p className='mb-6 text-[#939292]'>Create a group for invoicing</p>
              <TextField
                name='groupName'
                label='Group Name'
                font='bold'
                placeholder='Seasoned Customers'
                control={control}
              />
              <div className='flex flex-wrap gap-2 my-4 max-w-[490px]'>
                {groupNames.map((groupName, index)=>(
                  <div key={index} className='flex items-center bg-[#F0F0F0] rounded-[8px] px-3 py-2'>
                    <span className='text-sm'>{groupName?.name}</span>
                    <button 
                      onClick={() => removeGroupName(groupName?.name)}
                      className='ml-2 text-primary-normal hover:text-red-500'
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <TextField
                name='customerName'
                label='Customer Name'
                font='bold'
                placeholder='John Doe'
                control={control}
              />

              <button className='flex items-center gap-x-2 text-primary-normal mt-4 '>
                <Plus />
                <p>Add Another Customer</p>
              </button>
              
              <div className='w-[340px] mt-4'>
                <CustomButton fullWidth>Create Group</CustomButton>
              </div>
            </div>
          </div>
        </div>
      )}
      {success && (
        <div className="flex justify-center items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
        <div className='relative mb-10'>
          <button className=" bg-white h-10 absolute z-50 -top-12 -right-10 text-gray-500 hover:text-gray-700 cursor-pointer w-10 justify-center items-center mx-auto flex rounded-full"
            onClick={()=>{setSuccess(!success)}}
          >
            <X className='text-primary-normal' />
          </button>
          <div className="w-fit max-h-[95%] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll no-scrollbar px-[50px] py-[50px] ">
            <CircleCheck size={58} color='#00A814' className="mx-auto mb-4"/>
            <p className="text-lg font-light mb-4">Invoice Generation is successful</p>
            <div className="w-fit mx-auto">
              <CustomButton
                onClick={() => setInvoiceDelivery(!invoiceDelivery)}
              >
                Send Invoice to Customer
              </CustomButton>
            </div>
          </div>
        </div>
        </div>
      )}
      {invoiceDelivery && (
        <div className="flex items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
        <div className="relative w-fit max-h-[95%] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll no-scrollbar px-[50px] py-[50px] ">
          <Image src='/close-white-bg.svg'  alt='close' width={48} height={48} className='absolute top-0 right-0'
            onClick={()=>{
              setInvoiceDelivery(!invoiceDelivery)}
            }
          />
          <div className="leading-loose">
            <h2 className="mb-4">Invoice Delivery</h2>
            <p className="text-[#939292]">XYZ Corporation</p>
            <div>
              <div className="gap-5">
                <p>
                  Location: <span className="font-medium">Global</span>
                </p>
                <p>
                  Date: <span className="">May 31, 2024</span>
                </p>
              </div>
              <p>
                Invoice No: <span>1001</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5 w-full mt-4">
              <Dropdown
                placeholder="Select Customer"
                label="Customer"
                options={customerOptions}
                value={customer}
                onChange={(value) => setCustomer(value)}
                className="w-[250px] text-base"
                buttonClassName="bg-white"
              />
              <label className="font-medium">
                Customer Email
                <div className="bg-white px-3 h-12 rounded overflow-hidden flex items-center border border-[#CFCECE]">
                  <input
                    type="email"
                    autoComplete="email"
                    id="search"
                    className="h-full w-full bg-white rounded-[8px] outline-none pr-3 text-sm"
                    placeholder="ismith@samplename.com"
                  />
                  <button
                    className="text-[#8133F1] mx-1"
                    onClick={() => Cc()}
                  >
                    Cc{" "}
                  </button>
                  <button className="text-[#8133F1]">Bcc</button>
                </div>
              </label>
            </div>

            <div className={` ${cc ? "grid" : "hidden"} w-1/2`}>
              <label className="font-medium">
                CC
                <div className="bg-white px-3 h-12 rounded overflow-hidden flex items-center border border-[#CFCECE]">
                  <input
                    type="email"
                    autoComplete="email"
                    id="search"
                    className="h-full w-full rounded-[8px] bg-white outline-none pr-3 text-sm"
                    placeholder="ismith@samplename.com"
                  />
                  <button className="text-[#8133F1]">Bcc</button>
                </div>
              </label>
            </div>

            <div className="mt-2">
              <TextField
                name="subject"
                label="Subject"
                font="medium"
                variant="xlong"
                placeholder="Invoice #INV-1001 from XYZ Corporation"
                control={control}
              />
              <MultilineTextField
                name="message"
                label="Message"
                font="medium"
                rows={2}
                variant="xlong"
                placeholder="Dear Customer ABC,Please find attached your invoice #INV-1001 for $5,000. Payment is due by 2024-05-15. Thank you, XYZ Corporation"
                control={control}
              />
            </div>

            <div className="my-1">
              <button className="flex gap-1 text-[#8133F1] items-center">
                Attach file <PaperclipIcon size="16px" />
              </button>
            </div>

            <div className="flex gap-3">
              <label className="text-[#8133F1] flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                Enable Auto-Send Invoice
              </label>
              {isChecked && (
                <>
                  <label className="flex items-center gap-2">
                    Date
                    <ResponsiveDatePickers />
                  </label>
                  <label className="flex items-center gap-2">
                    Time
                    <TimePickerValue />
                  </label>
                </>
              )}
            </div>
            <div className="w-[250px]">
              <CustomButton fullWidth
                onClick={sendInvoiceDelivery}
              >
                Send Invoice
              </CustomButton>
            </div>
          </div>
        </div>
        </div>
      )}

      {paymentReminder && (
        <div className="flex items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
        <div className="relative w-fit max-h-[95%] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll no-scrollbar px-[50px] py-[50px] ">
          <Image src='/close-white-bg.svg'  alt='close' width={48} height={48} className='absolute top-0 right-0'
            onClick={()=>{
              setPaymentReminder(!paymentReminder)}
            }
          />
          <div className="leading-loose">
            <h2 className="mb-4">Payment Reminder</h2>
            <p className="text-[#939292]">XYZ Corporation</p>

            <div>
              <div className="gap-5">
                <p>
                  Location: <span className="font-medium">Global</span>
                </p>
                <p>
                  Date: <span className="">May 31, 2024</span>
                </p>
              </div>
              <p>
                Invoice No: <span>1001</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5 w-full">
              <TextField
                name="preparedBy"
                label="Prepared By"
                placeholder="Customer XYZ"
                font="medium"
                variant="short"
                control={control}
              />
              <label className="font-medium">
                Customer Email
                <div className="bg-white px-3 h-12 rounded overflow-hidden flex items-center border border-[#CFCECE]">
                  <input
                    type="email"
                    autoComplete="email"
                    id="search"
                    className="h-full w-full bg-white outline-none pr-3 text-sm"
                    placeholder="ismith@samplename.com"
                  />
                  <button
                    className="text-[#8133F1] mx-1"
                    onClick={() => Cc()}
                  >
                    Cc{" "}
                  </button>
                  <button className="text-[#8133F1]">Bcc</button>
                </div>
              </label>
            </div>

            <div className={` ${cc ? "grid" : "hidden"} w-1/2`}>
              <label className="font-medium">
                Cc
                <div className="bg-white px-3 h-12 rounded overflow-hidden flex items-center border border-[#CFCECE]">
                  <input
                    type="email"
                    autoComplete="email"
                    id="search"
                    className="h-full w-full bg-white outline-none pr-3 text-sm"
                    placeholder="ismith@samplename.com"
                  />
                  <button className="text-[#8133F1]">Bcc</button>
                </div>
              </label>
            </div>
            <div>
              <label className="font-medium">
                Subject
                <input
                  type="text"
                  className="w-full block outline-none border focus:border-1 rounded py-2 px-2 text-[#A4A8A7] focus:border-inherit"
                  placeholder="Invoice #INV-1001 from XYZ Corporation"
                />
              </label>
              <label className="font-medium">Message </label>
              <textarea
                name=""
                id=""
                className="p-3 border border-[#CFCECE] focus:outline-none rounded block w-full"
                value="Dear Customer ABC,Please find attached your invoice #INV-1001 for $5,000. Payment is due by 2024-05-15. Thank you, XYZ Corporation"
              ></textarea>
            </div>

            <div className="my-1">
              <button className="flex gap-1 text-[#8133F1] items-center">
                Attach file <PaperclipIcon size="16px" />
              </button>
            </div>

            <div className="flex gap-3">
              <label className="text-[#8133F1] flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                Enable Auto-Send Reminders
              </label>
              {isChecked && (
                <div className="grid grid-cols-2">
                  <label className=" items-center gap-2">
                    Date
                    <ResponsiveDatePickers />
                  </label>
                  <label className=" items-center gap-2">
                    Time
                    <ResponsiveDatePickers />
                  </label>
                  <br />
                  <div className="flex justify-end gap-5">
                    <label>Reminder Frequency till Payment</label>
                    <select
                      name=""
                      id=""
                      className="border rounded py-2 px-2 block border-[#BCBBBB] text-[#A4A8A7]"
                    >
                      <option value="">Daily</option>
                      <option value="">Three Days</option>
                      <option value="">Weekly</option>
                      <option value="">Monthly</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
            <div className="w-[250px]">
              <CustomButton fullWidth
                onClick={sendPaymentReminder}
              >
                Send Payment Reminder
              </CustomButton>
            </div>
          </div>
        </div>
        </div>
      )}

      {paymentReminderSuccess && (
        <div className="flex items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
        <div className="relative w-fit max-h-[95%] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll no-scrollbar px-[5px] py-[50px] ">
          <Image src='/close-white-bg.svg'  alt='close' width={48} height={48} className='absolute top-0 right-0'
            onClick={()=>{
              setPaymentReminderSuccess(!paymentReminderSuccess)}
            }
          />
            <CircleCheck color="green" size="15%" className="mx-auto" />
            <p className="text-center text-lg font-semibold mt-3">Payment Recorded</p>
        </div>
        </div>
      )}
    </>
  );
};

export const customerOptions = [
  { value: "John Doe", label: "John Doe" },
  { value: "Jane Smith", label: "Jane Smith" },
];

const groupNames = [
  {
    id: 1,
    name: 'John Doe',
  },
  {
    id: 1,
    name: 'Michael Kent',
  },
  {
    id: 1,
    name: 'Isaiah Mila',
  },
  {
    id: 1,
    name: 'Simon',
  },
  {
    id: 1,
    name: 'Catherine Davis',
  },
  {
    id: 1,
    name: 'Alaba Mide',
  },
  {
    id: 1,
    name: 'John Smith',
  },
]
export default GenerateInvoice;
