"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";

const ChangeTheme = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="py-4 px-2">
      <div className="space-y-0.5 mb-5">
        <h3 className="font-semibold text-base">Change Theme</h3>
        <p className="font-normal text-sm">Switch your app theme</p>
      </div>
      <div className="font-normal text-sm flex flex-col gap-4">
        <label className="flex gap-2 cursor-pointer">
          <input
            type="radio"
            name="themes"
            value="light"
            checked={theme === "light"}
            onChange={() => setTheme("light")}
          />
          Light Mode
        </label>
        <label className="flex gap-2 cursor-pointer">
          <input
            type="radio"
            name="themes"
            value="dark"
            checked={theme === "dark"}
            onChange={() => setTheme("dark")}
          />
          Dark Mode
        </label>
        <label className="flex gap-2 cursor-pointer">
          <input
            type="radio"
            name="themes"
            value="system"
            checked={theme === "system"}
            onChange={() => setTheme("system")}
          />
          Subject to System Settings
        </label>
      </div>
    </div>
  );
};

export default ChangeTheme;
