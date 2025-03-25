import React from "react";
import AdminBusinessForm from "./_component/adminBusinessInfo";

export default function AdminBusinessInformation() {
  return (
    <section className="w-full text-foundation-black-black-400 overflow-hidden flex flex-col items-start justify-start leading-[normal] tracking-[normal] [row-gap:5px] flex-wrap bg-foundation-grey-grey-50 rounded-2xl px-4 py-4">
      <div className="flex flex-col gap-2 mt-2">
        <h2 className=" font-semibold text-[20px] m-0">Business Information</h2>
        <p className="font-normal text-base text-foundation-grey-grey-800 m-0">
          Kindly fill out your business information
        </p>
      </div>
      <AdminBusinessForm />
    </section>
  );
}
