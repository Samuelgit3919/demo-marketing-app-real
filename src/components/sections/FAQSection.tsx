"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { faqs } from "@/data/faq";

export default function FAQSection() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <SectionWrapper className="bg-brand-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left */}
          <div className="lg:col-span-4">
            <span className="text-brand-copper text-xs tracking-[0.3em] uppercase block mb-4">FAQ</span>
            <h2
              className="text-brand-espresso font-light leading-tight mb-6"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 3vw, 2.8rem)" }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-brand-muted text-sm leading-relaxed">
              Everything you need to know about designing your space online with us. Can't find an answer? Reach out and we'll help.
            </p>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-8 flex flex-col divide-y divide-brand-border">
            {faqs.map((faq) => (
              <div key={faq.id} className="py-6">
                <button
                  onClick={() => setOpen(open === faq.id ? null : faq.id)}
                  className="w-full flex items-start justify-between gap-6 text-left group"
                >
                  <span
                    className={`font-light text-base leading-snug transition-colors ${open === faq.id ? "text-brand-copper" : "text-brand-espresso group-hover:text-brand-copper"}`}
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.1rem" }}
                  >
                    {faq.question}
                  </span>
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-200 ${
                    open === faq.id ? "border-brand-copper bg-brand-copper" : "border-brand-border group-hover:border-brand-copper"
                  }`}>
                    {open === faq.id
                      ? <Minus size={12} className="text-white" />
                      : <Plus size={12} className="text-brand-muted group-hover:text-brand-copper" />
                    }
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${open === faq.id ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"}`}
                >
                  <p className="text-brand-muted text-sm leading-relaxed pr-10">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
