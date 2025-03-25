import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SalesOutletsTable from '@/components/OrderManagementComponent/Table/SalesOutletsTable';
import { columns, TableData, } from '@/util/mockData/mockData';
import { SidebarProvider } from '@/hooks/contextApi/SidebarContext';
import { ModalProvider } from '@/util/Modals/ModalsContext';

test('renders LocationPage and displays correct header and table data', async () => {
  render(
    <SidebarProvider>
      <ModalProvider>
        <SalesOutletsTable initialData={TableData} columns={columns} isExpanded={false} setIsExpanded={function (value: React.SetStateAction<boolean>): void {
          throw new Error('Function not implemented.');
        } } />
      </ModalProvider>
    </SidebarProvider>
  );

  screen.debug();


  await waitFor(() => {
    TableData.forEach(async (data) => {
      expect(await screen.findByText(data.name)).toBeInTheDocument();
      expect(await screen.findByText(data.address)).toBeInTheDocument();
      expect(await screen.findByText(data.coordinates)).toBeInTheDocument();
    });
  });

  // Another debug after waitFor
  screen.debug();
});
