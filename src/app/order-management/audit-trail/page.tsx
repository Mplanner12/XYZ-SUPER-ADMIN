"use client"
import HeaderLayout from '@/components/MainLayouts/HeaderLayout'
import Audit_TrailTable from '@/components/OrderManagementComponent/Audit_TrailTable/Audit_TrailTable';
import React from 'react'

const page = () => {
    const breadcrumbs = ['Admin Dashboard', 'Order Management'];

    return (
        <div>
            <HeaderLayout
                moduleLink='/order-management/overview'
                moduleName="Order Management Module"
                page="Audit Trail"
                breadcrumbs={breadcrumbs}
            />

            <main className="mt-5 p-1 [@media(min-width:925px)]:p-6">
                <section className="bg-[#FCFCFC] rounded-md p-1 [@media(min-width:925px)]:p-6">
                    <Audit_TrailTable title='Audit Trail' />
                </section>
            </main>
        </div>
    )
}

export default page