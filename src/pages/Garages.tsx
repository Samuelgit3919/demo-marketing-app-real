"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { SeoHead } from "@/components/seo/SeoHead";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/sections/CTABanner";
import ServiceProjectGrid from "@/components/sections/ServiceProjectGrid";
import { useServicePageProjects } from "@/hooks/useServicePageProjects";
import garageImage from "@/assets/images/garage_service.jpg";

const steps = [
  "Measure your garage with our 3-Step Space Planner",
  "Meet live with a designer online",
  "Review your custom CAD garage plan",
  "Get a same-day quote and supply plan",
];

const features = [
  "Heavy-duty wall and base cabinets",
  "Slatwall and accessory storage",
  "Workbench and tool organization layouts",
  "Overhead and vertical storage options",
  "Durable finishes for garage use",
  "Fully assembled cabinet supply",
];

export default function Garages() {
  const { projects, loading, firstProject } = useServicePageProjects("garage");
  const heroSrc = firstProject?.thumbnail || garageImage;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom Garage Storage Designed Online",
    provider: {
      "@type": "LocalBusiness",
      name: "Design & Supply",
    },
    description:
      "Garage cabinets, slatwall, and workbench storage designed online with live CAD and same-day quote.",
    serviceType: "Custom Garage Design",
    url: "https://designandsupply.ca/garages",
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <SeoHead
        title="Custom Garage Storage Designed Online | Design & Supply"
        description="Garage cabinets, slatwall, and workbench storage designed online with live CAD and same-day quote."
        jsonLd={serviceSchema}
      />
      <Navigation />
      <main className="pt-24 lg:pt-28">
        <section className="px-6 lg:px-10 pb-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-brand-copper text-xs tracking-[0.3em] uppercase block mb-4">Garages</span>
              <h1 className="text-brand-espresso font-light leading-tight mb-5" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>
                Turn Your Garage Into Usable Space
              </h1>
              <p className="text-brand-muted text-sm leading-relaxed max-w-xl mb-7">
                We design live online and supply fully assembled cabinets. Organize tools, gear, and seasonal items with a layout built around your space.
              </p>
              <Link href="/space-planner" className="group inline-flex items-center gap-3 bg-brand-copper text-white text-sm tracking-[0.2em] uppercase font-medium px-8 py-4 rounded-full hover:bg-brand-copper-dark transition-all duration-300 shadow-lg">
                Start 3-Step Space Planner
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-brand-border shadow-[0_16px_40px_-12px_rgba(45,36,30,0.2)]">
              <Image src={heroSrc} alt="Garage cabinet and storage system" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>
        </section>

        <ServiceProjectGrid projects={projects} loading={loading} type="garage" />

        <section className="bg-brand-sand px-6 lg:px-10 py-14">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-brand-espresso text-3xl mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>How it works</h2>
              <ul className="space-y-3">
                {steps.map((step) => (
                  <li key={step} className="flex items-start gap-3 text-brand-muted text-sm">
                    <CheckCircle size={16} className="text-brand-copper mt-0.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-brand-espresso text-3xl mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>What you get</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature) => (
                  <li key={feature} className="bg-white border border-brand-border rounded-xl px-4 py-3 text-brand-muted text-sm">{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
