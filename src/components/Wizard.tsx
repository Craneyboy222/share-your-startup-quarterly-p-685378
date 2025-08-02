import React, { useState } from 'react';
import Stepper from './Stepper';

interface WizardProps {
  steps: React.ReactNode[];
}

const Wizard: React.FC<WizardProps> = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  return (
    <div>
      <Stepper steps={steps.map((step) => ({ title: step.props.title }))} currentStep={currentStep} />
      <div className="mt-8">
        {steps[currentStep]}
        <div className="mt-4 flex justify-between">
          <button
            onClick={prevStep}
            className="px-4 py-2 bg-gray-300 text-black"
            disabled={currentStep === 0}
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            className="px-4 py-2 bg-indigo-600 text-white"
            disabled={currentStep === steps.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wizard;
