import Image from "next/image";
import React from "react";
import { crmImage } from "../../../public";

export default function Crm() {
  return (
    <div className="justify-center flex items-center align-middle dark:bg-gradient-to-b dark:from-[#1a1a24] dark:to-foundation-black-black-500 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-foundation-purple-purple-400/30 to-transparent dark:via-foundation-purple-purple-300/40 dark:opacity-80"></div>
      <div className="absolute -right-20 top-1/3 w-48 h-48 rounded-full bg-foundation-purple-purple-900/5 dark:bg-foundation-purple-purple-400/15 blur-3xl dark:blur-2xl animate-pulse-slow"></div>
      <div className="absolute -left-16 bottom-1/4 w-32 h-32 rounded-full bg-foundation-purple-purple-900/5 dark:bg-foundation-purple-purple-200/10 blur-3xl dark:blur-2xl hidden md:block"></div>

      <div className="flex flex-1 flex-col justify-between md:justify-center items-center align-middle text-left text-[40px] px-6 sm:px-8 gap-6 md:flex-row py-12 relative z-10">
        <div className="max-w-[605px] flex justify-start items-center align-middle relative h-[365px] group transition-transform duration-300 hover:scale-[1.02] dark:hover:drop-shadow-[0_0_15px_rgba(129,51,241,0.2)]">
          <div className="absolute inset-0 bg-foundation-purple-purple-400/5 dark:bg-foundation-purple-purple-900/15 rounded-2xl blur-xl -z-10 transform translate-y-4"></div>
          <Image
            src={crmImage}
            alt="CRM dashboard showing customer relationship management interface"
            className="w-fit h-fit object-contain dark:filter dark:brightness-[1.05] dark:contrast-[1.02] dark:drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
            loading="lazy"
          />
        </div>
        <div className="flex flex-row flex-wrap justify-start items-start px-4 group">
          <div className="flex flex-col items-start justify-start gap-[4px] text-[30px]">
            <h3 className="max-w-[480px] text-[40px] sm:text-[28px] font-normal py-2 text-wrap dark:text-foundation-white-white-400 dark:drop-shadow-[0_0_8px_rgba(129,51,241,0.15)] relative">
              <span className="dark:bg-gradient-to-r dark:from-foundation-white-white-400 dark:to-foundation-purple-purple-100 dark:bg-clip-text dark:text-transparent">
                Customer Relationship Management (CRM)
              </span>
              <div className="h-1 w-16 bg-foundation-purple-purple-400/70 rounded-full absolute -bottom-1 left-0 dark:opacity-0 dark:group-hover:opacity-100 transition-opacity duration-300"></div>
            </h3>
            <p className="max-w-[460px] text-base text-foundation-grey-grey-800 py-2 dark:text-foundation-grey-grey-300 dark:group-hover:text-foundation-grey-grey-200 transition-colors duration-300">
              Build stronger customer relationships and drive sales growth with
              our CRM module. Manage leads, track interactions, and personalize
              communication to deliver exceptional customer experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-foundation-purple-purple-400/20 to-transparent"></div>
    </div>
  );
}
