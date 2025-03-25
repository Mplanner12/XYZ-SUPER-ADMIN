"use client"
import React, { Fragment } from 'react'
import { Plus } from 'lucide-react';
import { FilePlus2 } from 'lucide-react';
import { useModal } from '@/util/Modals/ModalsContext';
import CreateOrderLinkModal from './component/CreateOrderLinkModal/CreateOrderLinkModal';
import { useRouter } from 'next/navigation';
import OrderCreationTable from './component/OrderCreationTable/OrderCreationTable';
import { ColumnDef } from '@tanstack/react-table';



interface approvalData {
  id: string,
  customerName: string,
  totalAmount: string,
  unitOrder: string,
  repeatOrder: string,
  status: string,
  date: string
}
const TableData: approvalData[] = [
  {
    id: '5567',
    customerName: 'aslam Charles',
    totalAmount: '19,43',
    unitOrder: "3",
    repeatOrder: "1",
    status: 'Unapproved',
    date: '06-23-2022'
  },
  {
    id: '0934',
    customerName: 'Samuel Charles',
    totalAmount: '1,950',
    unitOrder: "9",
    repeatOrder: "6",
    status: 'Unapproved',
    date: '06-23-2022'
  },
  {
    id: '4955',
    customerName: 'miracle Charles',
    totalAmount: '1,895',
    unitOrder: "9",
    repeatOrder: "1",
    status: 'Unapproved',
    date: '06-23-2022'
  },
  {
    id: '3434',
    customerName: 'prosper Charles',
    totalAmount: '1,230',
    unitOrder: "5",
    repeatOrder: "3",
    status: 'Unapproved',
    date: '06-23-2022'
  },
];


const CreationTab: React.FC = () => {
  const columns: ColumnDef<approvalData, any>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
      enableSorting: false,
    },
    {
      header: 'Customer Name',
      accessorKey: 'customerName',
      enableSorting: true,
    },
    {
      header: 'Total Amount (USD)',
      accessorKey: 'totalAmount',
      enableSorting: false,
    },
    {
      header: 'Unit Order',
      accessorKey: 'unitOrder',
      enableSorting: false,
    },
    {
      header: 'Repeat Order',
      accessorKey: 'repeatOrder',
      enableSorting: false,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      enableSorting: false,
    },
    {
      header: 'Date',
      accessorKey: 'date',
      enableSorting: false,
    }
  ];


  const { openModal } = useModal();
  // const dropdownRef = useRef<HTMLDivElement | null>(null);
  // const [dropdownOpen, setDropdownOpen] = useState(false);

  // const handleToggleDropdown = () => {
  //   setDropdownOpen(!dropdownOpen);
  // };

  // const handleOutsideClick = (event: MouseEvent) => {
  //   if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
  //     setDropdownOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   if (dropdownOpen) {
  //     document.addEventListener('mousedown', handleOutsideClick);
  //   } else {
  //     document.removeEventListener('mousedown', handleOutsideClick);
  //   }

  //   return () => {
  //     document.removeEventListener('mousedown', handleOutsideClick);
  //   };
  // }, [dropdownOpen]);


  const handleOpenCreateOrderLinkModal = () => {
    openModal(<CreateOrderLinkModal />)
  }
  const router = useRouter();

  const handleCreateNewOrderClick = () => {
    router.push('/order-management/management?tab=Order%20Creation&page=create-new-order');
  };

  // const handleCreateReturnOrderClick = () => {
  //   router.push('/order-management/management?tab=Order%20Creation&page=create-return-order');
  // };

  const handleOrderCreationSettings = () => {
    router.push('/order-management/management?tab=Order%20Creation&page=order-creation-settings');
  };

  return (
    <Fragment>
      {/* {dropdownOpen && (
        <div
          ref={dropdownRef}
          className='absolute top-72 left-96 bg-white shadow-md rounded-lg p-5 z-50'>
          <ul className='space-y-2 cursor-pointer'>
            <li className='cursor-pointer'>Sales Outlet</li>
            <li className='cursor-pointer'>Lekki Store</li>
            <li className='cursor-pointer'>Mushin Store</li>
            <li className='cursor-pointer'>Wuse Store</li>
            <li className='cursor-pointer'>Gwarinpa Store</li>
          </ul>
        </div>
      )}
      <div
        onClick={handleToggleDropdown}
        className='gap-2 flex items-center cursor-pointer w-fit'>
        <p className='font-medium tracking-wider text-[#434343] text-xl'>Sales Outlet</p>
        <ChevronDown className='text-primary-normal' />
      </div> */}

      <div className='mt-5 flex justify-between items-center'>
        <p className='font-medium tracking-wider text-[#434343] text-xl'>Order Creation List</p>
        <div
          onClick={handleOrderCreationSettings}
          className='flex items-center gap-2 cursor-pointer'>
          <FilePlus2 className='text-primary-normal' />
          <p className='font-medium tracking-wide text-primary-normal text-base'>Order Creation Settings</p>
        </div>
      </div>


      <div className='flex flex-col gap-5 mt-8'>
        <div className='flex items-center gap-2 cursor-pointer w-fit'
          onClick={handleCreateNewOrderClick}
        >
          <Plus className='text-primary-normal' />
          <p className='font-medium tracking-wide text-primary-normal text-base'>Create a New Order</p>
        </div>


        {/* <div className='flex items-center gap-2 cursor-pointer w-fit'
          onClick={handleCreateReturnOrderClick}
        >
          <Plus className='text-primary-normal' />
          <p className='font-medium tracking-wide text-primary-normal text-base'>Create a Return Order</p>
        </div> */}

        <div className='flex items-center gap-2 cursor-pointer w-fit'
          onClick={handleOpenCreateOrderLinkModal}
        >
          <Plus className='text-primary-normal' />
          <p className='font-medium tracking-wide text-primary-normal text-base'>Create a New Order Link</p>
        </div>
      </div>

      <div className='mt-10'>
        <OrderCreationTable
          initialData={TableData}
          columns={columns}
        />
      </div>
    </Fragment>
  )
}

export default CreationTab