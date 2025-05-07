import React from 'react';
import NavButton from '../_landingpgComponents/navButton';

const StartTrial = () => {
	return (
		<div className="flex justify-center items-center w-full text-white px-4">
			<div className="flex flex-col gap-4 justify-center items-center">
				<h2 className="text-[2.5em] leading-10 font-light w-full text-center py-2 text-wrap">
					Ready to Transform Your Business?
				</h2>
				<p className="font-light ">
					Join thousands of businesses already benefiting from {"XYZ's"}
					comprehensive management solution.
				</p>
				<div className="flex sm:flex-row flex-col items-center gap-4">
					<NavButton styles="w-fit sm:mb-6 mb-0 mt-2 bg-foundation-purple-purple-400 text-white hover:bg-foundation-purple-purple-200 active:bg-foundation-purple-purple-100 border-none">
						Start Your Free Trial
					</NavButton>
					<NavButton styles="w-fit sm:mb-6 mb-0 mt-2 bg-none text-white hover:bg-foundation-purple-purple-200 active:bg-foundation-purple-purple-100 border-2">
						Schedule A Demo
					</NavButton>
				</div>
			</div>
		</div>
	);
};

export default StartTrial;
