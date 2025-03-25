import React from "react";
import DashboardCard from "./dashboardCard";
import RecentUpdateTable from "./recentUpdateTable";

const dashboardData = [
  {
    id: 1,
    title: "Account",
    content:
      "Manage Accounts, Journal Entries, General Ledger, Bank Deposits and Withdrawal, Bank Reconcilations",
    icon: "/account-white.svg",
    path: "/accounting/overview",
  },
  {
    id: 2,
    title: "Finance",
    content:
      "Manage Customers, Make Sales, Receive Payment and Reconcile your Sales",
    icon: "/finance-white.svg",
    path: "/finance/overview",
  },
  {
    id: 3,
    title: "Sales and other Modules",
    content:
      "Manage sales, orders, invoices, receipts, and other customer data",
    icon: "/crm-white.svg",
    path: "#",
  },
  //   {
  //     id: 3,
  //     title: "Client Management",
  //     content:
  //       "Manage Clients, Clients Interactions, Projects, Jobs, Tasks & Team Members.",
  //     icon: "/crm-white.svg",
  //     path: "#",
  //   },
  //   {
  //     id: 4,
  //     title: "Order Management",
  //     content:
  //       "Manage Customers, Sales Orders, Invoices, Sales Receipts, Credit Memos",

  //     icon: "/percent-circle-outline-white.svg",
  //     path: "/order-management/overview",
  //   },
  {
    id: 4,
    title: "Procurement",
    content:
      "Manage Vendors, Purchase Orders, Vendor Invoices, Purchase Receipts, Debit Memos",

    icon: "/service-white.svg",
    path: "#",
  },
  {
    id: 6,
    title: "Inventory & Warehouse",
    content: "Track Inventory levels and manage warehouse operations",
    icon: "/package-variant-closed-white.svg",
    path: "/inventory/overview",
  },
  //   {
  //     id: 7,
  //     title: "Warehouse",
  //     content:
  //       "Manage Warehouse Facilities, Order Deliveries, Warehouse Inventory & Inventory Status",
  //     icon: "/expenses-white.svg",
  //     path: "#",
  //   },
  {
    id: 7,
    title: "Production",
    content:
      "Manage Customers, Make Sales, Receive Payment and reconcile your sales",
    icon: "/production-white.svg",
    path: "#",
  },
  {
    id: 9,
    title: "HRM",
    content: "Manage Human Resources, Current Employees & Employee Information",
    icon: "/crm-white.svg",
    path: "#",
  },
  {
    id: 10,
    title: "CRM",
    content: "Manage customer relationships and client interactions",
    icon: "/crm-white.svg",
    path: "#",
  },
  //   {
  //     id: 10,
  //     title: "Payroll",
  //     content: "Manage Employees, Salary Payments, Deductions, Payroll Taxes",
  //     icon: "/payroll-white.svg",
  //     path: "#",
  //   },
  //   {
  //     id: 11,
  //     title: "Business Planning",
  //     content: "Oversee Business Plans, Risk Management & Performance Tracking",
  //     icon: "/toolbox-outline-white.svg",
  //     path: "#",
  //   },
  //   {
  //     id: 12,
  //     title: "Business Intelligence",
  //     content: "Internal and External Audit Support",
  //     icon: "/assets-white.svg",
  //     path: "#",
  //   },
];

export default function DashboardComponent() {
  return (
    <div className="py-2 flex flex-col">
      <div className="">
        <div className="w-[100%] flex flex-wrap">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6 w-full">
            {dashboardData.map((dashboard) => (
              <DashboardCard
                key={dashboard.id}
                title={dashboard.title}
                path={dashboard.path}
                content={dashboard.content}
                icon={dashboard.icon}
                locked={dashboard.path === "#" || dashboard.path === ""}
              />
            ))}
          </div>
        </div>
        <div className="w-[100%] flex flex-wrap"></div>
      </div>

      {/* <div className="flex flex-col mt-8">
        <h2 className=" font-medium text-[18px]">Recent Updates</h2>
        <RecentUpdateTable />
      </div> */}
    </div>
  );
}
