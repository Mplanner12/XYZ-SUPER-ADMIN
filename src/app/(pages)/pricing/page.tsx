import FAQ from '@/components/_landingpgComponents/FAQ';
import Footer from '@/components/_landingpgComponents/footer';
import GetInTouch from '@/components/_landingpgComponents/GetInTouch';
import Navbar from '@/components/_landingpgComponents/navbar';
import About from '@/components/pricing-page/About';
import Consultation from '@/components/pricing-page/Consultation';
import Features from '@/components/pricing-page/Features';
import FlexibleDeployment from '@/components/pricing-page/flexibleDeployment';
import PricingHero from '@/components/pricing-page/Hero';
import MobileAccess from '@/components/pricing-page/MobileAccess';
import ModulePricing from '@/components/pricing-page/ModulePricing';
import PoweredInsight from '@/components/pricing-page/PoweredInsight';
import BusinessPricing from '@/components/pricing-page/Pricing';
import ScalableSolution from '@/components/pricing-page/ScalableSolution';
import SeemlessIntegration from '@/components/pricing-page/SeemlessIntegration';
import StartTrial from '@/components/pricing-page/Start-Trial';
import PricingTestimony from '@/components/pricing-page/Testimony';
import React from 'react';

const Pricing = () => {
  return (
		<section className="bg-white overflow-hidden w-full h-full">
			<div className="bg-foundation-grey-grey-50 px-6 py-[10px] w-[100%] sm:px-8 fixed z-[998]">
				<Navbar />
			</div>

			<main className="w-full items-start justify-start text-foundation-black-black-400 sm:mt-14 mt-10">
				<div className="linear-gradient">
					<PricingHero />
				</div>
				<div className="py-5 md:py-7 sm:mt-4 mt-4 bg-foundation-grey-grey-50">
					<BusinessPricing />
					<div>
						<ModulePricing headerStyle="sm:px-14 px-0" style="lg:px-36 px-4" />
					</div>
				</div>
				<div className="py-16 sm:mt-8 mt-4 bg-foundation-purple-purple-400">
					<About />
				</div>
				<div className="sm:py-20 py-10 px-2 bg-foundation-purple-purple-900">
					<Consultation />
				</div>
				<div className="py-5 md:py-7 sm:mt-4 mt-4 bg-foundation-grey-grey-50">
					<Features />
					<div className="py-0 md:py-7 sm:mt-4 mt-0">
						<ScalableSolution />
					</div>
					<div className="">
						<MobileAccess />
					</div>
					<div className="">
						<FlexibleDeployment />
					</div>
					<div className="">
						<SeemlessIntegration />
					</div>
					<div className="">
						<PoweredInsight />
					</div>
				</div>
				<div className="py-2 md:py-7 bg-foundation-grey-grey-50">
					<PricingTestimony />
				</div>
				<div className="sm:py-20 py-10 bg-foundation-purple-purple-900">
					<StartTrial />
				</div>
				<div className="w-full py-5 md:py-9 bg-white overflow-hidden">
					<FAQ />
				</div>
				<div className="w-full bg-white overflow-hidden">
					<GetInTouch />
				</div>
				<div className="w-full bg-foundation-purple-purple-900 overflow-hidden">
					<Footer />
				</div>
			</main>
		</section>
	);
}

export default Pricing