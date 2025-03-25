"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ProfileDialog from "./ProfileDialog";
import dummyUser from '@/assets/icons/user.svg'


const routes = [
  {
    label: "Dashboard Overview",
    icon: "/admin-white.svg",
    iconHover: "/admin-purple.svg",
    href: "/finance/overview",
  },
  {
    label: "Banking Management",
    icon: "/admin-white.svg",
    iconHover: "/admin-purple.svg",
    href: "/finance/banking-management",
  },
  {
    label: "Receivables Management",
    icon: "/admin-white.svg",
    iconHover: "/admin-purple.svg",
    href: "/finance/receivables",
  },
  {
    label: "Payable Management",
    icon: "/admin-white.svg",
    iconHover: "/admin-purple.svg",
    href: "/finance/payables",
  },
  {
    label: "Investment Management",
    icon: "/admin-white.svg",
    iconHover: "/admin-purple.svg",
    href: "/finance/investment",
  },
  {
    label: "Financing Management",
    icon: "/admin-white.svg",
    iconHover: "/admin-purple.svg",
    href: "/finance/financing",
  },
  {
    label: "Report & Analytics",
    icon: "/admin-white.svg",
    iconHover: "/admin-purple.svg",
    href: "/finance/reports",
  },
  {
    label: "Audit Trail",
    icon: "/admin-white.svg",
    iconHover: "/admin-purple.svg",
    href: "/finance/audit",
  },
  {
    label: "Preferences",
    icon: "/admin-white.svg",
    iconHover: "/admin-purple.svg",
    href: "/finance/preferences",
  },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false)
  const pathName = usePathname();

  return (
    <div className="hidden md:block md:w-[200px] lg:w-[305px]  bg-primary-normal px-5 pt-10 py-4 h-[100vh] overflow-y-scroll no-scrollbar">
      <div className="mb-8">
        <Link href="/finance/overview">
          <div className="w-fit mx-auto mb-2">
            <Image src="/xyz.svg" alt="logo" width={108} height={40}/>
          </div>
        </Link>
        {/* border line */}
        <div className='border border-solid border-white'/>
      </div>
      <div className="space-y-1 mb-[50px]">
        {routes.map((route) => (
          <Link
            href={route.href}
            key={route.href}
            className={cn(
              "w-full flex justify-start cursor-pointer rounded-[16px] px-5 py-5 transition",
              pathName.includes(route.href)
                ? "text-primary-normal bg-white hover:bg-white"
                : "text-white hover:bg-white/40"
            )}
          >
            <div className="flex items-center justify-center md:justify-start flex-1 gap-x-2">
              <Image
                src={
                  pathName.includes(route.href) ? route.iconHover : route.icon
                }
                alt="menu"
                width={18}
                height={18}
              />
              <p className="hidden lg:block text-base ">{route.label}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="w-[267px]">
        <ProfileDialog userData={userData} open ={open} setOpen = {setOpen} />
      </div>
    </div>
  );
};

const userData = {
  icon: dummyUser,
  name: "admin"
}

export default Sidebar;
