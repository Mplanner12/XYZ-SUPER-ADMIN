'use client';

import MenuPopupState from '@/components/navbarMenu';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  chevronDown2,
  closeButton,
  hamburger,
  profileimage,
  xyz,
} from '../../../../../public';

const sidebarItems = [
	{
		icon: '/admin-white.svg',
		iconHover: '/admin-purple.svg',
		title: 'Admin Dashboard',
		path: '/admin-setup/admin-dashboard',
		// subTitle: 'Overview',
		isActive: true,
	},
	{
		icon: '/arrange-send-to-back-white.svg',
		iconHover: '/arrange-send-to-back-purple.svg',
		path: '/admin-setup/business-setup',
		title: 'Business Setup & Info.',
	},
	{
		icon: '/cash-multiple-white.svg',
		iconHover: '/cash-multiple-purple.svg',
		path: '/admin-setup/pricing-payment',
		title: 'Pricing & Payments',
	},
	{
		icon: '/account-group-outline-white.svg',
		iconHover: '/account-group-outline-purple.svg',
		path: '/admin-setup/manage-account',
		title: 'Manage your Account',
	},
	{
		icon: '/account-cog-outline-white.svg',
		iconHover: '/account-cog-outline-purple.svg',
		path: '/admin-setup/business-account',
		title: 'Business Accounts',
	},
	{
		icon: '/chart-box-outline-white.svg',
		iconHover: '/chart-box-outline-purple.svg',
		path: '/admin-setup/advanced-reporting',
		title: 'Advanced Reporting',
	},
	{
		icon: '/swap-horizontal-white.svg',
		iconHover: '/swap-horizontal-purple.svg',
		path: '#',
		title: 'Change Theme',
	},
	{
		icon: '/cloud-upload-outline-white.svg',
		iconHover: '/cloud-upload-outline-purple.svg',
		path: '/admin-setup/data-backup',
		title: 'Data & Backup',
	},
	{
		icon: '/help-circle-outline-white.svg',
		iconHover: '/help-circle-outline-purple.svg',
		path: '/admin-setup/#',
		title: 'Support & FAQs',
	},
];


