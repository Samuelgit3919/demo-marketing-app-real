"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { useTestimonials } from "@/hooks/useTestimonials";

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 200 : -200,
    opacity: 0,
  }),
};

const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export default function TestimonialsSection() {
  const { testimonials, isLoading, hasTestimonials } = useTestimonials();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [containerMinHeight, setContainerMinHeight] = useState<number>(0);
  const measureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const measureHeights = useCallback(() => {
    const heights = measureRefs.current.map(
      (el) => el?.scrollHeight ?? 0
    );
    const max = Math.max(...heights, 0);
    if (max > 0) setContainerMinHeight(max);
  }, []);

  useEffect(() => {
    if (!hasTestimonials) return;
    requestAnimationFrame(() => {
      measureHeights();
    });
  }, [testimonials, hasTestimonials, measureHeights]);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setDirection(1);
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (isLoading) return null;
  if (!hasTestimonials) return null;

  const prev = () => {
    setDirection(-1);
    setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  };
  const next = () => {
    setDirection(1);
    setActive((a) => (a + 1) % testimonials.length);
  };

  const t = testimonials[active];

  const cardContent = (testimonial: typeof t) => (
    <>
      <span
        className="absolute top-6 left-8 text-[#EBEBDF] text-9xl font-light leading-none select-none"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        "
      </span>

      <div className="flex gap-1 mb-6 relative z-10">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <div key={i}>
            <Star size={14} className="fill-[#C9A96E] text-[#C9A96E]" />
          </div>
        ))}
      </div>

      <p
        className="text-[#1A1A18] font-light leading-relaxed mb-8 relative z-10"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
        }}
      >
        {testimonial.review}
      </p>

      <div className="flex items-center gap-4">
        <div className="relative w-14 h-14 overflow-hidden">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <p className="text-[#1A1A18] font-medium text-sm">{testimonial.name}</p>
          <p className="text-[#6B6B65] text-xs mt-0.5">{testimonial.location}</p>
          <p className="text-[#C9A96E] text-[10px] tracking-[0.15em] uppercase mt-1">
            {testimonial.project}
          </p>
        </div>
      </div>
    </>
  );

  return (
    <SectionWrapper className="bg-[#F5F0E8] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase block mb-4">
            Client Stories
          </span>
          <h2
            className="text-[#1A1A18] font-light"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            ref={containerRef}
            className="relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{ minHeight: containerMinHeight > 0 ? containerMinHeight : undefined }}
          >
            {/* Hidden height-measurement cards */}
            <div className="absolute inset-0 pointer-events-none opacity-0" aria-hidden="true">
              {testimonials.map((testimonial, i) => (
                <div
                  key={i}
                  ref={(el) => { measureRefs.current[i] = el; }}
                  className="bg-white p-10 lg:p-16"
                >
                  {cardContent(testimonial)}
                </div>
              ))}
            </div>

            {/* Visible animated card */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="bg-white p-10 lg:p-16 relative"
                layout
              >
                <motion.span
                  className="absolute top-6 left-8 text-[#EBEBDF] text-9xl font-light leading-none select-none"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  "
                </motion.span>

                <div className="flex gap-1 mb-6 relative z-10">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 + i * 0.07, ...springTransition }}
                    >
                      <Star size={14} className="fill-[#C9A96E] text-[#C9A96E]" />
                    </motion.div>
                  ))}
                </div>

                <motion.p
                  className="text-[#1A1A18] font-light leading-relaxed mb-8 relative z-10"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                >
                  {t.review}
                </motion.p>

                <motion.div
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                >
                  <div className="relative w-14 h-14 overflow-hidden">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="text-[#1A1A18] font-medium text-sm">{t.name}</p>
                    <p className="text-[#6B6B65] text-xs mt-0.5">{t.location}</p>
                    <p className="text-[#C9A96E] text-[10px] tracking-[0.15em] uppercase mt-1">
                      {t.project}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > active ? 1 : -1);
                    setActive(i);
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-8 h-2.5 bg-[#C9A96E] shadow-[0_0_6px_rgba(201,169,110,0.4)]"
                      : "w-2.5 h-2.5 bg-[#D4C8B8] hover:bg-[#C9A96E] hover:shadow-[0_0_4px_rgba(201,169,110,0.25)]"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 border border-[#D4C8B8] flex items-center justify-center text-[#6B6B65] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-200 rounded-lg"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 border border-[#D4C8B8] flex items-center justify-center text-[#6B6B65] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-200 rounded-lg"
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
