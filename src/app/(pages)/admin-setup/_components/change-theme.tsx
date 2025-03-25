import React from "react";

const ChangeTheme = () => {
  return (
    <div className=" py-4 px-2">
      <div className=" space-y-0.5 mb-5">
        <h3 className=" font-semibold text-base">Change Theme</h3>
        <p className="font-normal text-sm">Switch your app theme</p>
      </div>

      {/* Radio element */}

      <div className="font-normal text-sm flex flex-col gap-4">
        <label className=" flex gap-2 cursor-pointer">
          <input type="radio" name="themes" value="light-mode" />
          Light Mode
        </label>
        <label className=" flex gap-2 cursor-pointer">
          <input type="radio" name="themes" value="dark-mode" />
          Dark Mode
        </label>
        <label className=" flex gap-2 cursor-pointer">
          <input type="radio" name="themes" value="system-settings" />
          Subject to System Settings
        </label>
      </div>
    </div>
  );
};

export default ChangeTheme;
