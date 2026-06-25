"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroImage from "@/assets/images/hero_image.jpg";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen flex items-end overflow-hidden bg-brand-ink">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Custom designed walk-in closet, kitchen and garage storage"
          fill
          priority
          className={`object-cover transition-opacity duration-[1.5s] ${loaded ? "opacity-60" : "opacity-0"}`}
          sizes="100vw"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/70 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pb-20 lg:pb-32 pt-40">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div
            className={`flex items-center gap-3 mb-8 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <span className="block w-12 h-px bg-brand-copper-light" />
            <span className="text-brand-copper-light text-xs tracking-[0.3em] uppercase">Online Design & Supply Platform</span>
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
            Custom closets, kitchens & garages<br />
            <em className="text-brand-copper-light not-italic">designed live</em><br />
            from your home.
          </h1>

          {/* Subheadline */}
          <p
            className={`text-white/60 text-lg font-light leading-relaxed mb-12 max-w-xl transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "500ms" }}
          >
            Use our 3-Step Space Planner to measure your space, upload photos, and meet with a designer live. We design your project in CAD and give you a same-day quote.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 mb-20 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "650ms" }}
          >
            <Link
              href="/space-planner"
              className="group inline-flex items-center justify-center gap-3 bg-brand-copper text-white text-sm tracking-[0.2em] uppercase font-medium px-8 py-4 rounded-full hover:bg-brand-copper-dark transition-all duration-300 shadow-lg"
            >
              Start 3-Step Space Planner
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center gap-3 border border-white/30 text-white text-sm tracking-[0.2em] uppercase font-light px-8 py-4 rounded-full hover:border-brand-copper-light hover:text-brand-copper-light transition-all duration-300"
            >
              See How It Works
            </Link>
          </div>

          {/* Quick flow */}
          <div
            className={`flex flex-wrap gap-x-6 gap-y-2 text-white/50 text-xs tracking-[0.15em] uppercase transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "800ms" }}
          >
            <span>Measure online</span>
            <span className="text-brand-copper-light">/</span>
            <span>Design live in CAD</span>
            <span className="text-brand-copper-light">/</span>
            <span>Same-day quote</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown size={16} className="text-brand-copper-light animate-bounce" />
      </div>
    </div>
  );
}
