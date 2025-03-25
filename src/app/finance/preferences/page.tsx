'use client'
import PreferencesCard from '@/components/finance/preferences/PreferencesCard';
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import { Button } from '@/components/reusable/Button';
import { SelectField } from '@/components/reusable/SelectField';
import { TextField } from '@/components/reusable/TextField';
import { ArrowLeftRight, CalendarClock, ChartSpline, Database, LayoutTemplate, TypeOutline } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

const PreferencesPage = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [notification, setNotification] = useState('')
  const [accountType, setAccountType] = useState('')
  const [automaticReconciliation, setAutomaticReconciliation] = useState('')
  const [twoFa, setTwoFa] = useState('')
  const [language, setLanguage] = useState('english')
  const [country, setCountry] = useState('nigeria')
  const [currency, setCurrency] = useState('naira')
  const [reconciliationFrequency , setReconciliationFrequency ] = useState('')
  const [accountingSoftware, setAccountingSoftware] = useState('Quickbooks')
  const [dataFormat, setDataFormat] = useState<string>('')
  const [matchCriteria, setMatchCriteria] = useState('')
  const [matchTolerance, setMatchTolerance] = useState('')
  const {control} = useForm()
  const breadcrumbs = ['Admin Dashboard', 'Finance Module'];

  const tabs = [
    "Notifications",
    "Accounting Settings",
    "Language & Localization",
    "Report & Charts",
    'Security Settings',
    "Appearance",
    'API Integration',
  ];
  return (
    <div className='h-[100vh] overflow-scroll'>
      <HeaderLayout
        moduleName="Finance Module"
        moduleLink='/finance/overview'
        page="Preferences"
        pageLink='finance/preferences'
        breadcrumbs={breadcrumbs}
      />
      <div className=' sm:p-6 pt-4'>
        <div className='bg-secondary rounded-[16px] py-6 px-3 mt-4'>
          {/* Menu */}
          <div className='bg-[#8133F1] p-3 flex gap-y-2 flex-wrap sm:flex-nowrap w-fit rounded-xl'>
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
          { activeTab === 0 && (
            <main className='text-base mt-10'>
              <h2 className='font-normal mb-4'>Notification Settings</h2>
              <div className='flex items-center gap-2 mb-2'>
                <input type="radio" width={80} 
                  name='bill'
                  value="automatic"
                  checked={notification === 'automatic'}
                  onChange={() => setNotification('automatic')}
                />
                <p className='max-w-[600px]'>Automatic notifications for approvers, staff, or other relevant personnel using the 
                Finance module</p>
              </div>
              <div className='flex items-center gap-2'>
                <input type="radio"
                  name='bill'
                  value="no"
                  checked={notification === 'no'}
                  onChange={() => setNotification('no')}
                />
                <p>Don’t send notifications</p>
              </div>

              <h2 className='font-normal mt-10 mb-4'>Email & Communications</h2>
              <div className='flex items-center gap-2 mb-2'>
                <input type="checkbox"
                  value="automatic"
                  checked={notification === 'automatic'}
                  onChange={() => setNotification('automatic')}
                />
                <p>Automatic notifications for approvers, staff, or other relevant personnel using the 
                Finance module</p>
              </div>
              <div className='flex items-center gap-2'>
                <input type="checkbox"
                  value="no"
                  checked={notification === 'no'}
                  onChange={() => setNotification('no')}
                />
                <p>Don’t send notifications</p>
              </div>
            </main>
          )}

          {activeTab === 1 && (
            <main className='text-base mt-10'>
              <h2 className='font-normal mb-4'>Account Settings</h2>
              <div>
                <h3 className='text-[18px] font-medium mb-2'>1. Select Accounting Type</h3>
                <div className='flex items-center gap-2 mb-2'>
                  <input type="radio"
                    name='accountType'
                    value="Accrual basis"
                    checked={notification === 'Accrual basis'}
                    onChange={() => setNotification('Accrual basis')}
                  />
                  <p>Accrual basis</p>
                </div>
                <div className='flex items-center gap-2'>
                  <input type="radio"
                    name='accountType'
                    value="Cash Basis"
                    checked={accountType === 'Cash Basis'}
                    onChange={() => setAccountType('Cash Basis')}
                  />
                  <p>Cash Basis</p>
                </div>
              </div>
              {/* border */}
              <div className='border-b border-[#B5B5B5] my-6'/>

              {/* Number 2 */}
              <div>
                <h3 className='text-[18px] font-medium mb-2'>2. General Settings</h3>
                <p className='text-[#727171] font-medium'>Enable Automatic Reconciliation</p>
                <p className='text-sm text-[#727171] mb-2'>Toggle to enable or disable automatic reconciliation of bank statements with accounting records</p>
                <div className='flex items-center gap-2 mb-2'>
                  <input type="radio"
                    name='reconcillation'
                    value="yes"
                    checked={notification === 'yes'}
                    onChange={() => setNotification('yes')}
                  />
                  <p>Yes</p>
                </div>
                <div className='flex items-center gap-2'>
                  <input type="radio"
                    name='reconcillation'
                    value="yes"
                    checked={automaticReconciliation === 'no'}
                    onChange={() => setAutomaticReconciliation('no')}
                  />
                  <p>No</p>
                </div>

                {/* reconcillation frequency */}
                <div>
                  <p className='text-[#727171] font-medium mt-2'>Reconciliation Frequency</p>
                  <p className='text-sm text-[#727171] mb-2'>Select how often you want the reconciliation process to run automatically</p>
                  <div className='flex items-center gap-2 mb-2'>
                    <input type="radio"
                      name='reconcillation'
                      value="daily"
                      checked={reconciliationFrequency === 'daily'}
                      onChange={() => setReconciliationFrequency('daily')}
                    />
                    <p>Daily</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <input type="radio"
                      name='reconcillationFrequency'
                      value="weekly"
                      checked={reconciliationFrequency === 'weekly'}
                      onChange={() => setReconciliationFrequency ('weekly')}
                    />
                    <p>Weekly</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <input type="radio"
                      name='reconcillation'
                      value="monthly"
                      checked={reconciliationFrequency === 'monthly'}
                      onChange={() => setReconciliationFrequency('monthly')}
                    />
                    <p>Monthly</p>
                  </div>
                </div>

                <div>
                  <p className='text-[#727171] font-medium mt-2'>Reconciliation Time</p>
                  <p className='text-sm text-[#727171] mb-2'>Choose the time of day for automatic reconciliation to occur</p>
                  <TextField
                    name='time'
                    type='time'
                    variant='short'
                    control={control}
                  />
                </div>
              </div>
              {/* border */}
              <div className='border-b border-[#B5B5B5] my-6'/>

              {/* number 3 */}
              <div>
                <h3 className='text-[18px] font-medium mb-2'>3. Data Integration Settings</h3>
                <p className='text-[#727171] font-medium mt-2'>Bank Account Integration</p>
                <p className='text-[#727171]'>Connect Bank Account</p>
                <p className='text-[#727171] font-medium mt-2 mb-1'>Accounting Software Integration</p>
                <p>Select your accounting software for data synchronization</p>
                <SelectField
                  name='accounting software'
                  options={accountingSoftwareOptions}
                  control={control}
                  onChange={(e) => setAccountingSoftware(e.target.value)}
                />
                <p className='text-[#727171] font-medium mt-2 mb-1'>Data Format</p>
                <p className='text-sm'>Choose the data format for importing bank statements and exporting reconciled records</p>
                <div className='flex items-center gap-2 mb-2'>
                  <input type="radio"
                    name='dataFormat'
                    value="ISO 20022"
                    checked={dataFormat === 'ISO 20022'}
                    onChange={() => setDataFormat('ISO 20022')}
                  />
                  <p>ISO 20022</p>
                </div>
                <div className='flex items-center gap-2'>
                  <input type="radio"
                    name='dataFormat'
                    value="CSV"
                    checked={dataFormat === 'CSV'}
                    onChange={() => setDataFormat('CSV')}
                  />
                  <p>CSV</p>
                </div>
                <div className='flex items-center gap-2'>
                  <input type="radio"
                    name='dataFormat'
                    value="XML"
                    checked={dataFormat === 'XML'}
                    onChange={() => setDataFormat('XML')}
                  />
                  <p>XML</p>
                </div>
              </div>
              {/* border */}
              <div className='border-b border-[#B5B5B5] my-6'/>

              {/* Number 4 */}
              <div>
                <h3 className='text-[18px] font-medium mb-2'>4. Matching Criteria Settings</h3>
                <p className='text-[#727171] font-semibold mt-2 mb-1'>Match Criteria</p>
                <p className='text-sm'>Select the criteria used to automatically match transactions from bank statements to accounting records</p>
                <div className='flex items-center gap-2 mb-2'>
                  <input type="radio"
                    name='matchCriteria'
                    value="Transaction Date"
                    checked={matchCriteria === 'Transaction Date'}
                    onChange={() => setMatchCriteria('Transaction Date')}
                  />
                  <p>Transaction Date</p>
                </div>
                <div className='flex items-center gap-2'>
                  <input type="radio"
                    name='matchCriteria'
                    value="Transaction Amount"
                    checked={matchCriteria === 'Transaction Amount'}
                    onChange={() => setMatchCriteria('Transaction Amount')}
                  />
                  <p>Transaction Amount</p>
                </div>
                <div className='flex items-center gap-2'>
                  <input type="radio"
                    name='matchCriteria'
                    value="Transaction Amount"
                    checked={matchCriteria === 'Transaction Amount'}
                    onChange={() => setMatchCriteria('Transaction Amount')}
                  />
                  <p>Transaction Description</p>
                </div>

                <p className='text-[#727171] font-semibold mt-2 mb-1'>Tolerance Level for Matching</p>
                <p className=''>Specify tolerance level</p>
                <div className='flex items-center gap-2 mb-2'>
                  <input type="radio"
                    name='matchTolerance'
                    value="Exact Match Only"
                    checked={matchTolerance === 'Exact Match Only'}
                    onChange={() => setMatchTolerance('Exact Match Only')}
                  />
                  <p>Exact Match Only</p>
                </div>
                <div className='flex items-center gap-2'>
                  <input type="radio"
                    name='matchTolerance'
                    value="Allow Partial Matches"
                    checked={matchTolerance === 'Allow Partial Matches'}
                    onChange={() => setMatchTolerance('Allow Partial Matches')}
                  />
                  <p>Allow Partial Matches</p>
                </div>
                <p className='mt-4 mb-2'>Set the acceptable tolerance level for matching transactions</p>
              </div>
              {/* button */}
              <div className='flex items-center gap-4 mt-4'>
                <Button variant='outlined'> Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </main>
          )}

          {activeTab === 2 && (
            <main className='text-base mt-10'>
              <h2 className='font-normal mb-6'>Language & Localization settings</h2>
              <div className='space-y-4'>
                <SelectField
                  name='language'
                  label='Select a preferrred Language'
                  options={languageOptions}
                  control={control}
                  onChange={(e) => setLanguage(e.target.value)}
                />
                <SelectField
                  name='country'
                  label='Country'
                  options={countryOptions}
                  control={control}
                  onChange={(e) => setCountry(e.target.value)}
                />
                <SelectField
                  name='currency'
                  label='Currency'
                  options={currencyOptions}
                  control={control}
                  onChange={(e) => setCurrency(e.target.value)}
                />
              </div>
            </main>
          )}

          {activeTab === 3 && (
           <main className='text-base mt-10'>
              <h2 className='font-normal mb-8'>Reports & Charts Settings</h2>
              <div className='space-y-4'>
                <div className='flex items-center gap-x-3'>
                  <p><Database /></p>
                  <div>
                    <h3 className='text-[18px] font-medium mb-1'>Preferred Data Filters</h3>
                    <p className='text-sm'>Select filters used on tables.</p>
                  </div>
                </div>
                <div className='flex items-center gap-x-3'>
                  <p><CalendarClock /></p>
                  <div>
                    <h3 className='text-[18px] font-medium mb-1'>Time Interval</h3>
                    <p className='text-sm'>Select the time interval when working with dates.</p>
                  </div>
                </div>
                <div className='flex items-center gap-x-3'>
                  <p><ChartSpline /></p>
                  <div>
                    <h3 className='text-[18px] font-medium mb-1'>Charts Types</h3>
                    <p className='text-sm'>Select the Chart types you prefer.</p>
                  </div>
                </div>
              </div>
            </main>
          )}

          {activeTab === 4 && (
            <main className='text-base mt-10'>
              <h2 className='font-normal mb-8'>Security Settings</h2>
              <h3 className='text-[18px] font-medium mb-2'>Two-factor Authentication</h3>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <input type="radio"
                    name='twofa'
                    value="enable"
                    checked={twoFa=== 'enable'}
                    onChange={() => setTwoFa('enable')}
                  />
                  <p>Enable Two-factor Authentication</p>
                </div>
                <div className='flex items-center gap-2'>
                  <input type="radio"
                    name='twofa'
                    value="disable"
                    checked={twoFa === 'disable'}
                    onChange={() => setTwoFa('disable')}
                  />
                  <p>Don’t enable two-factor authentication</p>
                </div>
              </div>
              <h3 className='text-[18px] font-medium mt-6 mb-2'>Login Session Expiration</h3>
              <SelectField
                name='login'
                options={loginSessionOptions}
                control={control}
                onChange={(e) => setCurrency(e.target.value)}
              />
            </main>
          )}
          {activeTab === 5 && (
            <main className='text-base mt-10'>
              <h2 className='font-normal mb-8'>Appearance</h2>
              <div className='space-y-4'>
                <div className='flex items-center gap-x-3'>
                  <p><ArrowLeftRight /></p>
                  <div>
                    <h3 className='text-[18px] font-medium mb-1'>Change Theme</h3>
                    <p className='text-sm'>Switch your app theme</p>
                  </div>
                </div>
                <div className='flex items-center gap-x-3'>
                  <p><LayoutTemplate /></p>
                  <div>
                    <h3 className='text-[18px] font-medium mb-1'>Default View</h3>
                    <p className='text-sm'>Select the default view for tables</p>
                  </div>
                </div>
                <div className='flex items-center gap-x-3'>
                  <p><TypeOutline /></p>
                  <div>
                    <h3 className='text-[18px] font-medium mb-1'>Fonts</h3>
                    <p className='text-sm'>Select the default font </p>
                  </div>
                </div>
              </div>
            </main>
          )}
          {activeTab === 6 && (
            <main className='text-base mt-10'>
              <h2 className='font-normal mb-8'>API Integration</h2>
              <div className='flex flex-wrap grow shrink gap-3 justify-between items-start min-w-[240px] max-md:max-w-full'>
                <PreferencesCard
                  icon='/check.svg'
                  title='Finance Module API'
                  text='Import account information from Finance module seamlessly'
                />
                <PreferencesCard
                  icon='/check.svg'
                  title='Sales Module API'
                  text='Import account information from Sales module seamlessly'
                />
                <PreferencesCard
                  icon='/check.svg'
                  title='Payroll Module API'
                  text='Import account information from Payroll module seamlessly'
                />
                <PreferencesCard
                  icon='/check.svg'
                  title='Purchase Module API'
                  text='Import account information from Sales module seamlessly'
                />
              </div>
            </main>
          )}
        </div>
      </div>
    </div>
  )
}

const languageOptions = [
	{ value: 'english', label: 'English' },
  { value: 'french', label: 'French' },
];
const countryOptions = [
	{ value: 'nigeria', label: 'Nigeria' },
  { value: 'usa', label: 'United States of America' },
];
const currencyOptions = [
  { value: '', label: 'Select default currency' },
	{ value: 'naira', label: 'Naira' },
  { value: 'usd', label: 'USD' },
];
const loginSessionOptions = [
  { value: '', label: 'Select a duration for you login validity' },
	{ value: '20', label: '20 Minutes' },
  { value: '30', label: '30 Minutes' },
];
const accountingSoftwareOptions = [
	{ value: 'Quickbooks', label: 'Quickbooks' },
  { value: 'Xero', label: 'Xero' },
  { value: 'Wave', label: 'Wave' },
  { value: 'Freshbooks', label: 'Freshbooks' },
  { value: 'Sage 50Cloud', label: 'Sage 50Cloud' },
  { value: 'MYOB', label: 'MYOB' },
];
export default PreferencesPage 