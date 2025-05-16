import React from 'react';

interface ITransparentButton {
  text: string | null;
  customPadding: string;
  onClick?: () => void
}

const TransparentButton: React.FC<ITransparentButton> = ({ text, customPadding, onClick }) => {
  return (
    <button
    onClick={onClick}
      className={`bg-transparent border hover:text-white hover:border-0 border-foundation-purple-purple-400  hover:bg-foundation-purple-purple-100 ${customPadding} cursor-pointer text-foundation-purple-purple-400 rounded-[16px]`}
    >
      {text}
    </button>
  );
};

export default TransparentButton;
