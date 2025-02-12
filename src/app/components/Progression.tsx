import { useEffect, useState } from "react";
import Title from "./Title";
import ProgressIndicator from "./ProgressIndicator";
import ProgressBar from "./ProgressBar";

const Progression: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const titles = ["Ticket Selection", "Attendee Details", "Ready"];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 33.333;
      });
      setCurrentStep((prev) => {
        if (prev < 3) return prev + 1;
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="flex justify-between">
        <Title title={titles[currentStep - 1]} />
        <ProgressIndicator currentStep={currentStep} />
      </div>

      <ProgressBar progress={progress} />
    </>
  );
};

export default Progression;
