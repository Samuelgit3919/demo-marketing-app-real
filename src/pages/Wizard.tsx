import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { ProgressBar } from "@/components/wizard/ProgressBar";
import { StepOne } from "@/components/wizard/StepOne";
import { StepTwo } from "@/components/wizard/StepTwo";
import { StepThree } from "@/components/wizard/StepThree";
import { Seo } from "@/components/Seo";
import { useLanguage } from "@/contexts/LanguageContext";

export interface UploadedFile {
  file: File;
  id: string;
  preview: string;
  uploadStatus: "pending" | "uploading" | "success" | "error";
  filePath?: string;
}

export interface Space {
  id: string;
  name: string;
  type: "Closet" | "Kitchen" | "Garage";
  ceilingHeight: string;
  drawingData?: string;
  wallMeasurements?: Array<{ label: string; length: string }>;
  unit?: "cm" | "in";
  totalPerimeter?: number;
  totalArea?: number;
  /** Chosen predetermined layout template id (e.g. "k-galley", "c-double"). */
  layout?: string;
  /** Storage priorities in tap order: index 0 = 1st (green), 1 = 2nd (yellow), 2 = 3rd (red). */
  storagePriorities?: string[];
}

const STORAGE_KEYS = {
  step: "wizardStep",
  formData: "wizardFormData",
  spaces: "wizardSpaces",
  notes: "wizardNotes",
};

const INITIAL_FORM = {
  fullName: "",
  email: "",
  phone: "",
  postalCode: "",
};

const Wizard = () => {
  const { language, setLanguage, t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.step);
    return saved ? parseInt(saved) : 0;
  });

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.formData);
    return saved ? JSON.parse(saved) : INITIAL_FORM;
  });

  const [spaces, setSpaces] = useState<Space[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.spaces);
    return saved ? JSON.parse(saved) : [];
  });

  const [files, setFiles] = useState<UploadedFile[]>([]);

  const [additionalNotes, setAdditionalNotes] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.notes);
    return saved || "";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.step, currentStep.toString());
  }, [currentStep]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.formData, JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.spaces, JSON.stringify(spaces));
  }, [spaces]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.notes, additionalNotes);
  }, [additionalNotes]);

  const clearStorage = () => {
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
  };

  const handleComplete = () => {
    clearStorage();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <Seo
        title="Free 3-Step Space Planner | Closet Design Wizard"
        description="Measure your closet, kitchen, or garage in three simple steps. Add your spaces, draw the walls, set storage priorities, and book a free design consultation."
        path="/space-planner"
      />
      <Navigation />
      <div className="pt-24 pb-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Language toggle */}
          <div className="flex justify-end mb-4">
            <div className="inline-flex items-center rounded-full border border-brand-border bg-white p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                aria-pressed={language === "en"}
                className={`px-4 py-1.5 text-xs font-semibold tracking-wide rounded-full transition-colors ${
                  language === "en" ? "bg-brand-copper text-white" : "text-brand-muted hover:text-brand-espresso"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage("fr")}
                aria-pressed={language === "fr"}
                className={`px-4 py-1.5 text-xs font-semibold tracking-wide rounded-full transition-colors ${
                  language === "fr" ? "bg-brand-copper text-white" : "text-brand-muted hover:text-brand-espresso"
                }`}
              >
                FR
              </button>
            </div>
          </div>

          <div className="text-center mb-8">
            <span className="text-brand-copper text-xs tracking-[0.3em] uppercase block mb-3">
              {t("wz.eyebrow")}
            </span>
            <h1
              className="text-brand-espresso font-light leading-tight"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              }}
            >
              {t("wz.title")}
            </h1>
          </div>

          <ProgressBar currentStep={currentStep} totalSteps={3} />

          <div className="bg-white rounded-2xl border border-brand-border shadow-[0_8px_30px_-12px_rgba(45,36,30,0.12)] p-6 md:p-10">
            {currentStep === 0 && (
              <StepOne
                formData={formData}
                setFormData={setFormData}
                spaces={spaces}
                setSpaces={setSpaces}
                onNext={() => setCurrentStep(1)}
              />
            )}

            {currentStep === 1 && (
              <StepTwo
                formData={formData}
                spaces={spaces}
                setSpaces={setSpaces}
                files={files}
                setFiles={setFiles}
                additionalNotes={additionalNotes}
                setAdditionalNotes={setAdditionalNotes}
                onNext={() => setCurrentStep(2)}
                onBack={() => setCurrentStep(0)}
              />
            )}

            {currentStep === 2 && (
              <StepThree
                formData={formData}
                spaces={spaces}
                files={files}
                additionalNotes={additionalNotes}
                onBack={() => setCurrentStep(1)}
                onComplete={handleComplete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wizard;
