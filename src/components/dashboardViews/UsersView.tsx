"use client";
import React, { useEffect, useState } from "react";
import SkeletonCard from "../reusable/SkeletonCard";
import { LuUsers, LuSearch } from "react-icons/lu";
import { CiCirclePlus } from "react-icons/ci";
// Placeholder for User type - replace with your actual User type
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
}

interface UsersViewProps {
  activeCompanyId: string | null;
}

const UsersView: React.FC<UsersViewProps> = ({ activeCompanyId }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  // const [searchTerm, setSearchTerm] = useState(""); // For future search functionality

  useEffect(() => {
    if (activeCompanyId) {
      setIsLoadingUsers(true);
      // TODO: Fetch users for the activeCompanyId
      // Example: fetchUsers(activeCompanyId).then(data => setUsers(data)).finally(() => setIsLoadingUsers(false));
      // For now, using placeholder data:
      setTimeout(() => {
        setUsers([
          {
            id: "1",
            name: "Alice Wonderland",
            email: "alice@example.com",
            role: "Admin",
            lastLogin: "2023-10-26",
          },
          {
            id: "2",
            name: "Bob The Builder",
            email: "bob@example.com",
            role: "Editor",
            lastLogin: "2023-10-25",
          },
        ]);
        setIsLoadingUsers(false);
      }, 1000);
    } else {
      setUsers([]);
    }
  }, [activeCompanyId]);

  if (isLoadingUsers) {
    return <SkeletonCard />;
  }

  return (
    <div className="p-4 md:p-8 max-w-full mx-auto bg-foundation-black-black-500/30 rounded-xl shadow-2xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-4 border-b border-foundation-grey-grey-700">
        <h2 className="text-3xl font-bold text-foundation-purple-purple-400 flex items-center mb-4 sm:mb-0">
          <LuUsers className="mr-3" />
          User Management
        </h2>
        <button className="px-4 py-2 bg-foundation-purple-purple-500 text-white font-semibold rounded-lg hover:bg-foundation-purple-purple-600 transition-colors flex items-center">
          <CiCirclePlus className="mr-2" /> Add New User
        </button>
      </div>

      {/* Placeholder for users table or list */}
      <p className="text-foundation-grey-grey-300">
        User list/table will be displayed here.
      </p>
      {users.length > 0 && (
        <div className="mt-4 text-foundation-white-white-200">
          Found {users.length} users for company ID: {activeCompanyId}{" "}
          (Placeholder)
        </div>
      )}
      {!activeCompanyId && (
        <p className="text-foundation-grey-grey-400">
          No company selected to display users.
        </p>
      )}
    </div>
  );
};

export default UsersView;
