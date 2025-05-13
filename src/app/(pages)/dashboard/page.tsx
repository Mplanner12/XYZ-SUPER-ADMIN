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

type ActiveView =
  | "overview"
  | "company_details"
  | "users"
  | "settings"
  | "manage_companies";

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<ActiveView>("overview");
  // For now, we'll use the main 'business' for views that might expect sub-company details
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

  const sidebarItems = [
    {
      name: "Overview",
      viewId: "overview" as ActiveView,
      icon: <LuLayoutDashboard />,
    },
    {
      name: "Business Details",
      viewId: "company_details" as ActiveView,
      icon: <LuBuilding />,
    },
    {
      name: "Manage Companies",
      viewId: "manage_companies" as ActiveView,
      icon: <LuBriefcase />,
    },
    { name: "Users", viewId: "users" as ActiveView, icon: <LuUsers /> },
    {
      name: "Settings",
      viewId: "settings" as ActiveView,
      icon: <LuSettings />,
    },
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
      case "overview": // OverviewView might expect sub-company, adapt to main business for now
        return (
          <OverviewView
            activeCompany={business} // Pass main business as activeCompany
            isLoadingCompany={isLoading}
            mainBusinessName={business?.company_name} // Pass main business name
          />
        );
      case "company_details": // CompaniesView might expect sub-company, adapt to main business
        return (
          <CompaniesView
            activeCompanyDetails={business} // Pass main business
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

  if (error) {
    router.push("/businessSetup");
    return null; // Redirect to business setup if error occurs
  }

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
                {business.company_name.length > 12 // Adjusted length for better fit
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
            {sidebarItems.map((item) => (
              <li key={item.name} className="mb-3">
                <button
                  onClick={() => {
                    setActiveView(item.viewId);
                    setIsSidebarOpen(false);
                  }}
                  className={`flex items-center w-full p-3 rounded-lg text-foundation-grey-grey-300 hover:bg-foundation-purple-purple-500 hover:text-white transition-colors duration-200 ${
                    activeView === item.viewId
                      ? "bg-foundation-purple-purple-600 text-white"
                      : ""
                  }`}
                >
                  <span className="mr-3 text-xl">{item.icon}</span>
                  {item.name}
                </button>
              </li>
            ))}
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
          ) : error ? (
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
