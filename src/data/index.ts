// Define data structure for sidebar items

export const sidebarItems = [
	{
		icon: '/viewdashboardoutline.svg',
		iconHover: '/viewdashboardoutline1.svg',
		title: 'Dashboard Overview',
		path: '/sales',
		// subTitle: 'Overview',
		isActive: true,
	},
	{
		icon: '/mapmarkeroutline.svg',
		iconHover: '/mapmarkeroutline1.svg',
		path: '/sales/location-management',
		title: 'Location Management',
	},
	{
		icon: '/chartboxoutline.svg',
		iconHover: '/chartboxoutline1.svg',
		path: '/sales/salesreport',
		title: 'Sales Report',
	},
	{
		icon: '/borderinside.svg',
		iconHover: '/borderinside1.svg',
		path: '/sales/order-management',
		title: 'Order Management',
	},
	{
		icon: '/tune.svg',
		iconHover: '/tune1.svg',
		path: '/sales/preferences',
		title: 'Preferences',
	},
];
