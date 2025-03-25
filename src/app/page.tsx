import AnalyticsAndReport from '@/components/_landingpgComponents/analytics';
import Crm from '@/components/_landingpgComponents/CRM';
import CTA from '@/components/_landingpgComponents/CTA';
import FAQ from '@/components/_landingpgComponents/FAQ';
import Features from '@/components/_landingpgComponents/features';
import Footer from '@/components/_landingpgComponents/footer';
import GetInTouch from '@/components/_landingpgComponents/GetInTouch';
import Hero from '@/components/_landingpgComponents/hero';
import Navbar from '@/components/_landingpgComponents/navbar';
import PriceAndPricing from '@/components/_landingpgComponents/plansAndPricing';
import Product from '@/components/_landingpgComponents/product';
import Report from '@/components/_landingpgComponents/report';
import TestimonyCarousel from '@/components/_landingpgComponents/testimonyCarousel';
import Image from 'next/image';
import React from 'react';
import { heroframe } from '../../public';

export default function LandingPage() {
  return (
		<section className=" bg-white w-full overflow-hidden h-full">
			<div className="bg-foundation-grey-grey-50 px-4 py-[10px] w-[100%] sm:px-6 fixed z-[998]">
				<Navbar />
			</div>
			<div className="flex flex-wrap relative">
				<Image
					src={heroframe}
					alt=""
					className="absolute bottom-0 top-[600px] w-[100%] object-cover md:top-[500px] lg:h-[50%] md:h-[40%] sm:h-[30%] sm:top-[500px]"
				/>
				<Hero />
			</div>
			<div className="py-5 md:py-7 sm:mt-12 mt-8 relative">
				<Features />
			</div>
			<div className="bg-foundation-grey-grey-900 absolute z-[50] h-px w-full opacity-[0.3]" />

			<div className="py-12 md:py-8">
				<Product />
			</div>
			<div className="bg-foundation-grey-grey-50 w-full overflow-hidden">
				<Report />
			</div>
			<div className="w-full overflow-hidden">
				<Crm />
			</div>
			<div className="bg-foundation-grey-grey-50 w-full overflow-hidden">
				<AnalyticsAndReport />
			</div>
			<div className="w-full overflow-hidden">
				<TestimonyCarousel />
			</div>
			<div className="w-full bg-white overflow-hidden">
				<PriceAndPricing />
			</div>
			<div className="w-full bg-foundation-purple-purple-900 overflow-hidden">
				<CTA />
			</div>
			<div className="w-full bg-white overflow-hidden">
				<FAQ />
			</div>
			<div className="w-full bg-white overflow-hidden">
				<GetInTouch />
			</div>
			<div className="w-full bg-foundation-purple-purple-900 overflow-hidden">
				<Footer />
			</div>
		</section>
	);
}