export default function AdminSidebar() {
	// set path and active state for navigation
	const pathname = usePathname();

	// logic to help manage hover state and image switch on hover
	const [hoveredIndex, setHoveredIndex] = useState(null);

	const handleMouseEnter = (index: any) => {
		setHoveredIndex(index);
	};

	const handleMouseLeave = () => {
		setHoveredIndex(null);
	};

	// to animate the sidebar
	let isTab = useMediaQuery({ query: '(min-width: 1024px)' });

	const [isOpen, setIsOpen] = useState(isTab ? false : true);

	const Siderbar_animation = isTab
		? // mobile view
		  {
				open: {
					x: 0,
					width: '24rem',
					transition: {
						damping: 40,
					},
				},
				closed: {
					x: -550,
					width: "10rem",
					transition: {
						damping: 40,
						delay: 0.15,
					},
				},
		  }
		: {
				//mobile view
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
		<>
			<div
				onClick={() => setIsOpen(false)}
				className={`fixed lg:hidden inset-0 max-h-screen z-[998] bg-black/50 ${
					isOpen ? 'hidden' : 'block'
				} `}
			></div>
			<motion.div
				variants={Siderbar_animation}
				animate={isOpen ? 'closed' : 'open'}
				className={`self-stretch bg-foundation-purple-purple-400 h-[100vh] overflow-y-scroll no-scrollbar flex flex-col items-center justify-between gap-[30px] sm:gap-[22px] md:relative absolute sm:px-6 px-3 py-8 z-[999]
                `}
			>
				<div className="w-full flex flex-col items-center justify-center gap-[30px] sm:gap-[34px] sm:mt-5 mt-0">
					<div className="flex lg:hidden justify-end items-end w-full gap-0">
						<Image
							src={closeButton}
							loading="lazy"
							alt=""
							onClick={() => setIsOpen(!isOpen)}
							className="z-[999] flex justify-end cursor-pointer h-[30px] w-[30px] object-contain"
						/>
					</div>
					<div className="self-stretch flex flex-row items-start justify-center py-0 px-5 overflow-x-hidden whitespace-pre">
						<Image
							className="h-10 w-[108px] relative object-cover z-[1]"
							loading="lazy"
							alt=""
							src={xyz}
						/>
					</div>

					{/* border line */}
					<div className="w-full h-px flex items-start justify-center">
						<div className="w-[80%] flex justify-center z-[1] border-[1px] border-solid border-white/50" />
					</div>

					<div className="w-full flex flex-col items-start justify-center gap-[8px] z-[1] mb-8">
						{sidebarItems.map((item, index) => {
							const isActive = pathname === item.path;
							const isHovered = hoveredIndex === index;

							return (
								<Link
									href={item.path}
									key={index}
									className={`self-stretch rounded-2xl ${
										isActive || isHovered
											? 'bg-white text-foundation-purple-purple-400'
											: ' text-inherit'
									} flex flex-col items-start justify-center py-[16px] px-6 box-border cursor-pointer hover:bg-white hover:text-foundation-purple-purple-400 hover:z-[1] overflow-x-hidden`}
									onMouseEnter={() => handleMouseEnter(index)}
									onMouseLeave={handleMouseLeave}
								>
									<div className="flex flex-row items-center justify-start gap-[18px] whitespace-pre overflow-x-hidden">
										<Image
											width={500}
											height={500}
											className="h-[24px] w-[24px] relative min-w-max"
											loading="lazy"
											alt=""
											// src={item.icon}
											src={isHovered || isActive ? item.iconHover : item.icon}
										/>
										<div className="flex flex-col gap-[2px]">
											<h1 className="m-0 relative text-[16px] leading-[24px] font-normal text-nowrap whitespace-nowrap font-inherit text-base">
												<span
													className={`${item.isActive ? 'font-medium' : ''}`}
												>
													{item.title}{' '}
												</span>
											</h1>
										</div>
									</div>
								</Link>
							);
						})}
					</div>
				</div>
				<div className="flex justify-center items-center w-full ">
					<div className=" flex w-full flex-row py-0 text-base text-foundation-grey-grey-800 px-8 box-border overflow-x-hidden whitespace-pre">
						<div className="flex-1 rounded-2xl bg-white flex flex-col items-start justify-start py-3 px-6 gap-[2px] z-[1] sm:pl-5 box-border overflow-x-hidden whitespace-pre flex-wrap">
                            <div className='px-4'>
                                <div className="relative font-semibold text-[14px]">Change Company</div>
                                <div className="flex gap-0 align-middle items-center text-[14px] text-foundation-purple-purple-400 w-auto">
                                    <Image
                                        src={profileimage}
                                        alt=""
                                        className="w-[24px] h-[24px] object-contain min-w-max"
                                    />
                                    <MenuPopupState title="Company" subs={company} />
                                </div>

                            </div>
						</div>
					</div>
				</div>

				{/* Control button for open and close of size nav */}
				{/* <motion.div
					className="absolute w-fit h-fit z-50 top-0 mt-5 float-right cursor-pointer lg:hidden block bg-white rounded-[50px]"
					animate={
						isOpen
							? {
									x: 0,
									y: 0,
									rotate: 0,
							  }
							: {
									x: 0,
									y: 0,
									rotate: 180,
							  }
					}
					transition={{
						duration: 0,
					}}
					onClick={() => setIsOpen(!isOpen)}
				>
					<Image
						src={chevronDown2}
						alt=""
						className="w-[30px] h-[30px] object-contain rotate-90 align-middle"
					/>
				</motion.div> */}
			</motion.div>
			<div>
				<Image
					src={hamburger}
					alt=""
					className="w-[40px] h-[40px] object-contain m-3 block lg:hidden relative z-[999]"
					onClick={() => setIsOpen(true)}
				/>
			</div>
		</>
	);
}
