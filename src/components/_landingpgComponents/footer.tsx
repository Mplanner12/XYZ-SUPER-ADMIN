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
    <div className="w-full bg-foundation-purple-purple-900 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptLTUgMmg0djFoLTR2LTF6bTAgMmgxdi00aC0xdjR6bS01LTJoNHYxaC00di0xem0wIDJoMXYtNGgtMXY0em0tNS0yaDF2MWgtMXYtMXptMC0yaDF2NGgtMXYtNHptLTUgMmg0djFoLTR2LTF6bTAgMmgxdi00aC0xdjR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

      {/* Floating circles */}
      <div className="absolute -left-20 bottom-1/3 w-64 h-64 rounded-full bg-foundation-purple-purple-400/10 blur-3xl animate-pulse-slow"></div>
      <div className="absolute -right-20 top-1/3 w-56 h-56 rounded-full bg-foundation-purple-purple-200/10 blur-3xl animate-[pulse_15s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

      {/* Unique decorative element - subtle grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(129,51,241,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(129,51,241,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

      <section className="w-full h-full sm:py-14 py-10 px-6 sm:px-8 relative z-10">
        <div className="w-full items-center text-foundation-white-white-400 flex justify-center flex-col">
          <div className="flex flex-row justify-between flex-wrap max-w-[1200px] w-full gap-8">
            {footerLinks.map((footerlink) => (
              <div
                key={footerlink.title}
                className="flex flex-col sm:my-0 my-2 text-start justify-start items-start group"
              >
                <h4 className="font-medium text-[16px] my-0 leading-[27px] text-foundation-purple-purple-100 capitalize relative">
                  {footerlink.title}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-foundation-purple-purple-400 group-hover:w-full transition-all duration-300"></span>
                </h4>
                <ul className="list-none mt-4 flex flex-col gap-4">
                  {footerlink.links.map((link, index) => (
                    <li
                      key={link.name}
                      className="font-normal text-[14px] mb-0 text-foundation-grey-grey-300 relative overflow-hidden group/link"
                    >
                      <Link
                        href={link.link}
                        className="transition-all duration-300 hover:text-foundation-purple-purple-100 relative inline-block"
                      >
                        {link.name}
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-foundation-purple-purple-300 group-hover/link:w-full transition-all duration-300"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center mt-8">
            <div className="border-[1px] border-foundation-purple-purple-400/70 border-solid rounded-lg mb-10 backdrop-blur-sm bg-foundation-purple-purple-900/30 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_20px_rgba(129,51,241,0.2)] transition-all duration-300">
              <div className="flex flex-row gap-8 px-4 py-2">
                <label className="flex gap-4 text-foundation-grey-grey-300">
                  Language{" "}
                  <select className="border-none px-2 bg-transparent outline-none text-foundation-purple-purple-100 cursor-pointer focus:ring-1 focus:ring-foundation-purple-purple-300">
                    <option
                      value="english"
                      className="bg-foundation-black-black-500 text-foundation-grey-grey-300"
                    >
                      English
                    </option>
                  </select>
                </label>
              </div>
            </div>

            <div className="flex flex-row gap-3 text-foundation-grey-grey-300 items-start justify-center align-middle group hover:text-foundation-white-white-400 transition-colors duration-300">
              <div className="relative">
                <div className="absolute inset-0 bg-foundation-purple-purple-400/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Image
                  src={mapmarker}
                  alt="Location marker"
                  className="w-6 h-6 object-contain overflow-hidden relative z-10 filter brightness-125"
                />
              </div>
              <h2 className="text-base leading-[24px] font-normal">
                Our Address 14b, Ijaola Street, Onigbongbo Maryland Lagos,
                Nigeria.
              </h2>
            </div>
          </div>

          <div className="h-[1px] bg-gradient-to-r from-transparent via-foundation-purple-purple-400/30 to-transparent w-full my-8" />

          <div className="flex sm:flex-row flex-col justify-between w-full sm:px-4 px-2 items-center align-middle gap-3">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-foundation-purple-purple-400/0 to-foundation-purple-purple-400/0 group-hover:from-foundation-purple-purple-400/20 group-hover:to-foundation-purple-purple-400/0 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <Image
                src={logoxyz}
                alt="XYZ company logo"
                className="w-[108px] h-10 object-contain relative z-10"
                loading="lazy"
              />
            </div>
            <h3 className="max-w-[350px] leading-[24px] text-base inline-block shrink-0 my-0 text-foundation-grey-grey-300 text-wrap">
              © 2025 XYZ. All rights reserved.
            </h3>
          </div>
        </div>
      </section>
    </div>
  );
}
