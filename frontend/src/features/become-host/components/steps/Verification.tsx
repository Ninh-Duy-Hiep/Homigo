import { StepTimeLine } from "../ui/StepTimeLine";


export default function Verification() {
  const currentStep = 0;

  return (
    <div className="grid grid-cols-6">
      <StepTimeLine currentStep={currentStep}/>
      <div className="col-span-4"></div>
    </div>
  );
}
