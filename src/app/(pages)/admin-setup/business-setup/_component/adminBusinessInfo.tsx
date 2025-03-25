"use client"

import { ElementType, useState } from "react";
import AdminGeneralInformation from "./admin-generalInfo";
import AdminLegalInformation from "./admin-legalInfo";
import AdminReportInformation from "./admin-reportInfo";
import AdminOwnershipInfo from "./ownershipInformation";
import AdminOtherInformation from "./OtherInformation";
import AdminBusinessLocation from "./admin-BusinessLocation";
import AdminBusinessInputLocation from "./admin-business-input";
import SetupBusinessLocation from "@/app/(pages)/setup/business-information/_component/business-information/Setup-businessLocation";

export default function MainForm() {
  const steps: { id: string; name: string; component: ElementType }[] = [
    {
      id: "1",
      name: "General Information",
      component: AdminGeneralInformation,
    },
    {
      id: "2",
      name: "Legal Information",
      component: AdminLegalInformation,
    },
    {
      id: "3",
      name: "Report Information",
      component: AdminReportInformation,
    },
    {
      id: "4",
      name: "Ownership Information",
      component: AdminOwnershipInfo,
    },
    {
      id: "5",
      name: "Other Information",
      component: AdminOtherInformation,
    },
    {
      id: "6",
      name: "Business Input Location",
      component: AdminBusinessInputLocation,
    },
    {
      id: "7",
      name: "Business Location",
      component: SetupBusinessLocation,
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
    setCurrentStep((step) => step + 1);
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

      {/* {currentStep > 0 && <button onClick={onPrev}>Back</button>} */}
      {/* <button onClick={onPrev} disabled={currentStep === steps.length - 1}>
				Back
			</button> */}
    </section>
  );
}
