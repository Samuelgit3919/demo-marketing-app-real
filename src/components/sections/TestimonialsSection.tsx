"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  const t = testimonials[active];

  return (
    <SectionWrapper className="bg-[#F5F0E8] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase block mb-4">Client Stories</span>
          <h2
            className="text-[#1A1A18] font-light"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            What Our Clients Say
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div key={active} className="bg-white p-10 lg:p-16 relative animate-[fadeIn_0.5s_ease]">
            {/* Quote mark */}
            <span
              className="absolute top-6 left-8 text-[#EBEBDF] text-9xl font-light leading-none select-none"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              "
            </span>

            {/* Stars */}
            <div className="flex gap-1 mb-6 relative z-10">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={14} className="fill-[#C9A96E] text-[#C9A96E]" />
              ))}
            </div>

            {/* Review */}
            <p
              className="text-[#1A1A18] font-light leading-relaxed mb-8 relative z-10"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}
            >
              {t.review}
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 overflow-hidden">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div>
                <p className="text-[#1A1A18] font-medium text-sm">{t.name}</p>
                <p className="text-[#6B6B65] text-xs mt-0.5">{t.location}</p>
                <p className="text-[#C9A96E] text-[10px] tracking-[0.15em] uppercase mt-1">{t.project}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-px transition-all duration-300 ${i === active ? "w-8 bg-[#C9A96E]" : "w-4 bg-[#EBEBDF]"}`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 border border-[#EBEBDF] flex items-center justify-center hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-200"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 border border-[#EBEBDF] flex items-center justify-center hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-200"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
