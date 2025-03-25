"use client"

import { ElementType, useState } from 'react';
import ProductInformation from './pricing-payment/product-infomation';
import ModulePricing from '@/components/pricing-page/ModulePricing';
import SubmitButton from '@/components/Buttons/SubmitButton';
import { useRouter } from 'next/navigation';


export default function MainPricePayment() {

  const router = useRouter();

  const steps: { id: string; name: string; component: ElementType }[] = [
		{
			id: '1',
			name: 'Product Information',
			component: ProductInformation,
		},
		{
			id: '2',
			name: 'Pricing',
			component: ModulePricing,
		},
	];

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
		Array(steps.length).fill(false)
	);

  

	const onNext = () => {
		setCompletedSteps((prev) => {
			const newCompletedSteps = [...prev];
			newCompletedSteps[currentStep] = true;
			return newCompletedSteps;
		});
		if (currentStep === steps.length - 1) {
      // Route to the new page upon completing the final step
      router.push("/setup/manage-account");
    } else {
      setCurrentStep((step) => step + 1);
    }
	};

	const onPrev = () => {
		if (currentStep > 0) {
			setCurrentStep((step) => step - 1);
		}
	};

	const StepComponent = steps[currentStep]?.component;

	return (
    <section className="w-full flex flex-col justify-between">
      <div className="stepper-container flex-row flex gap-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${index === currentStep ? "active" : ""} ${
              completedSteps[index] ? "completed" : ""
            } bg-foundation-purple-purple-100`}
          ></div>
        ))}
      </div>

      {/* Render the current step component */}
      <StepComponent onNext={onNext} onPrev={onPrev} />

      <div className="flex justify-between">
        <SubmitButton
          text="Prev"
          onClick={onPrev}
          customPadding="w-20 py-4 mt-5 mb-3"
          actionType="button"
          // loading={isPending}
        />
        <SubmitButton
          text="Next"
          onClick={onNext}
          customPadding="w-20 py-4 mt-5 mb-3"
          actionType="submit"
          // loading={isPending}
        />
      </div>

      {/* {currentStep > 0 && <button onClick={onPrev}>Back</button>} */}
      {/* <button onClick={onPrev} disabled={currentStep === steps.length - 1}>
				Back
			</button> */}
    </section>
  );
}
