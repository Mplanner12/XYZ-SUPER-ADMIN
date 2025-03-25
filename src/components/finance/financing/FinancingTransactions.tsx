'use client'
import { Button } from '@/components/reusable/Button'
import { SelectField } from '@/components/reusable/SelectField';
import { Plus } from 'lucide-react';
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form';
import IssueJournalTable, { IssueJournapProps } from './investment-transaction/IssueJournalTable';
import RepurchaseJournalTable, { RepurchaseJournalProps } from './investment-transaction/RepurchaseJournalTable';
import ValuationJournalTable, { ValuationJournalProps } from './investment-transaction/ValuationJournalTable';


const FinancingTransactions = () => {
  const [transactionType, setTransactionType] = useState('Issue Journal')
  const [finances, setFinances] = useState([
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

  // getting table data
  const [tableData, setTableData] = useState<IssueJournapProps[]>([]);
  const handleTableDataUpdate = useCallback((data: IssueJournapProps[]) => {
    setTableData(data);
  }, []);

  const [repurchaseTableData, setRepurchaseTableData] = useState<RepurchaseJournalProps[]>([]);
  const handleRepurchaseTableDataUpdate = useCallback((data: RepurchaseJournalProps[]) => {
    setRepurchaseTableData(data);
  }, []);

  const [valuationTableData, setValuationTableData] = useState<ValuationJournalProps[]>([]);
  const handleValuationTableDataUpdate = useCallback((data: ValuationJournalProps[]) => {
    setValuationTableData(data);
  }, []);

  return (
    <div className='mt-6'>
      <h2 className='mb-4'>Financing Transactions</h2>
      <SelectField
        name='financingType'
        label='Select Transaction Type'
        options={transactionTypeOptions}
        control={control}
        onChange={(e) => setTransactionType(e.target.value)}
      />

      { transactionType === 'Issue Journal' ? (
        <>
          <p className='font-semibold my-4'>Issue Journal</p>
          {/* Table */}
          <IssueJournalTable onDataUpdate={handleTableDataUpdate } />
          <div className='flex flex-col md:flex-row gap-6 mt-6'>
            <div className='w-[157px]'>
              <Button fullWidth>Save</Button>
            </div>
            <div className='w-[269px]'>
              <Button fullWidth variant='outlined'>
                Save & Create New
              </Button>
            </div>
            <button className='text-primary-normal'>Cancel</button>
          </div>
        </>
      ) : transactionType === 'Repurchase Journal' ? (
        <>
          <p className='font-semibold my-4'>Repurchase Journal</p>
          {/* Table */}
          < RepurchaseJournalTable onDataUpdate={handleRepurchaseTableDataUpdate} />
          <div className='flex flex-col md:flex-row gap-6 mt-6'>
            <div className='w-[157px]'>
              <Button fullWidth>Save</Button>
            </div>
            <div className='w-[269px]'>
              <Button fullWidth variant='outlined'>
                Save & Create New
              </Button>
            </div>
            <button className='text-primary-normal'>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <p className='font-semibold my-4'>Valuation Journal</p>
          {/* Table */}
          <ValuationJournalTable onDataUpdate={handleValuationTableDataUpdate } />
          <div className='flex flex-col md:flex-row gap-6 mt-6'>
            <div className='w-[157px]'>
              <Button fullWidth>Save</Button>
            </div>
            <div className='w-[269px]'>
              <Button fullWidth variant='outlined'>
                Save & Create New
              </Button>
            </div>
            <button className='text-primary-normal'>Cancel</button>
          </div>
        </>
      )}
    </div>
  )
}
const transactionTypeOptions = [
	{ value: 'Issue Journal', label: 'Issue Journal' },
  { value: 'Repurchase Journal', label: 'Repurchase Journal' },
  { value: 'Valuation Journal', label: 'Valuation Journal' },
];
export default FinancingTransactions