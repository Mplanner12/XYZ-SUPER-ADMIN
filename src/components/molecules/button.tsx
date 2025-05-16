import React from 'react';

interface ButtonProp {
    children : string;
    styles: string;
}

export default function Button({children, styles} : ButtonProp) {
  return (
		<button type='submit' className={`cursor-pointer [border:none] p-2 bg-foundation-purple-purple-400 rounded-lg flex flex-row items-start justify-start hover:bg-blueviolet ${styles}`}>
			<div className="relative text-base font-text-xs-medium text-white text-left inline-block min-w-[59px]">
				{children}
			</div>
		</button>
	);
}
