'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  closeButton,
  hamburger,
  xyz,
} from '../../../../../public';


export const setupItems = [
	{
		icon: '/viewdashboardoutline.svg',
		title: 'Business Setup & Information',
		content: 'Manage your business information',
		path: '/setup/business-information',
		// subTitle: 'Overview',
		isActive: true,
	},
	{
		icon: '/mapmarkeroutline.svg',
		path: '/setup/price-payment',
		title: 'Pricing & Payments',
		content: 'Payment for plans and payment methods',
	},
	{
		icon: '/chartboxoutline.svg',
		path: '/setup/manage-account',
		title: 'Manage your Account',
		content: 'Your subscription and user type setup',
	},
	{
		icon: '/borderinside.svg',
		path: '/setup/business-account',
		title: 'Business Accounts',
		content: 'Manage multiple accounts',
	},
	{
		icon: '/tune.svg',
		path: '/admin-setup/admin-dashboard',
		title: 'Admin Dashboard',
		content: 'Manage multiple paid modules',
	},
];

export default function SetupSidebar() {
	// set path and active state for navigation
	const pathname = usePathname();


	// to animate the sidebar
	let isTab = useMediaQuery({ query: '(min-width: 1024px)' });

	const [isOpen, setIsOpen] = useState(isTab ? false : true);

	const Siderbar_animation = isTab
		? // system view
		  {
				open: {
					x: 0,
					width: '22rem',
					transition: {
						damping: 40,
					},
				},
				closed: {
					x: -550,
					width: '10rem',
					transition: {
						damping: 40,
						delay: 0.15,
					},
				},
		  }
		: {
				// Mobile
				open: {
					width: '25rem',
					transition: {
						damping: 40,
					},
				},
				closed: {
                    x: -100,
					width: 0,
					transition: {
						damping: 40,
					},
				},
		  };

	useEffect(() => {
		if (isTab) {
			// mobile
			setIsOpen(false);
		} else {
			// desktop
			setIsOpen(true);
		}
	}, [isTab]);

	const company = [
		{
			children: 'Gfams',
			link: '#',
		},
		{
			children: 'Asap',
			link: '#',
		},
	];

	return (
		<div className='flex flex-row'>
			{/* <div
				onClick={() => setIsOpen(false)}
				className={`fixed lg:hidden inset-0 max-h-screen z-[450] bg-black/50 ${
					isOpen ? 'hidden' : 'block'
				} `}
			></div> */}
			<motion.div
				variants={Siderbar_animation}
				animate={isOpen ? 'closed' : 'open'}
				className={`self-stretch bg-foundation-purple-purple-400 text-white h-[100vh] overflow-y-scroll no-scrollbar md:relative absolute flex flex-col items-center justify-start sm:px-2 px-3 py-8 z-[600]`}
			>
				<div className="flex flex-col items-start justify-start gap-[30px] max-w-full sm:gap-[34px] sm:mt-5 mt-0">
                    {/* close button */}
					<div className="flex lg:hidden justify-end items-end w-full gap-0">
						<Image
							src={closeButton}
							loading="lazy"
							alt=""
							onClick={() => setIsOpen(!isOpen)}
							className="z-[999] flex justify-end cursor-pointer h-[30px] w-[30px] object-contain"
						/>
					</div>
					<div className="w-full flex flex-col items-center gap-8 justify-center py-0 px-5 overflow-x-hidden whitespace-pre">
						<Image
							className="h-10 w-[108px] relative object-contain z-[1]"
							loading="lazy"
							alt=""
							src={xyz}
						/>
						<p className="mb-2 leading-[30px] font-normal font-inherit text-[30px] text-white whitespace-nowrap text-nowrap">
							Account Setup
						</p>
					</div>
                    {/* border line */}
					<div className=" w-full h-px flex items-start justify-center">
						<div className="w-[80%] flex justify-center z-[1] border-[1px] border-solid border-white/50" />
					</div>

					<div className="w-full flex flex-col items-start justify-start gap-[12px] z-[1] mb-8">
						{setupItems.map((item, index) => {
							const isActive = pathname === item.path;

							return (
								<Link
									href={item.path}
									key={index}
									className={`self-stretch rounded-2xl ${
										isActive
											? ' '
											: ' text-inherit'
									} flex flex-col items-start hover:text-foundation-purple-purple-100 justify-center py-3 px-3 cursor-pointer overflow-x-hidden`}
								>
									<div className="flex flex-row items-center justify-start gap-[18px] whitespace-pre overflow-x-hidden">
										<Image
											width={500}
											height={500}
											className="h-8 w-8 relative min-w-max"
											loading="lazy"
											alt=""
											src={item.icon}
										/>
										<div className="flex flex-col gap-[2px]">
											<h1 className="m-0 relative text-[16px] leading-[24px] font-normal text-nowrap whitespace-nowrap font-inherit">
												<span
													className={`${item.isActive ? 'font-medium' : ''}`}
												>
													{item.title}{' '}
												</span>
											</h1>
											<p
												className={`m-0 text-foundation-grey-grey-200 text-[14px] leading-[20px] relative font-normal text-nowrap whitespace-nowrap ${
													item.isActive ? 'text-foundation-white-white-400' : 'text-foundation-grey-grey-200'
												}`}
											>
												{item.content}
											</p>
										</div>
									</div>
								</Link>
							);
						})}
					</div>
				</div>
				
			</motion.div>
			<div className=''>
				<Image
					src={hamburger}
					alt=""
					className="w-[60px] h-[60px] object-contain m-3 flex lg:hidden top-0"
					onClick={() => setIsOpen(false)}
				/>
			</div>
		</div>
	);
}
