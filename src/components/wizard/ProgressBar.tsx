import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const stepLabels = [
  "Contact & Spaces",
  "Draw & Measure",
  "Review & Book",
];

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  return (
    <div className="w-full mb-12">
      <div className="relative h-1 w-full bg-brand-border rounded-full">
        <div
          className="absolute top-0 left-0 h-1 bg-brand-copper rounded-full transition-all duration-500"
          style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {stepLabels.map((label, index) => (
          <div
            key={label}
            className={cn(
              "text-xs text-center transition-colors duration-500",
              index <= currentStep ? "text-brand-espresso font-medium" : "text-brand-muted"
            )}
            style={{ flexBasis: '33.33%' }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};
