"use client"

import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { imagetes } from '../../../public';
import CarouselData, { CustomArrow } from './carouseldata';

const cauroselContents = [
	{
		img: imagetes,
		content:
			"XYZ has been a game-changer for our business. We've seen a significant increase in project efficiency and team collabora-tion since we started using it.",
		contentName: 'Sarah Lee',
		contentTitle: 'CEO of Acme Inc.',
	},
	{
		img: imagetes,
		content:
			"XYZ has been a game-changer for our business. We've seen a significant increase in project efficiency and team collabora-tion since we started using it.",
		contentName: 'John Lee',
		contentTitle: 'CEO of Acme Inc.',
	},
	{
		img: imagetes,
		content:
			"XYZ has been a game-changer for our business. We've seen a significant increase in project efficiency and team collabora-tion since we started using it.",
		contentName: 'Fred Lee',
		contentTitle: 'CEO of Acme Inc.',
	},
];

export default class TestimonyCarousel extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1, // Adjust for responsiveness
            slidesToScroll: 1,
            // autoplay: true,
            autoplayspeed: 5000,
            nextArrow: <CustomArrow direction = "next" />,
            prevArrow: <CustomArrow direction = "prev" />,

            responsive: [
                {
                    breakpoint: 768, // Breakpoint for smaller screens
                    settings: {
                        slidesToShow: 1,
                    },
                },
                {
                    breakpoint: 480, // Breakpoint for even smaller screens
                    settings: {
                        slidesToShow: 1,
                    },
                },
            ],
        };
    
        return (
            <section className="w-full h-full py-14 sm:px-8 px-4">
                <div className="item-center text-center text-foundation-black-black-500">
                    <div className="w-full justify-center flex-col flex text-center text-wrap gap-[14px] mb-12 md:mb-6">
                        <h2 className=" font-normal sm:text-[32px] text-[26px] inline-block">Check what our clients are saying</h2>
                        <p className="text-foundation-grey-grey-900 text-base inline-block">
                            Testimonals
                        </p>
                    </div>

                    <div className="w-full items-center justify-center mx-auto">
                        <Slider {...settings}>
                            {/* Add your carousel items here */}
                            {cauroselContents.map((content) => (
                                <CarouselData 
                                    key={content.contentTitle}
                                    img={content.img}
                                    content={content.content}
                                    contentName={content.contentName}   
                                    contentTitle={content.contentTitle}

                                />

                            ))}
                            {/* Add more carousel items as needed */}
                        </Slider>
                    </div>
                </div>
            </section>
		);

    }
};
