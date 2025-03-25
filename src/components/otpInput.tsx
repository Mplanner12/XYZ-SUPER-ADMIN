"use client"

import React, { FC, useEffect, useRef, useState } from "react";
import { Control, useController, UseFormRegisterReturn } from "react-hook-form";

interface OtpProps {
  id: string;
  control: Control<any>;
  name: string;
  error?: string;
}

let currentOTPIndex: number = 0;

const OtpInputField: FC<OtpProps> = ({id, control, name, error}): JSX.Element => {
	const [otp, setOtp] = useState<string[]>(new Array(5).fill(''));
	const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);

	const inputRef = useRef<HTMLInputElement>(null);

	const { field } = useController({
		name,
		control,
		rules: { required: true },
	});

	const handleOnChange = ({
		target,
	}: React.ChangeEvent<HTMLInputElement>): void => {
		const { value } = target;
		const newOTP: string[] = [...otp];
		newOTP[currentOTPIndex] = value.substring(value.length - 1);

		if (!value) setActiveOTPIndex(currentOTPIndex - 1);
		else setActiveOTPIndex(currentOTPIndex + 1);

		setOtp(newOTP);

		// updates the form field value
		const otpValue = newOTP.join('');
		field.onChange(otpValue);
	};

	const handleOnKeyDown = (
		{ key }: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		currentOTPIndex = index;
		if (key === 'Backspace') setActiveOTPIndex(currentOTPIndex - 1);
	};

	useEffect(() => {
		inputRef.current?.focus();
	}, [activeOTPIndex]);

	return (
		<div className="flex flex-col gap-y-1">
			<div className="flex justify-between items-center space-x-2">
				{otp.map((_, index) => {
					return (
						<React.Fragment key={index}>
							<input
								ref={index === activeOTPIndex ? inputRef : null}
								type="number"
								id={id}
								className="w-10 h-12 rounded bg-transparent outline-none text-center font-normal text-base focus:border-foundation-purple-purple-400 border-[1px] border-solid border-[#d0d0d0] focus:text-foundation-grey-grey-700 text-foundation-grey-grey-700 transition spin-button-none"
								onChange={handleOnChange}
								onKeyDown={(e) => handleOnKeyDown(e, index)}
								value={otp[index]}
								onBlur={field.onBlur}
							/>
							{index === otp.length - 1 ? null : (
								<span className="w-2 py-0.5" />
							)}
						</React.Fragment>
					);
				})}
			</div>
			{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
		</div>
	);
};

export default OtpInputField;