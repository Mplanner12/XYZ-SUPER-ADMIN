import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { columns, TableData } from '@/util/mockData/mockData';
import ReportAnalyticsTable from '../ReportAnalyticsTable';
import { SidebarProvider } from '@/hooks/contextApi/SidebarContext';
import { ModalProvider } from '@/util/Modals/ModalsContext';

test('renders ReportAnalyticsTable and displays correct data', async () => {
  render(

    <SidebarProvider>
      <ModalProvider>
      <ReportAnalyticsTable
      initialData={TableData} columns={columns}
      />
      </ModalProvider>
    </SidebarProvider>
  );



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
