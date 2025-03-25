import React from "react";
import CompanyForm from "../../setup/business-account/_components/companyForm";


export default function AdminBusinessAccount() {
  return (
    <section className="w-full text-foundation-black-black-400 overflow-hidden flex flex-col items-start justify-start leading-[normal] tracking-[normal] flex-wrap mb-4 bg-foundation-grey-grey-50 rounded-2xl px-4 py-4 ">
      <CompanyForm />
    </section>
  );
}
