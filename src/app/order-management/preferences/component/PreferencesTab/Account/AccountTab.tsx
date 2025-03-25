import CustomInput from '@/components/Frominput/CustomInput';
import { CreditAccountsData, DebitAccountsData, TransactionTypesData } from '@/util/mockData/mockData';
import { useFormik } from 'formik';
import React from 'react'

const AccountTab: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      TrasnsationSales:"",
      debitAccount: "",
      trasnsationType:"",
      creditAccount: ""

    },
    onSubmit() { },
  });
  return (
    <main>
      <h2 className=" text-lg md:text-2xl font-semibold mb-6">Account Settings</h2>
      <p className="text-sm md:text-xl font-semibold mb-6">Sales Account Information</p>

      <div className='w-full max-[942px]:w-[45rem]'>
      <form onSubmit={formik.handleSubmit}>
        <div className='flex md:flex-row flex-col gap-3 md:gap-5'>
      <CustomInput
        placeholder='Enter Sales name or description'
        label='Transactions Description on Sales'
        type='text'
        id="TrasnsationSales"
        name='TrasnsationSales'
        onChange={formik.handleChange}
        value={formik.values.TrasnsationSales}
      />
      <CustomInput
        placeholder='Select the transaction type '
        label='Transaction Type'
        type='select'
        id="trasnsationType"
        name='trasnsationType'
        onChange={formik.handleChange}
        value={formik.values.trasnsationType}
        options={TransactionTypesData}
      />
        </div>

        <div className='flex md:flex-row flex-col gap-3 md:gap-5 md:mt-4'>
      <CustomInput
        placeholder='Select the debit account for sales'
        label='Debit Account'
        type='select'
        id="debitAccount"
        name='debitAccount'
        onChange={formik.handleChange}
        value={formik.values.debitAccount}
        options={DebitAccountsData}
      />
      <CustomInput
        placeholder='Credit Account'
        label='Select the debit account for sales'
        type='select'
        id="creditAccount"
        name='creditAccount'
        onChange={formik.handleChange}
        value={formik.values.creditAccount}
        options={CreditAccountsData}
      />
        </div>
      </form>
      </div>
    </main>
  )
}

export default AccountTab