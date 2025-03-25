import SubmitButton from "@/components/Buttons/SubmitButton";
import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

interface RestorebackupProps {
  handleTabChange: (tab: string) => void;
}

const RestoreBackup: React.FC<RestorebackupProps> = ({handleTabChange}) => {

  const [selectedTab, setSelectedTab] = useState("data-backup");


  return (
    <div className=" py-4 px-2">
      <div className=" space-y-0.5 mb-5">
        <h3
          className=" flex items-center gap-2 font-normal text-2xl mb-1 cursor-pointer"
          onClick={() => handleTabChange("data-backup")}
        >
          <FaChevronLeft
            size={14}
            color=""
            className=" text-foundation-purple-purple-400"
          />
          Restore Backup
        </h3>
        <p className="font-normal text-sm">
          Restore backup manually or automatically
        </p>
      </div>

      {/* Radio element */}

      <div className="font-normal text-sm flex flex-col gap-3 mb-4">
        <label className=" flex gap-2 cursor-pointer">
          <input type="radio" name="themes" value="light-mode" />
          Restore Manually
        </label>
        <label className=" flex gap-2 cursor-pointer">
          <input type="radio" name="themes" value="dark-mode" />
          Restore Automatically
        </label>
      </div>

      <SubmitButton
        text="Process"
        customPadding="md:w-[30%] w-full py-4 px-2"
        actionType="button"
      />


    </div>
  );
};

export default RestoreBackup;
