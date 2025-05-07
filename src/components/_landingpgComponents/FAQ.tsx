import React from "react";
import AccordionExpandDefault from "./Accordion";

export default function FAQ() {
  return (
    <div className="w-full bg-foundation-purple-purple-900 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptLTUgMmg0djFoLTR2LTF6bTAgMmgxdi00aC0xdjR6bS01LTJoNHYxaC00di0xem0wIDJoMXYtNGgtMXY0em0tNS0yaDF2MWgtMXYtMXptMC0yaDF2NGgtMXYtNHptLTUgMmg0djFoLTR2LTF6bTAgMmgxdi00aC0xdjR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

      {/* Floating circles */}
      <div className="absolute -left-20 top-1/3 w-64 h-64 rounded-full bg-foundation-purple-purple-400/10 blur-3xl animate-pulse-slow"></div>
      <div className="absolute -right-20 bottom-1/3 w-72 h-72 rounded-full bg-foundation-purple-purple-200/10 blur-3xl animate-[pulse_15s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

      {/* Unique Q&A decorative elements */}
      <div className="absolute top-10 left-10 text-8xl font-serif text-foundation-purple-purple-400/10 select-none">
        Q
      </div>
      <div className="absolute bottom-10 right-10 text-8xl font-serif text-foundation-purple-purple-400/10 select-none">
        A
      </div>

      <section
        id="faq"
        className="w-full h-full py-16 sm:px-8 px-6 flex justify-center items-center font-DmSans relative z-10"
      >
        <div className="item-center flex flex-col flex-wrap text-center justify-start text-foundation-white-white-400">
          <div className="max-w-[1197px] w-auto justify-center items-center flex-col flex text-center text-wrap gap-[14px] mb-12 md:mb-8 relative group">
            {/* Subtle top glow */}
            <div className="absolute -top-6 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-foundation-white-white-400/30 to-transparent"></div>

            <h2 className="font-normal text-3xl inline-block drop-shadow-[0_0_8px_rgba(129,51,241,0.3)]">
              <span className="bg-gradient-to-r from-foundation-white-white-400 to-foundation-purple-purple-100 bg-clip-text text-transparent">
                Frequently asked questions
              </span>
            </h2>
            <p className="max-w-[972px] w-auto text-center text-foundation-grey-grey-300 text-base inline-block m-0">
              Everything you need to know about the product and billing.
            </p>

            {/* Animated underline that appears on group hover */}
            <div className="h-0.5 w-0 mx-auto bg-foundation-purple-purple-200/70 rounded-full mt-2 group-hover:w-32 transition-all duration-500"></div>
          </div>

          <div className="flex flex-col max-w-[972px] w-auto flex-wrap text-wrap">
            {/* Glass-like container for accordion */}
            <div className="bg-foundation-purple-purple-900/80 backdrop-blur-sm border border-foundation-purple-purple-400/20 rounded-2xl p-6 shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
              <AccordionExpandDefault />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
