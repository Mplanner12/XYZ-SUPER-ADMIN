import Image from "next/image";
import React from "react";
import {
  monday,
  morphesus,
  oracle,
  proton,
  samsung,
  segment,
  zepline,
} from "../../../public";

export default function Features() {
  return (
    <section
      id="features"
      className="w-full h-auto align-middle flex text-center px-6 md:px-12 py-4 sm:py-6 bg-foundation-purple-purple-900 overflow-hidden relative"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptLTUgMmg0djFoLTR2LTF6bTAgMmgxdi00aC0xdjR6bS01LTJoNHYxaC00di0xem0wIDJoMXYtNGgtMXY0em0tNS0yaDF2MWgtMXYtMXptMC0yaDF2NGgtMXYtNHptLTUgMmg0djFoLTR2LTF6bTAgMmgxdi00aC0xdjR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

      {/* Floating circles */}
      <div className="absolute -left-20 top-1/4 w-64 h-64 rounded-full bg-foundation-purple-purple-400/10 blur-3xl animate-pulse-slow"></div>
      <div className="absolute -right-20 bottom-1/4 w-72 h-72 rounded-full bg-foundation-purple-purple-200/10 blur-3xl animate-[pulse_12s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

      <div className="flex w-full flex-col justify-center items-center gap-4 relative z-10">
        <h3 className="text-[20px] leading-[30px] font-semibold text-foundation-white-white-400">
          Over 32+ software company businesses Partner with XYZ
        </h3>
        <div className="flex flex-row flex-1 flex-wrap justify-center gap-[30px] items-center">
          {[zepline, oracle, morphesus, samsung, monday, segment, proton].map(
            (src, index) => (
              <div
                key={index}
                className="transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src={src}
                  alt=""
                  className="w-[137px] h-auto object-contain filter brightness-110"
                  loading="lazy"
                />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
