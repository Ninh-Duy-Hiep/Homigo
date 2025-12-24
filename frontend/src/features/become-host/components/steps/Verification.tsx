import EmailVerificationForm from "../ui/EmailVerificationForm";
import { StepTimeLine } from "../ui/StepTimeLine";


export default function Verification() {
  const currentStep = 0;

  return (
    <div className="grid grid-cols-6">
      <StepTimeLine currentStep={currentStep}/>
      <div className="col-span-4 flex justify-center items-center"><EmailVerificationForm/></div>
    </div>
  );
}
