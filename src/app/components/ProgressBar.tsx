// components/ProgressBar.tsx
import React from 'react';

interface ProgressBarProps {
  step: number; // Current step (1, 2, or 3)
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  const getWidth = () => {
    if (step === 1) return '33.33%';
    if (step === 2) return '66.66%';
    return '100%';
  };

  return (
    <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4"> {/* Darker background */}
      <div
        className="bg-accent h-2.5 rounded-full transition-all duration-500"
        style={{ width: getWidth() }}
      ></div>
      <div className="text-sm text-gray-400 text-right">Step {step}/3</div> {/* Light text */}
    </div>
  );
};

export default ProgressBar;
