import Image from "next/image";
import React from "react";
import { avatar } from "../../../public";
import NavButton from "./navButton";

export default function GetInTouch() {
  return (
    <div className="w-full bg-foundation-purple-purple-900 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptLTUgMmg0djFoLTR2LTF6bTAgMmgxdi00aC0xdjR6bS01LTJoNHYxaC00di0xem0wIDJoMXYtNGgtMXY0em0tNS0yaDF2MWgtMXYtMXptMC0yaDF2NGgtMXYtNHptLTUgMmg0djFoLTR2LTF6bTAgMmgxdi00aC0xdjR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

      {/* Floating circles */}
      <div className="absolute -left-20 top-1/3 w-56 h-56 rounded-full bg-foundation-purple-purple-400/10 blur-3xl animate-pulse-slow"></div>
      <div className="absolute -right-20 bottom-1/3 w-64 h-64 rounded-full bg-foundation-purple-purple-200/10 blur-3xl animate-[pulse_12s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

      {/* Unique decorative element - connecting dots */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-foundation-purple-purple-100 rounded-full"></div>
        <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-foundation-purple-purple-100 rounded-full"></div>
        <div className="absolute top-2/3 left-1/3 w-2 h-2 bg-foundation-purple-purple-100 rounded-full"></div>
        <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-foundation-purple-purple-100 rounded-full"></div>
        <div className="absolute top-3/4 left-2/3 w-2 h-2 bg-foundation-purple-purple-100 rounded-full"></div>
      </div>

      <section className="w-full h-full py-14 sm:px-6 px-4 flex justify-center items-center relative z-10">
        <div className="item-center bg-foundation-black-black-500/60 backdrop-blur-sm w-full rounded-[26px] px-6 py-8 flex flex-col flex-wrap text-center justify-center text-foundation-white-white-400 border border-foundation-purple-purple-400/20 shadow-[0_10px_30px_rgba(0,0,0,0.3)] transform transition-all duration-500 hover:shadow-[0_15px_30px_rgba(129,51,241,0.2)]">
          <div className="self-stretch flex justify-center items-center align-middle">
            <div className="w-full max-w-[768px] flex flex-col flex-wrap justify-center items-center gap-[28px] text-[24px]">
              <div className="flex flex-col flex-wrap justify-center items-center gap-[12px]">
                <div className="relative">
                  {/* Glowing effect around avatar */}
                  <div className="absolute inset-0 bg-foundation-purple-purple-400/20 rounded-full blur-md transform scale-110 animate-pulse-slow"></div>
                  <Image
                    src={avatar}
                    alt="Support team avatar"
                    className="w-[140px] h-[80px] object-contain mb-5 relative z-10 drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] filter brightness-110"
                    loading="lazy"
                  />
                </div>
                <h4 className="font-normal text-xl bg-gradient-to-r from-foundation-white-white-400 to-foundation-purple-purple-100 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(129,51,241,0.3)]">
                  Still have questions?
                </h4>
                <p className="text-base text-foundation-grey-grey-300 relative max-w-[972px]">
                  Have questions or need assistance? Get in touch with our
                  support team for prompt assistance and expert guidance.
                  Whether you have inquiries about our products, need technical
                  support, or want to provide feedback, our dedicated team is
                  here to help. Reach out to us via email, phone, or our online
                  contact form, and we&ldquo;ll ensure your queries are
                  addressed promptly and effectively.
                </p>
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-foundation-purple-purple-400 to-foundation-purple-purple-200 rounded-full opacity-0 group-hover:opacity-70 blur transition duration-1000 group-hover:duration-200"></div>
                <NavButton styles="relative bg-foundation-purple-purple-400 hover:bg-foundation-purple-purple-300 active:bg-foundation-purple-purple-200 text-white text-base font-normal transform transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(129,51,241,0.4)] z-10">
                  Get in touch
                </NavButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
