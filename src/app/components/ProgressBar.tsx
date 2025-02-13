// components/ProgressBar.tsx
import React from "react";

interface ProgressBarProps {
  step: number; // Current step (1, 2, or 3)
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  const getWidth = () => {
    if (step === 1) return "33.33%";
    if (step === 2) return "66.66%";
    return "100%";
  };

  const titles = ["Ticket Selection", "Attendee Details", "Ready"];

  return (
    <>
      <div className="flex justify-between items-center mb-4 gap-36">
        <h2 className="">{titles[step - 1]}</h2>
        <div className="text-sm text-gray-400 text-right">Step {step}/3</div>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
        <div
          className="bg-accent h-2.5 rounded-full transition-all duration-500"
          style={{ width: getWidth() }}
        ></div>
      </div>
    </>
  );
};

export default ProgressBar;
