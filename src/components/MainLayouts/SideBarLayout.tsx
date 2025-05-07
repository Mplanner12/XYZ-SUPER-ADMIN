"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dummyUser from "@/assets/icons/user.svg";
import { useSidebar } from "@/hooks/contextApi/SidebarContext";
import { X } from "lucide-react";
import ProfileDialogLayout from "./ProfileDialogLayout";

interface Route {
  label?: string;
  icon?: string | StaticImageData;
  iconHover?: string | StaticImageData;
  href?: string;
}

interface SideBarLayoutProps {
  routes: Route[];
}

const SideBarLayout: React.FC<SideBarLayoutProps> = ({ routes }) => {
  const pathName = usePathname();
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <div
      className={cn(
        "bg-primary-normal h-[100vh] flex flex-col transition-transform duration-300 z-50 shadow-lg",
        "[@media(min-width:857px)]:relative w-[120px] [@media(min-width:1200px)]:w-[270px]",
        "[@media(max-width:857px)]:fixed [@media(max-width:857px)]:top-0 [@media(max-width:857px)]:left-0",
        isSidebarOpen ? "translate-x-0 w-[290px]" : "-translate-x-full"
      )}
    >
      <button
        className={cn(
          "font-semibold right-6 absolute top-4 p-2 bg-white rounded-full w-[40px] h-[40px] flex items-center transition-transform duration-300 md:hidden",
          "[@media(max-width:857px)]:block"
        )}
        onClick={toggleSidebar}
      >
        <X className="text-primary-normal" />
      </button>
      <div className="flex [@media(max-width:857px)]:items-start items-center [@media(max-width:857px)]:ml-7 flex-col pt-10 pb-5">
        <Image
          src="/xyz.svg"
          alt="logo"
          width={80}
          height={40}
          className="items-end mb-2"
        />
      </div>

      <div className="flex items-center justify-center">
        <div className="border border-solid border-white mb-8 w-[80%] flex justify-center" />
      </div>

      <div className="space-y-1 flex-1 overflow-y-scroll no-scrollbar px-5">
        {routes.map((route: any) => (
          <Link
            href={route.href}
            key={route.href}
            className={cn(
              "w-full flex [@media(min-width:857px)]:justify-start items-center cursor-pointer rounded-[16px] px-3 py-5 transition",
              pathName.includes(route.href)
                ? "text-primary-normal bg-white hover:bg-white"
                : "text-white hover:bg-white/40",
              "[@media(max-width:1124px)]:px-2"
            )}
          >
            <Image
              src={pathName.includes(route.href) ? route.iconHover : route.icon}
              alt="menu"
              width={18}
              height={18}
              className={cn(
                "mr-2",
                "[@media(max-width:1200px)]:mx-auto",
                "[@media(max-width:858px)]:mx-2"
              )}
            />
            <p
              className={cn(
                "[@media(max-width:1124px)]:text-[12px]",
                "[@media(max-width:1200px)]:hidden",
                "[@media(max-width:858px)]:block"
              )}
            >
              {route.label}
            </p>
          </Link>
        ))}
      </div>
      <div className="mt-auto px-5 pb-4 pt-8">
        <ProfileDialogLayout
          userData={{ icon: dummyUser, name: "admin" }}
          open={false} // Adjust as needed
          setOpen={() => {}} // Adjust as needed
        />
      </div>
    </div>
  );
};

export default SideBarLayout;
