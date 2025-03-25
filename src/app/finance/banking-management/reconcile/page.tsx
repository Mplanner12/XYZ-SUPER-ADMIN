'use client'
import { Button } from '@/components/reusable/Button';
import EmptyState from '@/components/reusable/EmptyState';
import { TextField } from '@/components/reusable/TextField';
import { Bird, ChevronLeft, CircleCheck, CircleX, X} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import DepositTable from '@/components/finance/bank/reconcile/DepositTable';
import ReceiptsTable from '@/components/finance/bank/reconcile/ReceiptsTable';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import MatchingTable from '@/components/finance/bank/reconcile/MatchingTable';
import Dropdown from '@/components/reusable/DropDown';
import SelectDropdown from '@/components/reusable/SelectDropDown';
import { useGetAccountingList, useGetAccountingListItemById } from '@/app/accounting/hooks/query';
import moment from 'moment';
import { formatDate } from '@/components/reusable/formatDate';
import Link from 'next/link';
import { ListNames } from '@/constants/lists';

const ReconcillationPage = () => {
  const [location, setLocation] = useState('')
  const [bank, setBank] = useState('')
  const [currency, setCurrency] = useState('')
  const [preparedBy, setPreparedBy] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [creditAmount, setCreditAmount] = useState('')
  const [debitAmount, setDebitAmount] = useState('')
  const [reference, setReference] = useState('')
  const [menu, setMenu] = useState("Reconcile Deposits");
  const [success, setSuccess] = useState(false)
  const [loadTransaction, setLoadTransaction] = useState(false)
  const [viewReconcillation, setViewReconcillation] = useState(false)
  const [saveChanges, setSaveChanges] = useState(false)
  const [mapingModal, setMapingModal] = useState(false)
  const {control, getValues} = useForm()
  const router = useRouter()
  const today = moment().format('YYYY-MM-DD')

  //API CALL
  const {data:allLists} = useGetAccountingList()
  const salesLocationsId = allLists?.find((list:any)=> list?.name === ListNames?.salesLocations)?.ID
  const cashAndBankId = allLists?.find((list:any)=> list?.name === ListNames?.cashAndBank)?.ID
  const employeeListId = allLists?.find((list:any)=> list?.name === ListNames?.employee)?.ID
  const currencyId = allLists?.find((list:any)=> list?.name === ListNames?.currency)?.ID
  const {data:locationOptions} = useGetAccountingListItemById({id: salesLocationsId})
  const {data:cashBankOptions} = useGetAccountingListItemById({ id: cashAndBankId})
  const {data:employeeList} = useGetAccountingListItemById({ id: employeeListId})
  const {data:currencyList} = useGetAccountingListItemById({ id: currencyId})


  const handleMatch = () => {
    setSuccess(!success)
  }

  const handleSaveChanges = () => {
    setSaveChanges(!saveChanges)
    router.push('/finance/banking-management/bank-statement')
  }

  const breadcrumbs = ['Admin Dashboard', 'Finance Module'];
  return (
    <div className='h-[100vh] overflow-scroll'>
      <HeaderLayout
        moduleName="Finance Module"
        moduleLink='/finance/overview'
        page="Bank Management"
        pageLink='/finance/banking-management'
        breadcrumbs={breadcrumbs}
      />
      <main className='bg-secondary rounded-[16px] px-6 pt-4 pb-[100px] mt-6 mx-6'>
        <div className='flex items-center gap-x-2 mb-6'>
          <ChevronLeft className='text-primary-normal cursor-pointer' onClick={()=>router.push('/finance/banking-management?menu=Bank Management')} />
          <h2>Bank Reconciliation For Bank A</h2>
        </div>
        <p className='text-[20px] font-medium'>XYZ Corporation</p>
        
        {/* form */}
        <div className='mt-6'>
          {viewReconcillation ? (
            <div className='flex flex-col md:flex-row  gap-x-6 mb-4'>
              <p className='text-base'>Location: <span className='font-medium'>HQ</span></p>
              <p className='text-base'>Currency: <span className='font-medium'>USD</span></p>
            </div>
          ) : (
            <>
              <div className='flex flex-col md:flex-row  gap-x-4 mb-4'>
                <SelectDropdown
                  placeholder="Select"
                  label="Location"
                  options={locationOptions?.data}
                  value={location}
                  onChange={(value) => setLocation(value)}
                  className="w-[340px] text-base"
                  buttonClassName="bg-white"
                  labelClassName="font-medium"
                />
                <SelectDropdown
                  placeholder="Select"
                  label="Bank"
                  options={cashBankOptions?.data}
                  value={bank}
                  onChange={(value) => setBank(value)}
                  className="w-[340px] text-base"
                  buttonClassName="bg-white"
                  labelClassName="font-medium"
                />
                <SelectDropdown
                  placeholder="Select"
                  label="Currency"
                  options={currencyList?.data}
                  value={currency}
                  onChange={(value) => setCurrency(value)}
                  className="w-[340px] text-base"
                  buttonClassName="bg-white"
                  labelClassName="font-medium"
                />
              </div>
              <div className='flex flex-col md:flex-row  gap-x-6 mb-4'>
                <SelectDropdown
                  placeholder="Select"
                  label="Prepared By"
                  options={employeeList?.data}
                  value={preparedBy}
                  onChange={(value) => setPreparedBy(value)}
                  className="w-[340px] text-base"
                  buttonClassName="bg-white"
                  labelClassName="font-medium"
                />
                <div className='flex justify-between items-center w-[340px] h-[48px] bg-[#F0F0F0] rounded-[8px] px-4 mt-8'>
                  <p>Exchange rate</p>
                  <div className='bg-white border border-[#939292] rounded-[4px] px-4 py-3'>
                    <p>$ 1</p>
                  </div>
                  <Image src='/exchange.svg' alt='exchange rate' width={24} height={24}/>
                  <div className='bg-white border border-[#939292] rounded-[4px] px-4 py-3'>
                    <p>£ 0.8</p>
                  </div>
                </div>
              </div>
              <div className='flex flex-col md:flex-row  gap-x-6 mb-4'>
                <TextField
                  name='startDate'
                  label='Statement Date Range: Start Date'
                  font='semibold'
                  placeholder = 'From'
                  type='date'
                  control ={control}
                />
                <TextField
                  name='endDate'
                  label='End Date'
                  font='semibold'
                  placeholder = 'To'
                  type='date'
                  control ={control}
                />
              </div>
            </>
          )}
          
          <p className='mt-4 text-base'>Date: {formatDate(today)}</p>
          <div className='mt-4'>
            <div className='flex flex-col md:flex-row gap-6 mb-4'>
              <div>
                <p className='text-base font-semibold mb-2'>Accounting Record Balance</p>
                <p className='text-[#727171] w-[340px] mb-2'>Last Date Reconciled: May 31, 2024 </p>
                <TextField
                  name='closing'
                  placeholder = '0.00'
                  coloredBg
                  control ={control}
                />
              </div>
              <div>
                <p className='text-base font-semibold mb-2'>Bank Statement Balance</p>
                <p className='text-[#727171] mb-2'>Opening balance at Current Statement Start Date: {formatDate(getValues('startDate'))} </p>
                <TextField
                  name='opening'
                  placeholder = '0.00'
                  coloredBg
                  control ={control}
                />
              </div>
            </div>
            {viewReconcillation  || 
            <div className='flex flex-col md:flex-row items-center gap-6 mb-4'>
              <TextField
                name='net'
                label='Net Balance (GBP)'
                font='semibold'
                placeholder = '0.00'
                coloredBg
                control ={control}
              />
              <button className='bg-primary-normal text-white rounded-[8px] px-2 py-2 mt-5' 
                onClick={()=>router.push('/finance/banking-management/bank-statement')}
              >
                View Bank Details
              </button>
            </div>
            }
            {/*  */}
            {loadTransaction || (
              <div className='flex flex-col md:flex-row gap-6 mt-6'>
                <div className='w-[340px]'>
                  <Button fullWidth 
                    onClick={()=> setMapingModal(!mapingModal)}
                  >Load Transactions</Button>
                </div>
                <div className='w-[340px]'>
                  <Button fullWidth variant='outlined'>Refresh Transactions</Button>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* After Load Transaction Buton */}
        {loadTransaction && (
          <>
            {/* Reconcillation Sections */}
            <div className='mt-[40px]'>
              {/* Menu */}
              <div className="border border-solid border-primary-normal rounded-[8px]  w-fit flex text-xs md:text-sm lg:text-base gap-4 no-scrollbar">
                {menuBar?.map(({name, id}:any) => (
                  <p
                    key={id}
                    className={`flex justify-between items-center text-[16px] text-primary-normal px-[8px] py-[5px] cursor-pointer transition flex-shrink-0 ${
                      menu === name ? "bg-primary-normal rounded-[8px] text-white" : ""
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

              {/* Content */}
              <div>
                {/* { approvedTokenIsPending && <LoadingOverlay/> } */}
                {menu === 'Reconcile Deposits' ? (
                  // Reconcile Deposit Tab Content
                  <div className='mt-5'>
                    <div className='mb-4'>
                      <h3 className='text-[20px] fornt-semibold mb-4 '>Bank Statement Deposits (CR)</h3>
                      <p className='text-[16px] text-[#727171]'>Use the selection tool to match accounts for reconciliation.</p>
                    </div>
                    {/* table */}
                    <DepositTable />

                    {/* Accounting Recoding Receipt */}
                    <div className='mt-6'>
                      <div className='mb-4'>
                        <h3 className='text-[20px] fornt-semibold mb-4 '>Accounting Records Receipts (DR)</h3>
                        <p className='text-[16px] text-[#727171]'>Use the selection tool to match accounts for reconciliation.</p>
                      </div>
                      <ReceiptsTable/>
                      
                    </div>
                  </div>
                ) : (
                  // Reconcile Payment Tab Contents
                  <div className='mt-5'>
                    <div className='mb-4'>
                      <h3 className='text-[20px] fornt-semibold mb-4 '>Bank Statement Payments (DR)</h3>
                      <p className='text-[16px] text-[#727171]'>Use the selection tool to match accounts for reconciliation.</p>
                    </div>
                    {/* table */}
                    <DepositTable />

                    {/* Accounting Recoding Receipt */}
                    <div className='mt-6'>
                      <div className='mb-4'>
                        <h3 className='text-[20px] fornt-semibold mb-4 '>Accounting Records Payment (CR)</h3>
                        <p className='text-[16px] text-[#727171]'>Use the selection tool to match accounts for reconciliation.</p>
                      </div>
                      <ReceiptsTable/>
                    </div>
                  </div>
                )}
                {viewReconcillation || (
                  <div className='flex flex-col md:flex-row gap-6 mt-6'>
                    <div className='w-[340px]'>
                      <Button fullWidth 
                        onClick={handleMatch}
                      >Match Selected Transaction</Button>
                    </div>
                    <div className='w-[340px]'>
                      <Button fullWidth variant='outlined'>Cancel</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Matching and Reconciliation Table  */}
            { viewReconcillation  && (
              <div className='mt-6'>
                <div className='mb-4'>
                  <h3 className='text-[20px] fornt-semibold mb-4 '>Matching and Reconciliation Table</h3>
                  <p className='text-[16px] text-[#727171]'>This table shows reconciled transactions based on your selection.</p>
                </div>
                <MatchingTable />
                <div className='flex flex-col md:flex-row gap-6 mt-6'>
                  <div className='w-[340px]'>
                    <Button fullWidth 
                      onClick={handleSaveChanges}
                    >Save Changes</Button>
                  </div>
                  <div className='w-[340px]'>
                    <Button fullWidth variant='outlined'>Cancel</Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
      {mapingModal && (
        <div className="flex justify-center items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
        <div className='relative mb-10 max-h-[88%]'>
          <button className=" bg-white h-10 absolute z-50 -top-10 -right-10 text-gray-500 hover:text-gray-700 cursor-pointer w-10 justify-center items-center mx-auto flex rounded-full"
            onClick={()=>setMapingModal(!mapingModal)}
          >
            <X className='text-primary-normal' />
          </button>
          <div className="relative w-fit h-[560px] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll no-scrollbar px-[50px] pt-[30px] pb-6">
            <div className="text-center">
              <h2 className='text-[20px] font-bold mb-4'>Bank Statement & Accounting Records Mapping</h2>
              <h2 className='text-[20px] font-medium mb-2'>Data Mapping</h2>
              <p className='mb-4'>Map your Bank Statement to Accounting Records.</p>
              <div className='text-base mb-4'>
                <div className='text-[#727171] flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-2'>
                  <p>Accounting Fields</p>
                  <p className='md:text-right'>Bank Statement Records</p>
                </div>
                <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4 '>
                  <p>Account Transaction ID</p>
                  <Dropdown
                    placeholder='Bank Transaction Id'
                    options={bankOptions}
                    value={bank}
                    onChange={(value) => setBank(value)}
                    className="w-[250px] text-base"
                    buttonClassName='bg-white'
                  />
                </div>
                <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4 '>
                  <p>Date</p>
                  <Dropdown
                    placeholder='Date'
                    options={bankOptions}
                    value={date}
                    onChange={(value) => setDate(value)}
                    className="w-[250px] text-base"
                    buttonClassName='bg-white'
                  />
                </div>
                <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4 '>
                  <p>Description</p>
                  <Dropdown
                    placeholder='Description'
                    options={bankOptions}
                    value={description}
                    onChange={(value) => setDescription(value)}
                    className="w-[250px] text-base"
                    buttonClassName='bg-white'
                  />
                </div>
                <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4 '>
                  <p>Amount (credit)</p>
                  <Dropdown
                    placeholder='Amount (credit)'
                    options={amountOptions}
                    value={creditAmount}
                    onChange={(value) => setCreditAmount(value)}
                    className="w-[250px] text-base"
                    buttonClassName='bg-white'
                  />
                </div>
                <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4 '>
                  <p>Amount (debit)</p>
                  <Dropdown
                    placeholder='Amount (debit)'
                    options={amountOptions}
                    value={debitAmount}
                    onChange={(value) => setDebitAmount(value)}
                    className="w-[250px] text-base"
                    buttonClassName='bg-white'
                  />
                </div>
                <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4 '>
                  <p>Account Reference</p>
                  <Dropdown
                    placeholder='Bank Reference'
                    options={bankOptions}
                    value={reference}
                    onChange={(value) => setReference(value)}
                    className="w-[250px] text-base"
                    buttonClassName='bg-white'
                  />
                </div>
              </div>
              <Button fullWidth 
                onClick={()=>{
                  setLoadTransaction(!loadTransaction)
                  setMapingModal(!mapingModal)
                }}
              >Proceed</Button>
            </div>
          </div>
        </div>
        </div>
      )}
      {success && (
        <div className="flex items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
          <div className="relative w-fit max-h-[95%] mx-auto rounded-[16px] bg-[#fafafa] z-50 overflow-y-scroll no-scrollbar px-[50px] py-[100px] ">
            <Image src='/close-white-bg.svg'  alt='close' width={48} height={48} className='absolute top-0 right-0'
              onClick={()=>setSuccess(!success)}
            />
            <div className="text-center">
              <CircleCheck size={58} fill='#00A814' className="text-white mx-auto mb-4"/>
              <p className='text-[20px] mb-6'>Transaction Matching is successful</p>
              <Button fullWidth 
                onClick={()=>{
                  setViewReconcillation(true)
                  setSuccess(!success)
                }}
              >View Reconciliation Table</Button>
            </div>
          </div>
        </div>
      )}
      {saveChanges && (
        <div className="flex items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
          <div className="relative w-fit max-h-[95%] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll no-scrollbar px-[50px] py-[50px] ">
            <Image src='/close-white-bg.svg'  alt='close' width={48} height={48} className='absolute top-0 right-0'
              onClick={()=>setSaveChanges(!saveChanges)}
            />
            <div className="text-center">
              <CircleCheck size={58} fill='#00A814' className="text-white mx-auto mb-4"/>
              <p className='text-[20px] mb-6'>Changes Saved</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const menuBar = [
  {
    name: "Reconcile Deposits",
    id: 1
  },
  {
    name: "Reconcile Payments",
    id: 2
  },
]

const options = [
  { value: '1', label: 'Global'},
  { value: '2', label: 'Lagos'},
  { value: '4', label: 'Abuja'},
];

const amountOptions = [
  { value: '1', label: '2.345'},
  { value: '2', label: '1.500'},
  { value: '4', label: '3,500'},
];

const bankOptions = [
  { value: '1', label: 'Bank A'},
  { value: '2', label: 'Bank B'},
  { value: '4', label: 'Bank C'},
];

const reconcillations = [
  {
    date: '01-05-2023',
    effectDate: '01-05-2023',
    type: 'Reconcile Deposits'
  },
  {
    daterr: '01-05-2023',
    effectDate: '01-05-2023',
    type: 'Reconcile Deposits'
  },
  {
    daterr: '01-05-2023',
    effectDate: '01-05-2023',
    type: 'Reconcile Payments'
  },
]


export default ReconcillationPage