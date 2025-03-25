"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const faqs = [
  {
    question: "How Can Subscribe for  XYZ  Modules",
    answer:
      "You can subscribe using the pricing section on  the dashboard based on your business preferences. You can make payments when sign up on XYZ as a new user",
  },
  {
    question: "How Can Subscribe for  XYZ  Modules",
    answer:
      "You can subscribe using the pricing section on  the dashboard based on your business preferences. You can make payments when sign up on XYZ as a new user",
  },
  {
    question: "How Can Subscribe for  XYZ  Modules",
    answer:
      "You can subscribe using the pricing section on  the dashboard based on your business preferences. You can make payments when sign up on XYZ as a new user",
  },
  {
    question: "How Can Subscribe for  XYZ  Modules",
    answer:
      "You can subscribe using the pricing section on  the dashboard based on your business preferences. You can make payments when sign up on XYZ as a new user",
  },
  // Add more FAQ items as needed
];

export function AdminFaq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index: any) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="py-5 w-full flex flex-col justify-start">
      <h2 className="font-medium text-2xl py-4">Frequently Asked Questions</h2>
      <div className="space-y-1">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className=" px-4 py-4 flex flex-col bg-foundation-grey-grey-50 rounded-lg"
          >
            <button
              onClick={() => toggleAnswer(index)}
              className="w-full text-left text-base font-semibold flex justify-between items-center text-foundation-black-black-400"
            >
              {faq.question}
              <span className="text-xl text-foundation-purple-purple-400">
                {activeIndex === index ? <FaAngleUp /> : <FaAngleDown />}
              </span>
            </button>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 text-foundation-grey-grey-600 font-light text-sm w-full"
                >
                  <div className="border-t border-[1.5px] border-foundation-grey-grey-600 w-full mb-2" />
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
