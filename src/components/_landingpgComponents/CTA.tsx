import React from "react";

export default function CTA() {
  return (
    <div className="w-full bg-foundation-purple-purple-900 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptLTUgMmg0djFoLTR2LTF6bTAgMmgxdi00aC0xdjR6bS01LTJoNHYxaC00di0xem0wIDJoMXYtNGgtMXY0em0tNS0yaDF2MWgtMXYtMXptMC0yaDF2NGgtMXYtNHptLTUgMmg0djFoLTR2LTF6bTAgMmgxdi00aC0xdjR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

      {/* Floating circles */}
      <div className="absolute -left-20 top-1/4 w-64 h-64 rounded-full bg-foundation-purple-purple-400/10 blur-3xl animate-pulse-slow"></div>
      <div className="absolute -right-20 bottom-1/4 w-80 h-80 rounded-full bg-foundation-purple-purple-200/10 blur-3xl animate-[pulse_12s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

      {/* Light beam effect */}
      <div className="absolute top-0 left-1/2 w-1/3 h-full bg-gradient-to-b from-foundation-purple-purple-300/20 to-transparent transform -translate-x-1/2 skew-x-12 animate-[pulse_15s_ease-in-out_infinite]"></div>

      <section className="w-full h-full py-14 px-6 sm:px-8 flex justify-center items-center relative z-10">
        <div className="item-center flex flex-col flex-wrap text-center justify-start gap-[24px] text-foundation-white-white-400 sm:py-10 py-0 relative">
          {/* Subtle top border glow */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-foundation-white-white-400/30 to-transparent"></div>

          <div className="w-full flex flex-col items-center justify-start gap-[20px]">
            <h3 className="font-normal sm:text-[32px] text-[28px] inline-block self-stretch drop-shadow-[0_0_8px_rgba(129,51,241,0.3)]">
              <span className="bg-gradient-to-r from-foundation-white-white-400 to-foundation-purple-purple-100 bg-clip-text text-transparent">
                Get started with our 30-days free trial
              </span>
            </h3>
            <p className="max-w-[980px] w-auto text-center font-normal text-base inline-block text-foundation-grey-grey-300">
              Take the first step towards optimizing your business processes and
              driving growth with XYZ Business Management Applications. Contact
              us today to get started with your free trial!
            </p>
          </div>
          <div className="flex flex-col items-center justify-start pt-4 gap-[16px] text-base">
            <div className="w-full mt-4 flex flex-row flex-wrap items-center justify-center gap-[16px] relative">
              <input
                type="email"
                className="rounded-[16px] px-5 w-full py-4 text-foundation-black-black-400 placeholder:text-foundation-grey-grey-900 bg-foundation-white-white-400/90 backdrop-blur-sm border border-transparent focus:border-foundation-purple-purple-200 focus:outline-none focus:ring-2 focus:ring-foundation-purple-purple-300/50 transition-all duration-300"
                placeholder="Enter your email"
              />
              <button className="bg-foundation-purple-purple-400 text-foundation-white-white-400 border-none hover:bg-foundation-purple-purple-300 active:bg-foundation-purple-purple-200 py-4 px-6 cursor-pointer rounded-2xl whitespace-nowrap transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(129,51,241,0.4)] relative overflow-hidden group">
                <span className="relative z-10">Submit</span>
                <span className="absolute inset-0 w-0 bg-gradient-to-r from-foundation-purple-purple-300 to-foundation-purple-purple-200 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </div>
            <p className="max-w-[635px] text-foundation-grey-grey-300/90">
              By clicking Submit {"you're"} confirming that you agree with our{" "}
              <a
                href=""
                className="underline hover:text-foundation-purple-purple-100 transition-colors duration-300 relative group"
              >
                Terms and Conditions
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-foundation-purple-purple-100 group-hover:w-full transition-all duration-300"></span>
              </a>
            </p>
          </div>

          {/* Subtle bottom border glow */}
          <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-foundation-white-white-400/30 to-transparent"></div>
        </div>
      </section>
    </div>
  );
}
