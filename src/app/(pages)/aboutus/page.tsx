import FAQ from '@/components/_landingpgComponents/FAQ';
import Footer from '@/components/_landingpgComponents/footer';
import GetInTouch from '@/components/_landingpgComponents/GetInTouch';
import Navbar from '@/components/_landingpgComponents/navbar';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { heroAboutus, innovatewand, shieldLock, smiley, teamImage, valuesImage } from '../../../../public';

export default function AboutUs() {
  return (
		<section className="bg-white w-full overflow-hidden h-full">
			<div className="bg-foundation-grey-grey-50 px-6 py-[10px] w-[100%] sm:px-8 fixed z-[998]">
				<Navbar />
			</div>
			<div className="w-full items-start justify-start text-foundation-black-black-400 py-[8px] mt-14">
				{/* hero section */}
				<div className="flex lg:flex-row flex-col justify-between sm:justify-center items-start sm:items-center text-foundation-black-black-500 mt-2 md:py-10 py-5 md:px-44 px-6 gap-8">
					<div className="flex flex-1 flex-col flex-wrap gap-4">
						<h1 className="text-start font-normal sm:text-[42px] text-[32px]">
							About XYZ
						</h1>
						<p className=" max-w-[550px] text-foundation-grey-grey-800 text-[20px] flex-wrap">
							At XYZ Company, our mission is to empower businesses with
							cutting-edge technologies and exceptional services. We believe in
							delivering value to our customers by understanding their unique
							challenges and providing tailored solutions. Our core values of
							integrity, innovation, and customer satisfaction drive everything
							we do.
						</p>
						<div className="mt-5 flex flex-col gap-2">
							<h2 className="text-start font-medium text-[32px]">
								Our Mission
							</h2>
							<p className="max-w-[550px] text-foundation-grey-grey-800 text-base leading-5 flex-wrap">
								To empower businesses with innovative solutions that drive
								growth, efficiency, and success.
							</p>
						</div>
					</div>
					<Image
						src={heroAboutus}
						alt=""
						className="max-w-[450px] w-full rounded-lg h-auto object-contain"
					/>
				</div>

				<div className=" bg-foundation-purple-purple-400 py-12 w-full text-white">
					<h2 className=" text-[40px] font-normal leading-[48.41px] text-center">
						Our Values
					</h2>
					<div className="flex lg:flex-row flex-col items-center justify-between text-foundation-black-black-500 md:py-10 py-5 w-full md:px-44 px-6 gap-4">
						<div className="flex justify-center items-center w-full">
							<Image
								src={valuesImage}
								alt=""
								className="max-w-[450px] w-full h-auto rounded-2xl object-contain"
								loading="lazy"
								placeholder="blur"
							/>
						</div>

						<div className="flex flex-col gap-6 w-full justify-start lg:justify-center items-start lg:items-center">
							<div className="flex flex-col gap-2 text-white justify-start items-start max-w-[425px]">
								<Image
									src={shieldLock}
									alt="Shield logo"
									className="w-[28px] h-[28px] object-contain"
								/>
								<h2 className="inline-block text-start font-normal text-[24px] leading-[32px]">
									Integrity
								</h2>
								<p className=" inline-block text-foundation-white-white-400 text-base flex-wrap ">
									We uphold the highest standards of honesty, transparency, and
									ethical conduct in all our interactions.
								</p>
							</div>
							<div className="flex flex-col gap-2 text-white justify-start items-start max-w-[425px]">
								<Image
									src={innovatewand}
									alt="Shield logo"
									className="w-[28px] h-[28px] object-contain"
								/>
								<h2 className="inline-block text-start font-normal text-[24px] leading-[32px]">
									Innovate
								</h2>
								<p className=" inline-block text-foundation-white-white-400 text-base flex-wrap">
									We continuously strive to innovate and stay ahead of the curve
									to meet the evolving needs of our customers.
								</p>
							</div>
							<div className="flex flex-col gap-2 text-white justify-start items-start max-w-[425px]">
								<Image
									src={smiley}
									alt="Shield logo"
									className="w-[28px] h-[28px] object-contain"
								/>
								<h2 className="inline-block text-start font-normal text-[24px] leading-[32px]">
									Customer Satisfaction
								</h2>
								<p className=" inline-block text-foundation-white-white-400 text-base flex-wrap">
									We are committed to exceeding customer expectations and
									delivering exceptional value at every touchpoint.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className=" bg-foundation-grey-grey-50 py-16 w-full text-foundation-black-black-500">
					<div className="flex lg:flex-row flex-col items-center justify-between text-foundation-black-black-500 md:py-10 py-5 w-full md:px-44 px-6 gap-8">
						<div className="flex flex-col gap-6 w-full justify-center items-center">
							<div className="flex flex-col gap-8 text-foundation-black-black-500 justify-start items-start">
								<h2 className=" text-start font-normal sm:text-[56px] text-[2.5rem] leading-[28px]">
									Our Team
								</h2>
								<p className=" max-w-[650px] inline-block text-foundation-black-black-500 sm:text-xl text-base flex-wrap">
									Behind every success story at XYZ Company is our dedicated
									team of professionals who are passionate about what they do.
									With a diverse range of expertise and a shared commitment to
									excellence, our team works tirelessly to deliver results and
									drive positive change for our customers. Join us on our journey
									as we continue to innovate, grow, and make a difference in the
									world of technology and business.
								</p>
							</div>
						</div>
						<div className="flex justify-center items-center w-full">
							<Image
								src={teamImage}
								alt=""
								className="max-w-[400px] w-full h-auto rounded-2xl object-contain"
								loading="lazy"
								placeholder="blur"
							/>
						</div>
					</div>
				</div>

				<div className="w-full bg-white overflow-hidden">
					<FAQ />
				</div>
				<div className="w-full bg-foundation-grey-grey-50 overflow-hidden">
					<GetInTouch />
				</div>
			</div>
			<div className="w-full bg-foundation-purple-purple-900 overflow-hidden">
				<Footer />
			</div>
		</section>
	);
}
