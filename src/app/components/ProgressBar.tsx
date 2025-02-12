import { Progress } from "antd";
import React from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full">
      <Progress
        percent={progress}
        showInfo={false}
        strokeColor={"#197686"}
        strokeWidth={3}
        className="transition-all duration-500"
      />
    </div>
  );
};

export default ProgressBar;
