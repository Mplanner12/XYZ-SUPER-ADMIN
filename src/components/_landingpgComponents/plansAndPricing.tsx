import Link from "next/link";
import React from "react";

const pricingCard = [
  {
    title: "Free Plan Tier",
    content:
      "Enjoy a 30-day free trial of all modules with up to 3 users. Explore XYZ Business Management Applications and discover how they can enhance your operations.",
  },
  {
    title: "Pay Per Module",
    content:
      "Select the modules you need and pay only for what you use. Whether it's sales, purchases, inventory, accounting, CRM, or analytics, you can customize your package to match your needs.",
  },
];

export default function PriceAndPricing() {
  return (
    <section
      id="pricing"
      className="w-full h-full py-10 px-8 md:px-6 lg:px-1.5 flex justify-center items-center dark:bg-gradient-to-b dark:from-foundation-black-black-500 dark:to-[#1a1a24] relative overflow-hidden"
    >
      {/* Unique decorative elements */}
      <div className="absolute inset-0 dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM4MTMzZjEiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptLTUgMmg0djFoLTR2LTF6bTAgMmgxdi00aC0xdjR6bS01LTJoNHYxaC00di0xem0wIDJoMXYtNGgtMXY0em0tNS0yaDF2MWgtMXYtMXptMC0yaDF2NGgtMXYtNHptLTUgMmg0djFoLTR2LTF6bTAgMmgxdi00aC0xdjR6Ii8+PC9nPjwvZz48L3N2Zz4=')] dark:opacity-30"></div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-foundation-purple-purple-400/30 to-transparent dark:via-foundation-purple-purple-300/40 dark:opacity-80"></div>

      {/* Floating circles */}
      <div className="absolute left-1/4 top-1/3 w-40 h-40 rounded-full bg-foundation-purple-purple-900/5 dark:bg-foundation-purple-purple-400/10 blur-3xl dark:blur-2xl animate-pulse-slow"></div>
      <div className="absolute right-1/4 bottom-1/3 w-48 h-48 rounded-full bg-foundation-purple-purple-900/5 dark:bg-foundation-purple-purple-200/8 blur-3xl dark:blur-2xl animate-[pulse_12s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

      <div className="item-center flex flex-col flex-wrap text-center justify-start text-foundation-black-black-500 dark:text-foundation-white-white-400 relative z-10">
        <div className="justify-center items-center flex-col flex gap-[14px] mb-12 md:mb-6">
          <h3 className="font-normal text-[32px] sm:text-[26px] dark:text-foundation-white-white-400 dark:drop-shadow-[0_0_8px_rgba(129,51,241,0.15)] relative group">
            <span className="dark:bg-gradient-to-r dark:from-foundation-white-white-400 dark:to-foundation-purple-purple-100 dark:bg-clip-text dark:text-transparent">
              Plans & Pricing
            </span>
            <div className="h-0.5 w-24 mx-auto bg-foundation-purple-purple-400/0 dark:bg-foundation-purple-purple-400/70 rounded-full mt-2 transform transition-all duration-500 scale-0 dark:group-hover:scale-100"></div>
          </h3>
          <p className="max-w-[978px] w-full text-wrap text-center text-foundation-grey-grey-900 dark:text-foundation-grey-grey-300 text-base sm:px-4 px-2">
            Choose the pricing plan that best suits your business needs. With
            XYZ Business Management Applications, you get a free 30-day trial to
            explore our products and experience their full potential. After the
            trial period, you can opt for one of our flexible pricing options
          </p>
        </div>

        <div className="bg-foundation-grey-grey-50 dark:bg-foundation-black-black-400/30 dark:backdrop-blur-sm rounded-[26px] dark:border dark:border-foundation-grey-grey-800/30 dark:shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
          <div className="py-10 px-4">
            <div className="flex flex-row flex-wrap justify-center items-center sm:gap-[18px] gap-2 text-[26px]">
              {pricingCard.map((price, index) => (
                <div
                  key={index}
                  className="max-w-[310px] w-full h-auto text-wrap bg-foundation-grey-grey-50 dark:bg-foundation-black-black-500/50 dark:border dark:border-foundation-grey-grey-800/20 hover:bg-foundation-purple-purple-900 dark:hover:bg-foundation-purple-purple-900/90 hover:text-foundation-grey-grey-300 dark:text-foundation-white-white-400 flex flex-col flex-wrap items-start justify-start p-6 box-border text-start text-[10px] cursor-pointer rounded-[26px] hover:shadow-[0px_42px_34px_rgba(82,_67,_194,_0.3)] dark:hover:shadow-[0px_20px_30px_rgba(129,51,241,0.25)] hover:transform hover:translate-y-[6%] mt-2.5 transition-all duration-300 group"
                >
                  <div className="flex flex-col relative">
                    {/* Card shine effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-foundation-purple-purple-400/0 via-foundation-purple-purple-400/0 to-foundation-purple-purple-400/0 dark:group-hover:via-foundation-purple-purple-400/20 rounded-[26px] blur opacity-0 dark:group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

                    <h3 className="text-5xl font-normal tracking-tighter leading-[90%] my-3 dark:text-foundation-white-white-400 dark:group-hover:text-foundation-white-white-400 relative z-10">
                      {price.title}
                    </h3>
                    <p className="text-base hover:text-foundation-grey-grey-300 dark:text-foundation-grey-grey-300 dark:group-hover:text-foundation-grey-grey-200 inline-block font-DmSans relative z-10">
                      {price.content}
                    </p>
                    <div className="py-2 inline-block relative z-10">
                      <Link href={"#"}>
                        <button className="bg-foundation-purple-purple-400 border-none hover:bg-foundation-purple-purple-100 dark:hover:bg-foundation-purple-purple-300 py-4 px-4 cursor-pointer text-foundation-white-white-400 rounded-[16px] transition-all duration-300 transform dark:hover:translate-y-[-2px] dark:hover:shadow-[0_5px_15px_rgba(129,51,241,0.4)]">
                          Choose Plan
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              <div className="max-w-[310px] w-full text-wrap mb-4 relative h-auto bg-foundation-grey-grey-50 dark:bg-foundation-black-black-500/50 dark:border dark:border-foundation-purple-purple-900/30 hover:bg-foundation-purple-purple-900 dark:hover:bg-foundation-purple-purple-900/90 hover:text-foundation-grey-grey-300 dark:text-foundation-white-white-400 flex flex-col items-start justify-start p-6 box-border text-start text-[10px] cursor-pointer rounded-[26px] hover:shadow-[0px_42px_34px_rgba(82,_67,_194,_0.3)] dark:hover:shadow-[0px_20px_30px_rgba(129,51,241,0.25)] hover:transform hover:translate-y-[6%] transition-all duration-300 group">
                <div className="w-full flex flex-col relative">
                  {/* Featured card shine effect - more prominent */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-foundation-purple-purple-400/0 via-foundation-purple-purple-400/0 to-foundation-purple-purple-400/0 dark:group-hover:via-foundation-purple-purple-400/30 rounded-[26px] blur opacity-0 dark:group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

                  {/* Star with animation */}
                  <div className="flex justify-end relative z-10">
                    <span className="text-yellow-500 text-2xl dark:text-yellow-400 dark:drop-shadow-[0_0_5px_rgba(234,179,8,0.5)] animate-[pulse_3s_ease-in-out_infinite]">
                      ★
                    </span>
                  </div>
                  <h3 className="tracking-[-0.01em] font-normal text-5xl leading-[90%] my-1.5 dark:text-foundation-white-white-400 dark:group-hover:text-foundation-white-white-400 relative z-10">
                    Pay Per User
                  </h3>
                  <p className="text-base hover:text-foundation-grey-grey-300 dark:text-foundation-grey-grey-300 dark:group-hover:text-foundation-grey-grey-200 inline-block font-DmSans relative z-10">
                    Choose the number of users for each module and pay per user.
                    Whether you have a small team or a large workforce, our
                    flexible pricing scales with your business.
                  </p>
                  <div className="py-2 inline-block relative z-10">
                    <Link href={"#"}>
                      <button className="bg-foundation-purple-purple-400 text-foundation-white-white-400 border-none hover:bg-foundation-purple-purple-100 dark:hover:bg-foundation-purple-purple-300 py-4 px-4 cursor-pointer rounded-2xl transition-all duration-300 transform dark:hover:translate-y-[-2px] dark:hover:shadow-[0_5px_15px_rgba(129,51,241,0.4)] relative overflow-hidden group-hover:before:opacity-100">
                        <span className="relative z-10">Choose Plan</span>
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-foundation-purple-purple-400 to-foundation-purple-purple-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-transparent via-foundation-purple-purple-400/20 to-transparent"></div>
    </section>
  );
}
