import SideBarLayout from '@/components/MainLayouts/SideBarLayout';
import LoadingOverlay from '@/components/reusable/LoadingOverlay';
import React, { Suspense } from 'react';


const routes = [
	{
		icon: '/admin-white.svg',
		iconHover: '/admin-purple.svg',
		label: 'Dasboard Overview',
		href: '/inventory/overview',
	},
	{
		icon: '/arrange-send-to-back-white.svg',
		iconHover: '/arrange-send-to-back-purple.svg',
		href: '/inventory/location-management',
		label: 'Location Management',
	},
	{
		icon: '/cash-multiple-white.svg',
		iconHover: '/cash-multiple-purple.svg',
		href: '/inventory/product-management',
		label: 'Product Management',
	},
	{
		icon: '/account-group-outline-white.svg',
		iconHover: '/account-group-outline-purple.svg',
		href: '/inventory/inventory-management',
		label: 'Inventory Management',
	},
	{
		icon: '/account-cog-outline-white.svg',
		iconHover: '/account-cog-outline-purple.svg',
		href: '/inventory/order-management',
		label: 'Order Management',
	},
	{
		icon: '/chart-box-outline-white.svg',
		iconHover: '/chart-box-outline-purple.svg',
		href: '/inventory/report-analytics',
		label: 'Report & Analytics',
	},
	{
		icon: '/swap-horizontal-white.svg',
		iconHover: '/swap-horizontal-purple.svg',
		href: '/inventory/audit-trial',
		label: 'Audit Trial',
	},
	{
		icon: '/cloud-upload-outline-white.svg',
		iconHover: '/cloud-upload-outline-purple.svg',
		href: '/inventory/preferences',
		label: 'Preferences',
	},
];

export default function InventoryModule({
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
