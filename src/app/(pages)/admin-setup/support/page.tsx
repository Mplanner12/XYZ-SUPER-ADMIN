"use client"

import SubmitButton from "@/components/Buttons/SubmitButton";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { AdminFaq } from "../_components/admin-faq";
import { FaPhone } from "react-icons/fa6";
import { RiMailSendLine } from "react-icons/ri";

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className=" md:w-[60%] w-full py-4">
      <div className="flex flex-col gap-2 pb-4">
        <h2 className=" font-medium text-2xl">Support</h2>
        <p className="font-normal text-sm text-foundation-grey-grey-600">
          How can we help you?
        </p>
      </div>
      <div className="w-full flex flex-row gap-4">
        <div className="w-[50%] relative">
          <input
            type="text"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter a Question"
            size={70}
            className={
              "block w-full rounded-[6px] border-0 h-auto py-3.5 pr-2 pl-9 text-[16px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-[#8133F1] focus:ring-2 placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
            }
          />
          <span>
            <FiSearch className="text-[22px] absolute left-2 top-[.8rem] text-[#66686B]" />
          </span>
        </div>
        <SubmitButton
          text="Search"
          customPadding="w-fit text-foundation-grey-grey-300 py-3 px-6"
          actionType="button"
        />
      </div>

      <div className="border-b border-foundation-grey-grey-600 my-4 w-full" />

      <div className="flex justify-start">
        <AdminFaq />
      </div>

      <div className="border-b border-foundation-grey-grey-600 my-4 w-full" />

      <div className="flex flex-col gap-4">
        <h2 className=" font-medium text-xl">Contact Us</h2>
        <p className="font-normal text-base text-foundation-grey-grey-600">
          Reach out to us via email or phone call with details below.
        </p>
        <p className="flex gap-2 text-sm text-foundation-grey-grey-600 items-center">
          <FaPhone /> +234 812 669 5689
        </p>
        <p className="flex gap-2 text-sm text-foundation-grey-grey-600 items-center">
          <RiMailSendLine /> info@xyz.com
        </p>
      </div>
    </div>
  );
};

export default Support;
