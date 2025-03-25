import Image from 'next/image';
import React from 'react';
import {
  apostrophy,
  arrow,
  rightArrow,
  stars,
} from '../../../public';

interface carouselItems {
    img: any;
    content: string;
    contentName: string;
    contentTitle: string;
}


export default function CarouselData({img, content, contentName, contentTitle}: carouselItems) {
  return (
		<div className="flex w-full justify-center h-full items-center">
			<div className="flex flex-col md:flex-row md:justify-center max-w-[1058px] w-full md:gap-4 gap-8 h-auto items-center align-middle justify-between">
				<div className="container md:justify-start justify-center flex">
					
					<Image src={img} alt="" className="sm:w-[396px] w-full h-auto object-contain" />
				</div>
				<div className="flex flex-col justify-start w-full items-start sm:px-6 px-2 sm:ml-0 ml-4 sm:text-start text-center">
					<div className="gap-3 flex flex-col">
						<Image
							src={apostrophy}
							alt="apostrophy"
							className="w-[31px] h-[27px] object-contain"
							loading="lazy"
						/>
						<Image
							src={stars}
							alt="apostrophy"
							className="w-[145px] h-[29px] object-contain"
							loading="lazy"
						/>
					</div>
					<div className="w-full text-start text-foundation-black-black-500 px-1 text-wrap sm:text-[24px] text-[18px] mb-8 mt-3">
						<p className="">{content}</p>
					</div>
					<div className="md:w-full w-[133px] h-auto text-[16px] text-start flex px-1 flex-col gap-[6px]">
						<h4 className="font-semibold">{contentName}</h4>
						<p className=" text-[#757095]">{contentTitle}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

interface CustomArrowProps {
    onClick?: () => void;
    direction: 'prev' | 'next';
}

export function CustomArrow ({onClick, direction} : CustomArrowProps) {
    return (
			<button
				onClick={onClick}
				className={`absolute top-1/2 transform rounded-full -translate-y-1/2 z-10 ${
					direction === 'prev' ? 'left-0' : 'right-0'
				} flex align-middle justify-between items-center cursor-pointer transition-opacity border-none !shadow-none duration-300 bg-transparent hover:opacity-75`}
			>
				{direction === 'prev' ? (
					<Image
						src={arrow}
						alt=""
						className="w-[64px] h-[64px] object-cover"
						loading="lazy"
					/>
				) : (
					<Image
						src={rightArrow}
						alt=""
						className="w-[64px] h-[64px] object-contain"
						loading="lazy"
					/>
				)}
			</button>
		);
}
