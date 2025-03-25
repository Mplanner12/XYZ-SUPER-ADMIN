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
      "Select the modules you need and pay only for what you use. Whether it’s sales, purchases, inventory, accounting, CRM, or analytics, you can customize your package to match your needs.",
  },
];

export default function PriceAndPricing() {
  return (
    <section
      id="pricing"
      className="w-full h-full py-10 px-8 md:px-6 lg:px-1.5 flex justify-center items-center"
    >
      <div className="item-center flex flex-col flex-wrap text-center justify-start text-foundation-black-black-500">
        <div className="justify-center items-center flex-col flex gap-[14px] mb-12 md:mb-6">
          <h3 className=" font-normal text-[32px] sm:text-[26px]">
            Plans & Pricing
          </h3>
          <p className="max-w-[978px] w-full text-wrap text-center text-foundation-grey-grey-900 text-base sm:px-4 px-2">
            Choose the pricing plan that best suits your business needs. With
            XYZ Business Management Applications, you get a free 30-day trial to
            explore our products and experience their full potential. After the
            trial period, you can opt for one of our flexible pricing options
          </p>
        </div>

        <div className="bg-foundation-grey-grey-50 rounded-[26px]">
          <div className="py-10 px-4">
            <div className="flex flex-row flex-wrap justify-center items-center sm:gap-[18px] gap-2 text-[26px]">
              {pricingCard.map((price, index) => (
                <div
                  key={index}
                  className="max-w-[310px] w-full h-auto text-wrap bg-foundation-grey-grey-50 hover:bg-foundation-purple-purple-900 hover:text-foundation-grey-grey-300 flex flex-col flex-wrap items-start justify-start p-6 box-border text-start text-[10px] cursor-pointer rounded-[26px] hover:shadow-[0px_42px_34px_rgba(82,_67,_194,_0.3)] hover:transform hover:translate-y-[6%] mt-2.5"
                >
                  <div className=" flex flex-col">
                    <h3 className="text-5xl font-normal tracking-tighter leading-[90%] my-3">
                      {price.title}
                    </h3>
                    <p className="text-base hover:text-foundation-grey-grey-300 inline-block font-DmSans">
                      {price.content}
                    </p>
                    <div className="py-2 inline-block">
                      <Link href={"#"}>
                        <button className="bg-foundation-purple-purple-400 border-none hover:bg-foundation-purple-purple-100 py-4 px-4 cursor-pointer text-foundation-white-white-400 rounded-[16px]">
                          Choose Plan
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              <div className="max-w-[310px] w-full text-wrap mb-4 relative h-auto bg-foundation-grey-grey-50 hover:bg-foundation-purple-purple-900 hover:text-foundation-grey-grey-300 flex flex-col items-start justify-start p-6 box-border text-start text-[10px] cursor-pointer rounded-[26px] hover:shadow-[0px_42px_34px_rgba(82,_67,_194,_0.3)] hover:transform hover:translate-y-[6%]">
                <div className="w-full flex flex-col relative">
                  {/* Replaced the button with a star */}
                  <div className="flex justify-end">
                    <span className="text-yellow-500 text-2xl">★</span>
                  </div>
                  <h3 className="tracking-[-0.01em] font-normal text-5xl leading-[90%] my-1.5">
                    Pay Per User
                  </h3>
                  <p className="text-base hover:text-foundation-grey-grey-300 inline-block font-DmSans">
                    Choose the number of users for each module and pay per user.
                    Whether you have a small team or a large workforce, our
                    flexible pricing scales with your business.
                  </p>
                  <div className="py-2 inline-block">
                    <Link href={"#"}>
                      <button className="bg-foundation-purple-purple-400 text-foundation-white-white-400 border-none hover:bg-foundation-purple-purple-100 py-4 px-4 cursor-pointer rounded-2xl">
                        Choose Plan
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
