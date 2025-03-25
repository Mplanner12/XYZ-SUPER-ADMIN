import { ElementType, useState } from "react";
import UserManagementTable from "@/app/(pages)/setup/_setupComponets/userManagementTable";
import ManagePermissions from "@/app/(pages)/setup/manage-account/_components/ManagePermissions";
import InviteUsersTable from "@/app/(pages)/setup/_setupComponets/InviteUsersTable";
import UserRoleTable from "@/app/(pages)/setup/_setupComponets/user-role-table";

export default function MainManageAccount() {
  const steps: { id: string; name: string; component: ElementType }[] = [
    {
      id: "1",
      name: "User Management Table",
      component: UserManagementTable,
    },
    {
      id: "2",
      name: "User Role",
      component: UserRoleTable,
    },
    {
      id: "3",
      name: "Manage Permissions",
      component: ManagePermissions,
    },
    {
      id: "4",
      name: "Invite Users",
      component: InviteUsersTable,
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
    </section>
  );
}
