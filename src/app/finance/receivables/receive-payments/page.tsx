"use client";
import React from "react";
import HeaderLayout from "@/components/MainLayouts/HeaderLayout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  BanknoteIcon,
  ChevronLeftIcon,
  CircleCheck,
  CircleDivideIcon,
  CopyXIcon,
  CreditCardIcon,
  ForwardIcon,
  NotepadTextDashed,
  NotepadTextDashedIcon,
  PaintBucketIcon,
  PaperclipIcon,
  PrinterIcon,
  RotateCwIcon,
  SquareArrowOutUpRightIcon,
} from "lucide-react";
import dayjs from "dayjs";
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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dropdown from "@/components/reusable/DropDown";
import { Button as CustomButton } from '@/components/reusable/Button';
import { customerOptions, locationOptions, paymentOptions } from "@/data/dropDownOption";
import { MultilineTextField, TextField } from "@/components/reusable/TextField";
import { useForm } from "react-hook-form";
import { useCreateTransaction } from "../../hooks/mutate";
import { useCustomers, useEnum } from "../../hooks/query";
import moment from "moment";
import CustomerDropdown from "@/components/reusable/CustomerDropDown";
import PaymentDropdown from "@/components/reusable/PaymentDropDown";

const ReceivePayments = () => {
  const [location, setLocation] = useState('')
  const [customerId, setcustomerId] = useState('')
  const [customer, setCustomer] = useState('')
  const [payment, setPayment] = useState('')
  const [paidBy, setPaidBy] = useState('')
  const router = useRouter();
  const {control, getValues} = useForm()

  const [activeTab, setActiveTab] = useState<number>(3);

  // API CALL
  const {data:paymentMethod} = useEnum({
    type : 'PAYMENT_METHOD'
  })
  const {mutate:createTransactionMutate, isPending } = useCreateTransaction()
  const {data:customers, isPending:customerIsPending} = useCustomers({
    customer_id: customerId,
  })

  const selectedCustomer = customers?.find((customerObject:any)=> customerObject?.id == customer)

  useEffect(() => {
    if (activeTab === 0) {
      router.push("/finance/receivables");
    }
    if (activeTab === 1) {
      router.push("/finance/receivables/generate-invoice");
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

  const receivePayment = () => {
    createTransactionMutate({
      "location": "string",
      "customer_balance": selectedCustomer?.credit,
      "payment_method": payment,
      "payment_type": 0,
      "cheque_no": getValues('chequeNo'),
      "date": getValues('date'),
      "paid_by": paidBy,
      "amount_paid": getValues('amountPaid'),
      "description": getValues('description'),
      
      "address": "string",
      "amount_due": 0,
      "amount_in_words": "string",
      
      "applied_amount": 0,
      "cashback_account": "string",
      "cashback_amount": 0,
      "cashback_description": "string",
      
      "credit_applied": 0,
      
      "discount_applied": 0,
      
      "net_cash_deposited": 0,
      "original_amount": 0,
     
      "payee_account": "string",
      
      "recipient": "string",
      "recipient_account": "string",
      "status": 0,
      "transaction_details": null,
      "transaction_type": 0,
      "transfer_class": "string",
      "transfer_type": 0,
      "under_payment": 0,
      "updated_at": moment(new Date()).format('YYYY-MM-DD HH:MM:SS'),
      "created_at": moment(new Date()).format('YYYY-MM-DD HH:MM:SS')
    })
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

  function AvailTable() {
    function createData(
      // select: any,
      date: string,
      job: string,
      number: number,
      originalamount: number,
      amountdue: number,
      payment: number
    ) {
      return { date, job, number, originalamount, amountdue, payment };
    }

    const rows = [
      createData("01-05-2023", "Kitchen", 1066, 3100.0, 700.0, 700.0),
    ];

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="bg-[#E9E8E8]">
              <TableCell>Select</TableCell>
              <TableCell align="left" className="py-6 px-4">
                Date
              </TableCell>
              <TableCell align="left">Job</TableCell>
              <TableCell align="left">Number</TableCell>
              <TableCell align="left">Original Amount &nbsp;(GBP)</TableCell>
              <TableCell align="left">Amount Due &nbsp;(GBP)</TableCell>
              <TableCell align="left">Payment &nbsp;(GBP)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.date}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ width: "40px" }}>
                  <input type="checkbox" name="" id="" />
                </TableCell>
                <TableCell align="left" className="text-[#A4A8A7] py-6 px-4">
                  {row.date}
                </TableCell>
                <TableCell align="left" className="text-[#A4A8A7]">
                  {row.job}
                </TableCell>
                <TableCell align="left" className="text-[#A4A8A7]">
                  {row.number}
                </TableCell>
                <TableCell align="left" className="text-[#A4A8A7]">
                  {row.originalamount}
                </TableCell>
                <TableCell align="left" className="text-[#A4A8A7]">
                  {row.amountdue}
                </TableCell>
                <TableCell align="left" className="text-[#A4A8A7]">
                  {row.payment}
                </TableCell>
              </TableRow>
            ))}
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ width: "40px" }}>
                {/* <input type="checkbox" name="" id="" /> */}
              </TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="left" className="py-6 px-4">
                Total
              </TableCell>
              <TableCell align="left">11,797.33</TableCell>
              <TableCell align="left">9,397.33</TableCell>
              <TableCell align="left">5,336.69</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  function PaymentDialogs() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    return (
      <React.Fragment>
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          className="px-10 py-3 bg-[#8133F1] text-white rounded-[16px] border hover:bg-[#8133F1]"
          sx={{ textTransform: "none" }}
        >
          Record Payment
        </Button>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          maxWidth="sm"
          fullWidth={true}
        >
          <DialogTitle
            sx={{ m: 0, p: 2 }}
            id="customized-dialog-title"
          ></DialogTitle>
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
            <div className="flex justify-center my-5 mt-20">
              <CircleCheck color="green" size="15%" />
            </div>
            <div className="flex justify-center my-10">
              <p className="text-lg font-light">Payment Recorded</p>
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

          {activeTab === 3 && (
            <>
              <div className="flex flex-wrap md:flex-nowrap justify-between">
                <div className="my-3">
                  <div className="flex items-center">
                    <ChevronLeftIcon
                      onClick={() => {
                        router.push("/finance/receivables");
                      }}
                    />{" "}
                    <p className="text-xl font-medium">Receive Payments</p>
                  </div>
                  <p className="text-[#939292]">
                    Receive payments from customers.
                  </p>
                </div>

                <div className="my-5">
                  <div className="text-[#8133F1] flex justify-end flex-wrap gap-5">
                    <button className="flex gap-1">
                      Download <SquareArrowOutUpRightIcon size="16px" />
                    </button>
                    <button className="flex gap-1">
                      Print <PrinterIcon size="16px" />
                    </button>
                    <button className="flex gap-1">
                      Share <ForwardIcon size="16px" />
                    </button>
                    <button className="flex gap-1">
                      Customize <PaintBucketIcon size="16px" />
                    </button>
                    <button className="flex gap-1">
                      Refresh <RotateCwIcon size="16px" />
                    </button>
                    <button className="flex gap-1">
                      Attach file <PaperclipIcon size="16px" />
                    </button>
                  </div>

                  <div className="text-[#8133F1] flex justify-end flex-wrap gap-5 my-5">
                    <button className="flex gap-1">
                      View Customer/Invoice{" "}
                      <NotepadTextDashedIcon size="16px" />
                    </button>
                    <button className="flex gap-1">
                      Unapply Payments <CopyXIcon size="16px" />
                    </button>
                    <button className="flex gap-1">
                      Discounts & Credits <CircleDivideIcon size="16px" />
                    </button>
                  </div>

                  <div className="text-[#8133F1] flex justify-end flex-wrap gap-5 my-5">
                    <button className="flex gap-1">
                      Add Credit Card Processing <CreditCardIcon size="16px" />
                    </button>
                    <button className="flex gap-1">
                      Record Bounced Checks <BanknoteIcon size="16px" />
                    </button>
                  </div>
                </div>
              </div>

              <main className=" gap-5">
                <div className="">
                  <Dropdown
                    placeholder="Select"
                    label="Location"
                    options={locationOptions}
                    value={location}
                    onChange={(value) => setLocation(value)}
                    className="w-[250px] text-base"
                    buttonClassName="bg-white"
                    labelClassName="font-medium"
                  />
                  <CustomerDropdown
                    placeholder="Select"
                    label="Customer"
                    options={customers}
                    value={customer}
                    onChange={(value) => setCustomer(value)}
                    className="w-[250px] text-base"
                    buttonClassName="bg-white"
                    labelClassName="font-medium"
                  />
                  <div className="my-3 leading-loose">
                    <p className="font-medium m-0 p-0">Payment Method</p>
                    <p className="text-[#939292]">Select a payment method</p>
                    <PaymentDropdown
                      placeholder="Select"
                      label="Payment"
                      options={paymentMethod}
                      value={payment}
                      onChange={(value) => setPayment(value)}
                      className="w-[250px] text-base"
                      buttonClassName="bg-white"
                      labelClassName="font-medium"
                    />

                    <div className="flex gap-3 my-2">
                      <TextField
                        name="checkNo"
                        label="Check No"
                        placeholder="23475"
                        variant="medium"
                        control={control}
                      />
                      <TextField
                        name="date"
                        label="Date"
                        type="date"
                        variant="medium"
                        control={control}
                      />
                    </div>

                    <div className="flex my-2 gap-3">
                      <CustomerDropdown
                        placeholder="Select"
                        label="Paid By"
                        options={customers}
                        value={paidBy}
                        onChange={(value) => setPaidBy(value)}
                        className="w-[250px] text-base"
                        buttonClassName="bg-white"
                      />
                      <TextField
                        name="customerBalance"
                        label="Customer Balance (GBP)"
                        placeholder="12536"
                        variant="medium"
                        control={control}
                      />
                    </div>

                    <div className="flex my-2 gap-3">
                      <TextField
                        name="amountPaid"
                        label="Amount Paid (GBP)"
                        placeholder="24505"
                        variant="medium"
                        control={control}
                      />
                    </div>
                  </div>
                </div>

                <div className="my-5">
                  <AvailTable />
                </div>
              </main>

              <div className="flex justify-between">
                <div className="text-base">
                  <p className="font-medium">Amount for selected invoice</p>
                  <div className="flex justify-between gap-20">
                    <label>Amount Due</label> <p>7,754.69</p>
                  </div>
                  <div className="flex justify-between gap-20">
                    <label> Applied </label> <p>5,336.69</p>
                  </div>
                  <div className="flex justify-between gap-20">
                    <label> Discount & Credits Applied </label> <p>0.00</p>
                  </div>
                </div>

                <div className="text-base text-[#A4A8A7]">
                  <p className="text-black mb-2">Underpayment</p>
                  <TextField
                    name="amountToPay"
                    label="Amount to Pay (GBP)"
                    placeholder="12536"
                    variant="medium"
                    control={control}
                  />
                  <label className="flex gap-3">
                    <input type="radio" className="outline-none" />
                    Mark as an Underpayment
                  </label>
                  <label className="flex gap-3">
                    <input type="radio" className="outline-none" />
                    Mark as extra amount
                  </label>
                  <div className="w-[250px] mt-4">
                    <CustomButton fullWidth>
                      View Customer Information
                    </CustomButton>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3">
                <MultilineTextField
                  name="description"
                  label='Description'
                  rows={5}
                  variant="xlong"
                  placeholder="Dear ABC Corporation, your credit limit increase request has been approved. Please ensure timely payments to maintain your credit status. Thank you sender_name"
                  control={control}
                />

                <div className="flex justify-left gap-5 mt-4">
                  <PaymentDialogs />
                  {/* <button className='px-10 py-3 bg-[#8133F1] text-white rounded-md border'>Record Payment </button> */}
                  <div className="w-[250px]">
                    <CustomButton fullWidth variant="outlined">
                      Record Payment & Create New
                    </CustomButton>
                  </div>
                  <button className="text-[#8133F1]">Cancel </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ReceivePayments;
