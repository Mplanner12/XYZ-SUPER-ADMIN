"use client";

import { ElementType, useState } from "react";
import BusinessInputLocation from "./business-information/businessInputLocation";
import GeneralInformation from "./business-information/general-information";
import LegalInformation from "./business-information/legal-info";
import OtherTaxInformation from "./business-information/other-info";
import ReportInformation from "./business-information/report-info";
import SetupBusinessLocation from "./business-information/Setup-businessLocation";
import SetupOwnershipInformation from "./business-information/setupOwnershipInfo";
import AccountModule from "./business-information/AccountModule";
import UserManagement from "./business-information/UserManagement";
import BillingConfig from "./business-information/BillingConfig";
import NotificationManagement from "./business-information/NotificationManagement";
import APIIntegrationSetup from "./business-information/APIIntegrationSetup";
import SecurityConfig from "./business-information/SecurityConfig";
import ApprovalWorkflowSetup from "./business-information/ApprovalWorkflowSetup";

export default function MainForm() {
  const steps: { id: string; name: string; component: ElementType }[] = [
    {
      id: "1",
      name: "General Information",
      //   component: GeneralInformation,
      component: ApprovalWorkflowSetup,
    },
    // {
    //   id: "2",
    //   name: "Account Module",
    //   component: AccountModule,
    // },
    // {
    //   id: "3",
    //   name: "User Management",
    //   component: UserManagement,
    // },
    // {
    // 	id: "4",
    // 	name: "Billing Configuration",
    // 	component: BillingConfig,
    //   },
    // {
    // 	id: "5",
    // 	name: "Notification Management"
    // 	component: NotificationManagement,
    //   },
    // {
    // 	id: "6",
    // 	name: "API Integration Setup"
    // 	component: APIIntegrationSetup,
    //   },
    // {
    // 	id: "7",
    // 	name: "Security Configuration"
    // 	component: SecurityConfig,
    //   },
    // {
    // 	id: "8",
    // 	name: "Approval Workflow Setup"
    // 	component: ApprovalWorkflowSetup,
    //   },
    {
      id: "2",
      name: "Legal Information",
      component: LegalInformation,
    },
    {
      id: "3",
      name: "Report Information",
      component: ReportInformation,
    },
    {
      id: "4",
      name: "Ownership Information",
      component: SetupOwnershipInformation,
    },
    {
      id: "5",
      name: "Other Information",
      component: OtherTaxInformation,
    },
    {
      id: "6",
      name: "Business Input Location",
      component: BusinessInputLocation,
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
