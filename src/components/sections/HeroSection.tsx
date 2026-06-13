"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";

const stats = [
  { value: "1,200+", label: "Projects Completed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "10yr", label: "Warranty Included" },
];

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen flex items-end overflow-hidden bg-[#1A1A18]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop&q=85"
          alt="Luxury walk-in closet"
          fill
          priority
          className={`object-cover transition-all duration-[2s] ${loaded ? "scale-100 opacity-60" : "scale-105 opacity-0"}`}
          sizes="100vw"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18] via-[#1A1A18]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A18]/70 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pb-20 lg:pb-32 pt-40">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div
            className={`flex items-center gap-3 mb-8 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <span className="block w-12 h-px bg-[#C9A96E]" />
            <span className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase">Premium Closet Design</span>
          </div>

          {/* Headline */}
          <h1
            className={`text-white font-light leading-[1.05] mb-8 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(3rem, 6vw, 5.5rem)",
              transitionDelay: "350ms"
            }}
          >
            Custom Closet Designs<br />
            <em className="text-[#C9A96E] not-italic">Tailored For</em><br />
            Your Space
          </h1>

          {/* Subheadline */}
          <p
            className={`text-white/60 text-lg font-light leading-relaxed mb-12 max-w-xl transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "500ms" }}
          >
            We transform ordinary rooms into extraordinary personal sanctuaries — bespoke storage systems built to your exact specifications with premium materials and expert craftsmanship.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 mb-20 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "650ms" }}
          >
            <Link
              href="/wizard"
              className="group inline-flex items-center justify-center gap-3 bg-[#C9A96E] text-[#1A1A18] text-sm tracking-[0.2em] uppercase font-medium px-8 py-4 hover:bg-[#E8D5B0] transition-all duration-300"
            >
              Start Your Transformation
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center gap-3 border border-white/30 text-white text-sm tracking-[0.2em] uppercase font-light px-8 py-4 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-300"
            >
              Browse Gallery
            </Link>
          </div>

          {/* Stats */}
          <div
            className={`flex flex-wrap gap-8 lg:gap-16 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "800ms" }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span
                  className="text-white text-3xl font-light"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {stat.value}
                </span>
                <span className="text-white/40 text-xs tracking-[0.15em] uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown size={16} className="text-[#C9A96E] animate-bounce" />
      </div>
    </div>
  );
}
