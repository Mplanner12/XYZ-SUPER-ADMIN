"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { logoxyz, mapmarker } from "../../../public";
import DynamicSelect from "../molecules/select";

const footerLinks = [
  {
    title: "product",
    links: [
      {
        name: "Features",
        link: "#features",
      },
      {
        name: "Pricing",
        link: "#pricing",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        name: "About us",
        link: "#about",
      },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        name: "Blog",
        link: "#",
      },
      {
        name: "FAQ",
        link: "#faq",
      },
    ],
  },
  {
    title: "social",
    links: [
      {
        name: "Twitter",
        link: "#",
      },
      {
        name: "Linkedln",
        link: "#",
      },
      {
        name: "Facebook",
        link: "#",
      },
    ],
  },
  {
    title: "legal",
    links: [
      {
        name: "Terms",
        link: "#",
      },
      {
        name: "Partners",
        link: "#",
      },
      {
        name: "Contacts",
        link: "#",
      },
    ],
  },
];
export default function Footer() {
  return (
    <section className="w-full h-full sm:py-14 py-10 px-6 sm:px-8">
      <div className=" w-full items-center text-foundation-white-white-400 flex justify-center flex-col">
        <div className="flex flex-row justify-between flex-wrap max-w-[1200px] w-full gap-8">
          {footerLinks.map((footerlink) => (
            <div
              key={footerlink.title}
              className="flex flex-col sm:my-0 my-2 text-start justify-start items-start"
            >
              <h4 className="font-medium text-[16px] my-0 leading-[27px] text-foundation-grey-grey-600 capitalize">
                {footerlink.title}
              </h4>
              <ul className="list-none mt-4 flex flex-col gap-4">
                {footerlink.links.map((link, index) => (
                  <li
                    key={link.name}
                    className={`font-normal text-[14px] ${
                      footerlink.links.length - 1 ? "mb-2" : "mb-0"
                    } text-foundation-grey-grey-200 hover:text-foundation-purple-purple-400 active:bg-foundation-purple-purple-100 `}
                  >
                    <Link href={link.link}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center mt-4">
          <div className="border-[1px] border-foundation-purple-purple-400 border-solid rounded-lg mb-10">
            <div className="flex flex-row gap-8 px-4 py-2">
              <label className="flex gap-4">
                Language{" "}
                <select className="border-none px-2 bg-transparent outline-none text-foundation-purple-purple-400">
                  <option value="english">English</option>
                </select>
              </label>
            </div>
          </div>
          <div className="flex flex-row gap-2 text-white items-start justify-center align-middle">
            <Image
              src={mapmarker}
              alt=""
              className="w-6 h-6 object-contain overflow-hidden"
            />
            <h2 className="text-base leading-[24px] font-normal">
              Our Address 14b, Ijaola Street, Onigbongbo Maryland Lagos,
              Nigeria.
            </h2>
          </div>
        </div>
        <div className=" h-[1px] bg-foundation-grey-grey-200 w-full my-8" />
        <div className="flex sm:flex-row flex-col justify-between w-full sm:px-4 px-2 items-center align-middle gap-3">
          <Image
            src={logoxyz}
            alt=""
            className="w-[108px] h-10 object-contain"
            loading="lazy"
          />
          <h3 className="max-w-[350px] leading-[24px] text-base inline-block shrink-0 my-0 text-[#667085] text-wrap">
            © 2025 XYZ. All rights reserved.
          </h3>
        </div>
      </div>
    </section>
  );
}
