import SideBarLayout from "@/components/MainLayouts/SideBarLayout";
import LoadingOverlay from "@/components/reusable/LoadingOverlay";
import React, { Suspense } from "react";
import AdminHeader from "./_components/adminHeader";
import Image from "next/image";
import { dashboardLogo } from "../../../../public";

const routes = [
  {
    icon: "/admin-white.svg",
    iconHover: "/admin-purple.svg",
    label: "Admin Dashboard",
    href: "/admin-setup/admin-dashboard",
  },
  // {
  //   icon: "/arrange-send-to-back-white.svg",
  //   iconHover: "/arrange-send-to-back-purple.svg",
  //   href: "/admin-setup/business-setup",
  //   label: "Business Setup & Info.",
  // },
  // {
  //   icon: "/cash-multiple-white.svg",
  //   iconHover: "/cash-multiple-purple.svg",
  //   href: "/admin-setup/pricing-payment",
  //   label: "Pricing & Payments",
  // },
  {
    icon: "/account-group-outline-white.svg",
    iconHover: "/account-group-outline-purple.svg",
    href: "/admin-setup/manage-account",
    label: "Manage your Account",
  },
  // {
  //   icon: "/account-cog-outline-white.svg",
  //   iconHover: "/account-cog-outline-purple.svg",
  //   href: "/admin-setup/business-account",
  //   label: "Business Accounts",
  // },
  {
    icon: "/chart-box-outline-white.svg",
    iconHover: "/chart-box-outline-purple.svg",
    href: "/admin-setup/advanced-reporting",
    label: "Adv. Reporting & Analytics",
  },
  {
    icon: "/swap-horizontal-white.svg",
    iconHover: "/swap-horizontal-purple.svg",
    href: "/admin-setup/change-theme",
    label: "Change Theme",
  },
  {
    icon: "/cloud-upload-outline-white.svg",
    iconHover: "/cloud-upload-outline-purple.svg",
    href: "/admin-setup/data-backup",
    label: "Data & Backup",
  },
  {
    icon: "/help-circle-outline-white.svg",
    iconHover: "/help-circle-outline-purple.svg",
    href: "/admin-setup/support",
    label: "Support & FAQs",
  },
];

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full bg-white flex flex-row leading-normal tracking-normal">
      <div className="sticky top-0 h-screen z-50">
        <SideBarLayout routes={routes} />
      </div>
      <main className="w-full flex flex-col items-start justify-start gap-[16px]">
        <div className="flex items-center justify-between w-full">
          <AdminHeader />
        </div>
        <div className="w-full md:px-10 px-6">
          <Suspense fallback={<LoadingOverlay />}>{children}</Suspense>
        </div>
      </main>
    </div>
  );
}
