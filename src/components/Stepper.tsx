import React from 'react';
import clsx from 'clsx';

interface Step {
  title: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <nav aria-label="Progress">
      <ol className="flex items-center">
        {steps.map((step, index) => (
          <li key={step.title} className="relative flex-1 flex items-center">
            {index !== 0 && (
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full border-t border-gray-200" aria-hidden="true"></div>
            )}
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white">
              <span className="sr-only">{step.title}</span>
              <span>{index + 1}</span>
            </div>
            <div className="ml-4 text-sm font-medium text-gray-900">
              <span>{step.title}</span>
              {step.description && <span className="text-gray-500"> - {step.description}</span>}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Stepper;
