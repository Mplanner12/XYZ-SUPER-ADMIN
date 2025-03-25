"use client"
import AccountingListPg from '@/components/accounting/accountingList/AccountingList';
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';



const AccountingList = () => {
    const breadcrumbs = ['Admin Dashboard', 'Accounting Module'];

    return (
        <div className=''>
            <HeaderLayout
                moduleName="Accounting Module"
                page="Accounting List"
                breadcrumbs={breadcrumbs}
            />
            <div className='px-7 pt-4'>
                <AccountingListPg />
            </div>
        </div>
    )
}

export default AccountingList;