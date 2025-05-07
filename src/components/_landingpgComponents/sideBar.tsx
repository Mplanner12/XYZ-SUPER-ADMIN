"use client"

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { closeButton, hamburger } from '../../../public';
import { navLinks } from './navbar';
import NavButton from './navButton';


export default function SideBar() {
    const [toggle, setToggle] = useState(false);

	const pathname = usePathname();

    useEffect(() => {
			setToggle(false);
		}, [pathname]);
  return (
		<div className="flex md:hidden flex-1 justify-end items-center">
			<Image
				src={toggle ? closeButton : hamburger}
				alt="Hamburger"
				className="w-[35px] h-[35px] object-contain cursor-pointer z-[998]"
				loading="lazy"
				onClick={() => setToggle((prev) => !prev)}
			/>

			<div
				className={`${
					toggle ? 'flex' : 'hidden'
				} sidebar p-6 bg-main flex-flex-col border-none fixed h-screen top-0 bg-foundation-purple-purple-400 right-0 z-[100] w-[70%]`}
			>
				<ul className="list-none flex flex-col px-6 py-4 w-full mt-12 gap-7 items-end text-[24px] leading-[28px]">
					{navLinks.map((nav, index) => (
						<li
							key={nav.id}
							className={`${
								index === navLinks.length - 1
							} gap-[32px] flex hover:text-foundation-black-black-400 text-white hover:font-bold cursor-pointer`}
						>
							<Link href={nav.link}>{nav.title}</Link>
						</li>
					))}
					<div className="flex flex-wrap flex-row items-center justify-end text-white font-normal gap-[20px] text-nowrap whitespace-nowrap">
            <Link href="/login">
              <NavButton styles=" hover:bg-foundation-purple-purple-200 bg-white hover:text-white text-foundation-purple-purple-400  active:hover:bg-foundation-purple-purple-100">
                Login
              </NavButton>
            </Link>
            <Link href="/signup">
              <NavButton styles="bg-foundation-purple-purple-100 text-white hover:bg-foundation-purple-purple-200 active:hover:bg-foundation-purple-purple-100">
                Sign Up
              </NavButton>
            </Link>
					</div>
				</ul>
			</div>
		</div>
	);
}
