'use client'
import BillCreationTable from '@/components/finance/payables/BillCreationTable';
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import { Button } from '@/components/reusable/Button';
import { SelectField } from '@/components/reusable/SelectField';
import { MultilineTextField, TextField } from '@/components/reusable/TextField';
import { ChevronLeft, CircleCheck, EllipsisVertical, ForwardIcon, PaintBucket, Paperclip, PencilIcon, Plus, PrinterIcon, RotateCwIcon, SquareArrowOutUpRightIcon, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

const CreatePurchaseOrderPage = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [more, setMore] = useState<number | null>(null) //more is groupID
  const [createGroup, setCreateGroup] = useState(false)
  const [viewGroup, setViewGroup] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [onlinePayment, setOnlinePayment] = useState('')
  const router = useRouter()
  const {control} = useForm()

  const tabs = [
    "Vendor",
    "Transaction",
    "Automation",
  ];

  const removeGroupName = (nameToRemove: any) => {
    
  }

  const breadcrumbs = ['Admin Dashboard', 'Finance Module'];

  return (
    <div className='h-[100vh] overflow-scroll'>
      <HeaderLayout
        moduleName="Finance Module"
        moduleLink='/finance/overview'
        page="Payables Management"
        pageLink='/finance/payables'
        breadcrumbs={breadcrumbs}
      />
      <div className='px-3 py-6 pt-4'>
        <div className='bg-secondary rounded-[16px] py-6 px-3 mt-4'>
          <h2 className='mb-3'><ChevronLeft className ='inline' onClick={()=> router.push('/finance/payables')}/> Create Purchase Order</h2>
          <div className='space-y-4'>
            <div className='text-primary-normal flex gap-5'>
              <button className='flex gap-1'>Find <SquareArrowOutUpRightIcon size="16px"/></button>
              <button className='flex gap-1'>New <PrinterIcon size="16px"/></button>
              <button className='flex gap-1'>Save<ForwardIcon size="16px"/></button>
              <button className='flex gap-1'>Create A Copy <SquareArrowOutUpRightIcon size="16px"/></button>
              <button className='flex gap-1'>Delete <PrinterIcon size="16px"/></button>
              <button className='flex gap-1'>print <PrinterIcon  size="16px"/></button>
              <button className='flex gap-1'>Attach file <Paperclip size="16px"/></button>
            </div>
            <div className='flex gap-x-5 text-primary-normal'>
              <button className='flex gap-1'>Memorize <PaintBucket size="16px"/></button>
              <button className='flex gap-1'>Mark as Pending <RotateCwIcon size="16px"/></button>
              <button className='flex gap-1'
                onClick={()=> router.push('/finance/payables?menu=1')}
              >Create Bill <Paperclip size="16px"/></button>
              <button className='flex gap-1'
                onClick={()=> router.push('/finance/receivables/create-sales')}
              >Create Sales Order <Image src='/arrow-right-short.svg' alt='arrow' width={18} height={18} className='' /></button>
            </div>
          </div>
          {/* border  */}
          <div className='border-b border-[#BCBBBB] my-4'/>
          
          <div className='flex flex-col md:flex-row gap-x-3'>
            {/* main content */}
            <div className='w-4/6'>
              <h3 className='mb-6'>XYZ Corporation</h3>
              <SelectField
                name='location'
                label='Location'
                options={locationOptions}
                control={control}
              />
              <p className='my-4'>Date: May 1, 2024</p>
              <TextField
                name='preparedBy'
                label='Prepared By'
                font='semibold'
                placeholder='John Doe'
                control={control}
              />
            
              <div className='flex flex-col md:flex-row gap-x-4'>
                <div className='flex justify-between items-center gap-x-3 w-[272px] h-fit'>
                  <p className='font-semibold'>Bill Date</p>
                  <TextField
                    name='billDate'
                    type='date'
                    variant='short'
                    control={control}
                  />
                </div>
                <div className='flex items-center gap-x-3 h-fit'>
                  <p className='font-semibold'>Vendor</p>
                  <TextField
                    name='vendorName'
                    placeholder='Vendor xyx'
                    variant='short'
                    control={control}
                  />
                </div>
                <MultilineTextField
                  name='vendor'
                  rows={2}
                  variant='short'
                  placeholder='431 Hampshire Blvd East Bayshore'
                  control={control}
                />
              </div>
              <div className='flex flex-col md:flex-row gap-x-4'>
                <div className='flex justify-between items-center gap-x-3 w-[272px] h-fit'>
                  <p className='font-semibold'>BillNo</p>
                  <TextField
                    name='billNo'
                    variant='short'
                    placeholder='BO-1001'
                    control={control}
                  />
                </div>
                <div className='flex items-center gap-x-3 h-fit'>
                  <p className='font-semibold'>Ship To</p>
                  <TextField
                    name='vendorName'
                    placeholder='Customer XYZ'
                    variant='short'
                    control={control}
                  />
                </div>
                <MultilineTextField
                  name='vendor'
                  rows={2}
                  placeholder='910 Grapeville Ave East Bayshore'
                  variant='short'
                  control={control}
                />
              </div>
              {/* second use of this button */}
              <BillCreationTable /> 
              <div className='flex flex-col md:flex-row md:justify-between mt-5'>
                <div className='space-y-4'>
                  <TextField
                    name='vendorMessage'
                    label='Vendor Message'
                    placeholder='Great product'
                    variant='medium'
                    control={control}
                  />
                  <TextField
                    name='vendorName'
                    label='Description'
                    placeholder=''
                    variant='medium'
                    control={control}
                  />
                </div>
                <div className='flex flex-col md:flex-row md:justify-between gap-x-16 h-fit md:mr-10'>
                  <div className='space-y-4'>
                    <p>Total</p>
                  </div>
                  <div className='space-y-4'>
                    <p>1,800.00</p>
                  </div>
                </div>
              </div>
              {/* Button */}
              <div className='flex flex-col md:flex-row gap-6 mt-6'>
                <div className='w-[261px]'>
                  <Button fullWidth 
                    onClick={()=> ''}
                  >Create Putrchase Order</Button>
                </div>
                <div className='w-[261px]'>
                  <Button fullWidth variant='outlined'>Create Purchase Order & New</Button>
                </div>
                <button className='text-primary-normal'
                >Cancel</button>
              </div>
            </div>
            {/* Right side contents */}
            <div className='w-2/6 bg-white rounded-[16px] px-3 py-6'>
              <div className='flex justify-between items-center gap-x-2'>
                <p>Vendor</p>
                <SelectField
                  name='vendor'
                  options={vendorOptions}
                  variant='short'
                  control={control}
                />
              </div>
              <div className='flex justify-between items-center gap-x-2'>
                <p>List</p>
                <SelectField
                  name='class'
                  options={locationOptions}
                  variant='short'
                  control={control}
                />
              </div>
              <div className='flex justify-between items-center gap-x-2'>
                <p>Drop <br />Ship to</p>
                <TextField
                  name='dropShip'
                  placeholder='Remodel '
                  variant='short'
                  control={control}
                />
              </div>

              {/* Menu */}
              <div className='w-full flex justify-between flex-wrap sm:flex-nowrap gap-x-1 gap-y-2 bg-white border border-primary-normal rounded-[8px] overflow-hidden mt-6'>
                {tabs.map((tab, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setActiveTab(index)
                    }}
                    className={`w-fit px-2 py-2 rounded-[8px] transition-colors duration-300 cursor-pointer inline-flex items-center ${
                      activeTab === index
                        ? "bg-[#8133F1] text-white"
                        : "text-[#8133F1]"
                    }`}
                  >
                    {tab}
                  </p>
                ))}
              </div>
              {/* contents */}
              { activeTab === 0 && (
                <main>
                  <div className='space-y-3 mt-4'>
                    <p className='flex justify-between text-lg text-[#575757] font-medium'>Summary <PencilIcon className='text-[#8133F1]'/></p>
                    <div className='flex justify-between gap-6'>
                      <label>Phone</label> <p>555-3221-1111</p>
                    </div>
                    <div className='flex justify-between gap-6'>
                      <label>Email</label> <p>ismith@samplename.com</p>
                    </div>
                    <div className='flex justify-between gap-6'>
                      <label>Delivery Method</label> <p>Email</p>
                    </div>
                    <div className='flex justify-between gap-6'>
                      <label>Open Balance</label> <p>12,897</p>
                    </div>
                    {/* <div className='flex justify-between gap-6'>
                      <label>Active Estimate</label> <p>3</p>
                    </div> */}
                    <div className='flex justify-between gap-6'>
                      <label>Purchase order to be billed</label> <p>0</p>
                    </div>
                    {/* <div className='flex justify-between gap-6'>
                      <label>Reimbursable Expenses</label> <p>172.50</p>
                    </div> */}
                  </div>

                  <div className='space-y-3 mt-6'>
                    <p className='flex justify-between text-lg text-[#575757] font-medium'>Vendor Payment <PencilIcon className='text-[#8133F1]'/></p>
                    <div className='flex justify-between gap-6'>
                      <label>Vendor cannot pay Online</label>
                    </div>
                    <div className='flex gap-2 text-primary-normal'>
                      <input type='checkbox' value={onlinePayment} onChange={(e) => setOnlinePayment(e.target.value)} />
                      <p className='text-base'>Enable online Payment</p>
                    </div>
                  </div>
                  
                  <div className='space-y-3 mt-6'>
                    <p className='flex justify-between font-medium text-lg'>Recent Transaction </p>
                    {recentTransactions.map((transaction:any, index)=>(
                      <div key={index} className='flex justify-between gap-6 text-xs'>
                        <label>{transaction?.date} <span className='text-[#8133F1]'>{transaction?.name}</span> </label> <p>{transaction?.price}</p>
                      </div>
                    ))}
                  </div>

                  <div className='space-y-3 mt-6'>
                    <p className='flex justify-between text-lg text-[#575757] font-medium'>Notes <PencilIcon className='text-[#8133F1]'/></p>
                    <div className='flex justify-between'>
                      <label>Customer cannot pay Online</label> <p></p>
                    </div>
                  </div>
                </main>
              )}

              {activeTab === 1 && (
                <main className='space-y-3 mt-6'>
                  <p className='flex justify-between text-lg text-[#575757] font-medium'>Transactions</p>
                  {recentTransactions.map((transaction:any, index)=>(
                      <div key={index} className='flex justify-between gap-6 text-xs'>
                        <label>{transaction?.date} <span className='text-[#8133F1]'>{transaction?.name}</span> </label> <p>{transaction?.price}</p>
                      </div>
                    ))}
                </main>
              )}

              {activeTab === 2 && (
                <main className='text-base space-y-3 mt-6'>
                  <p className='flex justify-between text-lg text-[#575757] font-medium'>Automate Invoice generation</p>
                  <div className=''>
                    <div className='flex justify-between items-center gap-x-2'>
                      <p className='text-sm'>Frequency <br/>Type</p>
                      <SelectField
                        name='Frequency Type'
                        options={frequencyTypeOptions}
                        variant='short'
                        control={control}
                      />
                    </div>
                    <div className='flex justify-between items-center gap-x-2'>
                      <p className='text-sm'>Frequency</p>
                      <SelectField
                        name='Frequency '
                        options={frequencyOptions}
                        variant='short'
                        control={control}
                      />
                    </div>
                    <div className='flex justify-between items-center gap-x-2'>
                      <p className='text-sm'>Recurring <br/>Date</p>
                      <TextField
                        name='DecurringDate'
                        type='date'
                        variant='short'
                        control={control}
                      />
                    </div>
                    <div className='flex justify-between items-center gap-x-2'>
                      <p className='text-sm'>Number of <br/>Payments</p>
                      <TextField
                        name='noOfPayment'
                        placeholder='Remodel '
                        variant='short'
                        type='number'
                        control={control}
                      />
                    </div>
                  </div>
                  <p className='flex justify-between text-lg text-[#575757] font-medium mt-2'>Groups Billing</p>
                  <p className='flex gap-x-2 text-primary-normal cursor-pointer'
                    onClick={()=> setCreateGroup(!createGroup)}
                  ><Plus /> Create a Group</p>
                  <p className='text-[#727171]'>Groups (2)</p>
                  {groups.map((group, index)=>(
                    <div key={index} className='flex justify-between gap-x-4 relative'>
                      <p>{group?.name}</p>
                      <EllipsisVertical 
                        onClick={() =>{
                          more === group?.id ? setMore(null) : setMore(group?.id)
                        }}
                      />
                      {more === group?.id && (
                        <div className="w-fit h-fit bg-white space-y-4 absolute top-8 right-0 shadow-custom rounded-[8px] z-20 p-4 ">
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
                </main>
              )}
            </div>
          </div>
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
              <Button fullWidth>Save</Button>
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
              <Button>Delete</Button>
              <Button variant='outlined' 
                onClick={()=> setDeleteModal(false)}
              >Cancel</Button>
            </div>
          </div>
        </div>
      )}
      {createGroup && (
        <div className="flex items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
          <div className="relative w-fit max-h-[95%] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll no-scrollbar px-[50px] py-[50px] ">
            <Image src='/close-white-bg.svg'  alt='close' width={48} height={48} className='cursor-pointer absolute top-0 right-0'
              onClick={()=>setCreateGroup(!createGroup)}
            />
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
              <Button fullWidth>Create Group</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const locationOptions = [
	{ value: '', label: 'Select location' },
	{ value: 'lagos', label: 'Lagos' },
	{ value: 'abuja', label: 'Abuja' },
];
const vendorOptions = [
	{ value: '', label: 'Select vendor' },
	{ value: 'Company xyz', label: 'Company xyz' },
	{ value: 'rubber & co.', label: 'Rubber & co.' },
];
const frequencyTypeOptions = [
	{ value: 'lagos', label: 'One-time' },
];
const frequencyOptions = [
	{ value: 'lagos', label: 'Daily' },
];

const recentTransactions = [
  {
    date: '25-05-2024',
    name: 'Bill Print-Check',
    price: '$1,476.23'
  },
  {
    date: '25-05-2024',
    name: 'Bill-Paid',
    price: '$1,478.23'
  },
  {
    date: '25-05-2024',
    name: 'Bill Print-Check',
    price: '$1,476.23'
  }
]

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
export default CreatePurchaseOrderPage