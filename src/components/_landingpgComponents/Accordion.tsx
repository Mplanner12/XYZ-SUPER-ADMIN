"use client";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import * as React from "react";
import { useState } from "react";
import { minuscircle, pluscircle } from "../../../public";

const faqData = [
  {
    title: "Is there a free trial available?",
    answer:
      "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    title: "Can I change my plan later?",
    answer:
      "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    title: "What is your cancellation policy?",
    answer:
      "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    title: "Can other info be added to an invoice?",
    answer:
      "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    title: "How does billing work?",
    answer:
      "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    title: "How do I change my account email?",
    answer:
      "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
];

export default function AccordionExpandDefault() {
  const [open, setOpen] = useState(Array(faqData.length).fill(false));

  const handleChange = (index: any) => {
    setOpen((prevOpen) => {
      const newOpen = [...prevOpen];
      newOpen[index] = !newOpen[index];
      return newOpen;
    });
  };

  return (
    <div>
      {faqData.map((faq, index) => (
        <Accordion
          key={faq.title}
          expanded={open[index]}
          onChange={() => handleChange(index)}
          sx={{
            border: "none", // Removing the border
            boxShadow: "none",
            backgroundColor: "transparent",
            color: "#fff",
          }}
          className="border-b-2 border-foundation-purple-purple-400/30 flex flex-col mb-3 py-4 font-DmSans group hover:border-foundation-purple-purple-300/50 transition-colors duration-300"
        >
          <AccordionSummary
            expandIcon={
              <Image
                src={open[index] ? minuscircle : pluscircle}
                alt=""
                loading="lazy"
                className="filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
            }
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            sx={{
              color: "#fff",
              "&:hover": {
                color: "#ceb0fa",
              },
            }}
          >
            <Typography className="font-semibold text-foundation-white-white-400 group-hover:text-foundation-purple-purple-100 transition-colors duration-300">
              {faq.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography align="left" className="text-foundation-grey-grey-300">
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
