"use client"
import React, { useState } from 'react';
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import SalesOutletsTable from '@/components/OrderManagementComponent/Table/SalesOutletsTable';
import { ColumnDef } from '@tanstack/react-table';
import { useModal } from '@/util/Modals/ModalsContext';
import AddLoactionModal from './component/AddLoactionModal/AddLoactionModal';
import { useFetchSalesOutlet } from '@/services/OrderManagementServices';

export interface LocationData {
  // id: string;
  outlet_name: string;
  street_address: string;
  location?: string; 
  postal_code?: string;
  preferred_currency?: string;
  preferred_language?: string;
}

const columns: ColumnDef<LocationData>[] = [
  {
    id: 'outlet_name',
    header: 'Store Outlets',
    accessorKey: 'outlet_name',
    enableSorting: true,
  },
  {
    id: 'street_address',
    header: 'Address',
    accessorKey: 'street_address',
    enableSorting: false,
  },
  {
    id: 'region',
    header: 'Region',
    accessorKey: 'region',
    enableSorting: false,
  },
  {
    id: 'postal_code',
    header: 'Postal Code',
    accessorKey: 'postal_code',
    enableSorting: false,
  },
  {
    id: 'preferred_currency',
    header: 'Preferred Currency',
    accessorKey: 'preferred_currency',
    enableSorting: false,
  },
  {
    id: 'preferred_language',
    header: 'Preferred Language',
    accessorKey: 'preferred_language',
    enableSorting: false,
  }
];

const LocationPage: React.FC = () => {
  const { openModal } = useModal();
  const [isExpanded, setIsExpanded] = useState(false);
  const {data:SalesOutletData, isLoading} = useFetchSalesOutlet()
  const initialData = Array.isArray(SalesOutletData) ? SalesOutletData : [];

  const handleAddLoactionModal = () => {
    openModal(<AddLoactionModal />)
  }

  const breadcrumbs = ['Admin Dashboard', 'Order Management'];

  const visibleColumns = isExpanded
    ? columns
    : columns.filter(col => col.id !== 'postal_code' && col.id !== 'preferred_currency' && col.id !== 'preferred_language');

  return (
    <div>
      <div data-test-id="header-layout">
        <HeaderLayout
          moduleName="Order Management Module"
          page="Location Management"
          breadcrumbs={breadcrumbs}
          moduleLink='/order-management/overview'
        />
      </div>

      <main className="mt-5 p-1 [@media(min-width:925px)]:p-6">
        <section className="bg-[#FCFCFC] rounded-md p-1 [@media(min-width:925px)]:p-6">
          <SalesOutletsTable
            title='Sales Outlets'
            initialData={initialData}
            columns={visibleColumns}
            ActionAddLocationClick={handleAddLoactionModal}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            isLoading={isLoading}
          />
        </section>
      </main>
    </div>
  );
};

export default LocationPage;