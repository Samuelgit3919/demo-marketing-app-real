"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { services } from "@/data/services";

export default function ServicesSection() {
  return (
    <SectionWrapper className="bg-[#F5F0E8] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase block mb-4">Our Services</span>
            <h2
              className="text-[#1A1A18] font-light leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              Closet Solutions for<br />Every Lifestyle
            </h2>
          </div>
          <Link
            href="/how-it-works"
            className="group inline-flex items-center gap-2 text-[#8B7355] text-xs tracking-[0.2em] uppercase hover:text-[#C9A96E] transition-colors self-start lg:self-auto"
          >
            View All Services
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="group block overflow-hidden bg-white hover:shadow-xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-[#1A1A18]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Arrow overlay */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-[#C9A96E] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <ArrowRight size={16} className="text-[#1A1A18]" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="text-[#1A1A18] font-light text-xl mb-3 group-hover:text-[#8B7355] transition-colors"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {service.title}
                </h3>
                <p className="text-[#6B6B65] text-sm leading-relaxed line-clamp-2">
                  {service.shortDescription}
                </p>
                <div className="mt-4 flex items-center gap-2 text-[#C9A96E] text-xs tracking-[0.15em] uppercase">
                  <span>Explore</span>
                  <span className="w-6 h-px bg-[#C9A96E] group-hover:w-10 transition-all duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
