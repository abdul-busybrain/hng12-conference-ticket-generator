interface ProgressIndicatorProps {
  currentStep: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
}) => {
  return (
    <div className="mt-2">
      <span className="text-gray-600">{currentStep}/3</span>
    </div>
  );
};

export default ProgressIndicator;
