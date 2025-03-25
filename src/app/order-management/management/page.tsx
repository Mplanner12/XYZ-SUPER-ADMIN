"use client"
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ManagementTabBar from './component/managementTabBar/ManagementTabBar';
import CreationTab from './component/managementTabs/CreationTab/CreationTab';
import CreateNewOrderPage from './component/managementTabs/CreationTab/component/create-new-order/page';
import CreateReturnOrderpage from './component/managementTabs/CreationTab/component/create-return-order/page';
import AprovalTab from './component/managementTabs/AprovalTab/AprovalTab';
import ConfirmationTabs from './component/managementTabs/ConfirmationTabs/ConfirmationTabs';
import OrderCreationPage from './component/managementTabs/CreationTab/component/order-creation-settings/page';
import PaymentTab from './component/managementTabs/PaymentTab/PaymentTab';
import FulfillmentTab from './component/managementTabs/FulfillmentTab/FulfillmentTab';
import InvoiceGenerationTab from './component/managementTabs/InvoiceGenerationTab/InvoiceGenerationTab';
import { ChevronDown } from 'lucide-react';
import ManageCustomInvoice from './component/managementTabs/CreationTab/component/order-creation-settings/component/manage-custom-invoice/page';
import ManageTaskInvoice from './component/managementTabs/CreationTab/component/order-creation-settings/component/manage-tax-invoice/page';
import ManageDiscountProduct from './component/managementTabs/CreationTab/component/order-creation-settings/component/manage-discount-product/page';


const ManagementPage: React.FC = () => {
  const breadcrumbs = ['Admin Dashboard', 'Order Management'];
  const [activeTab, setActiveTab] = useState('Order Creation');
  const [activePage, setActivePage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleUrlChange = () => {
      const tabFromUrl = searchParams.get('tab');
      const pageFromUrl = searchParams.get('page');
      if (tabFromUrl) {
        setActiveTab(tabFromUrl);
      }
      if (pageFromUrl) {
        setActivePage(pageFromUrl);
      } else {
        setActivePage(null);
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, [searchParams]);

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    setActivePage(null);
    router.push(`/order-management/management?tab=${encodeURIComponent(tabName)}`);
  };

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [dropdownOpen]);
  return (
    <div>
      <HeaderLayout
        moduleName="Order Management Module"
        page="Order Management"
        breadcrumbs={breadcrumbs}
        moduleLink='/order-management/overview'
      />
      <main className=" flex p-2 [@media(min-width:1288px)]:p-6">
        <section className="bg-[#FCFCFC] w-full rounded-md flex-grow p-2 [@media(min-width:1288px)]:p-6">
          <ManagementTabBar activeTab={activeTab} onTabChange={handleTabChange} />
          <div className='mt-5 p-2 [@media(min-width:1288px)]:p-7 '>
          {dropdownOpen && (
                <div
                    ref={dropdownRef}
                    className='absolute top-72 left-96 bg-white shadow-md rounded-lg p-5 z-50 mb-5'>
                    <ul className='space-y-2 cursor-pointer'>
                        <li className='cursor-pointer'>All Outlets</li>
                        <li className='cursor-pointer'>Lekki Store</li>
                        <li className='cursor-pointer'>Mushin Store</li>
                        <li className='cursor-pointer'>Wuse Store</li>
                        <li className='cursor-pointer'>Gwarinpa Store</li>
                    </ul>
                </div>
            )}
            <div
                onClick={handleToggleDropdown}
                className='gap-2 flex items-center cursor-pointer w-fit mb-5'>
                <p className='font-medium tracking-wider text-[#434343] text-xl'>Sales Outlets</p>
                <ChevronDown className='text-primary-normal' />
            </div>
            {activeTab === 'Order Creation' && (
              <>
                {activePage === 'create-new-order' && <CreateNewOrderPage />}
                {activePage === 'create-return-order' && <CreateReturnOrderpage />}
                {activePage === 'order-creation-settings' && <OrderCreationPage />}
                {activePage === 'manage-custom-invoice' && <ManageCustomInvoice />}
                {activePage === 'manage-tax-invoice' && <ManageTaskInvoice />}
                {activePage === 'manage-discount-product' && <ManageDiscountProduct />} 
                {activePage === null && <CreationTab />}
              </>
            )}
            {activeTab === 'Order Approval' && (
              <div>
                <AprovalTab />
              </div>
            )}

            {activeTab === 'Order Confirmation' && (
              <div>
                <ConfirmationTabs />
              </div>
            )}


            {activeTab === 'Order Fulfillment' && (
              <div>
                <FulfillmentTab />
              </div>
            )}

            {activeTab === 'Invoice Generation' && (
              <div>
                <InvoiceGenerationTab />
              </div>
            )}

            {activeTab === 'Payments' && (
              <div>
                <PaymentTab />
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ManagementPage;
