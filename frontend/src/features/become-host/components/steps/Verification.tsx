import EmailVerificationForm from "../ui/EmailVerificationForm";
import { StepTimeLine } from "../ui/StepTimeLine";

export default function Verification() {
  const currentStep = 0;

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-6 min-h-screen max-w-screen-2xl mx-auto">
      <div className="lg:col-span-2">
        <StepTimeLine currentStep={currentStep} />
      </div>
      <div className="lg:col-span-4 flex justify-center items-center p-4">
        <EmailVerificationForm />
      </div>
    </div>
  );
}
