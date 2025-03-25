import SideBarLayout from '@/components/MainLayouts/SideBarLayout';
import LoadingOverlay from '@/components/reusable/LoadingOverlay';
import React, { Suspense } from 'react';


export default function SetupLayout({ children, }: { children: React.ReactNode; }) {

	const routes = [
		{
			label: "Dashboard Overview",
			icon: "/admin-white.svg",
			iconHover: "/admin-purple.svg",
			href: "/accounting/overview",
		},
		{
			label: "Chart Of Accounts",
			icon: "/user-list-white.svg",
			iconHover: "/user-list-purple.svg",
			href: "/accounting/accounting-list",
		},
		{
			label: "Account Management",
			icon: "/userbk-white.svg",
			iconHover: "/userbk-purple.svg",
			href: "/accounting/account-management",
		},
		{
			label: "Advanced Acc. Mgmt",
			icon: "/account-card-white.svg",
			iconHover: "/admin-purple.svg",
			href: "/accounting/advanced-account-management",
		},
		{
			label: "Associated Lists",
			icon: "/ol-white.svg",
			iconHover: "/admin-purple.svg",
			href: "/accounting/other-list",
		},
		{
			label: "Report & Analytics",
			icon: "/chart-box-white.svg",
			iconHover: "/admin-purple.svg",
			href: "/accounting/report-analytics",
		},
		{
			label: "Audit Trail",
			icon: "/audit-white.svg",
			iconHover: "/admin-purple.svg",
			href: "/accounting/audit-trail",
		},
		{
			label: "Preferences",
			icon: "/preference-icon-white.svg",
			iconHover: "/admin-purple.svg",
			href: "/accounting/preferences",
		},
	];

	return (
		<div className="w-full bg-white flex flex-row leading-[normal]">
			<div className="sticky top-0 h-screen z-50">
				<SideBarLayout routes={routes} />
			</div>
			<main className="w-full overflow-auto">
				<Suspense fallback={<LoadingOverlay />}>
					{children}
				</Suspense>
			</main>
		</div>
	);
}
