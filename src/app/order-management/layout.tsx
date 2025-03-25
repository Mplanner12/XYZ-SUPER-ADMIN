
import SideBarLayout from '@/components/MainLayouts/SideBarLayout';
import LoadingOverlay from '@/components/reusable/LoadingOverlay';
import React, { Suspense } from 'react';

const routes = [
    {
      label: "Dashboard Overview",
      icon: "/admin-white.svg",
      iconHover: "/admin-purple.svg",
      href: "/order-management/overview",
    },
    {
      label: "Location Management",
      icon: "/admin-white.svg",
      iconHover: "/admin-purple.svg",
      href: "/order-management/location",
    },
    {
      label: "Order Management",
      icon: "/admin-white.svg",
      iconHover: "/admin-purple.svg",
      href: "/order-management/management",
    },
    {
      label: "Report & Analytics",
      icon: "/admin-white.svg",
      iconHover: "/admin-purple.svg",
      href: "/order-management/report-analytics",
    },
    {
      label: "Audit Trail",
      icon: "/admin-white.svg",
      iconHover: "/admin-purple.svg",
      href: "/order-management/audit-trail",
    },
    {
      label: "Preferences",
      icon: "/admin-white.svg",
      iconHover: "/admin-purple.svg",
      href: "/order-management/preferences",
    },
  ];

export default function OrderManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full bg-white flex leading-[normal]">
      <div className="sticky top-0 h-screen z-50">
        <SideBarLayout routes={routes} />
      </div>
      <main className="flex-1 overflow-x-auto"> 
      <Suspense fallback={<LoadingOverlay/>}>
          {children}
      </Suspense>
      </main>
    </div>
  );
}