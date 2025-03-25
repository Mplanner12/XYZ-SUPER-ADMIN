import React, { Suspense } from 'react';
import Sidebar from '@/components/finance/Sidebar'
import SideBarLayout from '@/components/MainLayouts/SideBarLayout';
import LoadingOverlay from '@/components/reusable/LoadingOverlay';

const routes = [
  {
    label: "Dashboard Overview",
    icon: "/admin-white.svg",
    iconHover: "/admin-purple.svg",
    href: "/finance/overview",
  },
  {
    label: "Banking Management",
    icon: "/bank-white.svg",
    iconHover: "/bank-purple.svg",
    href: "/finance/banking-management",
  },
  {
    label: "Receivables Management",
    icon: "/arrow-down-left-white.svg",
    iconHover: "/arrow-down-left-purple.svg",
    href: "/finance/receivables",
  },
  {
    label: "Payable Management",
    icon: "/arrow-up-right-white.svg",
    iconHover: "/arrow-up-right-purple.svg",
    href: "/finance/payables",
  },
  {
    label: "Investment Management",
    icon: "/investment-white.svg",
    iconHover: "/investment-purple.svg",
    href: "/finance/investment",
  },
  {
    label: "Financing Management",
    icon: "/financing-white.svg",
    iconHover: "/financing-purple.svg",
    href: "/finance/financing",
  },
  {
    label: "Report & Analytics",
    icon: "/reports-white.svg",
    iconHover: "/reports-purple.svg",
    href: "/finance/reports",
  },
  {
    label: "Audit Trail",
    icon: "/audit-white.svg",
    iconHover: "/audit-purple.svg",
    href: "/finance/audit",
  },
  {
    label: "Preferences",
    icon: "/preferences-white.svg",
    iconHover: "/preferences-purple.svg",
    href: "/finance/preferences",
  },
];

export default function SetupLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
    <div className="w-full bg-white flex leading-[normal]">
      <div className="sticky top-0 h-screen z-50">
        <SideBarLayout routes={routes} />
      </div>
      <main className="w-full overflow-auto">
        <Suspense fallback={<LoadingOverlay/>}>
            {children}
        </Suspense>
      </main>
    </div>
	);
}
