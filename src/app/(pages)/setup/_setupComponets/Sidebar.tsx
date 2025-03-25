"use client";

import dummyUser from "@/assets/icons/user.svg";
import { useSidebar } from "@/hooks/contextApi/SidebarContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { closeButton, hamburger, xyz } from "../../../../../public";

import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import Step, { stepClasses } from "@mui/joy/Step";
import StepIndicator, { stepIndicatorClasses } from "@mui/joy/StepIndicator";
import Stepper from "@mui/joy/Stepper";
import Typography, { typographyClasses } from "@mui/joy/Typography";

interface SetupItem {
  icon: string;
  iconHover: string;
  title: string;
  content: string;
  path: string;
}

const setupItems: SetupItem[] = [
  // {
  // 	icon: '/arrange-send-to-back-white.svg',
  // 	iconHover: '/arrange-send-to-back-purple.svg',
  // 	title: 'Business Setup & Information',
  // 	content: 'Manage your business information',
  // 	path: '/setup/business-information',
  // },
  // {
  // 	icon: '/cash-multiple-white.svg',
  // 	iconHover: '/cash-multiple-purple.svg',
  // 	title: 'Pricing & Payment',
  // 	content: 'Payment for plans and payment methods',
  // 	path: '/setup/price-payment',
  // },
  {
    icon: "/account-group-outline-white.svg",
    iconHover: "/account-group-outline-purple.svg",
    title: "Manage your Account",
    content: "Your subscription and user type setup",
    path: "/setup/manage-account",
  },
  {
    icon: "/account-cog-outline-white.svg",
    iconHover: "/account-cog-outline-purple.svg",
    title: "Business Accounts",
    content: "Manage multiple accounts",
    path: "/setup/business-account",
  },
  {
    icon: "/admin-white.svg",
    iconHover: "/admin-purple.svg",
    title: "Admin Dashboard",
    content: "Manage multiple paid modules",
    path: "/admin-setup/admin-dashboard",
  },
];

export default function SetupSidebar() {
  const pathname = usePathname();
  const isTab = useMediaQuery({ query: "(min-width: 857px)" });
  const [isOpen, setIsOpen] = useState(!isTab);
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsOpen(!isTab);
  }, [isTab]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 857) {
        closeSidebar();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [closeSidebar]);

  const getCurrentStepIndex = () => {
    const currentIndex = setupItems.findIndex((item) =>
      pathname.includes(item.path)
    );
    return currentIndex === -1 ? 0 : currentIndex;
  };

  const currentStep = getCurrentStepIndex();

  return (
    <div className="flex flex-row sm:relative absolute w-full">
      <div
        className={cn(
          "bg-primary-normal h-[100vh] flex flex-col transition-transform duration-300 z-50",
          "[@media(min-width:857px)]:relative w-[330px] [@media(min-width:1200px)]:w-[330px] [@media(min-width:857px)]:translate-x-0",
          "[@media(max-width:857px)]:fixed [@media(max-width:857px)]:top-0 [@media(max-width:857px)]:left-0",
          isSidebarOpen ? "translate-x-0 w-[330px]" : "-translate-x-full"
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
            src={xyz}
            alt="logo"
            width={80}
            height={40}
            className="items-end mb-2"
          />
          <p className="my-7 leading-[30px] font-normal font-inherit text-[30px] text-white whitespace-nowrap text-nowrap">
            Account Setup
          </p>
        </div>

        <div className="flex items-center justify-center">
          <div className="border border-solid border-white mb-8 w-[80%] flex justify-center" />
        </div>

        <div className="flex-1 overflow-y-scroll no-scrollbar text-white px-5">
          {/* stepper function  */}
          <Stepper
            orientation="vertical"
            // activeStep={currentStep}
            sx={(theme) => ({
              "--Stepper-verticalGap": "2.5rem",
              "--StepIndicator-size": "3rem",
              "--Step-gap": "0rem",
              "--Step-connectorInset": "0rem",
              "--Step-connectorRadius": "0rem",
              "--Step-connectorThickness": "10px",
              // to change bg after successful
              "--joy-palette-success-solidBg": "#fff",
              "--joy-palette-current-solidBg": "#fff",
              [`& .${stepClasses.completed}`]: {
                "&::after": {
                  bgcolor: "#fff",
                  border: "3px solid #fff",
                  borderColor: "#fff",
                  color: "#fff",
                  borderWidth: 2.5,
                },
              },
              [`& .${stepClasses.active}`]: {
                "&::after": {
                  bgcolor: "#fff",
                },
                [`& .${stepIndicatorClasses.root}`]: {
                  border: "4px solid",
                  borderColor: "#fff",
                  borderWidth: 2.5,
                },
              },
              [`& .${stepIndicatorClasses.root}`]: {
                border: "3px solid #ceb0fa",
              },
              [`& .${stepClasses.completed}`]: {
                "&::after": {
                  bgcolor: "#fff",
                },
                [`& .${stepIndicatorClasses.root}`]: {
                  border: "3px solid #fff",
                },
              },
              [`& .${stepClasses.disabled} *`]: {
                color: "white",
              },
              [`& .${typographyClasses["title-sm"]}`]: {
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontSize: "10px",
              },
            })}
          >
            {setupItems.map((item, index) => (
              <Step
                key={index}
                completed={index < currentStep}
                active={index === currentStep}
                disabled={index > currentStep}
                indicator={
                  <StepIndicator
                    variant={
                      index < currentStep
                        ? "solid"
                        : index === currentStep
                          ? "solid"
                          : "outlined"
                    }
                    color={
                      index < currentStep
                        ? "success"
                        : index === currentStep
                          ? "success"
                          : "warning"
                    }
                  >
                    {index < currentStep ? (
                      <Image
                        src={item.iconHover}
                        alt={item.title}
                        width={20}
                        height={20}
                        className="object-contain w-4 h-4"
                      />
                    ) : index === currentStep ? (
                      <Image
                        src={item.iconHover}
                        alt={item.title}
                        width={20}
                        height={20}
                        className="object-contain w-4 h-4"
                      />
                    ) : (
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={20}
                        height={20}
                        className="object-contain w-4 h-4"
                      />
                    )}
                  </StepIndicator>
                }
              >
                <Link href={item.path} onClick={closeSidebar} className="ml-2">
                  <div className="text-white font-normal">
                    <Typography
                      level="title-md"
                      textColor="common.white"
                      fontWeight="normal"
                    >
                      {item.title}{" "}
                    </Typography>
                    <p className="text-[12px] text-nowrap">{item.content}</p>
                  </div>
                </Link>
              </Step>
            ))}
          </Stepper>
        </div>
      </div>
      {/* <div className="relative left-0">
				<Image
					src={hamburger}
					alt=""
					className="w-[60px] h-[60px] object-contain m-3 lg:hidden"
					onClick={toggleSidebar}
				/>
			</div> */}
    </div>
  );
}
