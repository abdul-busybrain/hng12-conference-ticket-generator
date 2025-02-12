"use client";

import { useEffect, useState } from "react";
import { Progress } from "antd";

interface ProgressionProps {
  currentStep: number;
}

const Progression: React.FC<ProgressionProps> = ({ currentStep }) => {
  const [progress, setProgress] = useState(0);
  const titles = ["Ticket Selection", "Attendee Details", "Ready"];

  useEffect(() => {
    const targetProgress = ((currentStep - 1) / 2) * 100;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= targetProgress) {
          clearInterval(interval);
          return targetProgress;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [currentStep]);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mt-4">{titles[currentStep - 1]}</h2>
        <div className="mt-2">
          <span className="text-gray-600">{currentStep}/3</span>
        </div>
      </div>

      <div className="w-full">
        <Progress
          percent={progress}
          showInfo={false}
          strokeColor={"#197686"}
          strokeWidth={3}
          className="transition-all duration-500"
        />
      </div>
    </>
  );
};

export default Progression;
