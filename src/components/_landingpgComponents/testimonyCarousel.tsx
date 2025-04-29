"use client";

import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { imagetes } from "../../../public";
import CarouselData, { CustomArrow } from "./carouseldata";

const cauroselContents = [
  {
    img: imagetes,
    content:
      "XYZ has been a game-changer for our business. We've seen a significant increase in project efficiency and team collabora-tion since we started using it.",
    contentName: "Sarah Lee",
    contentTitle: "CEO of Acme Inc.",
  },
  {
    img: imagetes,
    content:
      "XYZ has been a game-changer for our business. We've seen a significant increase in project efficiency and team collabora-tion since we started using it.",
    contentName: "John Lee",
    contentTitle: "CEO of Acme Inc.",
  },
  {
    img: imagetes,
    content:
      "XYZ has been a game-changer for our business. We've seen a significant increase in project efficiency and team collabora-tion since we started using it.",
    contentName: "Fred Lee",
    contentTitle: "CEO of Acme Inc.",
  },
];

export default class TestimonyCarousel extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1, // Adjust for responsiveness
      slidesToScroll: 1,
      // autoplay: true,
      autoplayspeed: 5000,
      nextArrow: <CustomArrow direction="next" />,
      prevArrow: <CustomArrow direction="prev" />,
      dotsClass: "slick-dots custom-dots",
      responsive: [
        {
          breakpoint: 768, // Breakpoint for smaller screens
          settings: {
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 480, // Breakpoint for even smaller screens
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };

    return (
      <section className="w-full h-full py-14 sm:px-8 px-4 dark:bg-gradient-to-b dark:from-[#1a1a24] dark:to-foundation-black-black-500 relative overflow-hidden">
        {/* Unique decorative elements */}
        <div className="absolute inset-0 dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyOTAwNjQiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptLTUgMmg0djFoLTR2LTF6bTAgMmgxdi00aC0xdjR6bS01LTJoNHYxaC00di0xem0wIDJoMXYtNGgtMXY0em0tNS0yaDF2MWgtMXYtMXptMC0yaDF2NGgtMXYtNHptLTUgMmg0djFoLTR2LTF6bTAgMmgxdi00aC0xdjR6Ii8+PC9nPjwvZz48L3N2Zz4=')] dark:opacity-40"></div>

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-foundation-purple-purple-400/30 to-transparent dark:via-foundation-purple-purple-300/40 dark:opacity-80"></div>

        {/* Floating circles */}
        <div className="absolute left-1/4 top-1/4 w-32 h-32 rounded-full bg-foundation-purple-purple-900/5 dark:bg-foundation-purple-purple-400/10 blur-3xl dark:blur-2xl animate-pulse-slow"></div>
        <div className="absolute right-1/4 bottom-1/4 w-40 h-40 rounded-full bg-foundation-purple-purple-900/5 dark:bg-foundation-purple-purple-200/8 blur-3xl dark:blur-2xl animate-[pulse_12s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

        {/* Unique quote marks decorative element */}
        <div className="absolute top-20 left-10 opacity-0 dark:opacity-10 text-[120px] font-serif text-foundation-purple-purple-300">
          &ldquo;
        </div>
        <div className="absolute bottom-20 right-10 opacity-0 dark:opacity-10 text-[120px] font-serif text-foundation-purple-purple-300">
          &ldquo;{" "}
        </div>

        <div className="item-center text-center text-foundation-black-black-500 dark:text-foundation-white-white-400 relative z-10">
          <div className="w-full justify-center flex-col flex text-center text-wrap gap-[14px] mb-12 md:mb-6">
            <h2 className="font-normal sm:text-[32px] text-[26px] inline-block dark:text-foundation-white-white-400 dark:drop-shadow-[0_0_8px_rgba(129,51,241,0.15)] relative">
              <span className="dark:bg-gradient-to-r dark:from-foundation-white-white-400 dark:to-foundation-purple-purple-100 dark:bg-clip-text dark:text-transparent">
                Check what our clients are saying
              </span>
              <div className="h-0.5 w-24 mx-auto bg-foundation-purple-purple-400/0 dark:bg-foundation-purple-purple-400/70 rounded-full mt-2 transform transition-all duration-500 scale-0 group-hover:scale-100"></div>
            </h2>
            <p className="text-foundation-grey-grey-900 dark:text-foundation-grey-grey-300 text-base inline-block">
              Testimonals
            </p>
          </div>

          <div className="w-full items-center justify-center mx-auto group">
            <style jsx global>{`
              .custom-dots {
                bottom: -25px;
              }
              .custom-dots li button:before {
                font-size: 10px;
                color: #727171;
                opacity: 0.5;
              }
              .custom-dots li.slick-active button:before {
                color: #8133f1;
                opacity: 1;
              }
              @media (prefers-color-scheme: dark) {
                .custom-dots li button:before {
                  color: #9654f4;
                }
                .custom-dots li.slick-active button:before {
                  color: #ceb0fa;
                }
                .slick-prev:before,
                .slick-next:before {
                  color: #9654f4;
                }
              }
              .slick-slider {
                padding-bottom: 40px;
              }
            `}</style>
            <div className="dark:bg-foundation-black-black-400/30 dark:backdrop-blur-sm dark:border dark:border-foundation-grey-grey-800/30 dark:rounded-xl dark:p-6 transition-all duration-300 dark:shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
              <Slider {...settings}>
                {cauroselContents.map((content) => (
                  <CarouselData
                    key={content.contentTitle}
                    img={content.img}
                    content={content.content}
                    contentName={content.contentName}
                    contentTitle={content.contentTitle}
                  />
                ))}
              </Slider>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-transparent via-foundation-purple-purple-400/20 to-transparent"></div>
      </section>
    );
  }
}
