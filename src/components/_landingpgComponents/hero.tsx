"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import {
  cameralogo,
  heroframe,
  herologo,
  heroshadow,
  macbookmock,
  mackbooklogo,
  mockscreen,
} from "../../../public";
import NavButton from "./navButton";

export default function Hero() {
  return (
    <div className="w-full bg-foundation-purple-purple-900 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptLTUgMmg0djFoLTR2LTF6bTAgMmgxdi00aC0xdjR6bS01LTJoNHYxaC00di0xem0wIDJoMXYtNGgtMXY0em0tNS0yaDF2MWgtMXYtMXptMC0yaDF2NGgtMXYtNHptLTUgMmg0djFoLTR2LTF6bTAgMmgxdi00aC0xdjR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

      {/* Floating circles */}
      <div className="absolute -left-20 top-1/4 w-72 h-72 rounded-full bg-foundation-purple-purple-400/10 blur-3xl animate-pulse-slow"></div>
      <div className="absolute -right-20 bottom-1/4 w-80 h-80 rounded-full bg-foundation-purple-purple-200/10 blur-3xl animate-[pulse_12s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

      {/* Unique decorative element - code-like pattern */}
      <div className="absolute top-10 right-10 text-xs font-mono text-foundation-purple-purple-400/10 select-none hidden lg:block">
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="opacity-30">
              {"{"}
              <span className="text-foundation-purple-purple-200/10">
                function
              </span>
              <span className="text-foundation-purple-purple-100/10">
                createInnovation
              </span>
              () {"{"}...{"}"}
            </div>
          ))}
      </div>

      <div className="w-full items-center justify-start text-foundation-white-white-400 py-[14px] sm:mt-16 mt-10 px-4 md:px-6 font-DmSans relative z-10">
        <div className="flex flex-col flex-wrap items-center justify-start py-10 md:py-5 gap-6">
          <motion.h1
            className="text-center font-normal md:text-6xl text-4xl bg-gradient-to-r from-foundation-white-white-400 to-foundation-purple-purple-100 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(129,51,241,0.3)]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Welcome to XYZ Company!
          </motion.h1>
          <motion.p
            className="text-center text-foundation-grey-grey-300 text-xl flex-wrap max-w-[960px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {"We're"} thrilled to have you here. At XYZ, {"we're"} dedicated to
            providing innovative solutions that meet the needs of our customers.
            Explore our wide range of products and services to discover how we
            can help you achieve your goals.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-foundation-purple-purple-400 to-foundation-purple-purple-200 rounded-full opacity-0 group-hover:opacity-70 blur transition duration-1000 group-hover:duration-200"></div>
            <Link href={"/signup"} className="relative z-10">
              <NavButton styles="bg-foundation-purple-purple-400 hover:bg-foundation-purple-purple-300 active:bg-foundation-purple-purple-200 text-white transform transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(129,51,241,0.4)]">
                Get Started
              </NavButton>
            </Link>
          </motion.div>
        </div>
        <motion.div
          className="flex justify-center shrink flex-1 w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="w-[996px] relative h-[582px] overflow-hidden shrink-0 hidden md:flex">
            {/* Subtle glow behind laptop */}
            <div className="absolute h-[90%] w-[90%] top-[5%] left-[5%] bg-foundation-purple-purple-400/10 blur-2xl rounded-full"></div>

            <Image
              className="absolute h-[1.08%] w-[101.7%] top-[98.69%] right-[-0.02%] bottom-[0.22%] left-[-1.68%] max-w-full overflow-hidden max-h-full object-cover"
              alt="Laptop shadow"
              src={heroshadow}
              loading="lazy"
            />
            <Image
              className="absolute h-[99.42%] w-[98.13%] top-[0%] right-[0.92%] bottom-[0.58%] left-[0.94%] max-w-full overflow-hidden max-h-full object-cover filter brightness-105"
              alt="Macbook frame"
              src={mackbooklogo}
              loading="lazy"
            />
            <Image
              className="absolute h-[0.79%] w-[0.46%] top-[1.67%] right-[49.44%] bottom-[97.54%] left-[50.1%] max-w-full overflow-hidden max-h-full object-cover"
              alt="Camera"
              src={cameralogo}
              loading="lazy"
            />
            <Image
              className="absolute h-[1.27%] w-[5.51%] top-[92.25%] right-[46.91%] bottom-[6.48%] left-[47.58%] max-w-full overflow-hidden max-h-full object-cover"
              alt="Apple logo"
              src={herologo}
              loading="lazy"
            />
            <Image
              className="absolute h-[88.32%] w-[150%] top-[3.09%] right-0 bottom-[8.59%] left-0 max-w-full overflow-hidden max-h-full object-contain filter drop-shadow-[0_0_10px_rgba(129,51,241,0.2)]"
              alt="Screen content"
              src={mockscreen}
              loading="lazy"
            />
          </div>
          <div className="w-[100%] h-[100%] overflow-hidden relative flex md:hidden justify-center items-center">
            {/* Subtle glow behind mobile mockup */}
            <div className="absolute h-[80%] w-[80%] top-[10%] left-[10%] bg-foundation-purple-purple-400/10 blur-2xl rounded-full"></div>

            <Image
              src={macbookmock}
              alt="Macbook mockup"
              className="w-[600px] md:w-[500px] sm:w-[300px] h-auto object-contain filter brightness-105 drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)] relative z-10"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
