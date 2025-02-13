import type React from "react";

interface ProgressBarProps {
  step: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  const getWidth = () => {
    if (step === 1) return "33.33%";
    if (step === 2) return "66.66%";
    return "100%";
  };

  const titles = ["Ticket Selection", "Attendee Details", "Ready"];

  return (
    <div className="w-full max-w-3xl mx-auto mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-light text-white">{titles[step - 1]}</h2>
        <div className="text-sm text-gray-400">Step {step}/3</div>
      </div>
      <div className="h-0.5 w-full bg-[#003333] rounded-full">
        <div
          className="h-0.5 bg-[#00cccc] rounded-full transition-all duration-500 ease-in-out"
          style={{ width: getWidth() }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
