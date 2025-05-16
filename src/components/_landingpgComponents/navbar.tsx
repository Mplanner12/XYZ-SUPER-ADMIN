"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { logoxyz } from "../../../public";
import NavButton from "./navButton";
import SideBar from "./sideBar";

export const navLinks = [
  {
    title: "Home",
    link: "/",
    id: "",
  },
  {
    title: "Features",
    link: "/",
    id: "#features",
  },
  {
    title: "Pricing",
    link: "/pricing",
    id: "",
  },
  {
    title: "About Us",
    link: "/aboutus",
    id: "",
  },
  {
    title: "FAQ",
    link: "/",
    id: "#faq",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const handleHashChange = () => {
      setActiveId(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);

    // cleanup event listener on component unmount
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div className="w-full bg-foundation-purple-purple-900 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptLTUgMmg0djFoLTR2LTF6bTAgMmgxdi00aC0xdjR6bS01LTJoNHYxaC00di0xem0wIDJoMXYtNGgtMXY0em0tNS0yaDF2MWgtMXYtMXptMC0yaDF2NGgtMXYtNHptLTUgMmg0djFoLTR2LTF6bTAgMmgxdi00aC0xdjR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

      <div className="flex flex-row items-center justify-between w-[1200px] relative z-10">
        <Link href={"/"}>
          <Image
            src={logoxyz}
            alt="Logo"
            className="md:w-[108px] w-[90px] h-auto object-contain"
            loading="lazy"
          />
        </Link>
        <div className="hidden flex-row justify-center items-center md:flex">
          <ul className="font-normal flex-row list-none w-full flex gap-[32px]">
            {navLinks.map((nav) => (
              <li
                key={nav.title}
                className="gap-[32px] flex hover:text-foundation-purple-purple-100 hover:font-bold text-foundation-grey-grey-300 cursor-pointer transition-all duration-300"
              >
                <a
                  href={`${nav.link}${nav.id}`}
                  className={`${
                    nav.link === pathname &&
                    nav.id === activeId &&
                    "text-foundation-purple-purple-100 font-bold"
                  } capitalize transition-all`}
                >
                  {nav.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:flex hidden items-center justify-center text-white font-normal gap-[16px]">
          <Link href={"/signup"}>
            <NavButton styles="bg-foundation-purple-purple-400 text-white hover:bg-foundation-purple-purple-300 active:bg-foundation-purple-purple-200 transition-all duration-300">
              Sign Up
            </NavButton>
          </Link>
          <Link href={"/login"}>
            <NavButton styles="bg-white text-foundation-purple-purple-400 hover:bg-foundation-purple-purple-200 hover:text-white active:bg-foundation-purple-purple-100 transition-all duration-300">
              Login
            </NavButton>
          </Link>
        </div>
        <div className="md:hidden flex">
          <SideBar />
        </div>
      </div>
    </div>
  );
}
