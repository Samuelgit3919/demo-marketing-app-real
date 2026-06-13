import SectionWrapper from "@/components/ui/SectionWrapper";
import { ClipboardList, Pencil, Wrench } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Submit Your Space",
    description: "Share your room dimensions and vision with our design team. A quick questionnaire is all it takes to get started.",
  },
  {
    number: "02",
    icon: Pencil,
    title: "Receive Your Custom Design",
    description: "Our designers craft a bespoke 3D closet design tailored specifically to your space, style, and storage needs.",
  },
  {
    number: "03",
    icon: Wrench,
    title: "We Build & Install",
    description: "Our master craftsmen install your custom closet system with precision. Most installations are completed in just 1–2 days.",
  },
];

export default function ProcessSteps() {
  return (
    <SectionWrapper className="bg-[#FAFAF7] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase block mb-4">How It Works</span>
          <h2
            className="text-[#1A1A18] font-light"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Three Steps to Your Dream Closet
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-px bg-[#EBEBDF]" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="group relative flex flex-col items-center text-center px-8 py-12 hover:bg-[#F5F0E8] transition-all duration-300"
              >
                {/* Number */}
                <div className="relative mb-6">
                  <span
                    className="absolute -top-4 -right-4 text-[#EBEBDF] text-7xl font-light leading-none select-none"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {step.number}
                  </span>
                  <div className="relative z-10 w-14 h-14 border border-[#C9A96E] flex items-center justify-center bg-[#FAFAF7] group-hover:bg-[#C9A96E] transition-colors duration-300">
                    <Icon size={22} className="text-[#C9A96E] group-hover:text-[#1A1A18] transition-colors duration-300" />
                  </div>
                </div>

                <h3
                  className="text-[#1A1A18] font-light mb-4 text-xl"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-[#6B6B65] text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Mobile connector */}
                {i < steps.length - 1 && (
                  <div className="md:hidden w-px h-12 bg-[#EBEBDF] mt-8" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
