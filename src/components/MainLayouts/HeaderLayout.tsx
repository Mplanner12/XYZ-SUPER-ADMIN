"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronDown, UserRound, LogOut } from "lucide-react";
import Image from "next/image";
import dummyUser from "@/assets/icons/user.svg";
import { useSidebar } from "@/hooks/contextApi/SidebarContext";
import Link from "next/link";
import LogoutModal from "../reusable/LogoutModal";
import { useRouter } from "next/navigation";

interface HeaderLayoutProps {
  moduleName: string;
  moduleLink?: string;
  page: string;
  pageLink?: string;
  breadcrumbs: string[];
  user?: string | null;
}

const HeaderLayout: React.FC<HeaderLayoutProps> = ({
  moduleName,
  moduleLink,
  page,
  pageLink,
  breadcrumbs,
  user,
}) => {
  const { toggleSidebar } = useSidebar();
  const [logoutModal, setLogoutModal] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleNotification = () => {
    setNotificationOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target as Node)
    ) {
      setNotificationOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-secondary py-4 text-[#434343] w-[100%] h-[full] border-b border-[#F3F4F6]  px-6">
      <div className="flex justify-between items-center pt-4">
        <div
          onClick={toggleSidebar}
          className="[@media(max-width:857px)]:flex  w-14 h-14 rounded-full md:hidden justify-center items-center bg-primary-normal "
        >
          <Image src="/menu.png" alt="Menu icon" width={34} height={34} />
        </div>
        <LogoutModal
          logoutModal={logoutModal}
          setLogoutModal={setLogoutModal}
        />

        {/* Breadcrumbs and Module Name */}
        <div className="flex flex-col [@media(max-width:857px)]:hidden">
          <h2 className="h2 font-normal mb-2">{moduleName}</h2>
          <div className="flex items-center text-[16px]">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index === 0 ? (
                  <Link
                    href="/admin-setup/admin-dashboard"
                    className="cursor-pointer text-sm"
                  >
                    {crumb}
                  </Link>
                ) : (
                  <button
                    className="cursor-pointer text-sm"
                    onClick={() => router.push(`${moduleLink}`)}
                  >
                    {crumb}
                  </button>
                )}
                {index < breadcrumbs.length - 1 && (
                  <ChevronRight size={20} className="text-primary-normal" />
                )}
              </React.Fragment>
            ))}
            <ChevronRight size={20} className="text-primary-normal" />
            <button
              className="cursor-pointer text-sm"
              onClick={() => router.push(`${pageLink}`)}
            >
              {page}
            </button>
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 ">
          <div className="relative rounded-full overflow-hidden w-12 h-12">
            {user ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/${user}`}
                alt="display-image"
                height={46}
                width={46}
                className="object-contain rounded-full"
              />
            ) : (
              <Image
                src={dummyUser}
                alt="user image"
                height={46}
                width={46}
                className="object-contain rounded-full"
              />
            )}
          </div>
          <p
            className="font-semibold max-w-40 text-primary-normal cursor-pointer flex items-center"
            onClick={toggleDropdown}
          >
            Admin
            <ChevronDown size={20} className="ml-1" />
          </p>
          <div
            onClick={toggleNotification}
            className="bg-white p-2 rounded-3xl shadow-custom flex items-start"
          >
            <Image src="/bell.svg" alt="menu" width={15} height={15} />
            <div>
              <span className="bg-vividRed p-[3px] block rounded-3xl ml-[-4px]"></span>
            </div>
          </div>
        </div>
      </div>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-20 right-5 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-10"
        >
          <Link
            href="/profile"
            className="flex gap-1  px-4 py-2  items-center group transition"
          >
            <UserRound size={20} className="group-hover:text-black" />
            <span className="group-hover:text-black">My Profile</span>
          </Link>
          <button
            className="w-fit px-4 py-2 flex gap-1 group"
            onClick={() => setLogoutModal(true)}
          >
            <LogOut size={20} className="group-hover:text-red-500" />
            <span className="group-hover:text-red-500">Log out</span>
          </button>
        </div>
      )}

      {isNotificationOpen && (
        <div
          ref={notificationRef}
          className="absolute right-9 mt-2 w-64 bg-white shadow-lg rounded-lg py-4 z-10"
        >
          <h3 className="font-bold px-4 text-lg mb-2">Notification</h3>
          <ul className="divide-y divide-[#939292]">
            {[
              "New Sales order Created",
              "New Sales order Created",
              "New Sales order Created",
              "New Sales order Created",
              "New Invoice Created",
            ].map((notification, index) => (
              <li
                key={index}
                className="px-6 py-3 flex justify-between items-center"
              >
                <span className="text-[#939292] text-sm">{notification}</span>
                <Link
                  href="#"
                  className="text-purple-600 font-semibold text-sm"
                >
                  View
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="[@media(min-width:857px)]:hidden mt-2">
        <div className="flex flex-col mt-4 pb-3">
          <p className="text-lg md:text-2xl font-normal mb-2">{moduleName}</p>
          <div className="flex gap-1 flex-wrap items-center text-sm md:text-[16px]">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index === 0 ? (
                  <Link
                    href="/admin-setup/admin-dashboard"
                    className="cursor-pointer"
                  >
                    {crumb}
                  </Link>
                ) : (
                  <button
                    className="cursor-pointer"
                    onClick={() => router.push(`${moduleLink}`)}
                  >
                    {crumb}
                  </button>
                )}
                {index < breadcrumbs.length - 1 && (
                  <ChevronRight size={20} className="text-primary-normal" />
                )}
              </React.Fragment>
            ))}
            <ChevronRight size={20} className="text-primary-normal" />
            <button
              className="cursor-pointer"
              onClick={() => router.push(`${pageLink}`)}
            >
              {page}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderLayout;
