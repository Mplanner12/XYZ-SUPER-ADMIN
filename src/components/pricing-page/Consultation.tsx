import React from 'react';
import NavButton from '../_landingpgComponents/navButton';

const Consultation = () => {
  return (
		<div className='flex justify-center items-center w-full text-white'>
      <div className='flex flex-col gap-4 justify-center items-center'>
        <h2 className="text-[2.5em] leading-10 font-light w-full text-center py-2 text-wrap">
          Still Not Sure?
        </h2>
        <p className='font-light '>
          Our pricing experts are here to help you build the perfect plan for your
          business.
        </p>
        <NavButton styles="w-fit mb-6 mt-2 bg-foundation-purple-purple-400 text-white hover:bg-foundation-purple-purple-200 active:bg-foundation-purple-purple-100 border-none">
          Schedule a Consultation
        </NavButton>
      </div>
		</div>
	);
}

export default Consultation