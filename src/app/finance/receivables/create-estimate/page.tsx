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
  ListTodoIcon,
  MoveDownLeftIcon,
  PaperclipIcon,
  PencilIcon,
  Plus,
  PlusIcon,
  PrinterIcon,
  SaveIcon,
  ScrollTextIcon,
  X,
} from "lucide-react";
import React from "react";
import { useState } from "react";
import Image from 'next/image';
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Dropdown from "@/components/reusable/DropDown";
import { customerOptions, customerTaxCodeOptions, frequencyTypeOptions } from "@/data/dropDownOption";
import { Button as CustomButton } from '@/components/reusable/Button';
import { MultilineTextField, TextField } from "@/components/reusable/TextField";
import { useForm } from "react-hook-form";
import CreateEstimateTable from "@/components/finance/receivables/CreateEstimateTable";
import { Payment } from "@/components/finance/receivables/CreateEstimateTable";
import { useAddEstimate } from "../../hooks/mutate";
import LoadingOverlay from "@/components/reusable/LoadingOverlay";

const CreateEstimate = () => {
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
  const [onlinePayment, setOnlinePayment] = useState('')
  const [isCreateEstimate, setIsCreateEstimate] = useState(false)
  const [isAvailable, setIsAvailable] = useState(false)
  const router = useRouter();
  const { control } = useForm();

  // Api Call
  const {mutate:createEstimateMutate, isPending:createEstimateIsPending} = useAddEstimate()

  const [activeTab, setActiveTab] = useState<number>(0);
  const [action, setAction] = useState<boolean>(false);

  const [sideTab, setSideTab] = useState<number>(0);
  const side = ["Customer", "Transaction", "Automation"];

  // getting table data
  const [tableData, setTableData] = useState<Payment[]>([]);
  const handleTableDataUpdate = useCallback((data: Payment[]) => {
    setTableData(data);
  }, []);

  const removeGroupName = (nameToRemove: any) => {
    
  }

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

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const createEstimate = () => {
    createEstimateMutate({
      products: tableData,
      "active_estimate": 0,
      "bill_to": "string",
      "currency": 0,
      "customer_job": "string",
      "customer_tax_code": "string",
      "date": "string",
      "delivery_method": 0,
      "due_date": "string",
      "email": "string",
      "estimate_date": "string",
      "estimate_no": "string",
      "list": "string",
      "location": "string",
      "markup": 0,
      "note_from_customer": "string",
      "notes": "string",
      "online_payment": false,
      "open_balance": 0,
      "phone": "string",
      "prepared_by": "string",
      "reimbursable_expenses": 0,
      "sales_order_to_be_invoiced": 0,
      "ship_to": "string",
      "sub_total": 0,
      "tax_amount": 0,
      "tax_location": "string",
      "terms": "string",
      "total": 0
    },
    {
      onSuccess: () => {
        setIsCreateEstimate(!isCreateEstimate)
      },
    }
    )
    setIsCreateEstimate(!isCreateEstimate)
  }

  function AvailTable() {
    function createData(
      // select: any,
      date: string,
      amount: number,
      customerjob: string,
      estno: number
    ) {
      return { date, amount, customerjob, estno };
    }

    const rows = [createData("01-05-2023", 140.0, "Dan T. Miller", 604)];

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="bg-[#FAFAFA] border-b border-[#E9E8E8]">
              <TableCell className="py-6 px-4">Select</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Amount&nbsp;(GBP)</TableCell>
              <TableCell align="left">Customer:Job</TableCell>
              <TableCell align="left">EST.NO</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.date}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ width: "40px" }}
                  className="text-[#939292] py-6 px-4"
                >
                  <input type="checkbox" name="" id="" />
                </TableCell>
                <TableCell align="left" className="text-[#A4A8A7]">
                  {row.date}
                </TableCell>
                <TableCell align="left" className="text-[#A4A8A7]">
                  {row.amount}
                </TableCell>
                <TableCell align="left" className="text-[#A4A8A7]">
                  {row.customerjob}
                </TableCell>
                <TableCell align="left" className="text-[#A4A8A7]">
                  {row.estno}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

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

  function EstimateDialogs() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const [isChecked, setIsChecked] = useState(false);

    return (
      <React.Fragment>
        <CustomButton
          onClick={handleClickOpen}
        >
          Create Estimate
        </CustomButton>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          maxWidth="sm"
          fullWidth={true}
          PaperProps={{
            sx: {
              p: 5, // Increase padding for the entire dialog
            },
          }}
        >
          <DialogTitle
            sx={{ m: 0, px: 2, py: 0 }}
            id="customized-dialog-title"
            className="text-center font-medium"
          >
            Create Progress Invoice Based on Estimate
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <div className="leading-loose">
              <p className="">What do you want to include in the estimate</p>

              <div className="gap-5 w-full text-[#939292]">
                <label className="flex gap-3">
                  <input type="radio" className="outline-none" />
                  Create an invoice for the remaining amounts of the estimate
                </label>

                <label className="flex gap-3">
                  <input type="radio" className="outline-none" />
                  Create invoice based on a percentage of the estimate
                </label>

                <label className="flex gap-3">
                  Percentage Of Estimate
                  <input
                    type="text"
                    className="px-2 border focus:border-1 rounded outline-none text-[#A4A8A7] focus:border-inherit"
                    placeholder="EST-1001"
                  />
                </label>

                <label className="flex gap-3">
                  <input type="radio" className="outline-none" />
                  Create invoice for selected items or different percentage of
                  each item
                </label>
              </div>

              <div className="grid justify-center gap-3 my-5">
                <div className="w-[340px]">
                  <CustomButton fullWidth>
                    Ok
                  </CustomButton>
                </div>
                <div className="w-[340px]">
                  <CustomButton fullWidth variant="outlined">
                    Cancel
                  </CustomButton>
                </div>
                <button className="text-[#8133F1]">Help</button>
              </div>
            </div>
          </DialogContent>
          <DialogActions></DialogActions>
        </BootstrapDialog>
      </React.Fragment>
    );
  }

  function AvailableDialogs() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    return (
      <React.Fragment>
        <CustomButton
          onClick={handleClickOpen}
        >
          Ok
        </CustomButton>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          maxWidth="md"
          fullWidth={true}
          PaperProps={{
            sx: {
              p: 5, // Increase padding for the entire dialog
            },
          }}
        >
          <DialogTitle
            sx={{ m: 0, px: 2, py: 0 }}
            id="customized-dialog-title"
            className="text-center font-semibold"
          >
            Available Estimate
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <div className="leading-loose">
              <div className="flex justify-center gap-2 items-center">
                <label> Customer:Job</label>
                <Dropdown
                  placeholder="Customer:Job"
                  options={customerOptions}
                  value={customer}
                  onChange={(value) => setCustomer(value)}
                  className="w-[170px] text-base"
                  buttonClassName="bg-white"
                />
              </div>

              <p className="text-center text-md font-medium mb-4">
                Select the Estimate you want to add to the invoice
              </p>

              <div className="gap-5 w-full text-[#939292]">
                <AvailTable />
              </div>

              <div className="grid grid-cols-2 gap-5 mt-5">
                <CustomButton>
                  Ok
                </CustomButton>
                <CustomButton variant="outlined">
                  Cancel
                </CustomButton>
              </div>
            </div>
          </DialogContent>
          <DialogActions></DialogActions>
        </BootstrapDialog>
      </React.Fragment>
    );
  }

  const breadcrumbs = ["Admin Dashboard", "Finance Module"];

  return (
    <>
    { createEstimateIsPending && <LoadingOverlay/> }
      <div className="h-[100vh] overflow-scroll">
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
                  <p className="text-xl font-medium"
                    onClick={()=>router.push('/finance/receivables/create-estimate')}
                  >Create Estimate</p>
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
                <button
                  className="flex gap-1"
                  onClick={() => {
                    router.push("/finance/receivables/create-invoice");
                  }}
                >
                  Create Invoice <ScrollTextIcon size="16px" />
                </button>
                <button className="flex gap-1">
                  Create Sales Order <ListTodoIcon size="16px" />
                </button>
              </div>

              <div className="text-[#8133F1] flex gap-5 my-5">
                <button className="flex gap-1">
                  Create Purchase Order <ListTodoIcon size="16px" />
                </button>
              </div>

              <div className="border-b my-5 border-b-[#BCBBBB]"></div>
              {/* Main content */}
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
                  <TextField
                    name="preparedBy"
                    label="Prepared By"
                    placeholder="Customer XYZ"
                    font="medium"
                    variant="short"
                    control={control}
                  />
                  <p className="font-medium text-lg my-3">Estimate</p>
                  <p className="text-xs">
                    09/26/2024{" "}
                    <span className="text-[#8133F1]">See history</span>{" "}
                  </p>

                  <div className="grid grid-cols-3 justify-start items-center gap-3 my-2">
                    <label className="grid grid-cols-2 items-center gap-1 mx-1">
                      Estimate Date
                      <ResponsiveDatePickers />
                    </label>
                    <div className="flex justify-start col-span-2 items-center gap-2 mx-1">
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
                    </div>
                  </div>

                  <div className="grid grid-cols-3 justify-start items-center gap-3 my-2">
                    <div className="grid grid-cols-2 items-center gap-1 mx-1">
                      Estimate No
                      <TextField
                        name="estimatedNumber"
                        placeholder="1234"
                        variant="xshort"
                        control={control}
                      />
                    </div>
                    <div className="flex justify- col-span-2 items-center gap-2 mx-1">
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
                    </div>
                  </div>

                  <div className="grid grid-cols-3 items-center gap-3 my-2">
                    <label className="grid grid-cols-2 items-center gap-1 mx-1">
                      Due Date
                      <ResponsiveDatePickers />
                    </label>
                    <div className="col-span-2"></div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-2">
                    <div className="grid grid-cols-2 items-center gap-1 mx-1">
                      Terms
                      <TextField
                        name="short"
                        placeholder="Customer XYZ"
                        variant="xshort"
                        control={control}
                      />
                    </div>
                    <div className="col-span-2"></div>
                  </div>

                  <main>
                    {/* <InvoiceTable /> */}
                    <CreateEstimateTable onDataUpdate = {handleTableDataUpdate}  />
                    <div className="my-5">
                      <label className="text-[#8133F1] flex gap-1">
                        <input type="checkbox" name="" id="" />
                        Enable Online Payment
                      </label>

                      <div className="flex justify-between my-3 gap-3 md:gap-10">
                        <div className="w-1/2">
                          <div className="flex gap-5">
                            <MultilineTextField
                              name="note"
                              label="Note From Customer"
                              rows={2}
                              variant="short"
                              placeholder="Great product"
                              control={control}
                            />
                            <div>
                              <p>Customer Tax Code</p>
                              <Dropdown
                                placeholder="Tax"
                                options={customerTaxCodeOptions}
                                value={customerTaxCode}
                                onChange={(value) => setCustomerTaxCode(value)}
                                className="w-[170px] text-base"
                                buttonClassName="bg-white"
                              />
                            </div>
                          </div>
                          <MultilineTextField
                            name="description"
                            label="Description"
                            rows={2}
                            variant="long"
                            placeholder="Great product"
                            control={control}
                          />
                        </div>

                        <div className="leading-10 w-1/2">
                          <div className="flex justify-between">
                            <label>Subtotal</label> <p>88,295.00</p>
                          </div>
                          <div className="flex justify-between">
                            <label>Markup</label> <p>6,540.50</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <label>Tax </label>
                            <Dropdown
                              placeholder="San Tomas"
                              options={customerOptions}
                              value={tax}
                              onChange={(value) => setTax(value)}
                              className="w-[100px] text-base"
                              buttonClassName="bg-white"
                            />
                            <span className="text-[#939292]">7.75%</span>
                            <p>2,708.17</p>
                          </div>
                          <div className="flex justify-between">
                            <label>Total </label> <p>102,132.40</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-5 w-2/3">
                        <CustomButton
                          onClick={createEstimate}
                        >
                          Create Estimate
                        </CustomButton>
                        <CustomButton variant="outlined">
                          Create Estimate & New
                        </CustomButton>
                      </div>
                    </div>
                  </main>
                </div>
                {/* side bar */}
                <div className="w-full md:w-2/6 my-3 bg-white rounded-[16px] leading-10 px-3 py-6">
                  <div className="flex justify-end gap-2 items-center">
                    <label>Customer:Job</label>
                    <Dropdown
                      placeholder="Select Customer"
                      options={customerOptions}
                      value={customer}
                      onChange={(value) => setCustomer(value)}
                      className="w-[150px] text-base"
                      buttonClassName="bg-white"
                    />
                  </div>
                  <div className="flex justify-end gap-2 items-center mb-4">
                    <label> List</label>
                    <Dropdown
                      placeholder="Select Customer"
                      options={customerOptions}
                      value={list}
                      onChange={(value) => setList(value)}
                      className="w-[150px] text-base"
                      buttonClassName="bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-3 justify-between border border-[#8133F1] rounded-[8px] text-[#8133F1] my-2 text-sm">
                    {side.map((tab, index) => (
                      <button
                        key={index}
                        onClick={() => setSideTab(index)}
                        className={`px-2 py-2 text-wrap ${
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
                          <p className="flex justify-between text-lg text-[#575757] font-medium mt-4">
                            Summary <PencilIcon className="text-[#8133F1]" />
                          </p>
                          <div className="flex justify-between gap-1 lg:gap-6">
                            <label>Phone</label> <p>555-3221-1111</p>
                          </div>
                          <div className="flex justify-between gap-1 lg:gap-6">
                            <label>Email</label> <p>ismith@samplename.com</p>
                          </div>
                          <div className="flex justify-between gap-1 lg:gap-6">
                            <label>Delivery Method</label> <p>Email</p>
                          </div>
                          <div className="flex justify-between gap-1 lg:gap-6">
                            <label>Open Balance</label> <p>12,897</p>
                          </div>
                          <div className="flex justify-between gap-1 lg:gap-20">
                            <label>Active Estimate</label> <p>3</p>
                          </div>
                          <div className="flex justify-between gap-1 lg:gap-20">
                            <label>Sales Order to be Invoiced</label> <p>0</p>
                          </div>
                          <div className="flex justify-between gap-1 lg:gap-6">
                            <label>Reimbursable Expenses</label> <p>172.50</p>
                          </div>
                        </div>

                        <div className="">
                          <p className="flex justify-between font-medium text-lg text-[#575757] mt-4">
                            Customer Payment{" "}
                            <PencilIcon className="text-[#8133F1]"/>
                          </p>
                          <div className="flex justify-between">
                            <label>Customer cannot pay Online</label>
                          </div>
                          <label className="text-[#8133F1] flex gap-1">
                            <input type="checkbox" name="" id="" />
                            Enable Online Payment
                          </label>
                        </div>

                        <div className="">
                          <p className="flex justify-between font-medium text-lg text-[#575757] mt-4">
                            Recent Transaction{" "}
                          </p>
                          <div className="flex justify-between my-1 gap-1 lg:gap-6 text-xs">
                            <label>
                              25-05-2024{" "}
                              <span className="text-[#8133F1]">Payment</span>{" "}
                            </label>{" "}
                            <p>$10,000</p>
                          </div>
                          <div className="flex justify-between my-1 gap-1 lg:gap-6 text-xs">
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
                        <p className="flex justify-between text-lg text-[#575757] font-medium mt-4">
                          Recent Transaction{" "}
                        </p>
                        <div className="flex justify-between my-1 gap-1 lg:gap-6 text-xs">
                          <label>
                            25-05-2024{" "}
                            <span className="text-[#8133F1]">Payment</span>{" "}
                          </label>{" "}
                          <p>$10,000</p>
                        </div>
                        <div className="flex justify-between my-1 gap-1 lg:gap-6 text-xs">
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
                        <p className="flex justify-between text-lg text-[#575757] font-medium mt-4">
                          Automate Invoice generation
                        </p>

                        <div className="flex justify-between items-center">
                          <label>Frequency Type</label>
                          <Dropdown
                            placeholder="Frequency Type"
                            options={frequencyTypeOptions}
                            value={frequencyType}
                            onChange={(value) => setFrequencyType(value)}
                            className="w-[150px] text-base"
                            buttonClassName="bg-white"
                          />
                        </div>

                        <div className="flex justify-between my-2">
                          <label>Frequency</label>
                          <Dropdown
                            placeholder="Select Frequency"
                            options={frequencyTypeOptions}
                            value={frequency}
                            onChange={(value) => setFrequency(value)}
                            className="w-[150px] text-base"
                            buttonClassName="bg-white"
                          />
                        </div>

                        <div className="flex justify-between items-center">
                          <label>Recurring Date</label>
                          <div className="w-1/2">
                            <ResponsiveDatePickers />
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <label>Number of Payments</label>
                          <Dropdown
                            placeholder="Payment"
                            options={frequencyTypeOptions}
                            value={numberOfPayment}
                            onChange={(value) => setNumberOfPayment(value)}
                            className="w-[150px] text-base"
                            buttonClassName="bg-white"
                          />
                        </div>

                        <p className="text-lg text-[#575757] font-medium mt-4">Groups Invoicing</p>
                        <button className="flex text-[#8133F1] items-center gap-1 text-base my-2" 
                          onClick={()=>setCreateGroup(!createGroup)}
                        >
                          <PlusIcon />
                          Create a Group
                        </button>

                        <p className="text-[#727171] text-base">Groups (2)</p>
                        {groups.map((group, index)=>(
                          <div key={index} className='flex justify-between gap-x-4 relative'>
                            <p>{group?.name}</p>
                            <EllipsisVertical 
                              onClick={() =>{
                                more === group?.id ? setMore(null) : setMore(group?.id)
                              }}
                            />
                            {more === group?.id && (
                              <div className="w-fit h-fit bg-white absolute top-8 right-0 shadow-xl rounded-[8px] z-20 p-4 ">
                                <button className='text-[#575757] block '
                                  onClick={() => {
                                    setMore(null)
                                  }}
                                >Send Invoice</button>
                                <button className='text-[#575757] block '
                                  onClick={() => {
                                    setViewGroup(true)
                                    setMore(null)
                                  }}
                                >View Group Members</button>
                                <button className="text-[#C03744] cursor-pointer block "
                                  onClick={() => {
                                    setDeleteModal(true)
                                    setMore(null)
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        ))}

                        {/* <div className="relative flex justify-between items-center">
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
                            <button className='text-[#575757] block '
                              onClick={() => {
                                setViewGroup(true)
                              }}
                            >View Group Members</button>
                            <button className="flex gap-3 items-center text-[#E00B2B]">
                              Delete
                            </button>
                          </div>
                        </div> */}
                      </div>
                    </>
                  )}
                </div>
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
          <div className="relative w-fit max-h-[95%] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll no-scrollbar px-[50px] py-[50px] ">
            <Image src='/close-white-bg.svg'  alt='close' width={48} height={48} className='cursor-pointer absolute top-0 right-0'
              onClick={()=>setDeleteModal(!deleteModal)}
            />
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
      )}
      {createGroup && (
        <div className="flex justify-center items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
        <div className='relative mb-10'>
          <button className=" bg-white h-10 absolute z-50 -top-12 -right-10 text-gray-500 hover:text-gray-700 cursor-pointer w-10 justify-center items-center mx-auto flex rounded-full"
            onClick={()=>setCreateGroup(!createGroup)}
          >
            <X className='text-primary-normal' />
          </button>
          <div className="w-fit max-h-[95%] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll no-scrollbar px-[50px] py-[50px] ">
          
            <h2 className='text-[24px] font-bold mb-2'>Create a Group</h2>
            <p className='mb-6 text-[#939292]'>Create a group for invoicing</p>
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
              <CustomButton fullWidth>Create Group</CustomButton>
            </div>
          </div>
        </div>
        </div>
      )}
      {isCreateEstimate && (
        <div className="flex justify-center items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
        <div className='relative mb-10'>
          <button className=" bg-white h-10 absolute z-50 -top-12 -right-10 text-gray-500 hover:text-gray-700 cursor-pointer w-10 justify-center items-center mx-auto flex rounded-full"
            onClick={()=>{setIsCreateEstimate(!isCreateEstimate)}}
          >
            <X className='text-primary-normal' />
          </button>
          <div className="w-fit max-h-[95%] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll no-scrollbar px-[50px] py-[50px] ">

            <p className="text-lg font-bold text-center mb-4">Create Progress Invoice Based on Estimate</p>
            <div className="leading-loose">
              <p className="">What do you want to include in the estimate</p>

              <div className="gap-5 w-full text-[#939292]">
                <label className="flex gap-3">
                  <input type="radio" className="outline-none" />
                  Create an invoice for the remaining amounts of the estimate
                </label>

                <label className="flex gap-3">
                  <input type="radio" className="outline-none" />
                  Create invoice based on a percentage of the estimate
                </label>

                <label className="flex gap-3">
                  Percentage Of Estimate
                  <input
                    type="text"
                    className="px-2 border focus:border-1 rounded outline-none text-[#A4A8A7] focus:border-inherit"
                    placeholder="EST-1001"
                  />
                </label>

                <label className="flex gap-3">
                  <input type="radio" className="outline-none" />
                  Create invoice for selected items or different percentage of
                  each item
                </label>
              </div>

              <div className="grid justify-center gap-3 my-5">
                <div className="w-[340px]">
                  <CustomButton fullWidth 
                    onClick={()=>setIsAvailable(!isAvailable)}
                  >
                    Ok
                  </CustomButton>
                </div>
                <div className="w-[340px]">
                  <CustomButton fullWidth variant="outlined"
                    onClick={()=>{setIsCreateEstimate(!isCreateEstimate)}}
                  >
                    Cancel
                  </CustomButton>
                </div>
                <button className="text-[#8133F1]">Help</button>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}
      {isAvailable && (
        <div className="flex justify-center items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
        <div className='relative mb-10'>
          <button className=" bg-white h-10 absolute z-50 -top-12 -right-10 text-gray-500 hover:text-gray-700 cursor-pointer w-10 justify-center items-center mx-auto flex rounded-full"
            onClick={()=>setIsAvailable(!isAvailable)}
          >
            <X className='text-primary-normal' />
          </button>
          <div className="w-fit max-h-[95%] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll no-scrollbar px-[50px] py-[50px] ">
            <p className="text-lg font-bold text-center mb-4">Available Estimate</p>
            <div className="leading-loose">
              <div className="flex justify-center gap-2 items-center">
                <label> Customer:Job</label>
                <Dropdown
                  placeholder="Customer:Job"
                  options={customerOptions}
                  value={customer}
                  onChange={(value) => setCustomer(value)}
                  className="w-[170px] text-base"
                  buttonClassName="bg-white"
                />
              </div>

              <p className="text-center text-md font-medium mb-4">
                Select the Estimate you want to add to the invoice
              </p>

              <div className="gap-5 w-full text-[#939292]">
                <AvailTable />
              </div>

              <div className="grid grid-cols-2 gap-5 mt-5">
                <CustomButton 
                  onClick={() => setIsAvailable(!isAvailable)}
                >
                  Ok
                </CustomButton>
                <CustomButton variant="outlined"
                  onClick={() => setIsAvailable(!isAvailable)}
                >
                  Cancel
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}

    </>
  );
};

const groups = [
  {
    id: 1,
    name: 'Seasoned  Customers',
  },
  {
    id: 2,
    name: 'New  Customers',
  },
]

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
export default CreateEstimate;
