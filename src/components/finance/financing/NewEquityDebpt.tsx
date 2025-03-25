'use client'
import { SelectField } from '@/components/reusable/SelectField'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import FinancingDetailsEquityTable from './FinancingDetailsEquityTable'
import FinancingDetailsDebtTable from './FinancingDetailsDebtTable'
import { Button } from '@/components/reusable/Button'
import Image from 'next/image'
import { Bird, Info } from 'lucide-react'
import EmptyState from '@/components/reusable/EmptyState'
import { Step } from '@mui/material'

const NewEquityDebpt = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [financingType, setFinancingType] = useState('equity')
  const [loanDetails, setLoanDetails] = useState(false)
  const [loans, setLoans] = useState([
    {
      id: 1,
      step: 'Initial Review by Portfolio Manager',
      name: 'Ahmed Sule',
      status: 'approved',
    },
    {
      id: 2,
      step: 'Final Approval by Investment Committee',
      name: 'Sadiq Lamido',
      status: 'approved',
    },
  ]);
  const {control} = useForm()

  const tabs = [
    "Financing Details",
    "Approval",
  ];

  const handleStatusChange = (id:number, newStatus:string) => {
    setLoans(prevLoans =>
      prevLoans.map(loan =>
        loan.id === id ? { ...loan, status: newStatus } : loan
      )
    );
  };

  return (
    <main className='mt-6'>
      <div className='mb-4'>
        <h2 className='mb-4'>New Equity/Debt</h2>
        <SelectField
          name='financingType'
          label='Select Financing Type'
          options={fininacingTypeOptions}
          control={control}
          onChange={(e) => setFinancingType(e.target.value)}
        />
      </div>
      {/* Menu */}
      <div className='bg-[#8133F1] p-3 flex gap-y-2 flex-wrap sm:flex-nowrap w-fit rounded-xl mb-4'>
        {tabs.map((tab, index) => (
          <p
            key={index}
            onClick={() => {
              setActiveTab(index)
            }}
            className={`w-fit px-4 py-2 rounded-[8px] transition-colors duration-300 cursor-pointer inline-flex items-center ${
              activeTab === index
                ? "bg-white text-[#8133F1]"
                : "text-white"
            }`}
          >
            {tab}
          </p>
        ))}
      </div>
      {/* contents */}
      {activeTab === 0 && (
        <div>
          { financingType === 'equity' ? (
            <FinancingDetailsEquityTable />
          ) : (
            <FinancingDetailsDebtTable />
          )}
          
        </div>
        
      )}
      {activeTab === 1 && (
        <>
        <h3 className='mb-4'>Approval</h3>
          <div className="w-full mx-auto overflow-x-auto no-scrollbar">
            <table className="min-w-full bg-white border border-[#EAECF0]">
              <thead className="font-semibold border border-[#EAECF0] shadow-sm">
                <tr className="bg-[#FAFAFA] text-sm text-[#575757] ">
                  <th className="py-6 px-4 font-semibold text-nowrap text-left">
                    <p>Approval Step</p>
                  </th>
                  <th className="py-2 px-4 font-semibold text-nowrap text-left">
                    <p>Name</p>
                  </th>
                  <th className="py-2 px-4 font-semibold text-nowrap text-left">
                    <p>Status</p>
                  </th>
                  <th className="py-2 px-4 font-semibold text-nowrap text-left">
                    <p>Date</p>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white text-sm divide-y divide-[#EAECF0]">
                {loans?.length > 0 ? loans?.map((item:any, index:any) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-white"}`}
                  >
                    <td className="px-4 py-6 whitespace-nowrap text-left">
                      {item?.step}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {item?.name}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <select className='outline-none' 
                        value={item?.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      >
                        <option value="approved">Approved</option>
                        <option value="disapproved">Disapproved</option>
                      </select>
                      
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      01-15-2024
                    </td>
                  </tr>
                )) : (
                  <div className='w-full'>
                  <EmptyState
                    img={
                      <Bird
                        size={150}
                        className="text-primary-normal p-1 rounded-lg"
                      />
                    }
                    title={`No Record Found`}
                    text={`Oops! It seems that there is no record`}
                  />
                  </div>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
      <div className='flex justify-between gap-x-4 mt-4'>
        <Button variant='outlined' onClick={()=> setActiveTab(0)}>Prev</Button>
        <Button onClick={()=> {
          setActiveTab(1)
          activeTab === 1 && setLoanDetails(true)
        }}>{activeTab === 0 ? 'Next' : 'Submit'}</Button>
      </div>
      {loanDetails && (
        <div className="flex items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
          <div className="relative w-fit max-h-[95%] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll no-scrollbar px-[50px] py-[100px] ">
            <Image src='/close-white-bg.svg'  alt='close' width={48} height={48} className='absolute top-0 right-0'
              onClick={()=>setLoanDetails(!loanDetails)}
            />
            <h2 className='mb-6'>Loan Details</h2>
            <div className="bg-[#FAFAFA] rounded-[16px] w-fit px-4 py-6 mb-8">
              <p className='text-[#939292] text-[20px] mb-4'>Repayment Information <Info size={18} className='text-[#575757] inline' /></p>
              <div className='flex gap-x-10 text-base'>
                <div className='space-y-3'>
                  <p>Loan Amount=$ 100,000</p>
                  <p>Interest rate=10%</p>
                  <p>Repayment Frequency=Monthly</p>
                  <p>Moratorium=3 Months</p>
                  <p>Starting Date=January 1, 2024</p>
                </div>
                <div className='space-y-3'>
                  <p>Currency=USD</p>
                  <p>Monthly Payment=$ 12,667.2</p>
                  <p>Total Interest Paid=$ 4,524.05</p>
                  <p>Total Repayment =$ 102,500</p>
                </div>
              </div>
            </div>
            <h3 className='text-gray1-100 mb-3'>Loan Repayment Schedule</h3>
            <div className="w-full mx-auto overflow-x-auto no-scrollbar">
              <table className="min-w-full bg-white border border-[#EAECF0]">
                <thead className="font-semibold border border-[#EAECF0] shadow-sm">
                  <tr className="bg-[#FAFAFA] text-sm text-[#575757] ">
                    <th className="py-6 px-4 font-semibold text-nowrap text-left">
                      <p>Month</p>
                    </th>
                    <th className="py-2 px-4 font-semibold text-nowrap text-left">
                      <p>Payment (USD)</p>
                    </th>
                    <th className="py-2 px-4 font-semibold text-nowrap text-left">
                      <p>Interest</p>
                    </th>
                    <th className="py-2 px-4 font-semibold text-nowrap text-left">
                      <p>Principal</p>
                    </th>
                    <th className="py-2 px-4 font-semibold text-nowrap text-left">
                      <p>Balance(USD)</p>
                    </th>
                    <th className="py-2 px-4 font-semibold text-nowrap text-left">
                      <p>Action</p>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white text-sm divide-y divide-[#EAECF0]">
                  {loans?.length > 0 ? loans?.map((item:any, index:any) => (
                    <tr
                      key={index}
                      className={`${index % 2 === 0 ? "bg-white" : "bg-white"}`}
                    >
                      <td className="px-4 py-6 whitespace-nowrap text-left">
                        1
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        -
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        833.33
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        -
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        100,833.33
                      </td>
                      <td className={`px-5 py-4 whitespace-nowrap `}>
                        Moratorium
                      </td>
                    </tr>
                  )) : (
                    <div className='w-full'>
                    <EmptyState
                      img={
                        <Bird
                          size={150}
                          className="text-primary-normal p-1 rounded-lg"
                        />
                      }
                      title={`No Record Found`}
                      text={`Oops! It seems that there is no record`}
                    />
                    </div>
                  )}
                </tbody>
                <tfoot className="font-semibold border border-[#EAECF0] shadow-sm">
                  <tr className="text-sm text-[#575757] ">
                    <td className="py-6 px-4 font-semibold text-nowrap text-left">
                      <p>Total</p>
                    </td>
                    <td className="py-2 px-4 font-semibold text-nowrap text-left">
                      <p>106,547.68</p>
                    </td>
                    <td className="py-2 px-4 font-semibold text-nowrap text-left">
                      <p>106,547.68</p>
                    </td>
                    <td className="py-2 px-4 font-semibold text-nowrap text-left">
                      <p>106,547.68</p>
                    </td>
                    <td className="py-2 px-4 font-semibold text-nowrap text-left">
                    </td>
                    <td className="py-2 px-4 font-semibold text-nowrap text-left">
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className='w-[340px] mt-4'>
              <Button fullWidth onClick={()=>{setLoanDetails(!loanDetails)}}>Done</Button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

const fininacingTypeOptions = [
	{ value: 'equity', label: 'Equity' },
  { value: 'debt', label: 'Debt' },
];

const loans = [
  {
    id: 1,
    step: 'Initial Review by Portfolio Manager',
    name: 'Ahmed Sule	',
  },
  {
    id: 2,
    step: 'Final Approval by Investment Committee',
    name: 'Sadiq Lamido',
  },
]
export default NewEquityDebpt