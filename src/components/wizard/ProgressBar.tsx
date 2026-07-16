import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  { label: "Contact Info", color: "#ef4444" }, // red
  { label: "Spaces & Measure", color: "#eab308" }, // yellow
  { label: "Review & Book", color: "#22c55e" }, // green
];

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  return (
    <div className="w-full mb-12">
      <div className="relative h-1 w-full bg-brand-border rounded-full overflow-hidden flex">
        {steps.map((step, index) => (
          <div
            key={step.label}
            className="h-1 flex-1 transition-colors duration-500"
            style={{
              backgroundColor: index <= currentStep ? step.color : "transparent",
              marginRight: index < steps.length - 1 ? 2 : 0,
            }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2">
        {steps.map((step, index) => (
          <div
            key={step.label}
            className={cn(
              "text-xs text-center transition-colors duration-500 flex items-center justify-center gap-1.5",
              index <= currentStep ? "text-brand-espresso font-medium" : "text-brand-muted"
            )}
            style={{ flexBasis: "33.33%" }}
          >
            <span
              className="inline-block w-2 h-2 rounded-full transition-colors duration-500"
              style={{ backgroundColor: index <= currentStep ? step.color : "#d4cdc4" }}
            />
            {step.label}
          </div>
        ))}
      </div>
    </div>
  );
};
