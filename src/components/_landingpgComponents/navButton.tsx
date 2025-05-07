import React from "react";

interface NavButtonProps {
  children: string;
  styles: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function NavButton({
  children,
  styles,
  onClick,
  disabled,
}: NavButtonProps) {
  return (
    <button
      disabled={disabled}
      type="submit"
      className={`rounded-2xl border-foundation-purple-purple-200 hover:border-none border leading-[32px] cursor-pointer items-center justify-center px-6 gap-[4px] ${styles}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
