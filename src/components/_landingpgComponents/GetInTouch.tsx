import Image from 'next/image';
import React from 'react';
import { avatar } from '../../../public';
import NavButton from './navButton';

export default function GetInTouch() {
  return (
		<section className="w-full h-full py-10 sm:px-6 px-0 flex justify-center items-center">
			<div className="item-center bg-foundation-grey-grey-50 w-full rounded-[26px] px-6 py-2 flex flex-col flex-wrap text-center justify-center text-foundation-black-black-500">
				<div className=" self-stretch flex justify-center items-center align-middle">
					<div className="w-full max-w-[768px] flex flex-col flex-wrap justify-center items-center gap-[28px] text-[24px]">
						<div className="flex flex-col flex-wrap justify-center items-center gap-[8px]">
							<Image
								src={avatar}
								alt=""
								className="w-[140px] h-[80px] object-contain mb-5"
								loading="lazy"
							/>
							<h4 className="font-normal text-xl">Still have questions?</h4>
							<p className="text-base text-foundation-grey-grey-900 relative max-w-[972px]">
								{`Have questions or need assistance? Get in touch with our support
                  team for prompt assistance and expert guidance. Whether you have
                  inquiries about our products, need technical support, or want to
                  provide feedback, our dedicated team is here to help. Reach out to
                  us via email, phone, or our online contact form, and we'll ensure
                  your queries are addressed promptly and effectively.
                `}
							</p>
						</div>
						<div>
							<NavButton styles="bg-foundation-purple-purple-400 hover:bg-foundation-purple-purple-200 active:bg-foundation-purple-purple-100 text-white text-base font-normal">
								Get in touch
							</NavButton>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
