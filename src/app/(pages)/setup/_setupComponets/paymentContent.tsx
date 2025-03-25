"use client"

import React from 'react';

export interface subSection {
    content: string;
}

export interface Section {
	title: string;
	content?: string;
	subSections?: subSection[];
}

const paymentsContent: Section[] = [
	{
		title: 'Introduction',
		subSections: [
			{
				content:
					'This Payment Platform Agreement of Use (the "Agreement") governs the terms and conditions under which you ("User") may access and use the payment platform integrated into the XYZ business management platform (the "Platform").',
			},
			{
				content:
					' By accessing or using the Platform, you agree to be bound by this Agreement. If you do not agree to these terms, please do not use the Platform.',
			},
		],
	},
	{
		title: 'Description of the Platform',
		subSections: [
			{
				content:
					'The Platform provides a secure and convenient method for Users to make payments for XYZ services.',
			},
			{
				content:
					'XYZ may modify or discontinue the Platform or any of its features at any time without prior notice.',
			},
		],
	},
	{
		title: 'User Responsibility',
		subSections: [
            {
                content: "You represent and warrant that you have the legal capacity to enter into this Agreement."
            },
			{
				content:
					'You are responsible for maintaining the confidentiality of your payment information.',
			},
			{
				content:
					'You agree to comply with all applicable laws and regulations related to your use of the Platform.',
			},
		],
	},
	{
		title: 'Payment Processing',
		subSections: [
            {
                content: "XYZ will process payments through [payment processor name] or other third-party payment processors."
            },
			{
				content:
					'You authorize XYZ to charge your designated payment method for the services you purchase.',
			},
			{
				content:
					' All fees and charges associated with your use of the Platform are non-refundable, unless otherwise stated',
			},
		],
	},
	{
		title: 'Termination',
		subSections: [
			{
				content:
					' XYZ may terminate this Agreement and your access to the Platform at any time, with or without cause and without prior notice.',
			},
			{
				content:
					'You may terminate this Agreement by ceasing to use the Platform.',
			},
		],
	},
	{
		title: 'Limitation of Liability',
		subSections: [
			{
				content:
					'XYZ shall not be liable for any indirect, incidental, special, consequential, or exemplary damages arising out of or in connection with this Agreement or the use of the Platform.',
			},
		],
	},
	{
		title: 'Indemnification',
		subSections: [
			{
				content:
					'You agree to indemnify and hold harmless XYZ, its affiliates, officers, directors, and employees from any claims, damages, liabilities, or expenses arising out of your use of the Platform or your violation of this Agreement.',
			},
		],
	},
	{
		title: 'Governing Law',
        subSections: [
			{
				content:
					'This Agreement shall be governed by and construed in accordance with the laws of Nigeria',
			},
		],
	},
	
	{
		title: 'Entire Agreement',
		subSections: [
			{
				content:
					'This Agreement constitutes the entire agreement between you and XYZ and supersedes all prior or contemporaneous communications, representations, or agreements, whether oral or written.',
			},
		],
	},
	{
		title: 'Contact Information',
		subSections: [
			{
				content:
					'For any questions or concerns regarding this Agreement, please contact XYZ at [email protected]',
			},
		],
	},
];


function renderSubSection(
	subSection: subSection,
	subSectionNumber: string
): JSX.Element {
	return (
		<div
			key={subSectionNumber}
			className="flex flex-col text-start my-1 gap-[1px]"
		>
			<p className="my-0 font-normal text-[16px] text-foundation-grey-grey-700">
				{subSectionNumber}. {subSection.content}
			</p>
		</div>
	);
}

function renderSection(section: Section, index: number): JSX.Element {
    const sectionNumber = `${index + 1}`;

	return (
		<div
			key={section.title}
			className="flex flex-col text-start my-2 gap-[2px]"
		>
			<h3 className="text-base font-normal my-0 text-foundation-black-black-400">
				{sectionNumber}. {section.title}
			</h3>
			{section.subSections && (
				<div className="">
					{section.subSections.map((subSection, subIndex) =>
						renderSubSection(subSection, `${sectionNumber}.${subIndex + 1}`)
					)}
				</div>
			)}
		</div>
	);
}

const PaymentContent: React.FC = () => {
	return (
		<div className="">
			{paymentsContent.map((section, index) =>
				renderSection(section,index)
			)}
		</div>
	);
};

export default PaymentContent;
