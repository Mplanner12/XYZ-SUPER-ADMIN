"use client";

import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { z } from "zod";

interface UserManagementProps {
  onNext: () => void;
  onPrev: () => void;
}

// Define the schema for user validation
const userSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  role: z.string().min(1, { message: "Please select a role" }),
});

type UserType = z.infer<typeof userSchema>;

const UserManagement: React.FC<UserManagementProps> = ({ onNext, onPrev }) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [currentUser, setCurrentUser] = useState<UserType>({
    email: "",
    role: "",
  });
  const [error, setError] = useState<string | null>(null);

  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "manager", label: "Manager" },
    { value: "user", label: "User" },
    { value: "viewer", label: "Viewer" },
  ];

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentUser({ ...currentUser, email: e.target.value });
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentUser({ ...currentUser, role: e.target.value });
  };

  const addUser = () => {
    try {
      // Validate the current user before adding
      userSchema.parse(currentUser);
      setUsers([...users, currentUser]);
      setCurrentUser({ email: "", role: "" });
      setError(null); // Clear any previous errors
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message); // Set the first validation error message
      }
    }
  };

  const removeUser = (index: number) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };

  const handleSubmit = () => {
    if (users.length === 0) {
      setError("Please add at least one user before proceeding.");
      return;
    }

    // Here you would typically send the users data to your API
    console.log("Submitting users:", users);
    setError(null); // Clear any previous errors
    onNext();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center text-foundation-black-black-400 mb-6">
        User Management
      </h2>

      {/* User list */}
      {users.map((user, index) => (
        <div
          key={index}
          className="mb-4 p-6 border border-foundation-grey-grey-300 rounded-lg"
        >
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-foundation-black-black-400 mb-2">
                Email
              </label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-4 py-2 border border-foundation-grey-grey-300 rounded-md bg-foundation-grey-grey-50"
              />
            </div>
            <div className="flex-1">
              <label className="block text-foundation-black-black-400 mb-2">
                Role
              </label>
              <input
                type="text"
                value={
                  roleOptions.find((option) => option.value === user.role)
                    ?.label || user.role
                }
                disabled
                className="w-full px-4 py-2 border border-foundation-grey-grey-300 rounded-md bg-foundation-grey-grey-50"
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => removeUser(index)}
                className="p-2 bg-red-100 text-red-500 rounded-md hover:bg-red-200 transition-colors mt-6"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Add new user form */}
      <div className="p-6 border border-foundation-grey-grey-300 rounded-lg mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-foundation-black-black-400 mb-2">
              Email
            </label>
            <input
              type="email"
              value={currentUser.email}
              onChange={handleEmailChange}
              placeholder="Enter email address"
              className="w-full px-4 py-2 border border-foundation-grey-grey-300 rounded-md focus:outline-none focus:ring-2 focus:ring-foundation-purple-purple-100"
            />
          </div>
          <div className="flex-1">
            <label className="block text-foundation-black-black-400 mb-2">
              Role
            </label>
            <select
              value={currentUser.role}
              onChange={handleRoleChange}
              className="w-full px-4 py-2 border border-foundation-grey-grey-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-foundation-purple-purple-100"
            >
              <option value="" disabled>
                Select role
              </option>
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Display the error message */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* Add user button */}
      <button
        type="button"
        onClick={addUser}
        className="w-full py-3 border border-foundation-grey-grey-300 rounded-lg text-foundation-purple-purple-400 flex items-center justify-center gap-2 hover:bg-foundation-grey-grey-50 transition-colors mb-16"
      >
        <Plus size={20} />
        Add User
      </button>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onPrev}
          className="px-8 py-3 border border-foundation-grey-grey-300 rounded-lg text-foundation-black-black-400 hover:bg-foundation-grey-grey-50 transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-8 py-3 bg-foundation-purple-purple-400 text-white rounded-lg hover:bg-foundation-purple-purple-300 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
