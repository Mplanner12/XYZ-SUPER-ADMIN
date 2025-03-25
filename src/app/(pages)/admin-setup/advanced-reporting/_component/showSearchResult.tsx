import React, { useState } from "react";
import CustomDropDown from "../../_components/CustomSelectDropDown";
import Image from "next/image";
import IncomeStatementTable from "./IncomeStatementTable";

const ShowSearchResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  const handleChatbotSelect = (selectedOption: string) => {
    console.log("Selected ChatBot:", selectedOption);
  };

  const handleToggle = (filterName: string) => {
    setOpenFilter(openFilter === filterName ? null : filterName);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 flex-wrap">
        <h2 className="text-base font-normal text-black">
          Chat with AI Assistance
        </h2>
        <CustomDropDown
          textColor="#8133F1"
          textSize={14}
          zIndex={10}
          icons={["/chatgpt.png", "/claude.png", "/gemini.png", "/napkin.png"]}
          menuWidth={10}
          label="Filter By Ai Assistant"
          options={["ChatGPT", "Claude", " Napkin", "Gemini"]}
          onSelect={handleChatbotSelect}
          isOpen={openFilter === "chatbot"}
          onToggle={() => handleToggle("chatbot")}
        />
        <div className="md:w-[60%] w-fit flex flex-col gap-3">
          <div className=" relative">
            <input
              type="text"
              name="chatgpt"
              placeholder="Ask me a question"
              size={70}
              className={
                "block w-full rounded-[6px] border-0 h-auto py-3.5 pr-2 pl-4 text-[16px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-[#8133F1] focus:ring-2 placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
              }
            />
            <span>
              <Image
                src="/chatbot-icon.svg"
                alt="stars icon"
                className="text-[20px] absolute right-2 top-[.8rem]"
                width={26}
                height={26}
              />
            </span>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-2xl w-full hover:bg-foundation-purple-purple-200 px-4 py-3 text-sm font-normal hover:text-white shadow-sm border border-solid hover:border-foundation-grey-grey-600 bg-foundation-purple-purple-400 text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Submitting..." : "Ask Now"}
          </button>
        </div>
      </div>

      <div>
        <IncomeStatementTable />
      </div>
    </div>
  );
};

export default ShowSearchResult;
