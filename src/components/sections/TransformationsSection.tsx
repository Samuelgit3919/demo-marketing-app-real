"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";

interface BeforeAfterSliderProps {
  before: { src: string; label: string };
  after: { src: string; label: string };
  title: string;
}

function BeforeAfterSlider({ before, after, title }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging) return;
    updatePosition(e.clientX);
  }, [dragging, updatePosition]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX);
  }, [updatePosition]);

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={containerRef}
        className="relative overflow-hidden aspect-[3/4] lg:aspect-[4/3] cursor-ew-resize select-none"
        onMouseMove={onMouseMove}
        onMouseDown={() => setDragging(true)}
        onMouseUp={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
        onTouchMove={onTouchMove}
        onTouchStart={() => setDragging(true)}
        onTouchEnd={() => setDragging(false)}
      >
        {/* After (full) */}
        <Image src={after.src} alt={after.label} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />

        {/* Before (clipped) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
          <div className="absolute top-0 left-0 h-full" style={{ width: `${position === 0 ? 100 : 10000 / position}%`, minWidth: "100%" }}>
            <Image src={before.src} alt={before.label} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-px bg-white z-10"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white flex items-center justify-center shadow-lg">
            <MoveHorizontal size={16} className="text-[#1A1A18]" />
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-[#1A1A18]/80 text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1.5">Before</span>
        </div>
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-[#C9A96E] text-[#1A1A18] text-[10px] tracking-[0.2em] uppercase px-3 py-1.5">After</span>
        </div>
      </div>

      <h3
        className="text-[#1A1A18] font-light text-lg"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        {title}
      </h3>
    </div>
  );
}

const transformations = [
  {
    title: "Master Suite Walk-in Transformation",
    before: {
      src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      label: "Before: standard bedroom closet"
    },
    after: {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      label: "After: luxury walk-in closet"
    }
  },
  {
    title: "Small Room Storage Reinvented",
    before: {
      src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
      label: "Before: bare room"
    },
    after: {
      src: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&h=600&fit=crop",
      label: "After: custom sliding wardrobe"
    }
  },
  {
    title: "Luxury Dressing Room Creation",
    before: {
      src: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=800&h=600&fit=crop",
      label: "Before: bare room"
    },
    after: {
      src: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&h=600&fit=crop",
      label: "After: luxury dressing room"
    }
  }
];

export default function TransformationsSection() {
  return (
    <section className="bg-[#FAFAF7] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase block mb-4">Before & After</span>
          <h2
            className="text-[#1A1A18] font-light"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            Real Closet Transformations
          </h2>
          <p className="text-[#6B6B65] mt-4 max-w-xl mx-auto text-sm">
            Drag the slider to reveal the full transformation. Every project is a testament to what precision design can achieve.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {transformations.map((t, i) => (
            <BeforeAfterSlider key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
