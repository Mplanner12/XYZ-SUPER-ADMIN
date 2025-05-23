"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  LuLayoutDashboard,
  LuBriefcase,
  LuUsers,
  LuSettings,
  LuLogOut,
  LuChevronDown,
  LuBell,
  LuMenu,
  LuBuilding,
  LuX,
  LuDollarSign,
} from "react-icons/lu";
import { useGetBusiness } from "@/api/admin/getBusiness";
import { clearTokens } from "@/api/utils/token";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { logoxyz } from "../../../../public";
import SkeletonCard from "@/components/reusable/SkeletonCard";
import SkeletonLogo from "@/components/reusable/SkeletonLogo";

// Import View Components
import OverviewView from "@/components/dashboardViews/OverviewView";
import CompaniesView from "@/components/dashboardViews/CompaniesView";
import UsersView from "@/components/dashboardViews/UsersView";
import SettingsView from "@/components/dashboardViews/SettingsView";
import ManageCompaniesView from "@/components/dashboardViews/ManageCompaniesView";
import ModuleSelectionPage from "../module-selection/page";

type ActiveView =
  | "overview"
  | "company_details"
  | "users"
  | "settings"
  | "manage_companies"
  | "module_subscriptions";

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<ActiveView>("overview");
  const { data: business, isLoading, error } = useGetBusiness();

  const handleLogout = () => {
    clearTokens();
    toast.info("Logged out successfully.");
    router.push("/login");
  };

  const getInitials = (name?: string) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  type SidebarItem = {
    title: string;
    viewId: ActiveView;
    icon?: React.ReactNode;
    type: string;
    href?: string;
  };

  const sidebarItems: SidebarItem[] = [
    {
      title: "Overview",
      viewId: "overview",
      icon: <LuLayoutDashboard />,
      type: "view",
    },
    {
      title: "Business Details",
      viewId: "company_details",
      icon: <LuBuilding />,
      type: "view",
    },
    {
      title: "Manage Companies",
      viewId: "manage_companies",
      icon: <LuBriefcase />,
      type: "view",
    },
    {
      title: "Users",
      viewId: "users",
      icon: <LuUsers />,
      type: "view",
    },
    {
      title: "Settings",
      viewId: "settings",
      icon: <LuSettings />,
      type: "view",
    },
    {
      title: "Module Subscriptions",
      viewId: "module_subscriptions",
      type: "view",
    },
    // Example of a link item if needed:
    // {
    //   title: "External Link",
    //   viewId: "overview",
    //   type: "link",
    //   href: "/some-path",
    //   icon: <LuSomeIcon />,
    // },
  ];

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderActiveView = () => {
    switch (activeView) {
      case "overview":
        return (
          <OverviewView
            activeCompany={business}
            isLoadingCompany={isLoading}
            mainBusinessName={business?.company_name}
          />
        );
      case "company_details":
        return (
          <CompaniesView
            activeCompanyDetails={business}
            isLoading={isLoading}
            error={error}
          />
        );
      case "users":
        return <UsersView activeCompanyId={business?.id || null} />;
      case "manage_companies":
        return <ManageCompaniesView />;
      case "settings":
        return (
          <SettingsView
            mainBusiness={business}
            isLoadingMainBusiness={isLoading}
          />
        );
      case "module_subscriptions":
        return <ModuleSelectionPage />;
      default:
        return (
          <OverviewView
            activeCompany={business}
            isLoadingCompany={isLoading}
            mainBusinessName={business?.company_name}
          />
        );
    }
  };

  useEffect(() => {
    if (error) {
      toast.error("Business details not found. Redirecting to setup...");
      router.push("/businessSetup");
    }
  }, [error, router]);

  return (
    <div className="flex h-screen bg-foundation-grey-grey-900 text-foundation-white-white-400">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-foundation-black-black-500/90 backdrop-blur-md p-6 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:flex-col`}
      >
        <div className="flex items-center justify-between mb-10">
          {isLoading ? (
            <SkeletonLogo />
          ) : business && business.company_name ? (
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-foundation-purple-purple-500 rounded-full flex items-center justify-center text-xl font-bold text-white">
                {getInitials(business.company_name)}
              </div>
              <span className="text-lg font-semibold text-white">
                {business.company_name.length > 12
                  ? `${business.company_name.substring(0, 10)}...`
                  : business.company_name}
              </span>
            </Link>
          ) : (
            <Link href="/" className="flex items-center gap-2">
              <Image src={logoxyz} alt="XYZ Logo" width={100} height={24} />
            </Link>
          )}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-foundation-grey-grey-300 hover:text-white"
          >
            <LuX size={24} />
          </button>
        </div>
        <nav className="flex-grow">
          <ul>
            {sidebarItems.map((item) => {
              const isActive =
                item.type === "view" && activeView === item.viewId;
              const commonClasses = `flex items-center w-full p-3 rounded-lg text-foundation-grey-grey-300 hover:bg-foundation-purple-purple-500 hover:text-white transition-colors duration-200`;
              const activeClasses = isActive
                ? "bg-foundation-purple-purple-600 text-white"
                : "";

              return (
                <li key={item.title} className="mb-3">
                  {" "}
                  {/* Changed key to item.title for uniqueness */}
                  {item.type === "link" && item.href ? (
                    <Link
                      href={item.href}
                      className={`${commonClasses} ${
                        // Add active link styling if current path matches item.href
                        // e.g., router.pathname === item.href ? "bg-foundation-purple-purple-600 text-white" : ""
                        "" // Placeholder for active link styling
                      }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <span className="mr-3 text-xl">{item.icon}</span>
                      {item.title}
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        if (item.viewId) setActiveView(item.viewId);
                        setIsSidebarOpen(false);
                      }}
                      className={`${commonClasses} ${activeClasses}`}
                    >
                      <span className="mr-3 text-xl">{item.icon}</span>
                      {item.title}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 rounded-lg text-foundation-grey-grey-300 hover:bg-red-500 hover:text-white transition-colors duration-200"
          >
            <LuLogOut className="mr-3 text-xl" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-foundation-black-black-400/80 backdrop-blur-md shadow-md p-4 flex justify-between items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle sidebar
            className="md:hidden text-foundation-grey-grey-300 hover:text-white"
          >
            <LuMenu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-foundation-white-white-400">
            Dashboard Overview
          </h1>
          <div className="flex items-center gap-4">
            <LuBell
              size={22}
              className="cursor-pointer hover:text-foundation-purple-purple-400"
            />
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-8 h-8 bg-foundation-purple-purple-500 rounded-full flex items-center justify-center text-md font-semibold text-white">
                {getInitials(business?.company_name)}
              </div>
              <span className="hidden sm:inline">
                {business?.company_name || "Admin User"}
              </span>
              <LuChevronDown size={18} />
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {isLoading && !business ? ( // Show skeleton if loading and no business data yet
            <SkeletonCard />
          ) : error ? ( // If there's an error, useEffect will handle redirection.
            // You might want to show a generic error message or a loader here
            // while the redirection is happening.
            <p className="text-red-400 text-center py-10">
              Error loading business: {error.message}
            </p>
          ) : !business ? ( // If not loading, no error, but still no business
            <div className="text-center py-10">
              <p className="text-xl text-foundation-grey-grey-300 mb-4">
                No business information found.
              </p>
              <Link
                href="/businessSetup"
                className="text-foundation-purple-purple-400 hover:underline"
              >
                Register a business
              </Link>
              <p className="mt-2 text-foundation-grey-grey-400">
                to get started.
              </p>
            </div>
          ) : (
            // Business data is available, render the active view
            renderActiveView()
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
