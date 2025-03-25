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
    <div className="w-full h-auto justify-center items-center flex flex-wrap flex-1 align-middle text-left">
      <div className="flex flex-row items-center align-middle justify-between w-[1200px]">
        <Link href={"/"}>
          <Image
            src={logoxyz}
            alt=""
            className="md:w-[108px] w-[90px] h-auto object-contain"
            loading="lazy"
          />
        </Link>
        <div className="hidden flex-row justify-center item-center md:flex">
          <ul className=" font-normal flex-row list-none w-full flex gap-[32px]">
            {navLinks.map((nav, index) => (
              <li
                key={nav.title}
                className="gap-[32px] flex hover:text-foundation-black-black-400 hover:font-bold text-foundation-black-black-400 cursor-pointer"
              >
                <a
                  href={`${nav.link}${nav.id}`}
                  className={`${nav.link === pathname && nav.id === activeId && "text-foundation-black-black-400 font-bold"} capitalize transition-all`}
                >
                  {nav.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:flex hidden items-center justify-center text-white font-normal gap-[16px] ">
          <Link href={"/signup"}>
            <NavButton styles="bg-foundation-purple-purple-400 text-white hover:bg-foundation-purple-purple-200                     active:hover:bg-foundation-purple-purple-100">
              Sign Up
            </NavButton>
          </Link>
          <Link href={"/login"}>
            <NavButton styles=" hover:bg-foundation-purple-purple-200 bg-white hover:text-white text-foundation-purple-purple-400 active:hover:bg-foundation-purple-purple-100">
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
