'use client'
import AuditLogTable from '@/components/finance/payables/AuditLogTable';
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

const AuditLogPage = () => {
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
      <div className='sm:px-6 pt-4 text-base'>
        <main className='bg-secondary rounded-[16px] py-6 px-3'>
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-x-2 mt-6 mb-6'>
            <h2><ChevronLeft className='text-primary-normal inline-flex' onClick={()=>''} /> Audit Log</h2>
            <p className='text-primary-normal'>Export Audit Log <Image src='/square-arrow-out-right.svg' alt='arrow' width={24} height={24} className='inline' /></p>
          </div>
          {/* Audit log Table */}
          <AuditLogTable/>
        </main>
      </div>
  
    </div>
  )
}

export default AuditLogPage