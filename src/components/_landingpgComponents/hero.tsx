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
    <div className="w-full items-center justify-start text-foundation-black-black-400 py-[14px] sm:mt-16 mt-10 px-4 md:px-6 font-DmSans">
      <div className="flex flex-col flex-wrap items-center justify-start text-foundation-black-black-500 py-10 md:py-5 gap-6">
        <h1 className="text-center font-normal md:text-6xl text-4xl">
          {" "}
          Welcome to XYZ Company!{" "}
        </h1>{" "}
        <p className="text-center text-foundation-grey-grey-800 text-xl flex-wrap max-w-[960px]">
          {" "}
          {"We're"} thrilled to have you here. At XYZ, {"we're"} dedicated to
          providing innovative solutions that meet the needs of our customers.
          Explore our wide range of products and services to discover how we can
          help you achieve your goals.{" "}
        </p>
        <Link href={"/signup"}>
          <NavButton styles="bg-foundation-purple-purple-400 hover:bg-foundation-purple-purple-200 active:bg-foundation-purple-purple-100 text-white">
            Get Started
          </NavButton>
        </Link>
      </div>
      <div className="flex justify-center shrink flex-1 w-full">
        <div className="w-[996px] relative h-[582px] overflow-hidden shrink-0 hidden md:flex">
          <Image
            className="absolute h-[1.08%] w-[101.7%] top-[98.69%] right-[-0.02%] bottom-[0.22%] left-[-1.68%] max-w-full overflow-hidden max-h-full object-cover"
            alt=""
            src={heroshadow}
            loading="lazy"
          />
          <Image
            className="absolute h-[99.42%] w-[98.13%] top-[0%] right-[0.92%] bottom-[0.58%] left-[0.94%] max-w-full overflow-hidden max-h-full object-cover"
            alt=""
            src={mackbooklogo}
            loading="lazy"
          />
          <Image
            className="absolute h-[0.79%] w-[0.46%] top-[1.67%] right-[49.44%] bottom-[97.54%] left-[50.1%] max-w-full overflow-hidden max-h-full object-cover"
            alt=""
            src={cameralogo}
            loading="lazy"
          />
          <Image
            className="absolute h-[1.27%] w-[5.51%] top-[92.25%] right-[46.91%] bottom-[6.48%] left-[47.58%] max-w-full overflow-hidden max-h-full object-cover"
            alt=""
            src={herologo}
            loading="lazy"
          />
          <Image
            className="absolute h-[88.32%] w-[150%] top-[3.09%] right-0 bottom-[8.59%] left-0 max-w-full overflow-hidden max-h-full object-contain"
            alt=""
            src={mockscreen}
            loading="lazy"
          />
        </div>
        <div className="w-[100%] h-[100%] overflow-hidden relative flex md:hidden justify-center items-center">
          <Image
            src={macbookmock}
            alt=""
            className="w-[600px] md:w-[500px] sm:w-[300px] h-auto object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
