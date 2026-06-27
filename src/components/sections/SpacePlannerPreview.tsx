"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, PenLine, Ruler, Camera } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";

const features = [
  { icon: PenLine, label: "Draw your space" },
  { icon: Ruler, label: "Enter measurements" },
  { icon: Camera, label: "Upload photos & videos" },
];

export default function SpacePlannerPreview() {
  return (
    <SectionWrapper className="bg-brand-sand py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div>
            <span className="text-brand-copper text-xs tracking-[0.3em] uppercase block mb-4">3-Step Space Planner</span>
            <h2
              className="text-brand-espresso font-light leading-tight mb-6"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Send us what we need, the easy way
            </h2>
            <p className="text-brand-muted text-base leading-relaxed mb-8 max-w-lg">
              Our 3-Step Space Planner makes it easy to send us the information we need. Draw your space,
              enter measurements, and upload photos so we can design accurately.
            </p>

            <ul className="flex flex-col gap-4 mb-10">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <li key={f.label} className="flex items-center gap-3 text-brand-espresso text-sm">
                    <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-brand-sand flex items-center justify-center">
                      <Icon size={18} className="text-brand-copper" />
                    </span>
                    {f.label}
                  </li>
                );
              })}
            </ul>

            <Link
              href="/space-planner"
              className="group inline-flex items-center justify-center gap-3 bg-brand-copper text-white text-sm tracking-[0.2em] uppercase font-medium px-8 py-4 rounded-full hover:bg-brand-copper-dark transition-all duration-300 shadow-lg"
            >
              Start 3-Step Space Planner
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-brand-border shadow-[0_24px_60px_-20px_rgba(45,36,30,0.3)]">
              <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&h=750&fit=crop"
                alt="Designer working on a CAD layout for a custom space"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
