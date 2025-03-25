"use client"

// components/Stepper.tsx
import React, { useState } from 'react';

interface StepperProps {
	steps: string[];
}

const Stepper: React.FC<StepperProps> = ({ steps }) => {
	const [currentStep, setCurrentStep] = useState(0);

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handlePrev = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const progressWidth = ((currentStep + 1) / steps.length) * 100;

	return (
		<div>
			<div className="stepper-container w-full flex-row flex gap-20 justify-between">
				{steps.map((step, index) => (
					<div
						key={index}
						className={`step ${index === currentStep ? 'active' : ''}`}
					>
						{/* {step} */}
					</div>
				))}
			</div>
			<div className="progress-bar">
				<div className="progress" style={{ width: `${progressWidth}%` }}></div>
			</div>
			<div className="step-content">
				{/* Render step content based on currentStep */}
				{currentStep === 0 && <div>Step 1 content</div>}
				{currentStep === 1 && <div>Step 2 content</div>}
				{currentStep === 2 && <div>Step 3 content</div>}
			</div>
			<div className="step-buttons">
				{currentStep > 0 && (
					<button onClick={handlePrev} className="prev-btn">
						Previous
					</button>
				)}
				{currentStep < steps.length - 1 && (
					<button onClick={handleNext} className="next-btn">
						Next
					</button>
				)}
			</div>
		</div>
	);
};

export default Stepper;
