"use client";

import { useSidebar } from '@/hooks/contextApi/SidebarContext';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  setupLogo
} from '../../../../../public';

export default function SetupHeader() {

  const {toggleSidebar} = useSidebar();

	return (
		<section className="w-full bg-foundation-grey-grey-50 flex md:flex-row flex-col justify-start align-middle items-start py-[14.5px] box-border max-w-full text-left text-5xl gap-[10px] md:gap-[8px] text-foundation-black-black-400 font-text-xs-medium flex-wrap mb-2 md:px-8 px-4 ">
			<div
				onClick={toggleSidebar}
				className="[@media(max-width:857px)]:flex w-14 h-14 rounded-full md:hidden justify-center items-center bg-primary-normal "
			>
				<Image src="/menu.png" alt="Menu icon" width={34} height={34} />
			</div>
      
			<div className="w-auto">
				<Image
					src={setupLogo}
					alt="Setup logo"
					className="md:w-[90px] md:h-[90px] w-[60px] h-[60px] object-contain"
				/>
			</div>
			<div className="flex flex-col gap-1 m-0 max-w-[650px] flex-wrap">
				<h1 className="text-[32px] text-foundation-black-black-400 font-normal">
					Welcome to XYZ
				</h1>
				<p className="text-foundation-grey-grey-800 text-base">
					{"Let's"} get started with basic information about your business and
					preferences to make organizing your business easy for you.
				</p>
			</div>
		</section>
	);
}
