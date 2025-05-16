"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactNode, useState } from "react";

export default function Provider({
    children
}: {
    children: ReactNode
}) {
    const [queryClient] = useState(() => new QueryClient())
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <ToastContainer />
            {children}
        </QueryClientProvider>
    );
};
