"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const agreements = [
  {
    title: "Acceptance of Terms",
    content:
      'By accessing or using the XYZ platform (the "Platform"), you agree to be bound by these Terms and Conditions of Use ("Terms"). If you do not agree to these Terms, please do not use the Platform.',
  },
  {
    title: "Description of the Platform",
    content:
      "XYZ is a SaaS platform designed to assist businesses in managing various aspects of their operations.",
  },
  {
    title: "Eligibility",
    content:
      "To use the Platform, you must be at least 18 years old and have the legal capacity to enter into a binding contract.",
  },
  {
    title: "Account Creation and Use",
    content:
      "To access certain features of the Platform, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
  },
  {
    title: "Intellectual Property",
    content:
      "The Platform and its contents, including but not limited to text, images, software, and code, are owned by or licensed to XYZ and are protected by copyright, trademark, and other intellectual property laws.",
  },
  {
    title: "User Content",
    content:
      'You retain ownership of any content you submit to the Platform ("User Content"). However, by submitting User Content, you grant XYZ a non-exclusive, worldwide, royalty-free license to use, reproduce, distribute, and display such content.',
  },
  {
    title: "Limitation of Liability",
    content:
      "XYZ shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of the Platform.",
  },
  {
    title: "Indemnification",
    content:
      "You agree to indemnify and hold harmless XYZ, its affiliates, officers, directors, and employees from any claims, damages, liabilities, and expenses arising out of your use of the Platform or your violation of these Terms.",
  },
  {
    title: "Termination",
    content:
      "XYZ may terminate your account and access to the Platform at any time, without notice, for any reason.",
  },
  {
    title: "Governing Law",
    content:
      "These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction].",
  },
  {
    title: "Modifications",
    content:
      "XYZ reserves the right to modify these Terms at any time. Any changes will be effective upon posting on the Platform.",
  },
  {
    title: "Contact Information",
    content:
      "If you have any questions about these Terms, please contact us at [info@xyz.com]",
  },
];

export default function PricingAgreementModal() {
  const router = useRouter();

  const handleDisagree = () => {
    closeModal();
    router.push("/");
  };

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-foundation-black-black-500 z-[999]">
      <div className=" relative max-h-[85%] max-w-6xl flex w-full justify-center md:w-[85%]">
        <div className="bg-white md:px-10 py-8 px-6 rounded-2xl md:w-[82%] max-h-[80%] w-full max-w-[85%] overflow-auto overflow-y-scroll scroll scrollbar-none">
          <h2 className="font-normal mb-4 text-[1.5em] leading-7 text-foundation-black-black-400">
            Terms & Conditions of Use
          </h2>
          {agreements.map((text, index) => {
            return (
              <div
                key={index}
                className="flex flex-col text-start my-2 gap-[2px]"
              >
                <h3 className="text-base font-normal leading-[1.68em] my-0 text-foundation-black-black-400">{`${
                  index + 1
                }. ${text.title}`}</h3>
                <p className="my-0 font-normal text-[14px] text-foundation-grey-grey-700">
                  {text.content}
                </p>
              </div>
            );
          })}

          <div className="my-6 flex-col md:flex-row flex gap-4 justify-between">
            <button
              onClick={handleDisagree}
              className="bg-white hover:bg-foundation-purple-purple-400 hover:text-white font-inter border-2 border-solid border-foundation-grey-grey-700 text-foundation-grey-grey-700 hover:border-none font-normal py-4 px-5 rounded-2xl outline-none cursor-pointer"
            >
              No, I Disagree
            </button>
            <button
              onClick={closeModal}
              className="bg-foundation-purple-purple-400 hover:bg-white hover:border-2 hover:border-solid hover:border-foundation-grey-grey-700 hover:text-foundation-grey-grey-700 font-inter border-none text-white font-normal py-4 px-5 rounded-2xl outline-none cursor-pointer"
            >
              Yes, I Agree
            </button>
          </div>
        </div>

        <div
          className="absolute md:right-12 right-0 top-0 cursor-pointer text-foundation-purple-purple-400"
          onClick={handleDisagree}
        >
          <IoClose className="w-[26px] h-[26px] object-contain bg-white rounded-full p-1" />
        </div>
      </div>
    </div>
  );
}
