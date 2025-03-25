import React from "react";
import ChangeTheme from "../_components/change-theme";

export default function Page() {
  return (
    <section className="w-full text-foundation-black-black-400 overflow-hidden flex flex-col items-start justify-start leading-[normal] tracking-[normal] [row-gap:5px] flex-wrap bg-foundation-grey-grey-50 rounded-2xl px-4 py-4">
      <ChangeTheme/>

    </section>
  );
}
