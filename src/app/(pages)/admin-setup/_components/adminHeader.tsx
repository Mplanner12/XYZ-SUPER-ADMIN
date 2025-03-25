"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { dashboardLogo, setupLogo } from "../../../../../public";
import { useSidebar } from "@/hooks/contextApi/SidebarContext";

interface HeaderContent {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
}

export default function AdminHeader() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  const getHeaderContent = (): HeaderContent => {
    if (pathname === "/admin-setup/admin-dashboard") {
      return {
        imageSrc: dashboardLogo,
        imageAlt: "Header logo",
        title: "Welcome to XYZ  Business Applications!",
        description:
          "Experience how our business modules can simplify your business",
      };
    } else {
      return {
        imageSrc: setupLogo,
        imageAlt: "Setup logo",
        title: "Welcome to XYZ",
        description:
          "Let's get started with basic information about your business and preferences to make organizing your business easy for you.",
      };
    }
  };

  const headerContent = getHeaderContent();

  return (
    <section className="self-stretch bg-foundation-grey-grey-50 flex flex-row justify-start align-middle items-center py-[14.5px] box-border max-w-full text-left text-5xl gap-[20px] text-foundation-black-black-400 flex-wrap mb-2">
      <div className="flex gap-[20px] items-center justify-start flex-wrap md:px-10 px-6">
        <div className="w-auto hidden lg:block">
          <Image
            src={headerContent.imageSrc}
            alt={headerContent.imageAlt}
            className="w-[90px] h-[90px] object-contain"
            width={90}
            height={90}
          />
        </div>
        <button onClick={toggleSidebar} className="w-auto lg:hidden">
          <Image
            src={headerContent.imageSrc}
            alt={headerContent.imageAlt}
            className="w-[90px] h-[90px] object-contain"
            width={90}
            height={90}
          />
        </button>
        <div className="flex flex-col gap-1 m-0 max-w-[650px] flex-wrap">
          <h1 className="m-0 text-[32px] text-foundation-black-black-400 font-normal">
            {headerContent.title}
          </h1>
          <p className="m-0 text-foundation-grey-grey-800 text-base">
            {headerContent.description}
          </p>
        </div>
      </div>
    </section>
  );
}
